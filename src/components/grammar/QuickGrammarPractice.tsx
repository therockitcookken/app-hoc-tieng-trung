import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react';
import { QUICK_QUIZ_QUESTIONS } from '../../data/grammarData';

export const QuickGrammarPractice: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredMap, setAnsweredMap] = useState<Record<number, boolean>>({});

  const question = QUICK_QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (index: number) => {
    if (isAnswerChecked) return;
    setSelectedOption(index);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null || isAnswerChecked) return;
    setIsAnswerChecked(true);
    const isCorrect = selectedOption === question.correctIndex;
    if (isCorrect && !answeredMap[question.id]) {
      setScore((prev) => prev + 10);
      setAnsweredMap((prev) => ({ ...prev, [question.id]: true }));
    }
  };

  const handleNext = () => {
    if (currentIdx < QUICK_QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setScore(0);
    setAnsweredMap({});
  };

  return (
    <div className="w-full px-4 py-1.5 relative z-10">
      <div className="bg-white rounded-2xl p-4 shadow-[0_6px_20px_rgba(0,0,0,0.06)] border border-white/80 relative overflow-hidden">
        {/* Quiz Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1.5">
            <HelpCircle className="w-4 h-4 text-[#1E52E8]" />
            <h2 className="text-[14px] font-extrabold text-[#242424] tracking-tight">
              Luyện tập nhanh
            </h2>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-bold text-[#1E52E8] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
              Điểm: {score}
            </span>
            <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
              {currentIdx + 1}/{QUICK_QUIZ_QUESTIONS.length}
            </span>
          </div>
        </div>

        {/* Question Text */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 text-center">
          <span className="text-[10px] font-bold text-[#1E52E8] uppercase tracking-wider block mb-1">
            Điền vào chỗ trống:
          </span>
          <h3 className="text-[18px] font-extrabold text-[#242424] font-serif tracking-wide">
            {question.question}
          </h3>
        </div>

        {/* 4 Answer Options */}
        <div className="grid grid-cols-2 gap-2 mt-3">
          {question.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === question.correctIndex;

            let buttonStyle = 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50';

            if (isSelected && !isAnswerChecked) {
              buttonStyle = 'bg-blue-50 border-blue-500 text-blue-900 ring-2 ring-blue-500/20';
            }

            if (isAnswerChecked) {
              if (isCorrect) {
                buttonStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold ring-2 ring-emerald-500/20';
              } else if (isSelected && !isCorrect) {
                buttonStyle = 'bg-red-50 border-red-500 text-red-900 font-bold';
              } else {
                buttonStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                type="button"
                className={`p-2.5 rounded-xl border text-left text-[12.5px] font-semibold transition-all active:scale-95 flex items-center justify-between cursor-pointer ${buttonStyle}`}
              >
                <span>{opt}</span>
                {isAnswerChecked && isCorrect && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 ml-1" />
                )}
                {isAnswerChecked && isSelected && !isCorrect && (
                  <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 ml-1" />
                )}
              </button>
            );
          })}
        </div>

        {/* Action Controls & Check Button */}
        <div className="mt-3 flex items-center justify-between pt-1">
          <div className="flex items-center space-x-1">
            <button
              onClick={handlePrev}
              disabled={currentIdx === 0}
              type="button"
              className="p-2 rounded-xl bg-slate-100 text-slate-700 disabled:opacity-40 hover:bg-slate-200 active:scale-95 transition-transform cursor-pointer"
              aria-label="Câu trước"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIdx === QUICK_QUIZ_QUESTIONS.length - 1}
              type="button"
              className="p-2 rounded-xl bg-slate-100 text-slate-700 disabled:opacity-40 hover:bg-slate-200 active:scale-95 transition-transform cursor-pointer"
              aria-label="Câu tiếp"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleRestart}
              type="button"
              className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer"
              aria-label="Luyện lại từ đầu"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              onClick={handleCheckAnswer}
              disabled={selectedOption === null || isAnswerChecked}
              type="button"
              className="bg-gradient-to-r from-[#2570F0] to-[#1E52E8] text-white text-[11.5px] font-bold px-4 py-2 rounded-xl shadow-xs active:scale-95 disabled:opacity-50 transition-transform cursor-pointer"
            >
              {isAnswerChecked ? 'Đã kiểm tra' : 'Kiểm tra'}
            </button>
          </div>
        </div>

        {/* Explanation Box After Checking */}
        {isAnswerChecked && (
          <div className="mt-3 bg-blue-50/80 border border-blue-200 rounded-xl p-3 text-[11px] text-blue-950 space-y-1 animate-fade-in">
            <div className="font-bold flex items-center space-x-1 text-[#1E52E8]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Giải thích đáp án:</span>
            </div>
            <p className="font-medium leading-relaxed">
              {question.explanation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
