import React, { useState } from 'react';
import { Lightbulb } from 'lucide-react';
import { PRONUNCIATION_TIPS } from '../../data/pronunciationData';

export const PronunciationTipCard: React.FC = () => {
  const [tipIndex, setTipIndex] = useState(0);

  const handleNextTip = () => {
    setTipIndex((prev) => (prev + 1) % PRONUNCIATION_TIPS.length);
  };

  return (
    <div className="w-full px-4 py-1.5 relative z-10">
      <button
        onClick={handleNextTip}
        type="button"
        className="w-full bg-[#FFF0F2] border border-[#FFE0E4] rounded-2xl p-3.5 flex items-center justify-between shadow-xs hover:border-red-200 active:scale-[0.99] transition-all text-left cursor-pointer"
      >
        {/* Left Side: Tip Content */}
        <div className="flex items-start space-x-2.5 min-w-0 pr-2">
          <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Lightbulb className="w-4 h-4 fill-amber-400 stroke-[2]" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center space-x-1.5">
              <h3 className="text-[12.5px] font-bold text-[#D92329] tracking-tight">
                Mẹo phát âm
              </h3>
              <span className="text-[9px] bg-red-100 text-[#D92329] px-1.5 py-0.2 rounded-full font-medium">
                #{tipIndex + 1}
              </span>
            </div>
            <p className="text-[10.5px] text-[#555555] font-medium leading-normal mt-0.5">
              {PRONUNCIATION_TIPS[tipIndex]}
            </p>
          </div>
        </div>

        {/* Right Side: Vector mouth pronunciation SVG illustration */}
        <div className="w-16 h-12 flex-shrink-0 flex items-center justify-center relative">
          <svg viewBox="0 0 80 60" fill="none" className="w-full h-full">
            {/* Skin Profile Outline */}
            <path
              d="M10 5 C30 5 45 15 50 30 C53 38 60 40 70 42 C60 48 50 55 40 55 C25 55 10 40 10 5 Z"
              fill="#FFD2C8"
            />
            {/* Lips / Mouth open */}
            <path
              d="M45 28 C48 30 52 35 48 38 C44 40 40 38 38 35 Z"
              fill="#EF5350"
            />
            {/* Sound Wave Arcs */}
            <path
              d="M58 24 A 12 12 0 0 1 58 42"
              stroke="#FFA726"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M65 20 A 18 18 0 0 1 65 46"
              stroke="#FF7043"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </button>
    </div>
  );
};
