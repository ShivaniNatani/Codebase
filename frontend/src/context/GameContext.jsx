import { createContext, useContext, useState, useEffect } from 'react';

const GameContext = createContext(null);

const STORAGE_KEY = 'valentine_protocol_progress';

const initialState = {
  accessGranted: false, // Set to true for dev testing
  chaptersUnlocked: [true, true, true, true, true, true, true, true], // DEV MODE: All unlocked
  chaptersCompleted: [false, false, false, false, false, false, false, false],
  currentChapter: 0,
  puzzleAnswers: {},
  reflectionAnswers: {},
  easterEggsFound: [], // Track found easter eggs
  finalChoiceMade: false,
  finalChoice: null,
  soundEnabled: true,
  startTime: null,
};

export const GameProvider = ({ children }) => {
  const [gameState, setGameState] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return { ...initialState, ...JSON.parse(saved) };
      } catch (e) {
        return initialState;
      }
    }
    return initialState;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
  }, [gameState]);

  const grantAccess = () => {
    setGameState(prev => ({
      ...prev,
      accessGranted: true,
      startTime: Date.now(),
    }));
  };

  const unlockChapter = (chapterIndex) => {
    setGameState(prev => {
      const newUnlocked = [...prev.chaptersUnlocked];
      newUnlocked[chapterIndex] = true;
      return {
        ...prev,
        chaptersUnlocked: newUnlocked,
      };
    });
  };

  const completeChapter = (chapterIndex) => {
    setGameState(prev => {
      const newCompleted = [...prev.chaptersCompleted];
      newCompleted[chapterIndex] = true;
      
      const newUnlocked = [...prev.chaptersUnlocked];
      if (chapterIndex < 6) {
        newUnlocked[chapterIndex + 1] = true;
      }
      
      return {
        ...prev,
        chaptersCompleted: newCompleted,
        chaptersUnlocked: newUnlocked,
        currentChapter: Math.max(prev.currentChapter, chapterIndex + 1),
      };
    });
  };

  const savePuzzleAnswer = (chapterId, answer) => {
    setGameState(prev => ({
      ...prev,
      puzzleAnswers: {
        ...prev.puzzleAnswers,
        [chapterId]: answer,
      },
    }));
  };

  const makeFinalChoice = (choice) => {
    setGameState(prev => ({
      ...prev,
      finalChoiceMade: true,
      finalChoice: choice,
    }));
  };

  const saveReflectionAnswer = (key, answer) => {
    setGameState(prev => ({
      ...prev,
      reflectionAnswers: {
        ...prev.reflectionAnswers,
        [key]: answer,
      },
    }));
  };

  const findEasterEgg = (chapterIndex) => {
    setGameState(prev => {
      if (prev.easterEggsFound.includes(chapterIndex)) return prev;
      return {
        ...prev,
        easterEggsFound: [...prev.easterEggsFound, chapterIndex],
      };
    });
  };

  const toggleSound = () => {
    setGameState(prev => ({
      ...prev,
      soundEnabled: !prev.soundEnabled,
    }));
  };

  const resetProgress = () => {
    localStorage.removeItem(STORAGE_KEY);
    setGameState(initialState);
  };

  const value = {
    ...gameState,
    grantAccess,
    unlockChapter,
    completeChapter,
    savePuzzleAnswer,
    saveReflectionAnswer,
    makeFinalChoice,
    toggleSound,
    resetProgress,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
