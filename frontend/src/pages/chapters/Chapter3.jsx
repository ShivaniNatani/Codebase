import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChapterLayout, StorySection } from '@/components/ChapterLayout';
import { PhotoPlaceholder } from '@/components/PhotoPlaceholder';
import { TerminalBlock } from '@/components/TerminalText';
import { GlitchText } from '@/components/GlitchText';
import { ShieldDefenseGame } from '@/components/InteractiveGames';
import { ReflectionQuestions, JourneyProgress } from '@/components/ReflectionSystem';
import { useGame } from '@/context/GameContext';

const Chapter3 = () => {
  const navigate = useNavigate();
  const { chaptersUnlocked, chaptersCompleted, completeChapter } = useGame();
  const [phase, setPhase] = useState('story');
  const [gameComplete, setGameComplete] = useState(false);

  useEffect(() => {
    if (!chaptersUnlocked[2]) navigate('/chapters');
    if (chaptersCompleted[2]) setPhase('complete');
  }, [chaptersUnlocked, chaptersCompleted, navigate]);

  const handleGameSuccess = () => {
    setGameComplete(true);
    setTimeout(() => setPhase('reflection'), 1500);
  };

  const handleReflectionComplete = () => {
    completeChapter(2);
    setPhase('complete');
  };

  const reflectionQuestions = [
    {
      question: "After everything you gave - the 30km commutes, teaching Java, exhausting yourself for love - how did the betrayal change your view of trust?",
      type: 'text',
      placeholder: "How did it change you...",
    },
    {
      question: "Rate how much the betrayal affected your ability to open up to someone new (1 = barely affected, 10 = completely shut down)",
      type: 'scale',
      scaleLabels: ['Barely affected', 'Completely changed me']
    },
    {
      question: "What did you learn from that relationship that you carry into this one?",
      type: 'choice',
      options: [
        "Trust must be earned, not given freely",
        "Actions matter more than words",
        "I need to protect my energy",
        "Love alone isn't enough - it needs to be reciprocated",
        "All of the above"
      ]
    },
    {
      question: "When you met her (the right one), were you afraid of getting hurt again?",
      type: 'choice',
      options: [
        "Terrified - but I took the risk anyway",
        "Yes, but something felt different this time",
        "I had walls up but she broke through",
        "I didn't let myself think about it"
      ]
    },
    {
      question: "What made you decide SHE was worth letting your guard down for?",
      type: 'text',
      placeholder: "What made her different...",
      note: "This answer matters the most."
    }
  ];

  return (
    <ChapterLayout chapterNumber={3} title="Break" subtitle="Love, Betrayal & Emotional Armor">
      <div className="max-w-4xl mx-auto space-y-12">
        <JourneyProgress currentChapter={3} />

        <AnimatePresence mode="wait">
          {phase === 'story' && (
            <motion.div key="story" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12">
              
              {/* Warning */}
              <div className="text-center py-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded bg-destructive/10 border border-destructive/30">
                  <i className="fas fa-exclamation-triangle text-destructive" />
                  <span className="text-sm font-mono text-destructive">SENSITIVE_MEMORY_FRAGMENT</span>
                </div>
              </div>

              <motion.div className="bg-card border border-destructive/30 rounded-lg p-6">
                <TerminalBlock lines={[
                  { text: 'RELATIONSHIP_STATUS: INITIATED', prefix: '> ' },
                  { text: 'DAILY_COMMUTE: 30-35 KM (ONE WAY)', prefix: '> ', className: 'text-yellow-400' },
                  { text: 'ACTIVITY: TEACHING_JAVA', prefix: '> ' },
                  { text: 'HER_RESULT: TOP_PERFORMER', prefix: '> ', className: 'text-green-400' },
                  { text: 'HIS_SACRIFICE: EVERYTHING', prefix: '> ', className: 'text-primary' },
                  { text: 'OUTCOME: DOUBLE_DATING', prefix: '> ', className: 'text-destructive' },
                ]} />
              </motion.div>

              <StorySection>
                <p className="text-foreground/90 text-lg leading-relaxed">
                  First love doesn't arrive with warnings. It arrives with <span className="text-primary">conviction</span>. 
                  He believed in it the way he believed in code—completely, logically, devotedly.
                </p>
                <p className="text-foreground/90 text-lg leading-relaxed mt-4">
                  <span className="font-bold text-primary">30-35 kilometers. Every single day.</span> That wasn't commuting. 
                  That was a statement. That was a man showing up when showing up was hard.
                </p>
              </StorySection>

              {/* The sacrifice stats */}
              <div className="bg-card/50 border border-primary/20 rounded-lg p-8">
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div><div className="text-3xl font-bold text-primary">30-35</div><div className="text-xs text-muted-foreground">KM DAILY</div></div>
                  <div><div className="text-3xl font-bold text-foreground">2+</div><div className="text-xs text-muted-foreground">HOURS TRAVEL</div></div>
                  <div><div className="text-3xl font-bold text-foreground">365</div><div className="text-xs text-muted-foreground">DAYS/YEAR</div></div>
                </div>
              </div>

              <StorySection>
                <p className="text-foreground/90 text-lg leading-relaxed">
                  He taught her Java. Not because she asked nicely, but because he wanted her to 
                  <span className="text-primary font-semibold"> succeed</span>. Every concept explained, 
                  every problem debugged, every late-night doubt cleared. His knowledge became her weapon.
                </p>
                <p className="text-muted-foreground text-lg mt-4 font-serif italic">
                  She topped. He didn't even notice his own exhaustion.
                </p>
              </StorySection>

              {/* The Break */}
              <div className="py-12 text-center">
                <div className="text-6xl md:text-8xl font-bold">
                  <GlitchText text="BETRAYAL" className="text-destructive" glitchIntensity={0.4} />
                </div>
                <p className="text-sm font-mono text-muted-foreground mt-4">TRUST_PROTOCOL: TERMINATED</p>
              </div>

              <StorySection>
                <p className="text-foreground/90 text-lg leading-relaxed">
                  Double dating. The words don't capture the weight. It wasn't just infidelity—it was 
                  the systematic exploitation of someone who gave everything.
                </p>
              </StorySection>

              {/* Transformation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card border border-destructive/30 rounded-lg p-6">
                  <h4 className="text-sm font-mono text-destructive mb-4">BEFORE</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><i className="fas fa-heart text-destructive/50 mr-2" />Open, trusting</li>
                    <li><i className="fas fa-hand-holding-heart text-destructive/50 mr-2" />Gave without limits</li>
                    <li><i className="fas fa-eye text-destructive/50 mr-2" />Saw the best in people</li>
                  </ul>
                </div>
                <div className="bg-card border border-primary/30 rounded-lg p-6">
                  <h4 className="text-sm font-mono text-primary mb-4">AFTER</h4>
                  <ul className="space-y-2 text-sm text-foreground">
                    <li><i className="fas fa-shield-alt text-primary mr-2" />Emotionally armored</li>
                    <li><i className="fas fa-balance-scale text-primary mr-2" />Trust is earned</li>
                    <li><i className="fas fa-brain text-primary mr-2" />Patterns recognized</li>
                  </ul>
                </div>
              </div>

              <blockquote className="border-l-4 border-primary pl-6 py-4 bg-card/30 rounded-r-lg">
                <p className="text-xl font-serif italic text-foreground/90">
                  "The collapse wasn't weakness. The armor that formed wasn't coldness. 
                  It was evolution. He didn't become bitter—he became 
                  <span className="text-primary"> precise</span>."
                </p>
              </blockquote>

              <div className="text-center py-8">
                <Button onClick={() => setPhase('game')} size="lg" className="bg-primary hover:bg-primary/90 px-8 py-6 text-lg">
                  <i className="fas fa-shield-alt mr-3" />
                  Play: Shield Defense
                </Button>
                <p className="text-xs text-muted-foreground mt-3">Defend your heart from incoming betrayal. Block 20 attacks!</p>
              </div>
            </motion.div>
          )}

          {phase === 'game' && (
            <motion.div key="game" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-8">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
                  <i className="fas fa-gamepad text-primary" />
                  <span className="text-sm font-mono text-primary">CHAPTER 3 CHALLENGE</span>
                </div>
                <h2 className="text-2xl font-bold text-foreground">Shield Defense</h2>
                <p className="text-muted-foreground mt-2">Move mouse to rotate shield. Block 20 attacks to forge your armor!</p>
              </div>

              <ShieldDefenseGame onSuccess={handleGameSuccess} />

              {gameComplete && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                  <p className="text-green-400 font-bold">Armor forged! Loading reflections...</p>
                </motion.div>
              )}
            </motion.div>
          )}

          {phase === 'reflection' && (
            <motion.div key="reflection" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-foreground">The Hardest Questions</h2>
                <p className="text-muted-foreground mt-2">This chapter hurt. But it also shaped everything that came after.</p>
              </div>

              <ReflectionQuestions
                questions={reflectionQuestions}
                onComplete={handleReflectionComplete}
                reflectionPrompt="The betrayal broke something. But it also built something stronger. Before you can fully love someone new, you need to understand what that pain taught you."
              />
            </motion.div>
          )}

          {phase === 'complete' && (
            <motion.div key="complete" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12 space-y-6">
              <div className="w-24 h-24 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center mx-auto">
                <i className="fas fa-shield-alt text-4xl text-green-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Chapter 3 Complete</h2>
                <p className="text-muted-foreground">The armor is forged. You emerged stronger.</p>
              </div>
              <Button onClick={() => navigate('/chapter/4')} size="lg" className="bg-primary hover:bg-primary/90">
                Continue to Chapter 4 <i className="fas fa-arrow-right ml-2" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ChapterLayout>
  );
};

export default Chapter3;
