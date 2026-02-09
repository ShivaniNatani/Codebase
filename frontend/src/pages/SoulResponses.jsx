import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

// Same categories as SoulQuestions
const QUESTION_CATEGORIES = [
    {
        id: 'love',
        title: 'What He Loves About You',
        emoji: '💕',
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
        title: 'How Well He Knows You',
        emoji: '🧠',
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
        title: 'Understanding You & Changes',
        emoji: '🔄',
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
        title: 'Standing By You',
        emoji: '🛡️',
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
        title: 'His Forever Letter',
        emoji: '💌',
        questions: [
            "Write her a message she can read whenever she doubts your love - whenever the world is too heavy, whenever she feels alone. This is your forever letter to her."
        ]
    }
];

const SoulResponses = () => {
    const navigate = useNavigate();
    const [responses, setResponses] = useState({});
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        const saved = localStorage.getItem('soul_questions_responses');
        if (saved) {
            setResponses(JSON.parse(saved));
        }
    }, []);

    const getAnsweredCount = (category) => {
        return category.questions.filter((_, idx) =>
            responses[`${category.id}_${idx}`]?.trim()
        ).length;
    };

    const totalAnswered = QUESTION_CATEGORIES.reduce((sum, cat) => sum + getAnsweredCount(cat), 0);
    const totalQuestions = QUESTION_CATEGORIES.reduce((sum, cat) => sum + cat.questions.length, 0);

    if (totalAnswered === 0) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center p-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-md text-center"
                >
                    <div className="text-6xl mb-6">💭</div>
                    <h1 className="text-3xl font-bold text-foreground mb-4">No Responses Yet</h1>
                    <p className="text-muted-foreground mb-8">
                        The soul questions haven't been answered yet. Come back after they're completed.
                    </p>
                    <Button onClick={() => navigate('/chapters')} variant="outline">
                        ← Back to Chapters
                    </Button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="bg-background/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-40">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate('/chapters')}
                        className="text-muted-foreground hover:text-foreground"
                    >
                        <i className="fas fa-arrow-left mr-2" />
                        Back
                    </Button>

                    <div className="text-center">
                        <span className="text-xs font-mono text-primary tracking-widest">
                            YOUR FOREVER LETTERS
                        </span>
                    </div>

                    <div className="text-xs text-muted-foreground font-mono">
                        {totalAnswered}/{totalQuestions}
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-6 py-12 max-w-4xl">
                {/* Title Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="text-5xl mb-4">💝</div>
                    <h1 className="text-4xl font-bold text-foreground mb-3">
                        His Words, Forever Yours
                    </h1>
                    <p className="text-lg text-muted-foreground font-serif italic">
                        Read these whenever you need to remember how loved you are
                    </p>
                </motion.div>

                {/* Category Selection or Responses View */}
                <AnimatePresence mode="wait">
                    {selectedCategory === null ? (
                        // Category Grid
                        <motion.div
                            key="categories"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                        >
                            {QUESTION_CATEGORIES.map((category, index) => {
                                const answered = getAnsweredCount(category);
                                const hasResponses = answered > 0;

                                return (
                                    <motion.button
                                        key={category.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        onClick={() => hasResponses && setSelectedCategory(category)}
                                        disabled={!hasResponses}
                                        className={`
                      p-6 rounded-xl border text-left transition-all
                      ${hasResponses
                                                ? 'bg-card/50 border-border/50 hover:bg-card hover:border-primary/50 cursor-pointer'
                                                : 'bg-muted/20 border-border/30 opacity-50 cursor-not-allowed'}
                    `}
                                    >
                                        <div className="text-3xl mb-3">{category.emoji}</div>
                                        <h3 className="text-lg font-semibold text-foreground mb-1">
                                            {category.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {answered}/{category.questions.length} answered
                                        </p>
                                    </motion.button>
                                );
                            })}
                        </motion.div>
                    ) : (
                        // Responses View
                        <motion.div
                            key="responses"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                        >
                            <Button
                                variant="ghost"
                                onClick={() => setSelectedCategory(null)}
                                className="mb-6 text-muted-foreground"
                            >
                                ← Back to Categories
                            </Button>

                            <div className="text-center mb-8">
                                <div className="text-4xl mb-3">{selectedCategory.emoji}</div>
                                <h2 className="text-2xl font-bold text-foreground">
                                    {selectedCategory.title}
                                </h2>
                            </div>

                            <div className="space-y-8">
                                {selectedCategory.questions.map((question, idx) => {
                                    const answer = responses[`${selectedCategory.id}_${idx}`];
                                    if (!answer?.trim()) return null;

                                    return (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="bg-card/50 border border-border/50 rounded-xl p-6"
                                        >
                                            <p className="text-sm text-primary font-medium mb-3">
                                                {question}
                                            </p>
                                            <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                                                "{answer}"
                                            </p>
                                            <p className="text-right text-muted-foreground text-sm mt-4 font-serif italic">
                                                — Argha
                                            </p>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Footer Quote */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-center mt-16 pt-8 border-t border-border/30"
                >
                    <p className="text-muted-foreground font-serif italic">
                        "These words are yours to keep. Read them whenever you need to remember."
                    </p>
                    <p className="text-primary text-sm mt-2">💕</p>
                </motion.div>
            </main>
        </div>
    );
};

export default SoulResponses;
