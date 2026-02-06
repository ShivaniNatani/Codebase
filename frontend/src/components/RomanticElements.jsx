import { motion } from 'framer-motion';

// Floating hearts background effect
export const FloatingHearts = ({ count = 15, opacity = 0.15 }) => {
  const hearts = ['💕', '💗', '💖', '💝', '❤️', '🩷', '✨'];
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-xl"
          style={{ opacity }}
          initial={{
            x: `${Math.random() * 100}vw`,
            y: '110vh',
          }}
          animate={{
            y: '-10vh',
            x: `${Math.random() * 100}vw`,
            rotate: [0, 360],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: 'linear',
          }}
        >
          {hearts[Math.floor(Math.random() * hearts.length)]}
        </motion.div>
      ))}
    </div>
  );
};

// Love quotes that appear randomly
export const LoveQuote = ({ quote, author = "— S" }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center py-4 px-6"
  >
    <p className="text-foreground/60 font-serif italic text-sm">
      "{quote}"
    </p>
    <p className="text-primary/60 text-xs mt-1">{author}</p>
  </motion.div>
);

// Hidden love note that can be placed anywhere
export const HiddenLoveNote = ({ children, note, noteTitle = "💌 Secret Note" }) => {
  const [showNote, setShowNote] = useState(false);
  
  return (
    <>
      <span 
        onClick={() => setShowNote(true)}
        className="cursor-pointer hover:text-primary transition-colors border-b border-dotted border-primary/30 hover:border-primary"
      >
        {children}
      </span>
      
      {showNote && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowNote(false)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="bg-card border border-primary/30 rounded-xl p-6 max-w-sm text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-2xl mb-3">💕</div>
            <p className="text-xs text-primary mb-2">{noteTitle}</p>
            <p className="text-foreground/80 font-serif italic">{note}</p>
            <button 
              onClick={() => setShowNote(false)}
              className="mt-4 text-xs text-muted-foreground hover:text-primary"
            >
              close with love 💕
            </button>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

// Import useState for HiddenLoveNote
import { useState } from 'react';

export default FloatingHearts;
