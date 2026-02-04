import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

// Chapter 1: Retro Computer Boot Game
export const RetroComputerGame = ({ onSuccess }) => {
  const [commands, setCommands] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [stage, setStage] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [gameComplete, setGameComplete] = useState(false);

  const commandSequence = [
    { prompt: 'C:\\>', expected: 'dir', response: 'DREAMS.EXE    FUTURE.DAT    AMBITION.SYS' },
    { prompt: 'C:\\>', expected: 'run dreams.exe', response: 'Loading dreams... [████████████] 100%' },
    { prompt: 'Enter destination:', expected: 'iit', response: 'DESTINATION LOCKED: IIT' },
    { prompt: 'Confirm mission? (Y/N):', expected: 'y', response: 'MISSION ACCEPTED. BEGIN JOURNEY.' },
  ];

  useEffect(() => {
    const interval = setInterval(() => setShowCursor(prev => !prev), 500);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const current = commandSequence[stage];
    
    if (currentInput.toLowerCase().trim() === current.expected) {
      setCommands(prev => [
        ...prev,
        { type: 'input', text: `${current.prompt} ${currentInput}` },
        { type: 'output', text: current.response }
      ]);
      
      if (stage === commandSequence.length - 1) {
        setGameComplete(true);
        setTimeout(() => onSuccess?.(), 1500);
      } else {
        setStage(prev => prev + 1);
      }
    } else {
      setCommands(prev => [
        ...prev,
        { type: 'input', text: `${current.prompt} ${currentInput}` },
        { type: 'error', text: 'BAD COMMAND OR FILE NAME. TRY AGAIN.' }
      ]);
    }
    setCurrentInput('');
  };

  return (
    <div className="bg-black border-4 border-gray-600 rounded-lg p-4 font-mono text-sm max-w-2xl mx-auto">
      {/* CRT Effect Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,255,0,0.03)_2px,rgba(0,255,0,0.03)_4px)]" />
      
      {/* Monitor Frame */}
      <div className="bg-black p-4 rounded min-h-[300px] relative overflow-hidden">
        {/* Boot Message */}
        {commands.length === 0 && (
          <div className="text-green-500 mb-4 animate-pulse">
            <p>DHANBAD PERSONAL COMPUTER - 1999</p>
            <p>640K RAM SYSTEM</p>
            <p className="mt-2">Type commands to boot the dream machine...</p>
            <p className="text-yellow-400 text-xs mt-2">HINT: Type &quot;dir&quot; to see files</p>
          </div>
        )}

        {/* Command History */}
        <div className="space-y-1 text-green-500">
          {commands.map((cmd, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={cmd.type === 'error' ? 'text-red-500' : cmd.type === 'output' ? 'text-cyan-400' : ''}
            >
              {cmd.text}
            </motion.div>
          ))}
        </div>

        {/* Current Input */}
        {!gameComplete && (
          <form onSubmit={handleSubmit} className="flex items-center text-green-500 mt-2">
            <span>{commandSequence[stage]?.prompt} </span>
            <input
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              className="bg-transparent border-none outline-none flex-1 text-green-500"
              autoFocus
            />
            <span className={showCursor ? 'opacity-100' : 'opacity-0'}>█</span>
          </form>
        )}

        {/* Success Message */}
        {gameComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center text-green-400 mt-4"
          >
            <p className="text-2xl">★ SYSTEM BOOT COMPLETE ★</p>
            <p className="text-yellow-400">The journey begins...</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// Chapter 2: Motorcycle Racing Game
export const MotorcycleRacingGame = ({ onSuccess }) => {
  const [bikePosition, setBikePosition] = useState(1); // 0, 1, 2 (lanes)
  const [obstacles, setObstacles] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [distance, setDistance] = useState(0);
  const targetDistance = 1900; // km to Bangalore

  const handleKeyDown = useCallback((e) => {
    if (gameOver || gameWon) return;
    if (e.key === 'ArrowLeft' && bikePosition > 0) {
      setBikePosition(prev => prev - 1);
    } else if (e.key === 'ArrowRight' && bikePosition < 2) {
      setBikePosition(prev => prev + 1);
    }
  }, [bikePosition, gameOver, gameWon]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Game loop
  useEffect(() => {
    if (gameOver || gameWon) return;

    const gameLoop = setInterval(() => {
      // Move obstacles
      setObstacles(prev => {
        const moved = prev
          .map(obs => ({ ...obs, y: obs.y + 5 }))
          .filter(obs => obs.y < 100);

        // Check collision
        const collision = moved.some(obs => 
          obs.y > 70 && obs.y < 90 && obs.lane === bikePosition
        );

        if (collision) {
          setGameOver(true);
          return moved;
        }

        return moved;
      });

      // Add new obstacles
      if (Math.random() < 0.05) {
        setObstacles(prev => [...prev, {
          id: Date.now(),
          lane: Math.floor(Math.random() * 3),
          y: 0,
          type: Math.random() > 0.5 ? 'car' : 'truck'
        }]);
      }

      // Update distance
      setDistance(prev => {
        const newDist = prev + 10;
        if (newDist >= targetDistance) {
          setGameWon(true);
          setTimeout(() => onSuccess?.(), 1500);
        }
        return newDist;
      });

      setScore(prev => prev + 1);
    }, 50);

    return () => clearInterval(gameLoop);
  }, [bikePosition, gameOver, gameWon, onSuccess]);

  const restartGame = () => {
    setBikePosition(1);
    setObstacles([]);
    setScore(0);
    setDistance(0);
    setGameOver(false);
    setGameWon(false);
  };

  return (
    <div className="max-w-md mx-auto">
      {/* Distance Meter */}
      <div className="mb-4 text-center">
        <div className="text-sm text-muted-foreground mb-1">DHANBAD → BANGALORE</div>
        <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            style={{ width: `${(distance / targetDistance) * 100}%` }}
          />
        </div>
        <div className="text-xs text-primary mt-1">{Math.min(distance, targetDistance)} / {targetDistance} km</div>
      </div>

      {/* Game Area */}
      <div className="relative bg-gray-800 rounded-lg h-[400px] overflow-hidden border-2 border-primary/30">
        {/* Road */}
        <div className="absolute inset-0 flex">
          {[0, 1, 2].map(lane => (
            <div key={lane} className="flex-1 border-x border-dashed border-yellow-500/30 relative">
              {/* Road markings animation */}
              <motion.div
                className="absolute inset-0"
                animate={{ backgroundPosition: ['0px 0px', '0px 100px'] }}
                transition={{ duration: 0.5, repeat: Infinity, ease: 'linear' }}
                style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.1) 40px, rgba(255,255,255,0.1) 60px)',
                }}
              />
            </div>
          ))}
        </div>

        {/* Obstacles */}
        {obstacles.map(obs => (
          <motion.div
            key={obs.id}
            className="absolute w-12 h-16 flex items-center justify-center text-2xl"
            style={{
              left: `${obs.lane * 33.33 + 16.66 - 6}%`,
              top: `${obs.y}%`,
            }}
          >
            {obs.type === 'car' ? '🚗' : '🚛'}
          </motion.div>
        ))}

        {/* Bike */}
        <motion.div
          className="absolute bottom-8 w-12 h-16 flex items-center justify-center text-3xl"
          animate={{ left: `${bikePosition * 33.33 + 16.66 - 6}%` }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        >
          🏍️
        </motion.div>

        {/* Controls hint */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
          ← → Arrow keys to move
        </div>

        {/* Game Over / Win Overlay */}
        <AnimatePresence>
          {(gameOver || gameWon) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-black/80 flex items-center justify-center"
            >
              <div className="text-center">
                {gameWon ? (
                  <>
                    <div className="text-4xl mb-2">🎉</div>
                    <h3 className="text-2xl font-bold text-green-400">BANGALORE REACHED!</h3>
                    <p className="text-muted-foreground">The lone wolf has arrived</p>
                  </>
                ) : (
                  <>
                    <div className="text-4xl mb-2">💥</div>
                    <h3 className="text-xl font-bold text-destructive">CRASH!</h3>
                    <p className="text-muted-foreground mb-4">Distance: {distance} km</p>
                    <Button onClick={restartGame} variant="outline" size="sm">
                      Try Again
                    </Button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Chapter 3: Heart Shield Defense Game
export const HeartShieldGame = ({ onSuccess }) => {
  const [shieldAngle, setShieldAngle] = useState(0);
  const [arrows, setArrows] = useState([]);
  const [health, setHealth] = useState(100);
  const [blockedCount, setBlockedCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const targetBlocks = 30;

  const handleMouseMove = useCallback((e) => {
    if (gameOver || gameWon) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const mouseX = e.clientX - rect.left - centerX;
    const mouseY = e.clientY - rect.top - centerY;
    const angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);
    setShieldAngle(angle);
  }, [gameOver, gameWon]);

  // Spawn arrows
  useEffect(() => {
    if (gameOver || gameWon) return;

    const spawnInterval = setInterval(() => {
      const angle = Math.random() * 360;
      const rad = angle * (Math.PI / 180);
      setArrows(prev => [...prev, {
        id: Date.now() + Math.random(),
        angle,
        x: Math.cos(rad) * 200,
        y: Math.sin(rad) * 200,
        dx: -Math.cos(rad) * 3,
        dy: -Math.sin(rad) * 3,
      }]);
    }, 500);

    return () => clearInterval(spawnInterval);
  }, [gameOver, gameWon]);

  // Move arrows and check collisions
  useEffect(() => {
    if (gameOver || gameWon) return;

    const gameLoop = setInterval(() => {
      setArrows(prev => {
        const updated = [];
        
        prev.forEach(arrow => {
          const newX = arrow.x + arrow.dx;
          const newY = arrow.y + arrow.dy;
          const dist = Math.sqrt(newX * newX + newY * newY);

          // Check if arrow reached center
          if (dist < 30) {
            // Check if shield is blocking
            const arrowAngle = (Math.atan2(arrow.y, arrow.x) * 180 / Math.PI + 360) % 360;
            const shieldStart = (shieldAngle - 45 + 360) % 360;
            const shieldEnd = (shieldAngle + 45 + 360) % 360;
            
            let isBlocked;
            if (shieldStart < shieldEnd) {
              isBlocked = arrowAngle >= shieldStart && arrowAngle <= shieldEnd;
            } else {
              isBlocked = arrowAngle >= shieldStart || arrowAngle <= shieldEnd;
            }

            if (isBlocked) {
              setBlockedCount(prev => {
                const newCount = prev + 1;
                if (newCount >= targetBlocks) {
                  setGameWon(true);
                  setTimeout(() => onSuccess?.(), 1500);
                }
                return newCount;
              });
            } else {
              setHealth(prev => {
                const newHealth = prev - 10;
                if (newHealth <= 0) {
                  setGameOver(true);
                }
                return Math.max(0, newHealth);
              });
            }
          } else if (dist < 200) {
            updated.push({ ...arrow, x: newX, y: newY });
          }
        });

        return updated;
      });
    }, 30);

    return () => clearInterval(gameLoop);
  }, [shieldAngle, gameOver, gameWon, onSuccess]);

  const restartGame = () => {
    setArrows([]);
    setHealth(100);
    setBlockedCount(0);
    setGameOver(false);
    setGameWon(false);
  };

  return (
    <div className="max-w-lg mx-auto">
      {/* Stats */}
      <div className="flex justify-between mb-4 text-sm">
        <div>
          <span className="text-muted-foreground">ARMOR: </span>
          <span className="text-primary">{blockedCount}/{targetBlocks}</span>
        </div>
        <div>
          <span className="text-muted-foreground">HEART: </span>
          <span className={health > 30 ? 'text-green-500' : 'text-destructive'}>{health}%</span>
        </div>
      </div>

      {/* Game Area */}
      <div
        className="relative bg-card rounded-full w-[400px] h-[400px] mx-auto border-2 border-border overflow-hidden cursor-none"
        onMouseMove={handleMouseMove}
      >
        {/* Heart in center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl">
          {health > 0 ? '❤️' : '💔'}
        </div>

        {/* Shield */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-24 h-4 bg-primary rounded-full origin-left"
          style={{
            transform: `translate(-50%, -50%) rotate(${shieldAngle}deg) translateX(20px)`,
            boxShadow: '0 0 20px hsl(var(--primary))',
          }}
        />

        {/* Arrows */}
        {arrows.map(arrow => (
          <motion.div
            key={arrow.id}
            className="absolute text-xl"
            style={{
              left: `calc(50% + ${arrow.x}px)`,
              top: `calc(50% + ${arrow.y}px)`,
              transform: `translate(-50%, -50%) rotate(${arrow.angle + 180}deg)`,
            }}
          >
            🗡️
          </motion.div>
        ))}

        {/* Game Over / Win Overlay */}
        <AnimatePresence>
          {(gameOver || gameWon) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-black/80 flex items-center justify-center rounded-full"
            >
              <div className="text-center">
                {gameWon ? (
                  <>
                    <div className="text-4xl mb-2">🛡️</div>
                    <h3 className="text-xl font-bold text-green-400">ARMOR FORGED!</h3>
                    <p className="text-muted-foreground text-sm">Emotional steel activated</p>
                  </>
                ) : (
                  <>
                    <div className="text-4xl mb-2">💔</div>
                    <h3 className="text-xl font-bold text-destructive">HEART BROKEN</h3>
                    <Button onClick={restartGame} variant="outline" size="sm" className="mt-2">
                      Try Again
                    </Button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <p className="text-center text-xs text-muted-foreground mt-4">
        Move mouse to rotate shield and block the betrayal arrows
      </p>
    </div>
  );
};
