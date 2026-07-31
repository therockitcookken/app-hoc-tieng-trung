import React, { useState } from 'react';
import { Volume2, CheckCircle2, ChevronLeft, ChevronRight, VolumeX } from 'lucide-react';
import { QuizQuestion } from '../../data/quizData';

interface QuizQuestionCardProps {
  question: QuizQuestion;
  currentQuestionIndex: number;
  totalQuestions: number;
  onNextQuestion: () => void;
  onPrevQuestion: () => void;
  onSelectOption: (optionId: string) => void;
}

export const QuizQuestionCard: React.FC<QuizQuestionCardProps> = ({
  question,
  currentQuestionIndex,
  totalQuestions,
  onNextQuestion,
  onPrevQuestion,
  onSelectOption,
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string>('opt-a'); // Default selected A matching screenshot
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handlePlayAudio = () => {
    if (isPlayingAudio) {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }
    setIsPlayingAudio(true);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const textToPlay = question.audioText || question.questionChinese;
      const utterance = new SpeechSynthesisUtterance(textToPlay);
      utterance.lang = 'zh-CN';
      utterance.rate = 0.85;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsPlayingAudio(false), 1500);
    }
  };

  const handleOptionClick = (optId: string) => {
    setSelectedOptionId(optId);
    onSelectOption(optId);
  };

  return (
    <div className="w-full px-4 py-1.5 relative z-10 select-none">
      <div className="bg-white rounded-2xl p-4.5 shadow-[0_8px_25px_rgba(0,0,0,0.08)] border border-white/80 space-y-3.5">
        {/* Top Header Row inside Card */}
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-extrabold text-[#242424] tracking-tight">
            Câu hỏi hôm nay
          </span>
          <span className="bg-[#FFF3E0] text-[#F57C00] font-extrabold text-[11px] px-2.5 py-0.5 rounded-full border border-[#FFE0B2]">
            Câu {currentQuestionIndex + 1}/{totalQuestions}
          </span>
        </div>

        {/* Question Prompt */}
        <p className="text-[12px] font-medium text-[#555555]">
          {question.promptText}
        </p>

        {/* Chinese Word + Pinyin + Audio Speaker */}
        <div className="flex items-center space-x-3 py-1">
          <span className="text-[36px] font-extrabold text-[#111111] font-serif leading-none">
            {question.questionChinese}
          </span>
          <span className="text-[14px] font-semibold text-[#777777]">
            {question.questionPinyin}
          </span>
          <button
            onClick={handlePlayAudio}
            type="button"
            className="w-8 h-8 rounded-full bg-[#FFF3E0] text-[#F57C00] flex items-center justify-center hover:bg-amber-200 active:scale-90 transition-transform cursor-pointer"
            aria-label="Phát âm thanh"
          >
            {isPlayingAudio ? (
              <VolumeX className="w-4 h-4 text-red-500" />
            ) : (
              <Volume2 className="w-4 h-4 stroke-[2]" />
            )}
          </button>
        </div>

        {/* 4 Options Grid/List */}
        <div className="space-y-2 pt-0.5">
          {question.options?.map((opt) => {
            const isSelected = selectedOptionId === opt.id;
            const isCorrect = opt.isCorrect;

            return (
              <button
                key={opt.id}
                onClick={() => handleOptionClick(opt.id)}
                type="button"
                className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all active:scale-[0.99] cursor-pointer ${
                  isSelected && isCorrect
                    ? 'bg-[#E8F8EA] border-[#28B849] text-[#2E7D32] shadow-xs'
                    : isSelected
                    ? 'bg-red-50 border-red-300 text-red-800'
                    : 'bg-slate-50/60 border-slate-200/80 hover:bg-slate-100 text-[#333333]'
                }`}
              >
                <span className="text-[13px] font-bold">
                  {opt.text}
                </span>

                {isSelected && isCorrect && (
                  <CheckCircle2 className="w-4.5 h-4.5 text-[#28B849] fill-[#28B849]/20 flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Navigation Action Buttons Row */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <button
            onClick={onPrevQuestion}
            type="button"
            className="bg-white border border-slate-200 text-slate-700 py-2.5 px-3 rounded-xl text-[11.5px] font-bold shadow-2xs hover:bg-slate-50 active:scale-95 transition-transform flex items-center justify-center space-x-1 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Câu trước</span>
          </button>

          <button
            onClick={onNextQuestion}
            type="button"
            className="bg-gradient-to-r from-[#FF9800] to-[#F57C00] text-white py-2.5 px-3 rounded-xl text-[11.5px] font-bold shadow-xs active:scale-95 transition-transform flex items-center justify-center space-x-1 cursor-pointer"
          >
            <span>Câu tiếp theo</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Dots Row at Bottom */}
        <div className="flex items-center justify-center space-x-1 pt-1.5 overflow-x-auto no-scrollbar">
          {Array.from({ length: totalQuestions }).map((_, idx) => (
            <div
              key={idx}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                idx < currentQuestionIndex
                  ? 'bg-[#28B849]'
                  : idx === currentQuestionIndex
                  ? 'bg-[#F57C00] ring-2 ring-[#F57C00]/30'
                  : 'bg-slate-200'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
