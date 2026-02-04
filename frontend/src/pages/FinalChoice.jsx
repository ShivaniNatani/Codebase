import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { GlitchText } from '@/components/GlitchText';
import { TerminalText } from '@/components/TerminalText';
import { useGame } from '@/context/GameContext';

const FinalChoice = () => {
  const navigate = useNavigate();
  const { chaptersCompleted, finalChoiceMade, finalChoice, makeFinalChoice } = useGame();
  const [phase, setPhase] = useState('intro');
  const [choiceHovered, setChoiceHovered] = useState(null);
  const [showMessage, setShowMessage] = useState(false);

  const allCompleted = chaptersCompleted.every(Boolean);

  useEffect(() => {
    if (!allCompleted) {
      navigate('/chapters');
    }
  }, [allCompleted, navigate]);

  useEffect(() => {
    if (finalChoiceMade) {
      setPhase('complete');
      setShowMessage(true);
    }
  }, [finalChoiceMade]);

  const handleChoice = (choice) => {
    makeFinalChoice(choice);
    setPhase('complete');
    setTimeout(() => setShowMessage(true), 2000);
  };

  const startExperience = () => {
    setPhase('choice');
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.3), transparent 50%)`
          }}
        />
        <motion.div
          animate={{ 
            background: [
              'radial-gradient(circle at 20% 30%, hsl(var(--primary) / 0.1), transparent 50%)',
              'radial-gradient(circle at 80% 70%, hsl(var(--primary) / 0.1), transparent 50%)',
              'radial-gradient(circle at 20% 30%, hsl(var(--primary) / 0.1), transparent 50%)',
            ]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute inset-0"
        />
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-vignette pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <AnimatePresence mode="wait">
          {/* INTRO PHASE */}
          {phase === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center max-w-2xl"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="w-32 h-32 rounded-full bg-primary/10 border-2 border-primary/50 flex items-center justify-center mx-auto mb-8"
              >
                <i className="fas fa-infinity text-5xl text-primary" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
                  <GlitchText text="FINAL" glitchIntensity={0.2} />
                  <span className="text-primary">_</span>
                  <GlitchText text="PROTOCOL" glitchIntensity={0.2} className="text-primary" />
                </h1>
                
                <p className="text-muted-foreground font-serif text-lg mb-8">
                  Seven chapters decoded. One choice remains.
                </p>

                <div className="bg-card/50 border border-border rounded-lg p-6 mb-8 text-left font-mono text-sm">
                  <TerminalText 
                    text="You have proven understanding. You have decoded the memories. Now comes the irreversible moment."
                    speed={20}
                    prefix="SYSTEM: "
                    className="text-muted-foreground"
                  />
                </div>

                <Button
                  size="lg"
                  onClick={startExperience}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg"
                >
                  <span>Face the Final Choice</span>
                  <i className="fas fa-chevron-right ml-3" />
                </Button>
              </motion.div>
            </motion.div>
          )}

          {/* CHOICE PHASE */}
          {phase === 'choice' && (
            <motion.div
              key="choice"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-5xl"
            >
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
              >
                <p className="text-xs font-mono text-primary tracking-widest mb-4">
                  THE_IRREVERSIBLE_MOMENT
                </p>
                <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                  Choose Your Truth
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto">
                  This choice cannot be undone. It represents the culmination of everything—
                  every chapter, every memory, every proof of understanding.
                </p>
              </motion.div>

              {/* The Two Choices */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {/* Choice 1 - Accept */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  onMouseEnter={() => setChoiceHovered('accept')}
                  onMouseLeave={() => setChoiceHovered(null)}
                  className="relative"
                >
                  <motion.div
                    animate={{
                      boxShadow: choiceHovered === 'accept' 
                        ? '0 0 60px hsl(var(--primary) / 0.5)' 
                        : '0 0 20px hsl(var(--primary) / 0.2)'
                    }}
                    className="bg-card border-2 border-primary/50 rounded-2xl p-8 h-full cursor-pointer transition-all hover:border-primary"
                    onClick={() => handleChoice('accept')}
                  >
                    <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                      <i className="fas fa-heart text-4xl text-primary" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-center text-foreground mb-4">
                      "Yes, Forever"
                    </h3>
                    
                    <p className="text-center text-muted-foreground mb-6">
                      Accept this proof of understanding. Accept that someone studied you deeply enough 
                      to create this. Accept the alignment.
                    </p>

                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <i className="fas fa-check text-green-500" />
                        <span>Acknowledge the depth</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <i className="fas fa-check text-green-500" />
                        <span>Honor the effort</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <i className="fas fa-check text-green-500" />
                        <span>Choose the partnership</span>
                      </div>
                    </div>

                    <Button
                      className="w-full mt-6 bg-primary hover:bg-primary/90"
                      size="lg"
                    >
                      <i className="fas fa-ring mr-2" />
                      Accept Forever
                    </Button>
                  </motion.div>
                </motion.div>

                {/* Choice 2 - Also Accept (There's no real alternative) */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  onMouseEnter={() => setChoiceHovered('also-accept')}
                  onMouseLeave={() => setChoiceHovered(null)}
                  className="relative"
                >
                  <motion.div
                    animate={{
                      boxShadow: choiceHovered === 'also-accept' 
                        ? '0 0 60px hsl(var(--primary) / 0.3)' 
                        : '0 0 10px hsl(var(--primary) / 0.1)'
                    }}
                    className="bg-card/50 border-2 border-muted rounded-2xl p-8 h-full cursor-pointer transition-all hover:border-primary/50"
                    onClick={() => handleChoice('also-accept')}
                  >
                    <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                      <i className="fas fa-question text-4xl text-muted-foreground" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-center text-foreground mb-4">
                      "Try to Say No"
                    </h3>
                    
                    <p className="text-center text-muted-foreground mb-6">
                      You could try. You could pretend this didn't move you. 
                      But we both know the truth, don't we?
                    </p>

                    <div className="space-y-2 text-sm text-muted-foreground/60">
                      <div className="flex items-center gap-2">
                        <i className="fas fa-times text-muted-foreground/40" />
                        <span className="line-through">Deny the connection</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <i className="fas fa-times text-muted-foreground/40" />
                        <span className="line-through">Ignore the proof</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <i className="fas fa-times text-muted-foreground/40" />
                        <span className="line-through">Walk away unchanged</span>
                      </div>
                    </div>

                    <Button
                      className="w-full mt-6"
                      variant="outline"
                      size="lg"
                    >
                      <i className="fas fa-ban mr-2" />
                      Attempt Denial
                    </Button>

                    <p className="text-xs text-center text-muted-foreground/50 mt-4 font-mono">
                      (spoiler: both paths lead to yes)
                    </p>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* COMPLETE PHASE */}
          {phase === 'complete' && (
            <motion.div
              key="complete"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center max-w-3xl"
            >
              {/* Celebration */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', duration: 0.8 }}
                className="mb-12"
              >
                <motion.div
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-40 h-40 rounded-full bg-primary/20 border-4 border-primary flex items-center justify-center mx-auto pulse-glow"
                >
                  <i className="fas fa-heart text-6xl text-primary heartbeat" />
                </motion.div>
              </motion.div>

              <AnimatePresence>
                {showMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-8"
                  >
                    <div>
                      <p className="text-xs font-mono text-green-400 tracking-widest mb-4">
                        PROTOCOL_COMPLETE • CHOICE_ACCEPTED
                      </p>
                      <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                        {finalChoice === 'accept' ? (
                          <>Alignment <span className="text-primary">Confirmed</span></>
                        ) : (
                          <>Nice Try. <span className="text-primary">Still Yes.</span></>
                        )}
                      </h2>
                    </div>

                    {/* The Final Message */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      className="bg-card border border-primary/30 rounded-2xl p-8 md:p-12 text-left"
                    >
                      <div className="prose prose-invert max-w-none">
                        <p className="text-lg text-foreground/90 leading-relaxed mb-6">
                          <span className="text-primary font-semibold text-2xl">You.</span>
                        </p>
                        <p className="text-lg text-foreground/90 leading-relaxed mb-6">
                          I didn't just love you. I <span className="text-primary font-semibold">studied</span> you.
                        </p>
                        <p className="text-lg text-foreground/90 leading-relaxed mb-6">
                          Every detail of your journey. Every struggle you never talk about. 
                          The boy in Dhanbad who became the man who carries everyone. 
                          The betrayal that built your armor. The five years of fortress-building. 
                          And then... a wrong number that changed everything.
                        </p>
                        <p className="text-lg text-foreground/90 leading-relaxed mb-6">
                          I see you. Not the version you show the world. 
                          <span className="text-primary"> The real one</span>. The one who's tired sometimes but never shows it. 
                          The one who calculated every risk and still chose me.
                        </p>
                        <p className="text-lg text-foreground/90 leading-relaxed mb-6">
                          This wasn't romance. This was <span className="text-primary font-semibold">proof</span>.
                        </p>
                        
                        <div className="border-l-4 border-primary pl-6 py-4 my-8">
                          <p className="text-xl md:text-2xl font-serif italic text-foreground">
                            "No one has ever understood me like this. 
                            This wasn't love. This was alignment."
                          </p>
                        </div>

                        <p className="text-lg text-foreground/90 leading-relaxed mb-6">
                          Seven chapters. Seven days. Seven pieces of evidence that 
                          I didn't just fall for you—I <span className="text-primary">learned</span> you.
                        </p>

                        <p className="text-xl text-primary font-semibold mb-2">
                          Happy Valentine Week.
                        </p>
                        <p className="text-lg text-foreground/90">
                          Now and always.
                        </p>

                        <p className="text-right text-muted-foreground mt-8 font-serif italic">
                          — The one who made space in your packed calendar
                        </p>
                      </div>
                    </motion.div>

                    {/* Final Stats */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 2 }}
                      className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
                    >
                      <div className="bg-card/50 border border-border/50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-primary">7</div>
                        <div className="text-xs text-muted-foreground font-mono">CHAPTERS</div>
                      </div>
                      <div className="bg-card/50 border border-border/50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-primary">7</div>
                        <div className="text-xs text-muted-foreground font-mono">PUZZLES</div>
                      </div>
                      <div className="bg-card/50 border border-border/50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-primary">1</div>
                        <div className="text-xs text-muted-foreground font-mono">TRUTH</div>
                      </div>
                      <div className="bg-card/50 border border-border/50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-primary">∞</div>
                        <div className="text-xs text-muted-foreground font-mono">LOVE</div>
                      </div>
                    </motion.div>

                    {/* Replay Option */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 3 }}
                      className="pt-8"
                    >
                      <Button
                        variant="outline"
                        onClick={() => navigate('/chapters')}
                      >
                        <i className="fas fa-redo mr-2" />
                        Revisit the Journey
                      </Button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom decoration */}
      <div className="fixed bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </div>
  );
};

export default FinalChoice;
