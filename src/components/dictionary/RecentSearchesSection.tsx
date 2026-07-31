import React from 'react';
import { Clock, ChevronRight, Volume2 } from 'lucide-react';
import { RECENT_SEARCHES_MOCK } from '../../data/dictionaryData';
import { speakChinese } from '../../utils/chineseSpeech';

interface RecentSearchesSectionProps {
  onSelectWord: (word: string) => void;
  onSeeAllClick?: () => void;
}

export const RecentSearchesSection: React.FC<RecentSearchesSectionProps> = ({
  onSelectWord,
  onSeeAllClick,
}) => {
  const handlePlaySound = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    speakChinese(text, 0.85);
  };

  return (
    <div className="w-full px-4 py-1.5 relative z-10">
      {/* Header Row */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-1.5">
          <Clock className="w-4 h-4 text-[#28B849]" />
          <h2 className="text-[14px] font-extrabold text-[#242424] tracking-tight">
            Từ tra gần đây
          </h2>
        </div>
        <button
          onClick={onSeeAllClick}
          type="button"
          className="text-[11px] text-[#666666] font-medium flex items-center hover:text-[#28B849] cursor-pointer"
        >
          <span>Xem tất cả</span>
          <ChevronRight className="w-3.5 h-3.5 text-[#999999]" />
        </button>
      </div>

      {/* Horizontal Scroll Cards */}
      <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1 px-0.5 scroll-smooth snap-x">
        {RECENT_SEARCHES_MOCK.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelectWord(item.simplified)}
            type="button"
            className="min-w-[90px] bg-[#F4FAF5] border border-[#E0F2E3] rounded-2xl p-2.5 flex flex-col justify-between shadow-2xs hover:border-[#28B849] active:scale-95 transition-all cursor-pointer text-left snap-start flex-shrink-0"
          >
            <div>
              <span className="text-[18px] font-extrabold text-[#242424] font-serif leading-none block">
                {item.simplified}
              </span>
              <span className="text-[10px] text-[#28B849] font-bold mt-1 block">
                {item.pinyin}
              </span>
            </div>

            <div className="mt-2 flex items-center justify-end">
              <span
                onClick={(e) => handlePlaySound(e, item.simplified)}
                className="p-1 rounded-full text-[#28B849] hover:bg-[#E0F2E3] transition-colors"
                title="Nghe phát âm"
              >
                <Volume2 className="w-3.5 h-3.5 fill-current stroke-[1.5]" />
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
