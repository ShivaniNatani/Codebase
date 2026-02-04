import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChapterLayout, StorySection } from '@/components/ChapterLayout';
import { PhotoPlaceholder } from '@/components/PhotoPlaceholder';
import { TerminalBlock } from '@/components/TerminalText';
import { MemoryMatchGame } from '@/components/InteractiveGames';
import { ReflectionQuestions, JourneyProgress, LifeStats } from '@/components/ReflectionSystem';
import { useGame } from '@/context/GameContext';

const Chapter1 = () => {
  const navigate = useNavigate();
  const { chaptersCompleted, completeChapter } = useGame();
  const [phase, setPhase] = useState('story'); // story -> game -> reflection -> complete
  const [gameComplete, setGameComplete] = useState(false);
  const [reflectionComplete, setReflectionComplete] = useState(false);

  useEffect(() => {
    if (chaptersCompleted[0]) {
      setPhase('complete');
    }
  }, [chaptersCompleted]);

  const handleGameSuccess = () => {
    setGameComplete(true);
    setTimeout(() => setPhase('reflection'), 1500);
  };

  const handleReflectionComplete = (answers) => {
    setReflectionComplete(true);
    completeChapter(0);
    setPhase('complete');
  };

  const reflectionQuestions = [
    {
      question: "When you think about your childhood in Dhanbad, what's the one memory that shaped who you are today?",
      type: 'text',
      placeholder: "Share that pivotal moment...",
      note: "Take your time. This is about you."
    },
    {
      question: "Your father bought you your first computer. On a scale of 1-10, how much did that moment change your life?",
      type: 'scale',
      scaleLabels: ['Slightly', 'Everything changed']
    },
    {
      question: "People doubted you'd make it. What kept you going when no one believed?",
      type: 'choice',
      options: [
        "My family's silent belief in me",
        "Pure defiance - I'd prove them wrong",
        "A vision of the future only I could see",
        "The responsibility I felt for my brother",
        "All of the above"
      ]
    },
    {
      question: "Looking back at that boy in Dhanbad, what would you tell him about where he'd end up?",
      type: 'text',
      placeholder: "What would you say to your younger self...",
    },
    {
      question: "Do you believe the struggles of your childhood made you the man you are today?",
      type: 'choice',
      options: [
        "Absolutely - every struggle was a lesson",
        "Mostly - though some scars remain",
        "I'm still figuring that out",
        "I don't think about the past much"
      ]
    }
  ];

  const lifeStats = [
    { emoji: '🏠', value: 'Dhanbad', label: 'Origin' },
    { emoji: '👨‍👩‍👦‍👦', value: '4', label: 'Family Members' },
    { emoji: '🖥️', value: '1999', label: 'First Computer' },
    { emoji: '💪', value: '∞', label: 'Determination' },
  ];

  return (
    <ChapterLayout
      chapterNumber={1}
      title="Origin"
      subtitle="The Boy With the Computer"
    >
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Journey Progress */}
        <JourneyProgress currentChapter={1} />

        {/* Story Phase */}
        <AnimatePresence mode="wait">
          {phase === 'story' && (
            <motion.div
              key="story"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-12"
            >
              {/* Opening Terminal */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-card border border-border rounded-lg p-6"
              >
                <div className="flex items-center gap-2 mb-4 text-xs font-mono text-muted-foreground">
                  <i className="fas fa-database text-primary" />
                  <span>MEMORY_FRAGMENT_001</span>
                </div>
                <TerminalBlock
                  lines={[
                    { text: 'LOCATION: DHANBAD, JHARKHAND', prefix: '> ', className: 'text-primary' },
                    { text: 'YEAR: EARLY 2000s', prefix: '> ' },
                    { text: 'ENVIRONMENT: MIDDLE_CLASS_HOUSEHOLD', prefix: '> ' },
                    { text: 'FATHER: INCOME_TAX_OFFICER', prefix: '> ' },
                    { text: 'STATUS: SEED_OF_DEFIANCE_PLANTED', prefix: '> ', className: 'text-green-400' },
                  ]}
                />
              </motion.div>

              {/* Life Stats */}
              <LifeStats stats={lifeStats} />

              {/* Story Section 1 */}
              <StorySection>
                <p className="text-foreground/90 text-lg leading-relaxed">
                  In the coal-dusted streets of <span className="text-primary font-semibold">Dhanbad</span>, 
                  where ambitions often got buried alongside the mines, there lived a boy who saw the world differently. 
                  While others saw limitations, he saw <span className="text-primary">possibilities encoded in binary</span>.
                </p>
              </StorySection>

              {/* Photo + Data */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <PhotoPlaceholder label="Childhood Memory" aspectRatio="4/3" />
                <div className="flex flex-col justify-center space-y-4">
                  <div className="text-sm font-mono">
                    <span className="text-muted-foreground">FATHER: </span>
                    <span className="text-foreground">Income Tax Officer (Retired)</span>
                  </div>
                  <div className="text-sm font-mono">
                    <span className="text-muted-foreground">MOTHER: </span>
                    <span className="text-foreground">Homemaker - The silent strength</span>
                  </div>
                  <div className="text-sm font-mono">
                    <span className="text-muted-foreground">BROTHER: </span>
                    <span className="text-primary">His greatest responsibility</span>
                  </div>
                  <div className="text-sm font-mono">
                    <span className="text-muted-foreground">DREAM: </span>
                    <span className="text-foreground">IIT - Against all odds</span>
                  </div>
                </div>
              </div>

              {/* Story Section 2 */}
              <StorySection>
                <p className="text-foreground/90 text-lg leading-relaxed">
                  The first computer arrived not as a gift, but as a <span className="text-primary font-semibold">statement</span>. 
                  His father, an Income Tax Officer with meticulous records and measured dreams, saw something in his son 
                  that others couldn't see. In a household where every expense was calculated, this machine was an 
                  investment in potential.
                </p>
              </StorySection>

              {/* The Brother Story */}
              <div className="bg-card/50 border border-primary/20 rounded-lg p-6">
                <h3 className="text-sm font-mono text-primary mb-4 flex items-center gap-2">
                  <i className="fas fa-heart" />
                  THE_RESPONSIBILITY
                </h3>
                <p className="text-foreground/80 leading-relaxed">
                  There was also a younger brother. And with him came a responsibility that would shape everything. 
                  Mental health challenges don't announce themselves gently—they seep into families, demanding strength 
                  from those who might otherwise crumble.
                </p>
                <p className="text-primary mt-4 font-medium">
                  But he didn't crumble. He became the pillar.
                </p>
              </div>

              {/* Photo - Family */}
              <PhotoPlaceholder label="Family Portrait" aspectRatio="16/9" className="max-w-2xl mx-auto" />

              {/* Quote */}
              <blockquote className="border-l-4 border-primary pl-6 py-4 bg-card/30 rounded-r-lg">
                <p className="text-xl font-serif italic text-foreground/90">
                  "The boy with the computer wasn't just learning to code. He was learning to survive. 
                  To plan. To execute. Every keystroke was a step toward a future no one else could see yet."
                </p>
              </blockquote>

              {/* Start Game Button */}
              <div className="text-center py-8">
                <Button
                  onClick={() => setPhase('game')}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 px-8 py-6 text-lg"
                >
                  <i className="fas fa-gamepad mr-3" />
                  Play: Memory Match Challenge
                </Button>
                <p className="text-xs text-muted-foreground mt-3">
                  Match the childhood memories to unlock the next phase
                </p>
              </div>
            </motion.div>
          )}

          {/* Game Phase */}
          {phase === 'game' && (
            <motion.div
              key="game"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
                  <i className="fas fa-gamepad text-primary" />
                  <span className="text-sm font-mono text-primary">CHAPTER 1 CHALLENGE</span>
                </div>
                <h2 className="text-2xl font-bold text-foreground">Memory Match</h2>
                <p className="text-muted-foreground mt-2">Connect the childhood memories to their meanings</p>
              </div>

              <MemoryMatchGame onSuccess={handleGameSuccess} />

              {gameComplete && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-check text-2xl text-green-400" />
                  </div>
                  <p className="text-green-400 font-bold">Game Complete! Loading reflections...</p>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Reflection Phase */}
          {phase === 'reflection' && (
            <motion.div
              key="reflection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
                  <i className="fas fa-heart text-primary" />
                  <span className="text-sm font-mono text-primary">DEEP REFLECTION</span>
                </div>
                <h2 className="text-2xl font-bold text-foreground">Time to Reflect</h2>
                <p className="text-muted-foreground mt-2">
                  Answer honestly. These questions are about understanding yourself.
                </p>
              </div>

              <ReflectionQuestions
                questions={reflectionQuestions}
                onComplete={handleReflectionComplete}
                chapterTitle="Origin"
                reflectionPrompt="Before you move forward, take a moment to look back. The boy from Dhanbad is about to become the man who conquers. But first, he needs to understand where he came from."
              />
            </motion.div>
          )}

          {/* Complete Phase */}
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
                className="w-24 h-24 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center mx-auto"
              >
                <i className="fas fa-check text-4xl text-green-400" />
              </motion.div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Chapter 1 Complete</h2>
                <p className="text-muted-foreground">
                  You've revisited the origin. The foundation has been laid.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6 max-w-md mx-auto">
                <p className="text-sm text-muted-foreground mb-4">ACHIEVEMENT UNLOCKED</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <i className="fas fa-seedling text-xl text-primary" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-foreground">Origin Story</h4>
                    <p className="text-xs text-muted-foreground">Understood where the journey began</p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <Button
                  onClick={() => navigate('/chapter/2')}
                  size="lg"
                  className="bg-primary hover:bg-primary/90"
                >
                  Continue to Chapter 2
                  <i className="fas fa-arrow-right ml-2" />
                </Button>
                <p className="text-xs text-muted-foreground mt-3">
                  6 chapters remaining until the proposal
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ChapterLayout>
  );
};

export default Chapter1;
