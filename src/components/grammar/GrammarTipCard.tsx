import React, { useState } from 'react';
import { Lightbulb } from 'lucide-react';
import { GRAMMAR_TIPS } from '../../data/grammarData';

export const GrammarTipCard: React.FC = () => {
  const [tipIndex, setTipIndex] = useState(0);

  const handleNextTip = () => {
    setTipIndex((prev) => (prev + 1) % GRAMMAR_TIPS.length);
  };

  return (
    <div className="w-full px-4 py-1.5 relative z-10">
      <button
        onClick={handleNextTip}
        type="button"
        className="w-full bg-[#F0F5FF] border border-[#D5E3FF] rounded-2xl p-3.5 flex items-center justify-between shadow-xs hover:border-blue-300 active:scale-[0.99] transition-all text-left cursor-pointer"
      >
        {/* Left Side: Tip Info */}
        <div className="flex items-start space-x-2.5 min-w-0 pr-2">
          <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Lightbulb className="w-4 h-4 fill-amber-400 stroke-[2]" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center space-x-1.5">
              <h3 className="text-[12.5px] font-bold text-[#1E52E8] tracking-tight">
                Mẹo học ngữ pháp
              </h3>
              <span className="text-[9px] bg-blue-100 text-[#1E52E8] px-1.5 py-0.2 rounded-full font-medium">
                #{tipIndex + 1}
              </span>
            </div>
            <p className="text-[10.5px] text-[#555555] font-medium leading-normal mt-0.5">
              {GRAMMAR_TIPS[tipIndex]}
            </p>
          </div>
        </div>

        {/* Right Side: Open book + Pencil SVG Illustration matching image */}
        <div className="w-16 h-12 flex-shrink-0 flex items-center justify-center relative">
          <svg viewBox="0 0 80 60" fill="none" className="w-full h-full">
            {/* Blue Open Book Cover */}
            <path d="M10 42 C25 38 40 40 40 18 C40 18 25 15 10 20 Z" fill="#2570F0" />
            <path d="M70 42 C55 38 40 40 40 18 C40 18 55 15 70 20 Z" fill="#1E52E8" />
            {/* White Pages */}
            <path d="M12 40 C25 36 38 38 38 20 C38 20 25 17 12 22 Z" fill="#FFFFFF" />
            <path d="M68 40 C55 36 42 38 42 20 C42 20 55 17 68 22 Z" fill="#F8FAFC" />
            {/* Page Lines */}
            <line x1="16" y1="26" x2="34" y2="24" stroke="#CBD5E1" strokeWidth="1.5" />
            <line x1="16" y1="31" x2="34" y2="29" stroke="#CBD5E1" strokeWidth="1.5" />
            <line x1="46" y1="24" x2="64" y2="26" stroke="#CBD5E1" strokeWidth="1.5" />
            <line x1="46" y1="29" x2="64" y2="31" stroke="#CBD5E1" strokeWidth="1.5" />
            {/* Yellow Pencil */}
            <rect x="52" y="8" width="6" height="24" rx="2" transform="rotate(25 52 8)" fill="#FFC107" />
            <polygon points="62,32 66,35 60,36" fill="#424242" />
          </svg>
        </div>
      </button>
    </div>
  );
};
