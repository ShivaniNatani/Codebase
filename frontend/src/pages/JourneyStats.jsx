import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useGame } from '@/context/GameContext';

const JourneyStats = () => {
  const navigate = useNavigate();
  const { 
    chaptersCompleted, 
    easterEggsFound, 
    reflectionAnswers,
    startTime,
    finalChoice
  } = useGame();
  
  const [showMessage, setShowMessage] = useState(false);

  // Check if journey is complete
  const journeyComplete = chaptersCompleted.every(Boolean) && finalChoice === 'yes';
  
  // Calculate stats
  const totalChapters = chaptersCompleted.filter(Boolean).length;
  const totalSecrets = easterEggsFound?.length || 0;
  const completionPercentage = Math.round((totalChapters / 8) * 100);
  const secretsPercentage = Math.round((totalSecrets / 8) * 100);
  
  // Calculate time spent (if startTime exists)
  const calculateTimeSpent = () => {
    if (!startTime) return 'Unknown';
    const elapsed = Date.now() - startTime;
    const hours = Math.floor(elapsed / (1000 * 60 * 60));
    const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes} minutes`;
  };

  useEffect(() => {
    if (journeyComplete) {
      const timer = setTimeout(() => setShowMessage(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [journeyComplete]);

  // Redirect if not complete
  useEffect(() => {
    if (!journeyComplete) {
      // Allow viewing partial stats
    }
  }, [journeyComplete]);

  const protocolNames = [
    { code: '001', name: 'ORIGIN', theme: 'Dhanbad roots' },
    { code: '002', name: 'ASCENSION', theme: 'The Alpha rise' },
    { code: '003', name: 'FRACTURE', theme: 'Betrayal & walls' },
    { code: '004', name: 'GLITCH', theme: 'Wrong number' },
    { code: '005', name: 'PARADOX', theme: 'Opposites attract' },
    { code: '006', name: 'ANCHOR', theme: 'You held her steady' },
    { code: '007', name: 'REVELATION', theme: 'She is the answer' },
    { code: 'FINAL', name: 'CHOICE', theme: 'Forever' },
  ];

  const secretFragments = [
    '"The warmth of sunshine couldn\'t do what his presence did..."',
    '"I want him to be my best friend... a love that\'s real, raw, ridiculous"',
    '"I want love that chooses me, even on days I\'m hard to love"',
    '"Even vodka couldn\'t do what his black shirt did..."',
    '"Strong couples create things to look forward to..."',
    '"I want to be his happy wife, soft, radiant, & deeply loved"',
    '"My most treasured title would be: Your Wife"',
    '"Close your eyes and think of me... Our love forever as destiny"',
  ];

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="text-5xl mb-4">📊</div>
          <h1 className="text-3xl md:text-4xl font-bold font-mono text-primary mb-2">
            JOURNEY ANALYTICS
          </h1>
          <p className="text-muted-foreground">
            Your path through PROTOCOL_V
          </p>
        </motion.div>

        {/* Main Stats Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-primary">{totalChapters}/8</div>
            <div className="text-sm text-muted-foreground">Protocols Complete</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-yellow-400">{totalSecrets}/8</div>
            <div className="text-sm text-muted-foreground">Secrets Found</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-400">{calculateTimeSpent()}</div>
            <div className="text-sm text-muted-foreground">Time Invested</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-pink-400">
              {journeyComplete ? '💍' : '...'}
            </div>
            <div className="text-sm text-muted-foreground">Final Answer</div>
          </div>
        </motion.div>

        {/* Progress Bars */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-6 mb-12"
        >
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-mono text-foreground">Protocol Completion</span>
              <span className="text-sm font-mono text-primary">{completionPercentage}%</span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${completionPercentage}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-primary"
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-mono text-foreground">Secrets Discovered</span>
              <span className="text-sm font-mono text-yellow-400">{secretsPercentage}%</span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${secretsPercentage}%` }}
                transition={{ duration: 1, delay: 0.7 }}
                className="h-full bg-yellow-400"
              />
            </div>
          </div>
        </motion.div>

        {/* Protocol Breakdown */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-xl font-bold font-mono text-foreground mb-4">
            <i className="fas fa-list-check mr-2 text-primary" />
            Protocol Breakdown
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {protocolNames.map((protocol, index) => (
              <div
                key={protocol.code}
                className={`flex items-center gap-3 p-4 rounded-lg border ${
                  chaptersCompleted[index]
                    ? 'bg-primary/10 border-primary/30'
                    : 'bg-card border-border'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  chaptersCompleted[index] ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  {chaptersCompleted[index] ? <i className="fas fa-check text-sm" /> : index + 1}
                </div>
                <div className="flex-1">
                  <div className="font-mono text-sm text-foreground">
                    PROTOCOL_{protocol.code}: {protocol.name}
                  </div>
                  <div className="text-xs text-muted-foreground">{protocol.theme}</div>
                </div>
                {easterEggsFound?.includes(index) && (
                  <div className="text-yellow-400" title="Secret found!">
                    <i className="fas fa-gem" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Discovered Secrets */}
        {totalSecrets > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-xl font-bold font-mono text-foreground mb-4">
              <i className="fas fa-gem mr-2 text-yellow-400" />
              Discovered Fragments ({totalSecrets}/8)
            </h2>
            <div className="space-y-3">
              {easterEggsFound?.map((index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-card/50 border border-yellow-500/20 rounded-lg p-4"
                >
                  <p className="text-foreground/80 font-serif italic text-sm">
                    {secretFragments[index]}
                  </p>
                  <p className="text-xs text-yellow-400 mt-2">
                    — Fragment #{index + 1}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Reflection Answers */}
        {Object.keys(reflectionAnswers || {}).length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-xl font-bold font-mono text-foreground mb-4">
              <i className="fas fa-heart mr-2 text-pink-400" />
              Your Reflections
            </h2>
            <div className="bg-card border border-pink-500/20 rounded-lg p-6">
              {finalChoice === 'yes' && (
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">💍</div>
                  <p className="text-primary font-bold">You said YES, FOREVER</p>
                </div>
              )}
              <p className="text-muted-foreground text-sm text-center">
                All your answers have been recorded and treasured.
              </p>
            </div>
          </motion.div>
        )}

        {/* Personal Message from Shivani */}
        <AnimatePresence>
          {showMessage && journeyComplete && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-12"
            >
              <div className="bg-gradient-to-br from-pink-500/10 to-primary/10 border border-primary/30 rounded-xl p-8">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-4">💕</div>
                  <h2 className="text-xl font-bold text-primary">A Message For You</h2>
                </div>
                <div className="space-y-4 font-serif text-foreground/90 leading-relaxed">
                  <p>
                    Argha,
                  </p>
                  <p>
                    You just completed a journey through your own story—seen through my eyes.
                    I watched you solve every puzzle, find every secret, and read every word I wrote for you.
                  </p>
                  <p>
                    Do you know how long I worked on this? How many nights I stayed up, trying to capture
                    everything I feel for you in code and puzzles and hidden poetry?
                  </p>
                  <p>
                    Because you're worth it. Every line. Every secret. Every moment.
                  </p>
                  <p>
                    You came from Dhanbad with nothing but dreams. You built yourself into an Alpha.
                    You survived betrayal. And then—somehow—you called the wrong number.
                  </p>
                  <p className="text-primary font-bold">
                    The best mistake of your life. And mine.
                  </p>
                  <p>
                    I love you, Argha. Not just the Alpha. Not just the Amazon guy. Not just the logical mind.
                    I love the boy from Dhanbad. The one who held me when I was breaking.
                    The one who chose me over going home for Diwali.
                  </p>
                  <p>
                    Thank you for saying yes. Thank you for being mine.
                  </p>
                  <p className="text-right text-pink-400 font-medium pt-4">
                    — Forever yours, <br />
                    Your "Wrong" Shivani 💕
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            onClick={() => navigate('/chapters')}
            variant="outline"
            size="lg"
            data-testid="revisit-protocols-btn"
          >
            <i className="fas fa-book mr-2" />
            Revisit Protocols
          </Button>
          {journeyComplete && (
            <Button
              onClick={() => navigate('/protocol-final')}
              size="lg"
              className="bg-primary hover:bg-primary/90"
              data-testid="see-proposal-btn"
            >
              <i className="fas fa-heart mr-2" />
              See Your Answer Again
            </Button>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default JourneyStats;
