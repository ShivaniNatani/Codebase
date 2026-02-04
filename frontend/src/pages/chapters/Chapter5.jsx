import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChapterLayout, StorySection } from '@/components/ChapterLayout';
import { PhotoPlaceholder } from '@/components/PhotoPlaceholder';
import { TerminalBlock } from '@/components/TerminalText';
import { GlitchText } from '@/components/GlitchText';
import { PhoneConnectionGame } from '@/components/MiniGames2';
import { useGame } from '@/context/GameContext';

const Chapter5 = () => {
  const navigate = useNavigate();
  const { chaptersUnlocked, chaptersCompleted, completeChapter } = useGame();
  const [puzzleSolved, setPuzzleSolved] = useState(chaptersCompleted[4]);
  const [showPuzzle, setShowPuzzle] = useState(false);

  if (!chaptersUnlocked[4]) {
    navigate('/chapters');
    return null;
  }

  const handlePuzzleSuccess = () => {
    setPuzzleSolved(true);
    completeChapter(4);
  };

  return (
    <ChapterLayout
      chapterNumber={5}
      title="The Glitch"
      subtitle="A Wrong Number Changes Everything"
    >
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Opening - The Glitch Effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8"
        >
          <div className="text-6xl md:text-8xl font-bold mb-4">
            <GlitchText 
              text="ANOMALY" 
              className="text-primary" 
              glitchIntensity={0.3}
            />
          </div>
          <p className="text-sm font-mono text-muted-foreground">
            SYSTEM_BREACH_DETECTED: UNEXPECTED_CONNECTION
          </p>
        </motion.div>

        {/* Opening Terminal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-card border border-primary/50 rounded-lg p-6"
        >
          <div className="flex items-center gap-2 mb-4 text-xs font-mono text-muted-foreground">
            <i className="fas fa-phone-volume text-primary animate-pulse" />
            <span>MEMORY_FRAGMENT_005 [CRITICAL]</span>
          </div>
          <TerminalBlock
            lines={[
              { text: 'CONTACT_TYPE: WRONG_NUMBER', prefix: '> ', className: 'text-yellow-400' },
              { text: 'IDENTITY: "WRONG_SHIVANI"', prefix: '> ' },
              { text: 'HIS_IDENTITY: "THAT_UPGRAD_SESSION_GUY"', prefix: '> ' },
              { text: 'FIRST_INTERACTION: TALKING_ALL_NIGHT', prefix: '> ', className: 'text-primary' },
              { text: 'PRETENSE_LEVEL: ZERO', prefix: '> ' },
              { text: 'CALENDAR_STATUS: PACKED', prefix: '> ' },
              { text: 'SPACE_MADE: YES', prefix: '> ', className: 'text-green-400' },
            ]}
          />
        </motion.div>

        {/* Story Section 1 */}
        <StorySection>
          <p className="text-foreground/90 text-lg leading-relaxed">
            She was a <span className="text-primary font-semibold">wrong number</span>. A glitch in the system. 
            The kind of mistake that algorithms can't predict and firewalls can't block. 
            He was "that UpGrad session guy"—a stranger in her phone, an unknown variable.
          </p>
          <p className="text-foreground/90 text-lg leading-relaxed mt-4">
            But that night, they talked. Not carefully curated conversation. 
            Not the performative dance of early attraction. Just... <span className="text-primary italic">talking</span>.
          </p>
        </StorySection>

        {/* The Night Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card/50 border border-primary/20 rounded-lg p-8"
        >
          <h3 className="text-sm font-mono text-primary mb-6 flex items-center gap-2">
            <i className="fas fa-moon" />
            FIRST_NIGHT_ANALYSIS
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                <i className="fas fa-wine-glass text-2xl text-primary" />
              </div>
              <div className="text-sm font-medium text-foreground">Drinking</div>
              <div className="text-xs text-muted-foreground">Guards lowered</div>
            </div>
            <div className="space-y-2">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                <i className="fas fa-comments text-2xl text-primary" />
              </div>
              <div className="text-sm font-medium text-foreground">Talking</div>
              <div className="text-xs text-muted-foreground">No masks, no pretense</div>
            </div>
            <div className="space-y-2">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                <i className="fas fa-link text-2xl text-primary" />
              </div>
              <div className="text-sm font-medium text-foreground">Connecting</div>
              <div className="text-xs text-muted-foreground">Something real</div>
            </div>
          </div>
        </motion.div>

        {/* Story Section 2 - The Calendar */}
        <StorySection>
          <p className="text-foreground/90 text-lg leading-relaxed">
            His calendar was <span className="text-primary font-semibold">packed</span>. The man who had spent 
            five years in calculated isolation, who had built walls that seemed impenetrable, who had 
            optimized every minute of his day for career dominance...
          </p>
          <p className="text-foreground/90 text-lg leading-relaxed mt-4">
            He made space. For her.
          </p>
        </StorySection>

        {/* The Support */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="bg-card border border-border/50 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                <i className="fas fa-briefcase text-yellow-500" />
              </div>
              <h4 className="font-semibold text-foreground">Her Transition</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              She left her job. A scary leap into uncertainty. And he was there—not to rescue, 
              but to <span className="text-primary">stabilize</span>. Teaching. Supporting. Believing.
            </p>
          </div>
          <div className="bg-card border border-border/50 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <i className="fas fa-users text-primary" />
              </div>
              <h4 className="font-semibold text-foreground">Meeting Family</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              He introduced her to his family. The family he had been carrying on his shoulders. 
              That wasn't casual. That was a <span className="text-primary">statement</span>.
            </p>
          </div>
        </motion.div>

        {/* Scotch Entry */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-yellow-500/10 to-primary/10 border border-yellow-500/30 rounded-lg p-8 text-center"
        >
          <div className="text-5xl mb-4">🐕</div>
          <h3 className="text-2xl font-bold text-foreground mb-2">Enter: Scotch</h3>
          <p className="text-muted-foreground text-sm font-mono mb-4">BREED: GOLDEN_RETRIEVER</p>
          <p className="text-foreground/80">
            A golden retriever entered their life. Not just a pet—a family member. 
            A commitment that said: <span className="text-primary font-semibold italic">this is real</span>.
          </p>
        </motion.div>

        {/* Photo Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          <PhotoPlaceholder label="First Moments" aspectRatio="1/1" />
          <PhotoPlaceholder label="Together" aspectRatio="1/1" />
          <PhotoPlaceholder label="Scotch" aspectRatio="1/1" />
        </motion.div>

        {/* Concluding Quote */}
        <StorySection>
          <blockquote className="border-l-4 border-primary pl-6 py-4 bg-card/30 rounded-r-lg">
            <p className="text-xl font-serif italic text-foreground/90">
              "The glitch in the system wasn't an error—it was the only truth the algorithm 
              couldn't have predicted. Sometimes the wrong number is the right call."
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
              The Golden One
            </h3>
            <p className="text-muted-foreground text-sm">
              What's the name of the golden retriever that became part of the family?
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
              correctAnswer="scotch"
              placeholder="Enter the name..."
              hint="A type of whiskey, also a good boy"
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
              <p className="text-green-400 font-mono">CHAPTER 5 COMPLETE</p>
              <Button 
                onClick={() => navigate('/chapter/6')}
                className="bg-primary hover:bg-primary/90"
              >
                <span>Continue to Chapter 6</span>
                <i className="fas fa-arrow-right ml-2" />
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </ChapterLayout>
  );
};

export default Chapter5;
