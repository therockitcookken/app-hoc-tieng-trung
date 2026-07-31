import React from 'react';
import { Star, ChevronRight } from 'lucide-react';
import { GrammarLessonCard } from './GrammarLessonCard';
import { RECOMMENDED_GRAMMAR_LESSONS, GrammarLesson } from '../../data/grammarData';

interface RecommendedGrammarLessonsProps {
  selectedLessonId: string;
  onSelectLesson: (lesson: GrammarLesson) => void;
  onSeeAllClick?: () => void;
}

export const RecommendedGrammarLessons: React.FC<RecommendedGrammarLessonsProps> = ({
  selectedLessonId,
  onSelectLesson,
  onSeeAllClick,
}) => {
  return (
    <div className="w-full px-4 py-1.5 relative z-10">
      {/* Header Row */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-1.5">
          <Star className="w-4 h-4 text-[#1E52E8] fill-[#1E52E8]/10" />
          <h2 className="text-[14px] font-extrabold text-[#242424] tracking-tight">
            Bài học gợi ý cho bạn
          </h2>
        </div>
        <button
          onClick={onSeeAllClick}
          type="button"
          className="text-[11px] text-[#666666] font-medium flex items-center hover:text-[#1E52E8] cursor-pointer"
        >
          <span>Xem tất cả</span>
          <ChevronRight className="w-3.5 h-3.5 text-[#999999]" />
        </button>
      </div>

      {/* Vertical Stacked Cards */}
      <div className="space-y-2">
        {RECOMMENDED_GRAMMAR_LESSONS.map((lesson) => (
          <GrammarLessonCard
            key={lesson.id}
            lesson={lesson}
            isSelected={selectedLessonId === lesson.id}
            onSelect={() => onSelectLesson(lesson)}
          />
        ))}
      </div>
    </div>
  );
};
