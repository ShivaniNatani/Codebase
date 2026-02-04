import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

// Chapter 4: Code Debug Interview Game
export const CodeDebugGame = ({ onSuccess }) => {
  const [currentBug, setCurrentBug] = useState(0);
  const [selectedLine, setSelectedLine] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  const bugs = [
    {
      code: [
        'function calculateSalary(base, bonus) {',
        '  let total = base + bomus;',  // Bug: bomus instead of bonus
        '  return total;',
        '}',
      ],
      bugLine: 1,
      description: 'Find the typo in variable name',
    },
    {
      code: [
        'for (let i = 0; i <= arr.length; i++) {',  // Bug: <= should be <
        '  console.log(arr[i]);',
        '}',
      ],
      bugLine: 0,
      description: 'Array index out of bounds',
    },
    {
      code: [
        'const user = { name: "John" };',
        'user.name = "Jane"',  // Missing semicolon
        'console.log(user.name);',
      ],
      bugLine: 1,
      description: 'Missing semicolon',
    },
    {
      code: [
        'function greet(name) {',
        '  if (name = "Admin") {',  // Bug: = instead of ===
        '    return "Welcome Admin!";',
        '  }',
        '}',
      ],
      bugLine: 1,
      description: 'Assignment instead of comparison',
    },
    {
      code: [
        'async function fetchData() {',
        '  const response = fetch(url);',  // Bug: missing await
        '  return response.json();',
        '}',
      ],
      bugLine: 1,
      description: 'Missing await keyword',
    },
  ];

  useEffect(() => {
    if (gameOver || gameWon || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameOver, gameWon, timeLeft]);

  const handleLineClick = (lineIndex) => {
    if (gameOver || gameWon) return;
    
    setSelectedLine(lineIndex);
    
    if (lineIndex === bugs[currentBug].bugLine) {
      setScore(prev => prev + 1);
      
      if (currentBug === bugs.length - 1) {
        setGameWon(true);
        setTimeout(() => onSuccess?.(), 1500);
      } else {
        setTimeout(() => {
          setCurrentBug(prev => prev + 1);
          setSelectedLine(null);
        }, 500);
      }
    }
  };

  const restartGame = () => {
    setCurrentBug(0);
    setSelectedLine(null);
    setScore(0);
    setTimeLeft(60);
    setGameOver(false);
    setGameWon(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 p-3 bg-card rounded-lg border border-border">
        <div className="flex items-center gap-4">
          <div className="text-2xl">💻</div>
          <div>
            <div className="text-xs text-muted-foreground">AMAZON INTERVIEW</div>
            <div className="text-sm font-bold text-primary">Debug Challenge</div>
          </div>
        </div>
        <div className="flex gap-6 text-sm">
          <div>
            <span className="text-muted-foreground">BUGS: </span>
            <span className="text-green-500">{score}/{bugs.length}</span>
          </div>
          <div>
            <span className="text-muted-foreground">TIME: </span>
            <span className={timeLeft < 15 ? 'text-destructive' : 'text-foreground'}>{timeLeft}s</span>
          </div>
        </div>
      </div>

      {/* Code Editor */}
      <div className="bg-[#1e1e1e] rounded-lg overflow-hidden border border-border">
        {/* Editor Header */}
        <div className="flex items-center gap-2 px-4 py-2 bg-[#2d2d2d] border-b border-border/50">
          <div className="w-3 h-3 rounded-full bg-destructive/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="ml-3 text-xs text-muted-foreground">bug_{currentBug + 1}.js</span>
        </div>

        {/* Task Description */}
        <div className="px-4 py-2 bg-primary/10 border-b border-border/50">
          <p className="text-sm text-primary">
            <i className="fas fa-bug mr-2" />
            {bugs[currentBug]?.description}
          </p>
        </div>

        {/* Code Lines */}
        <div className="p-4 font-mono text-sm">
          {bugs[currentBug]?.code.map((line, index) => (
            <motion.div
              key={index}
              onClick={() => handleLineClick(index)}
              className={`
                flex items-center gap-4 px-2 py-1 rounded cursor-pointer transition-colors
                ${selectedLine === index 
                  ? index === bugs[currentBug].bugLine 
                    ? 'bg-green-500/20 border-l-2 border-green-500' 
                    : 'bg-destructive/20 border-l-2 border-destructive'
                  : 'hover:bg-primary/10'
                }
              `}
              whileHover={{ x: 2 }}
            >
              <span className="text-muted-foreground/50 w-6 text-right select-none">
                {index + 1}
              </span>
              <span className="text-[#d4d4d4]">{line}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground mt-4">
        Click on the line containing the bug
      </p>

      {/* Game Over / Win Overlay */}
      <AnimatePresence>
        {(gameOver || gameWon) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="bg-card p-8 rounded-lg text-center border border-border"
            >
              {gameWon ? (
                <>
                  <div className="text-5xl mb-4">🎉</div>
                  <h3 className="text-2xl font-bold text-green-400">INTERVIEW PASSED!</h3>
                  <p className="text-muted-foreground mt-2">Welcome to Amazon</p>
                </>
              ) : (
                <>
                  <div className="text-5xl mb-4">⏰</div>
                  <h3 className="text-xl font-bold text-destructive">TIME&apos;S UP!</h3>
                  <p className="text-muted-foreground mt-2">Bugs found: {score}/{bugs.length}</p>
                  <Button onClick={restartGame} variant="outline" className="mt-4">
                    Try Again
                  </Button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Chapter 5: Phone Connection Puzzle Game
export const PhoneConnectionGame = ({ onSuccess }) => {
  const canvasRef = useRef(null);
  const [connections, setConnections] = useState([]);
  const [drawing, setDrawing] = useState(false);
  const [currentPath, setCurrentPath] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const startPoint = { x: 50, y: 200, label: 'HIM', color: '#3b82f6' };
  const endPoint = { x: 350, y: 200, label: 'HER', color: '#ec4899' };
  
  const obstacles = [
    { x: 120, y: 100, w: 30, h: 200 },
    { x: 200, y: 50, w: 30, h: 150 },
    { x: 200, y: 250, w: 30, h: 100 },
    { x: 280, y: 100, w: 30, h: 200 },
  ];

  const checkCollision = (x, y) => {
    return obstacles.some(obs => 
      x >= obs.x && x <= obs.x + obs.w &&
      y >= obs.y && y <= obs.y + obs.h
    );
  };

  const checkWin = (path) => {
    if (path.length < 2) return false;
    const lastPoint = path[path.length - 1];
    const dist = Math.sqrt(
      Math.pow(lastPoint.x - endPoint.x, 2) + 
      Math.pow(lastPoint.y - endPoint.y, 2)
    );
    return dist < 30;
  };

  const handleMouseDown = (e) => {
    if (completed) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Check if starting from start point
    const distToStart = Math.sqrt(
      Math.pow(x - startPoint.x, 2) + Math.pow(y - startPoint.y, 2)
    );
    
    if (distToStart < 30) {
      setDrawing(true);
      setCurrentPath([{ x: startPoint.x, y: startPoint.y }]);
    }
  };

  const handleMouseMove = (e) => {
    if (!drawing || completed) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (checkCollision(x, y)) {
      setDrawing(false);
      setCurrentPath([]);
      setAttempts(prev => prev + 1);
      return;
    }

    setCurrentPath(prev => [...prev, { x, y }]);

    if (checkWin([...currentPath, { x, y }])) {
      setDrawing(false);
      setCompleted(true);
      setConnections(prev => [...prev, [...currentPath, { x, y }]]);
      setTimeout(() => onSuccess?.(), 1500);
    }
  };

  const handleMouseUp = () => {
    if (drawing && !completed) {
      setDrawing(false);
      setCurrentPath([]);
    }
  };

  const resetGame = () => {
    setConnections([]);
    setCurrentPath([]);
    setCompleted(false);
    setAttempts(0);
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex justify-between mb-4 text-sm">
        <span className="text-muted-foreground">Connect the call without hitting obstacles</span>
        <span className="text-primary">Attempts: {attempts}</span>
      </div>

      <div
        ref={canvasRef}
        className="relative bg-card rounded-lg border-2 border-border overflow-hidden cursor-crosshair"
        style={{ width: 400, height: 400 }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Grid background */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}
        />

        {/* Obstacles */}
        {obstacles.map((obs, i) => (
          <div
            key={i}
            className="absolute bg-destructive/30 border border-destructive/50 rounded"
            style={{ left: obs.x, top: obs.y, width: obs.w, height: obs.h }}
          />
        ))}

        {/* Start Point */}
        <motion.div
          className="absolute w-14 h-14 rounded-full flex items-center justify-center text-2xl"
          style={{ 
            left: startPoint.x - 28, 
            top: startPoint.y - 28,
            background: `${startPoint.color}30`,
            border: `2px solid ${startPoint.color}`
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          📱
        </motion.div>

        {/* End Point */}
        <motion.div
          className="absolute w-14 h-14 rounded-full flex items-center justify-center text-2xl"
          style={{ 
            left: endPoint.x - 28, 
            top: endPoint.y - 28,
            background: `${endPoint.color}30`,
            border: `2px solid ${endPoint.color}`
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        >
          📱
        </motion.div>

        {/* Drawing Path */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {/* Completed connections */}
          {connections.map((conn, i) => (
            <motion.path
              key={i}
              d={`M ${conn.map(p => `${p.x},${p.y}`).join(' L ')}`}
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
            />
          ))}
          
          {/* Current drawing */}
          {currentPath.length > 1 && (
            <path
              d={`M ${currentPath.map(p => `${p.x},${p.y}`).join(' L ')}`}
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="3"
              strokeDasharray="5,5"
            />
          )}
        </svg>

        {/* Success overlay */}
        {completed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/70 flex items-center justify-center"
          >
            <div className="text-center">
              <div className="text-5xl mb-4">💕</div>
              <h3 className="text-xl font-bold text-green-400">CONNECTED!</h3>
              <p className="text-sm text-muted-foreground">The glitch that changed everything</p>
            </div>
          </motion.div>
        )}
      </div>

      <Button onClick={resetGame} variant="outline" size="sm" className="mt-4 w-full">
        <i className="fas fa-redo mr-2" />
        Reset
      </Button>
    </div>
  );
};

// Chapter 6: Home Builder - Click to Build Game (Simplified)
export const HomeBuilderGame = ({ onSuccess }) => {
  const [blocks, setBlocks] = useState([]);
  const [score, setScore] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const targetScore = 50;

  const buildingParts = [
    { id: 1, name: 'Foundation', emoji: '🧱', points: 10 },
    { id: 2, name: 'Walls', emoji: '🪵', points: 10 },
    { id: 3, name: 'Window', emoji: '🪟', points: 10 },
    { id: 4, name: 'Door', emoji: '🚪', points: 10 },
    { id: 5, name: 'Roof', emoji: '🏠', points: 10 },
  ];

  const handlePlacePart = (part) => {
    if (gameWon) return;
    
    setBlocks(prev => [...prev, { ...part, placed: Date.now() }]);
    const newScore = score + part.points;
    setScore(newScore);
    
    if (newScore >= targetScore) {
      setGameWon(true);
      setTimeout(() => onSuccess?.(), 1500);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex justify-between mb-4">
        <span className="text-sm text-muted-foreground">Click parts to build your home</span>
        <span className="text-primary font-mono">{score}/{targetScore} 🏠</span>
      </div>

      {/* Building Area */}
      <div className="bg-card border-2 border-border rounded-lg p-6 min-h-[250px] relative mb-4">
        <div className="flex flex-wrap gap-2 justify-center">
          {blocks.map((block, i) => (
            <motion.div
              key={block.placed}
              initial={{ scale: 0, y: -50 }}
              animate={{ scale: 1, y: 0 }}
              className="text-4xl"
            >
              {block.emoji}
            </motion.div>
          ))}
        </div>
        
        {blocks.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            Click parts below to start building
          </div>
        )}
      </div>

      {/* Building Parts */}
      <div className="grid grid-cols-5 gap-2">
        {buildingParts.map(part => (
          <motion.button
            key={part.id}
            onClick={() => handlePlacePart(part)}
            disabled={gameWon}
            className="p-4 bg-card border border-border rounded-lg hover:border-primary transition-colors disabled:opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-3xl mb-1">{part.emoji}</div>
            <div className="text-xs text-muted-foreground">{part.name}</div>
          </motion.button>
        ))}
      </div>

      {/* Win Overlay */}
      <AnimatePresence>
        {gameWon && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          >
            <div className="text-center">
              <motion.div 
                className="text-6xl mb-4"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: 3 }}
              >
                🏠
              </motion.div>
              <h3 className="text-2xl font-bold text-green-400">HOME BUILT!</h3>
              <p className="text-muted-foreground">Feb 2025 - Moving in together</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
