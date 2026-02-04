import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

export const TerminalText = ({ 
  text, 
  speed = 30, 
  delay = 0, 
  className = '',
  onComplete,
  cursor = true,
  prefix = '> '
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const indexRef = useRef(0);
  const hasCompletedRef = useRef(false);

  useEffect(() => {
    // Reset state when text changes
    indexRef.current = 0;
    hasCompletedRef.current = false;
    setDisplayedText('');
    setIsComplete(false);

    const startTimer = setTimeout(() => {
      const timer = setInterval(() => {
        if (indexRef.current < text.length) {
          indexRef.current++;
          setDisplayedText(text.slice(0, indexRef.current));
        } else if (!hasCompletedRef.current) {
          hasCompletedRef.current = true;
          setIsComplete(true);
          clearInterval(timer);
          onComplete?.();
        }
      }, speed);

      return () => clearInterval(timer);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [text, speed, delay]);

  // Separate effect for onComplete to avoid stale closure
  useEffect(() => {
    if (isComplete && onComplete && hasCompletedRef.current) {
      // Already called in the interval
    }
  }, [isComplete, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`font-mono ${className}`}
    >
      <span className="text-primary/60">{prefix}</span>
      <span>{displayedText}</span>
      {cursor && !isComplete && (
        <span className="cursor-blink ml-0.5 text-primary">▊</span>
      )}
    </motion.div>
  );
};

export const TerminalBlock = ({ lines, className = '', onAllComplete }) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [completedLines, setCompletedLines] = useState([]);

  const handleLineComplete = (index) => {
    setCompletedLines(prev => [...prev, index]);
    if (index < lines.length - 1) {
      setTimeout(() => setCurrentLine(index + 1), 200);
    } else {
      onAllComplete?.();
    }
  };

  return (
    <div className={`space-y-1 ${className}`}>
      {lines.map((line, index) => (
        index <= currentLine && (
          <TerminalText
            key={index}
            text={line.text}
            speed={line.speed || 20}
            delay={index === 0 ? (line.delay || 0) : 0}
            prefix={line.prefix || '> '}
            cursor={!completedLines.includes(index)}
            onComplete={() => handleLineComplete(index)}
            className={line.className || 'text-foreground/80'}
          />
        )
      ))}
    </div>
  );
};
