import React from 'react';
import { Star } from 'lucide-react';
import { RecommendedLessonCard } from './RecommendedLessonCard';
import { RECOMMENDED_LESSONS, LessonItem } from '../../data/pronunciationData';

interface RecommendedLessonsProps {
  selectedLessonId: string;
  onSelectLesson: (lesson: LessonItem) => void;
}

export const RecommendedLessons: React.FC<RecommendedLessonsProps> = ({
  selectedLessonId,
  onSelectLesson,
}) => {
  return (
    <div className="w-full px-4 py-1.5 relative z-10">
      {/* Section Header */}
      <div className="flex items-center space-x-1.5 mb-2">
        <Star className="w-4 h-4 text-[#EF3B32] fill-[#EF3B32]/10" />
        <h2 className="text-[14px] font-extrabold text-[#242424] tracking-tight">
          Bài học gợi ý cho bạn
        </h2>
      </div>

      {/* Horizontal Scroll List */}
      <div className="flex items-center space-x-2.5 overflow-x-auto no-scrollbar py-1 px-0.5 scroll-smooth snap-x">
        {RECOMMENDED_LESSONS.map((lesson) => (
          <div key={lesson.id} className="snap-start">
            <RecommendedLessonCard
              lesson={lesson}
              isSelected={selectedLessonId === lesson.id}
              onSelect={() => onSelectLesson(lesson)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
