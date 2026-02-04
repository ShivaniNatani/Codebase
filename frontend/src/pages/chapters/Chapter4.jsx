import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChapterLayout, StorySection } from '@/components/ChapterLayout';
import { PhotoPlaceholder } from '@/components/PhotoPlaceholder';
import { TerminalBlock } from '@/components/TerminalText';
import { CodeChallengeGame } from '@/components/InteractiveGames';
import { ReflectionQuestions, JourneyProgress } from '@/components/ReflectionSystem';
import { useGame } from '@/context/GameContext';

const Chapter4 = () => {
  const navigate = useNavigate();
  const { chaptersUnlocked, chaptersCompleted, completeChapter } = useGame();
  const [phase, setPhase] = useState('story');
  const [gameComplete, setGameComplete] = useState(false);

  useEffect(() => {
    if (!chaptersUnlocked[3]) navigate('/chapters');
    if (chaptersCompleted[3]) setPhase('complete');
  }, [chaptersUnlocked, chaptersCompleted, navigate]);

  const handleGameSuccess = () => {
    setGameComplete(true);
    setTimeout(() => setPhase('reflection'), 1500);
  };

  const handleReflectionComplete = () => {
    completeChapter(3);
    setPhase('complete');
  };

  const reflectionQuestions = [
    {
      question: "During those 5 years of focused isolation, what drove you forward when everything felt empty?",
      type: 'text',
      placeholder: "What kept you going...",
    },
    {
      question: "Rate your work-life balance during the Amazon years (1 = balanced, 10 = work consumed everything)",
      type: 'scale',
      scaleLabels: ['Perfectly balanced', 'All work, no life']
    },
    {
      question: "What's the achievement from this period you're MOST proud of?",
      type: 'choice',
      options: [
        "Getting the Amazon job spontaneously",
        "Building financial stability for my family",
        "Becoming technically excellent",
        "Surviving without emotional support",
        "Paying off family responsibilities"
      ]
    },
    {
      question: "If success came at the cost of relationships, was it worth it?",
      type: 'choice',
      options: [
        "Yes - I had to secure my foundation first",
        "Mostly - though I missed out on some experiences",
        "I'm not sure - I wonder what could have been",
        "No - I would balance things differently now"
      ]
    },
    {
      question: "What would having someone beside you during those years have meant?",
      type: 'text',
      placeholder: "How would it have changed things...",
      note: "Think about what you have now vs what you had then."
    }
  ];

  return (
    <ChapterLayout chapterNumber={4} title="Ascent" subtitle="Career, Solitude & Discipline">
      <div className="max-w-4xl mx-auto space-y-12">
        <JourneyProgress currentChapter={4} />

        <AnimatePresence mode="wait">
          {phase === 'story' && (
            <motion.div key="story" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12">
              
              <motion.div className="bg-card border border-border rounded-lg p-6">
                <TerminalBlock lines={[
                  { text: 'PHASE: REBUILDING', prefix: '> ', className: 'text-primary' },
                  { text: 'DURATION: 5 YEARS', prefix: '> ' },
                  { text: 'FOCUS: CAREER_DOMINANCE', prefix: '> ' },
                  { text: 'EMOTIONAL_AVAILABILITY: MINIMAL', prefix: '> ', className: 'text-yellow-400' },
                  { text: 'TECHNICAL_GROWTH: EXPONENTIAL', prefix: '> ', className: 'text-green-400' },
                ]} />
              </motion.div>

              <StorySection>
                <p className="text-foreground/90 text-lg leading-relaxed">
                  After the break, there was only one path forward: <span className="text-primary font-semibold">upward</span>. 
                  The emotional energy that once went into a relationship was now redirected with surgical precision 
                  into something that couldn't betray him—his career.
                </p>
              </StorySection>

              {/* Amazon Story */}
              <div className="bg-gradient-to-br from-card to-card/50 border border-primary/30 rounded-lg p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-lg bg-primary/20 flex items-center justify-center">
                    <i className="fab fa-amazon text-3xl text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-foreground">The Interview</h3>
                    <p className="text-sm text-muted-foreground">SPONTANEOUS • OFFLINE • DECISIVE</p>
                  </div>
                </div>
                <p className="text-foreground/90 leading-relaxed">
                  The Amazon interview wasn't planned months in advance. It was <span className="text-primary font-semibold">spontaneous</span>. 
                  Offline. He walked in with nothing but his skills and walked out with a job offer.
                </p>
              </div>

              {/* Timeline */}
              <div className="relative py-8">
                <h3 className="text-sm font-mono text-primary mb-8 text-center">FIVE_YEAR_RECONSTRUCTION</h3>
                <div className="absolute left-1/2 top-16 bottom-0 w-px bg-border" />
                <div className="space-y-8 relative">
                  {[
                    { year: 'Year 1', title: 'Foundation', desc: 'Learning the corporate game' },
                    { year: 'Year 2', title: 'Growth', desc: 'Technical mastery deepens' },
                    { year: 'Year 3', title: 'Recognition', desc: 'Skills become undeniable' },
                    { year: 'Year 4', title: 'Leadership', desc: 'From follower to guide' },
                    { year: 'Year 5', title: 'Dominance', desc: 'Identity solidified' },
                  ].map((item, i) => (
                    <div key={i} className={`flex items-center gap-4 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                      <div className={`flex-1 ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                        <div className="text-xs font-mono text-primary">{item.year}</div>
                        <div className="font-semibold text-foreground">{item.title}</div>
                        <div className="text-sm text-muted-foreground">{item.desc}</div>
                      </div>
                      <div className="relative z-10 w-4 h-4 rounded-full bg-primary border-4 border-background" />
                      <div className="flex-1" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <PhotoPlaceholder label="Career Phase" aspectRatio="4/3" />
                <PhotoPlaceholder label="The Grind" aspectRatio="4/3" />
              </div>

              <blockquote className="border-l-4 border-primary pl-6 py-4 bg-card/30 rounded-r-lg">
                <p className="text-xl font-serif italic text-foreground/90">
                  "Solitude wasn't loneliness. It was strategy. Five years of calculated isolation 
                  created something that couldn't be broken by disappointment—a man who knew exactly 
                  who he was and what he was worth."
                </p>
              </blockquote>

              <div className="text-center py-8">
                <Button onClick={() => setPhase('game')} size="lg" className="bg-primary hover:bg-primary/90 px-8 py-6 text-lg">
                  <i className="fas fa-code mr-3" />
                  Play: Code Challenge
                </Button>
                <p className="text-xs text-muted-foreground mt-3">Find the bugs to pass the interview!</p>
              </div>
            </motion.div>
          )}

          {phase === 'game' && (
            <motion.div key="game" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-foreground">Amazon Interview Challenge</h2>
                <p className="text-muted-foreground mt-2">Click on the buggy line in each code snippet</p>
              </div>

              <CodeChallengeGame onSuccess={handleGameSuccess} />

              {gameComplete && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                  <p className="text-green-400 font-bold">Interview passed! Loading reflections...</p>
                </motion.div>
              )}
            </motion.div>
          )}

          {phase === 'reflection' && (
            <motion.div key="reflection" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-foreground">The Ascent Years</h2>
                <p className="text-muted-foreground mt-2">You built yourself. Let's understand what that meant.</p>
              </div>

              <ReflectionQuestions
                questions={reflectionQuestions}
                onComplete={handleReflectionComplete}
                reflectionPrompt="Five years of building. Five years of discipline. Five years alone. What did you gain? What did you lose? And was it worth it?"
              />
            </motion.div>
          )}

          {phase === 'complete' && (
            <motion.div key="complete" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12 space-y-6">
              <div className="w-24 h-24 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center mx-auto">
                <i className="fas fa-chart-line text-4xl text-green-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Chapter 4 Complete</h2>
                <p className="text-muted-foreground">The ascent is complete. But a glitch is about to change everything.</p>
              </div>
              <Button onClick={() => navigate('/chapter/5')} size="lg" className="bg-primary hover:bg-primary/90">
                Continue to Chapter 5 <i className="fas fa-arrow-right ml-2" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ChapterLayout>
  );
};

export default Chapter4;
