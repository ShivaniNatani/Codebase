import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChapterLayout, StorySection } from '@/components/ChapterLayout';
import { PhotoPlaceholder } from '@/components/PhotoPlaceholder';
import { TerminalBlock } from '@/components/TerminalText';
import { BuildHomeGame } from '@/components/InteractiveGames';
import { ReflectionQuestions, JourneyProgress } from '@/components/ReflectionSystem';
import { useGame } from '@/context/GameContext';

const Chapter6 = () => {
  const navigate = useNavigate();
  const { chaptersUnlocked, chaptersCompleted, completeChapter } = useGame();
  const [phase, setPhase] = useState('story');
  const [gameComplete, setGameComplete] = useState(false);

  useEffect(() => {
    if (!chaptersUnlocked[5]) navigate('/chapters');
    if (chaptersCompleted[5]) setPhase('complete');
  }, [chaptersUnlocked, chaptersCompleted, navigate]);

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
      question: "What does 'building together' mean to you vs just 'being together'?",
      type: 'text',
      placeholder: "What's the difference...",
    },
    {
      question: "Rate how much she has contributed to your growth as a person (1 = a little, 10 = transformed me)",
      type: 'scale',
      scaleLabels: ['A little', 'Completely transformed me']
    },
    {
      question: "The travels together (Maldives, Pondicherry, Mysore) - what made those trips special?",
      type: 'choice',
      options: [
        "Creating memories that will last forever",
        "Seeing her happy made everything worth it",
        "Escaping the pressure of daily life together",
        "Realizing we're compatible even when traveling",
        "All of the above"
      ]
    },
    {
      question: "You carry immense pressure (family, brother, loans, career). How does she help you carry it?",
      type: 'text',
      placeholder: "How does she support you...",
    },
    {
      question: "Describe your ideal future together in one sentence.",
      type: 'text',
      placeholder: "What does forever look like...",
      note: "This is your vision. Make it count."
    }
  ];

  const travelMemories = [
    { label: 'Maldives', aspectRatio: '4/3' },
    { label: 'Pondicherry', aspectRatio: '4/3' },
    { label: 'Mysore', aspectRatio: '4/3' },
    { label: 'Diwali Together', aspectRatio: '4/3' },
  ];

  return (
    <ChapterLayout chapterNumber={6} title="Partnership" subtitle="Building, Not Consuming">
      <div className="max-w-4xl mx-auto space-y-12">
        <JourneyProgress currentChapter={6} />

        <AnimatePresence mode="wait">
          {phase === 'story' && (
            <motion.div key="story" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12">
              
              <motion.div className="bg-card border border-green-500/30 rounded-lg p-6">
                <TerminalBlock lines={[
                  { text: 'RELATIONSHIP_MODE: PARTNERSHIP', prefix: '> ', className: 'text-green-400' },
                  { text: 'SHARED_GOALS: ALIGNED', prefix: '> ' },
                  { text: 'PROPERTIES_COMBINED: 3 FLATS', prefix: '> ', className: 'text-primary' },
                  { text: 'HIS_CONTRIBUTION: 2 FLATS', prefix: '> ' },
                  { text: 'HER_CONTRIBUTION: 1 FLAT (FIRST HOME)', prefix: '> ' },
                  { text: 'MOVE_IN_DATE: FEB_2025', prefix: '> ', className: 'text-green-400' },
                ]} />
              </motion.div>

              <StorySection>
                <p className="text-foreground/90 text-lg leading-relaxed">
                  This wasn't a relationship that <span className="text-destructive">consumed</span>—it was one that 
                  <span className="text-green-400 font-semibold"> built</span>. Two people who understood that love 
                  isn't just feeling—it's construction. Brick by brick. Decision by decision.
                </p>
              </StorySection>

              {/* Support Log */}
              <div className="bg-card/50 border border-primary/20 rounded-lg p-8">
                <h3 className="text-sm font-mono text-primary mb-6">PARTNERSHIP_LOG</h3>
                <div className="space-y-4">
                  {[
                    { icon: 'fa-graduation-cap', title: 'Her Career Transition', desc: 'He taught, mentored, and created stability during her uncertainty.' },
                    { icon: 'fa-car', title: 'Long Travels', desc: 'Driving hours just to watch a movie together. Distance was never an excuse.' },
                    { icon: 'fa-home', title: 'First Home', desc: 'Helping her buy her first home. Building interiors together. Planning futures together.' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                        <i className={`fas ${item.icon} text-primary`} />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{item.title}</div>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Property Stats */}
              <div className="bg-gradient-to-br from-card to-card/50 border border-primary/30 rounded-lg p-8">
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div><div className="text-4xl font-bold text-primary">2</div><div className="text-xs text-muted-foreground">HIS_FLATS</div></div>
                  <div><div className="text-4xl font-bold text-primary">+</div></div>
                  <div><div className="text-4xl font-bold text-primary">1</div><div className="text-xs text-muted-foreground">HER_FLAT</div></div>
                </div>
                <div className="mt-6 pt-6 border-t border-border/50 text-center">
                  <div className="text-sm text-muted-foreground">Moving into their own home</div>
                  <div className="text-2xl font-bold text-green-400 mt-2">February 2025</div>
                </div>
              </div>

              <StorySection>
                <p className="text-foreground/90 text-lg leading-relaxed">
                  They traveled. Not just to escape, but to <span className="text-primary font-semibold">experience</span>. 
                  Maldives. Pondicherry. Mysore. Each trip was a chapter in their story, 
                  a shared memory being deliberately created.
                </p>
              </StorySection>

              {/* Travel Photos */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {travelMemories.map((mem, i) => (
                  <PhotoPlaceholder key={i} label={mem.label} aspectRatio="1/1" />
                ))}
              </div>

              {/* The Weight */}
              <div className="bg-card border border-yellow-500/30 rounded-lg p-8">
                <h3 className="text-sm font-mono text-yellow-500 mb-6 flex items-center gap-2">
                  <i className="fas fa-weight-hanging" />
                  THE_WEIGHT_HE_CARRIES
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {['Home loans', "Brother's future", 'Family responsibility', 'Career dominance', 'Partnership commitments'].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <i className="fas fa-check text-muted-foreground" />
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-3 col-span-2 mt-4">
                    <i className="fas fa-infinity text-green-500" />
                    <span className="text-green-400 font-medium text-lg">Still showing up. Every day.</span>
                  </div>
                </div>
              </div>

              <blockquote className="border-l-4 border-primary pl-6 py-4 bg-card/30 rounded-r-lg">
                <p className="text-xl font-serif italic text-foreground/90">
                  "Partnership isn't about finding someone who makes life easier. It's about finding 
                  someone worth making life harder for. Someone who builds with you, not off you. 
                  <span className="text-primary"> Chosen loyalty.</span>"
                </p>
              </blockquote>

              <div className="text-center py-8">
                <Button onClick={() => setPhase('game')} size="lg" className="bg-primary hover:bg-primary/90 px-8 py-6 text-lg">
                  <i className="fas fa-home mr-3" />
                  Play: Build Home Together
                </Button>
                <p className="text-xs text-muted-foreground mt-3">Click parts to build your future home!</p>
              </div>
            </motion.div>
          )}

          {phase === 'game' && (
            <motion.div key="game" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-foreground">Build Home Together</h2>
                <p className="text-muted-foreground mt-2">Click parts to reach 50 points and complete your home</p>
              </div>

              <BuildHomeGame onSuccess={handleGameSuccess} />

              {gameComplete && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                  <p className="text-green-400 font-bold">Home built! Loading reflections...</p>
                </motion.div>
              )}
            </motion.div>
          )}

          {phase === 'reflection' && (
            <motion.div key="reflection" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-foreground">The Partnership</h2>
                <p className="text-muted-foreground mt-2">You're building something real. Let's understand what that means.</p>
              </div>

              <ReflectionQuestions
                questions={reflectionQuestions}
                onComplete={handleReflectionComplete}
                reflectionPrompt="Partnership isn't just a word. It's a choice made every single day. What does your partnership mean to you?"
              />
            </motion.div>
          )}

          {phase === 'complete' && (
            <motion.div key="complete" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12 space-y-6">
              <div className="w-24 h-24 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center mx-auto">
                <i className="fas fa-home text-4xl text-green-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Chapter 6 Complete</h2>
                <p className="text-muted-foreground">The home is built. One chapter remains.</p>
              </div>
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 max-w-md mx-auto">
                <p className="text-primary font-medium">⚠️ The final chapter awaits</p>
                <p className="text-sm text-muted-foreground mt-1">Are you ready to make the ultimate commitment?</p>
              </div>
              <Button onClick={() => navigate('/chapter/7')} size="lg" className="bg-primary hover:bg-primary/90">
                Continue to Final Chapter <i className="fas fa-arrow-right ml-2" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ChapterLayout>
  );
};

export default Chapter6;
