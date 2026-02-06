import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChapterLayout, StorySection } from '@/components/ChapterLayout';
import { GlitchText } from '@/components/GlitchText';
import { DayCompletionPage } from '@/components/DayCompletion';
import { SecretHint } from '@/components/SecretHint';
import { useGame } from '@/context/GameContext';

const Protocol006 = () => {
  const navigate = useNavigate();
  const { chaptersCompleted, completeChapter, findEasterEgg, easterEggsFound } = useGame();
  const [phase, setPhase] = useState(chaptersCompleted[5] ? 'complete' : 'story');
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [memoryAnswer, setMemoryAnswer] = useState('');
  const [showError, setShowError] = useState(false);
  const [memorySolved, setMemorySolved] = useState(false);
  const [selectedMoments, setSelectedMoments] = useState([]);

  const handleMemorySubmit = () => {
    const answer = memoryAnswer.toUpperCase().trim();
    if (['DIWALI', 'DEEPAWALI', 'DEEPAVALI'].includes(answer)) {
      setMemorySolved(true);
      setTimeout(() => setPhase('moments'), 1500);
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 1000);
    }
  };

  const handleMomentSelect = (moment) => {
    if (selectedMoments.includes(moment)) {
      setSelectedMoments(selectedMoments.filter(m => m !== moment));
    } else {
      const newSelected = [...selectedMoments, moment];
      setSelectedMoments(newSelected);
      if (newSelected.length >= 3) {
        setTimeout(() => setPhase('reflection'), 1500);
      }
    }
  };

  const handleReflectionComplete = () => {
    completeChapter(5);
    setPhase('complete');
  };

  const handleEasterEggFind = () => {
    findEasterEgg(5);
    setShowEasterEgg(true);
  };

  const hasFoundEgg = easterEggsFound?.includes(5);

  const anchorMoments = [
    { emoji: '🎂', title: 'Her Birthday', desc: 'When her world was falling apart, you made sure she wasn\'t alone', id: 'birthday' },
    { emoji: '🪔', title: 'Diwali', desc: 'You chose her over going home to family', id: 'diwali' },
    { emoji: '🎬', title: 'Every Movie', desc: 'Drove hours just to watch what she wanted', id: 'movies' },
    { emoji: '😢', title: 'Every Tear', desc: 'Dropped everything. Showed up. Held the space.', id: 'tears' },
    { emoji: '📞', title: 'Late Night Calls', desc: 'Always answered, no matter the hour', id: 'calls' },
    { emoji: '🏠', title: 'Long Drives', desc: 'Just to see her smile for a few hours', id: 'drives' },
  ];

  return (
    <ChapterLayout
      chapterNumber={6}
      title="PROTOCOL_006"
      subtitle="ANCHOR"
      date="CLASSIFIED"
    >
      <div className="max-w-4xl mx-auto space-y-12">
        <AnimatePresence mode="wait">
          {phase === 'story' && (
            <motion.div
              key="story"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-12"
            >
              <div className="text-center py-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-6xl mb-6"
                >
                  🤗
                </motion.div>
                <h2 className="text-2xl md:text-3xl font-mono text-foreground">
                  <GlitchText text="ANCHOR POINTS DETECTED" className="text-blue-400" glitchIntensity={0.3} />
                </h2>
                <p className="text-muted-foreground mt-2">
                  The moments that held her steady
                </p>
              </div>

              <StorySection>
                <p className="text-foreground/90 text-lg leading-relaxed font-mono text-center">
                  You think you're not romantic.<br/>
                  You're wrong.<br/>
                  <span className="text-primary font-bold">Let her show you what she sees.</span>
                </p>
              </StorySection>

              {/* Visual: Couple hugging */}
              <div className="text-center py-4">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-6xl"
                >
                  🫂💕
                </motion.div>
                <p className="text-sm text-muted-foreground mt-2 font-serif italic">
                  "A hug says what words cannot"
                </p>
              </div>

              {/* Memory Puzzle */}
              <div className="bg-card border border-orange-500/30 rounded-lg p-8">
                <div className="text-center mb-6">
                  <div className="text-3xl mb-4">🪔</div>
                  <h3 className="text-xl font-bold font-mono text-orange-400">DECODE THE FESTIVAL</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Which festival did you skip going home for—to be with her?
                  </p>
                </div>

                <div className="flex gap-3 max-w-sm mx-auto">
                  <input
                    type="text"
                    value={memoryAnswer}
                    onChange={(e) => setMemoryAnswer(e.target.value)}
                    placeholder="Festival name..."
                    className={`flex-1 bg-background border rounded-lg px-4 py-3 font-mono text-center ${showError ? 'border-destructive' : 'border-border'}`}
                    onKeyDown={(e) => e.key === 'Enter' && handleMemorySubmit()}
                  />
                  <Button onClick={handleMemorySubmit} className="bg-primary hover:bg-primary/90">
                    <i className="fas fa-check" />
                  </Button>
                </div>

                {memorySolved && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-green-400 font-mono mt-4"
                  >
                    ✓ CORRECT: You chose her over tradition
                  </motion.p>
                )}
              </div>

              {/* Hidden Easter Egg */}
              <SecretHint 
                onClick={handleEasterEggFind} 
                found={hasFoundEgg} 
                fragmentNumber={6} 
              />
            </motion.div>
          )}

          {phase === 'moments' && (
            <motion.div
              key="moments"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              <div className="text-center">
                <div className="text-5xl mb-4">💝</div>
                <h2 className="text-2xl font-bold font-mono text-foreground">RECALL THE ANCHORS</h2>
                <p className="text-muted-foreground mt-2">Select the moments you remember (choose 3)</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {anchorMoments.map((moment) => (
                  <motion.button
                    key={moment.id}
                    onClick={() => handleMomentSelect(moment.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-4 rounded-lg border text-left transition-all ${
                      selectedMoments.includes(moment.id)
                        ? 'bg-primary/20 border-primary'
                        : 'bg-card border-border hover:border-pink-400'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{moment.emoji}</span>
                      <div>
                        <h4 className="font-bold text-foreground">{moment.title}</h4>
                        <p className="text-sm text-muted-foreground">{moment.desc}</p>
                      </div>
                      {selectedMoments.includes(moment.id) && (
                        <i className="fas fa-heart text-primary ml-auto" />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>

              <p className="text-center text-sm text-muted-foreground">
                {selectedMoments.length}/3 moments selected
              </p>
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
                <div className="text-5xl mb-4">💭</div>
                <h2 className="text-2xl font-bold font-mono text-foreground">REFLECTION_PROTOCOL</h2>
              </div>

              <div className="space-y-6 max-w-xl mx-auto">
                <div className="bg-card border border-border rounded-lg p-6">
                  <p className="text-foreground mb-4">
                    That Diwali when you didn't go home—what message were you sending?
                  </p>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      'She belongs with me',
                      'I wanted her to feel loved',
                      'We were building our own traditions',
                      'She needed me more',
                      'All of the above'
                    ].map((option) => (
                      <button
                        key={option}
                        className="bg-background border border-border rounded-lg px-4 py-3 text-sm hover:border-primary transition-colors text-left"
                        onClick={handleReflectionComplete}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {phase === 'complete' && (
            <DayCompletionPage
              dayIndex={5}
              onContinue={() => navigate('/protocol-007')}
              nextDayName="PROTOCOL_007: REVELATION"
            />
          )}
        </AnimatePresence>

        {/* Easter Egg Modal */}
        <AnimatePresence>
          {showEasterEgg && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowEasterEgg(false)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-card border border-primary rounded-lg p-8 max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">💎</div>
                  <h3 className="text-lg font-bold text-primary mb-4">SECRET FRAGMENT #6</h3>
                  <div className="bg-background/50 rounded-lg p-4 mb-4">
                    <p className="text-foreground/80 font-serif italic text-sm leading-relaxed">
                      "I want to be his happy wife,<br/>
                      soft, radiant, & deeply loved.<br/>
                      A woman who glows with joy,<br/>
                      who submits not out of weakness,<br/>
                      but out of trust."
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    This is her dream. And you're the only one who can give it.
                  </p>
                  <Button onClick={() => setShowEasterEgg(false)} className="mt-4" variant="outline">
                    Continue
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ChapterLayout>
  );
};

export default Protocol006;
