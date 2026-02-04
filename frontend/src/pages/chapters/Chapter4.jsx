import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChapterLayout, StorySection } from '@/components/ChapterLayout';
import { PhotoPlaceholder } from '@/components/PhotoPlaceholder';
import { TerminalBlock } from '@/components/TerminalText';
import { CodeDebugGame } from '@/components/MiniGames2';
import { useGame } from '@/context/GameContext';

const Chapter4 = () => {
  const navigate = useNavigate();
  const { chaptersUnlocked, chaptersCompleted, completeChapter } = useGame();
  const [puzzleSolved, setPuzzleSolved] = useState(chaptersCompleted[3]);
  const [showPuzzle, setShowPuzzle] = useState(false);

  if (!chaptersUnlocked[3]) {
    navigate('/chapters');
    return null;
  }

  const handlePuzzleSuccess = () => {
    setPuzzleSolved(true);
    completeChapter(3);
  };

  return (
    <ChapterLayout
      chapterNumber={4}
      title="Ascent"
      subtitle="Career, Solitude & Discipline"
    >
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Opening Terminal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-card border border-border rounded-lg p-6"
        >
          <div className="flex items-center gap-2 mb-4 text-xs font-mono text-muted-foreground">
            <i className="fas fa-chart-line text-primary" />
            <span>MEMORY_FRAGMENT_004</span>
          </div>
          <TerminalBlock
            lines={[
              { text: 'PHASE: REBUILDING', prefix: '> ', className: 'text-primary' },
              { text: 'DURATION: 5 YEARS', prefix: '> ' },
              { text: 'FOCUS: CAREER_DOMINANCE', prefix: '> ' },
              { text: 'EMOTIONAL_AVAILABILITY: MINIMAL', prefix: '> ', className: 'text-yellow-400' },
              { text: 'TECHNICAL_GROWTH: EXPONENTIAL', prefix: '> ', className: 'text-green-400' },
              { text: 'IDENTITY: SOLIDIFYING', prefix: '> ', className: 'text-primary' },
            ]}
          />
        </motion.div>

        {/* Story Section 1 */}
        <StorySection>
          <p className="text-foreground/90 text-lg leading-relaxed">
            After the break, there was only one path forward: <span className="text-primary font-semibold">upward</span>. 
            The emotional energy that once went into a relationship was now redirected with surgical precision 
            into something that couldn't betray him—his career.
          </p>
        </StorySection>

        {/* The Amazon Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-card to-card/50 border border-primary/30 rounded-lg p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
              <i className="fab fa-amazon text-2xl text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-foreground">The Interview</h3>
              <p className="text-sm text-muted-foreground">SPONTANEOUS • OFFLINE • DECISIVE</p>
            </div>
          </div>
          <p className="text-foreground/90 leading-relaxed">
            The Amazon interview wasn't planned months in advance with careful preparation and anxiety. 
            It was <span className="text-primary font-semibold">spontaneous</span>. Offline. 
            He walked in with nothing but his skills and walked out with a job offer.
          </p>
          <p className="text-muted-foreground text-sm mt-4 font-mono">
            STATUS: OFFER_ACCEPTED
          </p>
        </motion.div>

        {/* Five Years Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative py-8"
        >
          <h3 className="text-sm font-mono text-primary mb-8 text-center">FIVE_YEAR_RECONSTRUCTION</h3>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border" />
            
            {/* Timeline items */}
            <div className="space-y-12">
              {[
                { year: 'Year 1', title: 'Foundation', desc: 'Learning the corporate game' },
                { year: 'Year 2', title: 'Growth', desc: 'Technical mastery deepens' },
                { year: 'Year 3', title: 'Recognition', desc: 'Skills become undeniable' },
                { year: 'Year 4', title: 'Leadership', desc: 'From follower to guide' },
                { year: 'Year 5', title: 'Dominance', desc: 'Identity solidified' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`flex items-center gap-4 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <div className="text-xs font-mono text-primary">{item.year}</div>
                    <div className="font-semibold text-foreground">{item.title}</div>
                    <div className="text-sm text-muted-foreground">{item.desc}</div>
                  </div>
                  <div className="relative z-10 w-4 h-4 rounded-full bg-primary border-4 border-background" />
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Story Section 2 - The Walls */}
        <StorySection>
          <p className="text-foreground/90 text-lg leading-relaxed">
            During these years, the walls stayed up. Hookups happened—physical connections that demanded 
            nothing emotional. No commitments. No vulnerability. Just calculated isolation wrapped in 
            occasional human contact.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed mt-4 font-serif italic">
            He wasn't avoiding love. He was protecting himself while he rebuilt.
          </p>
        </StorySection>

        {/* Photo Placeholder - Career Era */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <PhotoPlaceholder label="Career Phase" aspectRatio="4/3" />
          <PhotoPlaceholder label="The Grind" aspectRatio="4/3" />
        </motion.div>

        {/* Stats Block */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-card/50 border border-primary/20 rounded-lg p-8"
        >
          <h3 className="text-sm font-mono text-primary mb-6 flex items-center gap-2">
            <i className="fas fa-chart-bar" />
            ASCENT_METRICS
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-foreground">5</div>
              <div className="text-xs text-muted-foreground font-mono mt-1">YEARS_FOCUSED</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">1</div>
              <div className="text-xs text-muted-foreground font-mono mt-1">CLEAR_GOAL</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground">0</div>
              <div className="text-xs text-muted-foreground font-mono mt-1">DISTRACTIONS</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400">100%</div>
              <div className="text-xs text-muted-foreground font-mono mt-1">COMMITMENT</div>
            </div>
          </div>
        </motion.div>

        {/* Concluding Quote */}
        <StorySection>
          <blockquote className="border-l-4 border-primary pl-6 py-4 bg-card/30 rounded-r-lg">
            <p className="text-xl font-serif italic text-foreground/90">
              "Solitude wasn't loneliness. It was strategy. Five years of calculated isolation 
              created something that couldn't be broken by disappointment—a man who knew exactly 
              who he was and what he was worth."
            </p>
          </blockquote>
        </StorySection>

        {/* Puzzle Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card border border-border rounded-lg p-8 space-y-6"
        >
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <i className="fas fa-puzzle-piece text-primary text-sm" />
              <span className="text-xs font-mono text-primary">CHAPTER CHALLENGE</span>
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              The Company That Changed Everything
            </h3>
            <p className="text-muted-foreground text-sm">
              Where did the spontaneous interview lead?
            </p>
          </div>

          {!showPuzzle && !puzzleSolved && (
            <div className="text-center">
              <Button onClick={() => setShowPuzzle(true)} variant="outline">
                <i className="fas fa-lock mr-2" />
                Attempt Puzzle
              </Button>
            </div>
          )}

          {showPuzzle && !puzzleSolved && (
            <PuzzleInput
              correctAnswer="amazon"
              placeholder="Enter the company name..."
              hint="The everything store"
              onSuccess={handlePuzzleSuccess}
            />
          )}

          {puzzleSolved && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center mx-auto">
                <i className="fas fa-check text-2xl text-green-400" />
              </div>
              <p className="text-green-400 font-mono">CHAPTER 4 COMPLETE</p>
              <p className="text-xs text-muted-foreground">
                The fortress was built. But a glitch was about to change everything.
              </p>
              <Button 
                onClick={() => navigate('/chapter/5')}
                className="bg-primary hover:bg-primary/90"
              >
                <span>Continue to Chapter 5</span>
                <i className="fas fa-arrow-right ml-2" />
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </ChapterLayout>
  );
};

export default Chapter4;
