import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';

export const GlitchText = ({ 
  text, 
  className = '', 
  glitchIntensity = 0.3,
  isActive = true 
}) => {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    if (!isActive) {
      setDisplayText(text);
      return;
    }

    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const chars = text.split('');
        const glitchedChars = chars.map((char, i) => {
          if (Math.random() < glitchIntensity && char !== ' ') {
            return glitchChars[Math.floor(Math.random() * glitchChars.length)];
          }
          return char;
        });
        setDisplayText(glitchedChars.join(''));
        
        setTimeout(() => setDisplayText(text), 50);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [text, glitchIntensity, isActive]);

  return (
    <motion.span 
      className={`inline-block ${className}`}
      style={{ 
        textShadow: isActive ? '2px 0 hsl(var(--primary)), -2px 0 hsl(180 100% 50%)' : 'none'
      }}
    >
      {displayText}
    </motion.span>
  );
};

export const GlitchReveal = ({ 
  text, 
  className = '', 
  revealDelay = 2000,
  onReveal 
}) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    // Start with random characters
    const randomize = () => {
      return text.split('').map(() => 
        glitchChars[Math.floor(Math.random() * glitchChars.length)]
      ).join('');
    };

    setDisplayText(randomize());

    const flickerInterval = setInterval(() => {
      if (!isRevealed) {
        setDisplayText(randomize());
      }
    }, 50);

    const revealTimer = setTimeout(() => {
      clearInterval(flickerInterval);
      
      // Gradually reveal the text
      let currentIndex = 0;
      const revealInterval = setInterval(() => {
        if (currentIndex <= text.length) {
          const revealed = text.slice(0, currentIndex);
          const remaining = text.slice(currentIndex).split('').map(() => 
            glitchChars[Math.floor(Math.random() * glitchChars.length)]
          ).join('');
          setDisplayText(revealed + remaining);
          currentIndex++;
        } else {
          clearInterval(revealInterval);
          setDisplayText(text);
          setIsRevealed(true);
          onReveal?.();
        }
      }, 30);
    }, revealDelay);

    return () => {
      clearInterval(flickerInterval);
      clearTimeout(revealTimer);
    };
  }, [text, revealDelay, onReveal]);

  return (
    <span className={`font-mono ${className}`}>
      {displayText}
    </span>
  );
};
