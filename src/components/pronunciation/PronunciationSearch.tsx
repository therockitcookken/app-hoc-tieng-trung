import React, { useState, useMemo } from 'react';
import { Search, Volume2, X } from 'lucide-react';
import { INITIALS_DATA } from '../../data/pronunciation/initialsData';
import { FINALS_DATA } from '../../data/pronunciation/finalsData';
import { FACTORY_PRONUNCIATION_DATA } from '../../data/pronunciation/factoryPronunciationData';
import { convertNumberedPinyinToToneMarks, removeToneMarks } from '../../utils/pinyinToneConverter';

interface PronunciationSearchProps {
  onSelectResult: (type: 'initial' | 'final' | 'factory', item: any) => void;
  showToast?: (msg: string) => void;
}

export const PronunciationSearch: React.FC<PronunciationSearchProps> = ({
  onSelectResult,
  showToast,
}) => {
  const [query, setQuery] = useState('');

  // Normalize search query
  const cleanQuery = useMemo(() => {
    return removeToneMarks(convertNumberedPinyinToToneMarks(query.trim().toLowerCase()));
  }, [query]);

  // Search Results
  const results = useMemo(() => {
    if (!cleanQuery) return { initials: [], finals: [], factoryWords: [] };

    const initials = INITIALS_DATA.filter((i) => {
      return (
        i.symbol.toLowerCase() === cleanQuery ||
        i.groupName.toLowerCase().includes(cleanQuery) ||
        i.description.toLowerCase().includes(cleanQuery)
      );
    });

    const finals = FINALS_DATA.filter((f) => {
      return (
        f.symbol.toLowerCase() === cleanQuery ||
        f.vietnameseApprox.toLowerCase().includes(cleanQuery) ||
        f.categoryName.toLowerCase().includes(cleanQuery)
      );
    });

    const factoryWords = FACTORY_PRONUNCIATION_DATA.filter((fw) => {
      const pinyinNoTone = removeToneMarks(fw.pinyin.toLowerCase());
      return (
        fw.chinese.includes(cleanQuery) ||
        pinyinNoTone.includes(cleanQuery) ||
        fw.vietnamese.toLowerCase().includes(cleanQuery)
      );
    });

    return { initials, finals, factoryWords };
  }, [cleanQuery]);

  const handlePlayAudio = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-CN';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl p-4 shadow-md border border-slate-100 space-y-3 relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <div className="flex items-center space-x-1.5">
          <Search className="w-4 h-4 text-[#EF3B32]" />
          <h2 className="text-[14px] font-extrabold text-slate-900 tracking-tight">
            Tra cứu phát âm Pinyin & Từ vựng
          </h2>
        </div>
        <span className="text-[10px] text-slate-400 font-medium">Hỗ trợ Pinyin có/không dấu & Chữ Hán</span>
      </div>

      {/* Input Field */}
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Nhập: hao, hǎo, hao3, zh, an toàn, 工厂..."
          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-9 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#EF3B32] transition-colors"
        />
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        {query && (
          <button
            onClick={() => setQuery('')}
            type="button"
            className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Search Results Display Area */}
      {query && (
        <div className="space-y-3 max-h-[280px] overflow-y-auto no-scrollbar pt-1">
          {/* Section 1: Initials */}
          {results.initials.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Phụ âm đầu ({results.initials.length})
              </span>
              <div className="grid grid-cols-2 gap-2">
                {results.initials.map((init) => (
                  <button
                    key={init.id}
                    onClick={() => {
                      onSelectResult('initial', init);
                      showToast?.(`Xem chi tiết phụ âm: ${init.symbol}`);
                    }}
                    type="button"
                    className="bg-slate-50 hover:bg-red-50 p-2 rounded-xl border border-slate-200 text-left flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <div>
                      <span className="text-sm font-extrabold text-[#EF3B32] block">
                        {init.symbol}
                      </span>
                      <span className="text-[10px] text-slate-500 truncate block max-w-[110px]">
                        {init.groupName}
                      </span>
                    </div>
                    <Volume2
                      className="w-4 h-4 text-slate-400 hover:text-[#EF3B32]"
                      onClick={(e) => handlePlayAudio(e, init.symbol)}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Section 2: Finals */}
          {results.finals.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Vận mẫu ({results.finals.length})
              </span>
              <div className="grid grid-cols-2 gap-2">
                {results.finals.map((fin) => (
                  <button
                    key={fin.id}
                    onClick={() => {
                      onSelectResult('final', fin);
                      showToast?.(`Xem chi tiết vận mẫu: ${fin.symbol}`);
                    }}
                    type="button"
                    className="bg-slate-50 hover:bg-red-50 p-2 rounded-xl border border-slate-200 text-left flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <div>
                      <span className="text-sm font-extrabold text-blue-600 block">
                        {fin.symbol}
                      </span>
                      <span className="text-[10px] text-slate-500 truncate block max-w-[110px]">
                        {fin.categoryName}
                      </span>
                    </div>
                    <Volume2
                      className="w-4 h-4 text-slate-400 hover:text-blue-600"
                      onClick={(e) => handlePlayAudio(e, fin.symbol)}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Section 3: Factory Vocabulary */}
          {results.factoryWords.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider block">
                Từ vựng Công xưởng ({results.factoryWords.length})
              </span>
              <div className="space-y-1.5">
                {results.factoryWords.map((fw) => (
                  <button
                    key={fw.id}
                    onClick={() => {
                      onSelectResult('factory', fw);
                      showToast?.(`Xem từ công xưởng: ${fw.chinese}`);
                    }}
                    type="button"
                    className="w-full bg-amber-50/70 hover:bg-amber-100/80 p-2.5 rounded-xl border border-amber-200 text-left flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-base font-extrabold text-slate-900 font-serif">
                        {fw.chinese}
                      </span>
                      <div>
                        <span className="text-xs font-bold text-amber-800 block">
                          {fw.pinyin}
                        </span>
                        <span className="text-[10.5px] text-slate-600 block">
                          {fw.vietnamese}
                        </span>
                      </div>
                    </div>
                    <Volume2
                      className="w-4 h-4 text-amber-700 hover:scale-110"
                      onClick={(e) => handlePlayAudio(e, fw.audioText)}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Empty Search Result */}
          {results.initials.length === 0 &&
            results.finals.length === 0 &&
            results.factoryWords.length === 0 && (
              <div className="text-center py-6 text-slate-400 text-xs">
                Không tìm thấy kết quả phù hợp cho "{query}". Thử tìm với Pinyin không dấu!
              </div>
            )}
        </div>
      )}
    </div>
  );
};
