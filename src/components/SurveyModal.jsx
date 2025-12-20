import { useState } from 'react';
import { X, CheckCircle, Send } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default function SurveyModal({ isOpen, onClose, trigger = 'general' }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const questions = [
    {
      id: 'likelihood',
      question: 'How likely are you to use this SDG Passport app?',
      type: 'scale',
      options: Array.from({ length: 10 }, (_, i) => i + 1),
      required: true,
    },
    {
      id: 'feature',
      question: 'What feature excites you most?',
      type: 'multiple',
      options: [
        'Stamp Collection',
        'Leaderboard & Rankings',
        'QR Code Scanning',
        'SDG Education',
        'Points & Badges',
        'Program Competition',
      ],
      required: true,
    },
    {
      id: 'recommend',
      question: 'Would you recommend this to your peers?',
      type: 'yesno',
      required: true,
    },
    {
      id: 'motivation',
      question: 'What would motivate you to collect more stamps?',
      type: 'text',
      placeholder: 'e.g., Prizes, recognition, learning about SDGs...',
      required: false,
    },
    {
      id: 'channel',
      question: 'Preferred communication channel for updates?',
      type: 'multiple',
      options: ['Email', 'Instagram', 'Discord', 'Campus App', 'Text/SMS', 'Other'],
      required: false,
    },
  ];

  // Load progress on mount (with safety checks)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`survey_progress_${trigger}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        const step = parsed?.step;
        const data = parsed?.data;
        // Validate step is a valid number within bounds
        if (typeof step === 'number' && step >= 0 && step < questions.length && data) {
          setCurrentStep(step);
          setResponses(data);
        } else {
          // Clear corrupted data
          localStorage.removeItem(`survey_progress_${trigger}`);
        }
      }
    } catch (e) {
      console.error("Failed to load survey progress", e);
      localStorage.removeItem(`survey_progress_${trigger}`);
    }
  }, [trigger]);

  // Save progress on change
  useEffect(() => {
    if (Object.keys(responses).length > 0 && !isSubmitted) {
      localStorage.setItem(`survey_progress_${trigger}`, JSON.stringify({
        step: currentStep,
        data: responses
      }));
    }
  }, [responses, currentStep, isSubmitted, trigger]);

  const handleAnswer = (questionId, answer) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    localStorage.removeItem(`survey_progress_${trigger}`);
    onClose();
  };

  const handleSubmit = async () => {
    const auth = getAuth();
    const likelihood = responses.likelihood || 0;
    const priority = likelihood >= 8 ? 'high' : likelihood >= 5 ? 'medium' : 'low';

    try {
      await addDoc(collection(db, "feedback"), {
        type: 'survey',
        trigger,
        responses,
        uid: auth.currentUser?.uid || 'anonymous',
        displayName: auth.currentUser?.displayName || 'Anonymous',
        priority,
        status: 'unprocessed',
        category: 'user_research',
        createdAt: serverTimestamp(),
      });
      localStorage.removeItem(`survey_progress_${trigger}`);
    } catch (error) {
      console.error("Error saving survey: ", error);
    }

    setIsSubmitted(true);
    setTimeout(() => {
      onClose();
      setIsSubmitted(false);
      setCurrentStep(0);
      setResponses({});
    }, 3000);
  };

  const currentQuestion = questions[currentStep];
  const progressPercent = Math.round(((currentStep + 1) / questions.length) * 100);

  const canProceed = (() => {
    if (!currentQuestion) return false;
    if (!currentQuestion.required) return true;
    const answer = responses[currentQuestion.id];
    return answer !== undefined && answer !== null && answer !== '';
  })();

  if (!isOpen) return null;

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md flex items-center justify-center z-[100] p-4">
        <div className="bg-white dark:bg-slate-800 rounded-[2rem] p-10 max-w-md w-full text-center shadow-2xl border border-emerald-500/20 animate-scaleIn">
          <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-emerald-500" />
          </div>
          <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-3">Impact Logged!</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
            Your insights are being analyzed by the <span className="text-emerald-500 font-bold">AI Governor</span> to improve the Seneca SDG program.
          </p>
          <div className="w-full bg-slate-100 dark:bg-slate-900 h-1 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 animate-loading-bar"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-lg flex items-center justify-center z-[100] p-4 font-sans">
      <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto animate-scaleIn shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-slate-700/50">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-indigo-500 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-tighter">Community Research</span>
            </div>
            <h2 className="text-3xl font-black text-slate-800 dark:text-white uppercase tracking-tighter">Quick Scan</h2>
          </div>
          <button
            onClick={handleSkip}
            className="text-slate-400 hover:text-red-500 transition-all font-bold text-xs uppercase tracking-widest flex items-center gap-1 group"
          >
            Skip <X className="w-4 h-4 group-hover:rotate-90 transition-transform" />
          </button>
        </div>

        {/* Improved Progress Section */}
        <div className="mb-8">
          <div className="flex justify-between items-end mb-2">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Research Progress</span>
            <span className="text-lg font-black text-indigo-500 tabular-nums leading-none">{progressPercent}%</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-900/50 rounded-full h-3 border border-slate-200 dark:border-slate-700 shadow-inner overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-500 via-emerald-500 to-indigo-500 h-full rounded-full transition-all duration-700 ease-out shadow-lg shadow-emerald-500/20"
              style={{ width: `${progressPercent}%` }}
            >
              <div className="w-full h-full bg-white/20 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Question */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {currentQuestion.question}
            {currentQuestion.required && <span className="text-red-500 ml-1">*</span>}
          </h3>

          {/* Scale Question */}
          {currentQuestion.type === 'scale' && (
            <div className="space-y-3">
              <div className="flex justify-between text-xs text-gray-500 mb-2">
                <span>Not Likely</span>
                <span>Very Likely</span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {currentQuestion.options.slice(0, 5).map((num) => (
                  <button
                    type="button"
                    key={num}
                    onClick={() => handleAnswer(currentQuestion.id, num)}
                    className={`p-4 rounded-lg font-semibold transition-all ${responses[currentQuestion.id] === num
                      ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white scale-110 shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-5 gap-2 mt-2">
                {currentQuestion.options.slice(5, 10).map((num) => (
                  <button
                    type="button"
                    key={num}
                    onClick={() => handleAnswer(currentQuestion.id, num)}
                    className={`p-4 rounded-lg font-semibold transition-all ${responses[currentQuestion.id] === num
                      ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white scale-110 shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Multiple Choice */}
          {currentQuestion.type === 'multiple' && (
            <div className="space-y-2">
              {currentQuestion.options.map((option) => (
                <button
                  type="button"
                  key={option}
                  onClick={() => handleAnswer(currentQuestion.id, option)}
                  className={`w-full p-3 rounded-lg text-left transition-all ${responses[currentQuestion.id] === option
                    ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {/* Yes/No */}
          {currentQuestion.type === 'yesno' && (
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleAnswer(currentQuestion.id, 'Yes')}
                className={`p-6 rounded-lg font-semibold transition-all ${responses[currentQuestion.id] === 'Yes'
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => handleAnswer(currentQuestion.id, 'No')}
                className={`p-6 rounded-lg font-semibold transition-all ${responses[currentQuestion.id] === 'No'
                  ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                No
              </button>
            </div>
          )}

          {/* Text Input */}
          {currentQuestion.type === 'text' && (
            <textarea
              value={responses[currentQuestion.id] || ''}
              onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
              placeholder={currentQuestion.placeholder}
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none resize-none"
              rows="4"
            />
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-4 border-t">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={!canProceed}
            className="px-6 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <span>{currentStep === questions.length - 1 ? 'Submit' : 'Next'}</span>
            {currentStep === questions.length - 1 ? (
              <Send className="w-4 h-4" />
            ) : null}
          </button>
        </div>
      </div>
    </div>
  );
}

