# VALENTINE WEEK - THE SEVEN CHAPTER PROTOCOL

## Product Overview
A 7-day interactive web experience designed for an intelligent, emotionally reserved man who enjoys logic puzzles and strategy. This is a Valentine's proposal journey where each chapter unlocks part of his life story.

**Target Audience:** One specific person - the partner (intelligent, logic-focused, emotionally reserved)
**Purpose:** A proposal journey that makes him reflect on his life, achievements, and feelings before a final commitment

## Core Requirements (from User)
1. ✅ 7-day interactive web app
2. ✅ Each day unlocks one of seven chapters from his life story
3. ✅ Each chapter gated by an engaging mini-game
4. ✅ Each chapter has a reflection questionnaire for self-reflection
5. ✅ Dark, minimalist, "psychological thriller" aesthetic
6. ✅ No cringe romance (hearts, roses avoided in favor of strategic/cerebral themes)
7. ✅ Journey culminates in final proposal choice

## Technical Stack
- **Frontend:** React 19 + TailwindCSS + Framer Motion
- **UI Components:** Shadcn/UI
- **State Management:** React Context + localStorage
- **Routing:** React Router DOM
- **No Backend Required** - Pure frontend experience

## Completed Features

### Landing Page
- ✅ Terminal-style boot sequence animation
- ✅ Glitch text effects ("SEVEN_CHAPTERS")
- ✅ Access code validation (DOB: 04101994)
- ✅ "ACCESS GRANTED" unlock animation
- ✅ Sound toggle option

### Chapter Hub
- ✅ 7 chapter cards with lock/unlock states
- ✅ Progress tracker (0/7 to 7/7)
- ✅ Chapter completion indicators
- ✅ "Proceed to Final Chapter" button when all complete
- ✅ Reset progress option

### 7 Chapters Structure
Each chapter follows: Story → Game → Reflection → Complete

| Chapter | Title | Game | Theme |
|---------|-------|------|-------|
| 1 | Origin | Memory Match | Childhood in Dhanbad |
| 2 | Migration | Road Trip Game | Move to Bangalore |
| 3 | Break | Shield Defense | Betrayal & emotional armor |
| 4 | Ascent | Code Challenge | Career & Amazon |
| 5 | The Glitch | Connect Hearts | Meeting her |
| 6 | Partnership | Build Home | Building together |
| 7 | Commitment | Catch Ring | The proposal |

### Games (7 Interactive Mini-Games)
1. **MemoryMatchGame** - Match emoji/text pairs (childhood memories)
2. **RoadTripGame** - Arrow key dodging (road to Bangalore)
3. **ShieldDefenseGame** - Mouse rotation defense (protect heart)
4. **CodeChallengeGame** - Find bugs in code (Amazon interview)
5. **ConnectHeartsGame** - Draw line between hearts (connection)
6. **BuildHomeGame** - Click to build (future together)
7. **CatchRingGame** - Catch falling rings (proposal)

### Reflection System
- ✅ Multiple question types: text, scale (1-10), choice
- ✅ Progress indicator for each questionnaire
- ✅ Contextual prompts before questions
- ✅ "Reflection Complete" state with animation

### Design System
- Dark background (near black)
- Primary: Red (HSL 0 72% 45%)
- Terminal/hacker aesthetic
- Serif fonts for quotes
- Mono fonts for data/terminal
- Subtle animations throughout

## Architecture
```
/app/frontend/src/
├── App.js                   # Main router
├── index.css                # Design tokens & global styles
├── context/
│   └── GameContext.jsx      # State management (localStorage)
├── components/
│   ├── ChapterCard.jsx
│   ├── ChapterLayout.jsx
│   ├── GlitchText.jsx
│   ├── InteractiveGames.jsx # All 7 games
│   ├── PhotoPlaceholder.jsx
│   ├── PuzzleInput.jsx
│   ├── ReflectionSystem.jsx # Questionnaire system
│   └── TerminalText.jsx
└── pages/
    ├── ChapterHub.jsx
    ├── FinalChoice.jsx
    ├── LandingPage.jsx
    └── chapters/
        ├── Chapter1-7.jsx   # Individual chapter pages
```

## Known Issues (Minor)
1. ESLint warnings for missing useEffect dependencies (cosmetic)
2. visual-edits babel plugin disabled (was causing stack overflow)

## Testing Status
- ✅ Testing Agent v3: 100% pass rate
- ✅ All 10 features tested and verified working
- ✅ No console errors detected

## What's Working
- Complete landing experience with access gate
- All 7 chapters with unique stories
- All 7 mini-games functional
- All 7 reflection questionnaires
- Chapter progression and unlock system
- localStorage persistence
- Dark psychological thriller theme

## Future/Backlog Tasks
1. **P2 - Photo Placeholders:** Allow user to upload actual photos
2. **P2 - Ambient Sounds:** Add subtle background audio
3. **P3 - Final Choice Page:** Flesh out the irreversible proposal choice
4. **P3 - ESLint Cleanup:** Address 84 code quality warnings

---
*Last Updated: Feb 4, 2026*
*Status: MVP Complete - All Core Features Working*
