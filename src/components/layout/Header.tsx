import { Settings, GraduationCap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SheetTrigger } from '@/components/ui/sheet'

interface HeaderProps {
  childName: string
  taskCount: number
}

export function Header({ childName, taskCount }: HeaderProps) {
  return (
    <header className="flex items-center justify-between py-5 border-b border-white/8">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-950 animate-pulse" />
        </div>
        <div>
          <h1 className="font-display font-bold text-lg text-white leading-none">AralMate</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            {childName} • {taskCount} task{taskCount !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" id="settings-trigger" aria-label="Open settings">
          <Settings className="w-5 h-5 text-slate-400 hover:text-white transition-colors" />
        </Button>
      </SheetTrigger>
    </header>
  )
}
