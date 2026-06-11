import { useCallback, useState } from 'react'
import type { ParsedResult } from '@/types'

export function useDeepSeek() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const parse = useCallback(async (text: string): Promise<ParsedResult | null> => {
    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      })

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}))
        const message =
          errData && typeof errData === 'object' && 'error' in errData
            ? String(errData.error)
            : `API error ${res.status}`

        throw new Error(message)
      }

      return await res.json() as ParsedResult
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error'
      setError(`Failed to parse message: ${msg}`)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { isLoading, error, parse }
}
