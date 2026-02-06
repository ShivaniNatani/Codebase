import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { GlitchText } from '@/components/GlitchText';
import { useGame } from '@/context/GameContext';
import { LoveQuote } from '@/components/RomanticElements';

// Romantic quotes to display
const romanticQuotes = [
  "Every love story is beautiful, but ours is my favorite.",
  "In a sea of people, my eyes will always search for you.",
  "You're not just my love story. You're my forever.",
  "The best thing to hold onto in life is each other.",
  "I loved you yesterday. I love you still. Always have. Always will.",
];

// Valentine Week dates for time-lock
const PROTOCOL_DATES = {
  0: new Date('2025-02-07T00:00:00'), // Protocol 001
  1: new Date('2025-02-08T00:00:00'), // Protocol 002
  2: new Date('2025-02-09T00:00:00'), // Protocol 003
  3: new Date('2025-02-10T00:00:00'), // Protocol 004
  4: new Date('2025-02-11T00:00:00'), // Protocol 005
  5: new Date('2025-02-12T00:00:00'), // Protocol 006
  6: new Date('2025-02-13T00:00:00'), // Protocol 007
  7: new Date('2025-02-14T00:00:00'), // Protocol FINAL
};

const protocols = [
  { 
    id: 'PROTOCOL_001', 
    codename: 'ORIGIN',
    subtitle: 'Where roots take hold',
    path: '/protocol-001',
    icon: '🔐',
    color: 'text-red-400',
    hint: 'Coal dust and dreams'
  },
  { 
    id: 'PROTOCOL_002', 
    codename: 'ASCENSION',
    subtitle: 'The alpha awakens',
    path: '/protocol-002',
    icon: '⚡',
    color: 'text-yellow-400',
    hint: '18 hours. No shortcuts.'
  },
  { 
    id: 'PROTOCOL_003', 
    codename: 'FRACTURE',
    subtitle: 'What breaks us',
    path: '/protocol-003',
    icon: '💔',
    color: 'text-orange-500',
    hint: 'The wall that saved him'
  },
  { 
    id: 'PROTOCOL_004', 
    codename: 'GLITCH',
    subtitle: 'Error becomes destiny',
    path: '/protocol-004',
    icon: '🐛',
    color: 'text-green-400',
    hint: 'Wrong number. Right call.'
  },
  { 
    id: 'PROTOCOL_005', 
    codename: 'PARADOX',
    subtitle: 'Opposites collide',
    path: '/protocol-005',
    icon: '☯️',
    color: 'text-purple-400',
    hint: 'Veg meets non-veg'
  },
  { 
    id: 'PROTOCOL_006', 
    codename: 'ANCHOR',
    subtitle: 'What holds us',
    path: '/protocol-006',
    icon: '⚓',
    color: 'text-blue-400',
    hint: 'Diwali. Birthday. Always.'
  },
  { 
    id: 'PROTOCOL_007', 
    codename: 'REVELATION',
    subtitle: 'The truth unveiled',
    path: '/protocol-007',
    icon: '👁️',
    color: 'text-pink-400',
    hint: 'What you truly found'
  },
  { 
    id: 'PROTOCOL_FINAL', 
    codename: 'CHOICE',
    subtitle: 'The point of no return',
    path: '/protocol-final',
    icon: '💍',
    color: 'text-red-500',
    hint: 'Forever or never'
  },
];

const ChapterHub = () => {
  const navigate = useNavigate();
  const { 
    accessGranted, 
    chaptersUnlocked, 
    chaptersCompleted, 
    easterEggsFound = [],
    soundEnabled,
    toggleSound,
    resetProgress
  } = useGame();
  
  const [hoveredProtocol, setHoveredProtocol] = useState(null);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    if (!accessGranted) {
      navigate('/');
    }
    
    // Update time every minute for time-lock check
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, [accessGranted, navigate]);

  const isTimeLocked = (index) => {
    // For testing: set to false to unlock all
    // For production: return now < PROTOCOL_DATES[index];
    return false; // DEV MODE - all unlocked for testing
  };

  const getTimeUntilUnlock = (index) => {
    const unlockDate = PROTOCOL_DATES[index];
    const diff = unlockDate - now;
    if (diff <= 0) return null;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    return `${hours}h`;
  };

  const completedCount = chaptersCompleted.filter(Boolean).length;
  const allCompleted = completedCount === 8;
  const easterEggCount = easterEggsFound?.length || 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                className="text-muted-foreground hover:text-foreground"
              >
                <i className="fas fa-terminal mr-2" />
                Terminal
              </Button>
            </div>

            <div className="flex items-center gap-6">
              {/* Easter Egg Counter */}
              <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded bg-primary/10 border border-primary/20">
                <i className="fas fa-gem text-primary text-xs" />
                <span className="text-xs font-mono text-primary">
                  {easterEggCount}/8 SECRETS
                </span>
              </div>

              {/* Progress */}
              <div className="hidden md:flex items-center gap-3">
                <span className="text-xs font-mono text-muted-foreground">PROTOCOLS</span>
                <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${(completedCount / 8) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <span className="text-xs font-mono text-primary">{completedCount}/8</span>
              </div>

              <button
                onClick={toggleSound}
                className="w-9 h-9 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <i className={`fas ${soundEnabled ? 'fa-volume-up' : 'fa-volume-mute'} text-sm`} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 md:py-16 border-b border-border/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="text-xs font-mono text-primary tracking-wider">CLASSIFIED CLEARANCE GRANTED</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
              <GlitchText text="PROTOCOL_V" className="text-primary" glitchIntensity={0.1} />
            </h1>
            
            <p className="text-lg text-muted-foreground font-mono">
              8 encrypted chapters. Each hides a secret.
              <span className="text-primary block mt-2 font-serif italic">
                "Solve them all to see the truth..."
              </span>
            </p>

            {allCompleted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button
                  size="lg"
                  onClick={() => navigate('/final')}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground group animate-pulse"
                >
                  <i className="fas fa-key mr-2" />
                  DECRYPT FINAL MESSAGE
                  <i className="fas fa-arrow-right ml-3 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/journey-stats')}
                  data-testid="journey-stats-btn"
                >
                  <i className="fas fa-chart-line mr-2" />
                  View Journey Stats
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Protocol Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {protocols.map((protocol, index) => {
              const isUnlocked = chaptersUnlocked[index] && !isTimeLocked(index);
              const isCompleted = chaptersCompleted[index];
              const timeLeft = getTimeUntilUnlock(index);
              const hasEasterEgg = easterEggsFound?.includes(index);
              
              return (
                <motion.div
                  key={protocol.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredProtocol(index)}
                  onMouseLeave={() => setHoveredProtocol(null)}
                  onClick={() => isUnlocked && navigate(protocol.path)}
                  className={`
                    relative bg-card border rounded-xl p-6 cursor-pointer transition-all duration-300 group
                    ${isUnlocked ? 'border-border hover:border-primary hover:shadow-lg hover:shadow-primary/10' : 'border-border/50 opacity-60 cursor-not-allowed'}
                    ${isCompleted ? 'border-green-500/50 bg-green-500/5' : ''}
                  `}
                >
                  {/* Status Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-muted-foreground">{protocol.id}</span>
                    <div className="flex items-center gap-2">
                      {hasEasterEgg && (
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                          <i className="fas fa-gem text-primary text-[10px]" />
                        </div>
                      )}
                      {isCompleted && (
                        <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                          <i className="fas fa-check text-green-400 text-xs" />
                        </div>
                      )}
                      {!isUnlocked && timeLeft && (
                        <span className="text-xs font-mono text-destructive">{timeLeft}</span>
                      )}
                      {!isUnlocked && !timeLeft && (
                        <i className="fas fa-lock text-muted-foreground/50" />
                      )}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="text-4xl mb-4 transition-transform group-hover:scale-110">
                    {protocol.icon}
                  </div>

                  {/* Title */}
                  <h3 className={`text-lg font-bold mb-1 font-mono ${protocol.color}`}>
                    {protocol.codename}
                  </h3>
                  <p className="text-xs text-muted-foreground italic">
                    {hoveredProtocol === index && isUnlocked ? protocol.hint : protocol.subtitle}
                  </p>

                  {/* Hover Effect */}
                  {isUnlocked && !isCompleted && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mystery Message */}
      <section className="py-12 border-t border-border/30">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="bg-card/50 border border-primary/20 rounded-xl p-8"
            >
              <div className="text-4xl mb-4">🔮</div>
              <p className="text-foreground/80 font-mono text-sm leading-relaxed">
                <span className="text-primary">&gt;</span> Each protocol hides a secret fragment.<br/>
                <span className="text-primary">&gt;</span> Find them all to decrypt the final message.<br/>
                <span className="text-primary">&gt;</span> The truth awaits those who search carefully...
              </p>
              <p className="text-xs text-muted-foreground mt-4 font-serif italic">
                "Not everything is as it appears. Look deeper."
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Scotch Easter Egg */}
      <div className="fixed bottom-4 right-4 opacity-20 hover:opacity-100 transition-opacity cursor-pointer group">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="text-2xl"
          title="🐕 Scotch is watching..."
        >
          🐕
        </motion.div>
      </div>

      {/* Reset option */}
      <div className="container mx-auto px-6 py-8 border-t border-border/20">
        <button
          onClick={() => {
            if (window.confirm('Reset all progress? This cannot be undone.')) {
              resetProgress();
              navigate('/');
            }
          }}
          className="text-xs font-mono text-muted-foreground/50 hover:text-destructive transition-colors"
        >
          [SYSTEM_RESET]
        </button>
      </div>
    </div>
  );
};

export default ChapterHub;
