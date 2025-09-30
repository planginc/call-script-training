import React, { useState, useEffect } from 'react';
import { 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  EyeOff,
  Volume2,
  VolumeX,
  Shuffle
} from 'lucide-react';

interface Flashcard {
  id: string;
  front: string;
  back: string;
  category: 'compliance' | 'script' | 'process' | 'legal' | 'objection';
  difficulty: 'easy' | 'medium' | 'hard';
  mastery: number; // 0-100
}

const flashcards: Flashcard[] = [
  // OPENING SCRIPTS
  {
    id: 'outbound-opening',
    front: 'Outbound Opening Script',
    back: 'Hi, is [client\'s name] available? This is [your name] from ClearOne Advantage **calling on a recorded line. You can opt out at any time.** I am contacting you per your request through [lead type] to look into options for paying off your unsecured debt.\n\nI have been assigned as your Certified Debt Consultant. We offer a number of solutions for customers like yourself. My job is to understand your goals and to help you pay off your debt. What are you looking to accomplish today?',
    category: 'compliance',
    difficulty: 'easy',
    mastery: 0
  },
  {
    id: 'inbound-opening',
    front: 'Inbound Opening Script',
    back: 'Thank you for calling ClearOne Advantage. **All calls are recorded and monitored, and you can opt out at any time.** My name is [________]. How may I assist you today?',
    category: 'compliance',
    difficulty: 'easy',
    mastery: 0
  },

  // COMPLIANCE REQUIREMENTS
  {
    id: 'fcra-authorization',
    front: 'FCRA Authorization (Verbatim)',
    back: 'Does ClearOne Advantage have your verbal authorization under the Fair Credit Reporting Act to obtain information from your personal credit report or other information from Experian to determine if you are a candidate for debt consolidation options and for fraud prevention purposes?',
    category: 'compliance',
    difficulty: 'hard',
    mastery: 0
  },
  {
    id: 'recorded-line-disclosure',
    front: 'Recorded Line Disclosure',
    back: '**All calls are recorded and monitored, and you can opt out at any time.**',
    category: 'compliance',
    difficulty: 'easy',
    mastery: 0
  },
  {
    id: 'no-guarantee-disclosure',
    front: 'No Guarantee Disclosure',
    back: 'We cannot guarantee that we will be able to settle your debts or that we will be able to settle them for a specific amount. Results may vary based on your individual circumstances and creditor policies.',
    category: 'compliance',
    difficulty: 'medium',
    mastery: 0
  },
  {
    id: 'success-based-compensation',
    front: 'Success-Based Compensation',
    back: 'We make no money until we\'ve negotiated a settlement with your creditor that you\'ve approved and at least one payment has been made as a result of the new settlement.',
    category: 'compliance',
    difficulty: 'medium',
    mastery: 0
  },

  // DISCOVERY QUESTIONS
  {
    id: 'core-situation-1',
    front: 'Core Situation Question 1',
    back: 'What changed financially that made you inquire about consolidating your debts today?',
    category: 'script',
    difficulty: 'medium',
    mastery: 0
  },
  {
    id: 'core-situation-2',
    front: 'Core Situation Question 2',
    back: 'How long has this been going on for?',
    category: 'script',
    difficulty: 'medium',
    mastery: 0
  },
  {
    id: 'core-situation-3',
    front: 'Core Situation Question 3',
    back: 'How much has it impacted your income?',
    category: 'script',
    difficulty: 'medium',
    mastery: 0
  },
  {
    id: 'credit-pull-transition',
    front: 'Credit Pull Transition Questions',
    back: '• Could you please provide me with your physical address?\n• Can you provide me with your date of birth?\n• Lastly, can you provide me with your social?',
    category: 'script',
    difficulty: 'medium',
    mastery: 0
  },

  // THE 5 OPTIONS FRAMEWORK (CRITICAL STRATEGY)
  {
    id: 'option-1-presentation',
    front: 'Option 1: Pay Off Yourself',
    back: 'The 1st option I recommend to my clients is to "pay the debt off on your own". Now in order to do so we would have to double your monthly minimum payments to {2x min. payment amount}, stop using the cards all together and still comfortably pay all of your other monthly expenses. Based on the budget we just completed, is this something you think you could manage monthly for the next 3-5 years comfortably?',
    category: 'script',
    difficulty: 'hard',
    mastery: 0
  },
  {
    id: 'option-1-disqualification',
    front: 'Option 1 Disqualification Logic',
    back: 'Most of my clients are not in a position to double their min. payments, so do you agree "paying the debt off on your own" is not your best option?',
    category: 'script',
    difficulty: 'hard',
    mastery: 0
  },
  {
    id: 'option-2-presentation',
    front: 'Option 2: Consolidation Loan',
    back: 'The next option clients typically pursue is a "Consolidation loan". This is when you apply to borrow a loan to pay off the full debt amount and then pay the loan back in a 3–5-year term. Typically, you need to have a stellar credit rating and make 3-4 times the amount of the loan you\'re looking to borrow. Based on what we reviewed in your credit profile, and the red flags we discussed, I don\'t see where you\'re going to qualify for the loan amount needed to pay off this debt off in full. Not to mention a better interest rate than you already have. I\'m also assuming you weren\'t looking to add another monthly expense to your budget today, Correct?',
    category: 'script',
    difficulty: 'hard',
    mastery: 0
  },
  {
    id: 'option-3-presentation',
    front: 'Option 3: Bankruptcy',
    back: 'The third option is bankruptcy. This is a legal process that can eliminate most of your unsecured debt, but it will stay on your credit report for 7-10 years and can affect your ability to get credit, housing, or even employment. It\'s also a very public process that requires court appearances. Is this something you\'ve considered, and if so, what\'s held you back from pursuing it?',
    category: 'script',
    difficulty: 'hard',
    mastery: 0
  },
  {
    id: 'option-4-presentation',
    front: 'Option 4: Debt Settlement (TARGET)',
    back: 'The last option is a hardship program that your states legislation allows you to participate in and it\'s called "Debt Settlement". This is the only option out of the 5 available that lets you reduce your monthly costs, because you\'re avoiding future compounding interest on the debt and the principal balances are negotiated to a reduction of 25-30% on average including all creditors and fees. Due to that reduction on the principal balance, it also lowers your monthly payment in half on avg. giving you monthly savings and getting you out of debt in the in a shorter period of time. Now you will need to voluntarily stop the payments directly to the creditors, which will have a negative impact on your credit score. Does that make sense?',
    category: 'script',
    difficulty: 'hard',
    mastery: 0
  },
  {
    id: 'option-5-presentation',
    front: 'Option 5: Do Nothing',
    back: 'The fifth option is to do nothing and continue making minimum payments. This means you\'ll be paying on this debt for 15-20 years, paying 2-3 times the original amount due to interest, and your credit will continue to suffer from high utilization. Is this really an option you want to consider?',
    category: 'script',
    difficulty: 'hard',
    mastery: 0
  },

  // LEGAL PROTECTION SERVICES
  {
    id: 'legal-protection-services',
    front: 'Legal Protection Services ($33.95/month)',
    back: 'I would now like to discuss a service that I highly recommend to all my clients called legal protection services. This is a legal club that costs $33.95 a month and has already been factored into the program payment I just quoted. This service provides added protection for your program, specifically in the event of a lawsuit. Legal Protection Services grant you access to a law firm who will represent you throughout the case and is prepared to appear in court if needed. Additional benefits include access to an online education portal full of tools and articles regarding financial health, and access to discounted legal services.',
    category: 'compliance',
    difficulty: 'hard',
    mastery: 0
  },

  // PROGRAM EXPLANATION
  {
    id: 'program-steps',
    front: 'Program Steps (Verbatim)',
    back: 'STEP 1: We will contact your creditors to inform them that you are working with a debt settlement company and that all future correspondence should be directed to us.\n\nSTEP 2: You will stop making payments directly to your creditors and instead make one monthly payment to us.\n\nSTEP 3: We will negotiate with your creditors to reduce the total amount you owe.\n\nSTEP 4: Once your creditor agrees to a settlement, we will contact you immediately to get your approval to start processing payments.\n\nSTEP 5: When you have successfully paid as scheduled and your creditor has been paid all the newly structured payments, you should start to see improvement on your credit profile.',
    category: 'script',
    difficulty: 'hard',
    mastery: 0
  },
  {
    id: 'close-question',
    front: 'CLOSE Question (Verbatim)',
    back: 'If I can get you approved for a (XX) month program at (program payment) would this be an option you would feel comfortable with to help you pay off your debt?',
    category: 'script',
    difficulty: 'hard',
    mastery: 0
  },

  // CREDIT ANALYSIS
  {
    id: 'credit-utilization',
    front: 'Credit Utilization Definition',
    back: 'Credit Utilization refers to the amount of credit you have used compared with how much credit you have been extended by your creditors. This accounts for 30% of your credit score.',
    category: 'process',
    difficulty: 'medium',
    mastery: 0
  },
  {
    id: 'payment-history',
    front: 'Payment History Impact',
    back: 'Payment History accounts for 35% of your credit score. If there is past due payment history, ask why.',
    category: 'process',
    difficulty: 'medium',
    mastery: 0
  },
  {
    id: 'credit-age',
    front: 'Credit Age Impact',
    back: 'Length of Credit History accounts for 15% of your credit score. Older accounts are better for your score.',
    category: 'process',
    difficulty: 'medium',
    mastery: 0
  },
  {
    id: 'credit-mix',
    front: 'Credit Mix Impact',
    back: 'Credit Mix accounts for 10% of your credit score. Having different types of credit (revolving, installment) is beneficial.',
    category: 'process',
    difficulty: 'medium',
    mastery: 0
  },
  {
    id: 'new-credit',
    front: 'New Credit Impact',
    back: 'New Credit accounts for 10% of your credit score. Too many recent inquiries can hurt your score.',
    category: 'process',
    difficulty: 'medium',
    mastery: 0
  },

  // FEE STRUCTURE
  {
    id: 'missouri-fee',
    front: 'Missouri Fee Rate',
    back: '18% of total enrolled debt amount',
    category: 'legal',
    difficulty: 'easy',
    mastery: 0
  },
  {
    id: 'iowa-fee',
    front: 'Iowa Fee Rate',
    back: '18% of total enrolled debt amount',
    category: 'legal',
    difficulty: 'easy',
    mastery: 0
  },
  {
    id: 'idaho-fee',
    front: 'Idaho Fee Rate',
    back: '28% of total enrolled debt amount',
    category: 'legal',
    difficulty: 'easy',
    mastery: 0
  },
  {
    id: 'other-states-fee',
    front: 'All Other States Fee Rate',
    back: '25% of total enrolled debt amount',
    category: 'legal',
    difficulty: 'easy',
    mastery: 0
  },

  // TRANSITION PHRASES
  {
    id: 'transition-to-credit-pull',
    front: 'Transition to Credit Pull',
    back: 'In order to provide you with the most accurate information and the best options available, I need to pull your credit report. This will help me understand your current financial situation and determine which solutions would work best for you.',
    category: 'script',
    difficulty: 'medium',
    mastery: 0
  },
  {
    id: 'transition-to-5-options',
    front: 'Transition to 5 Options',
    back: 'Based on what I\'m seeing in your credit profile and the information you\'ve shared with me, there are 5 different options available to help you get out of debt. Let me walk you through each one so you can make an informed decision.',
    category: 'script',
    difficulty: 'medium',
    mastery: 0
  },
  {
    id: 'transition-to-program',
    front: 'Transition to Program Explanation',
    back: 'Now that we\'ve discussed all the options, let me explain how our debt settlement program works if you decide this is the right solution for you.',
    category: 'script',
    difficulty: 'medium',
    mastery: 0
  },

  // OBJECTION HANDLING
  {
    id: 'objection-credit-impact',
    front: 'Objection: Credit Impact',
    back: 'I understand your concern about your credit score. Yes, there will be a temporary negative impact, but remember - your credit is already being affected by high utilization and missed payments. Our program helps you get out of debt faster, which means you can start rebuilding your credit sooner. Plus, once you\'re debt-free, you\'ll have more money available to make positive credit decisions.',
    category: 'objection',
    difficulty: 'hard',
    mastery: 0
  },
  {
    id: 'objection-stopping-payments',
    front: 'Objection: Stopping Payments',
    back: 'I understand this feels uncomfortable. The reason we ask you to stop payments is that creditors are much more willing to negotiate when they\'re not receiving regular payments. This is what allows us to get you the 25-30% reduction in your total debt. It\'s a temporary strategy that leads to long-term financial freedom.',
    category: 'objection',
    difficulty: 'hard',
    mastery: 0
  },
  {
    id: 'objection-timeframe',
    front: 'Objection: How Long Will It Take',
    back: 'The program typically takes 24-48 months to complete, depending on your total debt and monthly payment. This is significantly faster than making minimum payments, which would take 15-20 years. We work with your budget to find a payment amount that\'s comfortable for you while still allowing us to negotiate meaningful settlements.',
    category: 'objection',
    difficulty: 'medium',
    mastery: 0
  }
];

export const Flashcards: React.FC = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [studyMode, setStudyMode] = useState<'all' | 'compliance' | 'script' | 'process' | 'legal' | 'objection'>('all');
  const [difficulty, setDifficulty] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const [isShuffled, setIsShuffled] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [studyCards, setStudyCards] = useState<Flashcard[]>([]);
  const [sessionStats, setSessionStats] = useState({
    correct: 0,
    incorrect: 0,
    total: 0
  });

  // Filter cards based on study mode and difficulty
  useEffect(() => {
    let filtered = flashcards;
    
    if (studyMode !== 'all') {
      filtered = filtered.filter(card => card.category === studyMode);
    }
    
    if (difficulty !== 'all') {
      filtered = filtered.filter(card => card.difficulty === difficulty);
    }
    
    if (isShuffled) {
      filtered = [...filtered].sort(() => Math.random() - 0.5);
    }
    
    setStudyCards(filtered);
    setCurrentCardIndex(0);
    setIsFlipped(false);
  }, [studyMode, difficulty, isShuffled]);

  const currentCard = studyCards[currentCardIndex];

  const nextCard = () => {
    if (currentCardIndex < studyCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    }
  };

  const prevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsFlipped(false);
    }
  };

  const shuffleCards = () => {
    setIsShuffled(!isShuffled);
  };

  const markCorrect = () => {
    setSessionStats(prev => ({
      ...prev,
      correct: prev.correct + 1,
      total: prev.total + 1
    }));
    nextCard();
  };

  const markIncorrect = () => {
    setSessionStats(prev => ({
      ...prev,
      incorrect: prev.incorrect + 1,
      total: prev.total + 1
    }));
    nextCard();
  };

  const resetSession = () => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setSessionStats({ correct: 0, incorrect: 0, total: 0 });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'text-green-600 bg-green-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'hard':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'compliance':
        return 'text-red-600 bg-red-100';
      case 'script':
        return 'text-blue-600 bg-blue-100';
      case 'process':
        return 'text-green-600 bg-green-100';
      case 'legal':
        return 'text-purple-600 bg-purple-100';
      case 'objection':
        return 'text-orange-600 bg-orange-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  if (studyCards.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Flashcards</h1>
          <p className="text-gray-600">No cards match your current filter criteria. Try adjusting your study mode or difficulty settings.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Flashcards</h1>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsAudioEnabled(!isAudioEnabled)}
              className={`p-2 rounded-lg border ${
                isAudioEnabled 
                  ? 'bg-blue-100 border-blue-300 text-blue-600' 
                  : 'bg-gray-100 border-gray-300 text-gray-600'
              }`}
            >
              {isAudioEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
            </button>
            <button
              onClick={shuffleCards}
              className={`p-2 rounded-lg border ${
                isShuffled
                  ? 'bg-blue-100 border-blue-300 text-blue-600'
                  : 'bg-gray-100 border-gray-300 text-gray-600'
              }`}
            >
              <Shuffle className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <select
            value={studyMode}
            onChange={(e) => setStudyMode(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Categories</option>
            <option value="compliance">Compliance</option>
            <option value="script">Script</option>
            <option value="process">Process</option>
            <option value="legal">Legal</option>
            <option value="objection">Objection Handling</option>
          </select>

          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        {/* Progress */}
        <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
          <span>Card {currentCardIndex + 1} of {studyCards.length}</span>
          <span>{sessionStats.correct} correct, {sessionStats.incorrect} incorrect</span>
        </div>
      </div>

      {/* Flashcard */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(currentCard.category)}`}>
              {currentCard.category}
            </span>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(currentCard.difficulty)}`}>
              {currentCard.difficulty}
            </span>
          </div>
          <button
            onClick={() => setIsFlipped(!isFlipped)}
            className="flex items-center text-sm text-gray-600 hover:text-gray-900"
          >
            {isFlipped ? <EyeOff className="h-4 w-4 mr-1" /> : <Eye className="h-4 w-4 mr-1" />}
            {isFlipped ? 'Show Question' : 'Show Answer'}
          </button>
        </div>

        <div className="min-h-[300px] flex items-center justify-center">
          <div className="text-center max-w-2xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {isFlipped ? 'Answer' : 'Question'}
            </h3>
            <div className={`text-gray-700 whitespace-pre-wrap ${
              isFlipped ? 'font-mono text-sm' : 'text-base'
            }`}>
              {isFlipped ? currentCard.back : currentCard.front}
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={prevCard}
            disabled={currentCardIndex === 0}
            className={`px-4 py-2 rounded-lg border ${
              currentCardIndex === 0
                ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            ← Previous
          </button>

          <button
            onClick={nextCard}
            disabled={currentCardIndex === studyCards.length - 1}
            className={`px-4 py-2 rounded-lg border ${
              currentCardIndex === studyCards.length - 1
                ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Next →
          </button>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={markIncorrect}
            className="flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 border border-red-200"
          >
            <XCircle className="h-4 w-4 mr-2" />
            Incorrect
          </button>
          <button
            onClick={markCorrect}
            className="flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 border border-green-200"
          >
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Correct
          </button>
        </div>
      </div>

      {/* Session Stats */}
      {sessionStats.total > 0 && (
        <div className="mt-6 bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-2">Session Statistics</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">{sessionStats.correct}</div>
              <div className="text-sm text-gray-600">Correct</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">{sessionStats.incorrect}</div>
              <div className="text-sm text-gray-600">Incorrect</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {Math.round((sessionStats.correct / sessionStats.total) * 100)}%
              </div>
              <div className="text-sm text-gray-600">Accuracy</div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <button
              onClick={resetSession}
              className="flex items-center mx-auto px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset Session
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
