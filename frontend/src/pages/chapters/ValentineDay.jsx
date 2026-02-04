import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChapterLayout } from '@/components/ChapterLayout';
import { GlitchText } from '@/components/GlitchText';
import { useGame } from '@/context/GameContext';

const ValentineDay = () => {
  const navigate = useNavigate();
  const { completeChapter, saveReflectionAnswer } = useGame();
  const [phase, setPhase] = useState('intro');
  const [choice, setChoice] = useState(null);

  const handleChoice = (selectedChoice) => {
    setChoice(selectedChoice);
    saveReflectionAnswer('final_choice', selectedChoice);
    completeChapter(7);
    setPhase('response');
  };

  return (
    <ChapterLayout
      chapterNumber={8}
      title="Valentine's Day"
      subtitle="❤️ The Final Choice"
      date="February 14"
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
              {/* Opening Animation */}
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
                  <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    <GlitchText text="THE FINAL CHAPTER" className="text-primary" glitchIntensity={0.2} />
                  </h1>
                  <p className="text-xl text-muted-foreground">February 14, 2025</p>
                </motion.div>
              </div>

              {/* The Journey Recap */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="bg-card/50 border border-border rounded-lg p-8"
              >
                <div className="text-center space-y-4 text-foreground/80">
                  <p>You started in <span className="text-primary">Dhanbad</span>, with nothing but dreams and determination.</p>
                  <p>You built yourself into an <span className="text-yellow-400">Alpha</span>.</p>
                  <p>You survived <span className="text-destructive">betrayal</span> that would break most men.</p>
                  <p>You found me by <span className="text-primary">accident</span>... or was it destiny?</p>
                  <p>We discovered that <span className="text-purple-400">opposites</span> truly attract.</p>
                  <p>You showed me <span className="text-pink-400">love</span> in ways words can't describe.</p>
                  <p className="text-xl font-bold text-foreground pt-4">
                    And now, after all of that... we're here.
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
                  Read My Letter
                  <i className="fas fa-envelope ml-3" />
                </Button>
              </motion.div>
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
              {/* The Letter */}
              <div className="bg-gradient-to-br from-pink-500/5 to-primary/5 border border-pink-500/30 rounded-lg p-8 md:p-12">
                <div className="max-w-2xl mx-auto space-y-6 font-serif">
                  <div className="text-right text-sm text-muted-foreground mb-8">
                    February 14, 2025
                  </div>

                  <p className="text-xl text-foreground leading-relaxed">
                    Dear Argha,
                  </p>

                  <p className="text-foreground/90 leading-relaxed">
                    I've spent the last 7 days showing you your own story. Not because you needed to remember—
                    you never forget. But because I needed you to <span className="text-primary">see</span> it 
                    the way I see it.
                  </p>

                  <p className="text-foreground/90 leading-relaxed">
                    I see a boy from Dhanbad who refused to be ordinary. A man who coded for 18 hours a day 
                    because failure wasn't an option. An Alpha who built walls so high that no one could hurt 
                    him again.
                  </p>

                  <p className="text-foreground/90 leading-relaxed">
                    And then... a wrong number. A glitch in the system. A Shivani who wasn't the Shivani you 
                    called for.
                  </p>

                  <p className="text-foreground/90 leading-relaxed">
                    You could have hung up. You could have stayed behind your walls. But you didn't.
                    <span className="text-primary font-medium"> You let me in.</span>
                  </p>

                  <p className="text-foreground/90 leading-relaxed">
                    You celebrated my birthday when I was broken. You chose Diwali with me over going home. 
                    You respected my pure veg life even though you're hardcore non-veg. You watch movies with me, 
                    drive for hours, and show up—<span className="text-primary">every single time</span>.
                  </p>

                  <p className="text-foreground/90 leading-relaxed">
                    You think you're not romantic. You're wrong. You're the most romantic man I know—
                    you just show it differently. In actions. In presence. In quiet, consistent devotion.
                  </p>

                  <p className="text-foreground/90 leading-relaxed text-lg">
                    Argha, you've spent your whole life building things. Building yourself. Building your career. 
                    Building your strength.
                  </p>

                  <p className="text-xl font-bold text-primary text-center py-4">
                    Now I'm asking you to build something with me.
                  </p>

                  <p className="text-foreground/90 leading-relaxed">
                    I'm emotional and you're logical. I'm veg and you're not. I'm from Indore and you're from 
                    Dhanbad. None of that matters. What matters is that when I'm with you, I feel 
                    <span className="text-pink-400"> safe</span>. I feel <span className="text-pink-400">seen</span>. 
                    I feel <span className="text-pink-400">home</span>.
                  </p>

                  <p className="text-foreground/90 leading-relaxed">
                    You once promised you'd always be there for me. You said you'd be there even during my 
                    hardest times. And you were. You never thought you'd fall for me.
                  </p>

                  <p className="text-xl text-primary font-medium text-center">
                    But you did. And I fell for you.
                  </p>

                  <div className="pt-8 border-t border-border/50 mt-8">
                    <p className="text-foreground leading-relaxed text-center text-xl">
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
                  See The Question
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
              {/* The Big Question */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', duration: 1 }}
                className="text-center space-y-8"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-8xl"
                >
                  💍
                </motion.div>

                <h2 className="text-3xl md:text-5xl font-bold text-foreground">
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
                  — Shivani 💕
                </p>
              </motion.div>

              {/* The Choice */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="flex flex-col md:flex-row gap-6"
              >
                <Button
                  onClick={() => handleChoice('yes')}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 px-12 py-8 text-xl group"
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

                <Button
                  onClick={() => handleChoice('not_yet')}
                  size="lg"
                  variant="outline"
                  className="px-12 py-8 text-xl border-muted-foreground/30 hover:border-primary/50"
                >
                  I need more time...
                </Button>
              </motion.div>

              <p className="text-xs text-muted-foreground/50">
                This choice is recorded. Choose wisely. 💕
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
              {choice === 'yes' ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', duration: 1 }}
                  className="text-center space-y-8"
                >
                  {/* Celebration */}
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

                  <h1 className="text-4xl md:text-6xl font-bold text-primary">
                    YES!
                  </h1>

                  <div className="max-w-xl mx-auto space-y-6">
                    <p className="text-2xl text-foreground font-serif">
                      You said yes.
                    </p>
                    <p className="text-xl text-foreground/80 leading-relaxed">
                      Argha, you just made me the happiest person in the world. 
                      From a wrong number to forever. From Dhanbad to our future. 
                      From Alpha to mine.
                    </p>
                    <p className="text-primary text-2xl font-bold">
                      I love you. Forever.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-pink-500/20 to-primary/20 border border-primary rounded-lg p-8 mt-8">
                    <p className="text-foreground font-serif italic text-lg">
                      "The boy from Dhanbad who built himself from nothing found his greatest 
                      achievement at the end of the journey—not a company, not success, but love. 
                      <span className="text-primary font-bold"> You found me. And I found you.</span>"
                    </p>
                    <p className="text-pink-400 font-medium mt-4">
                      — Your forever Shivani 💕💍
                    </p>
                  </div>

                  <div className="pt-8 space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Valentine's Week Complete • All 8 Chapters Unlocked
                    </p>
                    <Button
                      onClick={() => navigate('/chapters')}
                      variant="outline"
                      size="lg"
                    >
                      <i className="fas fa-book mr-2" />
                      Revisit Our Story
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center space-y-8 max-w-xl mx-auto"
                >
                  <div className="text-6xl">💭</div>
                  
                  <h2 className="text-2xl font-bold text-foreground">
                    I understand.
                  </h2>
                  
                  <p className="text-foreground/80 leading-relaxed">
                    Love isn't something to rush. Take your time, Argha. 
                    I'll be here when you're ready. That's what forever means—
                    <span className="text-primary"> waiting without conditions</span>.
                  </p>
                  
                  <p className="text-muted-foreground font-serif italic">
                    "The Alpha doesn't make decisions under pressure. He makes them when he's certain. 
                    And I love that about you."
                  </p>

                  <div className="pt-8">
                    <Button
                      onClick={() => navigate('/chapters')}
                      variant="outline"
                      size="lg"
                    >
                      <i className="fas fa-arrow-left mr-2" />
                      Back to Our Story
                    </Button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ChapterLayout>
  );
};

export default ValentineDay;
