import { useState, useCallback } from 'react'
import { AppShell } from '@/components/layout/AppShell'
import { Header } from '@/components/layout/Header'
import { InputPanel } from '@/components/InputPanel'
import { Dashboard } from '@/components/Dashboard'
import { SettingsDrawer } from '@/components/SettingsDrawer'
import { Sheet } from '@/components/ui/sheet'
import { useTaskStore } from '@/hooks/useTaskStore'
import { useDeepSeek } from '@/hooks/useDeepSeek'
import { useSettings } from '@/hooks/useSettings'
import { DEMO_TASKS, DEMO_ANNOUNCEMENTS, DEMO_RESULT } from '@/data/demoData'
import type { Announcement } from '@/types'

type View = 'input' | 'dashboard'

export default function App() {
  const [view, setView] = useState<View>('input')
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [summary, setSummary] = useState<string>('')

  const { settings, updateSettings } = useSettings()
  const { tasks, addTasks, markComplete, deleteTask, clearAll, setAllTasks } = useTaskStore()
  const { isLoading, error, parse } = useDeepSeek()

  const handleProcess = useCallback(async (text: string) => {
    const result = await parse(text)
    if (!result) return

    // Add tasks with generated IDs
    addTasks(result.tasks)
    setAnnouncements(prev => [
      ...result.announcements.map((a, i) => ({ ...a, id: `ann-${Date.now()}-${i}` })),
      ...prev,
    ])
    setSummary(result.summary)
    setView('dashboard')
  }, [parse, addTasks])

  const handleDemo = useCallback(() => {
    setAllTasks(DEMO_TASKS)
    setAnnouncements(DEMO_ANNOUNCEMENTS)
    setSummary(DEMO_RESULT.summary)
    setView('dashboard')
  }, [setAllTasks])

  const handleClearTasks = useCallback(() => {
    clearAll()
    setAnnouncements([])
    setSummary('')
    setView('input')
  }, [clearAll])

  return (
    <Sheet>
      <AppShell>
        <Header childName={settings.childName} taskCount={tasks.filter(t => !t.completed).length} />

        {view === 'input' ? (
          <InputPanel
            onProcess={handleProcess}
            onDemo={handleDemo}
            isLoading={isLoading}
            error={error}
          />
        ) : (
          <Dashboard
            tasks={tasks}
            announcements={announcements}
            summary={summary}
            onComplete={markComplete}
            onDelete={deleteTask}
            onAddMore={() => setView('input')}
          />
        )}
      </AppShell>

      <SettingsDrawer
        settings={settings}
        onUpdate={updateSettings}
        onClearTasks={handleClearTasks}
      />
    </Sheet>
  )
}
