import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

// Personal completion messages for each day
const completionData = {
  0: {
    title: "ORIGIN: COMPLETE",
    emoji: "🌱",
    message: "You came from nothing, Argha. Coal-dusted streets, a computer, and a dream. Look how far you've come.",
    note: "The boy from Dhanbad became the man I love. Never forget where you started.",
    signature: "— S"
  },
  1: {
    title: "ASCENSION: COMPLETE", 
    emoji: "⚡",
    message: "The Alpha was born. 18-hour days, no shortcuts, no excuses. You built yourself from scratch.",
    note: "Your determination isn't just impressive—it's the reason I feel safe with you.",
    signature: "— S"
  },
  2: {
    title: "FRACTURE: COMPLETE",
    emoji: "🛡️",
    message: "She broke you. But broken things, when healed, become stronger at the broken places.",
    note: "Her loss was my gain. And I promise to never make you regret letting me in.",
    signature: "— S"
  },
  3: {
    title: "GLITCH: COMPLETE",
    reveal: "🌹 ROSE DAY",
    revealMessage: "Every love story has a beginning. Ours started with a beautiful mistake.",
    emoji: "🐛",
    message: "Wrong number. Right call. The universe has a funny way of fixing its own errors.",
    note: "That night you called, you thought you were reaching someone else. But destiny knew better.",
    signature: "— Your 'Wrong' Shivani 💕"
  },
  4: {
    title: "PARADOX: COMPLETE",
    reveal: "🧸 TEDDY DAY", 
    revealMessage: "Opposites don't clash. They complete each other.",
    emoji: "☯️",
    message: "Veg and non-veg. Emotional and logical. Indore and Dhanbad. We make no sense. And yet...",
    note: "You're my calm when I'm chaos. I'm your color when you're grayscale. Perfect paradox.",
    signature: "— S"
  },
  5: {
    title: "ANCHOR: COMPLETE",
    emoji: "⚓",
    message: "Diwali without family. My birthday when my world was falling. You showed up. Every. Single. Time.",
    note: "You think you're not romantic. But every time you chose me over convenience—that was romance.",
    signature: "— S"
  },
  6: {
    title: "REVELATION: COMPLETE",
    emoji: "👁️",
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
      className="min-h-[80vh] flex flex-col items-center justify-center py-12 px-4"
    >
      {/* Day Reveal (Rose Day, Teddy Day etc.) */}
      <AnimatePresence>
        {data.reveal && showReveal && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', duration: 0.8 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 border border-primary/30 mb-4">
              <span className="text-2xl">{data.reveal.split(' ')[0]}</span>
              <span className="text-lg font-bold text-primary">{data.reveal}</span>
            </div>
            <p className="text-foreground/70 font-serif italic">{data.revealMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Completion */}
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: data.reveal ? 1.5 : 0.3 }}
        className="text-center mb-8"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 2, repeat: 2 }}
          className="text-7xl mb-6"
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
            className={`bg-card/50 border rounded-xl p-8 max-w-lg mx-auto mb-8 ${data.special ? 'border-primary/50 bg-primary/5' : 'border-border'}`}
          >
            <div className="text-center">
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
          >
            <Button
              onClick={onContinue}
              size="lg"
              className="bg-primary hover:bg-primary/90"
            >
              {nextDayName ? `Continue to ${nextDayName}` : 'Continue'}
              <i className="fas fa-arrow-right ml-2" />
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
