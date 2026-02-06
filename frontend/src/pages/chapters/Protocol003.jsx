import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChapterLayout, StorySection } from '@/components/ChapterLayout';
import { TerminalBlock } from '@/components/TerminalText';
import { GlitchText } from '@/components/GlitchText';
import { DayCompletionPage } from '@/components/DayCompletion';
import { useGame } from '@/context/GameContext';

const Protocol003 = () => {
  const navigate = useNavigate();
  const { chaptersCompleted, completeChapter, findEasterEgg, easterEggsFound } = useGame();
  const [phase, setPhase] = useState(chaptersCompleted[2] ? 'complete' : 'story');
  const [showError, setShowError] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [wordAnswer, setWordAnswer] = useState('');
  const [wordSolved, setWordSolved] = useState(false);
  const [memoryAnswer, setMemoryAnswer] = useState('');
  const [memorySolved, setMemorySolved] = useState(false);

  const handleWordSubmit = () => {
    const answer = wordAnswer.toUpperCase().trim();
    if (['BETRAYAL', 'BETRAYED', 'TRUST', 'HEARTBREAK'].includes(answer)) {
      setWordSolved(true);
      setTimeout(() => setPhase('memory'), 1500);
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 1000);
    }
  };

  const handleMemorySubmit = () => {
    // Answer: 30 or 35 (kilometers)
    const answer = memoryAnswer.trim();
    if (['30', '35', '30-35', '35KM', '30KM'].includes(answer.toUpperCase())) {
      setMemorySolved(true);
      setTimeout(() => setPhase('reflection'), 1500);
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 1000);
    }
  };

  const handleReflectionComplete = () => {
    completeChapter(2);
    setPhase('complete');
  };

  const handleEasterEggFind = () => {
    findEasterEgg(2);
    setShowEasterEgg(true);
  };

  const hasFoundEgg = easterEggsFound?.includes(2);

  return (
    <ChapterLayout
      chapterNumber={3}
      title="PROTOCOL_003"
      subtitle="FRACTURE"
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
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded bg-destructive/10 border border-destructive/30 mb-4">
                  <i className="fas fa-exclamation-triangle text-destructive" />
                  <span className="text-sm font-mono text-destructive">SENSITIVE_DATA</span>
                </div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-6xl mb-6"
                >
                  💔
                </motion.div>
                <h2 className="text-2xl md:text-3xl font-mono text-foreground">
                  <GlitchText text="ACCESSING FRACTURE LOG..." className="text-orange-500" glitchIntensity={0.4} />
                </h2>
              </div>

              <motion.div className="bg-card border border-destructive/30 rounded-lg p-6">
                <TerminalBlock
                  lines={[
                    { text: 'RELATIONSHIP_STATUS: TERMINATED', prefix: '> ', className: 'text-destructive' },
                    { text: 'DAILY_COMMUTE: 30-35 KM (ONE WAY)', prefix: '> ', className: 'text-yellow-400' },
                    { text: 'INVESTMENT: TEACHING_JAVA', prefix: '> ' },
                    { text: 'HER_RESULT: TOP_PERFORMER', prefix: '> ', className: 'text-green-400' },
                    { text: 'HIS_REWARD: ████████', prefix: '> ', className: 'text-destructive' },
                    { text: 'LESSON: WALLS_CONSTRUCTED', prefix: '> ' },
                  ]}
                />
              </motion.div>

              <StorySection>
                <p className="text-foreground/90 text-lg leading-relaxed font-mono">
                  He gave everything. Drove 30-35 kilometers. Every. Single. Day.
                  Taught her Java until she became the best.
                  And she used that success to walk away.
                </p>
              </StorySection>

              {/* Word Puzzle */}
              <div className="bg-card border border-destructive/30 rounded-lg p-8">
                <div className="text-center mb-6">
                  <div className="text-3xl mb-4">🔐</div>
                  <h3 className="text-xl font-bold font-mono text-destructive">DECODE THE WOUND</h3>
                </div>

                <div className="bg-background/50 rounded-lg p-6 mb-6">
                  <p className="text-center font-mono text-lg tracking-wider text-muted-foreground mb-4">
                    _ E T R A Y A L
                  </p>
                  <p className="text-center text-xs text-muted-foreground">
                    What broke the open heart?
                  </p>
                </div>

                <div className="flex gap-3 max-w-sm mx-auto">
                  <input
                    type="text"
                    value={wordAnswer}
                    onChange={(e) => setWordAnswer(e.target.value)}
                    placeholder="Complete the word..."
                    className={`flex-1 bg-background border rounded-lg px-4 py-3 font-mono text-center uppercase ${showError ? 'border-destructive' : 'border-border'}`}
                    onKeyDown={(e) => e.key === 'Enter' && handleWordSubmit()}
                  />
                  <Button onClick={handleWordSubmit} className="bg-primary hover:bg-primary/90">
                    <i className="fas fa-check" />
                  </Button>
                </div>

                {wordSolved && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-green-400 font-mono mt-4"
                  >
                    ✓ DECODED: The wall that saved him
                  </motion.p>
                )}
              </div>

              {/* Hidden Easter Egg */}
              {!hasFoundEgg && (
                <div className="text-center">
                  <p className="text-xs text-muted-foreground/30 cursor-pointer hover:text-primary transition-colors" onClick={handleEasterEggFind}>
                    [HIDDEN_FRAGMENT_003]
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {phase === 'memory' && (
            <motion.div
              key="memory"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              <div className="text-center">
                <div className="text-5xl mb-4">🚗</div>
                <h2 className="text-2xl font-bold font-mono text-foreground">MEMORY TEST</h2>
              </div>

              <div className="bg-card border border-yellow-500/30 rounded-lg p-8 max-w-xl mx-auto">
                <p className="text-foreground text-lg leading-relaxed text-center mb-8">
                  How many kilometers did he drive <span className="text-primary font-bold">one way</span> every day to see her?
                </p>

                <div className="flex gap-3 max-w-sm mx-auto">
                  <input
                    type="text"
                    value={memoryAnswer}
                    onChange={(e) => setMemoryAnswer(e.target.value)}
                    placeholder="Enter number..."
                    className={`flex-1 bg-background border rounded-lg px-4 py-3 font-mono text-center ${showError ? 'border-destructive' : 'border-border'}`}
                    onKeyDown={(e) => e.key === 'Enter' && handleMemorySubmit()}
                  />
                  <Button onClick={handleMemorySubmit} className="bg-primary hover:bg-primary/90">
                    <i className="fas fa-check" />
                  </Button>
                </div>

                {memorySolved && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-green-400 font-mono mt-4"
                  >
                    ✓ CORRECT: That's dedication that went unappreciated
                  </motion.p>
                )}
              </div>
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
                <h2 className="text-2xl font-bold font-mono text-foreground">REFLECTION_PROTOCOL</h2>
              </div>

              <div className="space-y-6 max-w-xl mx-auto">
                <div className="bg-card border border-border rounded-lg p-6">
                  <p className="text-foreground mb-4">
                    After the betrayal, what did you tell yourself to keep going?
                  </p>
                  <textarea
                    placeholder="What got you through..."
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 min-h-[100px] mb-4"
                  />
                  <Button onClick={handleReflectionComplete} className="w-full bg-primary hover:bg-primary/90">
                    Continue
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {phase === 'complete' && (
            <DayCompletionPage
              dayIndex={2}
              onContinue={() => navigate('/protocol-004')}
              nextDayName="PROTOCOL_004: GLITCH"
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
                  <h3 className="text-lg font-bold text-primary mb-4">SECRET FRAGMENT #3</h3>
                  <div className="bg-background/50 rounded-lg p-4 mb-4">
                    <p className="text-foreground/80 font-serif italic text-sm leading-relaxed">
                      "I want love that chooses me,<br/>
                      Even on days I'm hard to love.<br/>
                      Love that listens before it judges,<br/>
                      That holds me when I'm breaking."
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    She knows what real love means. And she sees it in you.
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

export default Protocol003;
