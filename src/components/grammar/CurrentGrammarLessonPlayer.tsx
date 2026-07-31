import React from 'react';
import { Play, BookOpen } from 'lucide-react';

interface CurrentGrammarLessonPlayerProps {
  lessonTitle?: string;
  onContinue: () => void;
}

export const CurrentGrammarLessonPlayer: React.FC<CurrentGrammarLessonPlayerProps> = ({
  lessonTitle = 'Câu khẳng định',
  onContinue,
}) => {
  return (
    <div className="w-full px-4 py-1 relative z-10">
      <div className="bg-white rounded-2xl p-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-slate-100 flex items-center justify-between">
        {/* Left: Thumbnail & Info */}
        <div className="flex items-center space-x-2.5 min-w-0">
          {/* Square Thumbnail with Blue Gradient */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#2570F0] to-[#1E52E8] text-white flex items-center justify-center flex-shrink-0 shadow-xs relative overflow-hidden">
            <BookOpen className="w-5 h-5 stroke-[2]" />
            <div className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <Play className="w-4 h-4 fill-white text-white" />
            </div>
          </div>

          {/* Lesson Titles */}
          <div className="min-w-0 leading-tight">
            <span className="text-[9.5px] font-medium text-[#888888] block">
              Bài học đang học
            </span>
            <h4 className="text-[12px] font-extrabold text-[#242424] truncate mt-0.5">
              {lessonTitle}
            </h4>
          </div>
        </div>

        {/* Right: Blue Pill Tiếp Tục Button */}
        <button
          onClick={onContinue}
          type="button"
          className="bg-gradient-to-r from-[#2570F0] to-[#1E52E8] text-white text-[11px] font-bold px-3.5 py-1.5 rounded-full shadow-xs active:scale-95 transition-transform flex items-center space-x-1 cursor-pointer flex-shrink-0"
        >
          <span>Tiếp tục</span>
          <Play className="w-3 h-3 fill-current stroke-none ml-0.5" />
        </button>
      </div>
    </div>
  );
};
