import React from 'react';
import { CheckCircle2, XCircle, Clock, Target } from 'lucide-react';

interface TodayQuizStatsProps {
  correctCount?: number;
  wrongCount?: number;
  formattedTime?: string;
  accuracyPercent?: number;
}

export const TodayQuizStats: React.FC<TodayQuizStatsProps> = ({
  correctCount = 17,
  wrongCount = 8,
  formattedTime = '05:23',
  accuracyPercent = 85,
}) => {
  return (
    <div className="w-full px-4 py-1.5 relative z-10">
      <h2 className="text-[13.5px] font-extrabold text-[#242424] tracking-tight mb-2">
        Thống kê nhanh
      </h2>

      <div className="grid grid-cols-4 gap-2">
        {/* Card 1: Đúng */}
        <div className="bg-white rounded-2xl p-2.5 shadow-2xs border border-emerald-100 flex flex-col items-center justify-center text-center">
          <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-1">
            <CheckCircle2 className="w-4 h-4 fill-emerald-500 text-white" />
          </div>
          <span className="text-[16px] font-extrabold text-[#242424] leading-none">
            {correctCount}
          </span>
          <span className="text-[9.5px] text-[#777777] font-semibold mt-1">
            Đúng
          </span>
        </div>

        {/* Card 2: Sai */}
        <div className="bg-white rounded-2xl p-2.5 shadow-2xs border border-red-100 flex flex-col items-center justify-center text-center">
          <div className="w-7 h-7 rounded-full bg-red-50 text-red-600 flex items-center justify-center mb-1">
            <XCircle className="w-4 h-4 fill-red-500 text-white" />
          </div>
          <span className="text-[16px] font-extrabold text-[#242424] leading-none">
            {wrongCount}
          </span>
          <span className="text-[9.5px] text-[#777777] font-semibold mt-1">
            Sai
          </span>
        </div>

        {/* Card 3: Thời gian */}
        <div className="bg-white rounded-2xl p-2.5 shadow-2xs border border-blue-100 flex flex-col items-center justify-center text-center">
          <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-1">
            <Clock className="w-4 h-4 text-blue-500 stroke-[2.2]" />
          </div>
          <span className="text-[13.5px] font-extrabold text-[#242424] leading-none">
            {formattedTime}
          </span>
          <span className="text-[9.5px] text-[#777777] font-semibold mt-1">
            Thời gian
          </span>
        </div>

        {/* Card 4: Độ chính xác */}
        <div className="bg-white rounded-2xl p-2.5 shadow-2xs border border-amber-100 flex flex-col items-center justify-center text-center">
          <div className="w-7 h-7 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mb-1">
            <Target className="w-4 h-4 text-amber-500 stroke-[2.2]" />
          </div>
          <span className="text-[15px] font-extrabold text-[#242424] leading-none">
            {accuracyPercent}%
          </span>
          <span className="text-[9.5px] text-[#777777] font-semibold mt-1">
            Độ chính xác
          </span>
        </div>
      </div>
    </div>
  );
};
