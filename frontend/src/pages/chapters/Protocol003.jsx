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

const Protocol003 = () => {
  const navigate = useNavigate();
  const { chaptersCompleted, completeChapter, findEasterEgg, easterEggsFound } = useGame();
  const [phase, setPhase] = useState(chaptersCompleted[2] ? 'complete' : 'story');
  const [showError, setShowError] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [wordAnswer, setWordAnswer] = useState('');
  const [wordSolved, setWordSolved] = useState(false);
  const [selectedEmotions, setSelectedEmotions] = useState([]);

  const handleWordSubmit = () => {
    const answer = wordAnswer.toUpperCase().trim();
    if (['BETRAYAL', 'BETRAYED', 'TRUST', 'HEARTBREAK'].includes(answer)) {
      setWordSolved(true);
      setTimeout(() => setPhase('emotions'), 1500);
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 1000);
    }
  };

  const correctEmotions = ['wall', 'guard', 'alpha'];
  
  const handleEmotionSelect = (emotion) => {
    if (selectedEmotions.includes(emotion)) {
      setSelectedEmotions(selectedEmotions.filter(e => e !== emotion));
    } else {
      const newSelected = [...selectedEmotions, emotion];
      setSelectedEmotions(newSelected);
      
      // Check if 3 correct emotions selected
      const correctCount = newSelected.filter(e => correctEmotions.includes(e)).length;
      if (correctCount >= 3) {
        setTimeout(() => setPhase('reflection'), 1500);
      }
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

  const emotionOptions = [
    { id: 'wall', label: 'Built walls', emoji: '🧱', correct: true },
    { id: 'guard', label: 'Raised guard', emoji: '🛡️', correct: true },
    { id: 'alpha', label: 'Became the Alpha', emoji: '👑', correct: true },
    { id: 'cry', label: 'Cried for days', emoji: '😢', correct: false },
    { id: 'revenge', label: 'Sought revenge', emoji: '😤', correct: false },
    { id: 'gave_up', label: 'Gave up on love', emoji: '💀', correct: false },
  ];

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

              {/* Chocolate visual */}
              <div className="text-center py-4">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-5xl"
                >
                  🍫💔
                </motion.div>
                <p className="text-sm text-muted-foreground mt-2 font-serif italic">
                  "Some bitterness can't be sweetened"
                </p>
              </div>

              <motion.div className="bg-card border border-destructive/30 rounded-lg p-6">
                <TerminalBlock
                  lines={[
                    { text: 'RELATIONSHIP_STATUS: TERMINATED', prefix: '> ', className: 'text-destructive' },
                    { text: 'INVESTMENT: EVERYTHING', prefix: '> ', className: 'text-yellow-400' },
                    { text: 'TAUGHT_HER: JAVA_SKILLS', prefix: '> ' },
                    { text: 'HER_RESULT: TOP_PERFORMER', prefix: '> ', className: 'text-green-400' },
                    { text: 'HIS_REWARD: ████████', prefix: '> ', className: 'text-destructive' },
                    { text: 'LESSON: WALLS_CONSTRUCTED', prefix: '> ' },
                  ]}
                />
              </motion.div>

              <StorySection>
                <p className="text-foreground/90 text-lg leading-relaxed font-mono">
                  He gave her everything. His time. His knowledge. His heart.
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

          {phase === 'emotions' && (
            <motion.div
              key="emotions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              <div className="text-center">
                <div className="text-5xl mb-4">🛡️</div>
                <h2 className="text-2xl font-bold font-mono text-foreground">RESPONSE ANALYSIS</h2>
                <p className="text-muted-foreground mt-2">How did he respond to the betrayal? (Select 3)</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                {emotionOptions.map((option) => (
                  <motion.button
                    key={option.id}
                    onClick={() => handleEmotionSelect(option.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-4 rounded-lg border text-center transition-all ${
                      selectedEmotions.includes(option.id)
                        ? option.correct 
                          ? 'bg-green-500/20 border-green-500'
                          : 'bg-red-500/20 border-red-500'
                        : 'bg-card border-border hover:border-primary'
                    }`}
                  >
                    <div className="text-3xl mb-2">{option.emoji}</div>
                    <p className="text-sm text-foreground">{option.label}</p>
                  </motion.button>
                ))}
              </div>

              <p className="text-center text-sm text-muted-foreground">
                {selectedEmotions.filter(e => correctEmotions.includes(e)).length}/3 correct responses
              </p>
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
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      'I will become stronger',
                      'Her loss, not mine',
                      'The right one will see my worth',
                      'Pain is temporary, growth is permanent',
                      'I became the Alpha'
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
