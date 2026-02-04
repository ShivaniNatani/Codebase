import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChapterLayout, StorySection, DataFragment } from '@/components/ChapterLayout';
import { PhotoPlaceholder } from '@/components/PhotoPlaceholder';
import { PuzzleInput } from '@/components/PuzzleInput';
import { TerminalBlock } from '@/components/TerminalText';
import { GlitchText } from '@/components/GlitchText';
import { useGame } from '@/context/GameContext';

const Chapter3 = () => {
  const navigate = useNavigate();
  const { chaptersUnlocked, chaptersCompleted, completeChapter } = useGame();
  const [puzzleSolved, setPuzzleSolved] = useState(chaptersCompleted[2]);
  const [showPuzzle, setShowPuzzle] = useState(false);

  if (!chaptersUnlocked[2]) {
    navigate('/chapters');
    return null;
  }

  const handlePuzzleSuccess = () => {
    setPuzzleSolved(true);
    completeChapter(2);
  };

  return (
    <ChapterLayout
      chapterNumber={3}
      title="Break"
      subtitle="Love, Betrayal & Emotional Armor"
    >
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Warning Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded bg-destructive/10 border border-destructive/30">
            <i className="fas fa-exclamation-triangle text-destructive" />
            <span className="text-sm font-mono text-destructive">SENSITIVE_MEMORY_FRAGMENT</span>
          </div>
        </motion.div>

        {/* Opening Terminal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-card border border-destructive/30 rounded-lg p-6"
        >
          <div className="flex items-center gap-2 mb-4 text-xs font-mono text-muted-foreground">
            <i className="fas fa-heart-crack text-destructive" />
            <span>MEMORY_FRAGMENT_003 [CLASSIFIED]</span>
          </div>
          <TerminalBlock
            lines={[
              { text: 'RELATIONSHIP_STATUS: INITIATED', prefix: '> ' },
              { text: 'DAILY_COMMUTE: 30-35 KM (ONE WAY)', prefix: '> ', className: 'text-yellow-400' },
              { text: 'ACTIVITY: TEACHING_JAVA', prefix: '> ' },
              { text: 'HER_RESULT: TOP_PERFORMER', prefix: '> ', className: 'text-green-400' },
              { text: 'HIS_SACRIFICE: EVERYTHING', prefix: '> ', className: 'text-primary' },
              { text: 'OUTCOME: ████████████', prefix: '> ', className: 'text-destructive' },
            ]}
          />
        </motion.div>

        {/* Story Section 1 */}
        <StorySection>
          <p className="text-foreground/90 text-lg leading-relaxed">
            First love doesn't arrive with warnings. It arrives with <span className="text-primary">conviction</span>. 
            He believed in it the way he believed in code—completely, logically, devotedly.
          </p>
          <p className="text-foreground/90 text-lg leading-relaxed mt-4">
            <span className="font-semibold">30-35 kilometers. Every single day.</span> That wasn't commuting. 
            That was a statement. That was a man showing up when showing up was hard.
          </p>
        </StorySection>

        {/* The Distance Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card/50 border border-border rounded-lg p-8"
        >
          <h3 className="text-sm font-mono text-primary mb-6 flex items-center gap-2">
            <i className="fas fa-route" />
            COMMUTE_ANALYSIS
          </h3>
          <div className="flex items-center justify-between mb-4">
            <div className="text-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2" />
              <span className="text-xs font-mono text-muted-foreground">START</span>
            </div>
            <div className="flex-1 mx-4 h-1 bg-gradient-to-r from-green-500 via-yellow-500 to-primary rounded" />
            <div className="text-center">
              <div className="w-3 h-3 bg-primary rounded-full mx-auto mb-2" />
              <span className="text-xs font-mono text-muted-foreground">END</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center text-sm">
            <div>
              <div className="text-2xl font-bold text-foreground">30-35</div>
              <div className="text-xs text-muted-foreground">KM DAILY</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">2+</div>
              <div className="text-xs text-muted-foreground">HOURS TRAVEL</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">365</div>
              <div className="text-xs text-muted-foreground">DAYS/YEAR</div>
            </div>
          </div>
        </motion.div>

        {/* Story Section 2 - The Teaching */}
        <StorySection>
          <p className="text-foreground/90 text-lg leading-relaxed">
            He taught her Java. Not because she asked nicely, but because he wanted her to 
            <span className="text-primary font-semibold"> succeed</span>. Every concept explained, 
            every problem debugged, every late-night doubt cleared. His knowledge became her weapon.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed mt-4 font-serif italic">
            She topped. He didn't even notice his own exhaustion.
          </p>
        </StorySection>

        {/* The Break - Glitch Effect */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="py-12 text-center"
        >
          <div className="text-6xl md:text-8xl font-bold">
            <GlitchText 
              text="BETRAYAL" 
              className="text-destructive" 
              glitchIntensity={0.4}
            />
          </div>
          <p className="text-sm font-mono text-muted-foreground mt-4">
            TRUST_PROTOCOL: TERMINATED
          </p>
        </motion.div>

        {/* Story Section 3 - The Truth */}
        <StorySection>
          <p className="text-foreground/90 text-lg leading-relaxed">
            Double dating. The words don't capture the weight. It wasn't just infidelity—it was 
            the systematic exploitation of someone who gave everything. He discovered the truth 
            not through suspicion, but through the cruel arithmetic of inconsistencies.
          </p>
        </StorySection>

        {/* The Transformation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <div className="bg-card border border-destructive/30 rounded-lg p-6">
            <h4 className="text-sm font-mono text-destructive mb-4">BEFORE</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <i className="fas fa-heart text-destructive/50" />
                <span>Open, trusting</span>
              </li>
              <li className="flex items-center gap-2">
                <i className="fas fa-hand-holding-heart text-destructive/50" />
                <span>Gave without limits</span>
              </li>
              <li className="flex items-center gap-2">
                <i className="fas fa-eye text-destructive/50" />
                <span>Saw the best in people</span>
              </li>
            </ul>
          </div>
          <div className="bg-card border border-primary/30 rounded-lg p-6">
            <h4 className="text-sm font-mono text-primary mb-4">AFTER</h4>
            <ul className="space-y-2 text-sm text-foreground">
              <li className="flex items-center gap-2">
                <i className="fas fa-shield-alt text-primary" />
                <span>Emotionally armored</span>
              </li>
              <li className="flex items-center gap-2">
                <i className="fas fa-balance-scale text-primary" />
                <span>Trust is earned, not given</span>
              </li>
              <li className="flex items-center gap-2">
                <i className="fas fa-brain text-primary" />
                <span>Patterns recognized</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Concluding Section */}
        <StorySection>
          <blockquote className="border-l-4 border-primary pl-6 py-4 bg-card/30 rounded-r-lg">
            <p className="text-xl font-serif italic text-foreground/90">
              "The collapse wasn't weakness. The armor that formed wasn't coldness. 
              It was evolution. He didn't become bitter—he became 
              <span className="text-primary"> precise</span>."
            </p>
          </blockquote>
          <p className="text-muted-foreground text-sm mt-6 text-center font-mono">
            EMOTIONAL_STATE: STEEL
          </p>
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
              The Programming Language of Love
            </h3>
            <p className="text-muted-foreground text-sm">
              What did he teach her that helped her succeed?
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
              correctAnswer="java"
              placeholder="Enter the language..."
              hint="Write once, run anywhere"
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
              <p className="text-green-400 font-mono">CHAPTER 3 COMPLETE</p>
              <p className="text-xs text-muted-foreground">
                The armor was forged. The man was ready for what came next.
              </p>
              <Button 
                onClick={() => navigate('/chapter/4')}
                className="bg-primary hover:bg-primary/90"
              >
                <span>Continue to Chapter 4</span>
                <i className="fas fa-arrow-right ml-2" />
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </ChapterLayout>
  );
};

export default Chapter3;
