import type { ParsedResult, Task, Announcement } from '@/types'

export const DEMO_MESSAGE = `Good morning mga magulang! 🌟

From: Ma'am Santos (Grade 3 - Sampaguita)

📚 HOMEWORK & ASSIGNMENTS:
- Math worksheet on fractions (pages 45-47) - due TOMORROW June 12
- Science project: Draw and label parts of a plant - due Friday June 14
- Filipino: Memorize "Lupang Hinirang" first 2 stanzas for recitation on Monday June 16

📅 UPCOMING EVENTS:
- FLAG CEREMONY will be held this Monday. Please remind your child to wear complete uniform including white shoes.
- PERIODICAL EXAM for Q4 is scheduled on June 20-21 (Thursday-Friday). Coverage sheet will be sent home tomorrow.
- School Nutrition Month Program - June 25, parents are invited.

💰 FEES & REMINDERS:
- Book rental fee of ₱150 is due on June 15. Please pay to the class treasurer.
- Make sure your child brings their BAON. No sharing of food this week due to health protocols.
- Lost and Found: A blue water bottle with "Miguel" label is at the office.

Thank you for your continued support! Mabuhay! 🇵🇭`

const today = new Date()
const addDays = (d: number) => {
  const date = new Date(today)
  date.setDate(date.getDate() + d)
  return date.toISOString().split('T')[0]
}

export const DEMO_RESULT: ParsedResult = {
  summary: '3 urgent tasks due this week, periodical exam coming June 20-21, and flag ceremony this Monday.',
  tasks: [
    {
      title: 'Math Worksheet — Fractions (pp. 45-47)',
      subject: 'Mathematics',
      deadline: addDays(1),
      urgency: 'high',
      details: 'Complete pages 45 to 47 of the Math worksheet on fractions.',
    },
    {
      title: 'Science Project — Parts of a Plant',
      subject: 'Science',
      deadline: addDays(3),
      urgency: 'high',
      details: 'Draw and label all parts of a plant. Due Friday.',
    },
    {
      title: 'Filipino Recitation — Lupang Hinirang',
      subject: 'Filipino',
      deadline: addDays(5),
      urgency: 'medium',
      details: 'Memorize the first 2 stanzas of Lupang Hinirang for Monday recitation.',
    },
    {
      title: 'Pay Book Rental Fee ₱150',
      subject: 'Administrative',
      deadline: addDays(4),
      urgency: 'medium',
      details: 'Pay ₱150 book rental fee to the class treasurer by June 15.',
    },
    {
      title: 'Q4 Periodical Exam — Review',
      subject: 'All Subjects',
      deadline: addDays(9),
      urgency: 'medium',
      details: 'Periodical Exam on June 20-21. Coverage sheet coming home tomorrow.',
    },
  ],
  announcements: [
    {
      title: '🚩 Flag Ceremony This Monday',
      date: addDays(2),
      details: 'Complete uniform required including white shoes. Please prepare your child.',
    },
    {
      title: '📝 Q4 Periodical Exams — June 20-21',
      date: addDays(9),
      details: 'Coverage sheet will be distributed tomorrow. Prepare all subjects.',
    },
    {
      title: '🥗 Nutrition Month Program — June 25',
      date: addDays(14),
      details: 'Parents are invited to the school Nutrition Month Program.',
    },
  ],
  reminders: [
    {
      title: 'Prepare Complete Uniform for Flag Ceremony',
      date: addDays(1),
      details: 'Include white shoes for Monday flag ceremony.',
    },
    {
      title: 'Pack Baon — No Food Sharing This Week',
      date: addDays(0),
      details: 'Health protocols in effect. Ensure child has enough baon.',
    },
  ],
}

export const DEMO_TASKS: Task[] = DEMO_RESULT.tasks.map((t, i) => ({
  ...t,
  id: `demo-task-${i}`,
  completed: false,
  createdAt: new Date().toISOString(),
}))

export const DEMO_ANNOUNCEMENTS: Announcement[] = DEMO_RESULT.announcements.map((a, i) => ({
  ...a,
  id: `demo-ann-${i}`,
}))
