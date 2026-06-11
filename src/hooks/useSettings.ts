import { useState, useEffect } from 'react'
import type { Settings } from '@/types'

const STORAGE_KEY = 'aralmate_settings'
const LEGACY_STORAGE_KEY = 'stellarph_settings'

const DEFAULT_SETTINGS: Settings = {
  childName: 'My Child',
  childGrade: 'Grade 3',
}

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) return { ...DEFAULT_SETTINGS, ...(JSON.parse(raw) as Partial<Settings>) }
      const legacyRaw = localStorage.getItem(LEGACY_STORAGE_KEY)
      if (legacyRaw) {
        localStorage.setItem(STORAGE_KEY, legacyRaw)
        localStorage.removeItem(LEGACY_STORAGE_KEY)
        return { ...DEFAULT_SETTINGS, ...(JSON.parse(legacyRaw) as Partial<Settings>) }
      }
      return DEFAULT_SETTINGS
    } catch {
      return DEFAULT_SETTINGS
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  }, [settings])

  const updateSettings = (patch: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...patch }))
  }

  return { settings, updateSettings }
}
