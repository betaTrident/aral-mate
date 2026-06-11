import { ListChecks, LayoutDashboard, PlusCircle } from 'lucide-react'
import { TodaysFocus } from './TodaysFocus'
import { TaskList } from './TaskList'
import { AnnouncementsBoard } from './AnnouncementsBoard'
import { DeadlineTimeline } from './DeadlineTimeline'
import { QuickStats } from './QuickStats'
import { Button } from '@/components/ui/button'
import type { Task, Announcement } from '@/types'

interface DashboardProps {
  tasks: Task[]
  announcements: Announcement[]
  summary?: string
  onComplete: (id: string) => void
  onDelete: (id: string) => void
  onAddMore: () => void
}

export function Dashboard({ tasks, announcements, summary, onComplete, onDelete, onAddMore }: DashboardProps) {
  return (
    <section className="mt-8 animate-slide-up">
      {/* Dashboard header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <LayoutDashboard className="w-5 h-5 text-amber-400" />
          <h2 className="font-display text-xl font-semibold text-white">Dashboard</h2>
        </div>
        <Button
          id="add-more-btn"
          variant="glass"
          size="sm"
          onClick={onAddMore}
          className="gap-1.5 text-xs"
        >
          <PlusCircle className="w-3.5 h-3.5 text-amber-400" />
          Add Message
        </Button>
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
