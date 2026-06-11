import { Megaphone, CalendarDays } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Announcement } from '@/types'

interface AnnouncementsBoardProps {
  announcements: Announcement[]
}

export function AnnouncementsBoard({ announcements }: AnnouncementsBoardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <div className="w-6 h-6 rounded-md bg-blue-500/20 flex items-center justify-center">
            <Megaphone className="w-4 h-4 text-blue-400" />
          </div>
          Announcements
          {announcements.length > 0 && (
            <span className="ml-auto inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold">
              {announcements.length}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {announcements.length === 0 ? (
          <p className="text-sm text-slate-500 text-center py-6">No announcements yet.</p>
        ) : (
          <div className="space-y-3">
            {announcements.map((ann, i) => (
              <div
                key={ann.id}
                className="p-3 rounded-lg bg-white/5 border border-white/8 hover:border-blue-500/20 transition-all animate-fade-in"
                style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
              >
                <div className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white leading-snug">{ann.title}</p>
                    {ann.details && (
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{ann.details}</p>
                    )}
                    {ann.date && (
                      <div className="flex items-center gap-1 mt-1.5">
                        <CalendarDays className="w-3 h-3 text-slate-500" />
                        <span className="text-xs text-slate-500">
                          {new Date(ann.date).toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
