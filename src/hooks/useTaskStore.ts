import { useState, useEffect, useCallback } from 'react'
import type { Task } from '@/types'

const STORAGE_KEY = 'aralmate_tasks'
const LEGACY_STORAGE_KEY = 'stellarph_tasks'

function generateId() {
  return `task_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
}

export function useTaskStore() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) return JSON.parse(raw) as Task[]
      const legacyRaw = localStorage.getItem(LEGACY_STORAGE_KEY)
      if (legacyRaw) {
        localStorage.setItem(STORAGE_KEY, legacyRaw)
        localStorage.removeItem(LEGACY_STORAGE_KEY)
        return JSON.parse(legacyRaw) as Task[]
      }
      return []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  const addTasks = useCallback((newTasks: Omit<Task, 'id' | 'completed' | 'createdAt'>[]) => {
    const now = new Date().toISOString()
    setTasks(prev => [
      ...prev,
      ...newTasks.map(t => ({
        ...t,
        id: generateId(),
        completed: false,
        createdAt: now,
      })),
    ])
  }, [])

  const markComplete = useCallback((id: string) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    )
  }, [])

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id))
  }, [])

  const clearAll = useCallback(() => {
    setTasks([])
  }, [])

  const setAllTasks = useCallback((newTasks: Task[]) => {
    setTasks(newTasks)
  }, [])

  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1
    const urgencyOrder = { high: 0, medium: 1, low: 2 }
    if (urgencyOrder[a.urgency] !== urgencyOrder[b.urgency])
      return urgencyOrder[a.urgency] - urgencyOrder[b.urgency]
    return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
  })

  return { tasks: sortedTasks, addTasks, markComplete, deleteTask, clearAll, setAllTasks }
}
