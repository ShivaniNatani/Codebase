import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useGame } from '@/context/GameContext';

const MidwayCheckpointPage = () => {
  const navigate = useNavigate();
  const { chaptersCompleted, midwayCheckpointSeen, markMidwayCheckpointSeen } = useGame();
  const [currentLine, setCurrentLine] = useState(0);
  const [showFinal, setShowFinal] = useState(false);
  const [showButton, setShowButton] = useState(false);

  // Check if user should be here (completed first 4 chapters)
  const canAccessCheckpoint = chaptersCompleted.slice(0, 4).every(Boolean);

  useEffect(() => {
    if (!canAccessCheckpoint) {
      navigate('/chapters');
      return;
    }
  }, [canAccessCheckpoint, navigate]);

  const lines = [
    "You've traveled through darkness.",
    "The coal-dusted streets of Dhanbad.",
    "The betrayal that built your walls.",
    "The Alpha that emerged from the ashes.",
    "And then... a wrong number.",
  ];

  useEffect(() => {
    const lineTimers = lines.map((_, index) => {
      return setTimeout(() => {
        setCurrentLine(index + 1);
      }, 1500 + (index * 2000));
    });

    const finalTimer = setTimeout(() => {
      setShowFinal(true);
    }, 1500 + (lines.length * 2000) + 500);

    const buttonTimer = setTimeout(() => {
      setShowButton(true);
    }, 1500 + (lines.length * 2000) + 3500);

    return () => {
      lineTimers.forEach(clearTimeout);
      clearTimeout(finalTimer);
      clearTimeout(buttonTimer);
    };
  }, []);

  const handleContinue = () => {
    markMidwayCheckpointSeen();
    navigate('/protocol-005');
  };

  if (!canAccessCheckpoint) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center max-w-2xl mx-auto"
        >
          {/* Header */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.8 }}
            className="mb-12"
          >
            <div className="text-6xl mb-6">⏸️</div>
            <h1 className="text-3xl md:text-4xl font-bold font-mono text-primary">
              CHECKPOINT
            </h1>
            <p className="text-muted-foreground font-mono text-sm mt-2">
              MIDWAY • 4/8 PROTOCOLS COMPLETE
            </p>
          </motion.div>

          {/* Opening line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-2xl text-foreground mb-10"
          >
            Take a breath, Argha.
          </motion.p>

          {/* Progressive reveal */}
          <div className="space-y-4 mb-10 min-h-[200px]">
            {lines.map((line, index) => (
              <AnimatePresence key={index}>
                {index < currentLine && (
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-lg text-foreground/70"
                  >
                    {line}
                  </motion.p>
                )}
              </AnimatePresence>
            ))}
          </div>

          {/* Final revelation */}
          <AnimatePresence>
            {showFinal && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-card/50 border border-primary/30 rounded-xl p-8 mb-8"
              >
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xl text-foreground mb-4"
                >
                  Now, the story shifts.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-2xl text-primary font-bold mb-4"
                >
                  The next chapters are about US.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.6 }}
                  className="text-lg text-foreground/80"
                >
                  About what we built together.
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Progress dots */}
          <div className="mb-8">
            <div className="flex justify-center gap-2 mb-2">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${i < 4 ? 'bg-primary' : 'bg-muted'}`}
                />
              ))}
            </div>
          </div>

          {/* Continue button */}
          <AnimatePresence>
            {showButton && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Button
                  onClick={handleContinue}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 px-8 py-6 text-lg"
                >
                  <i className="fas fa-heart mr-3" />
                  Continue Our Story
                  <i className="fas fa-arrow-right ml-3" />
                </Button>
                <p className="text-xs text-muted-foreground mt-4 font-serif italic">
                  "The best is yet to come..."
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default MidwayCheckpointPage;
