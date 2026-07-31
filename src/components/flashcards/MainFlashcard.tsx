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
      className="w-full min-h-[270px] cursor-pointer perspective-1000 select-none group"
    >
      <div
        className={`w-full min-h-[270px] bg-white/95 rounded-[2rem] p-1.5 shadow-2xl border border-slate-200/80 flex flex-col justify-between relative transition-transform duration-500 transform-style-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        <div className="w-full h-full bg-slate-50/80 rounded-[calc(2rem-0.375rem)] p-5 border border-slate-100 flex flex-col justify-between relative">
          {/* FRONT SIDE */}
          {!isFlipped ? (
            <div className="flex flex-col items-center justify-between h-full space-y-4 text-center my-auto">
              {/* Top Bar: HSK Badge & Favorite */}
              <div className="w-full flex items-center justify-between">
                <span className="eyebrow-pill bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                  {card.hskLevel || 'Thẻ Học Standard'}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite?.(card.id);
                  }}
                  type="button"
                  className="w-8 h-8 rounded-full bg-white/80 border border-slate-200 text-slate-300 hover:text-red-500 flex items-center justify-center cursor-pointer transition-spring active:scale-90"
                >
                  <Heart className={`w-4 h-4 ${card.isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                </button>
              </div>

              {/* Single Horizontal Line Standard Font Word Container */}
              <div className="px-7 py-4 bg-white rounded-2xl border border-slate-200/80 flex items-center justify-center relative overflow-hidden shadow-sm my-2 min-w-[8.5rem] max-w-full group-hover:scale-105 transition-spring">
                <span className="text-4xl sm:text-5xl font-black text-slate-900 font-sans tracking-normal leading-none whitespace-nowrap">
                  {card.simplified}
                </span>
              </div>

              {/* Audio Button-in-Button */}
              <button
                onClick={handleAudio}
                type="button"
                className="group/btn bg-emerald-50 hover:bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-xs font-extrabold flex items-center space-x-2 border border-emerald-200/80 cursor-pointer active:scale-95 transition-spring shadow-xs"
              >
                <div className="btn-nested-icon bg-emerald-200/70 text-emerald-900">
                  <Volume2 className="w-3.5 h-3.5" />
                </div>
                <span>Nghe âm chuẩn</span>
              </button>

              <span className="text-[11px] text-slate-400 font-medium flex items-center space-x-1 pt-1 whitespace-nowrap">
                <RotateCcw className="w-3.5 h-3.5 animate-spin-slow" />
                <span>Chạm thẻ để lật xem nghĩa</span>
              </span>
            </div>
          ) : (
            /* BACK SIDE */
            <div className="flex flex-col justify-between h-full space-y-3 text-left my-auto animate-fade-in">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="text-2xl font-extrabold text-slate-900 font-sans tracking-normal whitespace-nowrap">
                  {card.simplified}
                </span>
                <span className="text-sm font-extrabold text-emerald-600 whitespace-nowrap">
                  {card.pinyin}
                </span>
              </div>

              {/* Meanings */}
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                  Nghĩa tiếng Việt:
                </span>
                <p className="text-base font-black text-slate-900">
                  {vietnameseMeanings?.join(', ') || card.vietnamese}
                </p>
              </div>

              {/* Example Sentences */}
              {examples && examples.length > 0 && (
                <div className="bg-white p-3 rounded-xl border border-slate-200/80 text-xs space-y-1 shadow-xs">
                  <span className="font-extrabold text-slate-500 text-[10px] uppercase">Ví dụ minh họa:</span>
                  <p className="text-slate-900 font-bold">{examples[0].chinese}</p>
                  <p className="text-emerald-600 font-extrabold">{examples[0].pinyin}</p>
                  <p className="text-slate-600 font-medium">{examples[0].vietnamese}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
