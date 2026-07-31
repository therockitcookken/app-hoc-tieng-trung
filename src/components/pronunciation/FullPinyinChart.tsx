import React, { useState, useMemo } from 'react';
import { Search, Volume2, Sparkles, Briefcase } from 'lucide-react';
import { INITIALS_DATA } from '../../data/pronunciation/initialsData';
import { FINALS_DATA } from '../../data/pronunciation/finalsData';
import { VALID_MANDARIN_SYLLABLES, PinyinSyllable } from '../../data/pronunciation/syllablesData';

interface FullPinyinChartProps {
  onSelectSyllable: (syllable: PinyinSyllable) => void;
  showToast?: (msg: string) => void;
}

export const FullPinyinChart: React.FC<FullPinyinChartProps> = ({
  onSelectSyllable,
  showToast,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterGroup, setFilterGroup] = useState<string>('all');
  const [onlyFactory, setOnlyFactory] = useState(false);

  // Play audio sample
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

  // Filtered valid syllables set for ultra-fast lookup
  const syllablesMap = useMemo(() => {
    const map = new Map<string, PinyinSyllable>();
    VALID_MANDARIN_SYLLABLES.forEach((syl) => {
      map.set(`${syl.initial}_${syl.final}`, syl);
    });
    return map;
  }, []);

  // Filtered list according to search & chips
  const filteredInitials = useMemo(() => {
    if (filterGroup === 'all') return INITIALS_DATA;
    return INITIALS_DATA.filter((i) => i.articulationGroup === filterGroup);
  }, [filterGroup]);

  return (
    <div className="w-full bg-white rounded-2xl p-3.5 shadow-md border border-slate-100 relative overflow-hidden space-y-3">
      {/* Chart Title Bar */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <div className="flex items-center space-x-1.5">
          <Sparkles className="w-4 h-4 text-[#EF3B32]" />
          <h2 className="text-[14px] font-extrabold text-slate-900 tracking-tight">
            Bảng Hán ngữ Pinyin Phổ thông Chuẩn
          </h2>
        </div>
        <span className="text-[10px] bg-red-50 text-[#EF3B32] px-2 py-0.5 rounded-full font-bold">
          ~400 Âm tiết chuẩn
        </span>
      </div>

      {/* Search & Filter Bar */}
      <div className="space-y-2">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tra Pinyin, ví dụ: hao, hǎo, hao3, zh, ānquán..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-[#EF3B32] transition-colors"
          />
        </div>

        {/* Filter Chips Horizontal Scroll */}
        <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-0.5">
          <button
            onClick={() => setFilterGroup('all')}
            type="button"
            className={`px-2.5 py-1 rounded-lg text-[10.5px] font-bold whitespace-nowrap transition-colors cursor-pointer ${
              filterGroup === 'all'
                ? 'bg-[#EF3B32] text-white shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Tất cả nhóm
          </button>
          <button
            onClick={() => setFilterGroup('bilabial')}
            type="button"
            className={`px-2.5 py-1 rounded-lg text-[10.5px] font-bold whitespace-nowrap transition-colors cursor-pointer ${
              filterGroup === 'bilabial'
                ? 'bg-[#EF3B32] text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Hai môi (b, p, m)
          </button>
          <button
            onClick={() => setFilterGroup('retroflex')}
            type="button"
            className={`px-2.5 py-1 rounded-lg text-[10.5px] font-bold whitespace-nowrap transition-colors cursor-pointer ${
              filterGroup === 'retroflex'
                ? 'bg-[#EF3B32] text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Cuốn lưỡi (zh, ch, sh, r)
          </button>
          <button
            onClick={() => setFilterGroup('dental')}
            type="button"
            className={`px-2.5 py-1 rounded-lg text-[10.5px] font-bold whitespace-nowrap transition-colors cursor-pointer ${
              filterGroup === 'dental'
                ? 'bg-[#EF3B32] text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Đầu lưỡi dẹt (z, c, s)
          </button>

          {/* Special Toggle Chips */}
          <button
            onClick={() => setOnlyFactory(!onlyFactory)}
            type="button"
            className={`px-2.5 py-1 rounded-lg text-[10.5px] font-bold whitespace-nowrap flex items-center space-x-1 cursor-pointer ${
              onlyFactory
                ? 'bg-amber-500 text-white'
                : 'bg-amber-50 text-amber-800 border border-amber-200'
            }`}
          >
            <Briefcase className="w-3 h-3" />
            <span>Từ Công Xưởng</span>
          </button>
        </div>
      </div>

      {/* Grid Container with Separate Scroll & Sticky Header/Column */}
      <div className="w-full max-h-[360px] overflow-auto border border-slate-200 rounded-xl relative no-scrollbar">
        <table className="w-full text-center border-collapse text-[11px]">
          {/* Header Row: Finals */}
          <thead>
            <tr className="bg-slate-100 text-slate-700 font-bold sticky top-0 z-20 shadow-xs">
              <th className="p-2 border-b border-r border-slate-200 bg-slate-200 min-w-[50px] sticky left-0 z-30">
                Phụ \ Vận
              </th>
              {FINALS_DATA.map((final) => (
                <th
                  key={final.id}
                  className="p-1.5 border-b border-r border-slate-200 min-w-[45px] bg-slate-100 font-bold text-slate-800"
                >
                  {final.symbol}
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body: Initials (Rows) x Finals (Columns) */}
          <tbody>
            {filteredInitials.map((initial) => (
              <tr key={initial.id} className="hover:bg-slate-50 transition-colors">
                {/* Sticky First Column: Initial Symbol */}
                <td className="p-1.5 border-b border-r border-slate-200 font-extrabold text-slate-900 bg-slate-100 sticky left-0 z-10 shadow-2xs">
                  {initial.symbol}
                </td>

                {/* Cells */}
                {FINALS_DATA.map((final) => {
                  const key = `${initial.symbol}_${final.symbol}`;
                  const syl = syllablesMap.get(key);

                  if (!syl) {
                    // Invalid Pinyin Combination -> Render Disabled Cell
                    return (
                      <td
                        key={final.id}
                        className="p-1 border-b border-r border-slate-100 bg-slate-50/50 text-slate-300 text-[10px] select-none"
                      >
                        -
                      </td>
                    );
                  }

                  // Valid Syllable -> Interactive Cell
                  const firstExample = syl.examples[0];
                  const hasFactory = syl.examples.some((e) => e.isFactoryWord);

                  return (
                    <td
                      key={final.id}
                      onClick={() => {
                        onSelectSyllable(syl);
                        showToast?.(`Chi tiết âm tiết: ${syl.baseSyllable}`);
                      }}
                      className={`p-1.5 border-b border-r border-slate-200 cursor-pointer active:scale-95 transition-transform relative group ${
                        hasFactory ? 'bg-amber-50/60 font-bold text-amber-900' : 'bg-white text-slate-800 hover:bg-red-50'
                      }`}
                    >
                      <div className="flex flex-col items-center justify-center">
                        <span className="font-extrabold text-[11px] text-[#EF3B32]">
                          {syl.baseSyllable}
                        </span>
                        {firstExample && (
                          <span className="text-[9px] text-slate-500 font-serif leading-none mt-0.5">
                            {firstExample.character}
                          </span>
                        )}
                      </div>

                      {/* Quick Play Audio Button on Hover */}
                      <button
                        onClick={(e) => handlePlayAudio(e, firstExample?.audioText || syl.baseSyllable)}
                        type="button"
                        className="absolute top-0.5 right-0.5 opacity-0 group-hover:opacity-100 p-0.5 text-red-500 hover:text-red-700 cursor-pointer"
                        title="Nghe âm mẫu"
                      >
                        <Volume2 className="w-3 h-3" />
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Chart Legend Footer */}
      <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
        <span className="flex items-center space-x-1">
          <span className="w-2.5 h-2.5 rounded bg-amber-100 border border-amber-300 inline-block" />
          <span>Có từ vựng công xưởng</span>
        </span>
        <span className="text-slate-400">Chạm vào ô âm tiết để xem hình cấu âm chi tiết</span>
      </div>
    </div>
  );
};
