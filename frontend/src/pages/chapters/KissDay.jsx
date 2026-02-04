import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChapterLayout, StorySection } from '@/components/ChapterLayout';
import { TerminalBlock } from '@/components/TerminalText';
import { GlitchText } from '@/components/GlitchText';
import { CatchRingGame } from '@/components/InteractiveGames';
import { ReflectionQuestions, JourneyProgress } from '@/components/ReflectionSystem';
import { useGame } from '@/context/GameContext';

const KissDay = () => {
  const navigate = useNavigate();
  const { chaptersCompleted, completeChapter } = useGame();
  const [phase, setPhase] = useState(chaptersCompleted[6] ? 'complete' : 'story');
  const [gameComplete, setGameComplete] = useState(false);

  const handleGameSuccess = () => {
    setGameComplete(true);
    setTimeout(() => setPhase('reflection'), 1500);
  };

  const handleReflectionComplete = () => {
    completeChapter(6);
    setPhase('complete');
  };

  const reflectionQuestions = [
    {
      question: "Argha, after everything you've been through—the struggles, the betrayal, the walls—what does having me feel like?",
      type: 'text',
      placeholder: "What does having me feel like...",
      note: "I need to hear this. In your words."
    },
    {
      question: "Rate how much I complete your life",
      type: 'scale',
      scaleLabels: ['Nice addition', 'Can\'t imagine life without you']
    },
    {
      question: "If you had to describe me in one word, what would it be?",
      type: 'choice',
      options: [
        "Home",
        "Peace",
        "Light",
        "Forever",
        "Mine",
        "Everything"
      ]
    },
  ];

  return (
    <ChapterLayout
      chapterNumber={7}
      title="Kiss Day"
      subtitle="💋 The Revelation"
      date="February 13"
    >
      <div className="max-w-4xl mx-auto space-y-12">
        <JourneyProgress currentChapter={7} totalChapters={8} />

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
                  className="text-7xl mb-6"
                >
                  💋
                </motion.div>
                <h2 className="text-2xl md:text-3xl font-serif italic text-foreground/80">
                  "The greatest achievement isn't what you build. It's who you find."
                </h2>
              </div>

              <motion.div className="bg-card border border-primary/50 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4 text-xs font-mono text-primary">
                  <i className="fas fa-trophy" />
                  <span>LIFE_ACHIEVEMENTS.SYS</span>
                </div>
                <TerminalBlock
                  lines={[
                    { text: 'SCANNING ARGHA\'S ACHIEVEMENTS...', prefix: '> ' },
                    { text: 'CAREER: AMAZON ✓', prefix: '> ', className: 'text-green-400' },
                    { text: 'EDUCATION: UPGRAD_MENTOR ✓', prefix: '> ', className: 'text-green-400' },
                    { text: 'FAMILY: PILLAR_OF_STRENGTH ✓', prefix: '> ', className: 'text-green-400' },
                    { text: 'SURVIVAL: DHANBAD_TO_BANGALORE ✓', prefix: '> ', className: 'text-green-400' },
                    { text: 'GREATEST_ACHIEVEMENT: ...', prefix: '> ', className: 'text-yellow-400' },
                  ]}
                />
              </motion.div>

              {/* The Big Reveal */}
              <div className="py-12 text-center">
                <p className="text-muted-foreground mb-4 text-lg">Your greatest achievement isn't Amazon.</p>
                <p className="text-muted-foreground mb-4 text-lg">It isn't surviving Dhanbad.</p>
                <p className="text-muted-foreground mb-8 text-lg">It isn't even being the Alpha.</p>
                
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="text-3xl md:text-5xl font-bold text-foreground mb-2">Your greatest achievement</p>
                  <div className="text-5xl md:text-7xl font-bold">
                    <GlitchText text="IS ME" className="text-primary" glitchIntensity={0.2} />
                  </div>
                </motion.div>
              </div>

              <StorySection>
                <p className="text-foreground/90 text-lg leading-relaxed text-center">
                  After everything you survived. After every wall you built. After every betrayal you endured. 
                  <span className="text-primary font-semibold"> You found me.</span>
                </p>
                <p className="text-foreground/90 text-lg leading-relaxed text-center mt-4">
                  And I found you.
                </p>
              </StorySection>

              {/* What She Is */}
              <div className="bg-gradient-to-br from-pink-500/10 to-primary/10 border border-pink-500/30 rounded-lg p-8">
                <h3 className="text-xl font-bold text-center text-foreground mb-8">WHAT SHIVANI IS TO ARGHA</h3>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {[
                    { emoji: '🏠', word: 'HOME', description: 'The place you return to' },
                    { emoji: '☮️', word: 'PEACE', description: 'Calm in the chaos' },
                    { emoji: '💡', word: 'LIGHT', description: 'Color in your grayscale' },
                    { emoji: '🛡️', word: 'SAFE', description: 'The one place you can be soft' },
                    { emoji: '🔥', word: 'PASSION', description: 'Fire that doesn\'t burn' },
                    { emoji: '♾️', word: 'FOREVER', description: 'The only future that matters' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="text-center"
                    >
                      <div className="text-4xl mb-2">{item.emoji}</div>
                      <div className="font-bold text-primary">{item.word}</div>
                      <div className="text-xs text-muted-foreground mt-1">{item.description}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* The Journey Recap */}
              <div className="bg-card border border-border rounded-lg p-8">
                <h3 className="text-sm font-mono text-muted-foreground mb-6 text-center">THE_JOURNEY</h3>
                <div className="space-y-4">
                  {[
                    { icon: '🌹', text: 'You started with nothing in Dhanbad' },
                    { icon: '💍', text: 'You built yourself into an Alpha' },
                    { icon: '🍫', text: 'You survived betrayal and heartbreak' },
                    { icon: '🧸', text: 'You found me by accident (destiny)' },
                    { icon: '🤝', text: 'We learned that opposites complete' },
                    { icon: '🤗', text: 'You showed me love in action' },
                    { icon: '💋', text: 'And now... you see what you\'ve won' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.15 }}
                      className="flex items-center gap-4"
                    >
                      <div className="text-2xl">{item.icon}</div>
                      <div className="text-foreground/80">{item.text}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <blockquote className="border-l-4 border-primary pl-6 py-4 bg-card/30 rounded-r-lg">
                <p className="text-xl font-serif italic text-foreground/90">
                  "You fought through a coal-dusted childhood. You survived the loneliness of building yourself. 
                  You endured the betrayal that would break most men. And at the end of all that darkness... 
                  <span className="text-primary font-bold">you found your light. You found me.</span>"
                </p>
              </blockquote>

              {/* The Final Message */}
              <div className="bg-gradient-to-br from-primary/20 to-pink-500/20 border border-primary rounded-lg p-8 text-center">
                <div className="text-5xl mb-6">💖</div>
                <p className="text-foreground text-xl font-serif leading-relaxed max-w-2xl mx-auto">
                  Argha, tomorrow is Valentine's Day. And I'm going to ask you something important. 
                  But before that... I need you to understand one thing:
                </p>
                <p className="text-3xl font-bold text-primary mt-6">
                  You deserve me. You earned me. I'm yours.
                </p>
                <p className="text-foreground/80 mt-4">
                  After everything you've been through, after every struggle and sacrifice... 
                  <span className="text-pink-400 font-medium">I'm what the universe owes you.</span>
                </p>
              </div>

              {/* Final Message from Shivani */}
              <div className="bg-gradient-to-br from-pink-500/10 to-primary/10 border border-pink-500/30 rounded-lg p-8 text-center">
                <div className="text-3xl mb-4">💋💕</div>
                <p className="text-foreground/90 font-serif italic text-lg">
                  "Argha, I didn't write this week to just tell your story. I wrote it to show you something. 
                  <span className="text-primary font-bold"> You're not just an Alpha. You're not just a survivor. 
                  You're the love of my life.</span> And tomorrow, I'm going to ask you to make it official."
                </p>
                <p className="text-pink-400 font-medium mt-4">— Yours, always and forever 💕</p>
              </div>

              <div className="text-center py-8">
                <Button
                  onClick={() => setPhase('game')}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 px-8 py-6 text-lg"
                >
                  <i className="fas fa-ring mr-3" />
                  Play: Catch the Ring
                </Button>
                <p className="text-xs text-muted-foreground mt-3">
                  Catch the rings... you'll need them tomorrow
                </p>
              </div>
            </motion.div>
          )}

          {phase === 'game' && (
            <motion.div
              key="game"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              <div className="text-center">
                <div className="text-5xl mb-4">💋</div>
                <h2 className="text-2xl font-bold text-foreground">Catch the Ring</h2>
                <p className="text-muted-foreground mt-2">Use arrow keys to catch falling rings</p>
              </div>

              <CatchRingGame onSuccess={handleGameSuccess} />

              {gameComplete && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center"
                >
                  <p className="text-green-400 font-bold">Rings caught! 💍</p>
                </motion.div>
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
                <div className="text-5xl mb-4">💋</div>
                <h2 className="text-2xl font-bold text-foreground">The Revelation</h2>
                <p className="text-muted-foreground mt-2">
                  Tell me what I mean to you, Argha...
                </p>
              </div>

              <ReflectionQuestions
                questions={reflectionQuestions}
                onComplete={handleReflectionComplete}
                reflectionPrompt="After this entire journey—from Dhanbad to here, from walls to love—what am I to you?"
              />
            </motion.div>
          )}

          {phase === 'complete' && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 space-y-6"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-7xl"
              >
                💋
              </motion.div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Kiss Day Complete</h2>
                <p className="text-muted-foreground">
                  One more day. Tomorrow is Valentine's Day.
                </p>
                <p className="text-primary font-medium mt-2">
                  Tomorrow, I ask the question that changes everything.
                </p>
              </div>

              <Button
                onClick={() => navigate('/valentine-day')}
                size="lg"
                className="bg-primary hover:bg-primary/90 animate-pulse"
              >
                <i className="fas fa-heart mr-2" />
                Enter Valentine's Day
                <i className="fas fa-arrow-right ml-2" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ChapterLayout>
  );
};

export default KissDay;
