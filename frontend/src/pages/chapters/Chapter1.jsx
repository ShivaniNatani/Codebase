import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChapterLayout, StorySection, DataFragment } from '@/components/ChapterLayout';
import { PhotoPlaceholder } from '@/components/PhotoPlaceholder';
import { TerminalBlock } from '@/components/TerminalText';
import { RetroComputerGame } from '@/components/MiniGames';
import { useGame } from '@/context/GameContext';

const Chapter1 = () => {
  const navigate = useNavigate();
  const { chaptersCompleted, completeChapter } = useGame();
  const [puzzleSolved, setPuzzleSolved] = useState(chaptersCompleted[0]);
  const [showPuzzle, setShowPuzzle] = useState(false);

  const handlePuzzleSuccess = () => {
    setPuzzleSolved(true);
    completeChapter(0);
  };

  return (
    <ChapterLayout
      chapterNumber={1}
      title="Origin"
      subtitle="The Boy With the Computer"
    >
      {/* Story Content */}
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Opening Terminal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-card border border-border rounded-lg p-6"
        >
          <div className="flex items-center gap-2 mb-4 text-xs font-mono text-muted-foreground">
            <i className="fas fa-database text-primary" />
            <span>MEMORY_FRAGMENT_001</span>
          </div>
          <TerminalBlock
            lines={[
              { text: 'LOCATION: DHANBAD, JHARKHAND', prefix: '> ', className: 'text-primary' },
              { text: 'YEAR: EARLY 2000s', prefix: '> ' },
              { text: 'SUBJECT_AGE: CHILD', prefix: '> ' },
              { text: 'ENVIRONMENT: MIDDLE_CLASS_HOUSEHOLD', prefix: '> ' },
              { text: 'FATHER_OCCUPATION: INCOME_TAX_OFFICER', prefix: '> ', className: 'text-muted-foreground' },
              { text: 'STATUS: SEED_OF_DEFIANCE_PLANTED', prefix: '> ', className: 'text-green-400' },
            ]}
          />
        </motion.div>

        {/* Story Section 1 */}
        <StorySection>
          <p className="text-foreground/90 text-lg leading-relaxed">
            In the coal-dusted streets of Dhanbad, where ambitions often got buried alongside the mines, 
            there lived a boy who saw the world differently. While others saw limitations, he saw 
            <span className="text-primary font-semibold"> possibilities encoded in binary</span>.
          </p>
        </StorySection>

        {/* Photo Placeholder - Childhood */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <PhotoPlaceholder 
            label="Childhood Memory" 
            aspectRatio="4/3"
          />
          <div className="flex flex-col justify-center space-y-4">
            <DataFragment label="LOCATION" value="Dhanbad, Jharkhand" />
            <DataFragment label="HOUSEHOLD" value="Government Quarter" />
            <DataFragment label="FATHER" value="Income Tax Officer" />
            <DataFragment label="MOTHER" value="Homemaker" />
            <DataFragment label="STATUS" value="Middle Class" encrypted />
          </div>
        </motion.div>

        {/* Story Section 2 */}
        <StorySection>
          <p className="text-foreground/90 text-lg leading-relaxed">
            The first computer arrived not as a gift, but as a <span className="text-primary">statement</span>. 
            His father, an Income Tax Officer with meticulous records and measured dreams, saw something in his son. 
            In a household where every expense was calculated, this machine was an investment in potential.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed mt-6 font-serif italic">
            "People doubted. They always do. IIT seemed like a distant star for a boy from Dhanbad. 
            But doubt was just fuel for the fire that was slowly igniting."
          </p>
        </StorySection>

        {/* Data Block */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-card/50 border border-primary/20 rounded-lg p-8"
        >
          <h3 className="text-sm font-mono text-primary mb-6 flex items-center gap-2">
            <i className="fas fa-microchip" />
            ENVIRONMENTAL_FACTORS
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-foreground">04</div>
              <div className="text-xs text-muted-foreground font-mono mt-1">FAMILY_MEMBERS</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">1</div>
              <div className="text-xs text-muted-foreground font-mono mt-1">COMPUTER</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground">∞</div>
              <div className="text-xs text-muted-foreground font-mono mt-1">AMBITION</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground">100%</div>
              <div className="text-xs text-muted-foreground font-mono mt-1">DETERMINATION</div>
            </div>
          </div>
        </motion.div>

        {/* Story Section 3 - The Brother */}
        <StorySection>
          <p className="text-foreground/90 text-lg leading-relaxed">
            There was also a younger brother. And with him came a responsibility that would shape everything. 
            Mental health challenges don't announce themselves gently—they seep into families, 
            demanding strength from those who might otherwise crumble.
          </p>
          <p className="text-foreground/90 text-lg leading-relaxed mt-4">
            But he didn't crumble. He became the <span className="text-primary font-semibold">pillar</span>. 
            At an age when most boys think only of themselves, he was already thinking about 
            <span className="italic"> them</span>—his family, his brother's future, the weight of being the one who had to make it.
          </p>
        </StorySection>

        {/* Photo Placeholder - Family */}
        <PhotoPlaceholder 
          label="Family Portrait" 
          aspectRatio="16/9"
          className="max-w-2xl mx-auto"
        />

        {/* Concluding Section */}
        <StorySection>
          <blockquote className="border-l-4 border-primary pl-6 py-4 bg-card/30 rounded-r-lg">
            <p className="text-xl font-serif italic text-foreground/90">
              "The boy with the computer wasn't just learning to code. He was learning to survive. 
              To plan. To execute. Every keystroke was a step toward a future no one else could see yet."
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
              Unlock the Next Memory
            </h3>
            <p className="text-muted-foreground text-sm">
              The city where the story began. The place that shaped the foundation.
            </p>
          </div>

          {!showPuzzle && !puzzleSolved && (
            <div className="text-center">
              <Button onClick={() => setShowPuzzle(true)} variant="outline" size="lg">
                <i className="fas fa-gamepad mr-2" />
                Start the Challenge
              </Button>
              <p className="text-xs text-muted-foreground mt-2">Boot the old computer to proceed</p>
            </div>
          )}

          {showPuzzle && !puzzleSolved && (
            <RetroComputerGame onSuccess={handlePuzzleSuccess} />
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
              <p className="text-green-400 font-mono">CHAPTER 1 COMPLETE</p>
              <Button 
                onClick={() => navigate('/chapter/2')}
                className="bg-primary hover:bg-primary/90"
              >
                <span>Continue to Chapter 2</span>
                <i className="fas fa-arrow-right ml-2" />
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </ChapterLayout>
  );
};

export default Chapter1;
