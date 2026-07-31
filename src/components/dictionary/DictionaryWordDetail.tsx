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
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in select-none">
      <div className="bg-white rounded-t-[28px] sm:rounded-2xl p-5 w-full max-w-[390px] max-h-[90vh] overflow-y-auto no-scrollbar shadow-2xl space-y-4 relative border border-slate-200">
        {/* Close Button Top Right */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Word Title Header */}
        <div className="flex items-center space-x-3">
          <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-extrabold text-3xl shadow-md font-serif flex-shrink-0">
            {entry.simplified}
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-sm font-black text-emerald-700">
                {entry.pinyin}
              </span>
              <span className="text-[9.5px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                {entry.hskLevel}
              </span>
            </div>
            <span className="text-xs text-slate-500 font-medium block">
              Từ loại: {entry.partOfSpeech}
            </span>
            {entry.traditional && (
              <span className="text-[10px] text-slate-400 block">
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
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-xl text-xs font-bold shadow-md active:scale-95 transition-transform flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <Volume2 className="w-4 h-4" />
            <span>Nghe phát âm</span>
          </button>
          <button
            onClick={() => showToast?.(`Đã thêm từ "${entry.simplified}" vào bộ Flashcard!`)}
            type="button"
            className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-2 rounded-xl text-xs font-bold flex items-center space-x-1 active:scale-95 transition-transform cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Thêm Flashcard</span>
          </button>
        </div>

        {/* Senses / Definitions */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-900 block">
            📚 Các nghĩa của từ ({entry.senses.length}):
          </span>
          {entry.senses.map((sense, idx) => (
            <div key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
              <span className="text-xs font-extrabold text-slate-900 block">
                {idx + 1}. {sense.vietnameseDefinition}
              </span>
              {sense.measureWords && sense.measureWords.length > 0 && (
                <span className="text-[10.5px] text-emerald-700 block font-medium">
                  • Lượng từ thường dùng: {sense.measureWords.join(', ')}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Collocations */}
        {entry.collocations && entry.collocations.length > 0 && (
          <div className="space-y-1.5 pt-1">
            <span className="text-xs font-bold text-slate-900 block">
              🔗 Cụm từ thường đi kèm ({entry.collocations.length}):
            </span>
            <div className="space-y-1">
              {entry.collocations.map((col, idx) => (
                <div key={idx} className="bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-100 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900 font-serif text-xs block">{col.phraseChinese}</span>
                    <span className="text-[10px] text-emerald-800 block">{col.phrasePinyin}</span>
                    <span className="text-[10.5px] text-slate-600 block">{col.phraseVietnamese}</span>
                  </div>
                  <button
                    onClick={() => handlePlayAudio(col.phraseChinese)}
                    type="button"
                    className="text-emerald-700 p-1 cursor-pointer"
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
            <span className="text-xs font-bold text-slate-900 block">
              💬 Câu ví dụ ({entry.examples.length}):
            </span>
            <div className="space-y-1.5">
              {entry.examples.map((ex) => (
                <div key={ex.id} className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-sm font-black text-slate-900 font-serif block">{ex.chinese}</span>
                    <span className="text-[11px] text-emerald-700 font-bold block">{ex.pinyin}</span>
                    <span className="text-[10.5px] text-slate-600 block">👉 {ex.vietnamese}</span>
                  </div>
                  <button
                    onClick={() => handlePlayAudio(ex.audioText || ex.chinese)}
                    type="button"
                    className="text-slate-400 hover:text-emerald-600 p-1 cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="w-full bg-slate-900 hover:bg-slate-800 text-white py-2.5 rounded-xl text-xs font-bold shadow-md cursor-pointer active:scale-95 transition-transform"
        >
          Đóng cửa sổ
        </button>
      </div>
    </div>
  );
};
