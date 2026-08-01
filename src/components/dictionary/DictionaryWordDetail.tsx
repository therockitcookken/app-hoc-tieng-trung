import React from 'react';
import { X, Volume2, PlusCircle } from 'lucide-react';
import { DictionaryEntry } from '../../types/dictionary';
import { speakChinese } from '../../utils/chineseSpeech';

interface DictionaryWordDetailProps {
  isOpen: boolean;
  onClose: () => void;
  entry: DictionaryEntry | null;
  showToast?: (msg: string) => void;
}

export const DictionaryWordDetail: React.FC<DictionaryWordDetailProps> = ({
  isOpen,
  onClose,
  entry,
  showToast,
}) => {
  if (!isOpen || !entry) return null;

  const handlePlayAudio = (text: string, rate: number = 0.8) => {
    speakChinese(text, rate);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/75 backdrop-blur-md z-[100] flex items-center justify-center p-4 sm:p-6 animate-fade-in select-none">
      {/* Outer Shell Double-Bezel Container */}
      <div className="bg-white/95 rounded-[2.2rem] p-1.5 w-full max-w-[440px] max-h-[84dvh] shadow-2xl border border-slate-200/80 relative flex flex-col">
        {/* Inner Core Content Area with Custom Scrollbar */}
        <div className="bg-white rounded-[calc(2.2rem-0.375rem)] p-5 sm:p-6 overflow-y-auto no-scrollbar space-y-4 relative flex-1">
          {/* Close Button Top Right */}
          <button
            onClick={onClose}
            type="button"
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center absolute top-4 right-4 cursor-pointer transition-spring active:scale-90 z-10"
            aria-label="Đóng"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>

          {/* Word Title Header */}
          <div className="flex items-center space-x-3 pr-6">
            <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black text-3xl shadow-lg font-sans flex-shrink-0">
              {entry.simplified}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-base font-black text-emerald-700">
                  {entry.pinyin}
                </span>
                <span className="eyebrow-pill bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                  {entry.hskLevel}
                </span>
              </div>
              <span className="text-xs text-slate-500 font-extrabold block mt-0.5">
                Từ loại: {entry.partOfSpeech}
              </span>
              {entry.traditional && (
                <span className="text-[10.5px] text-slate-400 font-medium block">
                  Phồn thể: {entry.traditional}
                </span>
              )}
            </div>
          </div>

          {/* Audio Action Row */}
          <div className="flex items-center space-x-2 pt-1">
            <button
              onClick={() => handlePlayAudio(entry.simplified, 0.8)}
              type="button"
              className="flex-1 btn-3d-emerald text-white py-2.5 rounded-2xl text-xs font-black shadow-md flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>Nghe phát âm</span>
            </button>
            <button
              onClick={() => showToast?.(`Đã thêm từ "${entry.simplified}" vào bộ Flashcard!`)}
              type="button"
              className="bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-3.5 py-2.5 rounded-2xl text-xs font-extrabold flex items-center space-x-1.5 active:scale-95 transition-spring cursor-pointer shadow-2xs hover:bg-emerald-100/60"
            >
              <PlusCircle className="w-4 h-4 text-emerald-700" />
              <span>Thêm Flashcard</span>
            </button>
          </div>

          {/* Senses / Definitions */}
          <div className="space-y-2">
            <span className="text-xs font-black text-slate-900 block">
              📚 Các nghĩa của từ ({entry.senses.length}):
            </span>
            {entry.senses.map((sense, idx) => (
              <div key={idx} className="bg-slate-50/90 p-3.5 rounded-2xl border border-slate-200/80 space-y-1 shadow-2xs">
                <span className="text-xs font-black text-slate-900 block">
                  {idx + 1}. {sense.vietnameseDefinition}
                </span>
                {sense.measureWords && sense.measureWords.length > 0 && (
                  <span className="text-[10.5px] text-emerald-700 block font-extrabold">
                    • Lượng từ thường dùng: {sense.measureWords.join(', ')}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Collocations */}
          {entry.collocations && entry.collocations.length > 0 && (
            <div className="space-y-2 pt-1">
              <span className="text-xs font-black text-slate-900 block">
                🔗 Cụm từ thường đi kèm ({entry.collocations.length}):
              </span>
              <div className="space-y-1.5">
                {entry.collocations.map((col, idx) => (
                  <div key={idx} className="bg-emerald-50/80 p-3 rounded-2xl border border-emerald-200/80 flex items-center justify-between shadow-2xs">
                    <div>
                      <span className="font-black text-slate-900 font-sans text-xs block">{col.phraseChinese}</span>
                      <span className="text-[10.5px] font-extrabold text-emerald-800 block">{col.phrasePinyin}</span>
                      <span className="text-[10.5px] text-slate-600 font-medium block">{col.phraseVietnamese}</span>
                    </div>
                    <button
                      onClick={() => handlePlayAudio(col.phraseChinese)}
                      type="button"
                      className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 hover:bg-emerald-200 flex items-center justify-center cursor-pointer transition-spring active:scale-90 flex-shrink-0"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Examples Section */}
          {entry.examples && entry.examples.length > 0 && (
            <div className="space-y-2 pt-1">
              <span className="text-xs font-black text-slate-900 block">
                💬 Câu ví dụ ({entry.examples.length}):
              </span>
              <div className="space-y-2">
                {entry.examples.map((ex) => (
                  <div key={ex.id} className="bg-slate-50/90 p-3 rounded-2xl border border-slate-200/80 flex items-center justify-between shadow-2xs">
                    <div className="space-y-0.5">
                      <span className="text-sm font-black text-slate-900 font-sans block">{ex.chinese}</span>
                      <span className="text-xs text-emerald-700 font-extrabold block">{ex.pinyin}</span>
                      <span className="text-[11px] text-slate-600 font-medium block">👉 {ex.vietnamese}</span>
                    </div>
                    <button
                      onClick={() => handlePlayAudio(ex.audioText || ex.chinese)}
                      type="button"
                      className="w-7 h-7 rounded-full bg-white text-slate-400 hover:text-emerald-700 border border-slate-200 flex items-center justify-center cursor-pointer active:scale-90 transition-spring flex-shrink-0"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Close Action Button */}
          <div className="pt-2 sticky bottom-0 bg-white pb-1">
            <button
              onClick={onClose}
              type="button"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-2xl text-xs font-black shadow-lg cursor-pointer active:scale-95 transition-spring"
            >
              Đã hiểu & Đóng cửa sổ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
