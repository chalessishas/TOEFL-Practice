# TOEFL 2026 Writing Module Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a complete Writing practice module (Build a Sentence, Write an Email, Academic Discussion) with a local e-rater-inspired scoring engine into the existing TOEFL Reading app.

**Architecture:** Integrate via `react-router-dom` into the existing React 19 + Vite app. Each writing task is its own component with inline results (no separate result route). A pure-JS scoring engine provides heuristic feedback for the two free-writing tasks. All styling uses inline styles matching the existing warm-tone design system.

**Tech Stack:** React 19, Vite, react-router-dom (new dependency). No test framework (matches existing project — no tests configured). No CSS framework (inline styles throughout, matching existing pattern).

**Spec:** `docs/superpowers/specs/2026-03-19-toefl-writing-module-design.md`

**Existing patterns to follow:**
- All styles are inline (no CSS modules, no Tailwind) — see `src/App.jsx`
- `localStorage` for progress persistence — see `loadProgress`/`saveProgress`/`clearProgress` in `src/App.jsx`
- CSS only in `App.css` (confirm modal, timer, responsive) and `index.css` (global resets, animations)
- Fonts loaded via Google Fonts in `index.html`: DM Sans (body) and Instrument Serif (headings)
- Color palette: `#D4A574` primary, `#FAFAF8` background, `#2D2A26` text, `#8A8477` muted, `#EDE8E0` borders

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `package.json` | Modify | Add `react-router-dom` |
| `index.html` | Modify | Update `<title>` to "TOEFL Practice" |
| `src/main.jsx` | Modify | Wrap app in `BrowserRouter`, add `Routes` |
| `src/App.jsx` | Rename → `src/pages/Reading.jsx` | Existing reading module (fix import paths for pack6.js, CompleteWords.jsx, data.js, App.css) |
| `src/shared/theme.js` | Create | Design tokens (colors, fonts) |
| `src/shared/Timer.jsx` | Create | Shared timer component extracted from Reading |
| `src/pages/Home.jsx` | Create | Module selector (Reading / Writing cards) |
| `src/pages/Writing.jsx` | Create | Writing task type selector (3 cards) |
| `src/writing/data/buildSentenceData.js` | Create | 10 sentence items with word banks |
| `src/writing/BuildSentence.jsx` | Create | Build a Sentence task UI + results |
| `src/writing/data/emailData.js` | Create | 3 email prompts with sample responses |
| `src/writing/WriteEmail.jsx` | Create | Write an Email task UI + results |
| `src/writing/data/discussionData.js` | Create | 3 discussion prompts with sample responses |
| `src/writing/AcademicDiscussion.jsx` | Create | Academic Discussion task UI + results |
| `src/writing/scorer/vocabulary.js` | Create | Word length + rare word scoring |
| `src/writing/scorer/mechanics.js` | Create | Spelling + punctuation scoring |
| `src/writing/scorer/grammar.js` | Create | Grammar pattern detection |
| `src/writing/scorer/organization.js` | Create | Discourse markers + structure scoring |
| `src/writing/scorer/development.js` | Create | Word count + detail density scoring |
| `src/writing/scorer/style.js` | Create | Lexical diversity + sentence variety |
| `src/writing/scorer/wordlist.js` | Create | Bundled common word list + academic words |
| `src/writing/scorer/index.js` | Create | Combines all modules, weighted scoring |
| `src/writing/WritingResult.jsx` | Create | Shared result display (score ring, bars, feedback) |
| `src/writing/writing.css` | Create | Writing-specific CSS (word chips, email layout, responsive) |

---

## Task 1: Install react-router-dom and Set Up Routing

**Files:**
- Modify: `TOEFL/package.json`
- Modify: `TOEFL/index.html`
- Modify: `TOEFL/src/main.jsx`
- Rename: `TOEFL/src/App.jsx` → `TOEFL/src/pages/Reading.jsx`

- [ ] **Step 1: Install react-router-dom**

```bash
cd "/Users/shaoq/Desktop/VScode Workspace/TOEFL" && npm install react-router-dom
```

- [ ] **Step 2: Create directories**

```bash
mkdir -p src/pages src/writing/data src/writing/scorer src/shared
```

- [ ] **Step 3: Rename App.jsx to pages/Reading.jsx**

Copy `src/App.jsx` to `src/pages/Reading.jsx`. In the new file, make these changes:
- Change `const ClaudeTOEFL = () => {` → `const Reading = () => {`
- Change `export default ClaudeTOEFL;` → `export default Reading;`
- Fix ALL import paths (file moved from `src/` to `src/pages/`):
  - `'./App.css'` → `'../App.css'`
  - `'./data.js'` → `'../data.js'`
  - `'./pack6.js'` → `'../pack6.js'`
  - `'./CompleteWords.jsx'` → `'../CompleteWords.jsx'`

Do NOT delete `src/App.jsx` yet — it gets replaced in step 5.

- [ ] **Step 4: Update index.html title**

Change `<title>TOEFL Reading</title>` → `<title>TOEFL Practice</title>`

- [ ] **Step 5: Rewrite main.jsx with Router**

Replace `src/main.jsx` with:

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Home from './pages/Home.jsx'
import Reading from './pages/Reading.jsx'
import Writing from './pages/Writing.jsx'
import BuildSentence from './writing/BuildSentence.jsx'
import WriteEmail from './writing/WriteEmail.jsx'
import AcademicDiscussion from './writing/AcademicDiscussion.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reading" element={<Reading />} />
        <Route path="/writing" element={<Writing />} />
        <Route path="/writing/build-sentence" element={<BuildSentence />} />
        <Route path="/writing/email" element={<WriteEmail />} />
        <Route path="/writing/discussion" element={<AcademicDiscussion />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
```

Replace `src/App.jsx` with a redirect placeholder so the app doesn't break during development:

```jsx
import Home from './pages/Home.jsx'
export default Home
```

- [ ] **Step 6: Verify the app starts without errors**

```bash
cd "/Users/shaoq/Desktop/VScode Workspace/TOEFL" && npm run dev
```

Open `http://localhost:5173/reading` — should show the existing Reading interface unchanged.
The home page and writing pages will 404 until we build them in the next tasks.

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "feat: add react-router-dom and set up routing structure"
```

---

## Task 2: Create Shared Components (Theme + Timer)

**Files:**
- Create: `TOEFL/src/shared/theme.js`
- Create: `TOEFL/src/shared/Timer.jsx`

- [ ] **Step 1: Create theme.js**

```js
export const colors = {
  primary: '#D4A574',
  primaryDark: '#C4956A',
  primaryGradient: 'linear-gradient(135deg, #D4A574 0%, #C4956A 100%)',
  primaryShadow: 'rgba(212, 165, 116, 0.3)',
  bg: '#FAFAF8',
  white: '#FFFFFF',
  text: '#2D2A26',
  textMuted: '#8A8477',
  textLight: '#ADA899',
  textMedium: '#6B6560',
  border: '#EDE8E0',
  borderLight: '#E2DDD5',
  success: '#5a9a6e',
  successBg: 'rgba(90, 154, 110, 0.1)',
  successBorder: 'rgba(90, 154, 110, 0.3)',
  error: '#b06060',
  errorBg: 'rgba(176, 96, 96, 0.1)',
  errorBorder: 'rgba(176, 96, 96, 0.3)',
  warning: '#b87333',
}

export const fonts = {
  heading: "'Instrument Serif', Georgia, serif",
  body: "'DM Sans', sans-serif",
}
```

- [ ] **Step 2: Create Timer.jsx**

Extract the timer logic used in Reading into a shared component. This avoids duplicating timer code across 4 components.

Props:
- `totalTime` (number) — initial countdown in seconds
- `onTimeUp` (function) — callback when timer reaches 0
- `paused` (boolean) — external pause control
- `onTogglePause` (function) — callback to toggle pause

The component:
- Displays formatted time (M:SS)
- Shows pause/play icon button
- Turns red when <120 seconds remaining
- Shows "PAUSED" badge when paused
- Calls `onTimeUp` when timer hits 0

Uses the existing `.timer-btn` and `.pause-badge` CSS classes from `App.css`.

Returns the current `timer` value via a ref or callback so parent components can save it to localStorage.

**Note**: The existing Reading component keeps its own inline timer logic for now (to avoid modifying working code). Writing tasks will use this shared Timer. Future refactor can migrate Reading to use it too.

- [ ] **Step 3: Commit**

```bash
git add src/shared/theme.js src/shared/Timer.jsx && git commit -m "feat: add shared design tokens and Timer component"
```

---

## Task 3: Create Home Page

**Files:**
- Create: `TOEFL/src/pages/Home.jsx`

- [ ] **Step 1: Create Home.jsx**

This is the module selector page with two cards (Reading / Writing). Follow the wireframe in the spec exactly. Use `useNavigate` from react-router-dom for navigation.

Key details:
- Same landing page style as the existing Reading landing (centered, `fadeUp` animation)
- Two cards side by side (`display: flex, gap: 24px`)
- Reading card: "Practice passage with 10 questions · 20 minutes"
- Writing card: "3 Task Types · Build Sentence · Write Email · Discussion · 24 minutes"
- Each card has a "Start →" button navigating to `/reading` or `/writing`
- Use the warm icon style (gradient background, rounded corners) from Reading's landing page
- Reading icon: book SVG (reuse from existing). Writing icon: pencil/pen SVG.
- Reuse the same logo/heading style: `Instrument Serif`, 42px, `#2D2A26`
- Title: "TOEFL Practice"

- [ ] **Step 2: Verify home page renders at /**

```bash
cd "/Users/shaoq/Desktop/VScode Workspace/TOEFL" && npm run dev
```

Open `http://localhost:5173/` — should show two cards. Click "Start →" on Reading card → navigates to `/reading`.

- [ ] **Step 3: Commit**

```bash
git add src/pages/Home.jsx && git commit -m "feat: add home page with module selector"
```

---

## Task 4: Create Writing Landing Page

**Files:**
- Create: `TOEFL/src/pages/Writing.jsx`

- [ ] **Step 1: Create Writing.jsx**

Task type selector with three cards. Follow the spec wireframe:
- "← Back to Home" link at top left (navigates to `/`)
- Title: "Writing Practice" (Instrument Serif)
- Three cards in a row:
  - Build a Sentence: "10 items · 7 min · Grammar & word order"
  - Write an Email: "1 prompt · 7 min · 130-140 words"
  - Academic Discussion: "1 prompt · 10 min · 120+ words"
- Each card navigates to its route
- Same card style as Home page
- Icons for each: sentence=puzzle piece, email=envelope, discussion=chat bubbles (simple SVG)

- [ ] **Step 2: Verify writing page renders at /writing**

Open `http://localhost:5173/writing` — should show three cards. "← Back to Home" works.

- [ ] **Step 3: Commit**

```bash
git add src/pages/Writing.jsx && git commit -m "feat: add writing landing page with task selector"
```

---

## Task 5: Create Build a Sentence Data

**Files:**
- Create: `TOEFL/src/writing/data/buildSentenceData.js`

- [ ] **Step 1: Create buildSentenceData.js with 10 items**

Each item has: `id`, `prompt`, `words` (shuffled array), `correctOrder`, `distractor` (string or null).

Use the examples from the spec + generate additional items covering different grammar patterns:
1. Embedded questions ("Do you know if...")
2. Relative clauses ("The tour guides who...")
3. Passive voice ("The project was completed by...")
4. Conditional ("If you had told me earlier...")
5. Comparative ("The new system is more efficient than...")
6. Present perfect ("She has been working on...")
7. Reported speech ("He mentioned that he would...")
8. Gerund vs infinitive ("She suggested going to...")
9. Inversion ("Not only did he arrive late...")
10. Noun clause ("What surprised everyone was...")

For items with duplicate words (like two "the"s), use the `(1)/(2)` suffix convention from the spec. The display function strips these suffixes.

Items with distractors: items 1, 4, 7 have distractors. Others have `distractor: null`.

Export as: `export const buildSentenceItems = [...]`

- [ ] **Step 2: Commit**

```bash
git add src/writing/data/buildSentenceData.js && git commit -m "feat: add build a sentence practice data (10 items)"
```

---

## Task 6: Build the Build a Sentence Component

**Files:**
- Create: `TOEFL/src/writing/BuildSentence.jsx`
- Create: `TOEFL/src/writing/writing.css`

This is the most complex writing task UI. It needs:
- Timer (7 minutes), question navigation (10 dots), answer slots, word bank
- Landing page (like Reading) → test interface → results

- [ ] **Step 1: Create writing.css**

Add CSS for writing-specific elements. Keep it minimal — only things that need class-based styling:

```css
/* Word chips in Build a Sentence */
.word-chip {
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  font-weight: 500;
  padding: 10px 18px;
  border-radius: 10px;
  border: 1.5px solid #E2DDD5;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;
}
.word-chip:hover { border-color: #D4A574; }
.word-chip.used {
  opacity: 0.3;
  cursor: default;
  border-color: #E2DDD5;
}

/* Answer slots */
.answer-slot {
  min-width: 60px;
  min-height: 44px;
  padding: 10px 14px;
  border-radius: 10px;
  border: 2px dashed #E2DDD5;
  background: rgba(212, 165, 116, 0.03);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #2D2A26;
  transition: all 0.2s ease;
}
.answer-slot.filled {
  border: 1.5px solid #D4A574;
  background: rgba(212, 165, 116, 0.06);
  cursor: pointer;
}
.answer-slot.filled:hover {
  background: rgba(212, 165, 116, 0.12);
}
.answer-slot.empty {
  color: #ADA899;
}

/* Email layout */
.email-layout {
  display: flex;
  height: 100vh;
}
.email-prompt-panel {
  width: 40%;
  border-right: 1px solid #EDE8E0;
  background: white;
  display: flex;
  flex-direction: column;
}
.email-editor-panel {
  width: 60%;
  display: flex;
  flex-direction: column;
  background: #FAFAF8;
}

/* Discussion layout */
.discussion-layout {
  min-height: 100vh;
  background: #FAFAF8;
  display: flex;
  flex-direction: column;
}

/* Writing result bars */
.score-bar-track {
  height: 8px;
  border-radius: 4px;
  background: #EDE8E0;
  overflow: hidden;
}
.score-bar-fill {
  height: 100%;
  border-radius: 4px;
  background: linear-gradient(135deg, #D4A574 0%, #C4956A 100%);
  transition: width 0.6s ease-out;
}

/* Writing responsive */
@media (max-width: 768px) {
  .email-layout {
    flex-direction: column;
    height: auto;
    min-height: 100vh;
  }
  .email-prompt-panel,
  .email-editor-panel {
    width: 100%;
    border-right: none;
  }
  .email-prompt-panel {
    max-height: 35vh;
    overflow-y: auto;
    border-bottom: 1px solid #EDE8E0;
  }
}
```

- [ ] **Step 2: Create BuildSentence.jsx**

Structure the component with these states:
- `started` (boolean) — controls landing vs test view
- `currentItem` (number) — current question index 0-9
- `answers` (object) — `{ [itemIndex]: [...placedWords] }` per item
- `timer` (number) — countdown from 7*60 = 420
- `paused` (boolean)
- `showResult` (boolean)
- `showReview` (boolean)
- `showConfirm` (boolean)

Key implementation details:

**Display helper**: `displayWord(word)` strips `(1)`, `(2)` suffixes for display:
```js
const displayWord = (w) => w.replace(/\(\d+\)$/, '')
```

**Landing page**: Same design as Reading landing (centered, icon + title + Start button). Title: "Build a Sentence". Subtitle: "10 items · 7 minutes". Show "Resume" if saved progress exists.

**Test interface**:
- Top bar: timer (left) + question nav dots (right)
- Prompt: the context question in a styled box
- Answer slots: row of empty/filled boxes (use flexWrap for mobile)
- "Remaining: X slots" counter below answer area
- Word bank: shuffled word chips below
- Reset button
- Bottom nav: Previous / Next (last item shows "Submit" with confirm dialog)

**Timer**: Reuse the exact same logic from Reading (countdown, auto-submit at 0, red at <120s, spacebar pause).

**localStorage**: Key `toefl-writing-build-sentence`. Save `{ currentItem, answers, timer }`. Clear on submit.

**Results page**: Show score ring (X/10), then per-item review cards. Each card shows:
- User's answer as placed word chips
- Correct answer as word chips
- Green border if correct, red if incorrect
- "Try Again" + "Back to Writing" buttons

- [ ] **Step 3: Verify Build a Sentence works end-to-end**

```bash
cd "/Users/shaoq/Desktop/VScode Workspace/TOEFL" && npm run dev
```

Open `http://localhost:5173/writing/build-sentence`:
1. Landing page shows → click "Start"
2. Can place words into slots by clicking
3. Can remove words by clicking filled slots
4. Can navigate between questions
5. Timer counts down
6. Submit → results with score

- [ ] **Step 4: Commit**

```bash
git add src/writing/BuildSentence.jsx src/writing/writing.css && git commit -m "feat: add Build a Sentence task with full UI and scoring"
```

---

## Task 7: Create Email Data

**Files:**
- Create: `TOEFL/src/writing/data/emailData.js`

- [ ] **Step 1: Create emailData.js with 3 prompts**

Each prompt has: `id`, `situation`, `goals` (array of 3 strings), `recipient`, `sampleResponse`, `sampleScore`.

Prompts:
1. **Restaurant complaint** (from spec): situation about bad restaurant experience, goals: explain problem, describe reaction, suggest alternatives. Recipient: Kevin.
2. **Missed a quiz**: You missed a quiz due to a family emergency. Write to your professor. Goals: explain why you missed it, ask about make-up options, provide documentation.
3. **Noisy neighbors**: Your apartment neighbors are very loud late at night. Write to the building manager. Goals: describe the noise issue, explain how it affects you, request a resolution.

Include full sample high-scoring responses (5-7 sentences each, 130-140 words).

Export as: `export const emailPrompts = [...]`

- [ ] **Step 2: Commit**

```bash
git add src/writing/data/emailData.js && git commit -m "feat: add email writing practice data (3 prompts)"
```

---

## Task 8: Build the Write an Email Component

**Files:**
- Create: `TOEFL/src/writing/WriteEmail.jsx`

- [ ] **Step 1: Create WriteEmail.jsx**

Import `./writing.css` at the top (same CSS file created in Task 6, contains `.email-layout`, `.email-prompt-panel`, `.email-editor-panel` classes).

Import `Timer` from `../shared/Timer.jsx` for the countdown timer.

States:
- `started` (boolean)
- `subject` (string) — subject line
- `body` (string) — email body text
- `timer` (number) — 7*60 = 420
- `paused` (boolean)
- `showResult` (boolean)
- `currentPrompt` (number) — which of the 3 prompts (randomly selected on start, or sequential)

**Landing page**: Same style. Title: "Write an Email". Subtitle: "1 prompt · 7 minutes · 130-140 words".

**Test interface** (side-by-side, see spec wireframe):
- Left panel (40%): situation text + bulleted goals. Read-only. Header with timer.
- Right panel (60%):
  - Subject line `<input>` at top
  - Auto greeting: "Dear [recipient]," (not editable, displayed above textarea)
  - `<textarea>` for body (auto-growing or fixed height with scroll)
  - Auto closing: "Best regards," + "[Your Name]" (displayed below textarea, not editable)
  - Live word count at bottom-right of textarea area
    - Count only the body text words (not greeting/closing)
    - Green: 80-180 words
    - Yellow: <80 words
    - Red: >180 words
- Submit button at bottom

**localStorage**: Key `toefl-writing-email`. Save `{ subject, body, timer, promptId }`. Clear on submit.

**On submit**: Run the scoring engine (Task 12) on the full email text (greeting + body + closing). Display results inline using `WritingResult` component (Task 13).

For now, since the scorer doesn't exist yet, just show the result page with a placeholder score. We'll wire the real scorer in Task 14.

- [ ] **Step 2: Verify email task renders and accepts input**

Open `http://localhost:5173/writing/email`:
1. Landing → Start
2. Left panel shows prompt, right panel has subject + textarea
3. Word count updates as you type
4. Timer works
5. Submit shows placeholder result

- [ ] **Step 3: Commit**

```bash
git add src/writing/WriteEmail.jsx && git commit -m "feat: add Write an Email task with UI and word count"
```

---

## Task 9: Create Discussion Data

**Files:**
- Create: `TOEFL/src/writing/data/discussionData.js`

- [ ] **Step 1: Create discussionData.js with 3 prompts**

Each prompt has: `id`, `professor` (`{ name, question }`), `students` (array of 2 `{ name, opinion }`), `sampleResponse`, `sampleScore`.

Use the examples from the web research:
1. **University amenities** (from spec): Dr. Johnson asks about university spending. Sarah supports amenities, Mark opposes.
2. **School calendar**: Prof. Williams asks about year-round vs traditional calendar. Liam supports traditional (summer break needed), Maya supports year-round (prevents summer slide).
3. **Biometric technology**: Dr. Chen asks about biometrics in daily life. Alex supports (convenience/security), Maya opposes (privacy risk, can't reset fingerprints).

Include full sample responses (~120-150 words each).

Export as: `export const discussionPrompts = [...]`

- [ ] **Step 2: Commit**

```bash
git add src/writing/data/discussionData.js && git commit -m "feat: add academic discussion practice data (3 prompts)"
```

---

## Task 10: Build the Academic Discussion Component

**Files:**
- Create: `TOEFL/src/writing/AcademicDiscussion.jsx`

- [ ] **Step 1: Create AcademicDiscussion.jsx**

Import `./writing.css` at the top (contains `.discussion-layout` and score bar classes).

Import `Timer` from `../shared/Timer.jsx` for the countdown timer.

States:
- `started` (boolean)
- `response` (string) — user's response text
- `timer` (number) — 10*60 = 600
- `paused` (boolean)
- `showResult` (boolean)
- `currentPrompt` (number)

**Landing page**: Title: "Academic Discussion". Subtitle: "1 prompt · 10 minutes · 120+ words".

**Test interface** (single column, scrollable):
- Header: timer + "Academic Discussion" label
- Professor card: avatar circle with initial + name + question text. Styled as a discussion post with a subtle background.
- Two student cards: side by side on desktop, stacked on mobile. Each has avatar + name + opinion text. Different subtle background tints.
- Divider
- "Your Response:" section with textarea
- Live word count: green when ≥120, yellow when <120
- Submit button

**Key styling for discussion posts**:
- Professor: slightly larger card, background `rgba(212, 165, 116, 0.04)`, left border `#D4A574`
- Students: white background, border `#EDE8E0`, smaller text
- Avatar circles: 36px, initials, different pastel colors per person

**localStorage**: Key `toefl-writing-discussion`. Save `{ response, timer, promptId }`.

**On submit**: Placeholder score for now (same as email). Wired to real scorer in Task 14.

- [ ] **Step 2: Verify discussion task renders end-to-end**

Open `http://localhost:5173/writing/discussion`:
1. Landing → Start
2. Professor question + 2 student posts visible
3. Textarea accepts input, word count updates
4. Submit works

- [ ] **Step 3: Commit**

```bash
git add src/writing/AcademicDiscussion.jsx && git commit -m "feat: add Academic Discussion task with UI"
```

---

## Task 11: Build the Scoring Engine

**Files:**
- Create: `TOEFL/src/writing/scorer/wordlist.js`
- Create: `TOEFL/src/writing/scorer/grammar.js`
- Create: `TOEFL/src/writing/scorer/mechanics.js`
- Create: `TOEFL/src/writing/scorer/vocabulary.js`
- Create: `TOEFL/src/writing/scorer/organization.js`
- Create: `TOEFL/src/writing/scorer/development.js`
- Create: `TOEFL/src/writing/scorer/style.js`
- Create: `TOEFL/src/writing/scorer/index.js`

This is the e-rater replica. Each module exports `{ score(text, options), suggest(analysis) }` where `score` returns `{ value: 0.0-1.0, details: string, errors?: string[] }` and `suggest` returns an array of suggestion strings.

**Note on format**: The spec uses `score` as the property name, but this plan uses `value` to avoid confusion with the function name `score()`. The `WritingResult.jsx` component must use `value` to access dimension scores (e.g., `breakdown.grammar.value`). The spec's vocabulary sub-dimensions (wordLength + rareWords at 7% each) are consolidated into a single `vocabulary` module at 14% weight — functionally identical.

- [ ] **Step 1: Create wordlist.js**

This file contains two exported arrays:
- `commonWords`: ~3000 most frequent English words (function words + common content words). Used by vocabulary.js to identify rare words.
- `academicWords`: ~570 TOEFL-relevant academic words (full AWL - Academic Word List, all 10 sublists). Words like "analyze", "constitute", "derive", "enhance", etc.
- `validWords`: combined set (~10000 words) used by mechanics.js for spell checking. Include common words + academic words + additional high-frequency words from standard English. Target ~10k entries as specified in the spec to minimize false positives.

Source: hardcode a curated list. Focus on coverage of words a TOEFL test-taker would realistically use. This doesn't need to be exhaustive — it's a heuristic.

Export as Sets for O(1) lookup:
```js
export const commonWords = new Set([...])
export const academicWords = new Set([...])
export const validWords = new Set([...commonWords, ...academicWords, /* additional common words */])
```

- [ ] **Step 2: Create grammar.js**

```js
// Exports: score(text), suggest(analysis)
// Detects: fragments, run-ons, subject-verb disagreement, double negatives
// Returns: { value: 0.0-1.0, details: string, errors: string[] }
```

Implementation approach:
- Split text into sentences (by `.`, `?`, `!`)
- **Fragments**: sentences with <3 words or no verb-like word (check against common verb patterns)
- **Run-ons**: sentences with >40 words and no conjunction/semicolon
- **Comma splices**: two independent clauses joined by just a comma (detect patterns like `, he/she/they/it/I/we`)
- **Double negatives**: detect "not...no", "never...no", "don't...nothing" patterns

Score = 1.0 - (errorCount / sentenceCount), clamped to [0, 1].

- [ ] **Step 3: Create mechanics.js**

```js
// Exports: score(text), suggest(analysis)
// Detects: spelling errors, punctuation, capitalization
// Returns: { value: 0.0-1.0, details: string, errors: string[] }
```

Implementation:
- **Spelling**: tokenize into words, check each against `validWords` set. Skip words <3 chars, all-caps (acronyms), words with numbers. Count misspelled words.
- **Capitalization**: first word of each sentence should be capitalized. Check for "i" not capitalized as "I".
- **Punctuation**: sentences should end with `.`, `?`, or `!`. Check for double spaces, missing space after punctuation.

Score = 1.0 - (errorCount / totalWords), clamped to [0, 1].

- [ ] **Step 4: Create vocabulary.js**

```js
// Exports: score(text), suggest(analysis)
// Measures: average word length + rare word ratio
// Returns: { value: 0.0-1.0, details: string }
```

Implementation:
- **Word length score**: avg word length. Map: ≤3.5 → 0.2, 4.0 → 0.4, 4.5 → 0.6, 5.0 → 0.8, ≥5.5 → 1.0. Linear interpolation between.
- **Rare word score**: % of content words (excluding function words) NOT in `commonWords`. Map: 0% → 0.2, 5% → 0.4, 10% → 0.6, 15% → 0.8, ≥20% → 1.0.
- Combined: (wordLengthScore + rareWordScore) / 2

- [ ] **Step 5: Create organization.js**

```js
// Exports: score(text, taskType), suggest(analysis)
// Measures: discourse markers, paragraph structure, transitions
// Returns: { value: 0.0-1.0, details: string }
```

Implementation:
- **Discourse markers list**: ~40 markers grouped by type (addition: moreover, furthermore, additionally; contrast: however, nevertheless, on the other hand; example: for instance, for example, such as; conclusion: in conclusion, therefore, consequently; sequence: firstly, secondly, finally)
- **Marker density**: count unique markers / sentence count. Map: 0 → 0.2, 0.1 → 0.4, 0.2 → 0.6, 0.3 → 0.8, ≥0.4 → 1.0
- **Paragraph score**: split by `\n\n` or `\n`. 1 paragraph → 0.4, 2 → 0.7, 3+ → 1.0
- **Task-specific** (`taskType` param):
  - Email: check for greeting pattern ("Dear...", "Hello...") → bonus. Check for closing pattern ("Best regards", "Sincerely") → bonus.
  - Discussion: check for engagement markers ("I agree with...", "While [name] makes a good point...") → bonus.
- Combined: (markerDensity * 0.5 + paragraphScore * 0.3 + taskSpecific * 0.2)

- [ ] **Step 6: Create development.js**

```js
// Exports: score(text, taskType), suggest(analysis)
// Measures: word count adequacy, detail markers, sentence count
// Returns: { value: 0.0-1.0, details: string }
```

Implementation:
- **Word count score** (depends on `taskType`):
  - Email: target 80-180 words. <40 → 0.1, 40-79 → 0.4, 80-180 → 1.0, >180 → 0.8
  - Discussion: target 100-200 words. <60 → 0.1, 60-99 → 0.4, 100-200 → 1.0, >200 → 0.9
- **Detail markers**: count occurrences of "for example", "such as", "specifically", "in particular", "according to", "for instance", "namely". Map: 0 → 0.3, 1 → 0.6, 2 → 0.8, ≥3 → 1.0
- **Sentence count**: more sentences = more developed. Map: ≤2 → 0.2, 3-4 → 0.5, 5-7 → 0.8, ≥8 → 1.0
- Combined: (wordCountScore * 0.5 + detailMarkers * 0.3 + sentenceCount * 0.2)

- [ ] **Step 7: Create style.js**

```js
// Exports: score(text), suggest(analysis)
// Measures: lexical diversity, sentence length variance, word repetition
// Returns: { value: 0.0-1.0, details: string }
```

Implementation:
- **Type-token ratio (TTR)**: uniqueWords / totalWords. Map: ≤0.4 → 0.2, 0.5 → 0.4, 0.6 → 0.6, 0.7 → 0.8, ≥0.8 → 1.0
- **Sentence length variance**: standard deviation of word counts per sentence. Map: 0 → 0.2, 2 → 0.4, 4 → 0.6, 6 → 0.8, ≥8 → 1.0 (higher variance = more variety = better)
- **Repetition penalty**: find content words (>4 chars, not in function word list) used ≥3 times. Each repeated word deducts 0.1 from score, min 0.
- Combined: (TTR * 0.4 + variance * 0.4 - repetitionPenalty), clamped to [0, 1]

- [ ] **Step 8: Create index.js (scoring engine entry)**

```js
import { score as grammarScore, suggest as grammarSuggest } from './grammar.js'
import { score as mechanicsScore, suggest as mechanicsSuggest } from './mechanics.js'
import { score as vocabScore, suggest as vocabSuggest } from './vocabulary.js'
import { score as orgScore, suggest as orgSuggest } from './organization.js'
import { score as devScore, suggest as devSuggest } from './development.js'
import { score as styleScore, suggest as styleSuggest } from './style.js'

const WEIGHTS = {
  grammar: 0.08,
  mechanics: 0.10,
  vocabulary: 0.14,
  organization: 0.32,
  development: 0.30,
  style: 0.06,
}

export function scoreWriting(text, taskType = 'email') {
  const grammar = grammarScore(text)
  const mechanics = mechanicsScore(text)
  const vocabulary = vocabScore(text)
  const organization = orgScore(text, taskType)
  const development = devScore(text, taskType)
  const style = styleScore(text)

  const breakdown = { grammar, mechanics, vocabulary, organization, development, style }

  const rawScore =
    grammar.value * WEIGHTS.grammar +
    mechanics.value * WEIGHTS.mechanics +
    vocabulary.value * WEIGHTS.vocabulary +
    organization.value * WEIGHTS.organization +
    development.value * WEIGHTS.development +
    style.value * WEIGHTS.style

  const overall = Math.round(rawScore * 5)

  // Collect suggestions from the 3 lowest-scoring dimensions
  const sorted = Object.entries(breakdown)
    .sort((a, b) => a[1].value - b[1].value)
    .slice(0, 3)

  const suggestions = sorted.flatMap(([key]) => {
    const suggestFn = { grammar: grammarSuggest, mechanics: mechanicsSuggest,
      vocabulary: vocabSuggest, organization: orgSuggest,
      development: devSuggest, style: styleSuggest }[key]
    return suggestFn(breakdown[key])
  }).slice(0, 5)

  return { overall, breakdown, suggestions }
}
```

- [ ] **Step 9: Verify scorer works with a test string**

Open browser console at any page and run:
```js
import('/src/writing/scorer/index.js').then(m => console.log(m.scoreWriting("This is a test. However, I believe that education is important. For example, many students benefit from structured learning environments. Furthermore, research shows that consistent practice leads to improvement.", 'discussion')))
```

Should output an object with `overall` (0-5), `breakdown` (6 dimensions), and `suggestions` (array).

- [ ] **Step 10: Commit**

```bash
git add src/writing/scorer/ && git commit -m "feat: add e-rater inspired scoring engine (6 modules)"
```

---

## Task 12: Build the Writing Result Component

**Files:**
- Create: `TOEFL/src/writing/WritingResult.jsx`

- [ ] **Step 1: Create WritingResult.jsx**

This is a shared component used by WriteEmail and AcademicDiscussion to display scoring results.

Props:
- `score` — the scoring output object from `scoreWriting()`
- `userText` — user's written text
- `sampleResponse` — the sample high-scoring response
- `sampleScore` — score of the sample
- `taskType` — 'email' or 'discussion'
- `onRetry` — callback for "Try Again" button
- `onBack` — callback for "Back to Writing" button

Layout:
1. **Score ring** (reuse Reading's conic-gradient design): `score.overall` / 5
2. **Dimension bars**: 6 horizontal progress bars, one per scoring dimension
   - Label on left (Grammar, Mechanics, Vocabulary, Organization, Development, Style)
   - Progress bar in middle (CSS `.score-bar-track` + `.score-bar-fill`)
   - Score value on right (e.g., "0.85")
   - If dimension has errors, show them as small red text below the bar
3. **Suggestions section**: expandable cards with improvement tips from `score.suggestions`
4. **Side-by-side comparison**: two columns — "Your Response" (left) + "Sample Response" (right). On mobile, tabs instead of columns.
5. **Action buttons**: "Try Again" + "Back to Writing"

Use the same visual language as Reading's result page (fadeUp animation, same fonts/colors).

- [ ] **Step 2: Commit**

```bash
git add src/writing/WritingResult.jsx && git commit -m "feat: add shared WritingResult component with score display"
```

---

## Task 13: Wire Scorer into Email and Discussion Tasks

**Files:**
- Modify: `TOEFL/src/writing/WriteEmail.jsx`
- Modify: `TOEFL/src/writing/AcademicDiscussion.jsx`

- [ ] **Step 1: Update WriteEmail.jsx**

Replace placeholder score with real scorer:
- Import `scoreWriting` from `./scorer/index.js`
- Import `WritingResult` from `./WritingResult.jsx`
- On submit, compute: `const result = scoreWriting(fullEmailText, 'email')`
  - `fullEmailText` = `Dear ${recipient},\n\n${body}\n\nBest regards,\n[Your Name]`
- When `showResult` is true, render `<WritingResult score={result} userText={body} sampleResponse={prompt.sampleResponse} sampleScore={prompt.sampleScore} taskType="email" onRetry={handleRetry} onBack={() => navigate('/writing')} />`

- [ ] **Step 2: Update AcademicDiscussion.jsx**

Same pattern:
- Import scorer + WritingResult
- On submit: `const result = scoreWriting(response, 'discussion')`
- Render WritingResult when showResult is true

- [ ] **Step 3: Verify full scoring flow**

Open email task → write a response → submit → see score ring + dimension bars + suggestions + sample comparison.
Open discussion task → same flow.

- [ ] **Step 4: Commit**

```bash
git add src/writing/WriteEmail.jsx src/writing/AcademicDiscussion.jsx && git commit -m "feat: wire scoring engine into email and discussion tasks"
```

---

## Task 14: Final Integration and Polish

**Files:**
- Modify: `TOEFL/src/main.jsx` (ensure all routes work)
- Modify: `TOEFL/src/writing/writing.css` (final responsive fixes)
- Possibly modify: various files for bug fixes

- [ ] **Step 1: Full end-to-end walkthrough**

Test every route and flow:
1. `/` — Home shows two cards, both navigate correctly
2. `/reading` — Existing Reading works unchanged
3. `/writing` — Three task cards, all navigate correctly, "Back to Home" works
4. `/writing/build-sentence` — Full flow: landing → test → navigate items → submit → results → review → try again
5. `/writing/email` — Full flow: landing → write → word count → submit → scored results → sample comparison → try again
6. `/writing/discussion` — Full flow: landing → read prompt → write → submit → scored results → try again
7. Refresh mid-test — localStorage resumes correctly for all 3 tasks
8. Timer at 0 — auto-submits for all 3 tasks
9. Mobile view (resize browser to <768px) — all layouts stack properly

- [ ] **Step 2: Fix any issues found in walkthrough**

Address bugs, alignment issues, missing interactions discovered during testing.

- [ ] **Step 3: Clean up App.jsx redirect placeholder**

If `src/App.jsx` is still the redirect placeholder from Task 1, either delete it or keep it as a convenience redirect. Since `main.jsx` handles all routing now, `App.jsx` is no longer the entry point. Delete it if nothing imports it.

- [ ] **Step 4: Final commit**

```bash
git add src/ && git commit -m "feat: complete TOEFL Writing module - all 3 tasks with e-rater scoring"
```

---

## Execution Summary

| Task | What it builds | Key files |
|------|---------------|-----------|
| 1 | Routing infrastructure | main.jsx, Reading.jsx |
| 2 | Design tokens + shared Timer | theme.js, Timer.jsx |
| 3 | Home page | Home.jsx |
| 4 | Writing landing page | Writing.jsx |
| 5 | Build a Sentence data | buildSentenceData.js |
| 6 | Build a Sentence UI | BuildSentence.jsx, writing.css |
| 7 | Email data | emailData.js |
| 8 | Email task UI | WriteEmail.jsx |
| 9 | Discussion data | discussionData.js |
| 10 | Discussion task UI | AcademicDiscussion.jsx |
| 11 | Scoring engine (6 modules) | scorer/*.js |
| 12 | Result display component | WritingResult.jsx |
| 13 | Wire scorer into tasks | WriteEmail.jsx, AcademicDiscussion.jsx |
| 14 | Integration testing + polish | Various |

**Total: 14 tasks, ~50 steps**

Each task produces a working commit. The app is functional after each task (routes that don't exist yet simply show nothing). Build a Sentence works fully after Task 6. Email and Discussion work with placeholder scores after Tasks 8 and 10, then get real scoring after Task 13.
