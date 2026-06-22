import { useState } from 'react'
import { Sparkles, Zap, ClipboardPaste } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Skeleton } from '@/components/ui/skeleton'
import { DEMO_MESSAGE } from '@/data/demoData'

interface InputPanelProps {
  onProcess: (text: string) => Promise<void>
  onDemo: () => void
  isLoading: boolean
  error: string | null
}

export function InputPanel({ onProcess, onDemo, isLoading, error }: InputPanelProps) {
  const [text, setText] = useState('')

  const handleProcess = async () => {
    if (!text.trim()) return
    await onProcess(text)
  }

  const handlePasteDemo = () => {
    setText(DEMO_MESSAGE)
  }

  return (
    <section className="mt-10 animate-fade-in">
      {/* Hero text */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-1.5 mb-4">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-xs font-medium text-amber-400">AI-Powered School Organizer</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3 leading-tight">
          Never miss a school
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600"> deadline</span>
        </h2>
        <p className="text-slate-400 text-base max-w-xl mx-auto">
          Paste messages from teachers, group chats, or school diaries. AI extracts every task and deadline instantly.
        </p>
      </div>

      {/* Input area */}
      <div className="relative rounded-2xl border border-white/10 bg-white/3 p-4 sm:p-6 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-3">
          <label htmlFor="message-input" className="text-sm font-medium text-slate-300">
            School Message
          </label>
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePasteDemo}
            className="text-xs text-slate-400 hover:text-amber-400 gap-1.5 h-7"
            id="paste-demo-btn"
          >
            <ClipboardPaste className="w-3.5 h-3.5" />
            Paste sample message
          </Button>
        </div>

        {isLoading ? (
          <div className="space-y-3 h-48" role="status" aria-live="polite">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/3" />
            <div className="flex items-center gap-2 mt-6">
              <div className="w-5 h-5 border-2 border-amber-500/50 border-t-amber-500 rounded-full animate-spin" />
              <span className="text-sm text-amber-400">AI is analyzing your message…</span>
            </div>
          </div>
        ) : (
          <Textarea
            id="message-input"
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Paste teacher messages, group chat announcements, diary entries…

Example: 'Good morning! Reminder: Math worksheet due tomorrow. Science project (parts of a plant) due Friday. Flag ceremony Monday — complete uniform required.'"
            className="min-h-[180px] text-sm leading-relaxed"
          />
        )}

        {error && (
          <p className="mt-2 text-sm text-rose-400 flex items-center gap-1.5" role="alert">
            <span>⚠</span> {error}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <Button
            id="process-btn"
            variant="amber"
            size="lg"
            className="flex-1 font-display font-semibold text-base"
            onClick={handleProcess}
            disabled={isLoading || !text.trim()}
          >
            <Sparkles className="w-5 h-5" />
            Process with AI
          </Button>
          <Button
            id="demo-btn"
            variant="glass"
            size="lg"
            onClick={onDemo}
            disabled={isLoading}
            className="sm:w-auto"
          >
            <Zap className="w-4 h-4 text-amber-400" />
            Try Demo
          </Button>
        </div>
      </div>
    </section>
  )
}
