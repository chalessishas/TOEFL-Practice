# TOEFL 2026 Writing Module Design Spec

## Overview

Integrate a Writing practice module into the existing TOEFL Reading app, covering all three 2026 TOEFL writing task types with a local e-rater-inspired scoring engine.

**Tech stack**: React 19 + Vite (existing), add `react-router-dom`
**Design system**: Reuse existing warm-tone theme (DM Sans, Instrument Serif, #D4A574 primary, #FAFAF8 background)

---

## Architecture

### Project Structure

```
TOEFL/src/
├── main.jsx                       # Add BrowserRouter
├── pages/
│   ├── Home.jsx                   # Module selector (Reading / Writing)
│   ├── Reading.jsx                # Existing App.jsx renamed
│   └── Writing.jsx                # Writing module entry (task selector)
├── writing/
│   ├── BuildSentence.jsx          # Task 1: Build a Sentence
│   ├── WriteEmail.jsx             # Task 2: Write an Email
│   ├── AcademicDiscussion.jsx     # Task 3: Academic Discussion
│   ├── WritingResult.jsx          # Shared result/review page
│   ├── scorer/
│   │   ├── index.js               # Scoring engine entry, combines all modules
│   │   ├── grammar.js             # Subject-verb agreement, tense, fragments, run-ons
│   │   ├── mechanics.js           # Spelling, punctuation, capitalization
│   │   ├── vocabulary.js          # Word length, rare word ratio (via frequency list)
│   │   ├── organization.js        # Discourse markers, paragraph count, connectors
│   │   ├── development.js         # Word count, detail density, exemplification markers
│   │   └── style.js               # Repetition rate, sentence length variance
│   └── data/
│       ├── buildSentenceData.js   # 10+ sentence items
│       ├── emailData.js           # 3+ email prompts with sample responses
│       └── discussionData.js      # 3+ discussion prompts with sample responses
├── shared/
│   ├── Timer.jsx                  # Extracted from Reading
│   ├── theme.js                   # Shared design tokens
│   └── QuestionNav.jsx            # Shared question dot navigation
├── data.js                        # Existing Reading data (unchanged)
├── App.css                        # Existing styles (unchanged)
└── index.css
```

### Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | Home | Module selector |
| `/reading` | Reading | Existing reading practice |
| `/writing` | Writing | Task type selector |
| `/writing/build-sentence` | BuildSentence | Sentence building practice |
| `/writing/email` | WriteEmail | Email writing practice |
| `/writing/discussion` | AcademicDiscussion | Discussion writing practice |

### Routing Migration

The existing app uses state-based navigation (`useState` for view switching). This migration replaces it with `react-router-dom`:
- Existing `App.jsx` becomes `pages/Reading.jsx`, all internal state navigation remains unchanged
- `main.jsx` wraps the app in `<BrowserRouter>` with `<Routes>`
- `WritingResult` is **not a separate route** — it renders inline within each task component via state toggle (same pattern as existing Reading results)

### Timer Behavior

All three writing tasks follow the same timer rules (consistent with existing Reading module):
- Timer counts down from task limit (7min / 7min / 10min)
- At 2 minutes remaining: timer text turns red
- At 0: auto-submit current work, show results
- Pause button available (spacebar shortcut)

### State Persistence

All writing tasks persist progress to `localStorage` (same pattern as existing Reading):
- Build a Sentence: saves current item index + per-item answers
- Write an Email: saves subject line + body text + timer
- Academic Discussion: saves response text + timer
- Cleared on submit or explicit "Start Fresh"

---

## Task 1: Build a Sentence

### Exam Spec
- 10 items, 7 minutes total
- Each item: a context prompt + 5-7 word chunks to arrange into a correct sentence
- Some items have 1 distractor word (not used in answer)
- Scoring: binary (all-or-nothing per item)
- Users can navigate forward/backward between items

### Interface Layout
```
┌─────────────────────────────────────────────────┐
│  [Timer: 6:42]              [1] [2] ... [10]    │  <- Header with timer + nav dots
├─────────────────────────────────────────────────┤
│                                                 │
│  Context:                                       │
│  "What was the highlight of your trip?"          │
│                                                 │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐      │  <- Answer slots (empty boxes)
│  │     │ │     │ │     │ │     │ │     │        │     Click filled slot to remove
│  └─────┘ └─────┘ └─────┘ └─────┘ └─────┘      │
│                                                 │
│  Remaining: 5 slots                             │
│                                                 │
│  ┌──────────┐ ┌───────┐ ┌─────────────────┐    │  <- Word bank (clickable chips)
│  │tour guides│ │ were  │ │showed us around │    │     Click to place in next slot
│  └──────────┘ └───────┘ └─────────────────┘    │     Selected = greyed out
│  ┌──────┐ ┌──────────┐ ┌──────┐ ┌──────┐      │
│  │ the  │ │ old city │ │ who  │ │ was  │       │  <- "was" is distractor
│  └──────┘ └──────────┘ └──────┘ └──────┘      │
│                                                 │
│  [Reset]                                        │
│                                                 │
│  [← Previous]                      [Next →]     │
└─────────────────────────────────────────────────┘
```

### Interaction
1. Click word chip → fills next empty slot, chip becomes disabled (opacity 0.3)
2. Click filled slot → word returns to bank, chip re-enables
3. Reset button → clears all slots for current item
4. Navigation saves current state per item
5. "Remaining: X slots" counter updates live as user places/removes words
6. On last item (item 10), "Next" button changes to "Submit" with confirmation dialog (same pattern as Reading)
7. Click-only interaction (no drag-and-drop) — matches PrepEx implementation and simplifies mobile UX

### Data Structure
```js
{
  id: 1,
  prompt: "What was the highlight of your trip?",
  words: ["the(1)", "tour guides", "showed us around", "the(2)", "old city", "who", "were", "was"],
  // words with duplicate labels use (1)/(2) suffix internally, displayed without suffix
  correctOrder: ["the(1)", "tour guides", "who", "showed us around", "the(2)", "old city", "were"],
  distractor: "was"  // null if no distractor
}
```

### Scoring
- Exact match against `correctOrder` (after filtering out distractor)
- Score = correct count / 10

---

## Task 2: Write an Email

### Exam Spec
- 1 prompt, 7 minutes
- Situation description + 3 communicative goals (bullet points)
- Must write: subject line + greeting + body + closing + sign-off
- Target: 130-140 words
- Scored 0-5 by e-rater rubric

### Interface Layout
```
┌────────────────────────┬────────────────────────┐
│  [Timer: 6:42]         │                        │
├────────────────────────┤  Subject: [________]   │
│                        │                        │
│  SITUATION             │  Dear Kevin,           │  <- Auto-filled greeting
│                        │                        │
│  You took your team    │  ┌──────────────────┐  │
│  to a new restaurant   │  │                  │  │  <- Textarea for body
│  recommended by your   │  │  (user types     │  │
│  coworker Kevin...     │  │   email here)    │  │
│                        │  │                  │  │
│  In your email:        │  │                  │  │
│  • Explain what was    │  └──────────────────┘  │
│    wrong               │                        │
│  • Describe the team's │  Best regards,         │  <- Auto-filled closing
│    reaction            │  [Your Name]           │
│  • Suggest alternative │                        │
│    lunch arrangements  │  Words: 87 / 130-140   │  <- Live word count
│                        │                        │
├────────────────────────┴────────────────────────┤
│  [Submit Email]                                 │
└─────────────────────────────────────────────────┘
```

### Interaction
1. Left panel: read-only prompt with situation + goals
2. Right panel: subject line input + body textarea + auto greeting/closing
3. Live word count (green when in range, yellow when under, red when over)
4. Submit → run scoring engine → show results with rubric breakdown

### Data Structure
```js
{
  id: 1,
  situation: "You took your team to a new restaurant recommended by your coworker, Kevin, but the food was disappointing and the service was slow.",
  goals: [
    "Explain what was wrong with the restaurant",
    "Describe the team's reaction",
    "Suggest alternative lunch arrangements"
  ],
  recipient: "Kevin",
  sampleResponse: "Dear Kevin, ...",
  sampleScore: 5
}
```

---

## Task 3: Academic Discussion

### Exam Spec
- 1 prompt, 10 minutes
- Professor posts a discussion question
- Two students post differing opinions
- User writes a response contributing to the discussion
- Target: 120+ words
- Scored 0-5 by e-rater rubric

### Interface Layout
```
┌─────────────────────────────────────────────────┐
│  [Timer: 9:15]                Academic Discussion│
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌─────────────────────────────────────────┐    │
│  │ 👤 Dr. Johnson                          │    │  <- Professor prompt
│  │ "Universities today often compete to    │    │
│  │  attract students. Is it justifiable    │    │
│  │  for universities to invest heavily     │    │
│  │  in student amenities?"                 │    │
│  └─────────────────────────────────────────┘    │
│                                                 │
│  ┌──────────────────┐ ┌──────────────────┐      │
│  │ 👤 Sarah         │ │ 👤 Mark          │      │  <- Two student posts
│  │ "When students   │ │ "The primary     │      │
│  │  are happy and   │ │  reason we pay   │      │
│  │  healthy..."     │ │  for university  │      │
│  └──────────────────┘ │  is education..."│      │
│                       └──────────────────┘      │
│                                                 │
│  ┌─────────────────────────────────────────┐    │
│  │ Your Response:                          │    │
│  │ ┌─────────────────────────────────────┐ │    │  <- User textarea
│  │ │                                     │ │    │
│  │ │  (user types response here)         │ │    │
│  │ │                                     │ │    │
│  │ └─────────────────────────────────────┘ │    │
│  │                        Words: 95 / 120+ │    │
│  └─────────────────────────────────────────┘    │
│                                                 │
│  [Submit Response]                              │
└─────────────────────────────────────────────────┘
```

### Interaction
1. Scrollable top section: professor question + student posts (read-only)
2. Bottom section: user textarea with live word count
3. Submit → run scoring engine → show results

### Data Structure
```js
{
  id: 1,
  professor: {
    name: "Dr. Johnson",
    question: "Universities today often compete fiercely to attract new students..."
  },
  students: [
    { name: "Sarah", opinion: "When students are happy and healthy mentally, they perform better..." },
    { name: "Mark", opinion: "The primary reason we pay for university is to get an education..." }
  ],
  sampleResponse: "While I appreciate the points mentioned by both Sarah and Mark...",
  sampleScore: 5
}
```

---

## Scoring Engine (e-rater Replica)

### Architecture

Pure frontend JS. No external API calls. Applies to Write an Email and Academic Discussion tasks.

**Important**: This is a heuristic approximation of e-rater, not a production-grade NLP engine. Grammar detection uses pattern matching and will have false positives. The goal is "directionally useful feedback" — good enough for practice, not for official scoring. Spelling dictionary source: a bundled JSON file of ~10k common English words + TOEFL academic word list (AWL).

**Suggestions generation**: `index.js` generates suggestions by collecting errors from each module and prioritizing the 3 lowest-scoring dimensions. Each module provides a `suggest()` method returning 1-2 actionable tips based on detected issues.

```
User Text
   │
   ├─→ grammar.js      (8%)   → grammar errors count
   ├─→ mechanics.js     (10%)  → spelling/punctuation errors
   ├─→ vocabulary.js    (14%)  → word length (7%) + rare words (7%)
   ├─→ organization.js  (32%)  → discourse markers + paragraph structure
   ├─→ development.js   (30%)  → word count + detail density + examples
   └─→ style.js         (6%)   → repetition + sentence variety
         │
         ▼
   index.js → weighted sum → map to 0-5 scale
```

### Module Details

#### grammar.js
Detects:
- Subject-verb agreement errors (common patterns)
- Missing articles before countable nouns
- Sentence fragments (no main verb)
- Run-on sentences (comma splices)
- Double negatives

Score: 1.0 (no errors) → 0.0 (many errors), based on error rate per sentence.

#### mechanics.js
Detects:
- Spelling errors (against a dictionary word list, ~10k common words + academic words)
- Missing period/question mark at sentence end
- Capitalization errors (sentence start, proper nouns)
- Common typos (teh → the, recieve → receive)

#### vocabulary.js
Measures:
- **Average word length**: longer words → higher score (academic register)
- **Rare word ratio**: % of words NOT in the top-2000 frequency list (rewards sophisticated vocabulary)
- Uses a bundled word frequency list (~5000 entries)

#### organization.js
Measures:
- **Discourse markers count**: however, moreover, furthermore, in addition, for instance, on the other hand, etc.
- **Paragraph count**: multiple paragraphs → higher score
- **Opening/closing signals**: detects greeting/conclusion patterns (for email); thesis statement detection (for discussion)
- **Transition density**: ratio of transition words to total sentences

#### development.js
Measures:
- **Word count**: maps to expected range (email: 80-180, discussion: 100-200)
- **Detail markers**: for example, such as, specifically, in particular, according to
- **Sentence count**: more sentences → more developed argument

#### style.js
Measures:
- **Lexical diversity**: unique words / total words (type-token ratio)
- **Sentence length variance**: standard deviation of sentence lengths (variety = good)
- **Word repetition**: penalizes words used 3+ times (excluding function words)

### Score Mapping

Each module outputs 0.0 - 1.0. Final score:

```
rawScore = grammar * 0.08 + mechanics * 0.10 + wordLength * 0.07
         + rareWords * 0.07 + organization * 0.32 + development * 0.30
         + style * 0.06
// weights sum to 1.0

finalScore = round(rawScore * 5)  // maps to 0-5 scale
```

### Scoring Output Format
```js
{
  overall: 4,        // 0-5
  breakdown: {
    grammar: { score: 0.85, errors: ["Run-on sentence at line 3"] },
    mechanics: { score: 0.9, errors: ["Spelling: 'recieve' → 'receive'"] },
    vocabulary: { score: 0.7, details: "Avg word length: 4.8, Rare words: 12%" },
    organization: { score: 0.8, details: "3 discourse markers, 2 paragraphs" },
    development: { score: 0.75, details: "127 words, 2 examples found" },
    style: { score: 0.65, details: "Type-token ratio: 0.62, some repetition" }
  },
  suggestions: [
    "Use more transition words to improve organization",
    "Fix spelling error: 'recieve' → 'receive'",
    "Try varying sentence length for better style"
  ]
}
```

---

## Result Page (WritingResult.jsx)

### Build a Sentence Results
- Score ring (X / 10) — reuse Reading's conic-gradient design
- Per-item review: show user's order vs correct order, highlight differences
- Color coding: green (correct) / red (incorrect)

### Email & Discussion Results
- Score ring (X / 5) — same style
- 6 scoring dimension bars (horizontal progress bars, no external chart library — pure CSS/SVG)
- Each dimension: labeled bar + score value + specific feedback
- Side-by-side: user's response vs sample high-scoring response
- Expandable suggestion cards with improvement tips

---

## Home Page (Home.jsx)

Module selector with two cards:

```
┌──────────────────────────────────────────────────┐
│                                                  │
│              TOEFL Practice                      │
│                                                  │
│   ┌─────────────────┐  ┌─────────────────┐      │
│   │  📖 Reading     │  │  ✍️ Writing     │      │
│   │                 │  │                 │      │
│   │  Practice       │  │  3 Task Types   │      │
│   │  passage with   │  │  Build Sentence │      │
│   │  10 questions   │  │  Write Email    │      │
│   │  20 minutes     │  │  Discussion     │      │
│   │                 │  │  24 minutes     │      │
│   │  [Start →]      │  │  [Start →]      │      │
│   └─────────────────┘  └─────────────────┘      │
│                                                  │
└──────────────────────────────────────────────────┘
```

---

## Writing Landing Page (Writing.jsx)

Task type selector with three cards, similar design to Home:

```
┌──────────────────────────────────────────────────────┐
│  ← Back to Home              Writing Practice        │
│                                                      │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐  │
│  │ Build a      │ │ Write an     │ │ Academic     │  │
│  │ Sentence     │ │ Email        │ │ Discussion   │  │
│  │              │ │              │ │              │  │
│  │ 10 items     │ │ 1 prompt     │ │ 1 prompt     │  │
│  │ 7 min        │ │ 7 min        │ │ 10 min       │  │
│  │ Grammar &    │ │ 130-140      │ │ 120+ words   │  │
│  │ word order   │ │ words        │ │              │  │
│  │              │ │              │ │              │  │
│  │ [Start →]    │ │ [Start →]    │ │ [Start →]    │  │
│  └──────────────┘ └──────────────┘ └──────────────┘  │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## Responsive Layout

- Desktop: side-by-side panels (Email task: prompt left, editor right)
- Mobile (<768px): stacked layout, prompt collapses into expandable accordion above editor
- Build a Sentence: word bank wraps naturally with flexbox
- Follows existing Reading module pattern (uses `flexWrap: 'wrap'` and `className` breakpoints)

---

## Migration Plan

1. Install `react-router-dom`
2. Move existing `App.jsx` → `pages/Reading.jsx` (rename component, preserve all internal state logic)
3. Create `main.jsx` with `<BrowserRouter>` + `<Routes>`, replace current direct component render
4. Create `Home.jsx` and `Writing.jsx` landing pages
5. Extract shared components (Timer, theme tokens, QuestionNav)
6. Build writing tasks one by one (Build a Sentence → Write an Email → Academic Discussion)
7. Build scoring engine modules
8. Integrate results display within each task component

---

## AI Scoring (Future, Not Priority)

Architecture is designed to allow a future `scorer/ai.js` module that:
- Sends user text + rubric prompt to Claude/OpenAI API via `server.js`
- Returns structured feedback in the same format as local scorer
- Can replace or supplement local scoring with a toggle

The existing `server.js` (Express) can be extended for this.

---

## References

- [ETS Official Writing Scoring Guide (PDF)](https://www.ets.org/pdfs/toefl/writing-rubrics.pdf)
- [How the e-rater Scoring Engine Works](https://www.ets.org/erater/how.html)
- [e-rater Feature Breakdown](https://www.toeflresources.com/how-does-the-toefl-e-rater-work/)
- [TOEFL 2026 Build a Sentence Details](https://testsucceed.com/materials/tests/toefl_new/en/description/writing/toefl-2026-new-writing-description.html)
- [TOEFL 2026 Write an Email Details](https://testsucceed.com/materials/tests/toefl_new/en/description/writing/toefl-2026-new-write-an-email.html)
- [TOEFL 2026 Changes Overview](https://www.writing30.com/blog/toefl-2026-changes)
- [Academic Discussion Practice Questions](https://goarno.io/blog/academic-discussion-practice-questions-with-answers-toefl-new-format/)
- [PrepEx Build a Sentence Practice](https://prepex.ai/free-build-a-sentence-toefl-2026)
