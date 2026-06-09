# PostMortem AI — Incident Analysis Studio

AI-powered DevOps incident postmortem generator built with Next.js 14 + Claude.

## Quick Start

### 1. Get an Anthropic API key
Go to https://console.anthropic.com/keys and create a key.

### 2. Add it to `.env.local`
```bash
cp .env.example .env.local
# Then open .env.local and replace sk-ant-... with your real key
```

Your `.env.local` should look like:
```
ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxxxxxx
```

### 3. Install & run
```bash
npm install
npm run dev
```

Open http://localhost:3000 — fill in the 3-step form and click **Generate Postmortem**.

---

## Why a `.env.local` file?

The app calls Anthropic **server-side** via a Next.js API route (`/api/generate`).  
Your API key never touches the browser — it lives only in `.env.local` on your machine.

---

## Project Structure

```
postmortem-ai/
├── app/
│   ├── api/generate/route.js   ← Server-side Anthropic call (uses your API key)
│   ├── globals.css
│   ├── layout.js
│   └── page.js
├── components/
│   ├── PostMortemApp.js         ← Main orchestrator
│   ├── form/
│   │   ├── Step1.js             ← Incident Details + presets
│   │   ├── Step2.js             ← Impact & Timeline
│   │   └── Step3.js             ← Team & Actions
│   ├── results/
│   │   ├── ResultsHeader.js     ← Sticky bar: severity badge + copy/reset
│   │   ├── SectionCard.js       ← Smart section renderer
│   │   └── ErrorCard.js         ← Error state
│   └── ui/
│       ├── Navbar.js
│       ├── StepProgress.js
│       ├── LoadingScreen.js
│       └── FormFields.js
├── lib/
│   ├── constants.js             ← System prompt, presets, section metadata
│   └── utils.js                 ← API call, parsing, validation
├── .env.example                 ← Copy to .env.local and add your key
└── package.json
```
