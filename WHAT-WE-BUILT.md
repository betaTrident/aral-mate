# What We Built So Far

## Project: AralMate - AI School Task Assistant

AralMate is a single-page web app for busy parents who receive school updates through
teacher notes, class group chats, and diary reminders. Parents can paste a raw school
message, process it with Gemini, and see a clean dashboard of tasks, deadlines, and
announcements.

## Main Features

- AI parsing with Gemini for school messages and parent reminders.
- Demo mode with Filipino school-context data, so the app works without requiring a client-side API key.
- Task dashboard with today's focus, priority ordering, urgency badges, and completion toggles.
- Deadline timeline for upcoming school work.
- Announcements board for important school notices that are not direct tasks.
- Local task persistence through browser local storage.
- Settings drawer for child profile details.

## Tech Stack

- React 18 and Vite for the frontend app.
- TypeScript for typed task, announcement, reminder, and settings models.
- Tailwind CSS for styling and responsive layout.
- Radix UI Dialog/Sheet primitives for accessible settings UI.
- Lucide React for icons.
- Gemini API through the server-side Astro `POST /api/parse` route.

## File Guide

- `index.html`: Vite HTML shell and root element.
- `src/main.tsx`: React entry point that mounts the app and imports global styles.
- `src/App.tsx`: Top-level app wiring for settings, Gemini parsing, tasks, demo data, and dashboard state.
- `src/index.css`: Tailwind base styles, theme variables, and small utility classes.
- `src/types/index.ts`: Shared TypeScript types for tasks, announcements, reminders, parsing results, and settings.
- `src/data/demoData.ts`: Sample school message and pre-parsed demo output.
- `src/hooks/useDeepSeek.ts`: Client hook for the server-side Gemini parsing route, loading state, and parse errors.
- `src/hooks/useTaskStore.ts`: Task state management, sorting, local storage persistence, completion, deletion, and clearing.
- `src/hooks/useSettings.ts`: Settings state and local storage persistence.
- `src/components/InputPanel.tsx`: Message textarea, sample paste button, AI processing button, loading state, and errors.
- `src/components/Dashboard.tsx`: Composes focus tasks, stats, timeline, announcements, and task list.
- `src/components/TodaysFocus.tsx`: Top three open tasks.
- `src/components/QuickStats.tsx`: Counts total, completed, high priority, and due-today tasks.
- `src/components/DeadlineTimeline.tsx`: Upcoming deadline visualization.
- `src/components/AnnouncementsBoard.tsx`: Announcement cards.
- `src/components/TaskList.tsx` and `src/components/TaskCard.tsx`: Task rendering, urgency labels, completion, and delete actions.
- `src/components/SettingsDrawer.tsx`: Child profile settings (API key removed from UI).
- `src/components/layout/*`: Header and page shell components.
- `src/components/ui/*`: Reusable UI primitives for buttons, badges, cards, inputs, sheets, skeletons, and textareas.
- `package.json`, `package-lock.json`, `astro.config.mjs`, `tailwind.config.js`, `postcss.config.js`, `tsconfig.json`: Build, dependency, TypeScript, Tailwind, and Astro configuration.
- `implementation_plan.md`: Original implementation plan and requirements.
