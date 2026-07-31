import React from 'react';
import { CircularProgress } from '../CircularProgress';
import { Flame, ChevronRight } from 'lucide-react';

interface PronunciationProgressCardProps {
  onDetailClick: () => void;
}

export const PronunciationProgressCard: React.FC<PronunciationProgressCardProps> = ({
  onDetailClick,
}) => {
  return (
    <div className="w-full px-4 py-1 relative z-10">
      <div className="bg-white rounded-2xl p-4 shadow-[0_6px_20px_rgba(0,0,0,0.06)] border border-white/80 relative overflow-hidden">
        {/* Card Title */}
        <h2 className="text-[14px] font-extrabold text-[#242424] tracking-tight mb-3">
          Tiến độ phát âm
        </h2>

        <div className="flex items-center justify-between space-x-3">
          {/* Left Side: Circular Progress 85% */}
          <div className="flex-shrink-0">
            <CircularProgress percentage={85} size={70} strokeWidth={6.5} />
          </div>

          {/* Middle Side: Progress Info & Bar */}
          <div className="flex-1 min-w-0 pr-1">
            <h3 className="text-[12.5px] font-extrabold text-[#242424] tracking-tight leading-tight">
              Bạn đang tiến bộ rất tốt!
            </h3>
            <p className="text-[11px] text-[#666666] font-medium mt-0.5">
              Hoàn thành <span className="font-extrabold text-[#242424]">68/80</span> bài học
            </p>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-[#FFE6E6] rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#EF3B32] to-[#FF7A38] rounded-full transition-all duration-1000 ease-out"
                style={{ width: '85%' }}
              />
            </div>
          </div>

          {/* Right Side: Streak Badge & Xem chi tiết Pill Button */}
          <div className="flex flex-col items-end justify-between self-stretch flex-shrink-0">
            {/* Streak Card */}
            <div className="bg-[#FFF5F5] border border-[#FFE0E0] rounded-xl px-2.5 py-1.5 text-center min-w-[76px]">
              <div className="flex items-center justify-center space-x-1 text-[#EF3B32] font-extrabold text-[13px] leading-none">
                <Flame className="w-3.5 h-3.5 fill-[#FF8A28] text-[#EF3B32]" />
                <span>12</span>
              </div>
              <span className="text-[9.5px] font-medium text-[#888888] block mt-0.5 leading-none">
                Ngày liên tiếp
              </span>
            </div>

            {/* Xem Chi Tiết Button */}
            <button
              onClick={onDetailClick}
              type="button"
              className="mt-2 bg-gradient-to-r from-[#EF3B32] to-[#D92329] text-white text-[10.5px] font-bold px-3 py-1.5 rounded-full shadow-xs active:scale-95 transition-transform flex items-center space-x-0.5 cursor-pointer"
            >
              <span>Xem chi tiết</span>
              <ChevronRight className="w-3 h-3 stroke-[3]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
