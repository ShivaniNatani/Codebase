import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChapterLayout, StorySection } from '@/components/ChapterLayout';
import { GlitchText } from '@/components/GlitchText';
import { DayCompletionPage } from '@/components/DayCompletion';
import { SecretHint } from '@/components/SecretHint';
import { useGame } from '@/context/GameContext';

const Protocol005 = () => {
  const navigate = useNavigate();
  const { chaptersCompleted, completeChapter, findEasterEgg, easterEggsFound } = useGame();
  const [phase, setPhase] = useState(chaptersCompleted[4] ? 'complete' : 'story');
  const [showError, setShowError] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const paradoxPairs = [
    { left: 'Dhanbad', right: 'Indore', id: 1 },
    { left: 'Non-Veg 🍗', right: 'Pure Veg 🥗', id: 2 },
    { left: 'Alpha/Logical', right: 'Emotional', id: 3 },
    { left: 'Reserved', right: 'Expressive', id: 4 },
  ];

  const handleMatch = (side, id) => {
    if (matchedPairs.includes(id)) return;
    
    if (!selectedItem) {
      setSelectedItem({ side, id });
    } else if (selectedItem.id === id && selectedItem.side !== side) {
      setMatchedPairs([...matchedPairs, id]);
      setSelectedItem(null);
      
      if (matchedPairs.length === 3) {
        setTimeout(() => setPhase('reflection'), 1500);
      }
    } else {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
        setSelectedItem(null);
      }, 500);
    }
  };

  const handleReflectionComplete = () => {
    completeChapter(4);
    setPhase('complete');
  };

  const handleEasterEggFind = () => {
    findEasterEgg(4);
    setShowEasterEgg(true);
  };

  const hasFoundEgg = easterEggsFound?.includes(4);

  return (
    <ChapterLayout
      chapterNumber={5}
      title="PROTOCOL_005"
      subtitle="PARADOX"
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
                  ☯️
                </motion.div>
                <h2 className="text-2xl md:text-3xl font-mono text-foreground">
                  <GlitchText text="PARADOX DETECTED" className="text-purple-400" glitchIntensity={0.3} />
                </h2>
                <p className="text-muted-foreground mt-2">
                  Opposites that shouldn't work. But do.
                </p>
              </div>

              <StorySection>
                <p className="text-foreground/90 text-lg leading-relaxed font-mono text-center">
                  On paper, you two make no sense.<br/>
                  He's logical, she's emotional.<br/>
                  He eats everything, she won't touch non-veg.<br/>
                  He's reserved, she expresses everything.<br/>
                  <span className="text-primary font-bold block mt-4">And yet... it's perfect.</span>
                </p>
              </StorySection>

              {/* Matching Game */}
              <div className="bg-card border border-purple-500/30 rounded-lg p-8">
                <div className="text-center mb-6">
                  <div className="text-3xl mb-4">🔗</div>
                  <h3 className="text-xl font-bold font-mono text-purple-400">MATCH THE PARADOXES</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Connect each of his traits to hers
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
                  {/* Left Column - ARGHA */}
                  <div className="space-y-3">
                    <div className="text-center text-xs font-mono text-blue-400 mb-2">ARGHA</div>
                    {paradoxPairs.map((pair) => (
                      <button
                        key={`left-${pair.id}`}
                        onClick={() => handleMatch('left', pair.id)}
                        disabled={matchedPairs.includes(pair.id)}
                        className={`w-full p-3 rounded-lg text-sm font-mono transition-all ${
                          matchedPairs.includes(pair.id)
                            ? 'bg-green-500/20 border-green-500 text-green-400'
                            : selectedItem?.id === pair.id && selectedItem?.side === 'left'
                            ? 'bg-primary/20 border-primary'
                            : 'bg-background border-border hover:border-blue-400'
                        } border`}
                      >
                        {pair.left}
                      </button>
                    ))}
                  </div>

                  {/* Middle - Connection */}
                  <div className="flex flex-col items-center justify-center">
                    <div className="text-4xl">↔️</div>
                    <div className="text-xs text-muted-foreground mt-2">
                      {matchedPairs.length}/4
                    </div>
                  </div>

                  {/* Right Column - SHIVANI */}
                  <div className="space-y-3">
                    <div className="text-center text-xs font-mono text-pink-400 mb-2">SHIVANI</div>
                    {paradoxPairs.map((pair) => (
                      <button
                        key={`right-${pair.id}`}
                        onClick={() => handleMatch('right', pair.id)}
                        disabled={matchedPairs.includes(pair.id)}
                        className={`w-full p-3 rounded-lg text-sm font-mono transition-all ${
                          matchedPairs.includes(pair.id)
                            ? 'bg-green-500/20 border-green-500 text-green-400'
                            : selectedItem?.id === pair.id && selectedItem?.side === 'right'
                            ? 'bg-primary/20 border-primary'
                            : 'bg-background border-border hover:border-pink-400'
                        } border`}
                      >
                        {pair.right}
                      </button>
                    ))}
                  </div>
                </div>

                {showError && (
                  <p className="text-center text-destructive text-sm mt-4">Wrong match. Try again.</p>
                )}

                {matchedPairs.length === 4 && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-green-400 font-mono mt-4"
                  >
                    ✓ PARADOX RESOLVED: Opposites attract
                  </motion.p>
                )}
              </div>

              {/* Hidden Easter Egg */}
              {!hasFoundEgg && (
                <div className="text-center">
                  <p className="text-xs text-muted-foreground/30 cursor-pointer hover:text-primary transition-colors" onClick={handleEasterEggFind}>
                    [HIDDEN_FRAGMENT_005]
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
                <h2 className="text-2xl font-bold font-mono text-foreground">REFLECTION_PROTOCOL</h2>
              </div>

              <div className="space-y-6 max-w-xl mx-auto">
                <div className="bg-card border border-border rounded-lg p-6">
                  <p className="text-foreground mb-4">
                    She's vegetarian, you're hardcore non-veg. How do you really feel about this difference?
                  </p>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      "It's never been an issue - we respect each other",
                      "It was weird at first but now it's just... us",
                      "Our differences make us stronger",
                      "Love doesn't care about food preferences"
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
              dayIndex={4}
              onContinue={() => navigate('/protocol-006')}
              nextDayName="PROTOCOL_006: ANCHOR"
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
                  <h3 className="text-lg font-bold text-primary mb-4">SECRET FRAGMENT #5</h3>
                  <div className="bg-background/50 rounded-lg p-4 mb-4">
                    <p className="text-foreground/80 font-serif italic text-sm leading-relaxed">
                      "Strong couples create things to look forward to.<br/>
                      Date nights. Slow mornings. Sunday walks.<br/>
                      When you build small rituals,<br/>
                      you build safety. You build love that lasts."
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    She dreams of building rituals with you.
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

export default Protocol005;
