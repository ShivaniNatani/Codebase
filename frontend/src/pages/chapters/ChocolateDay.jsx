import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChapterLayout, StorySection } from '@/components/ChapterLayout';
import { TerminalBlock } from '@/components/TerminalText';
import { GlitchText } from '@/components/GlitchText';
import { ShieldDefenseGame } from '@/components/InteractiveGames';
import { ReflectionQuestions, JourneyProgress } from '@/components/ReflectionSystem';
import { useGame } from '@/context/GameContext';

const ChocolateDay = () => {
  const navigate = useNavigate();
  const { chaptersCompleted, completeChapter } = useGame();
  const [phase, setPhase] = useState(chaptersCompleted[2] ? 'complete' : 'story');
  const [gameComplete, setGameComplete] = useState(false);

  const handleGameSuccess = () => {
    setGameComplete(true);
    setTimeout(() => setPhase('reflection'), 1500);
  };

  const handleReflectionComplete = () => {
    completeChapter(2);
    setPhase('complete');
  };

  const reflectionQuestions = [
    {
      question: "After the betrayal, what did you tell yourself to keep going?",
      type: 'text',
      placeholder: "What got you through...",
    },
    {
      question: "Rate how much that experience changed your ability to trust",
      type: 'scale',
      scaleLabels: ['Barely affected', 'Built walls around my heart']
    },
    {
      question: "When you first started talking to me, were those walls still up?",
      type: 'choice',
      options: [
        "Yes - I was cautious about everyone",
        "Mostly - but something felt different",
        "I tried to keep them up but you got through",
        "Honestly, I didn't even realize they were there"
      ],
      note: "I need to know what I was up against 💕"
    },
  ];

  return (
    <ChapterLayout
      chapterNumber={3}
      title="Chocolate Day"
      subtitle="🍫 Bitter & Sweet"
      date="February 9"
    >
      <div className="max-w-4xl mx-auto space-y-12">
        <JourneyProgress currentChapter={3} totalChapters={8} />

        <AnimatePresence mode="wait">
          {phase === 'story' && (
            <motion.div
              key="story"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-12"
            >
              {/* Warning */}
              <div className="text-center py-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded bg-destructive/10 border border-destructive/30">
                  <i className="fas fa-exclamation-triangle text-destructive" />
                  <span className="text-sm font-mono text-destructive">SENSITIVE_MEMORY</span>
                </div>
              </div>

              {/* Opening */}
              <div className="text-center py-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-7xl mb-6"
                >
                  🍫
                </motion.div>
                <h2 className="text-2xl md:text-3xl font-serif italic text-foreground/80">
                  "Like chocolate, love can be bitter before it becomes sweet"
                </h2>
              </div>

              <motion.div className="bg-card border border-destructive/30 rounded-lg p-6">
                <TerminalBlock
                  lines={[
                    { text: 'RELATIONSHIP_LOG: FIRST_LOVE', prefix: '> ' },
                    { text: 'DAILY_COMMUTE: 30-35 KM (ONE WAY)', prefix: '> ', className: 'text-yellow-400' },
                    { text: 'ACTIVITY: TEACHING_HER_JAVA', prefix: '> ' },
                    { text: 'HER_RESULT: TOP_PERFORMER', prefix: '> ', className: 'text-green-400' },
                    { text: 'HIS_INVESTMENT: EVERYTHING', prefix: '> ', className: 'text-primary' },
                    { text: 'OUTCOME: BETRAYAL', prefix: '> ', className: 'text-destructive' },
                  ]}
                />
              </motion.div>

              <StorySection>
                <p className="text-foreground/90 text-lg leading-relaxed">
                  First love doesn't come with warnings. Argha loved the way he does everything—
                  <span className="text-primary font-semibold">completely, devotedly, unconditionally</span>.
                </p>
                <p className="text-foreground/90 text-lg leading-relaxed mt-4">
                  <span className="text-yellow-400 font-bold">30-35 kilometers. Every single day.</span> 
                  That wasn't just commuting. That was a man showing up when showing up was hard.
                </p>
              </StorySection>

              {/* The Sacrifice */}
              <div className="bg-card/50 border border-primary/20 rounded-lg p-8">
                <h3 className="text-sm font-mono text-primary mb-6">WHAT HE GAVE</h3>
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-primary">30-35</div>
                    <div className="text-xs text-muted-foreground">KM DAILY</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-foreground">2+</div>
                    <div className="text-xs text-muted-foreground">HOURS TRAVEL</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-foreground">100%</div>
                    <div className="text-xs text-muted-foreground">OF HIMSELF</div>
                  </div>
                </div>
              </div>

              <StorySection>
                <p className="text-foreground/90 text-lg leading-relaxed">
                  He taught her Java. Every concept. Every bug. Every late-night doubt. 
                  His knowledge became her weapon. She topped her exams.
                </p>
                <p className="text-muted-foreground text-lg mt-4 font-serif italic">
                  And then she used that success to walk away. To someone else.
                </p>
              </StorySection>

              {/* The Break */}
              <div className="py-12 text-center">
                <div className="text-6xl md:text-8xl font-bold">
                  <GlitchText text="BETRAYAL" className="text-destructive" glitchIntensity={0.4} />
                </div>
              </div>

              {/* Transformation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card border border-destructive/30 rounded-lg p-6">
                  <h4 className="text-sm font-mono text-destructive mb-4">BEFORE</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><i className="fas fa-heart text-destructive/50 mr-2" />Open, trusting</li>
                    <li><i className="fas fa-hand-holding-heart text-destructive/50 mr-2" />Gave without limits</li>
                    <li><i className="fas fa-eye text-destructive/50 mr-2" />Saw the best in people</li>
                  </ul>
                </div>
                <div className="bg-card border border-primary/30 rounded-lg p-6">
                  <h4 className="text-sm font-mono text-primary mb-4">AFTER</h4>
                  <ul className="space-y-2 text-sm text-foreground">
                    <li><i className="fas fa-shield-alt text-primary mr-2" />Emotionally armored</li>
                    <li><i className="fas fa-balance-scale text-primary mr-2" />Trust is earned</li>
                    <li><i className="fas fa-brain text-primary mr-2" />Patterns recognized</li>
                  </ul>
                </div>
              </div>

              <blockquote className="border-l-4 border-amber-600 pl-6 py-4 bg-card/30 rounded-r-lg">
                <p className="text-xl font-serif italic text-foreground/90">
                  "The armor wasn't coldness. It was protection. The man who emerged wasn't 
                  broken—he was <span className="text-primary">refined</span>."
                </p>
              </blockquote>

              {/* Message from Shivani */}
              <div className="bg-gradient-to-br from-pink-500/10 to-primary/10 border border-pink-500/30 rounded-lg p-8 text-center">
                <div className="text-3xl mb-4">💕</div>
                <p className="text-foreground/90 font-serif italic text-lg">
                  "Argha, I know this chapter hurts. I know you don't like talking about it. 
                  But I need you to understand something: <span className="text-primary font-bold">she didn't deserve you</span>. 
                  And I'm grateful every day that her loss became my gain."
                </p>
                <p className="text-pink-400 font-medium mt-4">
                  The walls you built? I've been slowly taking them down. Brick by brick. 💕
                </p>
              </div>

              <div className="text-center py-8">
                <Button
                  onClick={() => setPhase('game')}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 px-8 py-6 text-lg"
                >
                  <i className="fas fa-shield-alt mr-3" />
                  Play: Shield Defense
                </Button>
                <p className="text-xs text-muted-foreground mt-3">
                  Defend your heart. Block the attacks.
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
                <div className="text-5xl mb-4">🍫</div>
                <h2 className="text-2xl font-bold text-foreground">Shield Defense</h2>
                <p className="text-muted-foreground mt-2">Move mouse to block incoming attacks</p>
              </div>

              <ShieldDefenseGame onSuccess={handleGameSuccess} />

              {gameComplete && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center"
                >
                  <p className="text-green-400 font-bold">Armor forged! 🛡️</p>
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
                <div className="text-5xl mb-4">🍫</div>
                <h2 className="text-2xl font-bold text-foreground">The Bitter Truth</h2>
                <p className="text-muted-foreground mt-2">
                  Let's talk about what she did and what I'm undoing...
                </p>
              </div>

              <ReflectionQuestions
                questions={reflectionQuestions}
                onComplete={handleReflectionComplete}
                reflectionPrompt="This isn't about reopening wounds. It's about showing you that I understand what you went through. And that I'm different."
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
                🍫
              </motion.div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Chocolate Day Complete</h2>
                <p className="text-muted-foreground">
                  The bitter is behind you. Tomorrow brings the sweetest glitch...
                </p>
              </div>

              <Button
                onClick={() => navigate('/teddy-day')}
                size="lg"
                className="bg-primary hover:bg-primary/90"
              >
                Continue to Teddy Day
                <i className="fas fa-arrow-right ml-2" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ChapterLayout>
  );
};

export default ChocolateDay;
