import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

// Personal completion messages for each day with Valentine Week themes
const completionData = {
  0: {
    title: "ORIGIN: COMPLETE",
    reveal: "🌹 ROSE DAY",
    revealMessage: "A rose represents the beginning of love. Your story began in Dhanbad.",
    emoji: "🌹",
    visual: "💝",
    message: "You came from nothing, Argha. Coal-dusted streets, a computer, and a dream. Look how far you've come.",
    note: "The boy from Dhanbad became the man I love. Never forget where you started.",
    signature: "— S"
  },
  1: {
    title: "ASCENSION: COMPLETE",
    reveal: "💌 PROPOSE DAY", 
    revealMessage: "The day to express feelings. You proposed your dreams to the universe—and won.",
    emoji: "💌",
    visual: "💫",
    message: "The Alpha was born. 18-hour days, no shortcuts, no excuses. You built yourself from scratch.",
    note: "Your determination isn't just impressive—it's the reason I feel safe with you.",
    signature: "— S"
  },
  2: {
    title: "FRACTURE: COMPLETE",
    reveal: "🍫 CHOCOLATE DAY",
    revealMessage: "Chocolate heals. But some wounds need more than sweetness.",
    emoji: "🍫",
    visual: "💔",
    message: "She broke you. But broken things, when healed, become stronger at the broken places.",
    note: "Her loss was my gain. And I promise to never make you regret letting me in.",
    signature: "— S"
  },
  3: {
    title: "GLITCH: COMPLETE",
    reveal: "🧸 TEDDY DAY",
    revealMessage: "A teddy brings comfort. That night, a wrong call brought destiny.",
    emoji: "🧸",
    visual: "📱✨",
    message: "Wrong number. Right call. The universe has a funny way of fixing its own errors.",
    note: "That night you called, you thought you were reaching someone else. But destiny knew better.",
    signature: "— Your 'Wrong' Shivani 💕"
  },
  4: {
    title: "PARADOX: COMPLETE",
    reveal: "🤝 PROMISE DAY", 
    revealMessage: "Promises bind opposites together. We promised to accept each other.",
    emoji: "🤝",
    visual: "☯️💕",
    message: "Veg and non-veg. Emotional and logical. Indore and Dhanbad. We make no sense. And yet...",
    note: "You're my calm when I'm chaos. I'm your color when you're grayscale. Perfect paradox.",
    signature: "— S"
  },
  5: {
    title: "ANCHOR: COMPLETE",
    reveal: "🤗 HUG DAY",
    revealMessage: "A hug says 'I'm here.' You were always there when I needed you.",
    emoji: "🤗",
    visual: "🫂💝",
    message: "Diwali without family. My birthday when my world was falling. You showed up. Every. Single. Time.",
    note: "You think you're not romantic. But every time you chose me over convenience—that was romance.",
    signature: "— S"
  },
  6: {
    title: "REVELATION: COMPLETE",
    reveal: "💋 KISS DAY",
    revealMessage: "A kiss seals the truth. The truth is—you found your forever.",
    emoji: "💋",
    visual: "👁️💖",
    message: "Now you see it, don't you? After all the struggles, all the walls, all the battles...",
    note: "Your greatest achievement isn't Amazon. It isn't survival. It's finding someone who sees all of you—and stays.",
    signature: "— S",
    special: true
  },
};

// Midway checkpoint content (after Day 4 - GLITCH)
const midwayCheckpoint = {
  title: "PAUSE",
  emoji: "💫",
  message: "Argha, take a breath.",
  lines: [
    "You've seen your past.",
    "The struggles. The betrayal. The walls you built.",
    "Now, the story changes.",
    "Now, I enter your life.",
    "The next chapters are about US."
  ],
  continueText: "Continue the Journey"
};

export const DayCompletionPage = ({ dayIndex, onContinue, nextDayName }) => {
  const [showNote, setShowNote] = useState(false);
  const [showReveal, setShowReveal] = useState(false);
  const data = completionData[dayIndex];

  useEffect(() => {
    // Show reveal first if it exists
    if (data?.reveal) {
      const revealTimer = setTimeout(() => setShowReveal(true), 500);
      const noteTimer = setTimeout(() => setShowNote(true), 3000);
      return () => {
        clearTimeout(revealTimer);
        clearTimeout(noteTimer);
      };
    } else {
      const timer = setTimeout(() => setShowNote(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [data]);

  if (!data) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-[80vh] flex flex-col items-center justify-center py-12 px-4 relative"
    >
      {/* Dreamy background effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-pink-500/5 pointer-events-none" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-20"
            initial={{ 
              x: Math.random() * 100 + '%',
              y: '100%',
            }}
            animate={{ 
              y: '-10%',
              rotate: [0, 360],
            }}
            transition={{ 
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          >
            {data.visual || '💕'}
          </motion.div>
        ))}
      </div>

      {/* Day Reveal (Rose Day, Propose Day etc.) */}
      <AnimatePresence>
        {data.reveal && showReveal && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', duration: 0.8 }}
            className="text-center mb-8 relative z-10"
          >
            <motion.div 
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-primary/20 to-pink-500/20 border border-primary/40 mb-4 shadow-lg"
              animate={{ 
                boxShadow: ['0 0 20px rgba(236, 72, 153, 0.2)', '0 0 40px rgba(236, 72, 153, 0.4)', '0 0 20px rgba(236, 72, 153, 0.2)']
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.span 
                className="text-3xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {data.reveal.split(' ')[0]}
              </motion.span>
              <span className="text-xl font-bold text-primary">{data.reveal}</span>
            </motion.div>
            <p className="text-foreground/70 font-serif italic text-lg">{data.revealMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Completion */}
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: data.reveal ? 1.5 : 0.3 }}
        className="text-center mb-8 relative z-10"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.15, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-8xl mb-6"
        >
          {data.emoji}
        </motion.div>

        <h2 className="text-2xl md:text-3xl font-bold font-mono text-primary mb-4">
          {data.title}
        </h2>

        <p className="text-lg text-foreground/80 max-w-md mx-auto leading-relaxed">
          {data.message}
        </p>
      </motion.div>

      {/* Personal Note */}
      <AnimatePresence>
        {showNote && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`bg-gradient-to-br from-card/80 to-card/50 backdrop-blur-sm border rounded-xl p-8 max-w-lg mx-auto mb-8 relative z-10 ${data.special ? 'border-primary/50 bg-primary/5' : 'border-pink-500/30'}`}
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-2xl">💌</div>
            <div className="text-center pt-2">
              <p className="text-foreground/90 font-serif italic text-lg leading-relaxed mb-4">
                "{data.note}"
              </p>
              <p className="text-primary font-medium">{data.signature}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Continue Button */}
      <AnimatePresence>
        {showNote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="relative z-10"
          >
            <Button
              onClick={onContinue}
              size="lg"
              className="bg-gradient-to-r from-primary to-pink-500 hover:from-primary/90 hover:to-pink-500/90 shadow-lg"
            >
              {nextDayName ? `Continue to ${nextDayName}` : 'Continue'}
              <i className="fas fa-heart ml-2" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const MidwayCheckpoint = ({ onContinue }) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const lineTimers = midwayCheckpoint.lines.map((_, index) => {
      return setTimeout(() => {
        setCurrentLine(index + 1);
      }, 2000 + (index * 1500));
    });

    const buttonTimer = setTimeout(() => {
      setShowButton(true);
    }, 2000 + (midwayCheckpoint.lines.length * 1500) + 1000);

    return () => {
      lineTimers.forEach(clearTimeout);
      clearTimeout(buttonTimer);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-background flex flex-col items-center justify-center py-12 px-4"
    >
      <div className="text-center max-w-xl mx-auto space-y-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-6xl mb-8"
        >
          {midwayCheckpoint.emoji}
        </motion.div>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-3xl font-bold font-mono text-primary"
        >
          {midwayCheckpoint.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl text-foreground"
        >
          {midwayCheckpoint.message}
        </motion.p>

        <div className="space-y-4 py-8">
          {midwayCheckpoint.lines.map((line, index) => (
            <AnimatePresence key={index}>
              {index < currentLine && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-lg ${index === midwayCheckpoint.lines.length - 1 ? 'text-primary font-bold text-xl' : 'text-foreground/70'}`}
                >
                  {line}
                </motion.p>
              )}
            </AnimatePresence>
          ))}
        </div>

        <AnimatePresence>
          {showButton && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Button
                onClick={onContinue}
                size="lg"
                className="bg-primary hover:bg-primary/90"
              >
                {midwayCheckpoint.continueText}
                <i className="fas fa-heart ml-2" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default DayCompletionPage;
