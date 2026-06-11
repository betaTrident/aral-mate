import { ListChecks } from 'lucide-react'
import { TaskCard } from './TaskCard'
import type { Task } from '@/types'

interface TaskListProps {
  tasks: Task[]
  onComplete: (id: string) => void
  onDelete: (id: string) => void
}

export function TaskList({ tasks, onComplete, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 text-slate-500">
        <ListChecks className="w-10 h-10 mx-auto mb-3 opacity-30" />
        <p className="text-sm">No tasks yet. Process a message to get started!</p>
      </div>
    )
  }

  return (
    <div className="space-y-2.5">
      {tasks.map((task, i) => (
        <div
          key={task.id}
          className="animate-fade-in"
          style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}
        >
          <TaskCard task={task} onComplete={onComplete} onDelete={onDelete} />
        </div>
      ))}
    </div>
  )
}
