import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export const MemoryMatchGame = ({ onSuccess }) => {
  const pairs = [
    { id: 1, emoji: '🖥️', text: 'First Computer' },
    { id: 2, emoji: '📚', text: 'IIT Dreams' },
    { id: 3, emoji: '👨‍👩‍👦‍👦', text: 'Family' },
    { id: 4, emoji: '⛏️', text: 'Dhanbad' },
    { id: 5, emoji: '💡', text: 'Ambition' },
    { id: 6, emoji: '❤️', text: 'Brother' },
  ];

  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);

  useEffect(() => {
    const all = [];
    pairs.forEach(p => {
      all.push({ uid: p.id + '-a', pairId: p.id, content: p.emoji, isEmoji: true });
      all.push({ uid: p.id + '-b', pairId: p.id, content: p.text, isEmoji: false });
    });
    setCards(all.sort(() => Math.random() - 0.5));
  }, []);

  const handleClick = (card) => {
    if (flipped.length === 2 || flipped.includes(card.uid) || matched.includes(card.pairId)) return;
    const newFlipped = [...flipped, card.uid];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [a, b] = newFlipped;
      const cardA = cards.find(c => c.uid === a);
      const cardB = cards.find(c => c.uid === b);
      if (cardA.pairId === cardB.pairId) {
        const newMatched = [...matched, cardA.pairId];
        setMatched(newMatched);
        setFlipped([]);
        if (newMatched.length === pairs.length) setTimeout(() => onSuccess && onSuccess(), 1000);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="text-sm text-muted-foreground mb-4 text-center">Matched: {matched.length}/{pairs.length}</div>
      <div className="grid grid-cols-4 gap-3">
        {cards.map(card => {
          const isOpen = flipped.includes(card.uid) || matched.includes(card.pairId);
          return (
            <motion.div key={card.uid} onClick={() => handleClick(card)} whileHover={{ scale: isOpen ? 1 : 1.05 }}
              className={`aspect-square rounded-lg cursor-pointer flex items-center justify-center p-2 text-center border-2 ${isOpen ? matched.includes(card.pairId) ? 'bg-green-500/20 border-green-500' : 'bg-primary/20 border-primary' : 'bg-card border-border hover:border-primary/50'}`}>
              {isOpen ? <span className={card.isEmoji ? 'text-3xl' : 'text-xs font-medium'}>{card.content}</span> : <i className="fas fa-question text-muted-foreground" />}
            </motion.div>
          );
        })}
      </div>
      {matched.length === pairs.length && <div className="text-center mt-4"><div className="text-4xl">🎉</div><p className="text-green-400 font-bold">All matched!</p></div>}
    </div>
  );
};

export const RoadTripGame = ({ onSuccess }) => {
  const [pos, setPos] = useState(1);
  const [obs, setObs] = useState([]);
  const [score, setScore] = useState(0);
  const [over, setOver] = useState(false);
  const [won, setWon] = useState(false);
  const target = 100;

  useEffect(() => {
    if (over || won) return;
    const int = setInterval(() => {
      setScore(s => { const n = s + 1; if (n >= target) { setWon(true); setTimeout(() => onSuccess && onSuccess(), 1500); } return n; });
      if (Math.random() < 0.1) setObs(o => [...o, { id: Date.now(), lane: Math.floor(Math.random() * 3), y: 0 }]);
      setObs(o => o.map(x => ({ ...x, y: x.y + 5 })).filter(x => x.y < 100));
    }, 100);
    return () => clearInterval(int);
  }, [over, won, onSuccess]);

  const onKey = useCallback((e) => {
    if (e.key === 'ArrowLeft') setPos(p => Math.max(0, p - 1));
    if (e.key === 'ArrowRight') setPos(p => Math.min(2, p + 1));
  }, []);

  useEffect(() => { window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey); }, [onKey]);
  useEffect(() => { if (obs.some(o => o.y > 70 && o.y < 90 && o.lane === pos) && !won) setOver(true); }, [obs, pos, won]);

  const restart = () => { setPos(1); setObs([]); setScore(0); setOver(false); setWon(false); };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex justify-between mb-4"><span className="text-sm text-muted-foreground">Dhanbad → Bangalore</span><span className="text-primary">{score}/{target} km</span></div>
      <div className="w-full h-2 bg-muted rounded-full mb-4 overflow-hidden"><div className="h-full bg-primary" style={{ width: `${(score/target)*100}%` }} /></div>
      <div className="relative bg-gray-800 rounded-lg h-[350px] overflow-hidden border-2 border-border">
        <div className="absolute inset-0 flex">{[0,1,2].map(l => <div key={l} className="flex-1 border-x border-dashed border-yellow-500/30" />)}</div>
        {obs.map(o => <div key={o.id} className="absolute text-3xl" style={{ left: `${o.lane*33.33+16.66}%`, top: `${o.y}%`, transform: 'translateX(-50%)' }}>🚗</div>)}
        <motion.div className="absolute bottom-8 text-4xl" animate={{ left: `${pos*33.33+16.66}%` }} style={{ transform: 'translateX(-50%)' }}>🏍️</motion.div>
        {(over || won) && <div className="absolute inset-0 bg-black/80 flex items-center justify-center"><div className="text-center">
          {won ? <><div className="text-5xl mb-4">🎉</div><p className="text-green-400 font-bold text-xl">BANGALORE REACHED!</p></> : <><div className="text-5xl mb-4">💥</div><p className="text-destructive font-bold">Crashed at {score}km</p><Button onClick={restart} variant="outline" className="mt-4">Try Again</Button></>}
        </div></div>}
      </div>
      <p className="text-center text-xs text-muted-foreground mt-4">← → Arrow keys to move</p>
    </div>
  );
};

export const ShieldDefenseGame = ({ onSuccess }) => {
  const [hp, setHp] = useState(100);
  const [blocked, setBlocked] = useState(0);
  const [angle, setAngle] = useState(0);
  const [attacks, setAttacks] = useState([]);
  const [won, setWon] = useState(false);
  const target = 20;

  useEffect(() => {
    if (won || hp <= 0) return;
    const int = setInterval(() => {
      if (Math.random() < 0.15) setAttacks(a => [...a, { id: Date.now(), angle: Math.random() * 360, dist: 150 }]);
      setAttacks(prev => prev.map(atk => {
        const nd = atk.dist - 3;
        if (nd < 30) {
          const diff = Math.abs(atk.angle - angle);
          if (diff < 45 || diff > 315) { setBlocked(b => { const nb = b + 1; if (nb >= target) { setWon(true); setTimeout(() => onSuccess && onSuccess(), 1500); } return nb; }); }
          else { setHp(h => Math.max(0, h - 15)); }
          return null;
        }
        return { ...atk, dist: nd };
      }).filter(Boolean));
    }, 50);
    return () => clearInterval(int);
  }, [angle, won, hp, onSuccess]);

  const onMove = (e) => { const r = e.currentTarget.getBoundingClientRect(); const x = e.clientX - r.left - r.width/2; const y = e.clientY - r.top - r.height/2; setAngle((Math.atan2(y, x) * 180 / Math.PI + 360) % 360); };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex justify-between mb-4 text-sm"><span>❤️ {hp}%</span><span className="text-primary">Blocked: {blocked}/{target}</span></div>
      <div className="relative w-[300px] h-[300px] mx-auto rounded-full bg-card border-2 border-border cursor-none" onMouseMove={onMove}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl">{hp > 0 ? '❤️' : '💔'}</div>
        <div className="absolute top-1/2 left-1/2 w-20 h-3 bg-primary rounded-full origin-left" style={{ transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(30px)` }} />
        {attacks.map(a => <div key={a.id} className="absolute text-xl" style={{ left: `${50 + Math.cos(a.angle * Math.PI / 180) * a.dist / 1.5}%`, top: `${50 + Math.sin(a.angle * Math.PI / 180) * a.dist / 1.5}%`, transform: 'translate(-50%, -50%)' }}>🗡️</div>)}
        {won && <div className="absolute inset-0 rounded-full bg-black/80 flex items-center justify-center"><div className="text-center"><div className="text-4xl mb-2">🛡️</div><p className="text-green-400 font-bold">ARMOR FORGED!</p></div></div>}
      </div>
      <p className="text-center text-xs text-muted-foreground mt-4">Move mouse to rotate shield</p>
    </div>
  );
};

export const CodeChallengeGame = ({ onSuccess }) => {
  const [level, setLevel] = useState(0);
  const [sel, setSel] = useState(null);
  const bugs = [
    { code: ['let salary = base + bomus;'], bug: 0, hint: 'Typo in variable' },
    { code: ['for(i=0; i<=arr.length; i++)'], bug: 0, hint: 'Off by one error' },
    { code: ['const data = fetch(url);', 'return data.json();'], bug: 0, hint: 'Missing async' },
  ];
  const cur = bugs[level];

  const handleSel = (i) => {
    setSel(i);
    if (i === cur.bug) {
      if (level === bugs.length - 1) setTimeout(() => onSuccess && onSuccess(), 1500);
      else setTimeout(() => { setLevel(l => l + 1); setSel(null); }, 1000);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex justify-between mb-4"><span className="text-sm text-muted-foreground">Find the bug</span><span className="text-primary">Level {level + 1}/{bugs.length}</span></div>
      <div className="bg-[#1e1e1e] rounded-lg p-4 font-mono text-sm">
        <div className="text-xs text-yellow-400 mb-3">💡 {cur.hint}</div>
        {cur.code.map((line, i) => (
          <div key={i} onClick={() => handleSel(i)} className={`p-2 rounded cursor-pointer ${sel === i ? i === cur.bug ? 'bg-green-500/30' : 'bg-red-500/30' : 'hover:bg-primary/20'}`}>
            <span className="text-muted-foreground mr-4">{i + 1}</span><span className="text-[#d4d4d4]">{line}</span>
          </div>
        ))}
      </div>
      {level === bugs.length - 1 && sel === cur.bug && <div className="text-center mt-4"><div className="text-4xl mb-2">🎉</div><p className="text-green-400 font-bold">INTERVIEW PASSED!</p></div>}
    </div>
  );
};

export const ConnectHeartsGame = ({ onSuccess }) => {
  const [path, setPath] = useState([]);
  const [drawing, setDrawing] = useState(false);
  const [done, setDone] = useState(false);
  const start = { x: 50, y: 200 };
  const end = { x: 350, y: 200 };

  const onDown = (e) => { const r = e.currentTarget.getBoundingClientRect(); const x = e.clientX - r.left; const y = e.clientY - r.top; if (Math.sqrt((x-start.x)**2 + (y-start.y)**2) < 30) { setDrawing(true); setPath([{x,y}]); } };
  const onMove = (e) => { if (!drawing) return; const r = e.currentTarget.getBoundingClientRect(); const x = e.clientX - r.left; const y = e.clientY - r.top; setPath(p => [...p, {x,y}]); if (Math.sqrt((x-end.x)**2 + (y-end.y)**2) < 30) { setDrawing(false); setDone(true); setTimeout(() => onSuccess && onSuccess(), 1500); } };
  const onUp = () => { if (!done) { setDrawing(false); setPath([]); } };

  return (
    <div className="max-w-md mx-auto">
      <p className="text-sm text-muted-foreground mb-4 text-center">Draw a line to connect the hearts</p>
      <div className="relative bg-card rounded-lg border-2 border-border cursor-crosshair" style={{ width: 400, height: 400 }} onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp}>
        <motion.div className="absolute text-4xl" style={{ left: start.x, top: start.y, transform: 'translate(-50%, -50%)' }} animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1, repeat: Infinity }}>💙</motion.div>
        <motion.div className="absolute text-4xl" style={{ left: end.x, top: end.y, transform: 'translate(-50%, -50%)' }} animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}>💖</motion.div>
        <svg className="absolute inset-0 pointer-events-none">{path.length > 1 && <path d={`M ${path.map(p => `${p.x},${p.y}`).join(' L ')}`} fill="none" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" />}</svg>
        {done && <div className="absolute inset-0 bg-black/70 flex items-center justify-center rounded-lg"><div className="text-center"><div className="text-5xl mb-2">💕</div><p className="text-green-400 font-bold">CONNECTED!</p></div></div>}
      </div>
    </div>
  );
};

export const BuildHomeGame = ({ onSuccess }) => {
  const [parts, setParts] = useState([]);
  const [score, setScore] = useState(0);
  const target = 50;
  const items = [{e:'🧱',n:'Foundation',p:10},{e:'🪵',n:'Walls',p:10},{e:'🪟',n:'Window',p:10},{e:'🚪',n:'Door',p:10},{e:'🏠',n:'Roof',p:10}];
  
  const add = (item) => { if (score >= target) return; setParts(p => [...p, {...item, id: Date.now()}]); const ns = score + item.p; setScore(ns); if (ns >= target) setTimeout(() => onSuccess && onSuccess(), 1500); };

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex justify-between mb-4"><span className="text-sm text-muted-foreground">Click parts to build</span><span className="text-primary">{score}/{target}</span></div>
      <div className="bg-card border-2 border-border rounded-lg p-6 min-h-[200px] mb-4 flex flex-wrap gap-2 justify-center items-center">
        {parts.map(p => <motion.span key={p.id} initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-4xl">{p.e}</motion.span>)}
        {parts.length === 0 && <span className="text-muted-foreground">Click parts below</span>}
      </div>
      <div className="grid grid-cols-5 gap-2">
        {items.map(item => <motion.button key={item.n} onClick={() => add(item)} disabled={score >= target} className="p-3 bg-card border border-border rounded-lg hover:border-primary disabled:opacity-50" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><div className="text-2xl">{item.e}</div><div className="text-xs text-muted-foreground">{item.n}</div></motion.button>)}
      </div>
      {score >= target && <div className="text-center mt-4"><div className="text-4xl mb-2">🏠</div><p className="text-green-400 font-bold">HOME COMPLETE!</p></div>}
    </div>
  );
};

export const CatchRingGame = ({ onSuccess }) => {
  const [handX, setHandX] = useState(50);
  const [rings, setRings] = useState([]);
  const [caught, setCaught] = useState(0);
  const [won, setWon] = useState(false);
  const target = 7;

  useEffect(() => {
    if (won) return;
    const int = setInterval(() => {
      if (Math.random() < 0.1) setRings(r => [...r, { id: Date.now(), x: Math.random() * 80 + 10, y: 0 }]);
      setRings(prev => prev.map(ring => {
        const ny = ring.y + 2;
        if (ny > 85 && ny < 95 && Math.abs(ring.x - handX) < 10) { setCaught(c => { const nc = c + 1; if (nc >= target) { setWon(true); setTimeout(() => onSuccess && onSuccess(), 2000); } return nc; }); return null; }
        if (ny > 100) return null;
        return { ...ring, y: ny };
      }).filter(Boolean));
    }, 50);
    return () => clearInterval(int);
  }, [handX, won, onSuccess]);

  const onMove = (e) => { const r = e.currentTarget.getBoundingClientRect(); setHandX(((e.clientX - r.left) / r.width) * 100); };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex justify-center gap-2 mb-4">{[...Array(target)].map((_, i) => <div key={i} className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm ${i < caught ? 'border-primary bg-primary/20' : 'border-muted'}`}>💍</div>)}</div>
      <div className="relative bg-gradient-to-b from-indigo-950 to-pink-950 rounded-lg h-[400px] cursor-none" onMouseMove={onMove}>
        {[...Array(30)].map((_, i) => <div key={i} className="absolute w-1 h-1 bg-white rounded-full animate-pulse" style={{ left: `${Math.random()*100}%`, top: `${Math.random()*60}%`, opacity: Math.random()*0.5+0.2 }} />)}
        {rings.map(ring => <motion.div key={ring.id} className="absolute text-2xl" style={{ left: `${ring.x}%`, top: `${ring.y}%`, transform: 'translate(-50%, -50%)' }} animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>💍</motion.div>)}
        <div className="absolute bottom-4 text-4xl" style={{ left: `${handX}%`, transform: 'translateX(-50%)' }}>🤲</div>
        {won && <div className="absolute inset-0 bg-black/80 flex items-center justify-center rounded-lg"><div className="text-center"><motion.div className="text-6xl mb-4" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.5, repeat: 3 }}>💍</motion.div><p className="text-2xl font-bold text-primary">SHE SAID YES!</p><p className="text-muted-foreground mt-2">14th May 2024</p></div></div>}
      </div>
    </div>
  );
};
