import { Target, Flame } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Task } from '@/types'
import { cn } from '@/lib/utils'

interface TodaysFocusProps {
  tasks: Task[]
  onComplete: (id: string) => void
}

function formatDue(deadline: string): string {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const due = new Date(deadline)
  due.setHours(0, 0, 0, 0)
  const diff = Math.round((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  if (diff < 0) return 'OVERDUE'
  if (diff === 0) return 'TODAY'
  if (diff === 1) return 'TOMORROW'
  return `IN ${diff}D`
}

export function TodaysFocus({ tasks, onComplete }: TodaysFocusProps) {
  const focus = tasks
    .filter(t => !t.completed)
    .slice(0, 3)

  return (
    <Card className="border-amber-500/20 bg-gradient-to-br from-amber-500/8 to-transparent">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <div className="w-6 h-6 rounded-md bg-amber-500/20 flex items-center justify-center">
            <Target className="w-4 h-4 text-amber-400" />
          </div>
          Today's Focus
          {focus.length > 0 && (
            <span className="ml-auto text-xs font-normal text-slate-400">Top priorities</span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {focus.length === 0 ? (
          <div className="text-center py-6">
            <Flame className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
            <p className="text-sm text-emerald-400 font-medium">All done! 🎉</p>
            <p className="text-xs text-slate-500 mt-1">No pending tasks right now.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {focus.map((task, i) => {
              const dueLabel = formatDue(task.deadline)
              const isUrgent = dueLabel === 'OVERDUE' || dueLabel === 'TODAY'
              return (
                <div
                  key={task.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/8 hover:border-white/15 transition-all group"
                >
                  <span className="text-lg font-display font-bold text-white/20 w-5 text-center flex-shrink-0">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{task.title}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{task.subject}</p>
                  </div>
                  <Badge
                    variant={task.urgency}
                    className={cn('text-xs flex-shrink-0', isUrgent && 'animate-pulse')}
                  >
                    {dueLabel}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onComplete(task.id)}
                    className="opacity-0 group-hover:opacity-100 h-7 text-xs text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 px-2 transition-all"
                    aria-label={`Mark "${task.title}" complete`}
                  >
                    Done
                  </Button>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
