import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChapterLayout, StorySection } from '@/components/ChapterLayout';
import { TerminalBlock } from '@/components/TerminalText';
import { RoadTripGame } from '@/components/InteractiveGames';
import { ReflectionQuestions, JourneyProgress } from '@/components/ReflectionSystem';
import { useGame } from '@/context/GameContext';

const PromiseDay = () => {
  const navigate = useNavigate();
  const { chaptersCompleted, completeChapter } = useGame();
  const [phase, setPhase] = useState(chaptersCompleted[4] ? 'complete' : 'story');
  const [gameComplete, setGameComplete] = useState(false);

  const handleGameSuccess = () => {
    setGameComplete(true);
    setTimeout(() => setPhase('reflection'), 1500);
  };

  const handleReflectionComplete = () => {
    completeChapter(4);
    setPhase('complete');
  };

  const reflectionQuestions = [
    {
      question: "I'm vegetarian, you're hardcore non-veg. How do you really feel about our food differences?",
      type: 'choice',
      options: [
        "It's never been an issue - we respect each other",
        "It was weird at first but now it's just... us",
        "I secretly wish you'd try my food sometimes 😏",
        "Love doesn't care about food preferences"
      ]
    },
    {
      question: "Rate how much our differences actually strengthen our relationship",
      type: 'scale',
      scaleLabels: ['They create friction', 'They make us perfect']
    },
    {
      question: "I'm emotional, you're logical. What do you appreciate most about my emotional side?",
      type: 'text',
      placeholder: "What do you actually appreciate...",
      note: "Be honest. I can handle it. 💕"
    },
  ];

  const differences = [
    { his: 'Dhanbad', hers: 'Indore', category: 'Origin' },
    { his: 'Non-Veg 🍗', hers: 'Pure Veg 🥗', category: 'Food' },
    { his: 'Alpha/Logical 🧠', hers: 'Emotional 💖', category: 'Personality' },
    { his: 'Reserved', hers: 'Expressive', category: 'Communication' },
    { his: '04-10-1994', hers: '14-05-1998', category: 'Birthday' },
  ];

  return (
    <ChapterLayout
      chapterNumber={5}
      title="Promise Day"
      subtitle="🤝 Opposites Attract"
      date="February 11"
    >
      <div className="max-w-4xl mx-auto space-y-12">
        <JourneyProgress currentChapter={5} totalChapters={8} />

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
                  🤝
                </motion.div>
                <h2 className="text-2xl md:text-3xl font-serif italic text-foreground/80">
                  "Two puzzles pieces that shouldn't fit. Yet somehow, they're perfect."
                </h2>
              </div>

              <motion.div className="bg-card border border-blue-500/30 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4 text-xs font-mono text-blue-400">
                  <i className="fas fa-not-equal" />
                  <span>COMPATIBILITY_ANALYSIS</span>
                </div>
                <TerminalBlock
                  lines={[
                    { text: 'SCANNING_DIFFERENCES...', prefix: '> ' },
                    { text: 'ORIGIN: DHANBAD ≠ INDORE', prefix: '> ', className: 'text-yellow-400' },
                    { text: 'FOOD: NON_VEG ≠ PURE_VEG', prefix: '> ', className: 'text-yellow-400' },
                    { text: 'MODE: ALPHA ≠ EMOTIONAL', prefix: '> ', className: 'text-yellow-400' },
                    { text: 'EXPECTED_RESULT: INCOMPATIBLE', prefix: '> ', className: 'text-muted-foreground' },
                    { text: 'ACTUAL_RESULT: PERFECT_MATCH', prefix: '> ', className: 'text-green-400' },
                    { text: 'CONCLUSION: LOVE_DEFIES_LOGIC', prefix: '> ', className: 'text-primary' },
                  ]}
                />
              </motion.div>

              {/* Differences Table */}
              <div className="bg-card/50 border border-border rounded-lg overflow-hidden">
                <div className="grid grid-cols-3 bg-card border-b border-border">
                  <div className="p-4 text-center font-bold text-blue-400">ARGHA</div>
                  <div className="p-4 text-center font-bold text-muted-foreground border-x border-border">VS</div>
                  <div className="p-4 text-center font-bold text-pink-400">SHIVANI</div>
                </div>
                {differences.map((diff, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="grid grid-cols-3 border-b border-border/50 last:border-0"
                  >
                    <div className="p-4 text-center text-foreground">{diff.his}</div>
                    <div className="p-4 text-center text-xs text-muted-foreground border-x border-border/50 flex items-center justify-center">
                      {diff.category}
                    </div>
                    <div className="p-4 text-center text-foreground">{diff.hers}</div>
                  </motion.div>
                ))}
              </div>

              <StorySection>
                <p className="text-foreground/90 text-lg leading-relaxed">
                  On paper, we shouldn't work. You're the <span className="text-blue-400 font-semibold">Alpha</span>—
                  logical, reserved, calculated. I'm <span className="text-pink-400 font-semibold">emotional</span>—
                  expressive, feeling, heart-first.
                </p>
                <p className="text-foreground/90 text-lg leading-relaxed mt-4">
                  You eat everything. I won't touch non-veg. You process with your brain. 
                  I process with my heart. <span className="text-primary font-semibold">And yet...</span>
                </p>
              </StorySection>

              {/* The Magic */}
              <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-8 text-center">
                <div className="text-4xl mb-4">🧩❤️🧩</div>
                <h3 className="text-2xl font-bold text-foreground mb-4">The Magic</h3>
                <p className="text-foreground/80 leading-relaxed max-w-xl mx-auto">
                  Where you're strong, I'm soft. Where I'm chaotic, you're stable. 
                  We don't complete each other by being the same—we complete each other 
                  by being <span className="text-primary font-semibold">exactly what the other needs</span>.
                </p>
              </div>

              {/* What She Brings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card border border-blue-500/30 rounded-lg p-6">
                  <h4 className="text-sm font-mono text-blue-400 mb-4">WHAT YOU BRING</h4>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center gap-3">
                      <i className="fas fa-shield-alt text-blue-400" />
                      <span className="text-foreground">Stability when I'm anxious</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <i className="fas fa-brain text-blue-400" />
                      <span className="text-foreground">Logic when I'm emotional</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <i className="fas fa-anchor text-blue-400" />
                      <span className="text-foreground">Grounding when I'm spiraling</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <i className="fas fa-crown text-blue-400" />
                      <span className="text-foreground">Leadership when I need direction</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-card border border-pink-500/30 rounded-lg p-6">
                  <h4 className="text-sm font-mono text-pink-400 mb-4">WHAT I BRING</h4>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center gap-3">
                      <i className="fas fa-heart text-pink-400" />
                      <span className="text-foreground">Warmth when you're cold</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <i className="fas fa-smile text-pink-400" />
                      <span className="text-foreground">Softness when you're hard</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <i className="fas fa-comments text-pink-400" />
                      <span className="text-foreground">Expression when you're silent</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <i className="fas fa-home text-pink-400" />
                      <span className="text-foreground">Home when you're tired</span>
                    </li>
                  </ul>
                </div>
              </div>

              <blockquote className="border-l-4 border-purple-500 pl-6 py-4 bg-card/30 rounded-r-lg">
                <p className="text-xl font-serif italic text-foreground/90">
                  "The Alpha doesn't need someone who challenges his strength. 
                  He needs someone who <span className="text-pink-400">softens his edges</span>. 
                  And the emotional heart doesn't need more chaos—she needs 
                  <span className="text-blue-400"> an anchor</span>."
                </p>
              </blockquote>

              {/* Message from Shivani */}
              <div className="bg-gradient-to-br from-pink-500/10 to-primary/10 border border-pink-500/30 rounded-lg p-8 text-center">
                <div className="text-3xl mb-4">🤝💕</div>
                <p className="text-foreground/90 font-serif italic text-lg">
                  "Argha, I know you sometimes wonder how we work. I'm pure veg, you're not. 
                  I cry at movies, you analyze them. I talk too much, you listen. 
                  But here's the truth: <span className="text-primary font-bold">you're my calm and I'm your color</span>. 
                  And that's exactly what we both needed."
                </p>
                <p className="text-pink-400 font-medium mt-4">— Your opposite, your match 💕</p>
              </div>

              <div className="text-center py-8">
                <Button
                  onClick={() => setPhase('game')}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 px-8 py-6 text-lg"
                >
                  <i className="fas fa-motorcycle mr-3" />
                  Play: Journey Together
                </Button>
                <p className="text-xs text-muted-foreground mt-3">
                  Navigate our journey - dodging obstacles together
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
                <div className="text-5xl mb-4">🤝</div>
                <h2 className="text-2xl font-bold text-foreground">Journey Together</h2>
                <p className="text-muted-foreground mt-2">Arrow keys to navigate. Reach 100km!</p>
              </div>

              <RoadTripGame onSuccess={handleGameSuccess} />

              {gameComplete && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center"
                >
                  <p className="text-green-400 font-bold">Journey complete! 🤝</p>
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
                <div className="text-5xl mb-4">🤝</div>
                <h2 className="text-2xl font-bold text-foreground">Our Differences</h2>
                <p className="text-muted-foreground mt-2">
                  Let's talk about what makes us work...
                </p>
              </div>

              <ReflectionQuestions
                questions={reflectionQuestions}
                onComplete={handleReflectionComplete}
                reflectionPrompt="We're so different. And yet here we are. Tell me what you really think about our contrasts."
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
                🤝
              </motion.div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Promise Day Complete</h2>
                <p className="text-muted-foreground">
                  Our differences make us stronger. Tomorrow, see how I changed your world...
                </p>
              </div>

              <Button
                onClick={() => navigate('/hug-day')}
                size="lg"
                className="bg-primary hover:bg-primary/90"
              >
                Continue to Hug Day
                <i className="fas fa-arrow-right ml-2" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ChapterLayout>
  );
};

export default PromiseDay;
