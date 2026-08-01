import React, { useState, useMemo } from 'react';
import { ArrowLeft, Search, X, Volume2, Sparkles } from 'lucide-react';
import { DICTIONARY_ENTRIES_DATA } from '../../data/dictionary/dictionaryEntriesData';
import { CONFUSING_WORDS_DATA } from '../../data/dictionary/confusingWordsData';
import { EssentialCommunicationSection } from './EssentialCommunicationSection';
import { DictionaryEntry } from '../../types/dictionary';
import { speakChinese } from '../../utils/chineseSpeech';

export type DictionaryCategoryTab =
  | 'communication'
  | 'factory'
  | 'hsk1'
  | 'hsk2'
  | 'hsk3'
  | 'hsk4'
  | 'hsk5'
  | 'hsk6'
  | 'confusing';

interface DictionaryCategorySubPageSlideOverProps {
  isOpen: boolean;
  onClose: () => void;
  categoryTab: DictionaryCategoryTab | null;
  onSelectEntry: (entry: DictionaryEntry) => void;
  showToast?: (msg: string) => void;
}

export const DictionaryCategorySubPageSlideOver: React.FC<DictionaryCategorySubPageSlideOverProps> = ({
  isOpen,
  onClose,
  categoryTab,
  onSelectEntry,
  showToast,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const categoryMeta = useMemo(() => {
    switch (categoryTab) {
      case 'communication':
        return {
          title: 'Giao Tiếp Thiết Yếu & Mẫu Câu Thực Tế',
          subtitle: 'Bộ mẫu câu giao tiếp đời sống, xin việc, phỏng vấn, nhà hàng & du lịch',
          badge: 'Giao tiếp 100%',
          color: 'bg-emerald-600',
        };
      case 'factory':
        return {
          title: 'Từ Vựng Tiếng Trung Công Xưởng (1200+ Từ)',
          subtitle: 'Chuyên ngành sản xuất, kỹ thuật, máy móc, kiểm hàng, kho vận & an toàn',
          badge: 'Công xưởng 1200+',
          color: 'bg-amber-600',
        };
      case 'hsk1':
      case 'hsk2':
      case 'hsk3':
      case 'hsk4':
      case 'hsk5':
      case 'hsk6':
        const num = categoryTab.replace('hsk', '').toUpperCase();
        return {
          title: `Bộ Từ Vựng Chuẩn HSK ${num}`,
          subtitle: `Toàn bộ từ vựng cốt lõi chuẩn khung HSK ${num} dành cho người học Hán ngữ`,
          badge: `Cấp độ HSK ${num}`,
          color: 'bg-teal-600',
        };
      case 'confusing':
        return {
          title: 'Các Cặp Từ Vựng Dễ Nhầm Lẫn Trong Tiếng Trung',
          subtitle: 'Phân biệt sắc thái ý nghĩa và ngữ cảnh sử dụng chuẩn xác',
          badge: 'Phân biệt từ',
          color: 'bg-rose-600',
        };
      default:
        return {
          title: 'Chi Tiết Danh Mục Từ Vựng',
          subtitle: 'Danh sách từ vựng theo chủ đề',
          badge: 'Danh mục',
          color: 'bg-emerald-600',
        };
    }
  }, [categoryTab]);

  // Filter dictionary entries for current sub-page category
  const filteredEntries = useMemo(() => {
    if (!categoryTab) return [];

    let baseList = DICTIONARY_ENTRIES_DATA;
    if (categoryTab === 'factory') {
      baseList = DICTIONARY_ENTRIES_DATA.filter((e) => e.isFactoryVocabulary || e.isWorkplace);
    } else if (categoryTab.startsWith('hsk')) {
      const levelNum = categoryTab.replace('hsk', '');
      baseList = DICTIONARY_ENTRIES_DATA.filter((e) => e.hskLevel === `HSK ${levelNum}`);
    }

    if (!searchTerm.trim()) return baseList;
    const term = searchTerm.toLowerCase().trim();
    return baseList.filter(
      (e) =>
        e.simplified.toLowerCase().includes(term) ||
        e.pinyin.toLowerCase().includes(term) ||
        e.senses.some((s) => s.vietnameseDefinition.toLowerCase().includes(term))
    );
  }, [categoryTab, searchTerm]);

  const handlePlayAudio = (text: string) => {
    speakChinese(text, 0.85);
  };

  if (!isOpen || !categoryTab) return null;

  return (
    <div className="fixed inset-0 z-[95] bg-slate-950/80 backdrop-blur-xl flex justify-end animate-fade-in select-none">
      {/* Slide-Over Panel Container */}
      <div className="w-full max-w-4xl h-full bg-[#061A12] text-slate-100 flex flex-col shadow-2xl border-l border-emerald-900/60 overflow-hidden transform transition-all duration-400 ease-[cubic-bezier(0.32,0.72,0,1)]">
        {/* Top Header Navigation Bar */}
        <div className="p-4 sm:p-6 bg-[#0B291D]/90 border-b border-emerald-900/80 flex items-center justify-between sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              type="button"
              className="px-3.5 py-2 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs flex items-center space-x-2 border border-white/15 transition-spring active:scale-95 cursor-pointer shadow-md"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
              <span>Quay lại trang gốc</span>
            </button>

            <span className="eyebrow-pill bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hidden sm:inline-flex">
              {categoryMeta.badge}
            </span>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="w-9 h-9 rounded-full bg-emerald-950 text-emerald-300 hover:text-white flex items-center justify-center cursor-pointer transition-spring active:scale-90 border border-emerald-800"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub-Page Content Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 no-scrollbar pb-28">
          {/* Sub-Page Hero Banner */}
          <div className="bezel-outer-shell bg-gradient-to-br from-[#0B291D] to-[#04120C] border-emerald-900/60">
            <div className="bezel-inner-core bg-[#0B291D] p-5 sm:p-6 border-emerald-900/80 text-slate-100 space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-black uppercase tracking-widest bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-0.5 rounded-full">
                  Từ Điển Chuyên Sâu
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
                {categoryMeta.title}
              </h1>
              <p className="text-xs sm:text-sm text-emerald-200/80 font-medium">
                {categoryMeta.subtitle}
              </p>
            </div>
          </div>

          {/* Special Custom View for Essential Communication */}
          {categoryTab === 'communication' && (
            <div className="bg-[#0B291D] rounded-3xl p-4 sm:p-6 border border-emerald-900/80">
              <EssentialCommunicationSection showToast={showToast} />
            </div>
          )}

          {/* Special Custom View for Confusing Words */}
          {categoryTab === 'confusing' && (
            <div className="space-y-4">
              <h2 className="text-base font-black text-white flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>Phân Biệt Các Cặp Từ Dễ Nhầm Lẫn Trong Tiếng Trung</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {CONFUSING_WORDS_DATA.map((item) => (
                  <div
                    key={item.id}
                    className="bezel-outer-shell bg-emerald-950/40 border-emerald-900/50 p-1.5"
                  >
                    <div className="bezel-inner-core bg-[#0B291D] p-4 border-emerald-900/80 text-slate-100 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black text-amber-300 bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                          {item.wordA} vs {item.wordB}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                        <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 space-y-1">
                          <span className="font-black text-emerald-400 text-base block">{item.wordA}</span>
                          <span className="text-[10.5px] text-amber-300 font-bold block">{item.pinyinA}</span>
                          <span className="text-[10.5px] text-slate-300 block">{item.exampleA}</span>
                        </div>

                        <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 space-y-1">
                          <span className="font-black text-emerald-400 text-base block">{item.wordB}</span>
                          <span className="text-[10.5px] text-amber-300 font-bold block">{item.pinyinB}</span>
                          <span className="text-[10.5px] text-slate-300 block">{item.exampleB}</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-300 font-medium pt-1">
                        💡 <strong>Khác biệt:</strong> {item.differenceSummary}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* General Dictionary Words Grid for Factory & HSK 1-6 */}
          {['factory', 'hsk1', 'hsk2', 'hsk3', 'hsk4', 'hsk5', 'hsk6'].includes(categoryTab) && (
            <div className="space-y-4">
              {/* Search Bar for Sub-Page */}
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={`Tìm từ vựng trong "${categoryMeta.title}"...`}
                  className="w-full bg-[#0B291D] border border-emerald-800 rounded-2xl pl-10 pr-10 py-3 text-xs sm:text-sm font-semibold text-white focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/20 transition-spring shadow-inner"
                />
                <Search className="w-4.5 h-4.5 text-emerald-400 absolute left-3.5 top-3.5" />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    type="button"
                    className="w-6 h-6 rounded-full bg-emerald-900 text-emerald-300 hover:text-white flex items-center justify-center absolute right-3 top-3.5 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Bento Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredEntries.map((entry) => (
                  <div
                    key={entry.id}
                    onClick={() => {
                      onSelectEntry(entry);
                      showToast?.(`Chi tiết từ: ${entry.simplified}`);
                    }}
                    className="bezel-outer-shell bg-[#0B291D]/90 border-emerald-900/60 cursor-pointer hover:border-emerald-400/60 transition-spring group shadow-lg"
                  >
                    <div className="bezel-inner-core bg-[#0B291D] p-4 border-emerald-900/80 text-slate-100 space-y-2.5 h-full flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black bg-emerald-600 text-white px-2.5 py-0.5 rounded-full shadow-2xs">
                            {entry.hskLevel}
                          </span>
                          <span className="text-[10.5px] text-emerald-400 font-extrabold">{entry.partOfSpeech}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-black text-white group-hover:text-emerald-300 transition-colors font-sans">
                            {entry.simplified}
                          </span>
                          <span className="text-xs font-extrabold text-amber-300">
                            {entry.pinyin}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 font-medium leading-relaxed bg-slate-900/80 p-2 rounded-xl border border-slate-800">
                          👉 {entry.senses[0]?.vietnameseDefinition}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-emerald-900/80 flex items-center justify-between text-[11px] font-extrabold text-emerald-400">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePlayAudio(entry.simplified);
                          }}
                          type="button"
                          className="flex items-center space-x-1 hover:text-white cursor-pointer"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>Nghe phát âm</span>
                        </button>
                        <span className="text-slate-500 group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
