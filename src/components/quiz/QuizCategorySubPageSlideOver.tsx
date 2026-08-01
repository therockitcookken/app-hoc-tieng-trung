import React, { useState, useMemo } from 'react';
import { ArrowLeft, Search, X, Play } from 'lucide-react';
import { QUIZ_QUESTIONS_DATA } from '../../data/quiz/quizQuestionsData';
import { QuizQuestion } from '../../types/quiz';

export type QuizCategoryTab =
  | 'modes'
  | 'hsk'
  | 'factory'
  | 'listening'
  | 'reading'
  | 'grammar'
  | 'challenge';

interface QuizCategorySubPageSlideOverProps {
  isOpen: boolean;
  onClose: () => void;
  categoryTab: QuizCategoryTab | null;
  onStartQuiz: (questions: QuizQuestion[], title: string) => void;
  showToast?: (msg: string) => void;
}

export const QuizCategorySubPageSlideOver: React.FC<QuizCategorySubPageSlideOverProps> = ({
  isOpen,
  onClose,
  categoryTab,
  onStartQuiz,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const categoryMeta = useMemo(() => {
    switch (categoryTab) {
      case 'modes':
        return {
          title: 'Các Chế Độ Kiểm Tra & Trắc Nghiệm',
          subtitle: 'Luyện tập trắc nghiệm 10 câu, 20 câu, tính thời gian & thách đấu',
          badge: 'Chế độ thi',
        };
      case 'hsk':
        return {
          title: 'Đề Thi Trắc Nghiệm HSK 1–6 Chuẩn Mẫu',
          subtitle: 'Đề thi trắc nghiệm từ vựng, đọc hiểu & ngữ pháp HSK quốc tế',
          badge: 'HSK 1-6',
        };
      case 'factory':
        return {
          title: 'Trắc Nghiệm Ngữ Pháp & Từ Vựng Công Xưởng',
          subtitle: 'Kiểm tra phản xạ câu chỉ thị sản xuất, an toàn lao động & vận hành',
          badge: 'Công xưởng 1200+',
        };
      case 'listening':
        return {
          title: 'Trắc Nghiệm Kỹ Năng Nghe Hiểu (Listening)',
          subtitle: 'Nghe phát âm chuẩn Mandarin và chọn đáp án chính xác',
          badge: 'Luyện nghe',
        };
      case 'reading':
        return {
          title: 'Trắc Nghiệm Kỹ Năng Đọc Hiểu (Reading)',
          subtitle: 'Đọc đoạn văn Hán ngữ và trả lời câu hỏi',
          badge: 'Luyện đọc',
        };
      case 'grammar':
        return {
          title: 'Trắc Nghiệm Chuyên Đề Ngữ Pháp',
          subtitle: 'Điền từ vào chỗ trống và chọn mẫu câu đúng',
          badge: 'Ngữ pháp',
        };
      case 'challenge':
        return {
          title: 'Thách Đấu Trí Nhớ & Đua Top BXH',
          subtitle: 'Trả lời đúng liên tục không giới hạn để ghi danh BXH',
          badge: 'Thách đấu',
        };
      default:
        return {
          title: 'Chi Tiết Chế Độ Kiểm Tra',
          subtitle: 'Danh sách bài trắc nghiệm',
          badge: 'Trắc nghiệm',
        };
    }
  }, [categoryTab]);

  const filteredQuestions = useMemo(() => {
    if (!categoryTab) return [];
    let baseList = QUIZ_QUESTIONS_DATA;

    if (categoryTab === 'factory') {
      baseList = QUIZ_QUESTIONS_DATA.filter((q) => q.isFactoryQuestion || q.category === 'Công xưởng & Nhà máy');
    } else if (categoryTab === 'hsk') {
      baseList = QUIZ_QUESTIONS_DATA.filter((q) => q.hskLevel);
    }

    if (!searchTerm.trim()) return baseList;
    const term = searchTerm.toLowerCase().trim();
    return baseList.filter(
      (q) =>
        q.questionVietnamese.toLowerCase().includes(term) ||
        q.questionChinese.toLowerCase().includes(term) ||
        q.explanation.toLowerCase().includes(term)
    );
  }, [categoryTab, searchTerm]);

  if (!isOpen || !categoryTab) return null;

  return (
    <div className="fixed inset-0 z-[95] w-full h-full bg-slate-950/90 backdrop-blur-2xl flex justify-center animate-fade-in select-none">
      {/* Full-Screen Sub-Page Container matching Main Screen */}
      <div className="w-full h-full bg-[#200A38] text-slate-100 flex flex-col shadow-2xl overflow-hidden transform transition-all duration-400 ease-[cubic-bezier(0.32,0.72,0,1)]">
        {/* Top Header Navigation Bar */}
        <div className="p-4 sm:p-6 bg-[#3B1263]/95 border-b border-violet-900/80 flex items-center justify-between sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              type="button"
              className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-black text-xs sm:text-sm flex items-center space-x-2 border border-white/15 transition-spring active:scale-95 cursor-pointer shadow-md"
            >
              <ArrowLeft className="w-4.5 h-4.5 stroke-[2.5]" />
              <span>Quay lại trang gốc</span>
            </button>

            <span className="eyebrow-pill bg-violet-500/20 text-violet-300 border-violet-500/30">
              {categoryMeta.badge}
            </span>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="w-10 h-10 rounded-full bg-violet-950 text-violet-300 hover:text-white flex items-center justify-center cursor-pointer transition-spring active:scale-90 border border-violet-800"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub-Page Content Area matching Main Screen footprint */}
        <div className="flex-1 overflow-y-auto max-w-6xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6 no-scrollbar pb-32">
          {/* Hero Banner */}
          <div className="bezel-outer-shell bg-gradient-to-br from-[#3B1263] to-[#140624] border-violet-900/60">
            <div className="bezel-inner-core bg-[#3B1263] p-5 sm:p-6 border-violet-900/80 text-slate-100 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest bg-violet-500/20 text-violet-300 border border-violet-500/30 px-3 py-0.5 rounded-full">
                  Đề Thi Trắc Nghiệm Thông Minh
                </span>

                <button
                  onClick={() => onStartQuiz(filteredQuestions, categoryMeta.title)}
                  type="button"
                  className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center space-x-1.5 shadow-lg active:scale-95 transition-spring cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-slate-950" />
                  <span>Bắt Đầu Thi Ngay</span>
                </button>
              </div>

              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
                {categoryMeta.title}
              </h1>
              <p className="text-xs sm:text-sm text-violet-200/80 font-medium">
                {categoryMeta.subtitle}
              </p>
            </div>
          </div>

          {/* Bento Grid */}
          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={`Tìm câu hỏi trong "${categoryMeta.title}"...`}
                className="w-full bg-[#3B1263] border border-violet-800 rounded-2xl pl-10 pr-10 py-3 text-xs sm:text-sm font-semibold text-white focus:outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-500/20 transition-spring shadow-inner"
              />
              <Search className="w-4.5 h-4.5 text-violet-400 absolute left-3.5 top-3.5" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredQuestions.map((q, idx) => (
                <div
                  key={q.id}
                  className="bezel-outer-shell bg-[#3B1263]/90 border-violet-900/60 p-4 space-y-3 shadow-lg"
                >
                  <div className="flex items-center justify-between border-b border-violet-900/60 pb-2">
                    <span className="text-xs font-black bg-violet-600 text-white px-2.5 py-0.5 rounded-full">
                      Câu hỏi #{idx + 1}
                    </span>
                    {q.hskLevel && (
                      <span className="text-[10.5px] font-bold text-amber-300">{q.hskLevel}</span>
                    )}
                  </div>

                  <h3 className="text-sm font-extrabold text-white">{q.questionVietnamese || q.questionChinese}</h3>
                  <div className="space-y-1.5 pt-1">
                    {q.options.map((opt, oIdx) => (
                      <div
                        key={oIdx}
                        className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 text-xs font-semibold text-slate-300 flex items-center space-x-2"
                      >
                        <span className="w-5 h-5 rounded-full bg-violet-900 text-violet-200 flex items-center justify-center font-black text-[10px]">
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span>{opt.textVietnamese || opt.textChinese}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
