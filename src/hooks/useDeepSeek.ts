import { useState, useCallback } from 'react'
import type { ParsedResult } from '@/types'

const SYSTEM_PROMPT = `You are a school task organizer for Filipino parents. Parse the following school communication message and extract structured data.

Return ONLY a valid JSON object with this exact structure:
{
  "tasks": [
    {
      "title": "string — clear action item",
      "subject": "string — school subject or 'Administrative'",
      "deadline": "YYYY-MM-DD — use today's date if unclear",
      "urgency": "high | medium | low",
      "details": "string — additional context"
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

export function useDeepSeek() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const parse = useCallback(
    async (text: string): Promise<ParsedResult | null> => {
      const apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY

      if (!apiKey || apiKey === 'paste_your_key_here' || apiKey.trim() === '') {
        setError('DeepSeek API key is not configured. Please add VITE_DEEPSEEK_API_KEY to your .env.local file and restart the development server.')
        return null
      }

      setIsLoading(true)
      setError(null)

      try {
        const res = await fetch('https://api.deepseek.com/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
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

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}))
          throw new Error(
            errData?.error?.message ?? `API error ${res.status}`
          )
        }

        const data = await res.json() as {
          choices?: { message?: { content?: string } }[]
        }

        const raw = data.choices?.[0]?.message?.content ?? ''
        const parsed = JSON.parse(raw.trim()) as ParsedResult
        return parsed
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Unknown error'
        setError(`Failed to parse message: ${msg}`)
        return null
      } finally {
        setIsLoading(false)
      }
    },
    []
  )

  return { isLoading, error, parse }
}