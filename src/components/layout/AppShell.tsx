import type { ReactNode } from 'react'

interface AppShellProps {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-lg bg-amber-400 px-4 py-2 font-semibold text-slate-950 shadow-xl transition-transform focus:translate-y-0"
      >
        Skip to main content
      </a>
      {/* Ambient background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-500/8 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-blue-500/6 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 right-1/3 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {children}
      </div>
    </div>
  )
}
