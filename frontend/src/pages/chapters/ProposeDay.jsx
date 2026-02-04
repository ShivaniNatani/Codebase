import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChapterLayout, StorySection } from '@/components/ChapterLayout';
import { TerminalBlock } from '@/components/TerminalText';
import { CodeChallengeGame } from '@/components/InteractiveGames';
import { ReflectionQuestions, JourneyProgress } from '@/components/ReflectionSystem';
import { useGame } from '@/context/GameContext';

const ProposeDay = () => {
  const navigate = useNavigate();
  const { chaptersCompleted, completeChapter } = useGame();
  const [phase, setPhase] = useState(chaptersCompleted[1] ? 'complete' : 'story');
  const [gameComplete, setGameComplete] = useState(false);

  const handleGameSuccess = () => {
    setGameComplete(true);
    setTimeout(() => setPhase('reflection'), 1500);
  };

  const handleReflectionComplete = () => {
    completeChapter(1);
    setPhase('complete');
  };

  const reflectionQuestions = [
    {
      question: "That spontaneous Amazon interview - what gave you the courage to just walk in?",
      type: 'choice',
      options: [
        "I had nothing to lose",
        "I knew my skills were solid",
        "Desperation fueled by determination",
        "Something inside me said 'now or never'"
      ]
    },
    {
      question: "Rate how important your career success is to your identity",
      type: 'scale',
      scaleLabels: ['One part of me', 'Core of who I am']
    },
    {
      question: "Argha, what does being an 'Alpha' really mean to you?",
      type: 'text',
      placeholder: "What does it mean to lead, to provide, to protect...",
      note: "I want to understand how you see yourself."
    },
  ];

  return (
    <ChapterLayout
      chapterNumber={2}
      title="Propose Day"
      subtitle="💍 The Alpha Rises"
      date="February 8"
    >
      <div className="max-w-4xl mx-auto space-y-12">
        <JourneyProgress currentChapter={2} totalChapters={8} />

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
                  💍
                </motion.div>
                <h2 className="text-2xl md:text-3xl font-serif italic text-foreground/80">
                  "An Alpha isn't born. He's forged."
                </h2>
              </div>

              <motion.div className="bg-card border border-yellow-500/30 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4 text-xs font-mono text-yellow-400">
                  <i className="fas fa-crown" />
                  <span>ALPHA_PROFILE.SYS</span>
                </div>
                <TerminalBlock
                  lines={[
                    { text: 'DHANBAD → BANGALORE', prefix: '> ', className: 'text-primary' },
                    { text: 'DISTANCE: 1,900 KM', prefix: '> ' },
                    { text: 'SUPPORT_SYSTEM: SELF', prefix: '> ', className: 'text-yellow-400' },
                    { text: 'CODING_HOURS_DAILY: 18+', prefix: '> ' },
                    { text: 'AMAZON_INTERVIEW: OFFLINE_SPONTANEOUS', prefix: '> ', className: 'text-green-400' },
                    { text: 'RESULT: HIRED', prefix: '> ', className: 'text-green-400' },
                  ]}
                />
              </motion.div>

              <StorySection>
                <p className="text-foreground/90 text-lg leading-relaxed">
                  The boy from Dhanbad didn't just move to Bangalore. He 
                  <span className="text-primary font-semibold"> conquered</span> it. 
                  1,900 kilometers from home, with minimal support, he chose to become 
                  <span className="text-yellow-400 font-bold"> unstoppable</span>.
                </p>
              </StorySection>

              {/* The Amazon Story */}
              <div className="bg-gradient-to-br from-card to-card/50 border border-primary/30 rounded-lg p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-lg bg-primary/20 flex items-center justify-center">
                    <i className="fab fa-amazon text-4xl text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-foreground">The Interview</h3>
                    <p className="text-sm text-muted-foreground">SPONTANEOUS • OFFLINE • LEGENDARY</p>
                  </div>
                </div>
                <p className="text-foreground/90 leading-relaxed">
                  Most people prepare for months. Argha walked in with just his skills and walked out employed. 
                  That's not luck—that's <span className="text-primary font-semibold">years of preparation meeting opportunity</span>.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { emoji: '💻', value: '18+', label: 'Hours/Day Coding' },
                  { emoji: '🎯', value: '1', label: 'Shot. Hired.' },
                  { emoji: '📈', value: 'UpGrad', label: 'Alumni Mentor' },
                  { emoji: '👑', value: 'Alpha', label: 'Status' },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-card border border-border rounded-lg p-4 text-center"
                  >
                    <div className="text-2xl mb-2">{stat.emoji}</div>
                    <div className="text-xl font-bold text-primary">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              <StorySection>
                <p className="text-foreground/90 text-lg leading-relaxed">
                  While others were partying, he was coding. While others complained about being alone, 
                  he was <span className="text-primary font-semibold">building</span>. The lone wolf phase 
                  wasn't loneliness—it was <span className="text-yellow-400">strategy</span>.
                </p>
              </StorySection>

              {/* The UpGrad Connection */}
              <div className="bg-card/50 border border-blue-500/20 rounded-lg p-6">
                <h3 className="text-sm font-mono text-blue-400 mb-4 flex items-center gap-2">
                  <i className="fas fa-graduation-cap" />
                  THE MENTOR
                </h3>
                <p className="text-foreground/80 leading-relaxed">
                  He didn't just succeed—he gave back. As an UpGrad alumni taking sessions, 
                  Argha helped others climb the same ladder he conquered. 
                </p>
                <p className="text-primary mt-4 font-medium italic">
                  Little did he know, one of those sessions would lead to something far greater than career advice...
                </p>
              </div>

              <blockquote className="border-l-4 border-yellow-500 pl-6 py-4 bg-card/30 rounded-r-lg">
                <p className="text-xl font-serif italic text-foreground/90">
                  "The Alpha doesn't ask for permission. He doesn't wait for validation. 
                  He decides what he wants and then becomes the kind of man who gets it."
                </p>
              </blockquote>

              {/* Message from Shivani */}
              <div className="bg-gradient-to-br from-pink-500/10 to-primary/10 border border-pink-500/30 rounded-lg p-8 text-center">
                <div className="text-3xl mb-4">💕</div>
                <p className="text-foreground/90 font-serif italic text-lg">
                  "Argha, when I see your drive, your ambition, your refusal to settle—I understand 
                  why you are who you are. But here's what you might not know: the same strength 
                  that built your career? It's the same strength that makes me feel safe with you."
                </p>
                <p className="text-primary font-medium mt-4">— Your biggest fan 💕</p>
              </div>

              <div className="text-center py-8">
                <Button
                  onClick={() => setPhase('game')}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 px-8 py-6 text-lg"
                >
                  <i className="fas fa-code mr-3" />
                  Play: Code Challenge
                </Button>
                <p className="text-xs text-muted-foreground mt-3">
                  Find the bugs like you did in that interview
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
                <div className="text-5xl mb-4">💍</div>
                <h2 className="text-2xl font-bold text-foreground">Code Challenge</h2>
                <p className="text-muted-foreground mt-2">Find the bug in each snippet</p>
              </div>

              <CodeChallengeGame onSuccess={handleGameSuccess} />

              {gameComplete && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center"
                >
                  <p className="text-green-400 font-bold">Interview passed! 💍</p>
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
                <div className="text-5xl mb-4">💍</div>
                <h2 className="text-2xl font-bold text-foreground">The Alpha Reflects</h2>
                <p className="text-muted-foreground mt-2">
                  You built an empire. Now tell me how...
                </p>
              </div>

              <ReflectionQuestions
                questions={reflectionQuestions}
                onComplete={handleReflectionComplete}
                reflectionPrompt="The world sees your success. I want to understand the fire behind it."
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
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: 2 }}
                className="text-7xl"
              >
                💍
              </motion.div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Propose Day Complete</h2>
                <p className="text-muted-foreground">
                  The Alpha has risen. But tomorrow brings the bitter truth...
                </p>
              </div>

              <Button
                onClick={() => navigate('/chocolate-day')}
                size="lg"
                className="bg-primary hover:bg-primary/90"
              >
                Continue to Chocolate Day
                <i className="fas fa-arrow-right ml-2" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ChapterLayout>
  );
};

export default ProposeDay;
