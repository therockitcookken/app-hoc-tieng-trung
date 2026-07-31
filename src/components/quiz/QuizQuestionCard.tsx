import React, { useState } from 'react';
import { Volume2, CheckCircle2, ChevronLeft, ChevronRight, VolumeX } from 'lucide-react';
import { QuizQuestion } from '../../data/quizData';
import { speakChinese } from '../../utils/chineseSpeech';

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
    setIsPlayingAudio(true);
    const textToPlay = question.audioText || question.questionChinese;
    speakChinese(textToPlay, 0.85);
    setTimeout(() => setIsPlayingAudio(false), 1200);
  };

  const handleOptionClick = (optId: string) => {
    setSelectedOptionId(optId);
    onSelectOption(optId);
  };

  const optionLetters = ['A', 'B', 'C', 'D'];

  return (
    <div className="w-full px-4 py-1.5 relative z-10 select-none">
      <div className="bg-white/95 rounded-[2rem] p-1.5 shadow-2xl border border-slate-200/80">
        <div className="bg-white rounded-[calc(2rem-0.375rem)] p-4.5 border border-slate-100 space-y-3.5">
          {/* Top Header Row inside Card */}
          <div className="flex items-center justify-between">
            <span className="eyebrow-pill bg-amber-500/10 text-amber-600 border-amber-500/20">
              Câu hỏi hôm nay
            </span>
            <span className="bg-amber-100 text-amber-900 font-extrabold text-[11px] px-3 py-0.5 rounded-full border border-amber-200 shadow-2xs">
              Câu {currentQuestionIndex + 1}/{totalQuestions}
            </span>
          </div>

          {/* Question Prompt */}
          <p className="text-xs font-semibold text-slate-600">
            {question.promptText}
          </p>

          {/* Chinese Word + Pinyin + Audio Speaker */}
          <div className="flex items-center space-x-3 py-1 bg-slate-50 p-3 rounded-2xl border border-slate-200/70">
            <span className="text-[34px] sm:text-[38px] font-black text-slate-900 font-sans leading-none">
              {question.questionChinese}
            </span>
            <span className="text-sm font-extrabold text-amber-600">
              {question.questionPinyin}
            </span>
            <button
              onClick={handlePlayAudio}
              type="button"
              className="w-9 h-9 rounded-full bg-amber-500/10 text-amber-600 border border-amber-500/20 flex items-center justify-center hover:bg-amber-500/20 active:scale-90 transition-spring cursor-pointer ml-auto"
              aria-label="Phát âm thanh"
            >
              {isPlayingAudio ? (
                <VolumeX className="w-4 h-4 text-red-500 animate-pulse" />
              ) : (
                <Volume2 className="w-4 h-4 stroke-[2.2]" />
              )}
            </button>
          </div>

          {/* 4 Options Grid/List with Letter Badges */}
          <div className="space-y-2 pt-0.5">
            {question.options?.map((opt, idx) => {
              const isSelected = selectedOptionId === opt.id;
              const isCorrect = opt.isCorrect;
              const letter = optionLetters[idx] || String.fromCharCode(65 + idx);

              return (
                <button
                  key={opt.id}
                  onClick={() => handleOptionClick(opt.id)}
                  type="button"
                  className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-spring active:scale-[0.98] cursor-pointer group ${
                    isSelected && isCorrect
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900 shadow-md ring-2 ring-emerald-400/30'
                      : isSelected
                      ? 'bg-rose-50 border-rose-400 text-rose-900 shadow-sm'
                      : 'bg-slate-50/80 border-slate-200 hover:bg-slate-100 text-slate-800 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className={`w-7 h-7 rounded-xl text-xs font-black flex items-center justify-center transition-transform group-hover:scale-105 ${
                      isSelected && isCorrect
                        ? 'bg-emerald-500 text-white'
                        : isSelected
                        ? 'bg-rose-500 text-white'
                        : 'bg-slate-200/80 text-slate-700'
                    }`}>
                      {letter}
                    </span>
                    <span className="text-[13px] font-extrabold">
                      {opt.text}
                    </span>
                  </div>

                  {isSelected && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100 flex-shrink-0" />
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
              className="bg-slate-100 border border-slate-200 text-slate-800 py-2.5 px-3 rounded-xl text-xs font-extrabold shadow-2xs hover:bg-slate-200 active:scale-95 transition-spring flex items-center justify-center space-x-1 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Câu trước</span>
            </button>

            <button
              onClick={onNextQuestion}
              type="button"
              className="btn-3d-amber text-white py-2.5 px-3 rounded-xl text-xs font-extrabold shadow-md flex items-center justify-center space-x-1 cursor-pointer"
            >
              <span>Câu tiếp theo</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Progress Dots Row at Bottom */}
          <div className="flex items-center justify-center space-x-1.5 pt-1.5 overflow-x-auto no-scrollbar">
            {Array.from({ length: totalQuestions }).map((_, idx) => (
              <div
                key={idx}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  idx < currentQuestionIndex
                    ? 'bg-emerald-500 scale-100'
                    : idx === currentQuestionIndex
                    ? 'bg-amber-500 scale-125 ring-4 ring-amber-400/30'
                    : 'bg-slate-200 scale-90'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
