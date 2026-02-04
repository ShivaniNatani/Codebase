import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChapterLayout, StorySection } from '@/components/ChapterLayout';
import { PhotoPlaceholder } from '@/components/PhotoPlaceholder';
import { TerminalBlock } from '@/components/TerminalText';
import { RoadTripGame } from '@/components/InteractiveGames';
import { ReflectionQuestions, JourneyProgress, LifeStats } from '@/components/ReflectionSystem';
import { useGame } from '@/context/GameContext';

const Chapter2 = () => {
  const navigate = useNavigate();
  const { chaptersUnlocked, chaptersCompleted, completeChapter } = useGame();
  const [phase, setPhase] = useState('story');
  const [gameComplete, setGameComplete] = useState(false);

  useEffect(() => {
    if (!chaptersUnlocked[1]) navigate('/chapters');
    if (chaptersCompleted[1]) setPhase('complete');
  }, [chaptersUnlocked, chaptersCompleted, navigate]);

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
      question: "Moving 1,900km from home to Bangalore - what was the scariest part of that journey?",
      type: 'text',
      placeholder: "What kept you up at night...",
    },
    {
      question: "Rate your loneliness during those early Bangalore years (1 = perfectly fine, 10 = completely isolated)",
      type: 'scale',
      scaleLabels: ['Had support', 'Completely alone']
    },
    {
      question: "What was your main source of strength during the lone wolf phase?",
      type: 'choice',
      options: [
        "My ambition - I knew where I was going",
        "Phone calls with family",
        "Proving doubters wrong",
        "Late-night coding sessions",
        "Bangalore biryani (serious answer)"
      ]
    },
    {
      question: "If you could go back to college-you, would you do anything differently?",
      type: 'text',
      placeholder: "What would you change, if anything...",
    },
    {
      question: "Do you think the isolation made you stronger or did it cost you something?",
      type: 'choice',
      options: [
        "It made me who I am - worth every moment",
        "It made me stronger but I lost some softness",
        "It cost me connections I'll never get back",
        "I'm still processing what those years did to me"
      ]
    }
  ];

  const lifeStats = [
    { emoji: '🛫', value: '1,900km', label: 'Distance Traveled' },
    { emoji: '🎓', value: 'Engineering', label: 'Degree Pursued' },
    { emoji: '🍛', value: 'Biryani', label: 'Fuel Source' },
    { emoji: '🐺', value: 'Lone Wolf', label: 'Mode' },
  ];

  return (
    <ChapterLayout chapterNumber={2} title="Migration" subtitle="Bangalore & the Lone Wolf Phase">
      <div className="max-w-4xl mx-auto space-y-12">
        <JourneyProgress currentChapter={2} />

        <AnimatePresence mode="wait">
          {phase === 'story' && (
            <motion.div key="story" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4 text-xs font-mono text-muted-foreground">
                  <i className="fas fa-plane-departure text-primary" />
                  <span>MEMORY_FRAGMENT_002</span>
                </div>
                <TerminalBlock lines={[
                  { text: 'LOCATION_UPDATE: DHANBAD → BANGALORE', prefix: '> ', className: 'text-primary' },
                  { text: 'DISTANCE: ~1,900 KM', prefix: '> ' },
                  { text: 'OBJECTIVE: ENGINEERING_DEGREE', prefix: '> ' },
                  { text: 'SUPPORT_SYSTEM: MINIMAL', prefix: '> ', className: 'text-yellow-400' },
                  { text: 'RESOLVE: MAXIMUM', prefix: '> ', className: 'text-green-400' },
                ]} />
              </motion.div>

              <LifeStats stats={lifeStats} />

              <StorySection>
                <p className="text-foreground/90 text-lg leading-relaxed">
                  The train to Bangalore wasn't just a journey across India—it was a 
                  <span className="text-primary font-semibold"> transformation</span>. The boy from Dhanbad 
                  was becoming something else. Something sharper. Something that could survive in a city 
                  that swallowed dreamers whole.
                </p>
              </StorySection>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <PhotoPlaceholder label="College Days" aspectRatio="1/1" />
                <PhotoPlaceholder label="Early Bangalore" aspectRatio="1/1" />
                <PhotoPlaceholder label="The Hustle" aspectRatio="1/1" />
              </div>

              <StorySection>
                <p className="text-foreground/90 text-lg leading-relaxed">
                  College wasn't about fitting in. It was about <span className="text-primary">standing out</span>
                  —not through noise, but through undeniable competence. He wasn't the flashiest student. 
                  But technically? <span className="italic font-semibold">Razor-sharp.</span>
                </p>
              </StorySection>

              <div className="bg-card/50 border border-primary/20 rounded-lg p-8">
                <h3 className="text-sm font-mono text-primary mb-6 flex items-center gap-2">
                  <i className="fas fa-wolf-pack-battalion" />
                  LONE_WOLF_STATISTICS
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                  <div><div className="text-2xl font-mono text-foreground">04:00</div><div className="text-xs text-muted-foreground">WAKE_TIME</div></div>
                  <div><div className="text-2xl font-mono text-primary">18+</div><div className="text-xs text-muted-foreground">DAILY_CODE_HOURS</div></div>
                  <div><div className="text-2xl font-mono text-foreground">1</div><div className="text-xs text-muted-foreground">TRUSTED_PEOPLE</div></div>
                  <div><div className="text-2xl font-mono text-foreground">∞</div><div className="text-xs text-muted-foreground">GROWTH_MINDSET</div></div>
                </div>
              </div>

              <blockquote className="border-l-4 border-primary pl-6 py-4 bg-card/30 rounded-r-lg">
                <p className="text-xl font-serif italic text-foreground/90">
                  "The lone wolf doesn't hunt with the pack because he's antisocial. 
                  He hunts alone because he knows that when the kill matters most, 
                  he can only rely on himself."
                </p>
              </blockquote>

              <div className="text-center py-8">
                <Button onClick={() => setPhase('game')} size="lg" className="bg-primary hover:bg-primary/90 px-8 py-6 text-lg">
                  <i className="fas fa-motorcycle mr-3" />
                  Play: Road Trip to Bangalore
                </Button>
                <p className="text-xs text-muted-foreground mt-3">Navigate through traffic to reach your destination</p>
              </div>
            </motion.div>
          )}

          {phase === 'game' && (
            <motion.div key="game" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-8">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
                  <i className="fas fa-gamepad text-primary" />
                  <span className="text-sm font-mono text-primary">CHAPTER 2 CHALLENGE</span>
                </div>
                <h2 className="text-2xl font-bold text-foreground">Road Trip Game</h2>
                <p className="text-muted-foreground mt-2">Use ← → arrow keys to dodge traffic. Reach 100km!</p>
              </div>

              <RoadTripGame onSuccess={handleGameSuccess} />

              {gameComplete && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                  <p className="text-green-400 font-bold">Bangalore reached! Loading reflections...</p>
                </motion.div>
              )}
            </motion.div>
          )}

          {phase === 'reflection' && (
            <motion.div key="reflection" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
                  <i className="fas fa-heart text-primary" />
                  <span className="text-sm font-mono text-primary">DEEP REFLECTION</span>
                </div>
                <h2 className="text-2xl font-bold text-foreground">The Lone Wolf Years</h2>
                <p className="text-muted-foreground mt-2">Those years shaped you. Let's understand how.</p>
              </div>

              <ReflectionQuestions
                questions={reflectionQuestions}
                onComplete={handleReflectionComplete}
                reflectionPrompt="The migration wasn't just physical. Something inside you changed too. Let's explore what the lone wolf phase really meant."
              />
            </motion.div>
          )}

          {phase === 'complete' && (
            <motion.div key="complete" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12 space-y-6">
              <div className="w-24 h-24 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center mx-auto">
                <i className="fas fa-check text-4xl text-green-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Chapter 2 Complete</h2>
                <p className="text-muted-foreground">The lone wolf has arrived. But the hardest chapter awaits.</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 max-w-md mx-auto">
                <p className="text-sm text-muted-foreground mb-4">ACHIEVEMENT UNLOCKED</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <i className="fas fa-wolf-pack-battalion text-xl text-primary" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-foreground">Lone Wolf</h4>
                    <p className="text-xs text-muted-foreground">Survived the migration alone</p>
                  </div>
                </div>
              </div>
              <Button onClick={() => navigate('/chapter/3')} size="lg" className="bg-primary hover:bg-primary/90">
                Continue to Chapter 3 <i className="fas fa-arrow-right ml-2" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ChapterLayout>
  );
};

export default Chapter2;
