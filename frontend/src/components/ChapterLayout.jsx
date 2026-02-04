import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export const ChapterLayout = ({ 
  chapterNumber, 
  title, 
  subtitle,
  children,
  showBack = true,
  className = ''
}) => {
  const navigate = useNavigate();

  return (
    <div className={`min-h-screen bg-background ${className}`}>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          {showBack && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/chapters')}
              className="text-muted-foreground hover:text-foreground"
            >
              <i className="fas fa-arrow-left mr-2" />
              Return to Hub
            </Button>
          )}
          
          <div className="text-center flex-1">
            <span className="text-xs font-mono text-primary tracking-widest">
              CHAPTER {String(chapterNumber).padStart(2, '0')}
            </span>
          </div>

          <div className="w-24" /> {/* Spacer for balance */}
        </div>
      </header>

      {/* Chapter Title Section */}
      <section className="pt-24 pb-12 border-b border-border/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-3">
              {title}
            </h1>
            <p className="text-lg md:text-xl font-serif italic text-primary/80">
              {subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <main className="container mx-auto px-6 py-12">
        {children}
      </main>

      {/* Progress indicator */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {[1, 2, 3, 4, 5, 6, 7].map((num) => (
          <div
            key={num}
            className={`
              w-2 h-2 rounded-full transition-colors
              ${num === chapterNumber ? 'bg-primary w-4' : 'bg-muted-foreground/30'}
              ${num < chapterNumber ? 'bg-green-500/50' : ''}
            `}
          />
        ))}
      </div>
    </div>
  );
};

export const StorySection = ({ children, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
      className={`prose prose-invert prose-lg max-w-none ${className}`}
    >
      {children}
    </motion.div>
  );
};

export const DataFragment = ({ label, value, encrypted = false, className = '' }) => {
  return (
    <div className={`font-mono text-sm ${className}`}>
      <span className="text-muted-foreground">{label}: </span>
      <span className={encrypted ? 'text-primary blur-sm hover:blur-none transition-all cursor-pointer' : 'text-foreground'}>
        {value}
      </span>
    </div>
  );
};
