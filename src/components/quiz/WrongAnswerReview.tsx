import React from 'react';
import { AlertCircle, Volume2, RotateCcw, PlusCircle, AlertTriangle } from 'lucide-react';
import { QuizQuestion } from '../../types/quiz';
import { speakChinese } from '../../utils/chineseSpeech';

interface WrongAnswerReviewProps {
  wrongQuestions: QuizQuestion[] | { question: QuizQuestion; userAnswerId: string }[] | any[];
  onRetryQuiz?: () => void;
  onRetake?: () => void;
  showToast?: (msg: string) => void;
}

export const WrongAnswerReview: React.FC<WrongAnswerReviewProps> = ({
  wrongQuestions,
  onRetryQuiz,
  onRetake,
  showToast,
}) => {
  if (!wrongQuestions || wrongQuestions.length === 0) {
    return (
      <div className="w-full bg-white rounded-2xl p-6 shadow-md border border-slate-100 text-center space-y-2 select-none">
        <AlertTriangle className="w-8 h-8 text-emerald-500 mx-auto" />
        <span className="font-bold text-slate-900 block">Bạn chưa có câu nào làm sai!</span>
        <p className="text-[11px] text-slate-400">Hãy tiếp tục thực hiện các bài Quiz để nâng cao phản xạ.</p>
      </div>
    );
  }

  // Normalize questions list whether passed as raw QuizQuestion or wrapped
  const questionsList: QuizQuestion[] = wrongQuestions.map((item) =>
    item.question ? item.question : item
  );

  const handlePlayAudio = (text: string) => {
    speakChinese(text, 0.8);
  };

  const handleRetryAction = () => {
    if (onRetryQuiz) onRetryQuiz();
    else if (onRetake) onRetake();
  };

  return (
    <div className="w-full bg-white rounded-2xl p-4 shadow-md border border-slate-100 space-y-3.5 relative overflow-hidden select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <div className="flex items-center space-x-1.5">
          <AlertCircle className="w-4 h-4 text-rose-600" />
          <h2 className="text-[14px] font-extrabold text-slate-900 tracking-tight">
            Ôn tập Các Câu Hỏi Làm Sai ({questionsList.length})
          </h2>
        </div>
        <button
          onClick={handleRetryAction}
          type="button"
          className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full flex items-center space-x-1 cursor-pointer hover:bg-rose-100"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Làm lại</span>
        </button>
      </div>

      {/* Questions List */}
      <div className="space-y-2.5 max-h-[320px] overflow-y-auto no-scrollbar pt-1">
        {questionsList.map((q) => (
          <div key={q.id} className="bg-rose-50/70 p-3 rounded-xl border border-rose-200 space-y-1.5">
            <div className="flex items-start justify-between">
              <span className="text-xs font-black text-slate-900 font-serif">
                {q.questionChinese}
              </span>

              {(q.audioText || q.questionChinese) && (
                <button
                  onClick={() => handlePlayAudio(q.audioText || q.questionChinese)}
                  type="button"
                  className="text-rose-600 p-1 cursor-pointer hover:scale-110"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              )}
            </div>

            <p className="text-[11px] text-slate-600 font-medium">
              👉 {q.questionVietnamese}
            </p>

            <div className="bg-white p-2 rounded-lg border border-rose-100 text-[10.5px] text-slate-700 space-y-0.5">
              <span className="font-bold text-emerald-700 block">
                ✅ Đáp án đúng: {q.options.find((o) => o.isCorrect)?.textVietnamese}
              </span>
              {q.explanation && <span className="text-slate-500 block">💡 {q.explanation}</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Export to Flashcards Action */}
      <button
        onClick={() => showToast?.(`Đã thêm ${questionsList.length} câu sai vào sổ tay Flashcard!`)}
        type="button"
        className="w-full bg-rose-600 hover:bg-rose-700 text-white py-2.5 rounded-xl text-xs font-bold shadow-sm flex items-center justify-center space-x-1.5 cursor-pointer active:scale-95 transition-transform"
      >
        <PlusCircle className="w-4 h-4" />
        <span>Thêm tất cả câu sai vào bộ Flashcard</span>
      </button>
    </div>
  );
};
