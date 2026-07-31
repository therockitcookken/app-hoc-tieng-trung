import React from 'react';
import { ChevronLeft, Mic } from 'lucide-react';

interface PronunciationHeaderProps {
  onBack: () => void;
  onNotificationClick?: () => void;
}

export const PronunciationHeader: React.FC<PronunciationHeaderProps> = ({
  onBack,
  onNotificationClick,
}) => {
  return (
    <div className="w-full px-4 pt-3 pb-2 relative z-10">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-2.5 rounded-2xl shadow-xl flex items-center justify-between">
        {/* Back Button */}
        <button
          onClick={onBack}
          type="button"
          className="w-9 h-9 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-xs active:scale-90 transition-spring cursor-pointer group"
          aria-label="Quay lại"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5] transition-transform group-hover:-translate-x-0.5" />
        </button>

        {/* Title Center */}
        <div className="flex-1 text-center px-2">
          <div className="flex items-center justify-center space-x-2 text-white">
            <span className="text-[10px] font-extrabold uppercase tracking-widest bg-amber-400/20 text-amber-300 border border-amber-400/40 px-2.5 py-0.5 rounded-full backdrop-blur-xs flex items-center space-x-1">
              <Mic className="w-3 h-3" />
              <span>Hán ngữ v2.5</span>
            </span>
          </div>

          <h1 className="text-[18px] sm:text-[20px] font-black tracking-wide text-white font-sans uppercase drop-shadow-xs mt-1">
            Luyện Phát Âm Chuẩn
          </h1>

          <p className="text-[11px] text-white/80 font-medium tracking-tight">
            Giọng đọc Bắc Kinh Phổ thông chuẩn 100%
          </p>
        </div>

        {/* Right Icon */}
        <button
          onClick={onNotificationClick}
          type="button"
          className="w-9 h-9 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-xs active:scale-90 transition-spring cursor-pointer group"
        >
          <Mic className="w-4.5 h-4.5 text-amber-300 transition-transform group-hover:scale-110" />
        </button>
      </div>
    </div>
  );
};
