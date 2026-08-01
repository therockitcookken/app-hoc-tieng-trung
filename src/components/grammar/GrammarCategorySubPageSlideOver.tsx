import React, { useState, useMemo } from 'react';
import { ArrowLeft, Search, X, BookOpen, AlertCircle } from 'lucide-react';
import { GRAMMAR_POINTS_DATA } from '../../data/grammar/grammarPointsData';
import { GRAMMAR_MISTAKES_DATA } from '../../data/grammar/grammarMistakesData';
import { GrammarPoint } from '../../types/grammar';
import { GrammarComparisonModule } from './GrammarComparisonModule';
import { FactoryGrammarSection } from './FactoryGrammarSection';

export type GrammarCategoryTab =
  | 'topics'
  | 'particles'
  | 'complements'
  | 'complex'
  | 'comparisons'
  | 'mistakes'
  | 'factory';

interface GrammarCategorySubPageSlideOverProps {
  isOpen: boolean;
  onClose: () => void;
  categoryTab: GrammarCategoryTab | null;
  onSelectGrammarPoint: (point: GrammarPoint) => void;
  showToast?: (msg: string) => void;
}

export const GrammarCategorySubPageSlideOver: React.FC<GrammarCategorySubPageSlideOverProps> = ({
  isOpen,
  onClose,
  categoryTab,
  onSelectGrammarPoint,
  showToast,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const categoryMeta = useMemo(() => {
    switch (categoryTab) {
      case 'topics':
        return {
          title: '300+ Chủ Điểm Ngữ Pháp HSK 1–6',
          subtitle: 'Hệ thống ngữ pháp tiếng Trung chuẩn hóa theo các cấp độ HSK',
          badge: '300+ Bài học',
          color: 'bg-blue-600',
        };
      case 'particles':
        return {
          title: 'Trợ Từ Ngữ Pháp (的 / 地 / 得 & 了 / 过 / 着)',
          subtitle: 'Phân biệt và làm chủ cách dùng các trợ từ cấu trúc & động thái',
          badge: 'Trợ từ cốt lõi',
          color: 'bg-indigo-600',
        };
      case 'complements':
        return {
          title: 'Các Loại Bổ Ngữ Tiếng Trung',
          subtitle: 'Bổ ngữ kết quả, xu hướng, khả năng, trình độ, thời lượng',
          badge: 'Bổ ngữ',
          color: 'bg-purple-600',
        };
      case 'complex':
        return {
          title: 'Cấu Trúc Phức Hợp (把, 被, 比...)',
          subtitle: 'Chuyên đề các câu đặc biệt: Câu chữ 把, Câu bị động chữ 被, Câu so sánh 比',
          badge: 'Cấu trúc đặc biệt',
          color: 'bg-amber-600',
        };
      case 'comparisons':
        return {
          title: 'So Sánh & Phân Biệt Ngữ Pháp Dễ Nhầm',
          subtitle: 'Tránh các bẫy ngữ pháp thường gặp bằng phương pháp đối chiếu trực quan',
          badge: 'Phân biệt',
          color: 'bg-emerald-600',
        };
      case 'mistakes':
        return {
          title: 'Các Lỗi Ngữ Pháp Thường Gặp & Cách Khắc Phục',
          subtitle: 'Phân tích câu sai thực tế của người Việt và hướng dẫn câu đúng chuẩn',
          badge: 'Lỗi thường gặp',
          color: 'bg-rose-600',
        };
      case 'factory':
        return {
          title: 'Ngữ Pháp Tiếng Trung Công Xưởng & Nhà Máy',
          subtitle: 'Cấu trúc chỉ thị, báo cáo quy trình sản xuất, an toàn lao động & vận hành',
          badge: 'Công xưởng 1200+',
          color: 'bg-teal-600',
        };
      default:
        return {
          title: 'Chi Tiết Chuyên Đề Ngữ Pháp',
          subtitle: 'Danh sách bài học và cấu trúc ngữ pháp',
          badge: 'Chuyên đề',
          color: 'bg-blue-600',
        };
    }
  }, [categoryTab]);

  // Filter grammar points for current sub-page category
  const filteredPoints = useMemo(() => {
    if (!categoryTab) return [];

    let baseList = GRAMMAR_POINTS_DATA;
    if (categoryTab === 'particles') {
      baseList = GRAMMAR_POINTS_DATA.filter(
        (p) => p.category.includes('Trợ từ') || p.titleVietnamese.includes('的') || p.titleChinese.includes('了')
      );
    } else if (categoryTab === 'complements') {
      baseList = GRAMMAR_POINTS_DATA.filter((p) => p.category.includes('Bổ ngữ'));
    } else if (categoryTab === 'complex') {
      baseList = GRAMMAR_POINTS_DATA.filter(
        (p) => p.category.includes('Câu đặc biệt') || p.titleChinese.includes('把') || p.titleChinese.includes('被')
      );
    }

    if (!searchTerm.trim()) return baseList;
    const term = searchTerm.toLowerCase().trim();
    return baseList.filter(
      (p) =>
        p.titleVietnamese.toLowerCase().includes(term) ||
        p.titleChinese.toLowerCase().includes(term) ||
        p.summary.toLowerCase().includes(term)
    );
  }, [categoryTab, searchTerm]);

  if (!isOpen || !categoryTab) return null;

  return (
    <div className="fixed inset-0 z-[95] w-full h-full bg-slate-950/90 backdrop-blur-2xl flex justify-center animate-fade-in select-none">
      {/* Full-Screen Sub-Page Container matching Main Screen */}
      <div className="w-full h-full bg-[#0F172A] text-slate-100 flex flex-col shadow-2xl overflow-hidden transform transition-all duration-400 ease-[cubic-bezier(0.32,0.72,0,1)]">
        {/* Top Header Navigation Bar */}
        <div className="p-4 sm:p-6 bg-slate-900/95 border-b border-slate-800 flex items-center justify-between sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              type="button"
              className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-black text-xs sm:text-sm flex items-center space-x-2 border border-white/15 transition-spring active:scale-95 cursor-pointer shadow-md"
            >
              <ArrowLeft className="w-4.5 h-4.5 stroke-[2.5]" />
              <span>Quay lại trang gốc</span>
            </button>

            <span className="eyebrow-pill bg-blue-500/20 text-blue-400 border-blue-500/30">
              {categoryMeta.badge}
            </span>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="w-10 h-10 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer transition-spring active:scale-90 border border-slate-700"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub-Page Content Area matching Main Screen footprint */}
        <div className="flex-1 overflow-y-auto max-w-6xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6 no-scrollbar pb-32">
          {/* Sub-Page Hero Banner */}
          <div className="bezel-outer-shell bg-gradient-to-br from-slate-900 to-slate-950 border-slate-800">
            <div className="bezel-inner-core bg-slate-900 p-5 sm:p-6 border-slate-800 text-slate-100 space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-black uppercase tracking-widest bg-blue-500/20 text-blue-400 border border-blue-500/30 px-3 py-0.5 rounded-full">
                  Chuyên Đề Ngữ Pháp Phổ Thông
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
                {categoryMeta.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 font-medium">
                {categoryMeta.subtitle}
              </p>
            </div>
          </div>

          {/* Special Custom Views for Comparisons or Factory or Mistakes */}
          {categoryTab === 'comparisons' && (
            <div className="bg-slate-900 rounded-3xl p-4 sm:p-6 border border-slate-800">
              <GrammarComparisonModule showToast={showToast} />
            </div>
          )}

          {categoryTab === 'factory' && (
            <div className="bg-slate-900 rounded-3xl p-4 sm:p-6 border border-slate-800">
              <FactoryGrammarSection showToast={showToast} />
            </div>
          )}

          {categoryTab === 'mistakes' && (
            <div className="space-y-4">
              <h2 className="text-base font-black text-white flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-rose-400" />
                <span>Phân Tích Các Lỗi Ngữ Pháp Thường Gặp Của Người Việt</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {GRAMMAR_MISTAKES_DATA.map((item) => (
                  <div
                    key={item.id}
                    className="bezel-outer-shell bg-rose-950/20 border-rose-900/40 p-1.5"
                  >
                    <div className="bezel-inner-core bg-slate-900 p-4 border-slate-800 text-slate-100 space-y-2">
                      <span className="text-[10px] font-black text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded-full border border-rose-500/20">
                        ❌ {item.relatedPointTitle}
                      </span>
                      <p className="text-xs font-bold text-rose-300">
                        Lỗi sai: <span className="line-through text-slate-400">{item.wrongSentence}</span>
                      </p>
                      <p className="text-xs font-black text-emerald-400">
                        Đúng chuẩn: <span>{item.correctSentence}</span>
                      </p>
                      <p className="text-xs text-slate-300 font-medium">
                        💡 {item.explanation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* General Grammar Points Grid for Topics, Particles, Complements, Complex */}
          {['topics', 'particles', 'complements', 'complex'].includes(categoryTab) && (
            <div className="space-y-4">
              {/* Search Bar for Sub-Page */}
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={`Tìm bài học trong "${categoryMeta.title}"...`}
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-2xl pl-10 pr-10 py-3 text-xs sm:text-sm font-semibold text-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-spring shadow-inner"
                />
                <Search className="w-4.5 h-4.5 text-slate-400 absolute left-3.5 top-3.5" />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    type="button"
                    className="w-6 h-6 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center absolute right-3 top-3.5 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Bento Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPoints.map((gp) => (
                  <div
                    key={gp.id}
                    onClick={() => {
                      onSelectGrammarPoint(gp);
                      showToast?.(`Chi tiết: ${gp.titleVietnamese}`);
                    }}
                    className="bezel-outer-shell bg-slate-900/90 border-slate-800 cursor-pointer hover:border-blue-500/50 transition-spring group shadow-lg"
                  >
                    <div className="bezel-inner-core bg-slate-900 p-4 border-slate-800 text-slate-100 space-y-2.5 h-full flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black bg-blue-600 text-white px-2.5 py-0.5 rounded-full shadow-2xs">
                            {gp.hskLevel}
                          </span>
                          <span className="text-[10.5px] text-blue-400 font-extrabold">{gp.category}</span>
                        </div>
                        <h3 className="text-sm font-black text-white group-hover:text-blue-400 transition-colors">
                          {gp.titleVietnamese}
                        </h3>
                        <p className="text-xs font-mono font-bold text-blue-300 bg-slate-950 p-2 rounded-xl border border-slate-800">
                          {gp.formulas[0]?.pattern || gp.affirmativePattern}
                        </p>
                        <p className="text-xs text-slate-400 font-medium line-clamp-2 leading-relaxed">
                          {gp.summary}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] font-extrabold text-blue-400">
                        <span className="flex items-center space-x-1">
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Xem chi tiết</span>
                        </span>
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
