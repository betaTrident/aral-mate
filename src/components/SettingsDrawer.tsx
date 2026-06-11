import { Settings2, User, GraduationCap, Trash2 } from 'lucide-react'
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import type { Settings } from '@/types'

interface SettingsDrawerProps {
  settings: Settings
  onUpdate: (patch: Partial<Settings>) => void
  onClearTasks: () => void
}

export function SettingsDrawer({ settings, onUpdate, onClearTasks }: SettingsDrawerProps) {
  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle className="flex items-center gap-2">
          <Settings2 className="w-5 h-5 text-amber-400" />
          Settings
        </SheetTitle>
        <SheetDescription>
          Configure your child profile.
        </SheetDescription>
      </SheetHeader>

      <div className="space-y-6">
        {/* Child Profile */}
        <div className="space-y-4">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Child Profile</h3>

          <div className="space-y-2">
            <label htmlFor="child-name" className="text-sm text-slate-300 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-400" />
              Child's Name
            </label>
            <Input
              id="child-name"
              value={settings.childName}
              onChange={e => onUpdate({ childName: e.target.value })}
              placeholder="e.g. Maria"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="child-grade" className="text-sm text-slate-300 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
              Grade Level
            </label>
            <Input
              id="child-grade"
              value={settings.childGrade}
              onChange={e => onUpdate({ childGrade: e.target.value })}
              placeholder="e.g. Grade 3"
            />
          </div>
        </div>

        <div className="h-px bg-white/8" />

        {/* Danger zone */}
        <div className="space-y-3">
          <h3 className="text-xs font-semibold text-rose-400/70 uppercase tracking-wider">Danger Zone</h3>
          <Button
            variant="outline"
            size="sm"
            className="w-full border-rose-500/30 text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/50"
            onClick={onClearTasks}
            id="clear-tasks-btn"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear All Tasks
          </Button>
        </div>
      </div>
    </SheetContent>
  )
}
