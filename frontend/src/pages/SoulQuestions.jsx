import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChapterLayout } from '@/components/ChapterLayout';

// All question categories with their questions
const QUESTION_CATEGORIES = [
    {
        id: 'love',
        title: 'What You Love About Her',
        emoji: '💕',
        subtitle: 'Tell her why she\'s the one',
        questions: [
            "What is the one thing about Shivani that made you fall in love with her?",
            "What quality of hers makes you feel the luckiest?",
            "Describe a moment when you looked at her and thought 'She's the one.'",
            "What is something small she does that makes your heart skip?",
            "What do you admire most about her strength?",
            "What is your favorite memory with her?",
            "What makes her different from everyone you've ever known?",
            "If you had to describe her in three words to someone, what would they be?"
        ]
    },
    {
        id: 'knowing',
        title: 'How Well You Know Her',
        emoji: '🧠',
        subtitle: 'Show her you truly see her',
        questions: [
            "What is her biggest fear that she doesn't tell everyone?",
            "What is her comfort food when she's sad?",
            "What is her dream that she's too afraid to chase?",
            "What does she need most when she's upset - space or closeness?",
            "How does her anxiety look? What are the signs you notice?",
            "What triggers her stress or overwhelm the most?",
            "What is her love language - how does she feel most loved?",
            "What is something she's insecure about that you want to reassure her on?",
            "What does her 'I'm fine' actually mean?",
            "What makes her genuinely happy - not just content, but truly light up?"
        ]
    },
    {
        id: 'changes',
        title: 'Understanding Her & Changes',
        emoji: '🔄',
        subtitle: 'She needs patience, not pressure',
        questions: [
            "She doesn't adapt quickly to changes. How will you give her the time and space she needs?",
            "When life forces sudden changes, how will you be her anchor?",
            "If she resists a change you think is good, how do you handle it with patience?",
            "What is one thing about her that you've accepted without trying to change?",
            "How do you support her when she's processing something difficult?",
            "What do you do when your timelines don't match - you're ready but she's not?",
            "How do you make her feel safe when her world feels unpredictable?",
            "What does 'giving her time' practically look like for you?"
        ]
    },
    {
        id: 'compatibility',
        title: 'Compatibility & Connection',
        emoji: '💞',
        subtitle: 'Your future together',
        questions: [
            "What is the one thing you both disagree on, but it doesn't matter?",
            "How do you imagine a regular Sunday with her 10 years from now?",
            "What is something you've learned from her that changed you?",
            "When you're with her, what version of yourself do you become?",
            "What is the hardest conversation you know you'll need to have with her someday?",
            "How do you plan to grow together, not apart?",
            "What shared dream do you both have for your future?",
            "What do you want your home to feel like with her?"
        ]
    },
    {
        id: 'emotional',
        title: 'Emotional Care & Support',
        emoji: '🤗',
        subtitle: 'How you\'ll hold her heart',
        questions: [
            "How do you know when she's not okay, even if she says she is?",
            "What do you do when you see her struggling but don't know how to help?",
            "What is your promise to her on her worst days?",
            "How do you make her feel safe?",
            "When she's anxious and spiraling, what do you do to calm her?",
            "When she shuts down emotionally, how do you reach her without pushing?",
            "How do you hold space for her pain without trying to fix it?",
            "What does unconditional support look like to you?",
            "How will you remind her of her worth when she forgets?",
            "What will you never let her face alone?"
        ]
    },
    {
        id: 'standing',
        title: 'Standing By Her',
        emoji: '🛡️',
        subtitle: 'Culture, lifestyle & unconditional support',
        questions: [
            "You both come from different backgrounds. How will you stand by her choices when others question them?",
            "If your family or friends don't understand her, what will you do?",
            "How will you ensure she never has to justify who she is to anyone?",
            "She should never have to change her food, her clothes, her choices. How do you protect her freedom?",
            "If someone comments on her lifestyle, what's your response?",
            "How do you make sure she never feels like she has to 'fit in' for your world?",
            "What does 'being on her team' mean to you - publicly and privately?",
            "When the world is against her, where will you be?",
            "How do you balance your family's expectations with her comfort?",
            "What will you fight for, even if it means standing alone with her?"
        ]
    },
    {
        id: 'marriage',
        title: 'Marriage Readiness',
        emoji: '💍',
        subtitle: 'Are you ready for forever?',
        questions: [
            "What does marriage mean to you?",
            "What are you most excited about for your life together?",
            "What is one thing you want to promise her before marriage?",
            "What scares you about forever, and how will you overcome it?",
            "What will you do when marriage gets hard and the spark fades?",
            "How do you want to celebrate her, even in ordinary days?",
            "What does 'choosing her every day' look like practically?",
            "What is the foundation you want to build your marriage on?"
        ]
    },
    {
        id: 'situations',
        title: 'Situational Scenarios',
        emoji: '🎭',
        subtitle: 'Real life challenges',
        questions: [
            "If she got her dream job in another country, what would you do?",
            "If she's overwhelmed and pushing everyone away, how do you handle it?",
            "If you have a terrible fight, what's your first step towards fixing it?",
            "If she changes over the years, how do you fall in love with the new her?",
            "If she's not ready for something you want, how long do you wait?",
            "If your career demands something that affects her, how do you decide?",
            "If she's struggling with her mental health, what's your role?",
            "If life gets so hard that you both want to give up, what do you do?",
            "If you hurt her unintentionally, how do you make it right?",
            "If she needs you to be soft when you want to be logical, can you do it?"
        ]
    },
    {
        id: 'letter',
        title: 'Your Forever Letter',
        emoji: '💌',
        subtitle: 'A message she can read whenever she needs you',
        questions: [
            "Write her a message she can read whenever she doubts your love - whenever the world is too heavy, whenever she feels alone. This is your forever letter to her."
        ]
    }
];

const SoulQuestions = () => {
    const navigate = useNavigate();
    const [currentCategory, setCurrentCategory] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [responses, setResponses] = useState(() => {
        const saved = localStorage.getItem('soul_questions_responses');
        return saved ? JSON.parse(saved) : {};
    });
    const [currentAnswer, setCurrentAnswer] = useState('');
    const [showIntro, setShowIntro] = useState(true);

    const category = QUESTION_CATEGORIES[currentCategory];
    const question = category?.questions[currentQuestion];
    const questionKey = `${category?.id}_${currentQuestion}`;

    // Load saved answer when question changes
    useEffect(() => {
        const savedAnswer = responses[questionKey] || '';
        setCurrentAnswer(savedAnswer);
    }, [currentCategory, currentQuestion, questionKey, responses]);

    // Save responses to localStorage
    const saveResponse = () => {
        if (currentAnswer.trim()) {
            const newResponses = { ...responses, [questionKey]: currentAnswer };
            setResponses(newResponses);
            localStorage.setItem('soul_questions_responses', JSON.stringify(newResponses));
        }
    };

    const handleNext = () => {
        saveResponse();

        if (currentQuestion < category.questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
        } else if (currentCategory < QUESTION_CATEGORIES.length - 1) {
            setCurrentCategory(prev => prev + 1);
            setCurrentQuestion(0);
        } else {
            // All questions complete
            navigate('/protocol-final');
        }
    };

    const handlePrevious = () => {
        saveResponse();

        if (currentQuestion > 0) {
            setCurrentQuestion(prev => prev - 1);
        } else if (currentCategory > 0) {
            const prevCategory = QUESTION_CATEGORIES[currentCategory - 1];
            setCurrentCategory(prev => prev - 1);
            setCurrentQuestion(prevCategory.questions.length - 1);
        }
    };

    const handleSkip = () => {
        handleNext();
    };

    // Calculate total progress
    const totalQuestions = QUESTION_CATEGORIES.reduce((sum, cat) => sum + cat.questions.length, 0);
    const questionsCompleted = QUESTION_CATEGORIES.slice(0, currentCategory).reduce((sum, cat) => sum + cat.questions.length, 0) + currentQuestion;
    const progressPercent = (questionsCompleted / totalQuestions) * 100;

    if (showIntro) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center p-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-2xl text-center"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: 'spring' }}
                        className="text-6xl mb-8"
                    >
                        💭
                    </motion.div>

                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                        SOUL QUESTIONS
                    </h1>

                    <p className="text-xl text-muted-foreground mb-4 font-serif italic">
                        Before the final chapter...
                    </p>

                    <div className="bg-card/50 border border-border/50 rounded-xl p-6 mb-8">
                        <p className="text-lg text-foreground/90 leading-relaxed">
                            Argha, these questions are for you. Answer them honestly, from your heart.
                            There are no right or wrong answers - just truth.
                        </p>
                        <p className="text-lg text-foreground/90 leading-relaxed mt-4">
                            Your responses will be saved forever. She will read them.
                            Not just today, but whenever she needs to remember why she chose you.
                        </p>
                    </div>

                    <div className="text-sm text-muted-foreground mb-8 space-y-1">
                        <p>📝 {totalQuestions} questions across {QUESTION_CATEGORIES.length} categories</p>
                        <p>💾 Your answers auto-save</p>
                        <p>⏭️ You can skip questions (but try not to)</p>
                    </div>

                    <Button
                        onClick={() => setShowIntro(false)}
                        size="lg"
                        className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-6 text-lg"
                    >
                        Begin →
                    </Button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Progress Bar */}
            <div className="fixed top-0 left-0 right-0 h-1 bg-muted z-50">
                <motion.div
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.3 }}
                />
            </div>

            {/* Header */}
            <header className="fixed top-1 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border/50">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate('/chapters')}
                        className="text-muted-foreground hover:text-foreground"
                    >
                        <i className="fas fa-arrow-left mr-2" />
                        Save & Exit
                    </Button>

                    <div className="text-center">
                        <span className="text-xs font-mono text-primary tracking-widest">
                            SOUL QUESTIONS
                        </span>
                    </div>

                    <div className="text-xs text-muted-foreground font-mono">
                        {questionsCompleted + 1}/{totalQuestions}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="pt-24 pb-32 px-6">
                <div className="container mx-auto max-w-3xl">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={questionKey}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Category Header */}
                            <div className="text-center mb-8">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="text-4xl mb-3"
                                >
                                    {category.emoji}
                                </motion.div>
                                <h2 className="text-2xl font-bold text-foreground mb-1">
                                    {category.title}
                                </h2>
                                <p className="text-sm text-muted-foreground font-serif italic">
                                    {category.subtitle}
                                </p>
                                <p className="text-xs text-muted-foreground mt-2">
                                    Question {currentQuestion + 1} of {category.questions.length}
                                </p>
                            </div>

                            {/* Question */}
                            <div className="bg-card/50 border border-border/50 rounded-xl p-8 mb-8">
                                <p className="text-xl text-foreground leading-relaxed text-center">
                                    {question}
                                </p>
                            </div>

                            {/* Answer Input */}
                            <div className="mb-8">
                                <textarea
                                    value={currentAnswer}
                                    onChange={(e) => setCurrentAnswer(e.target.value)}
                                    placeholder="Type your answer here... Be honest, be real."
                                    className="w-full h-48 bg-background border border-border rounded-xl p-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                                />
                                {currentAnswer.length > 0 && (
                                    <p className="text-xs text-muted-foreground text-right mt-2">
                                        {currentAnswer.length} characters
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>

            {/* Navigation Footer */}
            <footer className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t border-border/50 p-4">
                <div className="container mx-auto max-w-3xl flex items-center justify-between">
                    <Button
                        variant="ghost"
                        onClick={handlePrevious}
                        disabled={currentCategory === 0 && currentQuestion === 0}
                        className="text-muted-foreground"
                    >
                        ← Previous
                    </Button>

                    <Button
                        variant="ghost"
                        onClick={handleSkip}
                        className="text-muted-foreground text-sm"
                    >
                        Skip
                    </Button>

                    <Button
                        onClick={handleNext}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                        {currentCategory === QUESTION_CATEGORIES.length - 1 &&
                            currentQuestion === category.questions.length - 1
                            ? 'Complete & Continue →'
                            : 'Next →'}
                    </Button>
                </div>
            </footer>
        </div>
    );
};

export default SoulQuestions;
