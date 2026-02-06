import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChapterLayout } from '@/components/ChapterLayout';
import { GlitchText } from '@/components/GlitchText';
import { useGame } from '@/context/GameContext';

const ProtocolFinal = () => {
  const navigate = useNavigate();
  const { completeChapter, saveReflectionAnswer, findEasterEgg, easterEggsFound } = useGame();
  const [phase, setPhase] = useState('intro');
  const [choice, setChoice] = useState(null);
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  const handleChoice = (selectedChoice) => {
    setChoice(selectedChoice);
    saveReflectionAnswer('final_choice', selectedChoice);
    completeChapter(7);
    setPhase('response');
  };

  const handleEasterEggFind = () => {
    findEasterEgg(7);
    setShowEasterEgg(true);
  };

  const hasFoundEgg = easterEggsFound?.includes(7);
  const totalEggs = easterEggsFound?.length || 0;

  return (
    <ChapterLayout
      chapterNumber={8}
      title="PROTOCOL_FINAL"
      subtitle="CHOICE"
      date="FEBRUARY 14, 2025"
    >
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {phase === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-12 py-12"
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', duration: 1 }}
                  className="text-8xl mb-8"
                >
                  ❤️
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 font-mono">
                    <GlitchText text="FINAL PROTOCOL" className="text-primary" glitchIntensity={0.2} />
                  </h1>
                  <p className="text-xl text-muted-foreground">Valentine's Day 2025</p>
                </motion.div>
              </div>

              {/* Secrets Found Counter */}
              <div className="bg-card border border-primary/30 rounded-lg p-6 max-w-md mx-auto">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-mono text-muted-foreground">SECRETS DISCOVERED</span>
                  <span className="text-lg font-bold text-primary">{totalEggs}/8</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full mt-2 overflow-hidden">
                  <motion.div 
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${(totalEggs / 8) * 100}%` }}
                  />
                </div>
                {totalEggs === 8 && (
                  <p className="text-xs text-green-400 mt-2 text-center">
                    ✓ All secrets found! You truly paid attention.
                  </p>
                )}
              </div>

              {/* Journey Recap */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="bg-card/50 border border-border rounded-lg p-8"
              >
                <div className="text-center space-y-3 text-foreground/80 font-mono text-sm">
                  <p>PROTOCOL_001: <span className="text-primary">ORIGIN</span> - Dhanbad, dreams, determination</p>
                  <p>PROTOCOL_002: <span className="text-yellow-400">ASCENSION</span> - The Alpha rose</p>
                  <p>PROTOCOL_003: <span className="text-orange-500">FRACTURE</span> - Betrayal, walls built</p>
                  <p>PROTOCOL_004: <span className="text-green-400">GLITCH</span> - Wrong number, right call</p>
                  <p>PROTOCOL_005: <span className="text-purple-400">PARADOX</span> - Opposites collided</p>
                  <p>PROTOCOL_006: <span className="text-blue-400">ANCHOR</span> - You held her steady</p>
                  <p>PROTOCOL_007: <span className="text-pink-400">REVELATION</span> - She is the answer</p>
                  <p className="text-xl pt-4 text-foreground font-bold">
                    PROTOCOL_FINAL: <span className="text-primary">?????</span>
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="text-center"
              >
                <Button
                  onClick={() => setPhase('letter')}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 px-8 py-6 text-lg"
                >
                  <i className="fas fa-envelope mr-3" />
                  DECRYPT FINAL MESSAGE
                </Button>
              </motion.div>

              {/* Hidden Easter Egg */}
              {!hasFoundEgg && (
                <div className="text-center">
                  <p className="text-xs text-muted-foreground/30 cursor-pointer hover:text-primary transition-colors" onClick={handleEasterEggFind}>
                    [HIDDEN_FRAGMENT_FINAL]
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {phase === 'letter' && (
            <motion.div
              key="letter"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8 py-12"
            >
              <div className="bg-gradient-to-br from-pink-500/5 to-primary/5 border border-pink-500/30 rounded-lg p-8 md:p-12">
                <div className="max-w-2xl mx-auto space-y-6 font-serif">
                  <div className="text-right text-sm text-muted-foreground mb-8 font-mono">
                    14.02.2025 • DECRYPTED
                  </div>

                  <p className="text-xl text-foreground leading-relaxed">
                    Argha,
                  </p>

                  <p className="text-foreground/90 leading-relaxed">
                    You just completed 7 protocols. 7 chapters of your life, seen through my eyes.
                    And if you found the hidden fragments, you also saw glimpses of my heart.
                  </p>

                  <p className="text-foreground/90 leading-relaxed">
                    I see a boy from Dhanbad who became an <span className="text-primary">Alpha</span>.
                    I see a man who was <span className="text-orange-500">betrayed</span> but didn't break.
                    I see the famous UpGrad guy who called the <span className="text-green-400">wrong number</span>.
                    I see someone who celebrates <span className="text-blue-400">Diwali with me</span> instead of going home.
                  </p>

                  <p className="text-foreground/90 leading-relaxed">
                    You think you're logical. You think you're not romantic.
                    <span className="text-primary font-bold"> You're wrong.</span>
                  </p>

                  <p className="text-foreground/90 leading-relaxed">
                    Every time you drove to see me. Every movie you watched because I wanted to.
                    Every time you held me when I was breaking. That birthday when my world was falling apart.
                    <span className="text-primary"> That is romance. That is love. That is you.</span>
                  </p>

                  <p className="text-foreground/90 leading-relaxed">
                    You proposed on <span className="text-primary font-bold">14th May 2024</span>.
                    Now it's my turn.
                  </p>

                  <div className="py-6 text-center">
                    <p className="text-xl text-foreground font-bold">
                      So here I am, on Valentine's Day 2025, asking you one question:
                    </p>
                  </div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center"
              >
                <Button
                  onClick={() => setPhase('question')}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 px-8 py-6 text-lg animate-pulse"
                >
                  SEE THE QUESTION
                  <i className="fas fa-heart ml-3" />
                </Button>
              </motion.div>
            </motion.div>
          )}

          {phase === 'question' && (
            <motion.div
              key="question"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-[80vh] flex flex-col items-center justify-center space-y-12 py-12"
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', duration: 1 }}
                className="text-center space-y-8"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-8xl"
                >
                  💍
                </motion.div>

                <h2 className="text-3xl md:text-4xl font-bold text-foreground font-mono">
                  Argha...
                </h2>

                <div className="text-4xl md:text-6xl font-bold">
                  <GlitchText 
                    text="Will you be mine forever?" 
                    className="text-primary" 
                    glitchIntensity={0.15} 
                  />
                </div>

                <p className="text-xl text-muted-foreground font-serif italic">
                  — Your "Wrong" Shivani 💕
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="flex flex-col items-center"
              >
                <Button
                  onClick={() => handleChoice('yes')}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 px-12 py-8 text-xl group"
                  data-testid="yes-forever-btn"
                >
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    className="flex items-center gap-3"
                  >
                    <i className="fas fa-heart" />
                    Yes, Forever
                    <i className="fas fa-ring" />
                  </motion.span>
                </Button>
              </motion.div>

              <p className="text-xs text-muted-foreground/50 font-mono">
                There is only one answer. There was always only one answer.
              </p>
            </motion.div>
          )}

          {phase === 'response' && (
            <motion.div
              key="response"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="min-h-[80vh] flex flex-col items-center justify-center py-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', duration: 1 }}
                className="text-center space-y-8"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ duration: 2, repeat: 3 }}
                  className="text-9xl"
                >
                  💍❤️💍
                </motion.div>

                <h1 className="text-4xl md:text-6xl font-bold text-primary font-mono">
                  YES!
                </h1>

                <div className="max-w-xl mx-auto space-y-6">
                  <p className="text-2xl text-foreground font-serif">
                    You said yes.
                  </p>
                  <p className="text-xl text-foreground/80 leading-relaxed">
                    From a wrong number to forever. From Dhanbad to our future.
                    From Alpha to mine. From protocols to promises.
                  </p>
                  <p className="text-primary text-2xl font-bold">
                    I love you, Argha. Forever.
                  </p>
                </div>

                {/* Couple Photo */}
                <div className="bg-card border border-primary rounded-lg p-4 max-w-md mx-auto">
                  <img 
                    src="https://customer-assets.emergentagent.com/job_ab423600-82ad-4e17-8af4-9ccff7b6ecd6/artifacts/2k4adqyb_FullSizeRender.jpeg"
                    alt="Us"
                    className="rounded-lg w-full"
                  />
                  <p className="text-sm text-muted-foreground mt-2 italic">
                    The beginning of forever. 💕
                  </p>
                </div>

                <div className="bg-gradient-to-br from-pink-500/20 to-primary/20 border border-primary rounded-lg p-8 mt-8">
                  <p className="text-foreground font-serif italic text-lg">
                    "The boy from Dhanbad found his greatest achievement—
                    not Amazon, not success, but love. <span className="text-primary font-bold">He found me. And I found him.</span>"
                  </p>
                  <p className="text-pink-400 font-medium mt-4">
                    — Your forever Shivani 💍
                  </p>
                </div>

                <div className="pt-8 space-y-4">
                  <p className="text-sm text-muted-foreground font-mono">
                    PROTOCOL_VALENTINE: COMPLETE • ALL 8 CHAPTERS UNLOCKED
                  </p>
                  <p className="text-sm text-primary">
                    <i className="fas fa-gem mr-2" />
                    {totalEggs}/8 Secret Fragments Discovered
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                      onClick={() => navigate('/journey-stats')}
                      size="lg"
                      className="bg-primary hover:bg-primary/90"
                      data-testid="view-journey-stats-btn"
                    >
                      <i className="fas fa-chart-line mr-2" />
                      View Journey Stats
                    </Button>
                    <Button
                      onClick={() => navigate('/chapters')}
                      variant="outline"
                      size="lg"
                      data-testid="revisit-story-btn"
                    >
                      <i className="fas fa-book mr-2" />
                      Revisit Our Story
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
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
                  <h3 className="text-lg font-bold text-primary mb-4">FINAL SECRET FRAGMENT</h3>
                  <div className="bg-background/50 rounded-lg p-4 mb-4">
                    <p className="text-foreground/80 font-serif italic text-sm leading-relaxed">
                      "Close your eyes and think of me,<br/>
                      Close your eyes and try to see,<br/>
                      Our hearts together and what could be,<br/>
                      Our love forever as destiny.<br/><br/>
                      Because my biggest fear was giving all my love<br/>
                      To someone who doesn't know what to do with it.<br/>
                      <span className="text-primary font-bold">But you do. You always did.</span>"
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    You found all the pieces of her heart. Now keep them safe forever.
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

export default ProtocolFinal;
