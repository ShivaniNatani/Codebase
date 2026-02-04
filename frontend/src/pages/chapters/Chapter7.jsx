import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChapterLayout, StorySection } from '@/components/ChapterLayout';
import { PhotoPlaceholder } from '@/components/PhotoPlaceholder';
import { TerminalBlock } from '@/components/TerminalText';
import { CatchRingGame } from '@/components/InteractiveGames';
import { ReflectionQuestions, JourneyProgress } from '@/components/ReflectionSystem';
import { useGame } from '@/context/GameContext';

const Chapter7 = () => {
  const navigate = useNavigate();
  const { chaptersUnlocked, chaptersCompleted, completeChapter } = useGame();
  const [phase, setPhase] = useState('story');
  const [gameComplete, setGameComplete] = useState(false);

  useEffect(() => {
    if (!chaptersUnlocked[6]) navigate('/chapters');
    if (chaptersCompleted[6]) setPhase('complete');
  }, [chaptersUnlocked, chaptersCompleted, navigate]);

  const handleGameSuccess = () => {
    setGameComplete(true);
    setTimeout(() => setPhase('reflection'), 2000);
  };

  const handleReflectionComplete = () => {
    completeChapter(6);
    setPhase('complete');
  };

  // THE MOST IMPORTANT QUESTIONS - Proving Love
  const reflectionQuestions = [
    {
      question: "Why do you want to marry HER specifically? Not just 'love' - be specific.",
      type: 'text',
      placeholder: "What makes her THE ONE...",
      note: "This is the most important answer."
    },
    {
      question: "Rate your commitment level to this relationship (1 = unsure, 10 = absolutely certain)",
      type: 'scale',
      scaleLabels: ['Still figuring it out', 'Completely certain - forever']
    },
    {
      question: "When things get hard (and they will), what will make you stay?",
      type: 'choice',
      options: [
        "The love we've built is worth fighting for",
        "I've seen worse - we can handle anything",
        "She's my partner, my teammate, my person",
        "Leaving was never an option once I chose her",
        "All of the above"
      ]
    },
    {
      question: "What are you most looking forward to in your married life together?",
      type: 'choice',
      options: [
        "Waking up next to her every day",
        "Building a family together",
        "Growing old with my best friend",
        "Having a true partner through everything",
        "All of the above - and more"
      ]
    },
    {
      question: "Write your wedding vow preview - what do you promise her?",
      type: 'text',
      placeholder: "I promise to...",
      note: "She will read this. Make it count."
    },
    {
      question: "Final question: Are you ready to spend the rest of your life with her?",
      type: 'choice',
      options: [
        "YES - Without any doubt",
        "Yes - I'm nervous but certain",
        "I need more time to think"
      ]
    }
  ];

  return (
    <ChapterLayout chapterNumber={7} title="The Commitment" subtitle="Love as Strategy">
      <div className="max-w-4xl mx-auto space-y-12">
        <JourneyProgress currentChapter={7} />

        <AnimatePresence mode="wait">
          {phase === 'story' && (
            <motion.div key="story" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12">
              
              {/* Epic Opening */}
              <div className="text-center py-8">
                <motion.div
                  animate={{ boxShadow: ['0 0 20px hsl(var(--primary) / 0.3)', '0 0 60px hsl(var(--primary) / 0.5)', '0 0 20px hsl(var(--primary) / 0.3)'] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-24 h-24 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center mx-auto mb-6"
                >
                  <i className="fas fa-ring text-4xl text-primary" />
                </motion.div>
                <h2 className="text-2xl md:text-3xl font-serif italic text-foreground/80">The Final Chapter</h2>
              </div>

              <motion.div className="bg-card border border-primary/50 rounded-lg p-6">
                <TerminalBlock lines={[
                  { text: 'DATE: 14_MAY_2024', prefix: '> ', className: 'text-primary' },
                  { text: 'ACTION: PROPOSAL', prefix: '> ', className: 'text-green-400' },
                  { text: 'PREVIOUS_MILESTONE: TAJ_BIRTHDAY_2023', prefix: '> ' },
                  { text: 'METHOD: CONSISTENCY_NOT_DRAMA', prefix: '> ' },
                  { text: 'STATUS: COMMITTED', prefix: '> ', className: 'text-green-400' },
                  { text: 'STILL_CHOOSING: HER', prefix: '> ', className: 'text-primary' },
                ]} />
              </motion.div>

              <StorySection>
                <p className="text-foreground/90 text-lg leading-relaxed">
                  <span className="text-primary font-bold text-3xl">14th May 2024.</span>
                </p>
                <p className="text-foreground/90 text-lg leading-relaxed mt-4">
                  He didn't propose with fireworks or flash mobs or viral moments. He proposed the way he 
                  did everything—with <span className="text-primary font-semibold">intention</span>. With meaning. 
                  With the weight of a man who knew exactly what he was asking and what he was promising.
                </p>
              </StorySection>

              {/* Taj Memory */}
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/30 rounded-lg p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                    <i className="fas fa-landmark text-2xl text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">The Taj Memory</h3>
                    <p className="text-sm text-muted-foreground">14 May 2023 - Birthday at the Taj</p>
                  </div>
                </div>
                <p className="text-foreground/80 leading-relaxed">
                  A year before the proposal, he had taken her to the Taj for her birthday. Not just a nice gesture—a 
                  <span className="text-primary"> statement</span>. A preview of the life he was planning to build.
                </p>
              </div>

              <PhotoPlaceholder label="The Moment" aspectRatio="16/9" className="max-w-2xl mx-auto" />

              <StorySection>
                <p className="text-foreground/90 text-lg leading-relaxed">
                  The proposal wasn't the proof. The proposal was just the formalization of proof that had been 
                  accumulating <span className="text-primary">every single day</span> for years:
                </p>
                <ul className="mt-6 space-y-3 text-foreground/80">
                  {[
                    'Every hour spent traveling just to be present',
                    'Every career transition supported without hesitation',
                    'Every family introduction that meant vulnerability',
                    'Every home built together, not just occupied',
                    'Every choice to stay when leaving would have been easier'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <i className="fas fa-check text-green-500 mt-1.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </StorySection>

              {/* The Weight He Carries */}
              <div className="bg-card border border-border rounded-lg p-8">
                <h3 className="text-sm font-mono text-primary mb-6">ACTIVE_RESPONSIBILITIES</h3>
                <p className="text-foreground/80 leading-relaxed mb-6">
                  Even now, with everything built, he still carries:
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {['Family responsibilities', "Brother's future", 'Home loans', 'Career excellence'].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-card/50 rounded border border-border/50">
                      <i className="fas fa-weight-hanging text-primary" />
                      <span className="text-sm text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-primary font-bold text-xl mt-6 text-center">
                  And still, every day, he chooses her.
                </p>
              </div>

              <blockquote className="border-l-4 border-primary pl-6 py-6 bg-card/30 rounded-r-lg">
                <p className="text-xl md:text-2xl font-serif italic text-foreground/90 leading-relaxed">
                  "Love, for him, was never poetry. It was <span className="text-primary">engineering</span>. 
                  Every decision calculated. Every commitment honored. Every sacrifice measured and deemed 
                  <span className="text-primary"> worth it</span>."
                </p>
              </blockquote>

              <div className="text-center py-8">
                <Button onClick={() => setPhase('game')} size="lg" className="bg-primary hover:bg-primary/90 px-8 py-6 text-lg">
                  <i className="fas fa-ring mr-3" />
                  Play: Catch the Ring
                </Button>
                <p className="text-xs text-muted-foreground mt-3">Catch 7 rings - one for each chapter of your journey</p>
              </div>
            </motion.div>
          )}

          {phase === 'game' && (
            <motion.div key="game" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-foreground">Catch the Ring</h2>
                <p className="text-muted-foreground mt-2">Move your mouse to catch 7 falling rings</p>
              </div>

              <CatchRingGame onSuccess={handleGameSuccess} />

              {gameComplete && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                  <p className="text-green-400 font-bold text-xl">SHE SAID YES! Loading final reflections...</p>
                </motion.div>
              )}
            </motion.div>
          )}

          {phase === 'reflection' && (
            <motion.div key="reflection" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-8">
              <div className="text-center mb-8">
                <div className="w-20 h-20 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-heart text-3xl text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">The Final Questions</h2>
                <p className="text-muted-foreground mt-2">
                  Before you can claim your forever, you must prove your commitment.
                </p>
              </div>

              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
                <p className="text-sm text-primary text-center">
                  ⚠️ These answers will be saved. Answer honestly.
                </p>
              </div>

              <ReflectionQuestions
                questions={reflectionQuestions}
                onComplete={handleReflectionComplete}
                reflectionPrompt="This is it. The final test. Not of your memory or your skills - but of your heart. Are you truly ready to commit forever?"
              />
            </motion.div>
          )}

          {phase === 'complete' && (
            <motion.div key="complete" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12 space-y-8">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: 3 }}
                className="w-32 h-32 rounded-full bg-primary/20 border-4 border-primary flex items-center justify-center mx-auto"
              >
                <i className="fas fa-ring text-5xl text-primary" />
              </motion.div>
              
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">ALL CHAPTERS COMPLETE</h2>
                <p className="text-muted-foreground">You've proven your journey. You've answered the questions.</p>
              </div>

              <div className="bg-card border border-primary/50 rounded-lg p-6 max-w-md mx-auto">
                <p className="text-sm text-muted-foreground mb-2">FINAL ACHIEVEMENT</p>
                <div className="flex items-center gap-4 justify-center">
                  <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center">
                    <i className="fas fa-crown text-2xl text-primary" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-foreground text-lg">The Commitment</h4>
                    <p className="text-xs text-muted-foreground">Completed all 7 chapters & reflections</p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <Button onClick={() => navigate('/final')} size="lg" className="bg-primary hover:bg-primary/90 px-12 py-6 text-xl group">
                  <i className="fas fa-door-open mr-3" />
                  Enter the Final Chamber
                  <i className="fas fa-arrow-right ml-3 group-hover:translate-x-1 transition-transform" />
                </Button>
                <p className="text-sm text-muted-foreground mt-3">
                  One irreversible choice awaits.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ChapterLayout>
  );
};

export default Chapter7;
