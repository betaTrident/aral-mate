import { CalendarClock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Task } from '@/types'
import { cn } from '@/lib/utils'

interface DeadlineTimelineProps {
  tasks: Task[]
}

export function DeadlineTimeline({ tasks }: DeadlineTimelineProps) {
  const upcoming = tasks
    .filter(t => !t.completed)
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
    .slice(0, 5)

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <div className="w-6 h-6 rounded-md bg-purple-500/20 flex items-center justify-center">
            <CalendarClock className="w-4 h-4 text-purple-400" />
          </div>
          Deadline Timeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        {upcoming.length === 0 ? (
          <p className="text-sm text-slate-500 text-center py-6">No upcoming deadlines.</p>
        ) : (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[18px] top-2 bottom-2 w-px bg-white/8" />
            <div className="space-y-3">
              {upcoming.map((task, i) => {
                const due = new Date(task.deadline)
                due.setHours(0, 0, 0, 0)
                const diff = Math.round((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
                const isOverdue = diff < 0
                const isToday = diff === 0
                const isSoon = diff <= 2

                return (
                  <div
                    key={task.id}
                    className="flex items-start gap-3 pl-1 animate-fade-in"
                    style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
                  >
                    {/* Timeline dot */}
                    <div className={cn(
                      'w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold border-2 relative z-10',
                      isOverdue ? 'border-rose-500 bg-rose-500/20 text-rose-400' :
                      isToday ? 'border-amber-500 bg-amber-500/20 text-amber-400' :
                      isSoon ? 'border-amber-400/50 bg-amber-400/10 text-amber-300' :
                      'border-slate-600 bg-slate-800 text-slate-400'
                    )}>
                      {isOverdue ? '!' : diff === 0 ? '★' : diff}
                    </div>
                    <div className="flex-1 min-w-0 pb-3">
                      <p className="text-sm font-medium text-white leading-snug truncate">{task.title}</p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {due.toLocaleDateString('en-PH', { weekday: 'short', month: 'short', day: 'numeric' })}
                        {isOverdue && <span className="text-rose-400 ml-1">• Overdue</span>}
                        {isToday && <span className="text-amber-400 ml-1">• Due today!</span>}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
