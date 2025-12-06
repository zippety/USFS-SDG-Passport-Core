import { useState } from 'react';
import { X, CheckCircle, Send } from 'lucide-react';

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

  const handleSubmit = () => {
    // Save to localStorage for demo purposes
    const surveyData = {
      timestamp: new Date().toISOString(),
      trigger,
      responses,
    };
    
    const existingSurveys = JSON.parse(localStorage.getItem('sdgSurveys') || '[]');
    existingSurveys.push(surveyData);
    localStorage.setItem('sdgSurveys', JSON.stringify(existingSurveys));
    
    setIsSubmitted(true);
    
    // Auto-close after 3 seconds
    setTimeout(() => {
      onClose();
      setIsSubmitted(false);
      setCurrentStep(0);
      setResponses({});
    }, 3000);
  };

  const currentQuestion = questions[currentStep];
  const canProceed = currentQuestion.required 
    ? responses[currentQuestion.id] !== undefined && responses[currentQuestion.id] !== ''
    : true;

  if (!isOpen) return null;

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center animate-scaleIn">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h2>
          <p className="text-gray-600 mb-4">
            Your feedback helps us improve the SDG Passport experience.
          </p>
          <p className="text-sm text-gray-500">
            Closing automatically...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto animate-scaleIn">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Quick Survey</h2>
            <p className="text-sm text-gray-500 mt-1">
              Question {currentStep + 1} of {questions.length}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
            />
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
                {currentQuestion.options.map((num) => (
                  <button
                    key={num}
                    onClick={() => handleAnswer(currentQuestion.id, num)}
                    className={`p-4 rounded-lg font-semibold transition-all ${
                      responses[currentQuestion.id] === num
                        ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white scale-110 shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-5 gap-2 mt-2">
                {currentQuestion.options.slice(5).map((num) => (
                  <button
                    key={num}
                    onClick={() => handleAnswer(currentQuestion.id, num)}
                    className={`p-4 rounded-lg font-semibold transition-all ${
                      responses[currentQuestion.id] === num
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
                  key={option}
                  onClick={() => handleAnswer(currentQuestion.id, option)}
                  className={`w-full p-3 rounded-lg text-left transition-all ${
                    responses[currentQuestion.id] === option
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
                onClick={() => handleAnswer(currentQuestion.id, 'Yes')}
                className={`p-6 rounded-lg font-semibold transition-all ${
                  responses[currentQuestion.id] === 'Yes'
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Yes
              </button>
              <button
                onClick={() => handleAnswer(currentQuestion.id, 'No')}
                className={`p-6 rounded-lg font-semibold transition-all ${
                  responses[currentQuestion.id] === 'No'
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

