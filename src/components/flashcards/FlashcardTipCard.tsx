import React, { useState } from 'react';
import { Lightbulb } from 'lucide-react';
import { FLASHCARD_TIPS } from '../../data/flashcardData';

export const FlashcardTipCard: React.FC = () => {
  const [tipIndex, setTipIndex] = useState(0);

  const handleNextTip = () => {
    setTipIndex((prev) => (prev + 1) % FLASHCARD_TIPS.length);
  };

  return (
    <div className="w-full px-4 py-1.5 relative z-10">
      <button
        onClick={handleNextTip}
        type="button"
        className="w-full bg-[#F7EEFE] border border-[#E9D5FB] rounded-2xl p-3.5 flex items-center justify-between shadow-xs hover:border-purple-300 active:scale-[0.99] transition-all text-left cursor-pointer"
      >
        {/* Left Side: Tip Info */}
        <div className="flex items-start space-x-2.5 min-w-0 pr-2">
          <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Lightbulb className="w-4 h-4 fill-amber-400 stroke-[2]" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center space-x-1.5">
              <h3 className="text-[12.5px] font-bold text-[#8E24AA] tracking-tight">
                Mẹo ghi nhớ
              </h3>
              <span className="text-[9px] bg-purple-100 text-[#8E24AA] px-1.5 py-0.2 rounded-full font-medium">
                #{tipIndex + 1}
              </span>
            </div>
            <p className="text-[10.5px] text-[#555555] font-medium leading-normal mt-0.5">
              {FLASHCARD_TIPS[tipIndex]}
            </p>
          </div>
        </div>

        {/* Right Side: Stacked Purple Cards SVG Illustration matching reference image */}
        <div className="w-16 h-12 flex-shrink-0 flex items-center justify-center relative">
          <svg viewBox="0 0 80 60" fill="none" className="w-full h-full">
            {/* Back Card 3 */}
            <rect x="25" y="10" width="40" height="28" rx="4" fill="#CE93D8" transform="rotate(12 45 24)" opacity="0.6" />
            {/* Middle Card 2 */}
            <rect x="22" y="12" width="40" height="28" rx="4" fill="#AB47BC" transform="rotate(-6 42 26)" opacity="0.85" />
            {/* Front Card 1 */}
            <rect x="18" y="15" width="40" height="28" rx="4" fill="#8E24AA" />
            <polygon points="38,22 42,32 32,26 44,26 34,32" fill="#FFD54F" />
          </svg>
        </div>
      </button>
    </div>
  );
};
