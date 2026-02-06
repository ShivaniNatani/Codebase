import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChapterLayout, StorySection } from '@/components/ChapterLayout';
import { TerminalBlock } from '@/components/TerminalText';
import { GlitchText } from '@/components/GlitchText';
import { DayCompletionPage } from '@/components/DayCompletion';
import { SecretHint } from '@/components/SecretHint';
import { useGame } from '@/context/GameContext';

const Protocol002 = () => {
  const navigate = useNavigate();
  const { chaptersCompleted, completeChapter, findEasterEgg, easterEggsFound } = useGame();
  const [phase, setPhase] = useState(chaptersCompleted[1] ? 'complete' : 'story');
  const [sequenceInput, setSequenceInput] = useState(['', '', '', '']);
  const [sequenceSolved, setSequenceSolved] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [codeAnswer, setCodeAnswer] = useState('');
  const [codeSolved, setCodeSolved] = useState(false);

  // Pattern: 2, 6, 18, 54 (multiply by 3)
  const correctSequence = ['2', '6', '18', '54'];

  const handleSequenceChange = (index, value) => {
    const newSequence = [...sequenceInput];
    newSequence[index] = value;
    setSequenceInput(newSequence);
  };

  const handleSequenceSubmit = () => {
    if (sequenceInput.join(',') === correctSequence.join(',')) {
      setSequenceSolved(true);
      setTimeout(() => setPhase('code'), 1500);
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 1000);
    }
  };

  const handleCodeSubmit = () => {
    // Answer: AMAZON or SPONTANEOUS
    const answer = codeAnswer.toUpperCase().trim();
    if (['AMAZON', 'SPONTANEOUS', 'OFFLINE'].includes(answer)) {
      setCodeSolved(true);
      setTimeout(() => setPhase('reflection'), 1500);
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 1000);
    }
  };

  const handleReflectionComplete = () => {
    completeChapter(1);
    setPhase('complete');
  };

  const handleEasterEggFind = () => {
    findEasterEgg(1);
    setShowEasterEgg(true);
  };

  const hasFoundEgg = easterEggsFound?.includes(1);

  return (
    <ChapterLayout
      chapterNumber={2}
      title="PROTOCOL_002"
      subtitle="ASCENSION"
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
                  ⚡
                </motion.div>
                <h2 className="text-2xl md:text-3xl font-mono text-foreground">
                  <GlitchText text="LOADING ASCENSION DATA..." className="text-yellow-400" glitchIntensity={0.3} />
                </h2>
              </div>

              <motion.div className="bg-card border border-yellow-500/30 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4 text-xs font-mono text-yellow-400">
                  <i className="fas fa-chart-line" />
                  <span>GROWTH_METRICS.log</span>
                </div>
                <TerminalBlock
                  lines={[
                    { text: 'MIGRATION: DHANBAD → BANGALORE', prefix: '> ', className: 'text-primary' },
                    { text: 'DISTANCE: 1,900 KM', prefix: '> ' },
                    { text: 'SUPPORT_SYSTEM: MINIMAL', prefix: '> ', className: 'text-yellow-400' },
                    { text: 'DAILY_CODE_HOURS: 18+', prefix: '> ', className: 'text-green-400' },
                    { text: 'INTERVIEW_TYPE: ████████', prefix: '> ' },
                    { text: 'RESULT: HIRED', prefix: '> ', className: 'text-green-400' },
                  ]}
                />
              </motion.div>

              <StorySection>
                <p className="text-foreground/90 text-lg leading-relaxed font-mono">
                  The boy became a man. The dreamer became a builder.
                  1,900 kilometers from home, he wrote his own destiny—
                  one line of code at a time.
                </p>
              </StorySection>

              {/* Pattern Recognition Puzzle */}
              <div className="bg-card border border-purple-500/30 rounded-lg p-8">
                <div className="text-center mb-6">
                  <div className="text-3xl mb-4">🧠</div>
                  <h3 className="text-xl font-bold font-mono text-purple-400">PATTERN ANALYSIS</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Complete the sequence to unlock
                  </p>
                </div>

                <div className="bg-background/50 rounded-lg p-6 mb-6">
                  <p className="text-center text-sm text-muted-foreground mb-4">
                    Like his growth: exponential, unstoppable
                  </p>
                  <div className="flex items-center justify-center gap-4 flex-wrap">
                    {sequenceInput.map((val, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={val}
                          onChange={(e) => handleSequenceChange(i, e.target.value)}
                          className={`w-16 h-16 bg-background border rounded-lg text-center font-mono text-2xl ${showError ? 'border-destructive' : 'border-border'}`}
                          maxLength={2}
                        />
                        {i < 3 && <span className="text-2xl text-muted-foreground">→</span>}
                      </div>
                    ))}
                  </div>
                  <p className="text-center text-xs text-muted-foreground mt-4">
                    Hint: Each number × 3 = Next number
                  </p>
                </div>

                <div className="text-center">
                  <Button onClick={handleSequenceSubmit} className="bg-primary hover:bg-primary/90">
                    <i className="fas fa-check mr-2" />
                    Verify Pattern
                  </Button>
                </div>

                {sequenceSolved && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-green-400 font-mono mt-4"
                  >
                    ✓ PATTERN RECOGNIZED: Exponential Growth
                  </motion.p>
                )}
              </div>

              {/* Hidden Easter Egg */}
              {!hasFoundEgg && (
                <div className="text-center">
                  <p className="text-xs text-muted-foreground/30 cursor-pointer hover:text-primary transition-colors" onClick={handleEasterEggFind}>
                    [HIDDEN_FRAGMENT_002]
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {phase === 'code' && (
            <motion.div
              key="code"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              <div className="text-center">
                <div className="text-5xl mb-4">💻</div>
                <h2 className="text-2xl font-bold font-mono text-foreground">DECODE THE LEGEND</h2>
                <p className="text-muted-foreground mt-2">Answer to proceed</p>
              </div>

              <div className="bg-card border border-blue-500/30 rounded-lg p-8 max-w-xl mx-auto">
                <p className="text-foreground text-lg leading-relaxed text-center font-serif italic mb-8">
                  "Most prepare for months, strategy and plan.<br/>
                  He walked in unannounced, just skills in hand.<br/>
                  No appointment, no warning, just pure might.<br/>
                  Walked out employed that very night.<br/>
                  <span className="text-primary font-bold">Where did this legendary interview happen?"</span>
                </p>

                <div className="flex gap-3 max-w-sm mx-auto">
                  <input
                    type="text"
                    value={codeAnswer}
                    onChange={(e) => setCodeAnswer(e.target.value)}
                    placeholder="Company name..."
                    className={`flex-1 bg-background border rounded-lg px-4 py-3 font-mono text-center uppercase ${showError ? 'border-destructive' : 'border-border'}`}
                    onKeyDown={(e) => e.key === 'Enter' && handleCodeSubmit()}
                  />
                  <Button onClick={handleCodeSubmit} className="bg-primary hover:bg-primary/90">
                    <i className="fas fa-check" />
                  </Button>
                </div>

                {codeSolved && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-green-400 font-mono mt-4"
                  >
                    ✓ CORRECT: The spontaneous legend
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
                    What gave you the courage to walk into that interview without an appointment?
                  </p>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      'Nothing to lose, everything to gain',
                      'Confidence in my skills',
                      'Desperation fueled by determination',
                      'Something inside said "now or never"'
                    ].map((option) => (
                      <button
                        key={option}
                        className="bg-background border border-border rounded-lg px-4 py-3 text-sm hover:border-primary transition-colors text-left"
                        onClick={handleReflectionComplete}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {phase === 'complete' && (
            <DayCompletionPage
              dayIndex={1}
              onContinue={() => navigate('/protocol-003')}
              nextDayName="PROTOCOL_003: FRACTURE"
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
                  <h3 className="text-lg font-bold text-primary mb-4">SECRET FRAGMENT #2</h3>
                  <div className="bg-background/50 rounded-lg p-4 mb-4">
                    <p className="text-foreground/80 font-serif italic text-sm leading-relaxed">
                      "I want the guy I date to be more than a boyfriend—<br/>
                      I want him to be my best friend.<br/>
                      A love that's real, raw, and a little ridiculous.<br/>
                      That's my kind of love."
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    She sees you as more than an alpha. She sees a best friend.
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

export default Protocol002;
