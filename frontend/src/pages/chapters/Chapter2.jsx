import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChapterLayout, StorySection, DataFragment } from '@/components/ChapterLayout';
import { PhotoPlaceholder } from '@/components/PhotoPlaceholder';
import { TerminalBlock } from '@/components/TerminalText';
import { MotorcycleRacingGame } from '@/components/MiniGames';
import { useGame } from '@/context/GameContext';

const Chapter2 = () => {
  const navigate = useNavigate();
  const { chaptersUnlocked, chaptersCompleted, completeChapter } = useGame();
  const [puzzleSolved, setPuzzleSolved] = useState(chaptersCompleted[1]);
  const [showPuzzle, setShowPuzzle] = useState(false);

  // Redirect if not unlocked
  if (!chaptersUnlocked[1]) {
    navigate('/chapters');
    return null;
  }

  const handlePuzzleSuccess = () => {
    setPuzzleSolved(true);
    completeChapter(1);
  };

  return (
    <ChapterLayout
      chapterNumber={2}
      title="Migration"
      subtitle="Bangalore & the Lone Wolf Phase"
    >
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Opening Terminal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-card border border-border rounded-lg p-6"
        >
          <div className="flex items-center gap-2 mb-4 text-xs font-mono text-muted-foreground">
            <i className="fas fa-plane-departure text-primary" />
            <span>MEMORY_FRAGMENT_002</span>
          </div>
          <TerminalBlock
            lines={[
              { text: 'LOCATION_UPDATE: DHANBAD → BANGALORE', prefix: '> ', className: 'text-primary' },
              { text: 'DISTANCE: ~1,900 KM', prefix: '> ' },
              { text: 'JOURNEY_TYPE: ONE_WAY', prefix: '> ' },
              { text: 'OBJECTIVE: ENGINEERING_DEGREE', prefix: '> ' },
              { text: 'SUPPORT_SYSTEM: MINIMAL', prefix: '> ', className: 'text-yellow-400' },
              { text: 'RESOLVE: MAXIMUM', prefix: '> ', className: 'text-green-400' },
            ]}
          />
        </motion.div>

        {/* Story Section 1 */}
        <StorySection>
          <p className="text-foreground/90 text-lg leading-relaxed">
            The train to Bangalore wasn't just a journey across India—it was a 
            <span className="text-primary font-semibold"> transformation</span>. The boy from Dhanbad 
            was becoming something else. Something sharper. Something that could survive in a city 
            that swallowed dreamers whole.
          </p>
        </StorySection>

        {/* Photo Grid - Bangalore Days */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          <PhotoPlaceholder label="College Days" aspectRatio="1/1" />
          <PhotoPlaceholder label="Early Bangalore" aspectRatio="1/1" />
          <PhotoPlaceholder label="The Hustle" aspectRatio="1/1" />
        </motion.div>

        {/* Story Section 2 */}
        <StorySection>
          <p className="text-foreground/90 text-lg leading-relaxed">
            College wasn't about fitting in. It was about <span className="text-primary">standing out</span> 
            —not through noise, but through undeniable competence. He wasn't the flashiest student in the room. 
            The grades weren't always the highest. But technically? 
            <span className="italic"> He was razor-sharp.</span>
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed mt-6">
            While others were memorizing textbooks, he was understanding systems. 
            The difference matters.
          </p>
        </StorySection>

        {/* Data Block - The Lone Wolf Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-card/50 border border-primary/20 rounded-lg p-8"
        >
          <h3 className="text-sm font-mono text-primary mb-6 flex items-center gap-2">
            <i className="fas fa-wolf-pack-battalion" />
            LONE_WOLF_STATISTICS
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-mono text-foreground">04:00</div>
              <div className="text-xs text-muted-foreground font-mono mt-1">WAKE_TIME</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-mono text-primary">18+</div>
              <div className="text-xs text-muted-foreground font-mono mt-1">DAILY_CODE_HOURS</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-mono text-foreground">1</div>
              <div className="text-xs text-muted-foreground font-mono mt-1">TRUSTED_PEOPLE</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-mono text-foreground">∞</div>
              <div className="text-xs text-muted-foreground font-mono mt-1">GROWTH_MINDSET</div>
            </div>
          </div>
        </motion.div>

        {/* Story Section 3 - The Survival */}
        <StorySection>
          <p className="text-foreground/90 text-lg leading-relaxed">
            The middle-class survival mindset wasn't a limitation—it was a 
            <span className="text-primary font-semibold"> superpower</span>. Every rupee counted. 
            Every meal was planned. The trucks, the biryani stalls, the late-night coding sessions 
            fueled by instant noodles—this was the forge.
          </p>
        </StorySection>

        {/* Photo - Bangalore Life */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <PhotoPlaceholder 
            label="Bangalore Memories" 
            aspectRatio="21/9"
          />
          <div className="absolute bottom-4 left-4 right-4 flex justify-between text-xs font-mono text-muted-foreground">
            <span>INDEPENDENCE: ACHIEVED</span>
            <span>IDENTITY: FORMING</span>
          </div>
        </motion.div>

        {/* Concluding Quote */}
        <StorySection>
          <blockquote className="border-l-4 border-primary pl-6 py-4 bg-card/30 rounded-r-lg">
            <p className="text-xl font-serif italic text-foreground/90">
              "The lone wolf doesn't hunt with the pack because he's antisocial. 
              He hunts alone because he knows that when the kill matters most, 
              he can only rely on himself."
            </p>
          </blockquote>
        </StorySection>

        {/* Fun Element - Biryani Reference */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-card border border-border/50 rounded-lg p-6 text-center"
        >
          <div className="text-4xl mb-3">🍛</div>
          <p className="text-sm font-mono text-muted-foreground">
            FUEL_SOURCE: BANGALORE_BIRYANI
          </p>
          <p className="text-xs text-primary/60 mt-2">
            (Some things never change)
          </p>
        </motion.div>

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
              Decode the Migration
            </h3>
            <p className="text-muted-foreground text-sm">
              What's the city where the lone wolf learned to survive?
            </p>
          </div>

          {!showPuzzle && !puzzleSolved && (
            <div className="text-center">
              <Button onClick={() => setShowPuzzle(true)} variant="outline" size="lg">
                <i className="fas fa-motorcycle mr-2" />
                Race to Bangalore
              </Button>
              <p className="text-xs text-muted-foreground mt-2">Navigate through traffic to reach your destination</p>
            </div>
          )}

          {showPuzzle && !puzzleSolved && (
            <MotorcycleRacingGame onSuccess={handlePuzzleSuccess} />
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
              <p className="text-green-400 font-mono">CHAPTER 2 COMPLETE</p>
              <Button 
                onClick={() => navigate('/chapter/3')}
                className="bg-primary hover:bg-primary/90"
              >
                <span>Continue to Chapter 3</span>
                <i className="fas fa-arrow-right ml-2" />
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </ChapterLayout>
  );
};

export default Chapter2;
