# AralMate

AralMate is a school task organizer for parents. The app now runs on Astro as the host framework while preserving the existing React UI as a client island.

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Environment

Set the DeepSeek API key in `.env.local`:

```bash
DEEPSEEK_API_KEY=your_key_here
```

The key is used only on the server through the Astro API route at `POST /api/parse`.
