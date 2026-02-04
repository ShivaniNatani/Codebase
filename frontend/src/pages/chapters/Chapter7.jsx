import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChapterLayout, StorySection } from '@/components/ChapterLayout';
import { PhotoPlaceholder } from '@/components/PhotoPlaceholder';
import { TerminalBlock } from '@/components/TerminalText';
import { GlitchText } from '@/components/GlitchText';
import { RingCatcherGame } from '@/components/MiniGames3';
import { useGame } from '@/context/GameContext';

const Chapter7 = () => {
  const navigate = useNavigate();
  const { chaptersUnlocked, chaptersCompleted, completeChapter } = useGame();
  const [puzzleSolved, setPuzzleSolved] = useState(chaptersCompleted[6]);
  const [showPuzzle, setShowPuzzle] = useState(false);
  const [showFinalReveal, setShowFinalReveal] = useState(false);

  if (!chaptersUnlocked[6]) {
    navigate('/chapters');
    return null;
  }

  const handlePuzzleSuccess = () => {
    setPuzzleSolved(true);
    completeChapter(6);
    setTimeout(() => setShowFinalReveal(true), 1000);
  };

  return (
    <ChapterLayout
      chapterNumber={7}
      title="The Commitment"
      subtitle="Love as Strategy"
    >
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Opening - Epic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12"
        >
          <motion.div
            animate={{ 
              boxShadow: ['0 0 20px hsl(var(--primary) / 0.3)', '0 0 60px hsl(var(--primary) / 0.5)', '0 0 20px hsl(var(--primary) / 0.3)']
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-24 h-24 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center mx-auto mb-8"
          >
            <i className="fas fa-ring text-4xl text-primary" />
          </motion.div>
          <h2 className="text-2xl md:text-3xl font-serif italic text-foreground/80">
            The Final Chapter
          </h2>
        </motion.div>

        {/* Opening Terminal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-card border border-primary/50 rounded-lg p-6"
        >
          <div className="flex items-center gap-2 mb-4 text-xs font-mono text-muted-foreground">
            <i className="fas fa-crown text-primary" />
            <span>MEMORY_FRAGMENT_007 [FINAL]</span>
          </div>
          <TerminalBlock
            lines={[
              { text: 'DATE: 14_MAY_2024', prefix: '> ', className: 'text-primary' },
              { text: 'ACTION: PROPOSAL', prefix: '> ', className: 'text-green-400' },
              { text: 'PREVIOUS_MILESTONE: TAJ_BIRTHDAY_2023', prefix: '> ' },
              { text: 'METHOD: CONSISTENCY_NOT_DRAMA', prefix: '> ' },
              { text: 'PROOF_TYPE: DAILY_CHOICES', prefix: '> ' },
              { text: 'STATUS: COMMITTED', prefix: '> ', className: 'text-green-400' },
              { text: 'STILL_WORKING_FOR: FAMILY_BROTHER_FUTURE', prefix: '> ' },
              { text: 'STILL_CHOOSING: HER', prefix: '> ', className: 'text-primary' },
            ]}
          />
        </motion.div>

        {/* Story Section 1 - The Proposal */}
        <StorySection>
          <p className="text-foreground/90 text-lg leading-relaxed">
            <span className="text-primary font-bold text-2xl">14th May 2024.</span>
          </p>
          <p className="text-foreground/90 text-lg leading-relaxed mt-4">
            He didn't propose with fireworks or flash mobs or viral moments. He proposed the way he 
            did everything—with <span className="text-primary font-semibold">intention</span>. With meaning. 
            With the weight of a man who knew exactly what he was asking and what he was promising.
          </p>
        </StorySection>

        {/* The Taj Memory */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/30 rounded-lg p-8"
        >
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
            The kind of man who celebrates the woman he loves in places that match her worth.
          </p>
        </motion.div>

        {/* Photo - The Proposal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <PhotoPlaceholder 
            label="The Moment" 
            aspectRatio="16/9"
            className="max-w-2xl mx-auto"
          />
        </motion.div>

        {/* Story Section 2 - The Proof */}
        <StorySection>
          <p className="text-foreground/90 text-lg leading-relaxed">
            The proposal wasn't the proof. The proposal was just the formalization of proof that had been 
            accumulating <span className="text-primary">every single day</span> for years:
          </p>
          <ul className="mt-6 space-y-3 text-foreground/80">
            <li className="flex items-start gap-3">
              <i className="fas fa-check text-green-500 mt-1.5" />
              <span>Every hour spent traveling just to be present</span>
            </li>
            <li className="flex items-start gap-3">
              <i className="fas fa-check text-green-500 mt-1.5" />
              <span>Every career transition supported without hesitation</span>
            </li>
            <li className="flex items-start gap-3">
              <i className="fas fa-check text-green-500 mt-1.5" />
              <span>Every family introduction that meant vulnerability</span>
            </li>
            <li className="flex items-start gap-3">
              <i className="fas fa-check text-green-500 mt-1.5" />
              <span>Every home built together, not just occupied</span>
            </li>
            <li className="flex items-start gap-3">
              <i className="fas fa-check text-green-500 mt-1.5" />
              <span>Every choice to stay when leaving would have been easier</span>
            </li>
          </ul>
        </StorySection>

        {/* The Weight He Still Carries */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-card border border-border rounded-lg p-8"
        >
          <h3 className="text-sm font-mono text-primary mb-6">ACTIVE_RESPONSIBILITIES</h3>
          <p className="text-foreground/80 leading-relaxed mb-6">
            Even now, with everything built, he still carries:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-card/50 rounded border border-border/50">
              <i className="fas fa-users text-primary" />
              <span className="text-sm text-foreground">Family responsibilities</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-card/50 rounded border border-border/50">
              <i className="fas fa-heart text-primary" />
              <span className="text-sm text-foreground">Brother's future</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-card/50 rounded border border-border/50">
              <i className="fas fa-home text-primary" />
              <span className="text-sm text-foreground">Home loans</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-card/50 rounded border border-border/50">
              <i className="fas fa-chart-line text-primary" />
              <span className="text-sm text-foreground">Career excellence</span>
            </div>
          </div>
          <p className="text-primary font-medium mt-6 text-center">
            And still, every day, he chooses her.
          </p>
        </motion.div>

        {/* The Final Quote - Before Puzzle */}
        <StorySection>
          <blockquote className="border-l-4 border-primary pl-6 py-6 bg-card/30 rounded-r-lg">
            <p className="text-xl md:text-2xl font-serif italic text-foreground/90 leading-relaxed">
              "Love, for him, was never poetry. It was <span className="text-primary">engineering</span>. 
              Every decision calculated. Every commitment honored. Every sacrifice measured and deemed 
              <span className="text-primary"> worth it</span>."
            </p>
          </blockquote>
        </StorySection>

        {/* Puzzle Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card border border-primary/50 rounded-lg p-8 space-y-6"
        >
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <i className="fas fa-key text-primary text-sm" />
              <span className="text-xs font-mono text-primary">FINAL CHALLENGE</span>
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              Catch the Rings
            </h3>
            <p className="text-muted-foreground text-sm">
              Catch 7 falling rings - one for each chapter of your story
            </p>
          </div>

          {!showPuzzle && !puzzleSolved && (
            <div className="text-center">
              <Button onClick={() => setShowPuzzle(true)} variant="outline" size="lg">
                <i className="fas fa-ring mr-2" />
                Begin the Proposal
              </Button>
              <p className="text-xs text-muted-foreground mt-2">Move your mouse to catch the falling rings</p>
            </div>
          )}

          {showPuzzle && !puzzleSolved && (
            <RingCatcherGame onSuccess={handlePuzzleSuccess} />
          )}

          <AnimatePresence>
            {puzzleSolved && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6"
              >
                <div className="w-20 h-20 rounded-full bg-green-500/20 border-2 border-green-500/50 flex items-center justify-center mx-auto">
                  <i className="fas fa-crown text-3xl text-green-400" />
                </div>
                <div>
                  <p className="text-green-400 font-mono text-lg">ALL CHAPTERS COMPLETE</p>
                  <p className="text-muted-foreground text-sm mt-2">
                    The protocol has been fully decoded.
                  </p>
                </div>
                
                {showFinalReveal && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="pt-6 border-t border-border/50"
                  >
                    <p className="text-foreground/80 mb-4">
                      One final choice awaits.
                    </p>
                    <Button 
                      onClick={() => navigate('/final')}
                      size="lg"
                      className="bg-primary hover:bg-primary/90 px-8 py-6 text-lg group"
                    >
                      <i className="fas fa-door-open mr-3" />
                      <span>Enter the Final Chamber</span>
                      <i className="fas fa-arrow-right ml-3 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </ChapterLayout>
  );
};

export default Chapter7;
