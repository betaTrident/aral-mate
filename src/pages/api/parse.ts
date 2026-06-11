import type { APIRoute } from 'astro'
import type { ParsedResult } from '@/types'

const SYSTEM_PROMPT = `You are a school task organizer for Filipino parents. Parse the following school communication message and extract structured data.

Return ONLY a valid JSON object with this exact structure:
{
  "tasks": [
    {
      "title": "string - clear action item",
      "subject": "string - school subject or 'Administrative'",
      "deadline": "YYYY-MM-DD - use today's date if unclear",
      "urgency": "high | medium | low",
      "details": "string - additional context"
    }
  ],
  "announcements": [
    {
      "title": "string",
      "date": "YYYY-MM-DD",
      "details": "string"
    }
  ],
  "reminders": [
    {
      "title": "string",
      "date": "YYYY-MM-DD",
      "details": "string"
    }
  ],
  "summary": "One-line summary of the most important things parents need to know"
}

Today's date is: ${new Date().toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' })}.
Filipino school terms: "baon" = packed lunch, "periodical exam" = quarterly test, "flag ceremony" = Monday flag raising.`

export const POST: APIRoute = async ({ request }) => {
  const apiKey = import.meta.env.DEEPSEEK_API_KEY

  if (!apiKey || apiKey.trim() === '') {
    return Response.json(
      { error: 'DeepSeek API key is not configured on the server.' },
      { status: 500 }
    )
  }

  let text = ''

  try {
    const body = await request.json() as { text?: unknown }
    text = typeof body.text === 'string' ? body.text.trim() : ''
  } catch {
    return Response.json({ error: 'Invalid JSON request body.' }, { status: 400 })
  }

  if (!text) {
    return Response.json({ error: 'Message text is required.' }, { status: 400 })
  }

  try {
    const upstream = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: SYSTEM_PROMPT,
          },
          {
            role: 'user',
            content: `Message to parse:\n${text}`,
          },
        ],
        response_format: {
          type: 'json_object',
        },
        temperature: 0.1,
      }),
    })

    if (!upstream.ok) {
      const errData = await upstream.json().catch(() => ({}))
      const message =
        errData && typeof errData === 'object' && 'error' in errData
          ? ((errData.error as { message?: string })?.message ?? `API error ${upstream.status}`)
          : `API error ${upstream.status}`

      return Response.json({ error: message }, { status: upstream.status })
    }

    const data = await upstream.json() as {
      choices?: { message?: { content?: string } }[]
    }

    const raw = data.choices?.[0]?.message?.content ?? ''
    const parsed = JSON.parse(raw.trim()) as ParsedResult

    return Response.json(parsed)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return Response.json({ error: `Failed to parse message: ${message}` }, { status: 500 })
  }
}
