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

const PARSED_RESULT_SCHEMA = {
  type: 'object',
  properties: {
    tasks: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          subject: { type: 'string' },
          deadline: { type: 'string' },
          urgency: { type: 'string', enum: ['high', 'medium', 'low'] },
          details: { type: 'string' },
        },
        required: ['title', 'subject', 'deadline', 'urgency', 'details'],
      },
    },
    announcements: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          date: { type: 'string' },
          details: { type: 'string' },
        },
        required: ['title', 'date', 'details'],
      },
    },
    reminders: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          date: { type: 'string' },
          details: { type: 'string' },
        },
        required: ['title', 'date', 'details'],
      },
    },
    summary: { type: 'string' },
  },
  required: ['tasks', 'announcements', 'reminders', 'summary'],
} as const

function extractResponseText(data: {
  candidates?: {
    content?: {
      parts?: { text?: string }[]
    }
  }[]
}) {
  return (
    data.candidates?.[0]?.content?.parts
      ?.map(part => part.text ?? '')
      .join('')
      .trim() ?? ''
  )
}

export const POST: APIRoute = async ({ request }) => {
  const apiKey = import.meta.env.GEMINI_API_KEY

  if (!apiKey || apiKey.trim() === '') {
    return Response.json(
      { error: 'Gemini API key is not configured on the server.' },
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
    const upstream = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [
              {
                text: SYSTEM_PROMPT,
              },
            ],
          },
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: `Message to parse:\n${text}`,
                },
              ],
            },
          ],
          generationConfig: {
            responseMimeType: 'application/json',
            responseSchema: PARSED_RESULT_SCHEMA,
            temperature: 0.1,
            maxOutputTokens: 2048,
          },
        }),
      }
    )

    if (!upstream.ok) {
      const errData = await upstream.json().catch(() => ({}))
      const message =
        errData && typeof errData === 'object' && 'error' in errData
          ? ((errData.error as { message?: string })?.message ?? `API error ${upstream.status}`)
          : `API error ${upstream.status}`

      return Response.json({ error: message }, { status: upstream.status })
    }

    const data = await upstream.json() as {
      candidates?: {
        content?: {
          parts?: { text?: string }[]
        }
      }[]
    }

    const raw = extractResponseText(data)

    if (!raw) {
      return Response.json(
        { error: 'Gemini returned an empty response.' },
        { status: 502 }
      )
    }

    const parsed = JSON.parse(raw) as ParsedResult
    return Response.json(parsed)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return Response.json({ error: `Failed to parse message: ${message}` }, { status: 500 })
  }
}
