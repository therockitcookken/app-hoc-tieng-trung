import React, { useState, useEffect } from 'react';
import { Volume2, CheckCircle2, XCircle, ArrowRight, Award, Pause, Play, PlusCircle } from 'lucide-react';
import { QuizQuestion } from '../../types/quiz';

interface QuizSessionPlayerProps {
  questions: QuizQuestion[];
  collectionTitle: string;
  onFinish: (score: number, totalXp: number, wrongCount: number) => void;
  onClose: () => void;
  showToast?: (msg: string) => void;
}

export const QuizSessionPlayer: React.FC<QuizSessionPlayerProps> = ({
  questions,
  collectionTitle,
  onFinish,
  onClose,
  showToast,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [totalXp, setTotalXp] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentQ: QuizQuestion = questions[currentIndex] || questions[0];

  // Timer interval
  useEffect(() => {
    if (isFinished || isPaused) return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isFinished, isPaused]);

  const handlePlayAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-CN';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSelectOption = (optionId: string) => {
    if (isAnswerSubmitted) return;
    setSelectedOptionId(optionId);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOptionId || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);

    const isCorrect = selectedOptionId === currentQ.correctAnswerId;

    if (isCorrect) {
      setScore((prev) => prev + 1);
      setTotalXp((prev) => prev + currentQ.xp);
      showToast?.(`Chính xác! +${currentQ.xp} XP 🎉`);
    } else {
      showToast?.('Chưa chính xác! Xem giải thích bên dưới.');
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsFinished(true);
      const wrongCount = questions.length - score;
      onFinish(score, totalXp, wrongCount);
    }
  };

  // Format seconds mm:ss
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Final Summary Screen
  if (isFinished) {
    const wrongCount = questions.length - score;
    const accuracyPercentage = Math.round((score / questions.length) * 100);

    return (
      <div className="w-full bg-white rounded-2xl p-5 shadow-xl border border-slate-100 space-y-4 text-center select-none animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
          <Award className="w-8 h-8" />
        </div>

        <div>
          <span className="text-[10.5px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
            Hoàn thành Quiz
          </span>
          <h2 className="text-xl font-black text-slate-900 mt-1">
            {collectionTitle}
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-200">
          <div className="text-center">
            <span className="text-xs text-slate-500 font-bold block">Độ chính xác</span>
            <span className="text-lg font-black text-emerald-600 block">{accuracyPercentage}%</span>
          </div>
          <div className="text-center border-x border-slate-200">
            <span className="text-xs text-slate-500 font-bold block">Thời gian</span>
            <span className="text-lg font-black text-blue-600 block">{formatTime(timerSeconds)}</span>
          </div>
          <div className="text-center">
            <span className="text-xs text-slate-500 font-bold block">Thưởng XP</span>
            <span className="text-lg font-black text-amber-500 block">+{totalXp} XP</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          {wrongCount > 0 && (
            <button
              onClick={() => showToast?.(`Đã thêm ${wrongCount} câu sai vào sổ tay Flashcard!`)}
              type="button"
              className="w-full bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 cursor-pointer active:scale-95 transition-transform"
            >
              <PlusCircle className="w-4 h-4 text-amber-600" />
              <span>Thêm {wrongCount} câu sai vào Flashcard</span>
            </button>
          )}

          <button
            onClick={onClose}
            type="button"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl text-xs font-bold shadow-md cursor-pointer active:scale-95 transition-transform"
          >
            Quay về trang Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-2xl p-4 shadow-xl border border-slate-100 space-y-3.5 relative overflow-hidden select-none">
      {/* Header Bar: Progress + Timer */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-extrabold text-slate-900">
            Câu {currentIndex + 1}/{questions.length}
          </span>
          <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
            {currentQ.category}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-lg">
            ⏱️ {formatTime(timerSeconds)}
          </span>
          <button
            onClick={() => setIsPaused(!isPaused)}
            type="button"
            className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Progress Bar Line */}
      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
        <div
          className="bg-emerald-500 h-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question Main Card */}
      <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200 space-y-2.5">
        <div className="flex items-start justify-between">
          <h3 className="text-base font-black text-slate-900 leading-snug">
            {currentQ.questionChinese}
          </h3>

          {currentQ.audioText && (
            <button
              onClick={() => handlePlayAudio(currentQ.audioText!)}
              type="button"
              className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 p-2 rounded-full cursor-pointer flex-shrink-0 active:scale-95 transition-transform"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          )}
        </div>

        <p className="text-xs text-slate-600 font-medium">
          {currentQ.questionVietnamese}
        </p>
      </div>

      {/* Options List */}
      <div className="space-y-2">
        {currentQ.options.map((opt) => {
          const isSelected = selectedOptionId === opt.id;
          const isCorrect = opt.id === currentQ.correctAnswerId;

          let btnStyle = 'bg-slate-50 hover:bg-emerald-50/60 border-slate-200 text-slate-800';

          if (isAnswerSubmitted) {
            if (isCorrect) {
              btnStyle = 'bg-emerald-500 text-white border-emerald-600 shadow-sm';
            } else if (isSelected) {
              btnStyle = 'bg-red-500 text-white border-red-600';
            } else {
              btnStyle = 'bg-slate-50 border-slate-100 text-slate-400 opacity-60';
            }
          } else if (isSelected) {
            btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-400';
          }

          return (
            <button
              key={opt.id}
              onClick={() => handleSelectOption(opt.id)}
              disabled={isAnswerSubmitted}
              type="button"
              className={`w-full p-3 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
            >
              <span>{opt.textVietnamese}</span>
              {isAnswerSubmitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-white" />}
              {isAnswerSubmitted && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-white" />}
            </button>
          );
        })}
      </div>

      {/* Answer Explanation Box */}
      {isAnswerSubmitted && (
        <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-xs text-emerald-900 space-y-1 animate-fade-in">
          <span className="font-bold block text-emerald-800">💡 Giải thích chi tiết:</span>
          <p className="text-[11px] leading-relaxed">{currentQ.explanation}</p>
        </div>
      )}

      {/* Action Buttons Row */}
      <div className="pt-1">
        {!isAnswerSubmitted ? (
          <button
            onClick={handleSubmitAnswer}
            disabled={!selectedOptionId}
            type="button"
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 disabled:text-slate-400 text-white py-2.5 rounded-xl text-xs font-bold shadow-md cursor-pointer active:scale-95 transition-transform"
          >
            Kiểm tra đáp án
          </button>
        ) : (
          <button
            onClick={handleNextQuestion}
            type="button"
            className="w-full bg-slate-900 hover:bg-slate-800 text-white py-2.5 rounded-xl text-xs font-bold shadow-md flex items-center justify-center space-x-1.5 cursor-pointer active:scale-95 transition-transform"
          >
            <span>{currentIndex < questions.length - 1 ? 'Câu tiếp theo' : 'Xem kết quả'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
