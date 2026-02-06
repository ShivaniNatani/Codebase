import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { TerminalText } from '@/components/TerminalText';
import { GlitchText } from '@/components/GlitchText';
import { PuzzleInput } from '@/components/PuzzleInput';
import { useGame } from '@/context/GameContext';

const LandingPage = () => {
  const navigate = useNavigate();
  const { accessGranted, grantAccess, soundEnabled, toggleSound } = useGame();
  const [phase, setPhase] = useState(accessGranted ? 'granted' : 'init');
  const [showAccessPrompt, setShowAccessPrompt] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);

  useEffect(() => {
    if (accessGranted) {
      setPhase('granted');
    }
  }, [accessGranted]);

  const bootSequence = [
    { text: 'INITIATING PROTOCOL_VALENTINE...', prefix: '> ', speed: 25, className: 'text-primary' },
    { text: 'SCANNING MEMORY ARCHIVES...', prefix: '> ', speed: 20 },
    { text: 'LOADING ENCRYPTED FILES...', prefix: '> ', speed: 30 },
    { text: 'SUBJECT: ARGHA', prefix: '> ', speed: 15, className: 'text-primary' },
    { text: 'CLASSIFICATION: ALPHA', prefix: '> ', speed: 40, className: 'text-yellow-400' },
    { text: 'COMPANION: SCOTCH 🐕', prefix: '> ', speed: 35 },
    { text: 'STATUS: AWAITING_AUTHORIZATION', prefix: '> ', speed: 30, className: 'text-destructive' },
    { text: '8 PROTOCOLS DETECTED...', prefix: '> ', speed: 25 },
    { text: 'ENTER PASSCODE TO PROCEED', prefix: '> ', speed: 20, className: 'text-primary' },
  ];

  const handleBootComplete = () => {
    setTypingComplete(true);
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
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), 
              y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 10 
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
      <div className="container mx-auto px-4 min-h-screen flex flex-col items-center justify-center relative z-10">
        <AnimatePresence mode="wait">
          {phase === 'init' && (
            <motion.div
              key="init"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-2xl"
            >
              {/* Title */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8"
              >
                <div className="inline-flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <span className="text-xs font-mono tracking-[0.3em] text-primary">
                    CLASSIFIED PROTOCOL
                  </span>
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-2">
                  <GlitchText text="PROTOCOL" glitchIntensity={0.15} className="text-foreground" />
                  <span className="text-primary">_</span>
                  <GlitchText text="V" glitchIntensity={0.15} className="text-primary" />
                </h1>
                
                <p className="text-muted-foreground font-mono text-sm">
                  8 ENCRYPTED CHAPTERS • 1 FINAL TRUTH
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
                    system_boot.exe
                  </span>
                </div>

                <div className="font-mono text-sm space-y-1 mb-6">
                  <TerminalText
                    lines={bootSequence}
                    onComplete={handleBootComplete}
                    startDelay={500}
                  />
                </div>

                {/* Access prompt */}
                <AnimatePresence>
                  {showAccessPrompt && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 pt-4 border-t border-border/50"
                    >
                      <div className="text-center mb-4">
                        <p className="text-sm text-foreground mb-2">
                          <i className="fas fa-lock text-primary mr-2" />
                          ENTER THE DATE EVERYTHING CHANGED
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Format: DDMMYYYY • Hint: The day you chose forever
                        </p>
                      </div>

                      <PuzzleInput
                        correctAnswer="14052024"
                        hint="The date you proposed..."
                        onSuccess={handleAccessGranted}
                        placeholder="Enter 8-digit code..."
                        maxAttempts={10}
                        className="max-w-xs mx-auto"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Warning text */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: typingComplete ? 1 : 0 }}
                transition={{ delay: 0.5 }}
                className="text-center text-xs text-muted-foreground/50 mt-6 font-mono"
              >
                ⚠️ WARNING: THIS PROTOCOL WILL CHANGE EVERYTHING
              </motion.p>
            </motion.div>
          )}

          {phase === 'granted' && (
            <motion.div
              key="granted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center relative z-10"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', duration: 0.8 }}
                className="mb-8"
              >
                <div className="w-24 h-24 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center mx-auto mb-6">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <i className="fas fa-unlock text-4xl text-primary" />
                  </motion.div>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  ACCESS GRANTED
                </h2>
                <p className="text-muted-foreground">
                  Welcome, Argha. The protocol awaits.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-4 relative z-20"
              >
                <Button
                  size="lg"
                  onClick={() => navigate('/chapters')}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg group relative z-30"
                  data-testid="initiate-protocol-btn"
                >
                  <span>INITIATE PROTOCOL</span>
                  <i className="fas fa-arrow-right ml-3 group-hover:translate-x-1 transition-transform" />
                </Button>

                <p className="text-xs font-mono text-muted-foreground/50">
                  8 chapters. 8 days. 1 truth to discover.
                </p>
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
