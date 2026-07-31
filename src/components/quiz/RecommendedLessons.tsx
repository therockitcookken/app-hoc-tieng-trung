import React from 'react';
import { ChevronRight, BookOpen, Headphones, FileText, Star } from 'lucide-react';
import { RECOMMENDED_LESSONS } from '../../data/quizData';

interface RecommendedLessonsProps {
  onSelectLesson: (id: string, title: string) => void;
  onSeeAllClick?: () => void;
}

export const RecommendedLessons: React.FC<RecommendedLessonsProps> = ({
  onSelectLesson,
  onSeeAllClick,
}) => {
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'book':
        return <BookOpen className="w-5 h-5 text-emerald-600 stroke-[2]" />;
      case 'grammar':
        return <BookOpen className="w-5 h-5 text-purple-600 stroke-[2]" />;
      case 'headphones':
        return <Headphones className="w-5 h-5 text-blue-600 stroke-[2]" />;
      case 'document':
        return <FileText className="w-5 h-5 text-pink-600 stroke-[2]" />;
      default:
        return <BookOpen className="w-5 h-5 text-emerald-600" />;
    }
  };

  return (
    <div className="w-full px-4 py-1.5 relative z-10">
      {/* Header Row */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-[13.5px] font-extrabold text-[#242424] tracking-tight">
          Bài học gợi ý cho bạn
        </h2>
        <button
          onClick={onSeeAllClick}
          type="button"
          className="text-[11px] text-[#F57C00] font-bold flex items-center hover:underline cursor-pointer"
        >
          <span>Xem tất cả</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Horizontal Scroll Cards Grid */}
      <div className="flex items-center space-x-2.5 overflow-x-auto no-scrollbar py-1 px-0.5 scroll-smooth snap-x">
        {RECOMMENDED_LESSONS.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelectLesson(item.id, item.title)}
            type="button"
            className="w-[105px] flex-shrink-0 bg-white rounded-2xl p-2.5 shadow-2xs border border-slate-100 hover:border-slate-200 flex flex-col items-center justify-between text-center transition-all active:scale-95 cursor-pointer snap-start"
          >
            {/* Square Icon Container */}
            <div className={`w-10 h-10 rounded-2xl ${item.color} flex items-center justify-center mb-1.5 shadow-2xs border`}>
              {renderIcon(item.iconName)}
            </div>

            {/* Title & Count */}
            <div>
              <h3 className="text-[11px] font-extrabold text-[#242424] truncate leading-tight">
                {item.title}
              </h3>
              <span className="text-[9px] text-[#888888] font-medium block mt-0.5">
                {item.questionCount} câu hỏi
              </span>
            </div>

            {/* Star Ratings */}
            <div className="flex items-center space-x-0.5 mt-1.5">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Star
                  key={idx}
                  className={`w-2.5 h-2.5 ${
                    idx < item.rating
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-slate-200'
                  }`}
                />
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
