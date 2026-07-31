import React from 'react';
import { Volume2, Heart, RotateCcw } from 'lucide-react';
import { FlashcardItem } from '../../types/flashcards';
import { speakChinese } from '../../utils/chineseSpeech';

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
    const textToSpeak = card.audioText || card.simplified || '';
    if (onPlayAudio) {
      onPlayAudio(textToSpeak);
    } else {
      speakChinese(textToSpeak, 0.8);
    }
  };

  const vietnameseMeanings = (card as any).vietnameseMeanings;
  const examples = (card as any).examples;

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
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full whitespace-nowrap">
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

            {/* Single Horizontal Line Standard Font Word Container */}
            <div className="px-6 py-3.5 bg-[#F8FAFC] rounded-2xl border border-slate-200 flex items-center justify-center relative overflow-hidden shadow-inner my-2 min-w-[8rem] max-w-full">
              <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-sans tracking-normal leading-none whitespace-nowrap">
                {card.simplified}
              </span>
            </div>

            {/* Audio Button */}
            <button
              onClick={handleAudio}
              type="button"
              className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center space-x-1.5 cursor-pointer active:scale-95 transition-transform whitespace-nowrap"
            >
              <Volume2 className="w-4 h-4" />
              <span>Nghe âm chuẩn</span>
            </button>

            <span className="text-[11px] text-slate-400 font-medium flex items-center space-x-1 pt-2 whitespace-nowrap">
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Chạm thẻ để lật xem nghĩa</span>
            </span>
          </div>
        ) : (
          /* BACK SIDE */
          <div className="flex flex-col justify-between h-full space-y-3 text-left my-auto animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-2xl font-extrabold text-slate-900 font-sans tracking-normal whitespace-nowrap">
                {card.simplified}
              </span>
              <span className="text-sm font-extrabold text-emerald-600 whitespace-nowrap">
                {card.pinyin}
              </span>
            </div>

            {/* Meanings */}
            <div className="space-y-1">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                Nghĩa tiếng Việt:
              </span>
              <p className="text-base font-extrabold text-slate-800">
                {vietnameseMeanings?.join(', ') || card.vietnamese}
              </p>
            </div>

            {/* Example Sentences */}
            {examples && examples.length > 0 && (
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs space-y-1">
                <span className="font-bold text-slate-500">Ví dụ:</span>
                <p className="text-slate-800 font-medium">{examples[0].chinese}</p>
                <p className="text-emerald-700">{examples[0].pinyin}</p>
                <p className="text-slate-600">{examples[0].vietnamese}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
