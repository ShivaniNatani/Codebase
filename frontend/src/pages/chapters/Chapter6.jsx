import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChapterLayout, StorySection } from '@/components/ChapterLayout';
import { PhotoPlaceholder, PhotoGallery } from '@/components/PhotoPlaceholder';
import { TerminalBlock } from '@/components/TerminalText';
import { HomeBuilderGame } from '@/components/MiniGames2';
import { useGame } from '@/context/GameContext';

const Chapter6 = () => {
  const navigate = useNavigate();
  const { chaptersUnlocked, chaptersCompleted, completeChapter } = useGame();
  const [puzzleSolved, setPuzzleSolved] = useState(chaptersCompleted[5]);
  const [showPuzzle, setShowPuzzle] = useState(false);

  if (!chaptersUnlocked[5]) {
    navigate('/chapters');
    return null;
  }

  const handlePuzzleSuccess = () => {
    setPuzzleSolved(true);
    completeChapter(5);
  };

  const travelMemories = [
    { label: 'Maldives', aspectRatio: '4/3' },
    { label: 'Pondicherry', aspectRatio: '4/3' },
    { label: 'Mysore', aspectRatio: '4/3' },
    { label: 'Diwali Together', aspectRatio: '4/3' },
  ];

  return (
    <ChapterLayout
      chapterNumber={6}
      title="Partnership"
      subtitle="Building, Not Consuming"
    >
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Opening Terminal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-card border border-green-500/30 rounded-lg p-6"
        >
          <div className="flex items-center gap-2 mb-4 text-xs font-mono text-muted-foreground">
            <i className="fas fa-handshake text-green-500" />
            <span>MEMORY_FRAGMENT_006</span>
          </div>
          <TerminalBlock
            lines={[
              { text: 'RELATIONSHIP_MODE: PARTNERSHIP', prefix: '> ', className: 'text-green-400' },
              { text: 'SHARED_GOALS: ALIGNED', prefix: '> ' },
              { text: 'PROPERTIES_COMBINED: 3 FLATS', prefix: '> ', className: 'text-primary' },
              { text: 'HIS_CONTRIBUTION: 2 FLATS', prefix: '> ' },
              { text: 'HER_CONTRIBUTION: 1 FLAT (FIRST HOME)', prefix: '> ' },
              { text: 'MOVE_IN_DATE: FEB_2025', prefix: '> ', className: 'text-green-400' },
              { text: 'STATUS: BUILDING_TOGETHER', prefix: '> ' },
            ]}
          />
        </motion.div>

        {/* Story Section 1 */}
        <StorySection>
          <p className="text-foreground/90 text-lg leading-relaxed">
            This wasn't a relationship that <span className="text-primary">consumed</span>—it was one that 
            <span className="text-green-400 font-semibold"> built</span>. Two people who understood that love 
            isn't just feeling—it's construction. Brick by brick. Decision by decision.
          </p>
        </StorySection>

        {/* The Support During Transition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card/50 border border-primary/20 rounded-lg p-8"
        >
          <h3 className="text-sm font-mono text-primary mb-6">TRANSITION_SUPPORT_LOG</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-1">
                <i className="fas fa-graduation-cap text-primary text-sm" />
              </div>
              <div>
                <div className="font-medium text-foreground">Her Career Transition</div>
                <p className="text-sm text-muted-foreground">
                  When she left her job, he didn't just say "it'll be okay." He actively taught, 
                  mentored, and created stability during uncertainty.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-1">
                <i className="fas fa-car text-primary text-sm" />
              </div>
              <div>
                <div className="font-medium text-foreground">Long Travels</div>
                <p className="text-sm text-muted-foreground">
                  Driving hours just to watch a movie together. Nights spent commuting just to 
                  be present. Distance was never an excuse.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-1">
                <i className="fas fa-home text-primary text-sm" />
              </div>
              <div>
                <div className="font-medium text-foreground">First Home</div>
                <p className="text-sm text-muted-foreground">
                  Helping her buy her first home. Not as charity—as partnership. 
                  Building interiors together. Planning futures together.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Property Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-card to-card/50 border border-primary/30 rounded-lg p-8"
        >
          <h3 className="text-sm font-mono text-primary mb-6 flex items-center gap-2">
            <i className="fas fa-building" />
            COMBINED_ASSETS
          </h3>
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold text-primary">2</div>
              <div className="text-xs text-muted-foreground font-mono mt-1">HIS_FLATS</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary">+</div>
              <div className="text-xs text-muted-foreground font-mono mt-1 opacity-0">PLUS</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary">1</div>
              <div className="text-xs text-muted-foreground font-mono mt-1">HER_FLAT</div>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-border/50 text-center">
            <div className="text-sm text-muted-foreground">Moving into their own home</div>
            <div className="text-2xl font-bold text-green-400 mt-2">February 2025</div>
          </div>
        </motion.div>

        {/* Story Section 2 - The Travels */}
        <StorySection>
          <p className="text-foreground/90 text-lg leading-relaxed">
            They traveled. Not just to escape, but to <span className="text-primary font-semibold">experience</span>. 
            Maldives. Pondicherry. Mysore. Each trip wasn't a vacation—it was a chapter in their story, 
            a shared memory being deliberately created.
          </p>
        </StorySection>

        {/* Travel Photos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-sm font-mono text-primary mb-4 flex items-center gap-2">
            <i className="fas fa-map-marked-alt" />
            TRAVEL_MEMORIES
          </h3>
          <PhotoGallery photos={travelMemories} />
        </motion.div>

        {/* The Pressure He Carries */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-card border border-yellow-500/30 rounded-lg p-8"
        >
          <h3 className="text-sm font-mono text-yellow-500 mb-6 flex items-center gap-2">
            <i className="fas fa-weight-hanging" />
            THE_WEIGHT_HE_CARRIES
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <i className="fas fa-home text-muted-foreground" />
                <span className="text-foreground">Home loans</span>
              </div>
              <div className="flex items-center gap-3">
                <i className="fas fa-user-friends text-muted-foreground" />
                <span className="text-foreground">Brother's future</span>
              </div>
              <div className="flex items-center gap-3">
                <i className="fas fa-heart text-muted-foreground" />
                <span className="text-foreground">Family responsibility</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <i className="fas fa-briefcase text-muted-foreground" />
                <span className="text-foreground">Career dominance</span>
              </div>
              <div className="flex items-center gap-3">
                <i className="fas fa-ring text-muted-foreground" />
                <span className="text-foreground">Partnership commitments</span>
              </div>
              <div className="flex items-center gap-3">
                <i className="fas fa-infinity text-green-500" />
                <span className="text-green-400 font-medium">Still showing up</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Concluding Quote */}
        <StorySection>
          <blockquote className="border-l-4 border-primary pl-6 py-4 bg-card/30 rounded-r-lg">
            <p className="text-xl font-serif italic text-foreground/90">
              "Partnership isn't about finding someone who makes life easier. It's about finding 
              someone worth making life harder for. Someone who builds with you, not off you. 
              <span className="text-primary"> Chosen loyalty.</span>"
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
              Build Your Home Together
            </h3>
            <p className="text-muted-foreground text-sm">
              Place the blocks to build the home you&apos;re moving into in Feb 2025
            </p>
          </div>

          {!showPuzzle && !puzzleSolved && (
            <div className="text-center">
              <Button onClick={() => setShowPuzzle(true)} variant="outline" size="lg">
                <i className="fas fa-home mr-2" />
                Start Building
              </Button>
              <p className="text-xs text-muted-foreground mt-2">Use arrow keys to move, SPACE to place blocks</p>
            </div>
          )}

          {showPuzzle && !puzzleSolved && (
            <HomeBuilderGame onSuccess={handlePuzzleSuccess} />
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
              <p className="text-green-400 font-mono">CHAPTER 6 COMPLETE</p>
              <p className="text-xs text-muted-foreground">
                One chapter remains. The most important one.
              </p>
              <Button 
                onClick={() => navigate('/chapter/7')}
                className="bg-primary hover:bg-primary/90"
              >
                <span>Continue to Final Chapter</span>
                <i className="fas fa-arrow-right ml-2" />
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </ChapterLayout>
  );
};

export default Chapter6;
