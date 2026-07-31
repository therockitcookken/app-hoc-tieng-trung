import React from 'react';
import { Star } from 'lucide-react';
import { LessonItem } from '../../data/pronunciationData';

interface RecommendedLessonCardProps {
  lesson: LessonItem;
  isSelected?: boolean;
  onSelect: () => void;
}

export const RecommendedLessonCard: React.FC<RecommendedLessonCardProps> = ({
  lesson,
  isSelected = false,
  onSelect,
}) => {
  return (
    <button
      onClick={onSelect}
      type="button"
      className={`w-[115px] flex-shrink-0 bg-white rounded-2xl p-2.5 shadow-sm border text-left transition-all duration-150 active:scale-95 cursor-pointer overflow-hidden relative ${
        isSelected ? 'border-red-400 ring-2 ring-red-400/30' : 'border-slate-100 hover:border-slate-200'
      }`}
    >
      {/* Top Banner Box with Gradient & Big Symbol */}
      <div className={`w-full h-16 rounded-xl bg-gradient-to-br ${lesson.gradient} relative overflow-hidden flex items-center justify-center p-1 border border-white/30 shadow-inner`}>
        {/* Level Badge Top-Left */}
        <span className={`absolute top-1.5 left-1.5 text-[8.5px] font-bold px-1.5 py-0.5 rounded-md ${lesson.badgeBg} shadow-2xs`}>
          {lesson.level}
        </span>

        {/* Character */}
        <span className="text-[26px] font-extrabold text-white font-serif tracking-tight drop-shadow-xs">
          {lesson.char}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-[11.5px] font-bold text-[#242424] truncate mt-2 leading-tight">
        {lesson.title}
      </h3>

      {/* Star Rating */}
      <div className="flex items-center space-x-0.5 mt-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3 h-3 ${
              star <= lesson.rating
                ? 'fill-amber-400 text-amber-400'
                : 'fill-slate-200 text-slate-200'
            }`}
          />
        ))}
      </div>

      {/* Lesson Count */}
      <span className="text-[9.5px] text-[#888888] font-medium block mt-1">
        {lesson.lessonCount} bài
      </span>
    </button>
  );
};
