import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChapterLayout, StorySection } from '@/components/ChapterLayout';
import { GlitchText } from '@/components/GlitchText';
import { DayCompletionPage } from '@/components/DayCompletion';
import { useGame } from '@/context/GameContext';

const Protocol007 = () => {
  const navigate = useNavigate();
  const { chaptersCompleted, completeChapter, findEasterEgg, easterEggsFound } = useGame();
  const [phase, setPhase] = useState(chaptersCompleted[6] ? 'complete' : 'story');
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [revealStep, setRevealStep] = useState(0);

  const revelations = [
    { text: 'Your greatest achievement isn\'t Amazon.', delay: 0 },
    { text: 'It isn\'t surviving Dhanbad.', delay: 1 },
    { text: 'It isn\'t even being the Alpha.', delay: 2 },
    { text: 'Your greatest achievement...', delay: 3 },
  ];

  const handleNextStep = () => {
    if (revealStep < revelations.length) {
      setRevealStep(revealStep + 1);
    } else {
      setPhase('reflection');
    }
  };

  const handleReflectionComplete = () => {
    completeChapter(6);
    setPhase('complete');
  };

  const handleEasterEggFind = () => {
    findEasterEgg(6);
    setShowEasterEgg(true);
  };

  const hasFoundEgg = easterEggsFound?.includes(6);

  return (
    <ChapterLayout
      chapterNumber={7}
      title="PROTOCOL_007"
      subtitle="REVELATION"
      date="CLASSIFIED"
    >
      <div className="max-w-4xl mx-auto space-y-12">
        <AnimatePresence mode="wait">
          {phase === 'story' && (
            <motion.div
              key="story"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-12"
            >
              <div className="text-center py-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-6xl mb-6"
                >
                  👁️
                </motion.div>
                <h2 className="text-2xl md:text-3xl font-mono text-foreground">
                  <GlitchText text="REVELATION SEQUENCE" className="text-pink-400" glitchIntensity={0.3} />
                </h2>
              </div>

              <StorySection>
                <p className="text-foreground/90 text-lg leading-relaxed font-mono text-center">
                  You've seen your journey through her eyes.<br/>
                  Now see what she truly found at the end of it.
                </p>
              </StorySection>

              {/* Revelation Sequence */}
              <div className="bg-card border border-pink-500/30 rounded-lg p-8 min-h-[300px] flex flex-col items-center justify-center">
                <div className="space-y-6 text-center">
                  {revelations.slice(0, revealStep).map((rev, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xl text-muted-foreground"
                    >
                      {rev.text}
                    </motion.p>
                  ))}

                  {revealStep === revelations.length && (
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', duration: 0.8 }}
                      className="pt-8"
                    >
                      <div className="text-5xl md:text-7xl font-bold">
                        <GlitchText text="IS HER" className="text-primary" glitchIntensity={0.2} />
                      </div>
                      <p className="text-xl text-foreground mt-4">
                        Shivani. The "wrong" number. Your right answer.
                      </p>
                    </motion.div>
                  )}
                </div>

                {revealStep <= revelations.length && (
                  <Button
                    onClick={handleNextStep}
                    className="mt-8 bg-primary hover:bg-primary/90"
                    size="lg"
                  >
                    {revealStep < revelations.length ? 'Continue' : 'Accept the Truth'}
                    <i className="fas fa-arrow-right ml-2" />
                  </Button>
                )}
              </div>

              {/* Scotch Photo */}
              <div className="bg-card border border-border rounded-lg p-6 text-center">
                <img 
                  src="https://customer-assets.emergentagent.com/job_dark-valentine/artifacts/p20n7hmx_IMG_8293.jpeg"
                  alt="Scotch"
                  className="w-48 h-48 object-cover rounded-lg mx-auto mb-4"
                />
                <p className="text-sm text-muted-foreground">
                  Even Scotch knows. 🐕
                </p>
              </div>

              {/* Hidden Easter Egg */}
              {!hasFoundEgg && (
                <div className="text-center">
                  <p className="text-xs text-muted-foreground/30 cursor-pointer hover:text-primary transition-colors" onClick={handleEasterEggFind}>
                    [HIDDEN_FRAGMENT_007]
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {phase === 'reflection' && (
            <motion.div
              key="reflection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              <div className="text-center mb-8">
                <div className="text-5xl mb-4">💭</div>
                <h2 className="text-2xl font-bold font-mono text-foreground">FINAL REFLECTION</h2>
              </div>

              <div className="space-y-6 max-w-xl mx-auto">
                <div className="bg-card border border-border rounded-lg p-6">
                  <p className="text-foreground mb-4">
                    After everything—Dhanbad, the struggle, the betrayal, the walls—
                    what does having HER feel like?
                  </p>
                  <textarea
                    placeholder="Tell her what she means to you..."
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 min-h-[120px] mb-4"
                  />
                  <Button onClick={handleReflectionComplete} className="w-full bg-primary hover:bg-primary/90">
                    Submit & Continue
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {phase === 'complete' && (
            <DayCompletionPage
              dayIndex={6}
              onContinue={() => navigate('/protocol-final')}
              nextDayName="PROTOCOL_FINAL: CHOICE"
            />
          )}
        </AnimatePresence>

        {/* Easter Egg Modal */}
        <AnimatePresence>
          {showEasterEgg && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowEasterEgg(false)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-card border border-primary rounded-lg p-8 max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">💎</div>
                  <h3 className="text-lg font-bold text-primary mb-4">SECRET FRAGMENT #7</h3>
                  <div className="bg-background/50 rounded-lg p-4 mb-4">
                    <p className="text-foreground/80 font-serif italic text-sm leading-relaxed">
                      "I want to be your motivation, inspiration,<br/>
                      and everything in between.<br/>
                      I want to be the reason for your smile,<br/>
                      the one who turns your frown upside down.<br/>
                      Because my most treasured title would be:<br/>
                      <span className="text-primary font-bold">Your Wife.</span>"
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    This is what she dreams of. This is what you can give her.
                  </p>
                  <Button onClick={() => setShowEasterEgg(false)} className="mt-4" variant="outline">
                    Continue
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ChapterLayout>
  );
};

export default Protocol007;
