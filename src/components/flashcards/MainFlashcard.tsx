import React from 'react';
import { Volume2, Heart, RotateCcw } from 'lucide-react';
import { FlashcardItem } from '../../types/flashcards';

interface MainFlashcardProps {
  card: FlashcardItem;
  isFlipped: boolean;
  onFlip: () => void;
  onToggleFavorite?: (cardId: string) => void;
  onPlayAudio?: (text: string) => void;
}

export const MainFlashcard: React.FC<MainFlashcardProps> = ({
  card,
  isFlipped,
  onFlip,
  onToggleFavorite,
  onPlayAudio,
}) => {
  const handleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onPlayAudio) {
      onPlayAudio(card.audioText || card.simplified || '');
    } else if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(card.audioText || card.simplified || '');
      utterance.lang = 'zh-CN';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div
      onClick={onFlip}
      className="w-full min-h-[260px] cursor-pointer perspective-1000 select-none"
    >
      <div
        className={`w-full min-h-[260px] bg-white rounded-3xl p-6 shadow-xl border border-slate-100 flex flex-col justify-between relative transition-transform duration-500 transform-style-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* FRONT SIDE */}
        {!isFlipped ? (
          <div className="flex flex-col items-center justify-between h-full space-y-4 text-center my-auto">
            {/* Top Bar: HSK Badge & Favorite */}
            <div className="w-full flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                {card.hskLevel || 'Thẻ Học'}
              </span>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite?.(card.id);
                }}
                type="button"
                className="p-1 text-slate-300 hover:text-red-500 cursor-pointer"
              >
                <Heart className={`w-5 h-5 ${card.isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
              </button>
            </div>

            {/* Tianzige Calligraphy Character Box */}
            <div className="w-24 h-24 bg-[#FAFAFA] rounded-2xl border border-slate-200 flex items-center justify-center relative overflow-hidden shadow-inner my-2">
              <div className="absolute inset-0 border-r border-b border-dashed border-red-200 pointer-events-none" style={{ left: '50%', top: 0, bottom: 0, width: 0 }} />
              <div className="absolute inset-0 border-b border-dashed border-red-200 pointer-events-none" style={{ top: '50%', left: 0, right: 0, height: 0 }} />

              <span className="text-5xl font-extrabold text-slate-900 font-serif leading-none relative z-10">
                {card.simplified}
              </span>
            </div>

            {/* Audio Button */}
            <button
              onClick={handleAudio}
              type="button"
              className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center space-x-1.5 cursor-pointer active:scale-95 transition-transform"
            >
              <Volume2 className="w-4 h-4" />
              <span>Nghe âm chuẩn</span>
            </button>

            <span className="text-[11px] text-slate-400 font-medium flex items-center space-x-1 pt-2">
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Chạm thẻ để lật xem nghĩa</span>
            </span>
          </div>
        ) : (
          /* BACK SIDE */
          <div className="flex flex-col justify-between h-full space-y-3 text-left my-auto animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-xl font-black text-slate-900 font-serif">
                {card.simplified}
              </span>
              <span className="text-sm font-extrabold text-emerald-600">
                {card.pinyin}
              </span>
            </div>

            {/* Definition */}
            <div className="bg-emerald-50/80 p-3 rounded-xl border border-emerald-200 space-y-1">
              <span className="text-[10.5px] font-bold text-emerald-800 uppercase tracking-wider block">
                Nghĩa tiếng Việt:
              </span>
              <p className="text-sm font-extrabold text-slate-900 leading-snug">
                {card.vietnamese}
              </p>
            </div>

            {/* Audio & Flip Prompt */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={handleAudio}
                type="button"
                className="bg-emerald-600 text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1 shadow-xs active:scale-95 transition-transform cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Phát âm</span>
              </button>

              <span className="text-[10.5px] text-slate-400 font-medium">
                Chạm để lật lại mặt trước
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
