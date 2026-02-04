import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

// Reflection Questions Component - Deep questions to prove love
export const ReflectionQuestions = ({ 
  questions, 
  onComplete, 
  chapterTitle,
  reflectionPrompt 
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showCompletion, setShowCompletion] = useState(false);

  const handleAnswer = (answer) => {
    setAnswers(prev => ({ ...prev, [currentQuestion]: answer }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowCompletion(true);
      setTimeout(() => onComplete?.(answers), 2000);
    }
  };

  const currentQ = questions[currentQuestion];
  const hasAnswered = answers[currentQuestion] !== undefined && answers[currentQuestion] !== '';

  return (
    <div className="max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {!showCompletion ? (
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Progress */}
            <div className="flex items-center gap-2 mb-6">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-colors ${
                    i < currentQuestion ? 'bg-green-500' : 
                    i === currentQuestion ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>

            {/* Reflection Prompt */}
            {currentQuestion === 0 && reflectionPrompt && (
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
                <p className="text-sm text-primary font-serif italic">{reflectionPrompt}</p>
              </div>
            )}

            {/* Question */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-4">
                <i className="fas fa-question-circle text-primary" />
                <span>QUESTION {currentQuestion + 1} OF {questions.length}</span>
              </div>

              <h3 className="text-xl font-bold text-foreground mb-6">
                {currentQ.question}
              </h3>

              {/* Different question types */}
              {currentQ.type === 'text' && (
                <Textarea
                  value={answers[currentQuestion] || ''}
                  onChange={(e) => handleAnswer(e.target.value)}
                  placeholder={currentQ.placeholder || 'Share your thoughts...'}
                  className="min-h-[120px] bg-background border-border"
                />
              )}

              {currentQ.type === 'choice' && (
                <RadioGroup
                  value={answers[currentQuestion]}
                  onValueChange={handleAnswer}
                  className="space-y-3"
                >
                  {currentQ.options.map((option, i) => (
                    <div key={i} className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:border-primary/50 transition-colors">
                      <RadioGroupItem value={option} id={`option-${i}`} />
                      <Label htmlFor={`option-${i}`} className="flex-1 cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {currentQ.type === 'scale' && (
                <div className="space-y-4">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{currentQ.scaleLabels?.[0] || 'Not at all'}</span>
                    <span>{currentQ.scaleLabels?.[1] || 'Completely'}</span>
                  </div>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                      <button
                        key={num}
                        onClick={() => handleAnswer(num)}
                        className={`flex-1 h-12 rounded-lg border-2 font-bold transition-all ${
                          answers[currentQuestion] === num 
                            ? 'border-primary bg-primary text-primary-foreground' 
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Hint/Note */}
            {currentQ.note && (
              <p className="text-sm text-muted-foreground text-center italic">
                {currentQ.note}
              </p>
            )}

            {/* Next Button */}
            <Button
              onClick={handleNext}
              disabled={!hasAnswered}
              className="w-full bg-primary hover:bg-primary/90"
              size="lg"
            >
              {currentQuestion < questions.length - 1 ? (
                <>Continue <i className="fas fa-arrow-right ml-2" /></>
              ) : (
                <>Complete Reflection <i className="fas fa-check ml-2" /></>
              )}
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, repeat: 2 }}
              className="w-20 h-20 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center mx-auto mb-6"
            >
              <i className="fas fa-heart text-3xl text-green-400" />
            </motion.div>
            <h3 className="text-2xl font-bold text-foreground mb-2">Reflection Complete</h3>
            <p className="text-muted-foreground">Your thoughts have been captured</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Journey Progress Component - Shows the path to proposal
export const JourneyProgress = ({ currentChapter, totalChapters = 7 }) => {
  const milestones = [
    { chapter: 1, label: 'Origin', icon: 'fa-baby' },
    { chapter: 2, label: 'Growth', icon: 'fa-seedling' },
    { chapter: 3, label: 'Struggle', icon: 'fa-heart-crack' },
    { chapter: 4, label: 'Rise', icon: 'fa-chart-line' },
    { chapter: 5, label: 'Destiny', icon: 'fa-star' },
    { chapter: 6, label: 'Together', icon: 'fa-hand-holding-heart' },
    { chapter: 7, label: 'Forever', icon: 'fa-ring' },
  ];

  return (
    <div className="bg-card/50 border border-border rounded-lg p-6">
      <h4 className="text-xs font-mono text-primary mb-4 text-center">JOURNEY TO PROPOSAL</h4>
      <div className="relative">
        {/* Progress line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-muted" />
        <div 
          className="absolute top-5 left-0 h-0.5 bg-primary transition-all duration-500"
          style={{ width: `${((currentChapter - 1) / (totalChapters - 1)) * 100}%` }}
        />
        
        {/* Milestone dots */}
        <div className="relative flex justify-between">
          {milestones.map((milestone, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center text-sm transition-all
                ${i + 1 < currentChapter ? 'bg-green-500 text-white' : 
                  i + 1 === currentChapter ? 'bg-primary text-primary-foreground ring-4 ring-primary/30' : 
                  'bg-muted text-muted-foreground'}
              `}>
                {i + 1 < currentChapter ? (
                  <i className="fas fa-check" />
                ) : (
                  <i className={`fas ${milestone.icon}`} />
                )}
              </div>
              <span className={`text-xs mt-2 ${
                i + 1 <= currentChapter ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {milestone.label}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Encouragement message */}
      <div className="text-center mt-6 text-sm text-muted-foreground">
        {currentChapter < 7 ? (
          <p><span className="text-primary font-medium">{7 - currentChapter}</span> chapters until the proposal</p>
        ) : (
          <p className="text-primary font-medium">The moment has arrived...</p>
        )}
      </div>
    </div>
  );
};

// Achievement Unlocked Component
export const AchievementUnlocked = ({ title, description, icon }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="fixed bottom-8 right-8 z-50 bg-card border border-primary/50 rounded-lg p-4 shadow-glow max-w-sm"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
          <i className={`fas ${icon} text-xl text-primary`} />
        </div>
        <div>
          <p className="text-xs font-mono text-primary">ACHIEVEMENT UNLOCKED</p>
          <h4 className="font-bold text-foreground">{title}</h4>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

// Life Stats Display
export const LifeStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-card border border-border rounded-lg p-4 text-center"
        >
          <div className="text-2xl mb-2">{stat.emoji}</div>
          <div className="text-2xl font-bold text-primary">{stat.value}</div>
          <div className="text-xs text-muted-foreground">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
};

export default ReflectionQuestions;
