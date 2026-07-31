import React, { useState } from 'react';
import { Award } from 'lucide-react';
import { FlashcardItem, StudyRating } from '../../types/flashcards';
import { MainFlashcard } from './MainFlashcard';
import { calculateNextReview } from '../../utils/spacedRepetition';

interface FlashcardStudySessionProps {
  deckTitle: string;
  cards: FlashcardItem[];
  onFinish: (masteredCount: number, totalXp: number) => void;
  onClose: () => void;
  showToast?: (msg: string) => void;
}

export const FlashcardStudySession: React.FC<FlashcardStudySessionProps> = ({
  deckTitle,
  cards,
  onFinish,
  onClose,
  showToast,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredCount, setMasteredCount] = useState(0);
  const [totalXp, setTotalXp] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentCard: FlashcardItem = cards[currentIndex] || cards[0];

  const handleRating = (rating: StudyRating) => {
    if (!currentCard) return;

    // Calculate Spaced Repetition next review
    const updatedReviewData = calculateNextReview(rating, currentCard.reviewData);
    currentCard.reviewData = updatedReviewData;

    let xpGain = 10;
    if (rating === 'good' || rating === 'easy') {
      setMasteredCount((prev) => prev + 1);
      xpGain = 20;
    }
    setTotalXp((prev) => prev + xpGain);

    showToast?.(`Đã lưu đánh giá: ${rating === 'again' ? 'Quên' : rating === 'hard' ? 'Khó' : rating === 'good' ? 'Nhớ' : 'Rất dễ'} (+${xpGain} XP)`);

    if (currentIndex < cards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsFlipped(false);
    } else {
      setIsFinished(true);
      onFinish(masteredCount + 1, totalXp + xpGain);
    }
  };

  // Final Summary Screen
  if (isFinished) {
    return (
      <div className="w-full bg-white rounded-2xl p-5 shadow-xl border border-slate-100 space-y-4 text-center select-none animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
          <Award className="w-8 h-8" />
        </div>

        <div>
          <span className="text-[10.5px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
            Hoàn thành Phiên Ôn Tập
          </span>
          <h2 className="text-xl font-black text-slate-900 mt-1">
            {deckTitle}
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-200">
          <div className="text-center">
            <span className="text-xs text-slate-500 font-bold block">Thẻ đã thuộc</span>
            <span className="text-lg font-black text-emerald-600 block">{masteredCount}/{cards.length}</span>
          </div>
          <div className="text-center border-l border-slate-200">
            <span className="text-xs text-slate-500 font-bold block">Thưởng XP</span>
            <span className="text-lg font-black text-amber-500 block">+{totalXp} XP</span>
          </div>
        </div>

        <button
          onClick={onClose}
          type="button"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl text-xs font-bold shadow-md cursor-pointer active:scale-95 transition-transform"
        >
          Quay về trang Flashcard
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-2xl p-4 shadow-xl border border-slate-100 space-y-3.5 relative overflow-hidden select-none">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-extrabold text-slate-900">
            Thẻ {currentIndex + 1}/{cards.length}
          </span>
          <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
            {deckTitle}
          </span>
        </div>

        <button
          onClick={onClose}
          type="button"
          className="text-xs font-bold text-slate-400 hover:text-slate-600 cursor-pointer"
        >
          Thoát
        </button>
      </div>

      {/* Progress Bar Line */}
      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
        <div
          className="bg-emerald-500 h-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
        />
      </div>

      {/* Interactive Main 3D Flashcard */}
      <MainFlashcard
        card={currentCard}
        isFlipped={isFlipped}
        onFlip={() => setIsFlipped(!isFlipped)}
      />

      {/* Spaced Repetition 4 Rating Buttons (Shown after flip or always) */}
      <div className="space-y-1.5 pt-1">
        <span className="text-[10.5px] font-bold text-slate-400 block text-center">
          Đánh giá mức độ ghi nhớ (Spaced Repetition):
        </span>

        <div className="grid grid-cols-4 gap-1.5">
          <button
            onClick={() => handleRating('again')}
            type="button"
            className="bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 py-2 rounded-xl text-center cursor-pointer active:scale-95 transition-transform"
          >
            <span className="text-xs font-black block">Quên</span>
            <span className="text-[9px] text-rose-600 block">1 ngày</span>
          </button>

          <button
            onClick={() => handleRating('hard')}
            type="button"
            className="bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 py-2 rounded-xl text-center cursor-pointer active:scale-95 transition-transform"
          >
            <span className="text-xs font-black block">Khó</span>
            <span className="text-[9px] text-amber-700 block">3 ngày</span>
          </button>

          <button
            onClick={() => handleRating('good')}
            type="button"
            className="bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 py-2 rounded-xl text-center cursor-pointer active:scale-95 transition-transform"
          >
            <span className="text-xs font-black block">Nhớ</span>
            <span className="text-[9px] text-blue-700 block">6 ngày</span>
          </button>

          <button
            onClick={() => handleRating('easy')}
            type="button"
            className="bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 py-2 rounded-xl text-center cursor-pointer active:scale-95 transition-transform"
          >
            <span className="text-xs font-black block">Rất dễ</span>
            <span className="text-[9px] text-emerald-700 block">10 ngày</span>
          </button>
        </div>
      </div>
    </div>
  );
};
