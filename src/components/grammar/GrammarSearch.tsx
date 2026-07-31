import React, { useState, useMemo } from 'react';
import { Search, X, BookOpen } from 'lucide-react';
import { GRAMMAR_POINTS_DATA } from '../../data/grammar/grammarPointsData';
import { GrammarPoint } from '../../types/grammar';

interface GrammarSearchProps {
  onSelectGrammarPoint: (point: GrammarPoint) => void;
  showToast?: (msg: string) => void;
}

export const GrammarSearch: React.FC<GrammarSearchProps> = ({
  onSelectGrammarPoint,
  showToast,
}) => {
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.trim().toLowerCase();

    return GRAMMAR_POINTS_DATA.filter((gp) => {
      return (
        gp.titleVietnamese.toLowerCase().includes(q) ||
        gp.titleChinese.includes(q) ||
        gp.slug.includes(q) ||
        gp.category.toLowerCase().includes(q) ||
        gp.summary.toLowerCase().includes(q) ||
        gp.hskLevel.toLowerCase().includes(q)
      );
    });
  }, [query]);

  return (
    <div className="w-full bg-white rounded-2xl p-4 shadow-md border border-slate-100 space-y-3 relative overflow-hidden select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <div className="flex items-center space-x-1.5">
          <Search className="w-4 h-4 text-[#1545A5]" />
          <h2 className="text-[14px] font-extrabold text-slate-900 tracking-tight">
            Tra cứu Chủ điểm Ngữ pháp HSK & Công Xưởng
          </h2>
        </div>
        <span className="text-[10px] text-slate-400 font-medium">Hỗ trợ HSK 1-6</span>
      </div>

      {/* Input */}
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Nhập: 把, 被, câu so sánh, 了, công xưởng, HSK 3..."
          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-9 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#1545A5] transition-colors"
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

      {/* Results Dropdown List */}
      {query && (
        <div className="space-y-1.5 max-h-[260px] overflow-y-auto no-scrollbar pt-1">
          {searchResults.length > 0 ? (
            searchResults.map((gp) => (
              <button
                key={gp.id}
                onClick={() => {
                  onSelectGrammarPoint(gp);
                  showToast?.(`Mở chủ điểm: ${gp.titleVietnamese}`);
                }}
                type="button"
                className="w-full bg-slate-50 hover:bg-blue-50 p-2.5 rounded-xl border border-slate-200 text-left flex items-center justify-between cursor-pointer transition-colors"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-black text-blue-900 font-serif">
                      {gp.titleChinese}
                    </span>
                    <span className="text-[9.5px] font-bold bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded">
                      {gp.hskLevel}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-slate-800 block">
                    {gp.titleVietnamese}
                  </span>
                  <span className="text-[10px] text-slate-500 block truncate max-w-[280px]">
                    {gp.summary}
                  </span>
                </div>

                <BookOpen className="w-4 h-4 text-slate-400 flex-shrink-0" />
              </button>
            ))
          ) : (
            <div className="text-center py-4 text-xs text-slate-400">
              Không tìm thấy ngữ pháp phù hợp cho "{query}".
            </div>
          )}
        </div>
      )}
    </div>
  );
};
