import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

// Chapter 1: Memory Match Game - Match childhood memories
export const MemoryMatchGame = ({ onSuccess }) => {
  const memoryPairs = [
    { id: 1, content: '🖥️', match: 'First Computer' },
    { id: 2, content: '📚', match: 'IIT Dreams' },
    { id: 3, content: '👨‍👩‍👦‍👦', match: 'Family' },
    { id: 4, content: '⛏️', match: 'Dhanbad' },
    { id: 5, content: '💡', match: 'Ambition' },
    { id: 6, content: '❤️', match: 'Brother' },
  ];

  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    // Create pairs and shuffle
    const allCards = [];
    memoryPairs.forEach(pair => {
      allCards.push({ id: `${pair.id}-a`, pairId: pair.id, content: pair.content, type: 'emoji' });
      allCards.push({ id: `${pair.id}-b`, pairId: pair.id, content: pair.match, type: 'text' });
    });
    setCards(allCards.sort(() => Math.random() - 0.5));
  }, []);

  const handleCardClick = (card) => {
    if (flipped.length === 2 || flipped.includes(card.id) || matched.includes(card.pairId)) return;

    const newFlipped = [...flipped, card.id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [first, second] = newFlipped;
      const firstCard = cards.find(c => c.id === first);
      const secondCard = cards.find(c => c.id === second);

      if (firstCard.pairId === secondCard.pairId) {
        setMatched(m => [...m, firstCard.pairId]);
        setFlipped([]);
        
        if (matched.length + 1 === memoryPairs.length) {
          setTimeout(() => onSuccess?.(), 1000);
        }
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex justify-between mb-4 text-sm">
        <span className="text-muted-foreground">Match the memories</span>
        <span className="text-primary">Moves: {moves} | Matched: {matched.length}/{memoryPairs.length}</span>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {cards.map(card => {
          const isFlipped = flipped.includes(card.id) || matched.includes(card.pairId);
          return (
            <motion.div
              key={card.id}
              onClick={() => handleCardClick(card)}
              className={`
                aspect-square rounded-lg cursor-pointer flex items-center justify-center p-2 text-center
                ${isFlipped 
                  ? matched.includes(card.pairId) 
                    ? 'bg-green-500/20 border-2 border-green-500' 
                    : 'bg-primary/20 border-2 border-primary'
                  : 'bg-card border-2 border-border hover:border-primary/50'}
              `}
              whileHover={{ scale: isFlipped ? 1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isFlipped ? (
                <span className={card.type === 'emoji' ? 'text-3xl' : 'text-xs font-medium'}>
                  {card.content}
                </span>
              ) : (
                <i className="fas fa-question text-muted-foreground" />
              )}
            </motion.div>
          );
        })}
      </div>

      {matched.length === memoryPairs.length && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-6"
        >
          <div className="text-4xl mb-2">🎉</div>
          <p className="text-green-400 font-bold">All memories connected!</p>
        </motion.div>
      )}
    </div>
  );
};

// Chapter 2: Road Trip Game - Navigate to Bangalore
export const RoadTripGame = ({ onSuccess }) => {
  const [position, setPosition] = useState(0);
  const [obstacles, setObstacles] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const winScore = 100;

  useEffect(() => {
    if (gameOver || gameWon) return;
    
    const interval = setInterval(() => {
      setScore(s => {
        const newScore = s + 1;
        if (newScore >= winScore) {
          setGameWon(true);
          setTimeout(() => onSuccess?.(), 1500);
        }
        return newScore;
      });

      // Spawn obstacles
      if (Math.random() < 0.1) {
        setObstacles(obs => [...obs, { id: Date.now(), lane: Math.floor(Math.random() * 3), y: 0 }]);
      }

      // Move obstacles
      setObstacles(obs => obs.map(o => ({ ...o, y: o.y + 5 })).filter(o => o.y < 100));
    }, 100);

    return () => clearInterval(interval);
  }, [gameOver, gameWon, onSuccess]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowLeft') setPosition(p => Math.max(0, p - 1));
    if (e.key === 'ArrowRight') setPosition(p => Math.min(2, p + 1));
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Check collisions
  useEffect(() => {
    const collision = obstacles.some(o => o.y > 70 && o.y < 90 && o.lane === position);
    if (collision && !gameWon) {
      setGameOver(true);
    }
  }, [obstacles, position, gameWon]);

  const restart = () => {
    setPosition(1);
    setObstacles([]);
    setScore(0);
    setGameOver(false);
    setGameWon(false);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex justify-between mb-4">
        <span className="text-sm text-muted-foreground">Dhanbad → Bangalore</span>
        <span className="text-primary font-mono">{score}/{winScore} km</span>
      </div>

      <div className="w-full h-2 bg-muted rounded-full mb-4 overflow-hidden">
        <div className="h-full bg-primary transition-all" style={{ width: `${(score/winScore)*100}%` }} />
      </div>

      <div className="relative bg-gray-800 rounded-lg h-[350px] overflow-hidden border-2 border-border">
        {/* Lanes */}
        <div className="absolute inset-0 flex">
          {[0, 1, 2].map(lane => (
            <div key={lane} className="flex-1 border-x border-dashed border-yellow-500/30" />
          ))}
        </div>

        {/* Obstacles */}
        {obstacles.map(obs => (
          <div
            key={obs.id}
            className="absolute text-3xl transition-all"
            style={{ left: `${obs.lane * 33.33 + 16.66}%`, top: `${obs.y}%`, transform: 'translateX(-50%)' }}
          >
            🚗
          </div>
        ))}

        {/* Player */}
        <motion.div
          className="absolute bottom-8 text-4xl"
          animate={{ left: `${position * 33.33 + 16.66}%` }}
          style={{ transform: 'translateX(-50%)' }}
        >
          🏍️
        </motion.div>

        {/* Game Over/Win */}
        {(gameOver || gameWon) && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
            <div className="text-center">
              {gameWon ? (
                <>
                  <div className="text-5xl mb-4">🎉</div>
                  <p className="text-green-400 font-bold text-xl">BANGALORE REACHED!</p>
                </>
              ) : (
                <>
                  <div className="text-5xl mb-4">💥</div>
                  <p className="text-destructive font-bold">Crashed at {score}km</p>
                  <Button onClick={restart} variant="outline" className="mt-4">Try Again</Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <p className="text-center text-xs text-muted-foreground mt-4">← → Arrow keys to move</p>
    </div>
  );
};

// Chapter 3: Shield Defense Game
export const ShieldDefenseGame = ({ onSuccess }) => {
  const [health, setHealth] = useState(100);
  const [blocked, setBlocked] = useState(0);
  const [shieldAngle, setShieldAngle] = useState(0);
  const [attacks, setAttacks] = useState([]);
  const [gameWon, setGameWon] = useState(false);
  const targetBlocks = 20;

  useEffect(() => {
    if (gameWon || health <= 0) return;

    const interval = setInterval(() => {
      // Spawn attacks
      if (Math.random() < 0.15) {
        const angle = Math.random() * 360;
        setAttacks(a => [...a, { id: Date.now(), angle, distance: 150 }]);
      }

      // Move attacks inward
      setAttacks(prev => {
        return prev.map(attack => {
          const newDist = attack.distance - 3;
          
          // Check if reached center
          if (newDist < 30) {
            // Check if shield blocks
            const diff = Math.abs(attack.angle - shieldAngle);
            const isBlocked = diff < 45 || diff > 315;
            
            if (isBlocked) {
              setBlocked(b => {
                const newB = b + 1;
                if (newB >= targetBlocks) {
                  setGameWon(true);
                  setTimeout(() => onSuccess?.(), 1500);
                }
                return newB;
              });
            } else {
              setHealth(h => Math.max(0, h - 15));
            }
            return null;
          }
          return { ...attack, distance: newDist };
        }).filter(Boolean);
      });
    }, 50);

    return () => clearInterval(interval);
  }, [shieldAngle, gameWon, health, onSuccess]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setShieldAngle((Math.atan2(y, x) * 180 / Math.PI + 360) % 360);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex justify-between mb-4 text-sm">
        <span>❤️ {health}%</span>
        <span className="text-primary">Blocked: {blocked}/{targetBlocks}</span>
      </div>

      <div
        className="relative w-[300px] h-[300px] mx-auto rounded-full bg-card border-2 border-border cursor-none"
        onMouseMove={handleMouseMove}
      >
        {/* Heart center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl">
          {health > 0 ? '❤️' : '💔'}
        </div>

        {/* Shield */}
        <div
          className="absolute top-1/2 left-1/2 w-20 h-3 bg-primary rounded-full origin-left"
          style={{ transform: `translate(-50%, -50%) rotate(${shieldAngle}deg) translateX(30px)` }}
        />

        {/* Attacks */}
        {attacks.map(attack => (
          <div
            key={attack.id}
            className="absolute text-xl"
            style={{
              left: `${50 + Math.cos(attack.angle * Math.PI / 180) * attack.distance / 1.5}%`,
              top: `${50 + Math.sin(attack.angle * Math.PI / 180) * attack.distance / 1.5}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            🗡️
          </div>
        ))}

        {/* Win overlay */}
        {gameWon && (
          <div className="absolute inset-0 rounded-full bg-black/80 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">🛡️</div>
              <p className="text-green-400 font-bold">ARMOR FORGED!</p>
            </div>
          </div>
        )}
      </div>

      <p className="text-center text-xs text-muted-foreground mt-4">Move mouse to rotate shield</p>
    </div>
  );
};

// Chapter 4: Code Challenge
export const CodeChallengeGame = ({ onSuccess }) => {
  const [level, setLevel] = useState(0);
  const [selected, setSelected] = useState(null);

  const challenges = [
    { code: ['let salary = base + bomus;'], bugLine: 0, hint: 'Typo in variable' },
    { code: ['for(i=0; i<=arr.length; i++)'], bugLine: 0, hint: 'Off by one error' },
    { code: ['const data = fetch(url);', 'return data.json();'], bugLine: 0, hint: 'Missing async' },
  ];

  const handleSelect = (lineIndex) => {
    setSelected(lineIndex);
    if (lineIndex === challenges[level].bugLine) {
      if (level === challenges.length - 1) {
        setTimeout(() => onSuccess?.(), 1500);
      } else {
        setTimeout(() => { setLevel(l => l + 1); setSelected(null); }, 1000);
      }
    }
  };

  const current = challenges[level];

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex justify-between mb-4">
        <span className="text-sm text-muted-foreground">Find the bug</span>
        <span className="text-primary">Level {level + 1}/{challenges.length}</span>
      </div>

      <div className="bg-[#1e1e1e] rounded-lg p-4 font-mono text-sm">
        <div className="text-xs text-yellow-400 mb-3">💡 {current.hint}</div>
        {current.code.map((line, i) => (
          <div
            key={i}
            onClick={() => handleSelect(i)}
            className={`p-2 rounded cursor-pointer ${
              selected === i 
                ? i === current.bugLine ? 'bg-green-500/30' : 'bg-red-500/30'
                : 'hover:bg-primary/20'
            }`}
          >
            <span className="text-muted-foreground mr-4">{i + 1}</span>
            <span className="text-[#d4d4d4]">{line}</span>
          </div>
        ))}
      </div>

      {level === challenges.length - 1 && selected === challenges[level].bugLine && (
        <div className="text-center mt-4">
          <div className="text-4xl mb-2">🎉</div>
          <p className="text-green-400 font-bold">INTERVIEW PASSED!</p>
        </div>
      )}
    </div>
  );
};

// Chapter 5: Connect Hearts
export const ConnectHeartsGame = ({ onSuccess }) => {
  const [connected, setConnected] = useState(false);
  const [path, setPath] = useState([]);
  const [drawing, setDrawing] = useState(false);

  const start = { x: 50, y: 200 };
  const end = { x: 350, y: 200 };

  const handleMouseDown = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (Math.sqrt(Math.pow(x - start.x, 2) + Math.pow(y - start.y, 2)) < 30) {
      setDrawing(true);
      setPath([{ x, y }]);
    }
  };

  const handleMouseMove = (e) => {
    if (!drawing) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPath(p => [...p, { x, y }]);

    if (Math.sqrt(Math.pow(x - end.x, 2) + Math.pow(y - end.y, 2)) < 30) {
      setDrawing(false);
      setConnected(true);
      setTimeout(() => onSuccess?.(), 1500);
    }
  };

  const handleMouseUp = () => {
    if (!connected) { setDrawing(false); setPath([]); }
  };

  return (
    <div className="max-w-md mx-auto">
      <p className="text-sm text-muted-foreground mb-4 text-center">Draw a line to connect the hearts</p>

      <div
        className="relative bg-card rounded-lg border-2 border-border cursor-crosshair"
        style={{ width: 400, height: 400 }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Start heart */}
        <motion.div
          className="absolute text-4xl"
          style={{ left: start.x, top: start.y, transform: 'translate(-50%, -50%)' }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          💙
        </motion.div>

        {/* End heart */}
        <motion.div
          className="absolute text-4xl"
          style={{ left: end.x, top: end.y, transform: 'translate(-50%, -50%)' }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
        >
          💖
        </motion.div>

        {/* Path */}
        <svg className="absolute inset-0 pointer-events-none">
          {path.length > 1 && (
            <path
              d={`M ${path.map(p => `${p.x},${p.y}`).join(' L ')}`}
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="3"
              strokeLinecap="round"
            />
          )}
        </svg>

        {connected && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center rounded-lg">
            <div className="text-center">
              <div className="text-5xl mb-2">💕</div>
              <p className="text-green-400 font-bold">CONNECTED!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Chapter 6: Build Home Together
export const BuildHomeGame = ({ onSuccess }) => {
  const [parts, setParts] = useState([]);
  const [score, setScore] = useState(0);
  const target = 50;

  const items = [
    { emoji: '🧱', name: 'Foundation', points: 10 },
    { emoji: '🪵', name: 'Walls', points: 10 },
    { emoji: '🪟', name: 'Window', points: 10 },
    { emoji: '🚪', name: 'Door', points: 10 },
    { emoji: '🏠', name: 'Roof', points: 10 },
  ];

  const addPart = (item) => {
    if (score >= target) return;
    setParts(p => [...p, { ...item, id: Date.now() }]);
    const newScore = score + item.points;
    setScore(newScore);
    if (newScore >= target) {
      setTimeout(() => onSuccess?.(), 1500);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex justify-between mb-4">
        <span className="text-sm text-muted-foreground">Build your home</span>
        <span className="text-primary font-mono">{score}/{target}</span>
      </div>

      <div className="bg-card border-2 border-border rounded-lg p-6 min-h-[200px] mb-4 flex flex-wrap gap-2 justify-center items-center">
        {parts.map(part => (
          <motion.span key={part.id} initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-4xl">
            {part.emoji}
          </motion.span>
        ))}
        {parts.length === 0 && <span className="text-muted-foreground">Click parts to build</span>}
      </div>

      <div className="grid grid-cols-5 gap-2">
        {items.map(item => (
          <motion.button
            key={item.name}
            onClick={() => addPart(item)}
            disabled={score >= target}
            className="p-3 bg-card border border-border rounded-lg hover:border-primary disabled:opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-2xl">{item.emoji}</div>
            <div className="text-xs text-muted-foreground">{item.name}</div>
          </motion.button>
        ))}
      </div>

      {score >= target && (
        <div className="text-center mt-4">
          <div className="text-4xl mb-2">🏠</div>
          <p className="text-green-400 font-bold">HOME COMPLETE!</p>
        </div>
      )}
    </div>
  );
};

// Chapter 7: Catch the Ring
export const CatchRingGame = ({ onSuccess }) => {
  const [handX, setHandX] = useState(50);
  const [rings, setRings] = useState([]);
  const [caught, setCaught] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const target = 7;

  useEffect(() => {
    if (gameWon) return;

    const interval = setInterval(() => {
      // Spawn rings
      if (Math.random() < 0.1) {
        setRings(r => [...r, { id: Date.now(), x: Math.random() * 80 + 10, y: 0 }]);
      }

      // Move rings
      setRings(prev => {
        return prev.map(ring => {
          const newY = ring.y + 2;
          
          // Check catch
          if (newY > 85 && newY < 95 && Math.abs(ring.x - handX) < 10) {
            setCaught(c => {
              const newC = c + 1;
              if (newC >= target) {
                setGameWon(true);
                setTimeout(() => onSuccess?.(), 2000);
              }
              return newC;
            });
            return null;
          }
          
          if (newY > 100) return null;
          return { ...ring, y: newY };
        }).filter(Boolean);
      });
    }, 50);

    return () => clearInterval(interval);
  }, [handX, gameWon, onSuccess]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHandX(((e.clientX - rect.left) / rect.width) * 100);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex justify-center gap-2 mb-4">
        {[...Array(target)].map((_, i) => (
          <div key={i} className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm
            ${i < caught ? 'border-primary bg-primary/20' : 'border-muted'}`}>
            💍
          </div>
        ))}
      </div>

      <div
        className="relative bg-gradient-to-b from-indigo-950 to-pink-950 rounded-lg h-[400px] cursor-none"
        onMouseMove={handleMouseMove}
      >
        {/* Stars */}
        {[...Array(30)].map((_, i) => (
          <div key={i} className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{ left: `${Math.random()*100}%`, top: `${Math.random()*60}%`, opacity: Math.random()*0.5+0.2 }} />
        ))}

        {/* Rings */}
        {rings.map(ring => (
          <motion.div key={ring.id} className="absolute text-2xl"
            style={{ left: `${ring.x}%`, top: `${ring.y}%`, transform: 'translate(-50%, -50%)' }}
            animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
            💍
          </motion.div>
        ))}

        {/* Hand */}
        <div className="absolute bottom-4 text-4xl" style={{ left: `${handX}%`, transform: 'translateX(-50%)' }}>
          🤲
        </div>

        {gameWon && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center rounded-lg">
            <div className="text-center">
              <motion.div className="text-6xl mb-4" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.5, repeat: 3 }}>
                💍
              </motion.div>
              <p className="text-2xl font-bold text-primary">SHE SAID YES!</p>
              <p className="text-muted-foreground mt-2">14th May 2024</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
