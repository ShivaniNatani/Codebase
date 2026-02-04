import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

// Chapter 7: Ring Catcher Game - The Most Epic Final Game
export const RingCatcherGame = ({ onSuccess }) => {
  const [handPosition, setHandPosition] = useState(50);
  const [rings, setRings] = useState([]);
  const [caughtRings, setCaughtRings] = useState(0);
  const [missedRings, setMissedRings] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [specialRing, setSpecialRing] = useState(null);
  const targetRings = 7; // 7 rings for 7 chapters
  const maxMisses = 3;

  const handleMouseMove = useCallback((e) => {
    if (gameWon || gameOver) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setHandPosition(Math.max(10, Math.min(90, x)));
  }, [gameWon, gameOver]);

  // Spawn rings
  useEffect(() => {
    if (gameWon || gameOver) return;

    const spawnInterval = setInterval(() => {
      // Regular rings
      if (Math.random() < 0.3) {
        setRings(prev => [...prev, {
          id: Date.now(),
          x: Math.random() * 80 + 10,
          y: 0,
          speed: 1 + Math.random() * 0.5,
          type: 'normal',
        }]);
      }

      // Special golden ring (appears when close to winning)
      if (caughtRings >= targetRings - 2 && !specialRing && Math.random() < 0.1) {
        setSpecialRing({
          id: Date.now(),
          x: 50,
          y: 0,
          speed: 0.8,
          type: 'special',
        });
      }
    }, 800);

    return () => clearInterval(spawnInterval);
  }, [gameWon, gameOver, caughtRings, specialRing]);

  // Game loop
  useEffect(() => {
    if (gameWon || gameOver) return;

    const gameLoop = setInterval(() => {
      // Move normal rings
      setRings(prev => {
        const updated = [];
        
        prev.forEach(ring => {
          const newY = ring.y + ring.speed;
          
          // Check if caught
          if (newY > 85 && newY < 95) {
            const distance = Math.abs(ring.x - handPosition);
            if (distance < 12) {
              setCaughtRings(prev => {
                const newCount = prev + 1;
                if (newCount >= targetRings) {
                  setGameWon(true);
                  setTimeout(() => onSuccess?.(), 2000);
                }
                return newCount;
              });
              return; // Don't add to updated
            }
          }
          
          // Check if missed
          if (newY > 100) {
            setMissedRings(prev => {
              const newMisses = prev + 1;
              if (newMisses >= maxMisses) {
                setGameOver(true);
              }
              return newMisses;
            });
            return;
          }
          
          updated.push({ ...ring, y: newY });
        });

        return updated;
      });

      // Move special ring
      if (specialRing) {
        setSpecialRing(prev => {
          if (!prev) return null;
          const newY = prev.y + prev.speed;
          
          if (newY > 85 && newY < 95) {
            const distance = Math.abs(prev.x - handPosition);
            if (distance < 15) {
              setCaughtRings(p => p + 3); // Bonus!
              return null;
            }
          }
          
          if (newY > 100) return null;
          
          return { ...prev, y: newY };
        });
      }
    }, 30);

    return () => clearInterval(gameLoop);
  }, [handPosition, gameWon, gameOver, specialRing, onSuccess]);

  const restartGame = () => {
    setRings([]);
    setCaughtRings(0);
    setMissedRings(0);
    setGameWon(false);
    setGameOver(false);
    setSpecialRing(null);
  };

  return (
    <div className="max-w-lg mx-auto">
      {/* Stats */}
      <div className="flex justify-between mb-4">
        <div className="flex gap-2">
          {[...Array(targetRings)].map((_, i) => (
            <motion.div
              key={i}
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs
                ${i < caughtRings ? 'border-primary bg-primary/20 text-primary' : 'border-muted text-muted'}`}
              animate={i < caughtRings ? { scale: [1, 1.2, 1] } : {}}
            >
              💍
            </motion.div>
          ))}
        </div>
        <div className="flex gap-1">
          {[...Array(maxMisses)].map((_, i) => (
            <span key={i} className={i < missedRings ? 'text-destructive' : 'text-muted'}>
              ❌
            </span>
          ))}
        </div>
      </div>

      {/* Game Area */}
      <div
        className="relative bg-gradient-to-b from-indigo-950 via-purple-950 to-pink-950 rounded-lg h-[500px] overflow-hidden border-2 border-primary/30 cursor-none"
        onMouseMove={handleMouseMove}
      >
        {/* Stars background */}
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 70}%`,
              opacity: Math.random() * 0.5 + 0.2,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}

        {/* Moonlight glow */}
        <div className="absolute top-10 right-10 w-20 h-20 rounded-full bg-yellow-100/20 blur-xl" />

        {/* Falling Rings */}
        {rings.map(ring => (
          <motion.div
            key={ring.id}
            className="absolute text-3xl"
            style={{
              left: `${ring.x}%`,
              top: `${ring.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            💍
          </motion.div>
        ))}

        {/* Special Ring */}
        {specialRing && (
          <motion.div
            className="absolute text-5xl"
            style={{
              left: `${specialRing.x}%`,
              top: `${specialRing.y}%`,
              transform: 'translate(-50%, -50%)',
              filter: 'drop-shadow(0 0 20px gold)',
            }}
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            👑
          </motion.div>
        )}

        {/* Hand */}
        <motion.div
          className="absolute bottom-4 text-5xl"
          style={{ left: `${handPosition}%`, transform: 'translateX(-50%)' }}
        >
          🤲
        </motion.div>

        {/* Win Overlay */}
        <AnimatePresence>
          {gameWon && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-black/80 flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring' }}
                className="text-center"
              >
                <motion.div
                  className="text-8xl mb-4"
                  animate={{ 
                    y: [0, -20, 0],
                    rotate: [0, -10, 10, 0],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  💍
                </motion.div>
                <h3 className="text-3xl font-bold text-primary mb-2">SHE SAID YES!</h3>
                <p className="text-muted-foreground">14th May 2024 - Forever begins</p>
                
                <motion.div
                  className="mt-6 space-y-2 text-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                >
                  <p className="text-foreground/80 font-serif italic">
                    &ldquo;Love, for him, was never poetry.
                  </p>
                  <p className="text-foreground/80 font-serif italic">
                    It was engineering.&rdquo;
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Game Over Overlay */}
        <AnimatePresence>
          {gameOver && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-black/80 flex items-center justify-center"
            >
              <div className="text-center">
                <div className="text-5xl mb-4">😢</div>
                <h3 className="text-xl font-bold text-destructive">RINGS LOST!</h3>
                <p className="text-muted-foreground mb-4">Caught: {caughtRings}/{targetRings}</p>
                <Button onClick={restartGame} variant="outline">
                  Try Again
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="text-center text-xs text-muted-foreground mt-4">
        Move mouse to catch the falling rings. Catch 7 rings for 7 chapters!
      </p>
    </div>
  );
};

// Bonus: Timeline Reconstruction Puzzle for Final Choice
export const TimelinePuzzle = ({ onSuccess }) => {
  const [events, setEvents] = useState([
    { id: 1, text: 'First computer in Dhanbad', year: 2000, placed: false },
    { id: 2, text: 'Migration to Bangalore', year: 2012, placed: false },
    { id: 3, text: 'The betrayal & armor', year: 2015, placed: false },
    { id: 4, text: 'Amazon interview', year: 2017, placed: false },
    { id: 5, text: 'Wrong number - The Glitch', year: 2022, placed: false },
    { id: 6, text: 'Building together', year: 2023, placed: false },
    { id: 7, text: 'The Proposal', year: 2024, placed: false },
  ].sort(() => Math.random() - 0.5));

  const [timeline, setTimeline] = useState([null, null, null, null, null, null, null]);
  const [draggedEvent, setDraggedEvent] = useState(null);
  const [completed, setCompleted] = useState(false);

  const checkCompletion = (newTimeline) => {
    const isComplete = newTimeline.every((slot, index) => 
      slot && slot.id === index + 1
    );
    if (isComplete) {
      setCompleted(true);
      setTimeout(() => onSuccess?.(), 1500);
    }
  };

  const handleDragStart = (event) => {
    setDraggedEvent(event);
  };

  const handleDrop = (slotIndex) => {
    if (!draggedEvent || completed) return;

    const newTimeline = [...timeline];
    
    // If slot is occupied, swap
    const existingEvent = newTimeline[slotIndex];
    if (existingEvent) {
      setEvents(prev => [...prev.filter(e => e.id !== draggedEvent.id), existingEvent]);
    }

    newTimeline[slotIndex] = draggedEvent;
    setTimeline(newTimeline);
    setEvents(prev => prev.filter(e => e.id !== draggedEvent.id));
    setDraggedEvent(null);

    checkCompletion(newTimeline);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-lg font-bold text-foreground">Reconstruct the Timeline</h3>
        <p className="text-sm text-muted-foreground">Drag events to the correct position in chronological order</p>
      </div>

      {/* Timeline slots */}
      <div className="relative mb-8">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-primary/30 -translate-y-1/2" />
        <div className="flex justify-between relative">
          {timeline.map((slot, index) => (
            <div
              key={index}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(index)}
              className={`
                w-32 h-24 rounded-lg border-2 border-dashed flex items-center justify-center p-2 text-xs text-center
                transition-colors cursor-pointer
                ${slot 
                  ? slot.id === index + 1 
                    ? 'border-green-500 bg-green-500/10' 
                    : 'border-destructive bg-destructive/10'
                  : 'border-muted hover:border-primary'
                }
              `}
            >
              {slot ? (
                <div>
                  <div className="font-bold text-primary">{slot.year}</div>
                  <div className="text-muted-foreground">{slot.text}</div>
                </div>
              ) : (
                <span className="text-muted-foreground/50">Drop here</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Available events */}
      <div className="flex flex-wrap gap-3 justify-center">
        {events.map(event => (
          <motion.div
            key={event.id}
            draggable
            onDragStart={() => handleDragStart(event)}
            className="px-4 py-2 bg-card border border-border rounded-lg cursor-grab active:cursor-grabbing hover:border-primary transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-sm font-medium">{event.text}</div>
            <div className="text-xs text-primary">{event.year}</div>
          </motion.div>
        ))}
      </div>

      {/* Completion overlay */}
      <AnimatePresence>
        {completed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          >
            <div className="text-center">
              <div className="text-6xl mb-4">📜</div>
              <h3 className="text-2xl font-bold text-green-400">TIMELINE COMPLETE!</h3>
              <p className="text-muted-foreground">The full story, from beginning to forever</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RingCatcherGame;
