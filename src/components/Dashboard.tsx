import { ListChecks, LayoutDashboard } from 'lucide-react'
import { TodaysFocus } from './TodaysFocus'
import { TaskList } from './TaskList'
import { AnnouncementsBoard } from './AnnouncementsBoard'
import { DeadlineTimeline } from './DeadlineTimeline'
import { QuickStats } from './QuickStats'
import type { Task, Announcement } from '@/types'

interface DashboardProps {
  tasks: Task[]
  announcements: Announcement[]
  summary?: string
  onComplete: (id: string) => void
  onDelete: (id: string) => void
}

export function Dashboard({ tasks, announcements, summary, onComplete, onDelete }: DashboardProps) {
  return (
    <section className="mt-8 animate-slide-up">
      {/* Dashboard header */}
      <div className="flex items-center mb-6">
        <div className="flex items-center gap-2">
          <LayoutDashboard className="w-5 h-5 text-amber-400" />
          <h2 className="font-display text-xl font-semibold text-white">Dashboard</h2>
        </div>
      </div>

      {/* Top row: Focus + Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <TodaysFocus tasks={tasks} onComplete={onComplete} />
        <QuickStats tasks={tasks} summary={summary} />
      </div>

      {/* Middle row: Timeline + Announcements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <DeadlineTimeline tasks={tasks} />
        <AnnouncementsBoard announcements={announcements} />
      </div>

      {/* Full-width task list */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <ListChecks className="w-4 h-4 text-slate-400" />
          <h3 className="font-display font-semibold text-white text-sm">All Tasks</h3>
          <span className="text-xs text-slate-500">({tasks.length})</span>
        </div>
        <TaskList tasks={tasks} onComplete={onComplete} onDelete={onDelete} />
      </div>
    </section>
  )
}
