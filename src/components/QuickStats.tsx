import { CheckCircle2, AlertCircle, Clock, BarChart3 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Task } from '@/types'

interface QuickStatsProps {
  tasks: Task[]
  summary?: string
}

export function QuickStats({ tasks, summary }: QuickStatsProps) {
  const total = tasks.length
  const completed = tasks.filter(t => t.completed).length
  const high = tasks.filter(t => t.urgency === 'high' && !t.completed).length
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const dueToday = tasks.filter(t => {
    const due = new Date(t.deadline)
    due.setHours(0, 0, 0, 0)
    return !t.completed && due.getTime() === today.getTime()
  }).length

  const stats = [
    { label: 'Total Tasks', value: total, icon: BarChart3, color: 'text-slate-300' },
    { label: 'Completed', value: completed, icon: CheckCircle2, color: 'text-emerald-400' },
    { label: 'High Priority', value: high, icon: AlertCircle, color: 'text-rose-400' },
    { label: 'Due Today', value: dueToday, icon: Clock, color: 'text-amber-400' },
  ]

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <div className="w-6 h-6 rounded-md bg-slate-700 flex items-center justify-center">
            <BarChart3 className="w-4 h-4 text-slate-300" />
          </div>
          Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        {summary && (
          <p className="text-sm text-slate-300 mb-4 p-3 rounded-lg bg-white/5 border border-white/8 leading-relaxed italic">
            "{summary}"
          </p>
        )}
        <div className="grid grid-cols-2 gap-3">
          {stats.map(({ label, value, icon: Icon, color }) => (
            <div
              key={label}
              className="p-3 rounded-lg bg-white/5 border border-white/8 flex items-center gap-2.5"
            >
              <Icon className={`w-4 h-4 ${color} flex-shrink-0`} />
              <div>
                <p className={`text-xl font-display font-bold ${color}`}>{value}</p>
                <p className="text-xs text-slate-500 leading-tight">{label}</p>
              </div>
            </div>
          ))}
        </div>
        {total > 0 && (
          <div className="mt-3">
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>Progress</span>
              <span>{total > 0 ? Math.round((completed / total) * 100) : 0}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-700"
                style={{ width: `${total > 0 ? (completed / total) * 100 : 0}%` }}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
