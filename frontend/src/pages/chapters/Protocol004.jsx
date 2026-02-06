import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChapterLayout, StorySection } from '@/components/ChapterLayout';
import { TerminalBlock } from '@/components/TerminalText';
import { GlitchText } from '@/components/GlitchText';
import { DayCompletionPage } from '@/components/DayCompletion';
import { useGame } from '@/context/GameContext';

const Protocol004 = () => {
  const navigate = useNavigate();
  const { chaptersCompleted, completeChapter, findEasterEgg, easterEggsFound } = useGame();
  const [phase, setPhase] = useState(chaptersCompleted[3] ? 'complete' : 'story');
  const [showError, setShowError] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [cityAnswer, setCityAnswer] = useState('');
  const [citySolved, setCitySolved] = useState(false);
  const [dateAnswer, setDateAnswer] = useState('');
  const [dateSolved, setDateSolved] = useState(false);

  const handleCitySubmit = () => {
    const answer = cityAnswer.toUpperCase().trim();
    if (['MUMBAI', 'BOMBAY'].includes(answer)) {
      setCitySolved(true);
      setTimeout(() => setPhase('date'), 1500);
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 1000);
    }
  };

  const handleDateSubmit = () => {
    // Shivani's birthday: 14 May 1998 or 14051998
    const answer = dateAnswer.replace(/[^0-9]/g, '');
    if (['14051998', '14598', '1451998'].includes(answer) || dateAnswer.toLowerCase().includes('may')) {
      setDateSolved(true);
      setTimeout(() => setPhase('reflection'), 1500);
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 1000);
    }
  };

  const handleReflectionComplete = () => {
    completeChapter(3);
    setPhase('complete');
  };

  const handleEasterEggFind = () => {
    findEasterEgg(3);
    setShowEasterEgg(true);
  };

  const hasFoundEgg = easterEggsFound?.includes(3);

  return (
    <ChapterLayout
      chapterNumber={4}
      title="PROTOCOL_004"
      subtitle="GLITCH"
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
                <div className="text-6xl md:text-8xl font-bold mb-4">
                  <GlitchText text="ERROR" className="text-green-400" glitchIntensity={0.5} />
                </div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-6xl mb-6"
                >
                  🐛
                </motion.div>
                <h2 className="text-xl font-mono text-muted-foreground">
                  SYSTEM_ANOMALY_DETECTED
                </h2>
              </div>

              <motion.div className="bg-card border border-green-500/30 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4 text-xs font-mono text-green-400">
                  <i className="fas fa-bug" />
                  <span>ANOMALY_LOG.dat</span>
                </div>
                <TerminalBlock
                  lines={[
                    { text: 'EVENT_TYPE: WRONG_NUMBER_CALL', prefix: '> ', className: 'text-yellow-400' },
                    { text: 'CALLER: ARGHA (UpGrad_Alumni)', prefix: '> ' },
                    { text: 'INTENDED_TARGET: "Other Shivani"', prefix: '> ', className: 'text-muted-foreground' },
                    { text: 'TARGET_CITY: ████████', prefix: '> ' },
                    { text: 'ACTUAL_RECIPIENT: SHIVANI (Bangalore)', prefix: '> ', className: 'text-primary' },
                    { text: 'HER_RESPONSE: "I know who you are"', prefix: '> ', className: 'text-green-400' },
                    { text: 'OUTCOME: DESTINY_ACTIVATED', prefix: '> ', className: 'text-primary' },
                  ]}
                />
              </motion.div>

              <StorySection>
                <p className="text-foreground/90 text-lg leading-relaxed font-mono">
                  The famous UpGrad session guy called one night.
                  He thought he was calling one Shivani—the one in a different city.
                  But he got another. The right one.
                </p>
                <p className="text-primary text-xl font-bold text-center mt-6">
                  "I know who you are" she said. And everything changed.
                </p>
              </StorySection>

              {/* City Puzzle */}
              <div className="bg-card border border-green-500/30 rounded-lg p-8">
                <div className="text-center mb-6">
                  <div className="text-3xl mb-4">🏙️</div>
                  <h3 className="text-xl font-bold font-mono text-green-400">LOCATE THE GLITCH</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Where was the "other Shivani" supposed to be?
                  </p>
                </div>

                <div className="flex gap-3 max-w-sm mx-auto">
                  <input
                    type="text"
                    value={cityAnswer}
                    onChange={(e) => setCityAnswer(e.target.value)}
                    placeholder="City name..."
                    className={`flex-1 bg-background border rounded-lg px-4 py-3 font-mono text-center ${showError ? 'border-destructive' : 'border-border'}`}
                    onKeyDown={(e) => e.key === 'Enter' && handleCitySubmit()}
                  />
                  <Button onClick={handleCitySubmit} className="bg-primary hover:bg-primary/90">
                    <i className="fas fa-check" />
                  </Button>
                </div>

                {citySolved && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-green-400 font-mono mt-4"
                  >
                    ✓ CORRECT: But destiny had other plans
                  </motion.p>
                )}
              </div>

              {/* Hidden Easter Egg */}
              {!hasFoundEgg && (
                <div className="text-center">
                  <p className="text-xs text-muted-foreground/30 cursor-pointer hover:text-primary transition-colors" onClick={handleEasterEggFind}>
                    [HIDDEN_FRAGMENT_004]
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {phase === 'date' && (
            <motion.div
              key="date"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              <div className="text-center">
                <div className="text-5xl mb-4">🎂</div>
                <h2 className="text-2xl font-bold font-mono text-foreground">IDENTITY VERIFICATION</h2>
                <p className="text-muted-foreground mt-2">Prove you know the RIGHT Shivani</p>
              </div>

              <div className="bg-card border border-pink-500/30 rounded-lg p-8 max-w-xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-center">
                  <div>
                    <div className="text-2xl mb-2">📍</div>
                    <div className="text-sm font-medium text-foreground">Indore</div>
                    <div className="text-xs text-muted-foreground">Origin</div>
                  </div>
                  <div>
                    <div className="text-2xl mb-2">🎂</div>
                    <div className="text-sm font-medium text-foreground">?????</div>
                    <div className="text-xs text-muted-foreground">Birthday</div>
                  </div>
                  <div>
                    <div className="text-2xl mb-2">🥗</div>
                    <div className="text-sm font-medium text-foreground">Pure Veg</div>
                    <div className="text-xs text-muted-foreground">Food</div>
                  </div>
                  <div>
                    <div className="text-2xl mb-2">💖</div>
                    <div className="text-sm font-medium text-foreground">Emotional</div>
                    <div className="text-xs text-muted-foreground">Heart</div>
                  </div>
                </div>

                <p className="text-foreground text-center mb-4">
                  When is the right Shivani's birthday?
                </p>

                <div className="flex gap-3 max-w-sm mx-auto">
                  <input
                    type="text"
                    value={dateAnswer}
                    onChange={(e) => setDateAnswer(e.target.value)}
                    placeholder="DD/MM/YYYY or describe..."
                    className={`flex-1 bg-background border rounded-lg px-4 py-3 font-mono text-center ${showError ? 'border-destructive' : 'border-border'}`}
                    onKeyDown={(e) => e.key === 'Enter' && handleDateSubmit()}
                  />
                  <Button onClick={handleDateSubmit} className="bg-primary hover:bg-primary/90">
                    <i className="fas fa-check" />
                  </Button>
                </div>

                {dateSolved && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-green-400 font-mono mt-4"
                  >
                    ✓ VERIFIED: 14 May 1998 - You know her
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
                    That night when you called the "wrong Shivani" - why didn't you hang up?
                  </p>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      'Something felt different immediately',
                      'I was curious who knew me',
                      'Her voice... it just felt right',
                      'Maybe I knew it wasn\'t wrong at all'
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
              dayIndex={3}
              onContinue={() => navigate('/midway-checkpoint')}
              nextDayName="Continue Journey"
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
                  <h3 className="text-lg font-bold text-primary mb-4">SECRET FRAGMENT #4</h3>
                  <div className="bg-background/50 rounded-lg p-4 mb-4">
                    <p className="text-foreground/80 font-serif italic text-sm leading-relaxed">
                      "Even vodka couldn't do<br/>
                      What his black shirt did.<br/>
                      Sleeping pills couldn't do<br/>
                      What his arms did.<br/>
                      He did what no one else could."
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    You are her peace. Her calm. Her everything.
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

export default Protocol004;
