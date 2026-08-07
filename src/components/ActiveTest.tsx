import React, { useState, useEffect } from 'react';
import { Question, TestAnswer, TestResult, TestMode, UserProfile } from '../types';

interface ActiveTestProps {
  user: UserProfile;
  questions: Question[];
  testMode: TestMode;
  onFinishTest: (result: TestResult) => void;
  onCancelTest: () => void;
}

export const ActiveTest: React.FC<ActiveTestProps> = ({
  user,
  questions,
  testMode,
  onFinishTest,
  onCancelTest,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [answers, setAnswers] = useState<TestAnswer[]>([]);
  
  // Timer calculations based on test mode (Quick: 10 mins = 600s, Full: 30 mins = 1800s, Category/Daily: 10 mins = 600s)
  const initialTime = testMode === 'full' ? 1800 : 600;
  const [timeLeft, setTimeLeft] = useState<number>(initialTime);
  const [showExitModal, setShowExitModal] = useState(false);

  const currentQuestion = questions[currentIndex] || questions[0];
  const totalQuestions = questions.length;

  // Live timer effect
  useEffect(() => {
    if (timeLeft <= 0) {
      handleCompleteTest();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Format time MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSelectOption = (optionId: 'A' | 'B' | 'C' | 'D') => {
    setSelectedOption(optionId);
  };

  const handleNext = () => {
    recordAnswerAndAdvance(selectedOption);
  };

  const handleSkip = () => {
    recordAnswerAndAdvance(null);
  };

  const recordAnswerAndAdvance = (chosenOption: 'A' | 'B' | 'C' | 'D' | null) => {
    const newAnswer: TestAnswer = {
      questionId: currentQuestion.id,
      selectedOption: chosenOption,
      isCorrect: chosenOption === currentQuestion.correctOption,
      timeSpentSeconds: 15,
    };

    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);
    setSelectedOption(null);

    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex(prev => prev + 1);
    } else {
      finalizeResults(updatedAnswers);
    }
  };

  const handleCompleteTest = () => {
    finalizeResults(answers);
  };

  const finalizeResults = (finalAnswers: TestAnswer[]) => {
    const correctCount = finalAnswers.filter(a => a.isCorrect).length;
    const skippedCount = finalAnswers.filter(a => a.selectedOption === null).length;
    const wrongCount = finalAnswers.length - correctCount - skippedCount;
    
    // Calculate raw score based on accuracy + baseline IQ
    const accuracy = totalQuestions > 0 ? (correctCount / totalQuestions) : 0;
    const calculatedScore = Math.round(85 + accuracy * 55); // 85 to 140 range
    
    let levelTitle = 'Average Logic';
    if (calculatedScore >= 130) levelTitle = 'Grand Master Logic';
    else if (calculatedScore >= 120) levelTitle = 'Genius Level';
    else if (calculatedScore >= 110) levelTitle = 'Junior Logic';
    else if (calculatedScore >= 100) levelTitle = 'Above Average';

    const result: TestResult = {
      id: `test_${Date.now()}`,
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      testMode,
      totalQuestions,
      correctCount,
      wrongCount,
      skippedCount,
      score: calculatedScore,
      levelTitle,
      accuracyPercentage: Math.round(accuracy * 100),
      timeTakenSeconds: initialTime - timeLeft,
      answers: finalAnswers,
      questions,
    };

    onFinishTest(result);
  };

  const progressPercentage = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col">
      {/* Top Header */}
      <header className="bg-surface shadow-sm sticky top-0 z-50 w-full">
        <div className="max-w-[800px] mx-auto flex justify-between items-center px-md py-sm">
          <div className="flex items-center gap-sm">
            <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center overflow-hidden">
              <img 
                className="w-full h-full object-cover" 
                src={user.avatarUrl} 
                alt={user.fullName}
                referrerPolicy="no-referrer"
              />
            </div>
            <h1 className="font-headline-lg text-headline-lg font-bold text-primary">CognitiveLabs</h1>
          </div>

          <button 
            onClick={() => setShowExitModal(true)}
            className="material-symbols-outlined text-primary p-xs hover:bg-surface-container-low transition-colors active:scale-95 duration-100 rounded-full cursor-pointer"
            title="Batal Ujian"
          >
            close
          </button>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-grow w-full max-w-[800px] mx-auto px-md py-lg flex flex-col items-center">
        {/* Question Counter & Timer */}
        <div className="w-full flex justify-between items-end mb-lg">
          <div className="flex flex-col">
            <span className="font-label-md text-label-md text-on-surface-variant mb-xs">Progress</span>
            <h2 className="font-title-lg text-title-lg font-bold text-on-surface">
              Soal {currentIndex + 1} dari {totalQuestions}
            </h2>
            {/* Progress Bar */}
            <div className="w-48 h-2 bg-surface-container rounded-full mt-sm overflow-hidden">
              <div 
                className="h-full bg-secondary transition-all duration-300" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <span className="font-label-md text-label-md text-on-surface-variant mb-xs">Waktu Tersisa</span>
            <div className={`flex items-center gap-xs ${timeLeft < 60 ? 'text-error font-extrabold animate-pulse' : 'text-tertiary-fixed-dim'}`}>
              <span className="material-symbols-outlined fill-1">timer</span>
              <span className="font-title-lg text-title-lg font-bold">
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="w-full bg-surface border-t-4 border-primary rounded-xl shadow-sm p-lg mb-lg">
          <h3 className="font-body-lg text-body-lg font-medium text-on-surface mb-xl">
            {currentQuestion.title}
          </h3>

          {/* Spatial Logic Visual Container */}
          {currentQuestion.imageUrl && (
            <div className="aspect-video w-full bg-surface-container-low rounded-lg flex items-center justify-center border border-outline-variant overflow-hidden relative group">
              <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent"></div>
              <img 
                className="w-full h-full object-contain p-md" 
                src={currentQuestion.imageUrl} 
                alt="Pertanyaan Tes IQ"
                referrerPolicy="no-referrer"
              />
            </div>
          )}
        </div>

        {/* Options Grid */}
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-md mb-xl">
          {currentQuestion.options.map((opt) => {
            const isSelected = selectedOption === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => handleSelectOption(opt.id)}
                className={`option-grid-item bg-surface border rounded-xl p-md flex flex-col items-center gap-sm hover:border-primary cursor-pointer transition-all ${
                  isSelected 
                    ? 'border-primary bg-primary-fixed border-2 shadow-md' 
                    : 'border-outline-variant hover:bg-surface-container-low'
                }`}
              >
                {opt.image ? (
                  <div className="w-full aspect-square bg-surface-container-lowest rounded-lg flex items-center justify-center overflow-hidden border border-outline-variant/30">
                    <img 
                      className="w-full h-full object-contain p-sm" 
                      src={opt.image} 
                      alt={opt.label}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ) : (
                  <div className="w-full aspect-square bg-surface-container-lowest rounded-lg flex items-center justify-center text-center p-2 font-bold text-primary text-sm">
                    {opt.label}
                  </div>
                )}
                <span className={`font-label-lg text-label-lg ${isSelected ? 'text-primary font-bold' : 'text-on-surface-variant'}`}>
                  {opt.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="w-full flex gap-md mt-auto">
          <button 
            onClick={handleSkip}
            className="flex-1 py-lg rounded-xl border-2 border-outline-variant text-on-surface-variant font-label-lg text-label-lg hover:bg-surface-container-high transition-all active:scale-95 cursor-pointer"
          >
            Lewati
          </button>
          
          <button 
            onClick={handleNext}
            disabled={!selectedOption}
            className="flex-[2] py-lg rounded-xl bg-primary text-on-primary font-label-lg text-label-lg shadow-md hover:shadow-lg transition-all active:scale-95 active:shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentIndex + 1 === totalQuestions ? 'Selesai & Lihat Hasil' : 'Selanjutnya'}
          </button>
        </div>
      </main>

      {/* Exit Confirmation Modal */}
      {showExitModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-md">
          <div className="bg-surface rounded-2xl p-lg max-w-[420px] w-full shadow-2xl border border-outline-variant animate-fade-in text-center mx-auto">
            <div className="w-14 h-14 rounded-full bg-error-container text-error flex items-center justify-center mx-auto mb-md">
              <span className="material-symbols-outlined text-3xl">warning</span>
            </div>
            <h3 className="font-title-lg text-title-lg font-bold text-on-surface mb-xs">Keluar dari Ujian?</h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-lg leading-relaxed">
              Kemajuan tes Anda saat ini tidak akan disimpan jika Anda keluar sekarang.
            </p>
            <div className="flex gap-md">
              <button 
                onClick={() => setShowExitModal(false)}
                className="flex-1 py-md px-md rounded-xl border border-outline-variant text-on-surface font-label-lg hover:bg-surface-container-low transition-colors cursor-pointer"
              >
                Lanjutkan Ujian
              </button>
              <button 
                onClick={onCancelTest}
                className="flex-1 py-md px-md rounded-xl bg-error text-on-error font-label-lg hover:bg-error/90 transition-colors shadow-sm cursor-pointer"
              >
                Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
