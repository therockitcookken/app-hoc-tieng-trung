import React, { useState, useEffect } from 'react';
import { Volume2, Bookmark, BookOpen, Check, VolumeX } from 'lucide-react';
import { GrammarStructureAnalysis } from './GrammarStructureAnalysis';
import { GrammarLesson } from '../../data/grammarData';
import { speakChinese, stopChineseSpeech } from '../../utils/chineseSpeech';

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
      stopChineseSpeech();
    };
  }, []);

  return (
    <div className="w-full px-4 py-1.5 relative z-10 select-none">
      {/* Main Double-Bezel Outer Shell */}
      <div className="bg-white/95 rounded-[2rem] p-1.5 shadow-2xl border border-slate-200/80">
        <div className="bg-white rounded-[calc(2rem-0.375rem)] p-4.5 border border-slate-100 relative overflow-hidden space-y-3.5">
          {/* Header Badges */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="eyebrow-pill bg-blue-500/10 text-blue-600 border-blue-500/20">
                {lesson.hsk}
              </span>
              <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                {lesson.level}
              </span>
            </div>

            <button
              onClick={handleToggleBookmark}
              type="button"
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-spring active:scale-90 cursor-pointer ${
                isBookmarked ? 'bg-amber-100 text-amber-600 border border-amber-300' : 'bg-slate-100 text-slate-400 hover:text-slate-600'
              }`}
              aria-label="Lưu bài học"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
            </button>
          </div>

          {/* Lesson Title & Pinyin */}
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              {lesson.title}
            </h2>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-sm font-black text-blue-600">
                {lesson.pinyin}
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                ({lesson.meaning})
              </span>
            </div>
          </div>

          {/* Formula Box */}
          <div className="bg-blue-50/80 border border-blue-200/80 rounded-2xl p-3.5 shadow-2xs">
            <span className="text-[10px] font-black text-blue-700 uppercase tracking-widest block mb-1">
              Công thức chuẩn:
            </span>
            <p className="text-sm sm:text-base font-black text-blue-900 font-mono leading-snug">
              {lesson.formula}
            </p>
          </div>

          {/* Example Sentence Box */}
          <div className="bg-slate-50/90 border border-slate-200/80 rounded-2xl p-3.5 space-y-1.5 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Ví dụ mẫu:
              </span>
              <button
                onClick={handlePlayAudio}
                type="button"
                className="flex items-center space-x-1.5 text-xs text-blue-600 font-extrabold hover:text-blue-800 cursor-pointer transition-colors"
              >
                {isPlaying ? <VolumeX className="w-4 h-4 text-red-500 animate-pulse" /> : <Volume2 className="w-4 h-4" />}
                <span>{isPlaying ? 'Dừng phát' : 'Nghe phát âm'}</span>
              </button>
            </div>
            <p className="text-lg font-black text-slate-900 font-sans">
              {lesson.exampleSentence}
            </p>
            <p className="text-xs font-extrabold text-blue-600">
              {lesson.examplePinyin}
            </p>
            <p className="text-xs text-slate-600 font-medium">
              Nghĩa: {lesson.exampleMeaning}
            </p>
          </div>

          {/* Structure Analysis Collapsible */}
          <GrammarStructureAnalysis
            isExpanded={isAnalysisExpanded}
            onToggleExpand={() => setIsAnalysisExpanded(!isAnalysisExpanded)}
          />

          {/* Action Buttons Row */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            <button
              onClick={handlePlayAudio}
              type="button"
              className="group bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-extrabold py-2.5 rounded-2xl border border-slate-200 flex items-center justify-center space-x-1.5 transition-spring active:scale-95 cursor-pointer shadow-2xs"
            >
              {isPlaying ? <VolumeX className="w-4 h-4 text-red-500" /> : <Volume2 className="w-4 h-4 text-blue-600" />}
              <span>{isPlaying ? 'Dừng' : 'Nghe câu'}</span>
            </button>

            <button
              onClick={handleToggleBookmark}
              type="button"
              className="group bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-extrabold py-2.5 rounded-2xl border border-slate-200 flex items-center justify-center space-x-1.5 transition-spring active:scale-95 cursor-pointer shadow-2xs"
            >
              {isBookmarked ? <Check className="w-4 h-4 text-emerald-600 stroke-[3]" /> : <Bookmark className="w-4 h-4 text-amber-500" />}
              <span>{isBookmarked ? 'Đã lưu' : 'Bookmark'}</span>
            </button>

            <button
              onClick={onOpenDetailsModal}
              type="button"
              className="btn-3d-blue text-white text-xs font-black py-2.5 rounded-2xl flex items-center justify-center space-x-1.5 shadow-md cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>Học ngay</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
