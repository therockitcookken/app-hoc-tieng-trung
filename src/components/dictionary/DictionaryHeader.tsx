import React from 'react';
import { ChevronLeft, BookMarked } from 'lucide-react';

interface DictionaryHeaderProps {
  onBack: () => void;
  onIconClick?: () => void;
}

export const DictionaryHeader: React.FC<DictionaryHeaderProps> = ({
  onBack,
  onIconClick,
}) => {
  return (
    <div className="w-full px-4 pt-3 pb-2 relative z-10">
      <div className="flex items-center justify-between">
        {/* Back Button */}
        <button
          onClick={onBack}
          type="button"
          className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-xs active:scale-90 transition-transform cursor-pointer"
          aria-label="Quay lại"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Title Center */}
        <div className="flex-1 text-center px-2">
          <div className="flex items-center justify-center space-x-2 text-white">
            <BookMarked className="w-4 h-4 text-emerald-200" />
            <h1 className="text-[20px] font-extrabold tracking-wide uppercase drop-shadow-xs">
              TỪ ĐIỂN
            </h1>
            <BookMarked className="w-4 h-4 text-emerald-200" />
          </div>

          <p className="text-[11.5px] text-white/90 font-medium tracking-tight mt-0.5">
            Tra cứu từ vựng nhanh chóng, chính xác
          </p>
        </div>

        {/* Right Icon */}
        <button
          onClick={onIconClick}
          type="button"
          className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-xs active:scale-90 transition-transform cursor-pointer"
        >
          <BookMarked className="w-4.5 h-4.5 text-emerald-200" />
        </button>
      </div>
    </div>
  );
};
