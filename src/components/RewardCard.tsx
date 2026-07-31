import React from 'react';
import { Star } from 'lucide-react';

export const RewardCard: React.FC = () => {
  return (
    <div className="w-[110px] sm:w-[125px] bg-[#FFF3F3] rounded-xl p-2.5 flex flex-col justify-between relative overflow-hidden border border-[#FFE0E0]">
      {/* Text Info */}
      <div>
        <h4 className="text-[#D92329] font-bold text-[12px] tracking-tight">
          Phần thưởng
        </h4>
        <p className="text-[#888888] text-[9.5px] font-medium leading-tight mt-0.5">
          Học mỗi ngày để nhận
        </p>
      </div>

      {/* Score */}
      <div className="flex items-center space-x-1 mt-2 mb-0.5">
        <Star className="w-4 h-4 fill-[#FFBD2E] text-[#FFA000] stroke-[1]" />
        <span className="text-[#D92329] font-extrabold text-[15px] tracking-tight">
          +50
        </span>
      </div>

      {/* Decorative 3D Gift Box SVG in Bottom Right */}
      <div className="absolute -bottom-1 -right-1 w-11 h-11 pointer-events-none">
        <svg viewBox="0 0 48 48" fill="none" className="w-full h-full drop-shadow-sm">
          {/* Gift Box Base */}
          <rect x="8" y="20" width="32" height="22" rx="3" fill="url(#giftBoxGrad)" />
          {/* Lid */}
          <rect x="6" y="15" width="36" height="8" rx="2" fill="url(#giftLidGrad)" />
          {/* Vertical Ribbon */}
          <rect x="21" y="15" width="6" height="27" fill="#FFC107" />
          {/* Ribbon Bow Left */}
          <path d="M24 15 C18 8 10 12 18 15 Z" fill="#FFD54F" />
          {/* Ribbon Bow Right */}
          <path d="M24 15 C30 8 38 12 30 15 Z" fill="#FFD54F" />
          <circle cx="24" cy="15" r="2.5" fill="#FFA000" />
          
          <defs>
            <linearGradient id="giftBoxGrad" x1="8" y1="20" x2="40" y2="42" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FF5252" />
              <stop offset="1" stopColor="#D50000" />
            </linearGradient>
            <linearGradient id="giftLidGrad" x1="6" y1="15" x2="42" y2="23" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FF7979" />
              <stop offset="1" stopColor="#E53935" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};
