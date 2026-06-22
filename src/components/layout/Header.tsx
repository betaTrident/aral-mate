import { ArrowLeft, GraduationCap, Home, LayoutDashboard, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SheetTrigger } from '@/components/ui/sheet'

interface HeaderProps {
  childName: string
  taskCount: number
  view: 'input' | 'dashboard'
  hasTasks: boolean
  onShowInput: () => void
  onShowDashboard: () => void
}

export function Header({
  childName,
  taskCount,
  view,
  hasTasks,
  onShowInput,
  onShowDashboard,
}: HeaderProps) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-3 py-4 border-b border-white/8">
      <a
        href="/"
        aria-label="AralMate home"
        className="flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-950"
      >
        <div className="relative">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div
            className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-950"
            aria-hidden="true"
          />
        </div>
        <div>
          <h1 className="font-display font-bold text-lg text-white leading-none">AralMate</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            {childName} • {taskCount} task{taskCount !== 1 ? 's' : ''}
          </p>
        </div>
      </a>

      <nav aria-label="App navigation" className="flex items-center gap-1 sm:gap-2">
        <Button asChild variant="ghost" size="sm" className="px-2 sm:px-3">
          <a href="/" aria-label="Back to AralMate home">
            <Home />
            <span className="hidden sm:inline">Home</span>
          </a>
        </Button>

        {view === 'dashboard' ? (
          <Button variant="glass" size="sm" onClick={onShowInput} aria-label="Add another message">
            <ArrowLeft />
            <span className="hidden sm:inline">Add message</span>
          </Button>
        ) : hasTasks ? (
          <Button variant="glass" size="sm" onClick={onShowDashboard} aria-label="Back to task dashboard">
            <LayoutDashboard />
            <span className="hidden sm:inline">Dashboard</span>
          </Button>
        ) : null}

        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" id="settings-trigger" aria-label="Open settings">
            <Settings className="w-5 h-5 text-slate-400 hover:text-white transition-colors" />
          </Button>
        </SheetTrigger>
      </nav>
    </header>
  )
}
