import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChapterLayout, StorySection } from '@/components/ChapterLayout';
import { PhotoPlaceholder } from '@/components/PhotoPlaceholder';
import { TerminalBlock } from '@/components/TerminalText';
import { GlitchText } from '@/components/GlitchText';
import { ConnectHeartsGame } from '@/components/InteractiveGames';
import { ReflectionQuestions, JourneyProgress } from '@/components/ReflectionSystem';
import { useGame } from '@/context/GameContext';

const Chapter5 = () => {
  const navigate = useNavigate();
  const { chaptersUnlocked, chaptersCompleted, completeChapter } = useGame();
  const [phase, setPhase] = useState('story');
  const [gameComplete, setGameComplete] = useState(false);

  useEffect(() => {
    if (!chaptersUnlocked[4]) navigate('/chapters');
    if (chaptersCompleted[4]) setPhase('complete');
  }, [chaptersUnlocked, chaptersCompleted, navigate]);

  const handleGameSuccess = () => {
    setGameComplete(true);
    setTimeout(() => setPhase('reflection'), 1500);
  };

  const handleReflectionComplete = () => {
    completeChapter(4);
    setPhase('complete');
  };

  const reflectionQuestions = [
    {
      question: "That first night of talking - what made you keep going instead of hanging up?",
      type: 'text',
      placeholder: "What drew you in...",
    },
    {
      question: "Rate how quickly you knew she was different (1 = took time, 10 = knew instantly)",
      type: 'scale',
      scaleLabels: ['Took weeks/months', 'Knew from night one']
    },
    {
      question: "Your calendar was packed. Why did you make space for her?",
      type: 'choice',
      options: [
        "Something felt different - I couldn't explain it",
        "She understood me in a way no one had",
        "I was tired of being alone",
        "She didn't demand space - I wanted to give it",
        "The universe forced my hand (wrong number!)"
      ]
    },
    {
      question: "When you introduced her to your family, what were you really saying?",
      type: 'choice',
      options: [
        "This is serious - I want them to know her",
        "She's part of my future",
        "I trust her with the people who matter most",
        "All of the above"
      ]
    },
    {
      question: "Be honest: what do you love MOST about her?",
      type: 'text',
      placeholder: "What makes her THE ONE...",
      note: "Take your time. She will read this."
    }
  ];

  return (
    <ChapterLayout chapterNumber={5} title="The Glitch" subtitle="A Wrong Number Changes Everything">
      <div className="max-w-4xl mx-auto space-y-12">
        <JourneyProgress currentChapter={5} />

        <AnimatePresence mode="wait">
          {phase === 'story' && (
            <motion.div key="story" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12">
              
              {/* Glitch Header */}
              <div className="text-center py-8">
                <div className="text-6xl md:text-8xl font-bold mb-4">
                  <GlitchText text="ANOMALY" className="text-primary" glitchIntensity={0.3} />
                </div>
                <p className="text-sm font-mono text-muted-foreground">SYSTEM_BREACH_DETECTED: UNEXPECTED_CONNECTION</p>
              </div>

              <motion.div className="bg-card border border-primary/50 rounded-lg p-6">
                <TerminalBlock lines={[
                  { text: 'CONTACT_TYPE: WRONG_NUMBER', prefix: '> ', className: 'text-yellow-400' },
                  { text: 'IDENTITY: "WRONG_SHIVANI"', prefix: '> ' },
                  { text: 'HIS_IDENTITY: "THAT_UPGRAD_SESSION_GUY"', prefix: '> ' },
                  { text: 'FIRST_INTERACTION: TALKING_ALL_NIGHT', prefix: '> ', className: 'text-primary' },
                  { text: 'PRETENSE_LEVEL: ZERO', prefix: '> ' },
                  { text: 'CALENDAR_STATUS: PACKED', prefix: '> ' },
                  { text: 'SPACE_MADE: YES', prefix: '> ', className: 'text-green-400' },
                ]} />
              </motion.div>

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

              {/* The Night */}
              <div className="bg-card/50 border border-primary/20 rounded-lg p-8">
                <h3 className="text-sm font-mono text-primary mb-6 text-center">FIRST_NIGHT_ANALYSIS</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div className="space-y-2">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto text-2xl">🍷</div>
                    <div className="text-sm font-medium text-foreground">Drinking</div>
                    <div className="text-xs text-muted-foreground">Guards lowered</div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto text-2xl">💬</div>
                    <div className="text-sm font-medium text-foreground">Talking</div>
                    <div className="text-xs text-muted-foreground">No masks, no pretense</div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto text-2xl">❤️</div>
                    <div className="text-sm font-medium text-foreground">Connecting</div>
                    <div className="text-xs text-muted-foreground">Something real</div>
                  </div>
                </div>
              </div>

              <StorySection>
                <p className="text-foreground/90 text-lg leading-relaxed">
                  His calendar was <span className="text-primary font-semibold">packed</span>. The man who had spent 
                  five years in calculated isolation, who had built walls that seemed impenetrable...
                </p>
                <p className="text-foreground/90 text-lg leading-relaxed mt-4 font-bold">
                  He made space. <span className="text-primary">For her</span>.
                </p>
              </StorySection>

              {/* Scotch */}
              <div className="bg-gradient-to-br from-yellow-500/10 to-primary/10 border border-yellow-500/30 rounded-lg p-8 text-center">
                <div className="text-5xl mb-4">🐕</div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Enter: Scotch</h3>
                <p className="text-muted-foreground text-sm font-mono mb-4">BREED: GOLDEN_RETRIEVER</p>
                <p className="text-foreground/80">
                  A golden retriever entered their life. Not just a pet—a family member. 
                  A commitment that said: <span className="text-primary font-semibold italic">this is real</span>.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <PhotoPlaceholder label="First Moments" aspectRatio="1/1" />
                <PhotoPlaceholder label="Together" aspectRatio="1/1" />
                <PhotoPlaceholder label="Scotch" aspectRatio="1/1" />
              </div>

              <blockquote className="border-l-4 border-primary pl-6 py-4 bg-card/30 rounded-r-lg">
                <p className="text-xl font-serif italic text-foreground/90">
                  "The glitch in the system wasn't an error—it was the only truth the algorithm 
                  couldn't have predicted. Sometimes the wrong number is the right call."
                </p>
              </blockquote>

              <div className="text-center py-8">
                <Button onClick={() => setPhase('game')} size="lg" className="bg-primary hover:bg-primary/90 px-8 py-6 text-lg">
                  <i className="fas fa-heart mr-3" />
                  Play: Connect Hearts
                </Button>
                <p className="text-xs text-muted-foreground mt-3">Draw a line to connect the two hearts</p>
              </div>
            </motion.div>
          )}

          {phase === 'game' && (
            <motion.div key="game" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-foreground">Connect Hearts</h2>
                <p className="text-muted-foreground mt-2">Draw a line from 💙 to 💖 to make the connection</p>
              </div>

              <ConnectHeartsGame onSuccess={handleGameSuccess} />

              {gameComplete && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                  <p className="text-green-400 font-bold">Hearts connected! Loading reflections...</p>
                </motion.div>
              )}
            </motion.div>
          )}

          {phase === 'reflection' && (
            <motion.div key="reflection" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-foreground">The Connection</h2>
                <p className="text-muted-foreground mt-2">This is where everything changed. Let's explore why.</p>
              </div>

              <ReflectionQuestions
                questions={reflectionQuestions}
                onComplete={handleReflectionComplete}
                reflectionPrompt="A wrong number. A random glitch. And suddenly your entire world shifted. What made her different from everyone else?"
              />
            </motion.div>
          )}

          {phase === 'complete' && (
            <motion.div key="complete" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12 space-y-6">
              <div className="w-24 h-24 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center mx-auto">
                <i className="fas fa-heart text-4xl text-green-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Chapter 5 Complete</h2>
                <p className="text-muted-foreground">The glitch became destiny. Now comes building together.</p>
              </div>
              <Button onClick={() => navigate('/chapter/6')} size="lg" className="bg-primary hover:bg-primary/90">
                Continue to Chapter 6 <i className="fas fa-arrow-right ml-2" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ChapterLayout>
  );
};

export default Chapter5;
