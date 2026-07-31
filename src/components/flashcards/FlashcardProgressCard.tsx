import React from 'react';
import { Flame, ChevronRight } from 'lucide-react';

interface FlashcardProgressCardProps {
  onDetailClick: () => void;
}

export const FlashcardProgressCard: React.FC<FlashcardProgressCardProps> = ({
  onDetailClick,
}) => {
  const percentage = 78;
  const size = 70;
  const strokeWidth = 6.5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="w-full px-4 py-1 relative z-10">
      <div className="bg-white rounded-2xl p-4 shadow-[0_6px_20px_rgba(0,0,0,0.06)] border border-white/80 relative overflow-hidden">
        {/* Card Title */}
        <h2 className="text-[14px] font-extrabold text-[#242424] tracking-tight mb-3">
          Tiến độ học flashcard
        </h2>

        <div className="flex items-center justify-between space-x-3">
          {/* Left Side: Circular Progress 78% */}
          <div className="relative inline-flex items-center justify-center flex-shrink-0" style={{ width: size, height: size }}>
            <svg className="w-full h-full transform -rotate-90" viewBox={`0 0 ${size} ${size}`}>
              <defs>
                <linearGradient id="flashcardProgressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#A73CEB" />
                  <stop offset="100%" stopColor="#8E24AA" />
                </linearGradient>
              </defs>

              {/* Track */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="#F3E5F5"
                strokeWidth={strokeWidth}
                fill="transparent"
              />

              {/* Animated Purple Progress Arc */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="url(#flashcardProgressGrad)"
                strokeWidth={strokeWidth}
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>

            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[16px] font-extrabold text-[#8E24AA] tracking-tight">
                {percentage}%
              </span>
            </div>
          </div>

          {/* Middle Info & Progress Bar */}
          <div className="flex-1 min-w-0 pr-1">
            <h3 className="text-[12.5px] font-extrabold text-[#242424] tracking-tight leading-tight">
              Bạn đang ghi nhớ rất tốt!
            </h3>
            <p className="text-[11px] text-[#666666] font-medium mt-0.5">
              Đã học <span className="font-extrabold text-[#242424]">234/300</span> từ vựng
            </p>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-[#F3E5F5] rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#A73CEB] to-[#8E24AA] rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          {/* Right Side: Streak & Pill Button */}
          <div className="flex flex-col items-end justify-between self-stretch flex-shrink-0">
            <div className="bg-[#FAEBFF] border border-[#E1BEE7] rounded-xl px-2.5 py-1.5 text-center min-w-[76px]">
              <div className="flex items-center justify-center space-x-1 text-[#8E24AA] font-extrabold text-[13px] leading-none">
                <Flame className="w-3.5 h-3.5 fill-[#FF8A28] text-[#EF3B32]" />
                <span>15</span>
              </div>
              <span className="text-[9.5px] font-medium text-[#666666] block mt-0.5 leading-none">
                Ngày liên tiếp
              </span>
            </div>

            <button
              onClick={onDetailClick}
              type="button"
              className="mt-2 bg-gradient-to-r from-[#A73CEB] to-[#8E24AA] text-white text-[10.5px] font-bold px-3 py-1.5 rounded-full shadow-xs active:scale-95 transition-transform flex items-center space-x-0.5 cursor-pointer"
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
