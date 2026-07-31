import React from 'react';
import { CircularProgress } from './CircularProgress';
import { ChevronRight } from 'lucide-react';

interface LearningProgressCardProps {
  onDetailClick?: () => void;
}

export const LearningProgressCard: React.FC<LearningProgressCardProps> = ({ onDetailClick }) => {
  return (
    <div className="w-full px-4 py-1.5 relative z-10">
      <div className="bg-white rounded-2xl p-4 shadow-[0_6px_20px_rgba(0,0,0,0.06)] border border-white/80 relative overflow-hidden transition-all duration-200 hover:shadow-lg">
        <div className="flex items-center space-x-3.5">
          {/* Left Side: Circular Progress */}
          <div className="flex-shrink-0">
            <CircularProgress percentage={76} />
          </div>

          {/* Right Side: Text & Actions */}
          <div className="flex-1 min-w-0 pr-1">
            <div className="flex items-center justify-between">
              <h2 className="text-[15px] font-extrabold text-[#242424] tracking-tight">
                Tiến độ học tập
              </h2>
              <ChevronRight className="w-4 h-4 text-red-300 opacity-60" strokeWidth={2.5} />
            </div>

            <div className="mt-1 text-[11.5px] text-[#666666] leading-[1.4] font-medium">
              <p>
                Bạn đã học được <span className="font-extrabold text-[#242424]">228</span> từ mới
              </p>
              <p>
                và hoàn thành <span className="font-extrabold text-[#242424]">42</span> bài học
              </p>
            </div>

            {/* Bottom Right Pill Button */}
            <div className="mt-2.5 flex justify-end">
              <button
                onClick={onDetailClick}
                type="button"
                className="bg-gradient-to-r from-[#EF3B32] to-[#D92329] text-white text-[11px] font-bold px-3.5 py-1.5 rounded-full shadow-sm shadow-red-500/20 active:scale-95 transition-transform cursor-pointer"
              >
                Xem chi tiết
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
