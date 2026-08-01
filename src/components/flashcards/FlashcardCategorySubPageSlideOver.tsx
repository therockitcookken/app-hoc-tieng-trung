import React, { useState, useMemo } from 'react';
import { ArrowLeft, Search, X, Volume2, Play } from 'lucide-react';
import { FLASHCARD_CARDS_DATA } from '../../data/flashcards/flashcardCardsData';
import { FlashcardItem } from '../../types/flashcards';
import { speakChinese } from '../../utils/chineseSpeech';

export type FlashcardCategoryTab =
  | 'due'
  | 'factory'
  | 'hsk'
  | 'communication'
  | 'grammar'
  | 'pronunciation'
  | 'difficult';

interface FlashcardCategorySubPageSlideOverProps {
  isOpen: boolean;
  onClose: () => void;
  categoryTab: FlashcardCategoryTab | null;
  onStartStudy: (cards: FlashcardItem[], title: string) => void;
  showToast?: (msg: string) => void;
}

export const FlashcardCategorySubPageSlideOver: React.FC<FlashcardCategorySubPageSlideOverProps> = ({
  isOpen,
  onClose,
  categoryTab,
  onStartStudy,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const categoryMeta = useMemo(() => {
    switch (categoryTab) {
      case 'due':
        return {
          title: 'Bộ Thẻ Đến Hạn Ôn Tập Hôm Nay (SRS Algorithm)',
          subtitle: 'Thuật toán lặp lại ngắt quãng tự động gợi ý thẻ cần ôn',
          badge: '5 Thẻ đến hạn',
        };
      case 'factory':
        return {
          title: 'Bộ Thẻ Từ Vựng Công Xưởng & Sản Xuất (1200+)',
          subtitle: 'Thẻ flashcard chuyên ngành kỹ thuật, an toàn lao động, máy móc',
          badge: 'Công xưởng 1200+',
        };
      case 'hsk':
        return {
          title: 'Bộ Thẻ Từ Vựng HSK 1–6 Chuẩn Khung Quốc Tế',
          subtitle: 'Phân loại từ vựng theo từng cấp độ từ cơ bản đến cao cấp',
          badge: 'HSK 1-6',
        };
      case 'communication':
        return {
          title: 'Bộ Thẻ Giao Tiếp Đời Sống & Đi Làm',
          subtitle: 'Các câu giao tiếp mẫu phản xạ nhanh',
          badge: 'Giao tiếp',
        };
      case 'grammar':
        return {
          title: 'Bộ Thẻ Cấu Trúc Ngữ Pháp Tiếng Trung',
          subtitle: 'Ghi nhớ nhanh các công thức ngữ pháp thường gặp',
          badge: 'Ngữ pháp',
        };
      case 'pronunciation':
        return {
          title: 'Bộ Thẻ Phát Âm Pinyin & Thanh Điệu',
          subtitle: 'Flashcard phản xạ phụ âm, vận mẫu và thanh điệu',
          badge: 'Phát âm',
        };
      case 'difficult':
        return {
          title: 'Bộ Thẻ Các Từ Khó Cần Ôn Lại',
          subtitle: 'Tập trung ôn luyện các thẻ bạn từng trả lời sai',
          badge: 'Từ khó',
        };
      default:
        return {
          title: 'Chi Tiết Bộ Thẻ Flashcard',
          subtitle: 'Danh sách thẻ ghi nhớ',
          badge: 'Flashcard',
        };
    }
  }, [categoryTab]);

  const filteredCards = useMemo(() => {
    if (!categoryTab) return [];
    let baseList = FLASHCARD_CARDS_DATA;

    if (categoryTab === 'factory') {
      baseList = FLASHCARD_CARDS_DATA.filter((c) => (c.tags || []).includes('factory') || c.deckIds.includes('deck-factory-1'));
    } else if (categoryTab === 'hsk') {
      baseList = FLASHCARD_CARDS_DATA.filter((c) => (c.tags || []).some((t) => t.startsWith('hsk')));
    }

    if (!searchTerm.trim()) return baseList;
    const term = searchTerm.toLowerCase().trim();
    return baseList.filter(
      (c) =>
        (c.simplified || '').toLowerCase().includes(term) ||
        (c.pinyin || '').toLowerCase().includes(term) ||
        (c.vietnamese || '').toLowerCase().includes(term)
    );
  }, [categoryTab, searchTerm]);

  const handlePlayAudio = (text?: string) => {
    if (text) speakChinese(text, 0.85);
  };

  if (!isOpen || !categoryTab) return null;

  return (
    <div className="fixed inset-0 z-[95] w-full h-full bg-slate-950/90 backdrop-blur-2xl flex justify-center animate-fade-in select-none">
      {/* Full-Screen Sub-Page Container matching Main Screen */}
      <div className="w-full h-full bg-[#1A092B] text-slate-100 flex flex-col shadow-2xl overflow-hidden transform transition-all duration-400 ease-[cubic-bezier(0.32,0.72,0,1)]">
        {/* Top Header Navigation Bar */}
        <div className="p-4 sm:p-6 bg-[#320D54]/95 border-b border-purple-900/80 flex items-center justify-between sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              type="button"
              className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-black text-xs sm:text-sm flex items-center space-x-2 border border-white/15 transition-spring active:scale-95 cursor-pointer shadow-md"
            >
              <ArrowLeft className="w-4.5 h-4.5 stroke-[2.5]" />
              <span>Quay lại trang gốc</span>
            </button>

            <span className="eyebrow-pill bg-purple-500/20 text-purple-300 border-purple-500/30">
              {categoryMeta.badge}
            </span>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="w-10 h-10 rounded-full bg-purple-950 text-purple-300 hover:text-white flex items-center justify-center cursor-pointer transition-spring active:scale-90 border border-purple-800"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub-Page Content Area matching Main Screen footprint */}
        <div className="flex-1 overflow-y-auto max-w-6xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6 no-scrollbar pb-32">
          {/* Hero Banner */}
          <div className="bezel-outer-shell bg-gradient-to-br from-[#320D54] to-[#11041E] border-purple-900/60">
            <div className="bezel-inner-core bg-[#320D54] p-5 sm:p-6 border-purple-900/80 text-slate-100 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest bg-purple-500/20 text-purple-300 border border-purple-500/30 px-3 py-0.5 rounded-full">
                  Bộ Thẻ Flashcard Thông Minh
                </span>

                <button
                  onClick={() => onStartStudy(filteredCards, categoryMeta.title)}
                  type="button"
                  className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center space-x-1.5 shadow-lg active:scale-95 transition-spring cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-slate-950" />
                  <span>Học Ngay Bộ Này</span>
                </button>
              </div>

              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
                {categoryMeta.title}
              </h1>
              <p className="text-xs sm:text-sm text-purple-200/80 font-medium">
                {categoryMeta.subtitle}
              </p>
            </div>
          </div>

          {/* Cards Bento Grid */}
          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={`Tìm thẻ trong "${categoryMeta.title}"...`}
                className="w-full bg-[#320D54] border border-purple-800 rounded-2xl pl-10 pr-10 py-3 text-xs sm:text-sm font-semibold text-white focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-500/20 transition-spring shadow-inner"
              />
              <Search className="w-4.5 h-4.5 text-purple-400 absolute left-3.5 top-3.5" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCards.map((card) => (
                <div
                  key={card.id}
                  className="bezel-outer-shell bg-[#320D54]/90 border-purple-900/60 p-4 space-y-3 shadow-lg"
                >
                  <div className="flex items-center justify-between border-b border-purple-900/60 pb-2">
                    <span className="text-2xl font-black text-white font-sans">{card.simplified || card.frontOverride}</span>
                    <button
                      onClick={() => handlePlayAudio(card.simplified || card.frontOverride)}
                      type="button"
                      className="w-8 h-8 rounded-full bg-purple-900/80 text-purple-200 hover:text-white flex items-center justify-center cursor-pointer active:scale-90 transition-spring"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <span className="text-xs font-bold text-amber-300 block">{card.pinyin}</span>
                  <p className="text-xs text-slate-300 font-medium bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                    👉 {card.vietnamese || card.backOverride}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
