import React from 'react';
import { X, HelpCircle, Check } from 'lucide-react';

interface FlashcardRatingButtonsProps {
  onRate: (level: 'hard' | 'learning' | 'easy') => void;
}

export const FlashcardRatingButtons: React.FC<FlashcardRatingButtonsProps> = ({
  onRate,
}) => {
  return (
    <div className="w-full px-4 py-1.5 relative z-10">
      <div className="grid grid-cols-3 gap-2.5">
        {/* Nút 1: Khó */}
        <button
          onClick={() => onRate('hard')}
          type="button"
          className="bg-[#EF5350] hover:bg-[#E53935] text-white py-2.5 px-3 rounded-xl font-extrabold text-[12.5px] shadow-sm shadow-red-500/20 active:scale-95 transition-transform flex items-center justify-center space-x-1 cursor-pointer"
        >
          <X className="w-4 h-4 stroke-[3]" />
          <span>Khó</span>
        </button>

        {/* Nút 2: Đang học */}
        <button
          onClick={() => onRate('learning')}
          type="button"
          className="bg-[#FFA726] hover:bg-[#FB8C00] text-white py-2.5 px-3 rounded-xl font-extrabold text-[12.5px] shadow-sm shadow-amber-500/20 active:scale-95 transition-transform flex items-center justify-center space-x-1 cursor-pointer"
        >
          <HelpCircle className="w-4 h-4 stroke-[2.5]" />
          <span>Đang học</span>
        </button>

        {/* Nút 3: Dễ */}
        <button
          onClick={() => onRate('easy')}
          type="button"
          className="bg-[#66BB6A] hover:bg-[#4CAF50] text-white py-2.5 px-3 rounded-xl font-extrabold text-[12.5px] shadow-sm shadow-emerald-500/20 active:scale-95 transition-transform flex items-center justify-center space-x-1 cursor-pointer"
        >
          <Check className="w-4 h-4 stroke-[3]" />
          <span>Dễ</span>
        </button>
      </div>
    </div>
  );
};
