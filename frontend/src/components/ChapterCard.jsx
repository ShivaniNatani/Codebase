import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';

const chapterData = [
  { 
    id: 1, 
    title: 'Origin', 
    subtitle: 'The Boy With the Computer',
    date: 'Day 1 • Rose Day',
    icon: 'fa-desktop',
    location: 'Dhanbad, Jharkhand'
  },
  { 
    id: 2, 
    title: 'Migration', 
    subtitle: 'Bangalore & the Lone Wolf Phase',
    date: 'Day 2 • Propose Day',
    icon: 'fa-plane-departure',
    location: 'Bangalore'
  },
  { 
    id: 3, 
    title: 'Break', 
    subtitle: 'Love, Betrayal & Emotional Armor',
    date: 'Day 3 • Chocolate Day',
    icon: 'fa-heart-crack',
    location: 'The Past'
  },
  { 
    id: 4, 
    title: 'Ascent', 
    subtitle: 'Career, Solitude & Discipline',
    date: 'Day 4 • Teddy Day',
    icon: 'fa-chart-line',
    location: 'The Climb'
  },
  { 
    id: 5, 
    title: 'The Glitch', 
    subtitle: 'A Wrong Number Changes Everything',
    date: 'Day 5 • Promise Day',
    icon: 'fa-phone-volume',
    location: 'Unexpected'
  },
  { 
    id: 6, 
    title: 'Partnership', 
    subtitle: 'Building, Not Consuming',
    date: 'Day 6 • Hug Day',
    icon: 'fa-handshake',
    location: 'Together'
  },
  { 
    id: 7, 
    title: 'The Commitment', 
    subtitle: 'Love as Strategy',
    date: 'Day 7 • Kiss Day',
    icon: 'fa-ring',
    location: 'Forever'
  },
];

export const ChapterCard = ({ 
  chapterIndex, 
  isUnlocked, 
  isCompleted, 
  isActive,
  className = '' 
}) => {
  const navigate = useNavigate();
  const chapter = chapterData[chapterIndex];

  const handleClick = () => {
    if (isUnlocked) {
      navigate(`/chapter/${chapter.id}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: chapterIndex * 0.1 }}
      whileHover={isUnlocked ? { y: -4 } : {}}
      className={className}
    >
      <Card
        onClick={handleClick}
        className={`
          relative overflow-hidden p-6 cursor-pointer transition-all duration-300
          border-2
          ${isUnlocked 
            ? 'bg-card border-primary/30 hover:border-primary hover:shadow-glow' 
            : 'bg-card/50 border-border/30 cursor-not-allowed opacity-60'
          }
          ${isCompleted ? 'border-green-500/50' : ''}
          ${isActive ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}
        `}
      >
        {/* Chapter number */}
        <div className="absolute top-4 right-4 text-6xl font-bold text-primary/10 font-mono">
          {String(chapter.id).padStart(2, '0')}
        </div>

        {/* Status indicator */}
        <div className="absolute top-4 left-4">
          {isCompleted ? (
            <span className="flex items-center gap-1.5 text-xs font-mono text-green-400">
              <i className="fas fa-check-circle" />
              COMPLETE
            </span>
          ) : isUnlocked ? (
            <span className="flex items-center gap-1.5 text-xs font-mono text-primary animate-pulse-red">
              <i className="fas fa-unlock" />
              UNLOCKED
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
              <i className="fas fa-lock" />
              LOCKED
            </span>
          )}
        </div>

        <div className="mt-8 space-y-3">
          {/* Icon */}
          <div className={`
            w-12 h-12 rounded-lg flex items-center justify-center
            ${isUnlocked ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}
          `}>
            <i className={`fas ${chapter.icon} text-xl`} />
          </div>

          {/* Title */}
          <div>
            <h3 className={`
              text-xl font-bold tracking-tight
              ${isUnlocked ? 'text-foreground' : 'text-muted-foreground'}
            `}>
              Chapter {chapter.id}: {chapter.title}
            </h3>
            <p className={`
              text-sm mt-1 font-serif italic
              ${isUnlocked ? 'text-primary/80' : 'text-muted-foreground/60'}
            `}>
              {isUnlocked ? chapter.subtitle : '???'}
            </p>
          </div>

          {/* Meta */}
          <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground pt-2">
            <span className="flex items-center gap-1.5">
              <i className="fas fa-calendar-day" />
              {chapter.date}
            </span>
            {isUnlocked && (
              <span className="flex items-center gap-1.5">
                <i className="fas fa-map-marker-alt" />
                {chapter.location}
              </span>
            )}
          </div>
        </div>

        {/* Locked overlay */}
        {!isUnlocked && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center backdrop-blur-sm">
            <div className="text-center">
              <i className="fas fa-lock text-3xl text-muted-foreground/50 mb-2" />
              <p className="text-xs font-mono text-muted-foreground">
                Complete previous chapter to unlock
              </p>
            </div>
          </div>
        )}

        {/* Glow effect for active/unlocked */}
        {isUnlocked && !isCompleted && (
          <div className="absolute inset-0 bg-gradient-glow opacity-50 pointer-events-none" />
        )}
      </Card>
    </motion.div>
  );
};

export const ChapterGrid = ({ chaptersUnlocked, chaptersCompleted, currentChapter }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {chapterData.map((chapter, index) => (
        <ChapterCard
          key={chapter.id}
          chapterIndex={index}
          isUnlocked={chaptersUnlocked[index]}
          isCompleted={chaptersCompleted[index]}
          isActive={currentChapter === index && chaptersUnlocked[index] && !chaptersCompleted[index]}
        />
      ))}
    </div>
  );
};
