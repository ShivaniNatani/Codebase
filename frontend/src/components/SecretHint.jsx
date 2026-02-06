import { motion } from 'framer-motion';

// Love notes collection - 24 secret messages
const loveNotes = {
  1: [
    "From Dhanbad to my heart—you traveled the longest distance.",
    "The boy who had nothing became my everything.",
    "Your struggles made you strong. Your strength makes me feel safe."
  ],
  2: [
    "18-hour workdays, and you still made time to text me goodnight.",
    "They see the Alpha. I see the man who cried when his dog was sick.",
    "Your ambition doesn't scare me. It inspires me."
  ],
  3: [
    "She broke you, but she also freed you—for me.",
    "The walls you built? I'll wait outside until you let me in.",
    "Her loss. My forever gain."
  ],
  4: [
    "Wrong number, right person. The universe doesn't make mistakes.",
    "That first call—I didn't know I was hearing my future.",
    "You were looking for someone else. You found your forever."
  ],
  5: [
    "You're logic. I'm chaos. Together, we make sense.",
    "Veg meets non-veg. Indore meets Dhanbad. Soulmates don't match—they complete.",
    "Our differences are our superpowers."
  ],
  6: [
    "That Diwali you stayed... I knew you were different.",
    "Every tear I cried, you caught. Every storm I faced, you held the umbrella.",
    "You think you're not romantic? You're the most romantic man I know."
  ],
  7: [
    "The reveal isn't about me. It's about us.",
    "After all your battles, you deserve to be loved fiercely.",
    "You found yourself. Now let me show you what I found—you."
  ],
  8: [
    "This isn't just a proposal. It's a promise.",
    "I choose you. Today. Tomorrow. Every day after.",
    "Forever isn't long enough, but it's a start."
  ]
};

// A more visible Easter Egg hint component with rotating love notes
export const SecretHint = ({ onClick, found, fragmentNumber }) => {
  const notes = loveNotes[fragmentNumber] || loveNotes[1];
  const randomNote = notes[Math.floor(Math.random() * notes.length)];

  if (found) {
    return (
      <div className="text-center py-4">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30"
        >
          <span className="text-primary">💎</span>
          <span className="text-xs font-mono text-primary">SECRET #{fragmentNumber} UNLOCKED</span>
          <span className="text-primary">💕</span>
        </motion.div>
        <p className="text-xs text-muted-foreground mt-2 font-serif italic">"{randomNote}"</p>
      </div>
    );
  }

  return (
    <motion.div 
      className="text-center py-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2 }}
    >
      <motion.div
        animate={{ 
          scale: [1, 1.05, 1],
          opacity: [0.6, 1, 0.6]
        }}
        transition={{ duration: 3, repeat: Infinity }}
        onClick={onClick}
        className="inline-flex flex-col items-center gap-2 cursor-pointer group relative"
      >
        {/* Glowing heart icon */}
        <motion.div
          animate={{ 
            textShadow: ['0 0 10px rgba(236, 72, 153, 0)', '0 0 25px rgba(236, 72, 153, 0.6)', '0 0 10px rgba(236, 72, 153, 0)']
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-3xl"
        >
          💝
        </motion.div>
        
        {/* Hint text */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/5 border border-dashed border-primary/40 group-hover:border-primary group-hover:bg-primary/10 transition-all">
          <span className="text-xs font-serif text-primary/70 group-hover:text-primary transition-colors">
            A secret awaits...
          </span>
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-primary/70 group-hover:text-primary"
          >
            💕
          </motion.span>
        </div>
        
        {/* Sparkle effects */}
        <div className="absolute -inset-4 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${10 + i * 20}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

// Additional mini secrets that can be sprinkled throughout
export const MiniSecret = ({ note, emoji = "💌" }) => {
  const [revealed, setRevealed] = useState(false);
  
  return (
    <motion.span
      onClick={() => setRevealed(!revealed)}
      className="cursor-pointer inline-block"
      whileHover={{ scale: 1.1 }}
    >
      {revealed ? (
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-xs bg-primary/10 text-primary px-2 py-1 rounded font-serif italic"
        >
          {note}
        </motion.span>
      ) : (
        <motion.span
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-lg"
        >
          {emoji}
        </motion.span>
      )}
    </motion.span>
  );
};

import { useState } from 'react';

export default SecretHint;
