import { Check, Trash2, Clock, BookOpen } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import type { Task, Urgency } from '@/types'
import { cn } from '@/lib/utils'

interface TaskCardProps {
  task: Task
  onComplete: (id: string) => void
  onDelete: (id: string) => void
}

const urgencyConfig: Record<Urgency, { label: string; badgeVariant: 'high' | 'medium' | 'low'; ring: string }> = {
  high: { label: '🔴 Urgent', badgeVariant: 'high', ring: 'hover:border-rose-500/30' },
  medium: { label: '🟡 Soon', badgeVariant: 'medium', ring: 'hover:border-amber-500/30' },
  low: { label: '🟢 Upcoming', badgeVariant: 'low', ring: 'hover:border-emerald-500/30' },
}

function formatDeadline(deadline: string): { text: string; isOverdue: boolean; isDueSoon: boolean } {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const due = new Date(deadline)
  due.setHours(0, 0, 0, 0)
  const diff = Math.round((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

  if (diff < 0) return { text: `${Math.abs(diff)}d overdue`, isOverdue: true, isDueSoon: false }
  if (diff === 0) return { text: 'Due today', isOverdue: false, isDueSoon: true }
  if (diff === 1) return { text: 'Due tomorrow', isOverdue: false, isDueSoon: true }
  if (diff <= 3) return { text: `Due in ${diff} days`, isOverdue: false, isDueSoon: true }
  return { text: `Due ${due.toLocaleDateString('en-PH', { month: 'short', day: 'numeric' })}`, isOverdue: false, isDueSoon: false }
}

export function TaskCard({ task, onComplete, onDelete }: TaskCardProps) {
  const config = urgencyConfig[task.urgency]
  const deadline = formatDeadline(task.deadline)

  return (
    <Card
      className={cn(
        'transition-all duration-300 group',
        config.ring,
        task.completed && 'opacity-50',
        task.urgency === 'high' && !task.completed && 'animate-pulse-glow'
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {/* Complete button */}
          <button
            onClick={() => onComplete(task.id)}
            aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
            className={cn(
              'mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200',
              task.completed
                ? 'border-emerald-500 bg-emerald-500'
                : 'border-slate-600 hover:border-emerald-500'
            )}
          >
            {task.completed && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <Badge variant={config.badgeVariant}>{config.label}</Badge>
              <Badge variant="subject">
                <BookOpen className="w-3 h-3 mr-1" />
                {task.subject}
              </Badge>
            </div>

            <p className={cn(
              'text-sm font-medium text-white leading-snug',
              task.completed && 'line-through text-slate-500'
            )}>
              {task.title}
            </p>

            {task.details && (
              <p className="text-xs text-slate-400 mt-1 leading-relaxed line-clamp-2">{task.details}</p>
            )}

            <div className="flex items-center gap-1.5 mt-2">
              <Clock className="w-3 h-3 text-slate-500 flex-shrink-0" />
              <span className={cn(
                'text-xs',
                deadline.isOverdue ? 'text-rose-400 font-medium' : deadline.isDueSoon ? 'text-amber-400 font-medium' : 'text-slate-500'
              )}>
                {deadline.text}
              </span>
            </div>
          </div>

          {/* Delete */}
          <button
            onClick={() => onDelete(task.id)}
            aria-label="Delete task"
            className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 p-1 rounded hover:bg-rose-500/20 hover:text-rose-400 text-slate-600"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
