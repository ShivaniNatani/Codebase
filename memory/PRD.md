# VALENTINE WEEK - FOR ARGHA ❤️

## Product Overview
A deeply personal 8-day Valentine Week proposal experience (Feb 7-14, 2025) designed for Argha from Shivani. The journey tells his life story and culminates in making him realize that after all his struggles and achievements, SHE is his greatest reward.

**Target:** Argha - An intelligent, emotionally reserved man who enjoys logic puzzles and strategy
**From:** Shivani - Emotional, caring partner from Indore (DOB: 14 May 1998)
**Purpose:** A Valentine's proposal journey that makes him reflect on his life and realize what he has found in her

## Valentine Week Structure (8 Days)

| Day | Date | Route | Theme |
|-----|------|-------|-------|
| 🌹 Rose Day | Feb 7 | /rose-day | Origin - Dhanbad roots, childhood |
| 💍 Propose Day | Feb 8 | /propose-day | The Alpha rises, career achievements |
| 🍫 Chocolate Day | Feb 9 | /chocolate-day | Bitter & Sweet - betrayal story |
| 🧸 Teddy Day | Feb 10 | /teddy-day | The Wrong Shivani - how they met |
| 🤝 Promise Day | Feb 11 | /promise-day | Opposites Attract - veg/non-veg, emotional/logical |
| 🤗 Hug Day | Feb 12 | /hug-day | How she changed everything - key moments |
| 💋 Kiss Day | Feb 13 | /kiss-day | The Revelation - she is his greatest achievement |
| ❤️ Valentine's Day | Feb 14 | /valentine-day | THE PROPOSAL |

## Personal Details Used

### Argha
- Origin: Dhanbad, Jharkhand
- DOB: 04-10-1994
- Personality: Alpha, logical, emotionally reserved
- Food: Hardcore non-veg
- Career: Amazon (via spontaneous interview), UpGrad alumni mentor
- Family friends: Amit & Abhilasha

### Shivani
- Origin: Indore
- DOB: 14 May 1998
- Personality: Emotional, expressive, caring
- Food: Pure vegetarian

### Key Moments Featured
1. **Wrong number meeting** - He called thinking she was "other Shivani" from Mumbai
2. **Birthday support** - He made sure she wasn't alone when her ex was with someone else
3. **Diwali with Amit & Abhilasha** - He didn't go home, celebrated with her instead
4. **Movie requests** - He always drove to watch what she wanted
5. **Emotional support** - Always present when she was upset
6. **Promise** - "Whatever happens, I'll always be there"

## Technical Stack
- **Frontend:** React 19 + TailwindCSS + Framer Motion
- **UI Components:** Shadcn/UI
- **State Management:** React Context + localStorage
- **Routing:** React Router DOM
- **No Backend** - Pure frontend experience

## Features Implemented

### Landing Page ✅
- "VALENTINE_WEEK" title with glitch effect
- "FOR ARGHA • 8 CHAPTERS • 1 LOVE STORY"
- Terminal boot sequence animation
- Access code validation (DOB: 04101994)
- Sound toggle

### Chapter Hub ✅
- 8 Valentine Week day cards with emojis
- Progress tracker (0/8 to 8/8)
- Personal message from Shivani
- "For Argha" personalized header

### Each Chapter ✅
- Story → Game → Reflection → Complete flow
- Journey Progress tracker (8 milestones)
- Personal narrative content
- Interactive mini-game
- Reflection questionnaire
- Navigation between chapters

### Mini-Games ✅
1. **MemoryMatchGame** - Match childhood memories
2. **CodeChallengeGame** - Find bugs in code
3. **ShieldDefenseGame** - Protect heart from attacks
4. **ConnectHeartsGame** - Draw line between hearts
5. **RoadTripGame** - Navigate journey together
6. **BuildHomeGame** - Click to build future home
7. **CatchRingGame** - Catch falling rings

### Valentine's Day Proposal ✅
- Journey recap
- Shivani's love letter
- "Will you be mine forever?" question
- "Yes, Forever" / "I need more time" choices
- Celebration response on "Yes"

## Dev Mode
For testing, all chapters are unlocked:
```javascript
accessGranted: true,
chaptersUnlocked: [true, true, true, true, true, true, true, true]
```

## File Structure
```
/app/frontend/src/
├── App.js                   # Routes for all 8 days
├── context/
│   └── GameContext.jsx      # State + localStorage
├── components/
│   ├── ChapterLayout.jsx
│   ├── GlitchText.jsx
│   ├── InteractiveGames.jsx
│   ├── ReflectionSystem.jsx
│   └── TerminalText.jsx
└── pages/
    ├── ChapterHub.jsx       # Valentine Week grid
    ├── LandingPage.jsx
    └── chapters/
        ├── RoseDay.jsx
        ├── ProposeDay.jsx
        ├── ChocolateDay.jsx
        ├── TeddyDay.jsx
        ├── PromiseDay.jsx
        ├── HugDay.jsx
        ├── KissDay.jsx
        └── ValentineDay.jsx
```

## Testing Status
- ✅ Testing Agent: 95% pass rate
- ✅ All 8 chapters functional
- ✅ All games working
- ✅ Proposal flow complete
- ✅ Navigation working
- ✅ Personal details correct

## Future/Backlog
1. **P2** - Add actual photos to placeholders
2. **P2** - Implement ambient sounds
3. **P3** - Mobile responsive polish
4. **P3** - Add animations between phases

---
*Last Updated: Feb 4, 2026*
*Status: MVP Complete - Valentine Week Ready for Argha ❤️*
