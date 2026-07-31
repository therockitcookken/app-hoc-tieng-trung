import React from 'react';
import { BookOpen, CheckCircle2, Circle } from 'lucide-react';

interface TodayFlashcardStatsProps {
  totalCount?: number;
  learnedCount?: number;
  unlearnedCount?: number;
}

export const TodayFlashcardStats: React.FC<TodayFlashcardStatsProps> = ({
  totalCount = 234,
  learnedCount = 182,
  unlearnedCount = 52,
}) => {
  return (
    <div className="w-full px-4 py-1.5 relative z-10">
      <div className="bg-white rounded-2xl p-3.5 shadow-[0_4px_16px_rgba(0,0,0,0.05)] border border-white/80 grid grid-cols-3 gap-2 text-center">
        {/* Item 1: Tổng từ */}
        <div className="flex flex-col items-center justify-center p-1 border-r border-slate-100">
          <div className="flex items-center space-x-1.5 text-pink-600 mb-0.5">
            <BookOpen className="w-4 h-4 stroke-[2]" />
            <span className="text-[17px] font-extrabold text-[#242424] leading-none">
              {totalCount}
            </span>
          </div>
          <span className="text-[10px] text-[#777777] font-semibold">
            Tổng từ
          </span>
        </div>

        {/* Item 2: Đã học */}
        <div className="flex flex-col items-center justify-center p-1 border-r border-slate-100">
          <div className="flex items-center space-x-1.5 text-emerald-600 mb-0.5">
            <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
            <span className="text-[17px] font-extrabold text-[#242424] leading-none">
              {learnedCount}
            </span>
          </div>
          <span className="text-[10px] text-[#777777] font-semibold">
            Đã học
          </span>
        </div>

        {/* Item 3: Chưa học */}
        <div className="flex flex-col items-center justify-center p-1">
          <div className="flex items-center space-x-1.5 text-amber-500 mb-0.5">
            <Circle className="w-4 h-4 stroke-[2.5]" />
            <span className="text-[17px] font-extrabold text-[#242424] leading-none">
              {unlearnedCount}
            </span>
          </div>
          <span className="text-[10px] text-[#777777] font-semibold">
            Chưa học
          </span>
        </div>
      </div>
    </div>
  );
};
