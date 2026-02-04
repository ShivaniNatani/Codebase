import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export const ReflectionQuestions = ({ questions, onComplete, reflectionPrompt }) => {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [done, setDone] = useState(false);

  const q = questions[current];
  const hasAnswer = answers[current] !== undefined && answers[current] !== '';

  const handleAnswer = (val) => setAnswers(prev => ({ ...prev, [current]: val }));

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(c => c + 1);
    } else {
      setDone(true);
      setTimeout(() => onComplete && onComplete(answers), 1500);
    }
  };

  if (done) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
        <div className="w-20 h-20 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center mx-auto mb-6">
          <i className="fas fa-heart text-3xl text-green-400" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">Reflection Complete</h3>
        <p className="text-muted-foreground">Your thoughts have been captured</p>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex gap-2 mb-6">
        {questions.map((_, i) => (
          <div key={i} className={`h-1 flex-1 rounded-full ${i < current ? 'bg-green-500' : i === current ? 'bg-primary' : 'bg-muted'}`} />
        ))}
      </div>

      {current === 0 && reflectionPrompt && (
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
          <p className="text-sm text-primary font-serif italic">{reflectionPrompt}</p>
        </div>
      )}

      <motion.div key={current} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-card border border-border rounded-lg p-6">
        <div className="text-xs font-mono text-muted-foreground mb-4">
          <i className="fas fa-question-circle text-primary mr-2" />
          QUESTION {current + 1} OF {questions.length}
        </div>

        <h3 className="text-xl font-bold text-foreground mb-6">{q.question}</h3>

        {q.type === 'text' && (
          <Textarea value={answers[current] || ''} onChange={(e) => handleAnswer(e.target.value)} placeholder={q.placeholder || 'Share your thoughts...'} className="min-h-[120px] bg-background" />
        )}

        {q.type === 'scale' && (
          <div className="space-y-4">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{q.scaleLabels ? q.scaleLabels[0] : 'Low'}</span>
              <span>{q.scaleLabels ? q.scaleLabels[1] : 'High'}</span>
            </div>
            <div className="flex gap-2">
              {[1,2,3,4,5,6,7,8,9,10].map(n => (
                <button key={n} onClick={() => handleAnswer(n)} className={`flex-1 h-12 rounded-lg border-2 font-bold transition-all ${answers[current] === n ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:border-primary/50'}`}>{n}</button>
              ))}
            </div>
          </div>
        )}

        {q.type === 'choice' && (
          <div className="space-y-3">
            {q.options && q.options.map((opt, i) => (
              <div key={i} onClick={() => handleAnswer(opt)} className={`p-3 rounded-lg border cursor-pointer transition-colors ${answers[current] === opt ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'}`}>
                <Label className="cursor-pointer flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${answers[current] === opt ? 'border-primary bg-primary' : 'border-muted-foreground'}`}>
                    {answers[current] === opt && <i className="fas fa-check text-xs text-primary-foreground" />}
                  </div>
                  {opt}
                </Label>
              </div>
            ))}
          </div>
        )}

        {q.note && <p className="text-sm text-muted-foreground text-center italic mt-4">{q.note}</p>}
      </motion.div>

      <Button onClick={handleNext} disabled={!hasAnswer} className="w-full bg-primary hover:bg-primary/90" size="lg">
        {current < questions.length - 1 ? 'Continue' : 'Complete Reflection'} <i className="fas fa-arrow-right ml-2" />
      </Button>
    </div>
  );
};

export const JourneyProgress = ({ currentChapter, totalChapters = 8 }) => {
  const milestones = ['Origin', 'Alpha', 'Bitter', 'Glitch', 'Opposites', 'Support', 'Revelation', 'Forever'];
  
  return (
    <div className="bg-card/50 border border-border rounded-lg p-6">
      <h4 className="text-xs font-mono text-primary mb-4 text-center">JOURNEY TO PROPOSAL</h4>
      <div className="relative">
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-muted" />
        <div className="absolute top-5 left-0 h-0.5 bg-primary transition-all" style={{ width: `${((currentChapter - 1) / (totalChapters - 1)) * 100}%` }} />
        <div className="relative flex justify-between">
          {milestones.map((m, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-sm transition-all ${i + 1 < currentChapter ? 'bg-green-500 text-white' : i + 1 === currentChapter ? 'bg-primary text-primary-foreground ring-4 ring-primary/30' : 'bg-muted text-muted-foreground'}`}>
                {i + 1 < currentChapter ? <i className="fas fa-check" /> : i + 1}
              </div>
              <span className={`text-[10px] md:text-xs mt-2 ${i + 1 <= currentChapter ? 'text-foreground' : 'text-muted-foreground'}`}>{m}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center mt-6 text-sm text-muted-foreground">
        {currentChapter < 7 ? <p><span className="text-primary font-medium">{7 - currentChapter}</span> chapters until the proposal</p> : <p className="text-primary font-medium">The moment has arrived...</p>}
      </div>
    </div>
  );
};

export const LifeStats = ({ stats }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {stats.map((s, i) => (
      <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-card border border-border rounded-lg p-4 text-center">
        <div className="text-2xl mb-2">{s.emoji}</div>
        <div className="text-2xl font-bold text-primary">{s.value}</div>
        <div className="text-xs text-muted-foreground">{s.label}</div>
      </motion.div>
    ))}
  </div>
);

export default ReflectionQuestions;
