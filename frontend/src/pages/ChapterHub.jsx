import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useGame } from '@/context/GameContext';

const valentineWeek = [
  { day: 'Rose Day', date: 'Feb 7', emoji: '🌹', path: '/rose-day', subtitle: 'Where It All Began', color: 'text-red-400' },
  { day: 'Propose Day', date: 'Feb 8', emoji: '💍', path: '/propose-day', subtitle: 'The Alpha Rises', color: 'text-yellow-400' },
  { day: 'Chocolate Day', date: 'Feb 9', emoji: '🍫', path: '/chocolate-day', subtitle: 'Bitter & Sweet', color: 'text-amber-600' },
  { day: 'Teddy Day', date: 'Feb 10', emoji: '🧸', path: '/teddy-day', subtitle: 'The Wrong Shivani', color: 'text-orange-300' },
  { day: 'Promise Day', date: 'Feb 11', emoji: '🤝', path: '/promise-day', subtitle: 'Opposites Attract', color: 'text-blue-400' },
  { day: 'Hug Day', date: 'Feb 12', emoji: '🤗', path: '/hug-day', subtitle: 'She Changed Everything', color: 'text-pink-400' },
  { day: 'Kiss Day', date: 'Feb 13', emoji: '💋', path: '/kiss-day', subtitle: 'The Revelation', color: 'text-rose-500' },
  { day: "Valentine's Day", date: 'Feb 14', emoji: '❤️', path: '/valentine-day', subtitle: 'The Final Choice', color: 'text-red-500' },
];

const ChapterHub = () => {
  const navigate = useNavigate();
  const { 
    accessGranted, 
    chaptersUnlocked, 
    chaptersCompleted, 
    soundEnabled,
    toggleSound,
    resetProgress
  } = useGame();

  useEffect(() => {
    if (!accessGranted) {
      navigate('/');
    }
  }, [accessGranted, navigate]);

  const completedCount = chaptersCompleted.filter(Boolean).length;
  const allCompleted = completedCount === 8;

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
                <i className="fas fa-home mr-2" />
                Home
              </Button>
            </div>

            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-3">
                <span className="text-xs font-mono text-muted-foreground">PROGRESS</span>
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
      <section className="py-12 md:py-20 border-b border-border/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="text-2xl">💝</span>
              <span className="text-sm font-mono text-primary tracking-wider">VALENTINE WEEK 2025</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-4">
              For <span className="text-primary">Argha</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground font-serif leading-relaxed">
              8 days. 8 chapters. One love story.
              <span className="text-primary italic block mt-2">
                "After everything you've been through, look at what you've found..."
              </span>
            </p>

            {allCompleted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8"
              >
                <Button
                  size="lg"
                  onClick={() => navigate('/final')}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground group"
                >
                  <i className="fas fa-heart mr-2" />
                  Open Your Heart
                  <i className="fas fa-arrow-right ml-3 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Valentine Week Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {valentineWeek.map((day, index) => {
              const isUnlocked = chaptersUnlocked[index];
              const isCompleted = chaptersCompleted[index];
              
              return (
                <motion.div
                  key={day.day}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => isUnlocked && navigate(day.path)}
                  className={`
                    relative bg-card border rounded-xl p-6 cursor-pointer transition-all duration-300
                    ${isUnlocked ? 'border-border hover:border-primary hover:shadow-lg hover:shadow-primary/10' : 'border-border/50 opacity-60 cursor-not-allowed'}
                    ${isCompleted ? 'border-green-500/50 bg-green-500/5' : ''}
                  `}
                >
                  {/* Day Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-muted-foreground">{day.date}</span>
                    {isCompleted && (
                      <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                        <i className="fas fa-check text-green-400 text-xs" />
                      </div>
                    )}
                    {!isUnlocked && (
                      <i className="fas fa-lock text-muted-foreground/50" />
                    )}
                  </div>

                  {/* Emoji */}
                  <div className="text-5xl mb-4">{day.emoji}</div>

                  {/* Title */}
                  <h3 className={`text-xl font-bold mb-1 ${day.color}`}>{day.day}</h3>
                  <p className="text-sm text-muted-foreground">{day.subtitle}</p>

                  {/* Hover Effect */}
                  {isUnlocked && !isCompleted && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-primary/10 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Message Section */}
      <section className="py-12 border-t border-border/30">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="bg-card/50 border border-primary/20 rounded-xl p-8"
            >
              <div className="text-4xl mb-4">💌</div>
              <p className="text-foreground/80 font-serif italic text-lg leading-relaxed">
                "Argha, this isn't just a story about you. It's a story about US. 
                Every struggle you faced, every wall you built, every battle you won... 
                it all led you here. To me. And I need you to see what I see when I look at you."
              </p>
              <p className="text-primary font-medium mt-4">— Your Wrong Shivani 💕</p>
            </motion.div>
          </div>
        </div>
      </section>

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
          [RESET PROTOCOL]
        </button>
      </div>
    </div>
  );
};

export default ChapterHub;
