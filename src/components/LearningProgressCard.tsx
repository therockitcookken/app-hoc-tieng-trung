import React from 'react';
import { CircularProgress } from './CircularProgress';
import { ChevronRight } from 'lucide-react';
import { ThreeDCard } from './3d/ThreeDCard';

interface LearningProgressCardProps {
  onDetailClick?: () => void;
}

export const LearningProgressCard: React.FC<LearningProgressCardProps> = ({ onDetailClick }) => {
  return (
    <div className="w-full py-1.5 relative z-10">
      <ThreeDCard glowColor="rgba(239, 59, 50, 0.25)" className="bg-white p-4 border border-white/80 space-y-2">
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
              <ChevronRight className="w-4 h-4 text-red-500 opacity-80" strokeWidth={2.5} />
            </div>

            <div className="mt-1 text-[11.5px] text-[#666666] leading-[1.4] font-medium">
              <p>
                Bạn đã học được <span className="font-extrabold text-[#242424]">228</span> từ mới
              </p>
              <p>
                và hoàn thành <span className="font-extrabold text-[#242424]">42</span> bài học
              </p>
            </div>

            {/* Bottom Right Pill Button with 3D tactile press */}
            <div className="mt-2.5 flex justify-end">
              <button
                onClick={onDetailClick}
                type="button"
                className="btn-3d-red text-white text-[11px] font-extrabold px-4 py-1.5 rounded-full cursor-pointer"
              >
                Xem chi tiết
              </button>
            </div>
          </div>
        </div>
      </ThreeDCard>
    </div>
  );
};
