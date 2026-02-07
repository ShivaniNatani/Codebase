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

// Cipher decoder helper
const decodeCipher = (text, shift = 3) => {
  return text.split('').map(char => {
    if (char.match(/[a-z]/i)) {
      const code = char.charCodeAt(0);
      const base = code >= 65 && code <= 90 ? 65 : 97;
      return String.fromCharCode(((code - base - shift + 26) % 26) + base);
    }
    return char;
  }).join('');
};

const Protocol001 = () => {
  const navigate = useNavigate();
  const { chaptersCompleted, completeChapter, findEasterEgg, easterEggsFound } = useGame();
  const [phase, setPhase] = useState('story'); // Always start at story so users can revisit
  const [puzzleSolved, setPuzzleSolved] = useState(false);
  const [cipherInput, setCipherInput] = useState('');
  const [cipherError, setCipherError] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [riddleAnswer, setRiddleAnswer] = useState('');
  const [riddleSolved, setRiddleSolved] = useState(false);

  const handleCipherSubmit = () => {
    // The cipher is "GKDQEKDG" which decodes to "DHANBAD" with shift 3
    if (cipherInput.toUpperCase() === 'DHANBAD') {
      setPuzzleSolved(true);
      setTimeout(() => setPhase('riddle'), 1500);
    } else {
      setCipherError(true);
      setTimeout(() => setCipherError(false), 1000);
    }
  };

  const handleRiddleSubmit = () => {
    // Riddle answer: FATHER or DAD or PAPA
    const answer = riddleAnswer.toUpperCase().trim();
    if (['FATHER', 'DAD', 'PAPA', 'BABA'].includes(answer)) {
      setRiddleSolved(true);
      setTimeout(() => setPhase('reflection'), 1500);
    } else {
      setCipherError(true);
      setTimeout(() => setCipherError(false), 1000);
    }
  };

  const handleReflectionComplete = () => {
    completeChapter(0);
    setPhase('complete');
  };

  const handleEasterEggFind = () => {
    findEasterEgg(0);
    setShowEasterEgg(true);
  };

  const hasFoundEgg = easterEggsFound?.includes(0);

  return (
    <ChapterLayout
      chapterNumber={1}
      title="PROTOCOL_001"
      subtitle="ORIGIN"
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
              {/* Opening */}
              <div className="text-center py-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-6xl mb-6"
                >
                  🔐
                </motion.div>
                <h2 className="text-2xl md:text-3xl font-mono text-foreground">
                  <GlitchText text="DECRYPTING ORIGIN FILE..." className="text-primary" glitchIntensity={0.3} />
                </h2>
              </div>

              <motion.div className="bg-card border border-primary/30 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4 text-xs font-mono text-primary">
                  <i className="fas fa-database" />
                  <span>MEMORY_FRAGMENT_001.dat</span>
                </div>
                <TerminalBlock
                  lines={[
                    { text: 'SUBJECT_ID: ████████', prefix: '> ' },
                    { text: 'ORIGIN_COORDINATES: ENCRYPTED', prefix: '> ', className: 'text-yellow-400' },
                    { text: 'YEAR_RANGE: 1994-2010', prefix: '> ' },
                    { text: 'CLASSIFICATION: ALPHA_SEED', prefix: '> ', className: 'text-green-400' },
                    { text: 'FATHER_OCCUPATION: PUBLIC_SERVANT', prefix: '> ' },
                    { text: 'FIRST_MACHINE: YEAR_1999', prefix: '> ', className: 'text-primary' },
                  ]}
                />
              </motion.div>

              <StorySection>
                <p className="text-foreground/90 text-lg leading-relaxed font-mono">
                  Before the alpha. Before the empire. Before the walls.
                  There was a boy in a coal-dusted city with nothing but a computer and a dream.
                </p>
              </StorySection>

              {/* Cipher Puzzle */}
              <div className="bg-card border border-yellow-500/30 rounded-lg p-8">
                <div className="text-center mb-6">
                  <div className="text-3xl mb-4">🔓</div>
                  <h3 className="text-xl font-bold font-mono text-yellow-400">CIPHER CHALLENGE</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Decode to reveal the origin city
                  </p>
                </div>

                <div className="bg-background/50 rounded-lg p-6 mb-6">
                  <p className="text-center font-mono text-2xl tracking-wider text-primary mb-4">
                    GKDQEKDG
                  </p>
                  <p className="text-center text-xs text-muted-foreground">
                    Hint: Caesar shift -3 (D→A, E→B, F→C...)
                  </p>
                </div>

                <div className="flex gap-3 max-w-md mx-auto">
                  <input
                    type="text"
                    value={cipherInput}
                    onChange={(e) => setCipherInput(e.target.value)}
                    placeholder="Enter decoded word..."
                    className={`flex-1 bg-background border rounded-lg px-4 py-3 font-mono text-center uppercase tracking-wider ${cipherError ? 'border-destructive' : 'border-border'}`}
                    onKeyDown={(e) => e.key === 'Enter' && handleCipherSubmit()}
                  />
                  <Button onClick={handleCipherSubmit} className="bg-primary hover:bg-primary/90">
                    <i className="fas fa-key" />
                  </Button>
                </div>

                {puzzleSolved && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-green-400 font-mono mt-4"
                  >
                    ✓ DECRYPTED: DHANBAD
                  </motion.p>
                )}
              </div>

              {/* Hidden Easter Egg */}
              <SecretHint
                onClick={handleEasterEggFind}
                found={hasFoundEgg}
                fragmentNumber={1}
              />
            </motion.div>
          )}

          {phase === 'riddle' && (
            <motion.div
              key="riddle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              <div className="text-center">
                <div className="text-5xl mb-4">🧩</div>
                <h2 className="text-2xl font-bold font-mono text-foreground">RIDDLE GATE</h2>
                <p className="text-muted-foreground mt-2">Solve to proceed</p>
              </div>

              <div className="bg-card border border-purple-500/30 rounded-lg p-8 max-w-xl mx-auto">
                <p className="text-foreground text-lg leading-relaxed text-center font-serif italic mb-8">
                  "An Income Tax Officer by day,<br />
                  But to his son, so much more to say.<br />
                  He brought home the machine of dreams,<br />
                  Believing in futures yet unseen.<br />
                  <span className="text-primary font-bold">Who planted the seed of the alpha's rise?"</span>
                </p>

                <div className="flex gap-3 max-w-sm mx-auto">
                  <input
                    type="text"
                    value={riddleAnswer}
                    onChange={(e) => setRiddleAnswer(e.target.value)}
                    placeholder="Who was it?"
                    className={`flex-1 bg-background border rounded-lg px-4 py-3 font-mono text-center ${cipherError ? 'border-destructive' : 'border-border'}`}
                    onKeyDown={(e) => e.key === 'Enter' && handleRiddleSubmit()}
                  />
                  <Button onClick={handleRiddleSubmit} className="bg-primary hover:bg-primary/90">
                    <i className="fas fa-check" />
                  </Button>
                </div>

                {riddleSolved && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-green-400 font-mono mt-4"
                  >
                    ✓ CORRECT: The Father who believed
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
                <p className="text-muted-foreground mt-2">
                  Answer honestly. Your responses are recorded.
                </p>
              </div>

              <div className="space-y-6 max-w-xl mx-auto">
                <div className="bg-card border border-border rounded-lg p-6">
                  <p className="text-foreground mb-4">
                    That boy in Dhanbad became the man you are. When you look back, what do you feel?
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {['Pride', 'Gratitude', 'Determination', 'All of these'].map((option) => (
                      <button
                        key={option}
                        className="bg-background border border-border rounded-lg px-4 py-3 text-sm hover:border-primary transition-colors"
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
              dayIndex={0}
              onContinue={() => navigate('/protocol-002')}
              nextDayName="PROTOCOL_002: ASCENSION"
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
                  <h3 className="text-lg font-bold text-primary mb-4">SECRET FRAGMENT #1</h3>
                  <div className="bg-background/50 rounded-lg p-4 mb-4">
                    <p className="text-foreground/80 font-serif italic text-sm leading-relaxed">
                      "The warmth of sunshine couldn't do<br />
                      What his presence did.<br />
                      He did what no one else could."
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    This is how she sees you. Keep searching for more.
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

export default Protocol001;
