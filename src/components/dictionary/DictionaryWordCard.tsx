import React, { useState, useEffect } from 'react';
import { Volume2, Heart, Plus, Mic } from 'lucide-react';
import { DictionaryWord } from '../../data/dictionaryData';

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
    if (isPlaying) {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }
    setIsPlaying(true);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word.simplified);
      utterance.lang = 'zh-CN';
      utterance.rate = 0.85;
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsPlaying(false), 1500);
    }
  };

  // Sense Filter Logic: Only number if there are 2 or more valid non-empty definitions
  const rawMeanings = word.vietnameseMeanings || [];
  const validMeanings = rawMeanings.filter((m) => {
    const trimmed = m?.trim();
    return trimmed && !/^\d+[.)]?$/.test(trimmed);
  });
  const shouldNumberSenses = validMeanings.length > 1;

  return (
    <div className="w-full px-4 py-1.5 relative z-10">
      {/* Main Card - Auto Height Flex Container */}
      <div className="bg-white rounded-2xl p-4 shadow-[0_6px_20px_rgba(0,0,0,0.06)] border border-white/80 space-y-3 relative overflow-hidden">
        {/* Top Word Summary Row */}
        <div className="flex items-start justify-between space-x-3">
          {/* Tianzige Calligraphy Grid Box */}
          <div className="w-16 h-16 bg-[#FAFAFA] rounded-2xl border border-slate-200 flex items-center justify-center flex-shrink-0 relative overflow-hidden shadow-inner">
            <div
              className="absolute inset-0 border-r border-b border-dashed border-red-200 pointer-events-none"
              style={{ left: '50%', top: 0, bottom: 0, width: 0 }}
            />
            <div
              className="absolute inset-0 border-b border-dashed border-red-200 pointer-events-none"
              style={{ top: '50%', left: 0, right: 0, height: 0 }}
            />

            <span className="text-3xl font-extrabold text-[#111111] font-serif leading-none relative z-10">
              {word.simplified}
            </span>
          </div>

          {/* Pinyin, Meanings & Badges */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 flex-wrap">
              <span className="text-lg font-black text-[#242424] tracking-tight">
                {word.pinyin}
              </span>
              <button
                onClick={handlePlayAudio}
                type="button"
                className="w-6 h-6 rounded-full bg-emerald-50 text-[#28B849] flex items-center justify-center hover:bg-emerald-100 active:scale-90 transition-transform cursor-pointer flex-shrink-0"
                aria-label="Phát âm thanh"
              >
                <Volume2 className="w-3.5 h-3.5 fill-current stroke-[1.5]" />
              </button>
            </div>

            {/* Rendered Meanings List */}
            <div className="text-xs text-slate-700 font-medium mt-1 space-y-0.5">
              <span className="text-slate-500 font-bold block text-[10.5px]">Nghĩa:</span>
              {shouldNumberSenses ? (
                <ol className="list-decimal list-inside space-y-0.5 font-semibold text-slate-900">
                  {validMeanings.map((m, idx) => (
                    <li key={idx} className="leading-snug">
                      {m}
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="font-extrabold text-slate-900 leading-snug">
                  {validMeanings[0] || 'Từ vựng tiếng Trung'}
                </p>
              )}
            </div>

            <div className="flex items-center space-x-1.5 mt-2">
              <span className="bg-[#E8F8EA] text-[#2E7D32] font-bold text-[9.5px] px-2 py-0.5 rounded-md border border-[#C2EBC5]">
                {word.hskLevel}
              </span>
              <span className="bg-amber-50 text-amber-800 font-bold text-[9.5px] px-2 py-0.5 rounded-md border border-amber-200/60">
                {word.frequency}
              </span>
            </div>
          </div>

          {/* Favorite Heart Button */}
          <button
            onClick={handleToggleFavorite}
            type="button"
            className="p-1 text-red-500 hover:scale-110 active:scale-90 transition-transform cursor-pointer flex-shrink-0"
            aria-label="Yêu thích"
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-slate-300'}`} />
          </button>
        </div>

        {/* Detailed Specs Box */}
        <div className="bg-[#F9FAF9] rounded-xl p-3 border border-slate-200/60 text-[11px] space-y-1.5">
          <div className="flex items-start">
            <span className="w-16 font-bold text-slate-500 flex-shrink-0">Từ loại:</span>
            <span className="font-bold text-slate-800">{word.partOfSpeech}</span>
          </div>

          {word.examples && word.examples.length > 0 && (
            <div className="flex items-start">
              <span className="w-16 font-bold text-slate-500 flex-shrink-0">Ví dụ:</span>
              <div className="flex-1 space-y-0.5">
                <p className="font-serif font-bold text-slate-900 text-[12px] leading-snug">
                  {word.examples[0].sentence}
                </p>
                <p className="text-[10.5px] text-emerald-700 font-bold">
                  {word.examples[0].pinyin}
                </p>
                <p className="text-[10.5px] text-slate-600 font-medium">
                  {word.examples[0].vietnamese}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-0.5">
          <button
            onClick={() => onAddToNotebook?.(word)}
            type="button"
            className="bg-[#28B849] hover:bg-[#1FB03E] text-white py-2 px-3 rounded-xl text-xs font-bold shadow-xs active:scale-95 transition-transform flex items-center justify-center space-x-1 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Thêm vào sổ tay</span>
          </button>

          <button
            onClick={() => onPracticePronunciation?.(word)}
            type="button"
            className="bg-[#E8F8EA] hover:bg-[#D4F4D8] text-[#28B849] border border-[#C2EBC5] py-2 px-3 rounded-xl text-xs font-bold shadow-2xs active:scale-95 transition-transform flex items-center justify-center space-x-1 cursor-pointer"
          >
            <Mic className="w-4 h-4" />
            <span>Luyện phát âm</span>
          </button>
        </div>
      </div>
    </div>
  );
};
