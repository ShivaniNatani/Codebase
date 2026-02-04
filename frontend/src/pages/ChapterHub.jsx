import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChapterGrid } from '@/components/ChapterCard';
import { useGame } from '@/context/GameContext';

const ChapterHub = () => {
  const navigate = useNavigate();
  const { 
    accessGranted, 
    chaptersUnlocked, 
    chaptersCompleted, 
    currentChapter,
    resetProgress,
    soundEnabled,
    toggleSound
  } = useGame();

  useEffect(() => {
    if (!accessGranted) {
      navigate('/');
    }
  }, [accessGranted, navigate]);

  const completedCount = chaptersCompleted.filter(Boolean).length;
  const allCompleted = completedCount === 7;

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
              {/* Progress */}
              <div className="hidden md:flex items-center gap-3">
                <span className="text-xs font-mono text-muted-foreground">PROGRESS</span>
                <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${(completedCount / 7) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <span className="text-xs font-mono text-primary">{completedCount}/7</span>
              </div>

              {/* Sound toggle */}
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
      <section className="py-16 md:py-24 border-b border-border/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse-red" />
              <span className="text-xs font-mono text-primary tracking-wider">VALENTINE WEEK PROTOCOL</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-4">
              The Seven Chapters
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground font-serif leading-relaxed">
              Each chapter unlocks a piece of the story. Solve the puzzle. Decode the message. 
              <span className="text-primary italic"> Understand the man.</span>
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
                  <i className="fas fa-crown mr-2" />
                  Proceed to Final Chapter
                  <i className="fas fa-arrow-right ml-3 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Chapter Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-6">
          <ChapterGrid
            chaptersUnlocked={chaptersUnlocked}
            chaptersCompleted={chaptersCompleted}
            currentChapter={currentChapter}
          />
        </div>
      </section>

      {/* Info Panel */}
      <section className="py-12 border-t border-border/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Rules */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card border border-border/50 rounded-lg p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <i className="fas fa-scroll text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">The Rules</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <i className="fas fa-chevron-right text-primary text-xs mt-1.5" />
                  One chapter per day
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-chevron-right text-primary text-xs mt-1.5" />
                  Solve the puzzle to proceed
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-chevron-right text-primary text-xs mt-1.5" />
                  No skipping allowed
                </li>
              </ul>
            </motion.div>

            {/* The Purpose */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-card border border-border/50 rounded-lg p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <i className="fas fa-bullseye text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">The Purpose</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                This isn't romantic fluff. This is proof. Every puzzle, every chapter, every word is 
                a demonstration of understanding. <span className="text-primary font-medium">I didn't just love you. I studied you.</span>
              </p>
            </motion.div>

            {/* The Promise */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-card border border-border/50 rounded-lg p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <i className="fas fa-heart text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">The Promise</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                By the end, you'll feel something you've never felt before. 
                Not just love. <span className="text-primary font-medium italic">Alignment.</span>
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Reset option - hidden at bottom */}
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
