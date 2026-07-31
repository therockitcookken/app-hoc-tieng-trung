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
    <div className="w-full bg-white rounded-2xl p-4 shadow-md border border-slate-100 space-y-3 relative overflow-hidden select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <div className="flex items-center space-x-1.5">
          <Search className="w-4 h-4 text-emerald-600" />
          <h2 className="text-[14px] font-extrabold text-slate-900 tracking-tight">
            Tra cứu Từ điển Tiếng Trung & Công Xưởng
          </h2>
        </div>
        <span className="text-[10px] text-slate-400 font-medium">Hán tự, Pinyin & Tiếng Việt</span>
      </div>

      {/* Input */}
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Nhập: 工厂, gongchang, gong1chang3, nhà máy, an toàn..."
          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-9 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-600 transition-colors"
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

      {/* Dropdown Results */}
      {query && (
        <div className="space-y-1.5 max-h-[260px] overflow-y-auto no-scrollbar pt-1">
          {searchResults.length > 0 ? (
            searchResults.map((entry) => (
              <button
                key={entry.id}
                onClick={() => {
                  onSelectEntry(entry);
                  showToast?.(`Chi tiết từ: ${entry.simplified}`);
                }}
                type="button"
                className="w-full bg-slate-50 hover:bg-emerald-50 p-2.5 rounded-xl border border-slate-200 text-left flex items-center justify-between cursor-pointer transition-colors"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <span className="text-base font-black text-slate-900 font-serif">
                      {entry.simplified}
                    </span>
                    <span className="text-xs font-bold text-emerald-700">
                      {entry.pinyin}
                    </span>
                    <span className="text-[9.5px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded">
                      {entry.hskLevel}
                    </span>
                  </div>
                  <span className="text-xs font-medium text-slate-600 block">
                    👉 {entry.senses[0]?.shortDefinition || entry.senses[0]?.vietnameseDefinition}
                  </span>
                </div>

                <Volume2
                  className="w-4 h-4 text-slate-400 hover:text-emerald-600"
                  onClick={(e) => handlePlayAudio(e, entry.audioText || entry.simplified)}
                />
              </button>
            ))
          ) : (
            <div className="text-center py-4 text-xs text-slate-400">
              Không tìm thấy từ phù hợp cho "{query}". Thử gõ Pinyin không dấu!
            </div>
          )}
        </div>
      )}
    </div>
  );
};
