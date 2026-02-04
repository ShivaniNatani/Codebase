import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const PuzzleInput = ({ 
  correctAnswer, 
  hint,
  onSuccess, 
  onFailure,
  placeholder = 'Enter answer...',
  caseSensitive = false,
  maxAttempts = 5,
  className = ''
}) => {
  const [value, setValue] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [status, setStatus] = useState('idle'); // idle, error, success
  const [shake, setShake] = useState(false);
  const inputRef = useRef(null);

  const checkAnswer = () => {
    const userAnswer = caseSensitive ? value.trim() : value.trim().toLowerCase();
    const correct = caseSensitive ? correctAnswer : correctAnswer.toLowerCase();

    if (userAnswer === correct) {
      setStatus('success');
      onSuccess?.();
    } else {
      setAttempts(prev => prev + 1);
      setStatus('error');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      
      if (attempts + 1 >= maxAttempts) {
        onFailure?.();
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      checkAnswer();
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <motion.div 
      className={`space-y-4 ${className}`}
      animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
      transition={{ duration: 0.4 }}
    >
      <div className="relative">
        <Input
          ref={inputRef}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setStatus('idle');
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={status === 'success'}
          className={`
            bg-card border-border font-mono text-lg h-14 pr-24
            focus:border-primary focus:ring-2 focus:ring-primary/20
            ${status === 'error' ? 'border-destructive' : ''}
            ${status === 'success' ? 'border-green-500 text-green-400' : ''}
          `}
        />
        <Button
          onClick={checkAnswer}
          disabled={!value.trim() || status === 'success'}
          className="absolute right-2 top-1/2 -translate-y-1/2 h-10"
          variant={status === 'success' ? 'default' : 'outline'}
        >
          {status === 'success' ? (
            <i className="fas fa-check" />
          ) : (
            <i className="fas fa-arrow-right" />
          )}
        </Button>
      </div>

      <AnimatePresence mode="wait">
        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 text-sm"
          >
            <i className="fas fa-times-circle text-destructive" />
            <span className="text-destructive">
              Incorrect. Attempts remaining: {maxAttempts - attempts}
            </span>
          </motion.div>
        )}

        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-green-400"
          >
            <i className="fas fa-unlock" />
            <span>Access Granted</span>
          </motion.div>
        )}
      </AnimatePresence>

      {hint && attempts >= 2 && status !== 'success' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-muted-foreground font-mono"
        >
          <span className="text-primary">HINT:</span> {hint}
        </motion.div>
      )}
    </motion.div>
  );
};

export const CodeInput = ({ 
  length = 4, 
  correctCode, 
  onSuccess,
  className = '' 
}) => {
  const [code, setCode] = useState(Array(length).fill(''));
  const [status, setStatus] = useState('idle');
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if complete
    if (newCode.every(digit => digit !== '')) {
      const enteredCode = newCode.join('');
      if (enteredCode === correctCode) {
        setStatus('success');
        onSuccess?.();
      } else {
        setStatus('error');
        setTimeout(() => {
          setCode(Array(length).fill(''));
          setStatus('idle');
          inputRefs.current[0]?.focus();
        }, 1000);
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <div className="flex gap-3">
        {code.map((digit, index) => (
          <motion.input
            key={index}
            ref={el => inputRefs.current[index] = el}
            type="text"
            inputMode="numeric"
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            maxLength={1}
            disabled={status === 'success'}
            className={`
              w-14 h-16 text-center text-2xl font-mono bg-card border-2 rounded-lg
              focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
              transition-colors
              ${status === 'error' ? 'border-destructive animate-shake' : 'border-border'}
              ${status === 'success' ? 'border-green-500 text-green-400' : ''}
            `}
            animate={status === 'error' ? { x: [-5, 5, -5, 5, 0] } : {}}
          />
        ))}
      </div>
      
      {status === 'success' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-green-400 font-mono flex items-center gap-2"
        >
          <i className="fas fa-lock-open" />
          <span>DECRYPTED</span>
        </motion.div>
      )}
    </div>
  );
};
