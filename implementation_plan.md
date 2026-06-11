# StellarPH — AI School Task Assistant for Busy Parents

> Turn scattered school updates into a clear daily action list. Paste messages, upload photos, and let AI do the organizing.

## Overview

A **no-auth, single-page demo website** that lets parents paste or input school-related messages (from teachers, group chats, diaries) and instantly get an organized dashboard with:
- 📋 Summarized tasks & assignments
- ⏰ Deadline reminders with urgency levels
- 🎯 Priority-ranked daily action list
- 📢 Highlighted announcements

---

## Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Structure | HTML5 | Semantic, fast, no build step |
| Styling | Vanilla CSS | Full control, premium glassmorphism design |
| Logic | Vanilla JS (ES6+) | No framework overhead, instant load |
| AI | **Google Gemini API** (client-side) | Free tier available, powerful text parsing |
| Fonts | Google Fonts (Inter + Outfit) | Modern, clean typography |
| Icons | Lucide Icons (CDN) | Lightweight, beautiful icon set |

> [!IMPORTANT]
> **AI Integration**: The app will prompt parents to enter their **Gemini API key** (stored in localStorage only). For demo purposes, we'll also include a **"Try Demo"** button with sample pre-parsed data so reviewers can see the full flow without an API key.

---

## File Structure

```

├── index.html          # Main SPA entry point
├── css/
│   └── styles.css      # Complete design system + component styles
├── js/
│   ├── app.js          # Main app controller & routing
│   ├── ai.js           # Gemini API integration & prompt engineering
│   ├── tasks.js        # Task parsing, storage, rendering
│   └── utils.js        # Date helpers, localStorage, animations
└── assets/
    └── logo.png        # Generated app logo/icon
```

---

## Design System

### Visual Identity
- **Theme**: Dark mode primary with warm accent colors (calming for tired parents)
- **Primary**: Deep navy `#0f172a` → Slate blue `#1e293b`
- **Accent**: Warm amber `#f59e0b` (urgency), Emerald `#10b981` (completed), Rose `#f43f5e` (overdue)
- **Glass**: `rgba(255,255,255,0.05)` backdrop-blur panels
- **Typography**: `Outfit` for headings, `Inter` for body text
- **Animations**: Smooth fade-ins, card hover lifts, pulse on urgent items, staggered list animations

### Key UI Components
1. **Hero/Welcome Section** — App name, tagline, quick-start CTA
2. **Input Panel** — Large textarea with paste support + "Process with AI" button
3. **Dashboard Grid** — Cards for: Today's Tasks, Upcoming Deadlines, Announcements, Quick Stats
4. **Task Cards** — Color-coded by urgency (🔴 Overdue, 🟡 Due Soon, 🟢 Upcoming)
5. **Settings Drawer** — API key input, child name config

---

## Core Features

### 1. Message Input & AI Processing
- Large, inviting textarea where parents paste raw messages
- Example placeholder showing typical school message formats
- **"Process with AI"** button triggers Gemini API call
- Loading animation while AI processes
- Sample prompt engineering to extract: tasks, deadlines, announcements, subjects, urgency

### 2. AI Prompt Strategy
```
System: You are a school task organizer. Parse the following message from a parent's 
school communication and extract structured data.

Return JSON with:
- tasks: [{title, subject, deadline, urgency (high/medium/low), details}]
- announcements: [{title, date, details}]
- reminders: [{title, date, details}]
- summary: "one-line summary of what parents need to know"
```

### 3. Task Dashboard
- **Today's Focus**: Top 3 priority items for today
- **Task List**: All extracted tasks sorted by deadline
- **Deadline Timeline**: Visual timeline of upcoming deadlines
- **Announcements Board**: School announcements in card format

### 4. Local Storage Persistence
- Tasks persist in `localStorage` across sessions
- Parents can mark tasks as done, snooze, or dismiss
- History of processed messages

---

## Proposed Changes

### HTML Structure
#### [NEW] [index.html](file:///d:/stellarph/index.html)
- Semantic HTML5 structure with sections for: hero, input, dashboard, settings
- Google Fonts + Lucide Icons loaded via CDN
- Meta tags for SEO and mobile responsiveness
- Single `<h1>` with proper heading hierarchy

---

### Design System & Styles
#### [NEW] [styles.css](file:///d:/stellarph/css/styles.css)
- CSS custom properties for the full design token system
- Dark glassmorphism theme with warm accents
- Responsive grid layouts (mobile-first)
- Component styles: cards, buttons, inputs, badges, modals
- Keyframe animations: fadeIn, slideUp, pulse, shimmer loading
- Scrollbar styling, selection colors, focus states

---

### Application Logic
#### [NEW] [app.js](file:///d:/stellarph/js/app.js)
- Main controller: view switching, event binding, state management
- Settings drawer toggle
- Demo mode with sample data
- Toast notification system

#### [NEW] [ai.js](file:///d:/stellarph/js/ai.js)
- Gemini API client (fetch-based, no SDK needed)
- Prompt construction with structured output parsing
- Error handling and retry logic
- Response validation and sanitization

#### [NEW] [tasks.js](file:///d:/stellarph/js/tasks.js)
- Task model: create, update, delete, mark complete
- Rendering functions for task cards, deadline items, announcements
- Sorting/filtering by urgency, date, subject
- localStorage CRUD operations

#### [NEW] [utils.js](file:///d:/stellarph/js/utils.js)
- Date formatting and relative time (`"due in 2 days"`)
- localStorage wrapper with JSON parse/stringify
- Animation helpers (stagger, intersection observer)
- Unique ID generator

---

## Build Timeline (~45 mins)

| Phase | Time | Deliverable |
|-------|------|-------------|
| 1. Foundation | 10 min | `index.html` + `styles.css` with full design system |
| 2. Core Logic | 10 min | `app.js` + `utils.js` — state management, rendering |
| 3. AI Integration | 10 min | `ai.js` — Gemini API + prompt engineering |
| 4. Task Engine | 10 min | `tasks.js` — parsing, cards, persistence |
| 5. Polish | 5 min | Animations, demo data, responsive tweaks |

---

## Verification Plan

### Manual Verification
- Open `index.html` in browser and verify:
  - ✅ Beautiful dark-mode UI loads with animations
  - ✅ Paste a sample school message and see it processed
  - ✅ Demo mode works without API key
  - ✅ Tasks display with correct urgency colors
  - ✅ Tasks persist after page refresh
  - ✅ Responsive on mobile viewport
  - ✅ Mark tasks as complete
  - ✅ Settings drawer opens/closes smoothly

---

## Open Questions

> [!IMPORTANT]
> **1. AI Provider**: I'm planning to use **Google Gemini API** (free tier, client-side calls). Would you prefer a different provider, or should I make the demo fully offline with pre-built sample data only (no API key needed at all)?

> [!NOTE]
> **2. Child Profiles**: Should the demo support multiple children (e.g., tabs for "Maria - Grade 3" and "Juan - Grade 5"), or keep it single-child for simplicity?

> [!NOTE]
> **3. Filipino Context**: Since this is StellarPH, should I include Filipino-specific school terminology (e.g., "periodical exam", "baon reminder", "flag ceremony") in the demo data and AI prompts?
