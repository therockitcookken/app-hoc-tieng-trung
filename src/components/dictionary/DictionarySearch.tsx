import React, { useState, useMemo } from 'react';
import { Search, X, Volume2 } from 'lucide-react';
import { DICTIONARY_ENTRIES_DATA } from '../../data/dictionary/dictionaryEntriesData';
import { normalizePinyin } from '../../utils/pinyinNormalizer';
import { DictionaryEntry } from '../../types/dictionary';

import { speakChinese } from '../../utils/chineseSpeech';

interface DictionarySearchProps {
  onSelectEntry: (entry: DictionaryEntry) => void;
  showToast?: (msg: string) => void;
}

export const DictionarySearch: React.FC<DictionarySearchProps> = ({
  onSelectEntry,
  showToast,
}) => {
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const norm = normalizePinyin(query);

    return DICTIONARY_ENTRIES_DATA.filter((entry) => {
      const matchSimplified = entry.simplified.includes(query.trim());
      const matchPinyin = entry.normalizedPinyin.includes(norm) || entry.pinyin.toLowerCase().includes(norm);
      const matchVietnamese = entry.senses.some((s) => s.vietnameseDefinition.toLowerCase().includes(norm));

      return matchSimplified || matchPinyin || matchVietnamese;
    });
  }, [query]);

  const handlePlayAudio = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    speakChinese(text, 0.85);
  };

  return (
    <div className="w-full bg-white/95 rounded-[2rem] p-1.5 shadow-2xl border border-slate-200/80 relative overflow-hidden select-none">
      <div className="bg-white rounded-[calc(2rem-0.375rem)] p-4 sm:p-5 border border-slate-100 space-y-3.5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
          <div className="flex items-center space-x-2">
            <span className="eyebrow-pill bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
              Tra Cứu Thông Minh
            </span>
            <h2 className="text-[14px] font-black text-slate-900 tracking-tight">
              Từ điển Hán ngữ & Công xưởng
            </h2>
          </div>
          <span className="text-[10px] text-slate-400 font-extrabold">2,000+ từ vựng</span>
        </div>

        {/* Double-Bezel Input Box */}
        <div className="relative group">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Nhập: 工厂, gongchang, gong1chang3, nhà máy, an toàn..."
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-10 py-3 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/15 transition-spring shadow-inner"
          />
          <Search className="w-4.5 h-4.5 text-slate-400 absolute left-3.5 top-3.5 transition-colors group-focus-within:text-emerald-600" />
          {query && (
            <button
              onClick={() => setQuery('')}
              type="button"
              className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 hover:bg-slate-300 flex items-center justify-center absolute right-3 top-3.5 cursor-pointer transition-spring active:scale-90"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Dropdown Results */}
        {query && (
          <div className="space-y-2 max-h-[280px] overflow-y-auto no-scrollbar pt-1">
            {searchResults.length > 0 ? (
              searchResults.map((entry) => (
                <button
                  key={entry.id}
                  onClick={() => {
                    onSelectEntry(entry);
                    showToast?.(`Chi tiết từ: ${entry.simplified}`);
                  }}
                  type="button"
                  className="w-full bg-slate-50/90 hover:bg-emerald-50/90 p-3 rounded-2xl border border-slate-200/80 hover:border-emerald-300 text-left flex items-center justify-between cursor-pointer transition-spring shadow-2xs group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-black text-slate-900 font-sans group-hover:text-emerald-700 transition-colors">
                        {entry.simplified}
                      </span>
                      <span className="text-xs font-extrabold text-emerald-600">
                        {entry.pinyin}
                      </span>
                      <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                        {entry.hskLevel}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-slate-600 block">
                      👉 {entry.senses[0]?.shortDefinition || entry.senses[0]?.vietnameseDefinition}
                    </span>
                  </div>

                  <button
                    onClick={(e) => handlePlayAudio(e, entry.simplified)}
                    type="button"
                    className="w-8 h-8 rounded-full bg-white text-emerald-600 border border-slate-200 flex items-center justify-center hover:bg-emerald-100 cursor-pointer active:scale-90 transition-spring flex-shrink-0"
                    aria-label="Nghe"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </button>
              ))
            ) : (
              <div className="p-4 text-center text-xs font-bold text-slate-400 bg-slate-50 rounded-2xl">
                Không tìm thấy từ vựng khớp với "{query}"
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
