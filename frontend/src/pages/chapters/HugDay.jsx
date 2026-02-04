import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChapterLayout, StorySection } from '@/components/ChapterLayout';
import { TerminalBlock } from '@/components/TerminalText';
import { BuildHomeGame } from '@/components/InteractiveGames';
import { ReflectionQuestions, JourneyProgress } from '@/components/ReflectionSystem';
import { useGame } from '@/context/GameContext';

const HugDay = () => {
  const navigate = useNavigate();
  const { chaptersCompleted, completeChapter } = useGame();
  const [phase, setPhase] = useState(chaptersCompleted[5] ? 'complete' : 'story');
  const [gameComplete, setGameComplete] = useState(false);

  const handleGameSuccess = () => {
    setGameComplete(true);
    setTimeout(() => setPhase('reflection'), 1500);
  };

  const handleReflectionComplete = () => {
    completeChapter(5);
    setPhase('complete');
  };

  const reflectionQuestions = [
    {
      question: "When your ex was getting married and you were hurting, what did it mean to you that I was there?",
      type: 'text',
      placeholder: "What did my presence mean...",
      note: "I held you through that. I need to know it mattered."
    },
    {
      question: "Rate how much I've helped you feel less alone in this world",
      type: 'scale',
      scaleLabels: ['A little support', 'You changed everything']
    },
    {
      question: "That Diwali with Amit and Abhilasha when you didn't go home - what did it mean?",
      type: 'choice',
      options: [
        "You chose me over tradition",
        "You wanted me to feel included",
        "You were building our own traditions",
        "You wanted to show me I'm your family now",
        "All of the above"
      ]
    },
  ];

  const moments = [
    {
      emoji: '🎂',
      title: 'My Birthday',
      description: "When my ex was with someone else, you made sure I was never alone. You celebrated me."
    },
    {
      emoji: '🪔',
      title: 'Diwali with Amit & Abhilasha',
      description: "You didn't go home. You took me to your chosen family. You made me belong."
    },
    {
      emoji: '🎬',
      title: 'Every Movie I Wanted',
      description: "You drove hours just to watch what I wanted. Every single time."
    },
    {
      emoji: '😢',
      title: 'When I Was Upset',
      description: "You dropped everything. You showed up. You held the space."
    },
    {
      emoji: '👗',
      title: 'My Preferences',
      description: "My dressing, my choices, my growth - you valued them all. Without judgment."
    },
    {
      emoji: '💪',
      title: 'Against Everything',
      description: "When the world was hard, you stood in front of me. Always."
    },
  ];

  return (
    <ChapterLayout
      chapterNumber={6}
      title="Hug Day"
      subtitle="🤗 She Changed Everything"
      date="February 12"
    >
      <div className="max-w-4xl mx-auto space-y-12">
        <JourneyProgress currentChapter={6} totalChapters={8} />

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
                  🤗
                </motion.div>
                <h2 className="text-2xl md:text-3xl font-serif italic text-foreground/80">
                  "This chapter isn't about him. It's about what he did for her."
                </h2>
              </div>

              <motion.div className="bg-card border border-pink-500/30 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4 text-xs font-mono text-pink-400">
                  <i className="fas fa-heart" />
                  <span>LOVE_IN_ACTION.LOG</span>
                </div>
                <TerminalBlock
                  lines={[
                    { text: 'SUBJECT: ARGHA', prefix: '> ' },
                    { text: 'BEHAVIOR: EMOTIONALLY_PRESENT', prefix: '> ', className: 'text-green-400' },
                    { text: 'PATTERN: SHOWING_UP_CONSISTENTLY', prefix: '> ', className: 'text-green-400' },
                    { text: 'EVIDENCE: DIWALI_WITH_FRIENDS', prefix: '> ' },
                    { text: 'EVIDENCE: BIRTHDAY_PROTECTION', prefix: '> ' },
                    { text: 'EVIDENCE: EVERY_MOVIE_REQUEST', prefix: '> ' },
                    { text: 'CONCLUSION: THIS_IS_LOVE', prefix: '> ', className: 'text-primary' },
                  ]}
                />
              </motion.div>

              <StorySection>
                <p className="text-foreground/90 text-lg leading-relaxed">
                  Argha, you think you're just "logical" and "reserved." But let me show you 
                  what I see. Let me show you the man behind the Alpha.
                </p>
              </StorySection>

              {/* Moments Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {moments.map((moment, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors"
                  >
                    <div className="text-3xl mb-3">{moment.emoji}</div>
                    <h4 className="font-bold text-foreground mb-2">{moment.title}</h4>
                    <p className="text-sm text-muted-foreground">{moment.description}</p>
                  </motion.div>
                ))}
              </div>

              {/* The Birthday Story */}
              <div className="bg-gradient-to-br from-pink-500/10 to-primary/10 border border-pink-500/30 rounded-lg p-8">
                <h3 className="text-xl font-bold text-center text-foreground mb-6">
                  🎂 The Day You Chose Me
                </h3>
                <p className="text-foreground/80 leading-relaxed text-center max-w-2xl mx-auto">
                  My ex was with someone else. Talking about marriage. On my birthday. 
                  The world felt like it was crumbling. And you... 
                  <span className="text-primary font-bold"> you made sure I wasn't alone</span>.
                </p>
                <p className="text-foreground/80 leading-relaxed text-center max-w-2xl mx-auto mt-4">
                  You didn't just celebrate my birthday. You celebrated <span className="text-pink-400">me</span>. 
                  You showed me that I was worth showing up for.
                </p>
              </div>

              {/* The Diwali Story */}
              <div className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border border-orange-500/30 rounded-lg p-8">
                <h3 className="text-xl font-bold text-center text-foreground mb-6">
                  🪔 The Diwali You Didn't Go Home
                </h3>
                <p className="text-foreground/80 leading-relaxed text-center max-w-2xl mx-auto">
                  Your family was waiting. Diwali is sacred. But you stayed. 
                  You took me to <span className="text-primary font-bold">Amit and Abhilasha</span>—
                  your chosen family—and you made me part of it.
                </p>
                <p className="text-foreground/80 leading-relaxed text-center max-w-2xl mx-auto mt-4">
                  That wasn't just a festival. That was you saying: 
                  <span className="text-orange-400 font-bold"> "She belongs with me."</span>
                </p>
              </div>

              <StorySection>
                <p className="text-foreground/90 text-lg leading-relaxed">
                  You think you're not romantic. But romance isn't about flowers and poetry, Argha. 
                  Romance is <span className="text-primary font-semibold">choosing someone every single day</span>. 
                  And you've chosen me. Again and again.
                </p>
              </StorySection>

              {/* The Promise */}
              <div className="bg-card border border-primary/30 rounded-lg p-8 text-center">
                <div className="text-4xl mb-4">💍</div>
                <p className="text-foreground/90 font-serif italic text-lg leading-relaxed max-w-xl mx-auto">
                  "You once told me: whatever happens, you'll always be there. Even when I needed you during 
                  my hardest times. You never thought you'd fall for me. But you did."
                </p>
                <p className="text-primary font-bold text-xl mt-6">
                  And that's the greatest plot twist of my life.
                </p>
              </div>

              <blockquote className="border-l-4 border-pink-500 pl-6 py-4 bg-card/30 rounded-r-lg">
                <p className="text-xl font-serif italic text-foreground/90">
                  "You call yourself an Alpha. But the truth is, Argha—you're the most 
                  <span className="text-pink-400"> gentle</span> man I know. You just hide it 
                  behind logic and strength. But I see you."
                </p>
              </blockquote>

              {/* Message from Shivani */}
              <div className="bg-gradient-to-br from-pink-500/10 to-primary/10 border border-pink-500/30 rounded-lg p-8 text-center">
                <div className="text-3xl mb-4">🤗💕</div>
                <p className="text-foreground/90 font-serif italic text-lg">
                  "Argha, this chapter is my gift to you. It's a mirror. I need you to see 
                  what I see when I look at you. Not the Alpha. Not the logical one. 
                  <span className="text-primary font-bold"> The man who loves me without even realizing how beautifully he does it.</span>"
                </p>
                <p className="text-pink-400 font-medium mt-4">— Forever grateful, forever yours 💕</p>
              </div>

              <div className="text-center py-8">
                <Button
                  onClick={() => setPhase('game')}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 px-8 py-6 text-lg"
                >
                  <i className="fas fa-home mr-3" />
                  Play: Build Our Home
                </Button>
                <p className="text-xs text-muted-foreground mt-3">
                  Click to build what we're creating together
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
                <div className="text-5xl mb-4">🤗</div>
                <h2 className="text-2xl font-bold text-foreground">Build Our Home</h2>
                <p className="text-muted-foreground mt-2">Click parts to reach 50 points</p>
              </div>

              <BuildHomeGame onSuccess={handleGameSuccess} />

              {gameComplete && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center"
                >
                  <p className="text-green-400 font-bold">Home built! 🏠</p>
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
                <div className="text-5xl mb-4">🤗</div>
                <h2 className="text-2xl font-bold text-foreground">Acknowledge It</h2>
                <p className="text-muted-foreground mt-2">
                  I showed you what you've done. Now tell me what it meant...
                </p>
              </div>

              <ReflectionQuestions
                questions={reflectionQuestions}
                onComplete={handleReflectionComplete}
                reflectionPrompt="These moments weren't small to me. They were everything. Now tell me they meant something to you too."
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
                🤗
              </motion.div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Hug Day Complete</h2>
                <p className="text-muted-foreground">
                  You've seen what you've done for me. Tomorrow, see why I'm your greatest gift...
                </p>
              </div>

              <Button
                onClick={() => navigate('/kiss-day')}
                size="lg"
                className="bg-primary hover:bg-primary/90"
              >
                Continue to Kiss Day
                <i className="fas fa-arrow-right ml-2" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ChapterLayout>
  );
};

export default HugDay;
