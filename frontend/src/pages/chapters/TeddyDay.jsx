import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChapterLayout, StorySection } from '@/components/ChapterLayout';
import { TerminalBlock } from '@/components/TerminalText';
import { GlitchText } from '@/components/GlitchText';
import { ConnectHeartsGame } from '@/components/InteractiveGames';
import { ReflectionQuestions, JourneyProgress } from '@/components/ReflectionSystem';
import { useGame } from '@/context/GameContext';

const TeddyDay = () => {
  const navigate = useNavigate();
  const { chaptersCompleted, completeChapter } = useGame();
  const [phase, setPhase] = useState(chaptersCompleted[3] ? 'complete' : 'story');
  const [gameComplete, setGameComplete] = useState(false);

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
      question: "That night when you called the 'wrong Shivani' - what made you keep talking?",
      type: 'text',
      placeholder: "What made you not hang up...",
    },
    {
      question: "Rate how quickly you knew I was different from everyone else",
      type: 'scale',
      scaleLabels: ['Took time to realize', 'Knew from that first call']
    },
    {
      question: "Be honest: when did you first think 'she might be the one'?",
      type: 'choice',
      options: [
        "That first night of talking",
        "When I realized you actually understood me",
        "When I caught myself making time for you",
        "I'm still figuring it out (liar 😉)",
        "Somewhere between 'wrong number' and 'I can't stop thinking about her'"
      ],
      note: "I really want to know 💕"
    },
  ];

  return (
    <ChapterLayout
      chapterNumber={4}
      title="Teddy Day"
      subtitle="🧸 The Wrong Shivani"
      date="February 10"
    >
      <div className="max-w-4xl mx-auto space-y-12">
        <JourneyProgress currentChapter={4} totalChapters={8} />

        <AnimatePresence mode="wait">
          {phase === 'story' && (
            <motion.div
              key="story"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-12"
            >
              {/* Opening */}
              <div className="text-center py-8">
                <div className="text-6xl md:text-8xl font-bold mb-4">
                  <GlitchText text="GLITCH" className="text-primary" glitchIntensity={0.3} />
                </div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-7xl mb-6"
                >
                  🧸
                </motion.div>
                <h2 className="text-2xl md:text-3xl font-serif italic text-foreground/80">
                  "The best things in life happen by accident"
                </h2>
              </div>

              <motion.div className="bg-card border border-primary/50 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4 text-xs font-mono text-primary">
                  <i className="fas fa-bug" />
                  <span>SYSTEM_ANOMALY_DETECTED</span>
                </div>
                <TerminalBlock
                  lines={[
                    { text: 'EVENT: WRONG_NUMBER_CALL', prefix: '> ', className: 'text-yellow-400' },
                    { text: 'CALLER: ARGHA (UpGrad Alumni)', prefix: '> ' },
                    { text: 'INTENDED: "Other Shivani" (Mumbai)', prefix: '> ', className: 'text-muted-foreground' },
                    { text: 'RECEIVED: SHIVANI (Bangalore)', prefix: '> ', className: 'text-primary' },
                    { text: 'HER_STATUS: "I know who you are"', prefix: '> ', className: 'text-green-400' },
                    { text: 'DURATION: ALL_NIGHT', prefix: '> ', className: 'text-pink-400' },
                    { text: 'OUTCOME: DESTINY', prefix: '> ', className: 'text-primary' },
                  ]}
                />
              </motion.div>

              <StorySection>
                <p className="text-foreground/90 text-lg leading-relaxed">
                  You were famous in UpGrad. <span className="text-primary font-semibold">"That UpGrad session guy"</span>—
                  the alumni everyone wanted to learn from. And one night, you called a Shivani.
                </p>
                <p className="text-foreground/90 text-lg leading-relaxed mt-4">
                  Just not the one you intended.
                </p>
              </StorySection>

              {/* The Wrong Number Story */}
              <div className="bg-gradient-to-br from-pink-500/10 to-primary/10 border border-pink-500/30 rounded-lg p-8">
                <h3 className="text-xl font-bold text-center text-foreground mb-6">The Conversation</h3>
                
                <div className="space-y-4 max-w-md mx-auto">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                      <span className="text-sm">A</span>
                    </div>
                    <div className="bg-card rounded-lg rounded-tl-none p-3 text-sm">
                      "Hey, are you in Bangalore? We should meet."
                    </div>
                  </div>
                  
                  <div className="flex gap-3 justify-end">
                    <div className="bg-primary/20 rounded-lg rounded-tr-none p-3 text-sm">
                      "I think you have the wrong Shivani... but I know who you are. 😏"
                    </div>
                    <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center shrink-0">
                      <span className="text-sm">S</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                      <span className="text-sm">A</span>
                    </div>
                    <div className="bg-card rounded-lg rounded-tl-none p-3 text-sm">
                      "You know who I am?"
                    </div>
                  </div>
                  
                  <div className="flex gap-3 justify-end">
                    <div className="bg-primary/20 rounded-lg rounded-tr-none p-3 text-sm">
                      "The famous UpGrad session guy? Of course. 😊"
                    </div>
                    <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center shrink-0">
                      <span className="text-sm">S</span>
                    </div>
                  </div>
                </div>

                <p className="text-center text-primary font-medium mt-6 italic">
                  And then you talked. All night. No pretense. Just... connection.
                </p>
              </div>

              {/* The Night */}
              <div className="bg-card/50 border border-primary/20 rounded-lg p-8">
                <h3 className="text-sm font-mono text-primary mb-6 text-center">THAT_FIRST_NIGHT</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div className="space-y-2">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto text-2xl">🍷</div>
                    <div className="text-sm font-medium text-foreground">Drinking</div>
                    <div className="text-xs text-muted-foreground">Guards lowered</div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto text-2xl">💬</div>
                    <div className="text-sm font-medium text-foreground">Talking</div>
                    <div className="text-xs text-muted-foreground">No masks</div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto text-2xl">✨</div>
                    <div className="text-sm font-medium text-foreground">Connecting</div>
                    <div className="text-xs text-muted-foreground">Something real</div>
                  </div>
                </div>
              </div>

              <StorySection>
                <p className="text-foreground/90 text-lg leading-relaxed">
                  Your calendar was <span className="text-primary font-semibold">packed</span>. The man who had 
                  spent years in calculated isolation, who had built walls that seemed impenetrable...
                </p>
                <p className="text-foreground/90 text-lg leading-relaxed mt-4 text-2xl font-bold text-center">
                  Made space. <span className="text-primary">For me.</span>
                </p>
              </StorySection>

              {/* Shivani Info */}
              <div className="bg-gradient-to-br from-indigo-500/10 to-pink-500/10 border border-pink-500/30 rounded-lg p-8">
                <h3 className="text-sm font-mono text-pink-400 mb-4 text-center">THE_RIGHT_SHIVANI</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl mb-2">📍</div>
                    <div className="text-sm font-medium text-foreground">Indore</div>
                    <div className="text-xs text-muted-foreground">Origin</div>
                  </div>
                  <div>
                    <div className="text-2xl mb-2">🎂</div>
                    <div className="text-sm font-medium text-foreground">14 May 1998</div>
                    <div className="text-xs text-muted-foreground">Birthday</div>
                  </div>
                  <div>
                    <div className="text-2xl mb-2">💚</div>
                    <div className="text-sm font-medium text-foreground">Pure Veg</div>
                    <div className="text-xs text-muted-foreground">Food</div>
                  </div>
                  <div>
                    <div className="text-2xl mb-2">💖</div>
                    <div className="text-sm font-medium text-foreground">Emotional</div>
                    <div className="text-xs text-muted-foreground">Heart</div>
                  </div>
                </div>
              </div>

              <blockquote className="border-l-4 border-primary pl-6 py-4 bg-card/30 rounded-r-lg">
                <p className="text-xl font-serif italic text-foreground/90">
                  "The glitch in the system wasn't an error. It was destiny correcting course. 
                  Sometimes the <span className="text-primary">wrong number</span> is the 
                  <span className="text-pink-400"> right call</span>."
                </p>
              </blockquote>

              {/* Message from Shivani */}
              <div className="bg-gradient-to-br from-pink-500/10 to-primary/10 border border-pink-500/30 rounded-lg p-8 text-center">
                <div className="text-3xl mb-4">🧸💕</div>
                <p className="text-foreground/90 font-serif italic text-lg">
                  "Argha, you called the wrong Shivani that night. But I think we both know by now... 
                  you found the <span className="text-primary font-bold">right one</span>."
                </p>
                <p className="text-pink-400 font-medium mt-4">— Your favorite 'wrong number' 💕</p>
              </div>

              <div className="text-center py-8">
                <Button
                  onClick={() => setPhase('game')}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 px-8 py-6 text-lg"
                >
                  <i className="fas fa-heart mr-3" />
                  Play: Connect Hearts
                </Button>
                <p className="text-xs text-muted-foreground mt-3">
                  Draw the line that connected us
                </p>
              </div>
            </motion.div>
          )}

          {phase === 'game' && (
            <motion.div
              key="game"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              <div className="text-center">
                <div className="text-5xl mb-4">🧸</div>
                <h2 className="text-2xl font-bold text-foreground">Connect Hearts</h2>
                <p className="text-muted-foreground mt-2">Draw from 💙 to 💖</p>
              </div>

              <ConnectHeartsGame onSuccess={handleGameSuccess} />

              {gameComplete && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center"
                >
                  <p className="text-green-400 font-bold">Connected! 💕</p>
                </motion.div>
              )}
            </motion.div>
          )}

          {phase === 'reflection' && (
            <motion.div
              key="reflection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              <div className="text-center mb-8">
                <div className="text-5xl mb-4">🧸</div>
                <h2 className="text-2xl font-bold text-foreground">The Connection</h2>
                <p className="text-muted-foreground mt-2">
                  Tell me about that night, Argha...
                </p>
              </div>

              <ReflectionQuestions
                questions={reflectionQuestions}
                onComplete={handleReflectionComplete}
                reflectionPrompt="A wrong number. A random call. And suddenly your whole world shifted. What happened that night that made you keep talking?"
              />
            </motion.div>
          )}

          {phase === 'complete' && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 space-y-6"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: 2 }}
                className="text-7xl"
              >
                🧸
              </motion.div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Teddy Day Complete</h2>
                <p className="text-muted-foreground">
                  The glitch became destiny. Tomorrow, let's talk about our differences...
                </p>
              </div>

              <Button
                onClick={() => navigate('/promise-day')}
                size="lg"
                className="bg-primary hover:bg-primary/90"
              >
                Continue to Promise Day
                <i className="fas fa-arrow-right ml-2" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ChapterLayout>
  );
};

export default TeddyDay;
