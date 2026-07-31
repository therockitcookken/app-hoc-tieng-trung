import React from 'react';
import { Play, BookOpen } from 'lucide-react';
import { GrammarLesson } from '../../data/grammarData';

interface GrammarLessonCardProps {
  lesson: GrammarLesson;
  isSelected?: boolean;
  onSelect: () => void;
}

export const GrammarLessonCard: React.FC<GrammarLessonCardProps> = ({
  lesson,
  isSelected = false,
  onSelect,
}) => {
  return (
    <button
      onClick={onSelect}
      type="button"
      className={`w-full bg-white rounded-2xl p-3 shadow-xs border flex items-center justify-between text-left transition-all active:scale-[0.99] cursor-pointer ${
        isSelected ? 'border-blue-500 ring-2 ring-blue-500/20 bg-blue-50/20' : 'border-slate-100 hover:border-slate-200'
      }`}
    >
      <div className="flex items-center space-x-3 min-w-0 pr-2">
        {/* Icon Square Thumbnail */}
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${lesson.gradient} text-white flex items-center justify-center flex-shrink-0 shadow-xs`}>
          <BookOpen className="w-5 h-5 stroke-[2]" />
        </div>

        {/* Info */}
        <div className="min-w-0 leading-tight">
          <h4 className="text-[12.5px] font-extrabold text-[#242424] truncate">
            {lesson.title}
          </h4>
          <p className="text-[10px] text-[#777777] font-medium truncate mt-0.5">
            {lesson.subtitle}
          </p>
        </div>
      </div>

      {/* Level Badge & Play Button */}
      <div className="flex items-center space-x-2.5 flex-shrink-0">
        <span className={`text-[9.5px] font-extrabold px-2 py-0.5 rounded-md ${lesson.levelBg}`}>
          {lesson.level}
        </span>
        <span className="text-[9.5px] text-[#888888] font-medium hidden sm:inline">
          {lesson.lessonCount} bài học
        </span>
        <div className="w-7 h-7 rounded-full bg-blue-50 border border-blue-200 text-[#1E52E8] flex items-center justify-center">
          <Play className="w-3.5 h-3.5 fill-current stroke-none ml-0.5" />
        </div>
      </div>
    </button>
  );
};
