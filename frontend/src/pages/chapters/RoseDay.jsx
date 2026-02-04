import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChapterLayout, StorySection } from '@/components/ChapterLayout';
import { TerminalBlock } from '@/components/TerminalText';
import { MemoryMatchGame } from '@/components/InteractiveGames';
import { ReflectionQuestions, JourneyProgress } from '@/components/ReflectionSystem';
import { useGame } from '@/context/GameContext';

const RoseDay = () => {
  const navigate = useNavigate();
  const { chaptersCompleted, completeChapter } = useGame();
  const [phase, setPhase] = useState(chaptersCompleted[0] ? 'complete' : 'story');
  const [gameComplete, setGameComplete] = useState(false);

  const handleGameSuccess = () => {
    setGameComplete(true);
    setTimeout(() => setPhase('reflection'), 1500);
  };

  const handleReflectionComplete = () => {
    completeChapter(0);
    setPhase('complete');
  };

  const reflectionQuestions = [
    {
      question: "Argha, when you think about that boy in Dhanbad with his first computer, what do you feel?",
      type: 'choice',
      options: [
        "Pride - I made it despite everything",
        "Gratitude - for the foundation it gave me",
        "Surprise - I never thought I'd come this far",
        "All of the above"
      ]
    },
    {
      question: "Your father believed in you when no one else did. What would you tell him today?",
      type: 'text',
      placeholder: "What would you say to him...",
      note: "Take your time. This matters."
    },
    {
      question: "Rate how much your childhood struggles shaped your strength today",
      type: 'scale',
      scaleLabels: ['A little', 'Made me who I am']
    },
  ];

  return (
    <ChapterLayout
      chapterNumber={1}
      title="Rose Day"
      subtitle="🌹 Where It All Began"
      date="February 7"
    >
      <div className="max-w-4xl mx-auto space-y-12">
        <JourneyProgress currentChapter={1} totalChapters={8} />

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
                  🌹
                </motion.div>
                <h2 className="text-2xl md:text-3xl font-serif italic text-foreground/80">
                  "Every rose has its thorns, but yours grew from concrete"
                </h2>
              </div>

              <motion.div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4 text-xs font-mono text-muted-foreground">
                  <i className="fas fa-database text-primary" />
                  <span>ORIGIN_FILE: ARGHA.EXE</span>
                </div>
                <TerminalBlock
                  lines={[
                    { text: 'NAME: ARGHA', prefix: '> ', className: 'text-primary' },
                    { text: 'DOB: 04-10-1994', prefix: '> ' },
                    { text: 'ORIGIN: DHANBAD, JHARKHAND', prefix: '> ' },
                    { text: 'FATHER: INCOME_TAX_OFFICER', prefix: '> ' },
                    { text: 'TRAIT: ALPHA_MALE', prefix: '> ', className: 'text-yellow-400' },
                    { text: 'STATUS: SELF_MADE', prefix: '> ', className: 'text-green-400' },
                  ]}
                />
              </motion.div>

              {/* Life Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { emoji: '🏠', value: 'Dhanbad', label: 'Roots' },
                  { emoji: '👨‍👩‍👦‍👦', value: '4', label: 'Family' },
                  { emoji: '🖥️', value: '1999', label: 'First Computer' },
                  { emoji: '💪', value: 'Alpha', label: 'Mode' },
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
                  In the coal-dusted streets of <span className="text-primary font-semibold">Dhanbad</span>, 
                  where dreams often got buried alongside the mines, there was a boy who refused to be ordinary. 
                  His name was <span className="text-primary font-bold">Argha</span>.
                </p>
              </StorySection>

              <StorySection>
                <p className="text-foreground/90 text-lg leading-relaxed">
                  His father, an Income Tax Officer, saw something in him that others couldn't. 
                  When he brought home that first computer, it wasn't just a machine—it was a 
                  <span className="text-primary font-semibold"> declaration of faith</span>.
                </p>
                <p className="text-foreground/90 text-lg leading-relaxed mt-4">
                  "This boy," his father thought, "will be something."
                </p>
              </StorySection>

              {/* The Brother */}
              <div className="bg-card/50 border border-primary/20 rounded-lg p-6">
                <h3 className="text-sm font-mono text-primary mb-4 flex items-center gap-2">
                  <i className="fas fa-heart" />
                  THE RESPONSIBILITY
                </h3>
                <p className="text-foreground/80 leading-relaxed">
                  There was also a younger brother. And with him came a weight that would shape Argha forever. 
                  Mental health doesn't announce itself politely—it demands strength from those who might otherwise break.
                </p>
                <p className="text-primary mt-4 font-medium text-lg">
                  But Argha didn't break. He became the pillar.
                </p>
              </div>

              <blockquote className="border-l-4 border-primary pl-6 py-4 bg-card/30 rounded-r-lg">
                <p className="text-xl font-serif italic text-foreground/90">
                  "The boy from Dhanbad wasn't just surviving. He was preparing. 
                  Every struggle was training for something bigger. Something he couldn't yet see."
                </p>
              </blockquote>

              {/* Message from Shivani */}
              <div className="bg-gradient-to-br from-pink-500/10 to-primary/10 border border-pink-500/30 rounded-lg p-8 text-center">
                <div className="text-3xl mb-4">💕</div>
                <p className="text-foreground/90 font-serif italic text-lg">
                  "Argha, I know you don't talk about those days often. But I see how they made you. 
                  The strength, the responsibility, the drive—it all started here. And I'm grateful for 
                  every thorn that made you who you are today."
                </p>
                <p className="text-primary font-medium mt-4">— Shivani</p>
              </div>

              <div className="text-center py-8">
                <Button
                  onClick={() => setPhase('game')}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 px-8 py-6 text-lg"
                >
                  <i className="fas fa-gamepad mr-3" />
                  Play: Memory Match
                </Button>
                <p className="text-xs text-muted-foreground mt-3">
                  Match the memories to unlock reflections
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
                <div className="text-5xl mb-4">🌹</div>
                <h2 className="text-2xl font-bold text-foreground">Memory Match</h2>
                <p className="text-muted-foreground mt-2">Match the childhood memories</p>
              </div>

              <MemoryMatchGame onSuccess={handleGameSuccess} />

              {gameComplete && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center"
                >
                  <p className="text-green-400 font-bold">Memories matched! 🌹</p>
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
                <div className="text-5xl mb-4">🌹</div>
                <h2 className="text-2xl font-bold text-foreground">Reflection Time</h2>
                <p className="text-muted-foreground mt-2">
                  Look back at where you started, Argha...
                </p>
              </div>

              <ReflectionQuestions
                questions={reflectionQuestions}
                onComplete={handleReflectionComplete}
                reflectionPrompt="Before you move forward, honor where you came from. That boy in Dhanbad became the man I love."
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
                🌹
              </motion.div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Rose Day Complete</h2>
                <p className="text-muted-foreground">
                  The foundation is set. Tomorrow, we see the Alpha rise.
                </p>
              </div>

              <Button
                onClick={() => navigate('/propose-day')}
                size="lg"
                className="bg-primary hover:bg-primary/90"
              >
                Continue to Propose Day
                <i className="fas fa-arrow-right ml-2" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ChapterLayout>
  );
};

export default RoseDay;
