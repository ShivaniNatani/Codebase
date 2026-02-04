import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { TerminalText, TerminalBlock } from '@/components/TerminalText';
import { GlitchText, GlitchReveal } from '@/components/GlitchText';
import { PuzzleInput } from '@/components/PuzzleInput';
import { useGame } from '@/context/GameContext';

const LandingPage = () => {
  const navigate = useNavigate();
  const { accessGranted, grantAccess, soundEnabled, toggleSound } = useGame();
  const [phase, setPhase] = useState(accessGranted ? 'granted' : 'init');
  const [showAccessPrompt, setShowAccessPrompt] = useState(false);

  useEffect(() => {
    if (accessGranted) {
      setPhase('granted');
    }
  }, [accessGranted]);

  const bootSequence = [
    { text: 'INITIALIZING PROTOCOL_7...', prefix: '█ ', speed: 25, className: 'text-primary' },
    { text: 'LOADING MEMORY FRAGMENTS...', prefix: '█ ', speed: 20 },
    { text: 'ESTABLISHING NEURAL LINK...', prefix: '█ ', speed: 30 },
    { text: 'SUBJECT IDENTIFIED: ████████', prefix: '█ ', speed: 15, className: 'text-primary' },
    { text: 'DOB: 04-10-1994', prefix: '█ ', speed: 40 },
    { text: 'ORIGIN: DHANBAD, JHARKHAND', prefix: '█ ', speed: 35 },
    { text: 'STATUS: ALPHA_CONFIRMED', prefix: '█ ', speed: 30, className: 'text-green-400' },
    { text: 'ACCESS LEVEL: CLASSIFIED', prefix: '█ ', speed: 25, className: 'text-destructive' },
  ];

  const handleBootComplete = () => {
    setTimeout(() => setShowAccessPrompt(true), 500);
  };

  const handleAccessGranted = () => {
    grantAccess();
    setPhase('granted');
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden vignette">
      {/* Animated background grid */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: window.innerHeight + 10 
            }}
            animate={{ 
              y: -10,
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      {/* Sound toggle */}
      <button
        onClick={toggleSound}
        className="fixed top-6 right-6 z-50 w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
      >
        <i className={`fas ${soundEnabled ? 'fa-volume-up' : 'fa-volume-mute'}`} />
      </button>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
        <AnimatePresence mode="wait">
          {phase === 'init' && (
            <motion.div
              key="init"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-2xl"
            >
              {/* Logo/Title */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
              >
                <div className="inline-flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse-red" />
                  <span className="text-xs font-mono tracking-[0.3em] text-primary">
                    PROTOCOL ACTIVE
                  </span>
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse-red" />
                </div>
                
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-2">
                  <GlitchText text="SEVEN" glitchIntensity={0.15} className="text-foreground" />
                  <span className="text-primary">_</span>
                  <GlitchText text="CHAPTERS" glitchIntensity={0.15} className="text-primary" />
                </h1>
                
                <p className="text-muted-foreground font-mono text-sm">
                  THE VALENTINE WEEK PROTOCOL
                </p>
              </motion.div>

              {/* Terminal */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-card border border-border rounded-lg p-6 shadow-deep"
              >
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border/50">
                  <div className="w-3 h-3 rounded-full bg-destructive/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-3 text-xs font-mono text-muted-foreground">
                    access_terminal_v7.0
                  </span>
                </div>

                <div className="font-mono text-sm space-y-1 mb-6">
                  <TerminalBlock 
                    lines={bootSequence} 
                    onAllComplete={handleBootComplete}
                  />
                </div>

                <AnimatePresence>
                  {showAccessPrompt && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                      
                      <div className="text-center py-4">
                        <p className="text-sm text-muted-foreground mb-2">
                          Enter the birth date of the subject (DDMMYYYY)
                        </p>
                        <p className="text-xs font-mono text-primary/60">
                          HINT: The beginning of it all
                        </p>
                      </div>

                      <PuzzleInput
                        correctAnswer="04101994"
                        placeholder="Enter 8-digit code..."
                        hint="Think: When did the story begin?"
                        onSuccess={handleAccessGranted}
                        maxAttempts={10}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Warning text */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-center text-xs font-mono text-muted-foreground/50 mt-8"
              >
                THIS EXPERIENCE IS DESIGNED FOR ONE PERSON ONLY.
                <br />
                UNAUTHORIZED ACCESS WILL BE... MEANINGLESS.
              </motion.p>
            </motion.div>
          )}

          {phase === 'granted' && (
            <motion.div
              key="granted"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="w-24 h-24 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center mx-auto mb-8 pulse-glow"
              >
                <i className="fas fa-unlock-alt text-4xl text-primary" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  ACCESS GRANTED
                </h2>
                <p className="text-muted-foreground font-serif italic mb-8">
                  Welcome back. The story awaits.
                </p>

                <div className="space-y-4">
                  <Button
                    size="lg"
                    onClick={() => navigate('/chapters')}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg group"
                  >
                    <span>Enter the Protocol</span>
                    <i className="fas fa-arrow-right ml-3 group-hover:translate-x-1 transition-transform" />
                  </Button>

                  <p className="text-xs font-mono text-muted-foreground/50">
                    7 days. 7 chapters. 1 truth.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom decorative element */}
      <div className="fixed bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </div>
  );
};

export default LandingPage;
