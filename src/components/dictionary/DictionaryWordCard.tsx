import React, { useState, useEffect } from 'react';
import { Volume2, Heart, Plus, Mic } from 'lucide-react';
import { DictionaryWord } from '../../data/dictionaryData';
import { ThreeDCard } from '../3d/ThreeDCard';
import { speakChinese } from '../../utils/chineseSpeech';

interface DictionaryWordCardProps {
  word: DictionaryWord;
  onSeeAllClick?: () => void;
  onAddToNotebook?: (word: DictionaryWord) => void;
  onPracticePronunciation?: (word: DictionaryWord) => void;
  showToast?: (msg: string) => void;
}

export const DictionaryWordCard: React.FC<DictionaryWordCardProps> = ({
  word,
  onAddToNotebook,
  onPracticePronunciation,
  showToast,
}) => {
  const [isFavorite, setIsFavorite] = useState(() => {
    try {
      const favs = localStorage.getItem(`dict_fav_${word.id}`);
      return favs === 'true';
    } catch {
      return false;
    }
  });

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    try {
      const favs = localStorage.getItem(`dict_fav_${word.id}`);
      setIsFavorite(favs === 'true');
    } catch {
      setIsFavorite(false);
    }
  }, [word.id]);

  const handleToggleFavorite = () => {
    const nextState = !isFavorite;
    setIsFavorite(nextState);
    try {
      localStorage.setItem(`dict_fav_${word.id}`, String(nextState));
    } catch {
      // Ignore
    }
    showToast?.(
      nextState
        ? `Đã thêm "${word.simplified}" vào danh sách yêu thích!`
        : `Đã bỏ yêu thích "${word.simplified}"`
    );
  };

  const handlePlayAudio = () => {
    setIsPlaying(true);
    speakChinese(word.simplified, 0.85);
    setTimeout(() => setIsPlaying(false), 1200);
  };

  // Sense Filter Logic: Only number if there are 2 or more valid non-empty definitions
  const rawMeanings = word.vietnameseMeanings || [];
  const validMeanings = rawMeanings.filter((m) => {
    const trimmed = m?.trim();
    return trimmed && !/^\d+[.)]?$/.test(trimmed);
  });
  const shouldNumberSenses = validMeanings.length > 1;

  const isFactoryWord = (word as any).isFactoryWord;
  const hanViet = (word as any).hanViet || (word as any).traditional || word.simplified;

  return (
    <div className="w-full py-1.5 relative z-10">
      {/* 3D Interactive Tilt Card */}
      <ThreeDCard glowColor="rgba(40, 184, 73, 0.2)" className="bg-white p-4 border border-emerald-100 shadow-md space-y-3">
        {/* Top Word Summary Row */}
        <div className="flex items-center justify-between space-x-3">
          {/* Single Horizontal Line Standard Font Word Container */}
          <div className="min-w-[4rem] px-3.5 h-14 bg-[#F8FAFC] rounded-2xl border border-slate-200 flex items-center justify-center flex-shrink-0 relative overflow-hidden shadow-inner">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] font-sans tracking-normal leading-none whitespace-nowrap select-text">
              {word.simplified}
            </span>
          </div>

          {/* Pinyin, HSK & Hán Việt Details */}
          <div className="flex-1 min-w-0 space-y-1">
            <div className="flex items-center space-x-2 flex-wrap">
              <span className="text-base font-extrabold text-[#D92329] tracking-wide whitespace-nowrap">
                {word.pinyin}
              </span>
              <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full whitespace-nowrap">
                {word.hskLevel}
              </span>
              {isFactoryWord && (
                <span className="text-[10px] font-extrabold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full whitespace-nowrap">
                  Công Xưởng
                </span>
              )}
            </div>

            <div className="text-xs text-slate-600 font-medium">
              Âm Hán Việt: <span className="font-bold text-slate-800">{hanViet}</span>
            </div>
          </div>

          {/* Audio & Favorite Buttons */}
          <div className="flex items-center space-x-1.5 flex-shrink-0">
            <button
              onClick={handlePlayAudio}
              type="button"
              className={`w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all active:scale-90 ${
                isPlaying
                  ? 'bg-emerald-600 text-white animate-pulse'
                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
              }`}
              title="Phát âm"
            >
              <Volume2 className="w-4 h-4" />
            </button>

            <button
              onClick={handleToggleFavorite}
              type="button"
              className={`w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all active:scale-90 ${
                isFavorite
                  ? 'bg-rose-100 text-rose-600'
                  : 'bg-slate-100 text-slate-400 hover:text-rose-500'
              }`}
              title="Yêu thích"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-600' : ''}`} />
            </button>
          </div>
        </div>

        {/* Meaning List Section - Auto Sizing */}
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1.5">
          {validMeanings.length > 0 ? (
            validMeanings.map((meaning, idx) => (
              <div key={idx} className="text-xs text-slate-800 font-semibold flex items-start space-x-1.5 leading-relaxed">
                {shouldNumberSenses && (
                  <span className="text-emerald-700 font-black flex-shrink-0">{idx + 1}.</span>
                )}
                <span>{meaning}</span>
              </div>
            ))
          ) : (
            <div className="text-xs text-slate-800 font-semibold">
              {word.vietnameseMeanings?.[0] || 'Nghĩa từ vựng chưa cập nhật'}
            </div>
          )}
        </div>

        {/* Action Buttons Row */}
        <div className="flex items-center space-x-2 pt-1">
          <button
            onClick={() => onAddToNotebook?.(word)}
            type="button"
            className="flex-1 py-2 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-extrabold text-xs rounded-xl border border-emerald-200 flex items-center justify-center space-x-1.5 cursor-pointer active:scale-95 transition-transform whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Thêm vào sổ tay</span>
          </button>

          <button
            onClick={() => onPracticePronunciation?.(word)}
            type="button"
            className="flex-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs rounded-xl border border-slate-200 flex items-center justify-center space-x-1.5 cursor-pointer active:scale-95 transition-transform whitespace-nowrap"
          >
            <Mic className="w-3.5 h-3.5 text-emerald-600" />
            <span>Luyện phát âm</span>
          </button>
        </div>
      </ThreeDCard>
    </div>
  );
};
