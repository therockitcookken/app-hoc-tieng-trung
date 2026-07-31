import React, { useState, useEffect } from 'react';
import { Volume2, Bookmark, BookOpen, Check, VolumeX } from 'lucide-react';
import { GrammarStructureAnalysis } from './GrammarStructureAnalysis';
import { GrammarLesson } from '../../data/grammarData';
import { speakChinese } from '../../utils/chineseSpeech';

interface TodayGrammarLessonProps {
  lesson: GrammarLesson;
  onOpenDetailsModal: () => void;
  showToast?: (msg: string) => void;
}

export const TodayGrammarLesson: React.FC<TodayGrammarLessonProps> = ({
  lesson,
  onOpenDetailsModal,
  showToast,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(() => {
    try {
      const saved = localStorage.getItem(`bookmark_grammar_${lesson.id}`);
      return saved === 'true';
    } catch {
      return false;
    }
  });
  const [isAnalysisExpanded, setIsAnalysisExpanded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(`bookmark_grammar_${lesson.id}`);
      setIsBookmarked(saved === 'true');
    } catch {
      setIsBookmarked(false);
    }
  }, [lesson.id]);

  const handleToggleBookmark = () => {
    const nextState = !isBookmarked;
    setIsBookmarked(nextState);
    try {
      localStorage.setItem(`bookmark_grammar_${lesson.id}`, String(nextState));
    } catch {
      // Ignore localStorage errors
    }
    showToast?.(nextState ? `Đã lưu bài học: ${lesson.title}` : `Đã bỏ lưu bài học: ${lesson.title}`);
  };

  const handlePlayAudio = () => {
    setIsPlaying(true);
    const sentenceToSpeak = lesson.exampleSentence || '我一边听音乐，一边学习。';
    speakChinese(sentenceToSpeak, 0.85);
    setTimeout(() => setIsPlaying(false), 2000);
  };

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    };
  }, []);

  return (
    <div className="w-full px-4 py-1.5 relative z-10">
      {/* Main Card */}
      <div className="bg-white rounded-2xl p-4 shadow-[0_6px_20px_rgba(0,0,0,0.06)] border border-white/80 relative overflow-hidden">
        {/* Header Badges */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-1.5">
            <span className="bg-blue-100 text-[#1E52E8] font-extrabold text-[10px] px-2 py-0.5 rounded-md">
              {lesson.hsk}
            </span>
            <span className={`font-bold text-[10px] px-2 py-0.5 rounded-md ${lesson.levelBg}`}>
              {lesson.level}
            </span>
          </div>

          <button
            onClick={handleToggleBookmark}
            type="button"
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform active:scale-90 cursor-pointer ${
              isBookmarked ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-400 hover:text-slate-600'
            }`}
            aria-label="Lưu bài học"
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
          </button>
        </div>

        {/* Lesson Title & Pinyin */}
        <h2 className="text-[17px] font-extrabold text-[#242424] tracking-tight">
          {lesson.title}
        </h2>
        <div className="flex items-center space-x-2 mt-0.5">
          <span className="text-[13px] font-bold text-[#1E52E8]">
            {lesson.pinyin}
          </span>
          <span className="text-[12px] text-[#666666] font-medium">
            ({lesson.meaning})
          </span>
        </div>

        {/* Formula Box */}
        <div className="mt-3 bg-[#EBF3FF] border border-[#D0E2FF] rounded-xl p-3">
          <span className="text-[10px] font-extrabold text-[#1E52E8] uppercase tracking-wider block mb-1">
            Công thức chuẩn:
          </span>
          <p className="text-[13.5px] font-extrabold text-[#1E52E8] font-mono leading-snug">
            {lesson.formula}
          </p>
        </div>

        {/* Example Sentence Box */}
        <div className="mt-3 bg-[#FAFAFA] border border-slate-200/70 rounded-xl p-3 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-[#777777] uppercase">
              Ví dụ mẫu:
            </span>
            <button
              onClick={handlePlayAudio}
              type="button"
              className="flex items-center space-x-1 text-[10.5px] text-[#1E52E8] font-bold hover:underline cursor-pointer"
            >
              {isPlaying ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Dừng phát' : 'Nghe phát âm'}</span>
            </button>
          </div>
          <p className="text-[16px] font-extrabold text-[#242424] font-serif">
            {lesson.exampleSentence}
          </p>
          <p className="text-[11.5px] font-semibold text-[#1E52E8]">
            {lesson.examplePinyin}
          </p>
          <p className="text-[11px] text-[#555555] font-medium">
            Nghĩa: {lesson.exampleMeaning}
          </p>
        </div>

        {/* Structure Analysis Collapsible */}
        <GrammarStructureAnalysis
          isExpanded={isAnalysisExpanded}
          onToggleExpand={() => setIsAnalysisExpanded(!isAnalysisExpanded)}
        />

        {/* Action Buttons Row */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          <button
            onClick={handlePlayAudio}
            type="button"
            className="bg-slate-100 hover:bg-slate-200 text-[#242424] text-[11px] font-bold py-2 rounded-xl flex items-center justify-center space-x-1 transition-transform active:scale-95 cursor-pointer"
          >
            {isPlaying ? <VolumeX className="w-3.5 h-3.5 text-red-500" /> : <Volume2 className="w-3.5 h-3.5 text-[#1E52E8]" />}
            <span>{isPlaying ? 'Dừng' : 'Nghe câu'}</span>
          </button>

          <button
            onClick={handleToggleBookmark}
            type="button"
            className="bg-slate-100 hover:bg-slate-200 text-[#242424] text-[11px] font-bold py-2 rounded-xl flex items-center justify-center space-x-1 transition-transform active:scale-95 cursor-pointer"
          >
            {isBookmarked ? <Check className="w-3.5 h-3.5 text-green-600 stroke-[3]" /> : <Bookmark className="w-3.5 h-3.5 text-amber-500" />}
            <span>{isBookmarked ? 'Đã lưu' : 'Bookmark'}</span>
          </button>

          <button
            onClick={onOpenDetailsModal}
            type="button"
            className="bg-gradient-to-r from-[#2570F0] to-[#1E52E8] text-white text-[11px] font-bold py-2 rounded-xl flex items-center justify-center space-x-1 shadow-xs active:scale-95 transition-transform cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Học ngay</span>
          </button>
        </div>
      </div>
    </div>
  );
};
