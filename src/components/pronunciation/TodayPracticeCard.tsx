import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Mic, Play, Square, RefreshCw, CheckCircle2, ChevronRight, VolumeX } from 'lucide-react';
import { PronunciationWaveform } from './PronunciationWaveform';
import { LessonItem } from '../../data/pronunciationData';
import { speakChinese, stopChineseSpeech } from '../../utils/chineseSpeech';

interface TodayPracticeCardProps {
  lesson: LessonItem;
  onOpenDetailsModal: () => void;
  onSeeAllClick?: () => void;
}

export const TodayPracticeCard: React.FC<TodayPracticeCardProps> = ({
  lesson,
  onOpenDetailsModal,
  onSeeAllClick,
}) => {
  const [isPlayingSample, setIsPlayingSample] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTimer, setRecordingTimer] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Play audio sample using Web Speech API TTS or Fallback
  const handlePlaySample = () => {
    setIsPlayingSample(true);
    setAudioError(null);
    speakChinese(lesson.char || lesson.soundText, 0.8);
    setTimeout(() => setIsPlayingSample(false), 1200);
  };

  // Handle Recording (Microphone permission or simulation fallback)
  const handleToggleRecord = async () => {
    if (isRecording) {
      stopRecordingAndAnalyze();
      return;
    }

    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        await navigator.mediaDevices.getUserMedia({ audio: true });
      }
    } catch {
      // If mic permission denied or unsupported, use simulation mode cleanly
    }

    setIsRecording(true);
    setRecordingTimer(0);

    timerRef.current = setInterval(() => {
      setRecordingTimer((prev) => {
        if (prev >= 9) {
          stopRecordingAndAnalyze();
          return 10;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const stopRecordingAndAnalyze = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsRecording(false);
    setIsAnalyzing(true);

    setTimeout(() => {
      setIsAnalyzing(false);
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      stopChineseSpeech();
    };
  }, []);

  return (
    <div className="w-full px-4 py-1.5 relative z-10 select-none">
      {/* Header Row */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-1.5">
          <span className="eyebrow-pill bg-red-500/10 text-red-600 border-red-500/20">
            Hàn ngữ 3D
          </span>
          <h2 className="text-[14px] font-black text-slate-900 tracking-tight">
            Bài tập phát âm hôm nay
          </h2>
        </div>
        <button
          onClick={onSeeAllClick}
          type="button"
          className="text-[11px] text-slate-500 font-extrabold flex items-center hover:text-[#EF3B32] cursor-pointer transition-colors"
        >
          <span>Xem tất cả</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        </button>
      </div>

      {/* Main Practice Double-Bezel Outer Shell */}
      <div className="bg-white/95 rounded-[2rem] p-1.5 shadow-2xl border border-slate-200/80">
        <div className="bg-white rounded-[calc(2rem-0.375rem)] p-4 sm:p-5 border border-slate-100 relative overflow-hidden space-y-3.5">
          {/* Top Info Section */}
          <div className="flex items-start justify-between">
            {/* Chinese Character Container */}
            <div className="w-16 h-16 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-center flex-shrink-0 shadow-inner group">
              <span className="text-[38px] font-black text-slate-900 font-sans leading-none group-hover:scale-110 transition-spring">
                {lesson.char}
              </span>
            </div>

            {/* Pinyin and Meaning */}
            <div className="flex-1 px-3.5 pt-1 min-w-0">
              <div className="flex items-center space-x-2">
                <span className="text-xl font-black text-slate-900 tracking-tight">
                  {lesson.pinyin}
                </span>
                <button
                  onClick={handlePlaySample}
                  type="button"
                  className="w-7 h-7 rounded-full bg-red-50 text-[#EF3B32] flex items-center justify-center hover:bg-red-100 active:scale-90 transition-spring cursor-pointer border border-red-200/60"
                  aria-label="Phát âm thanh"
                >
                  <Volume2 className="w-4 h-4 fill-current stroke-[1.5]" />
                </button>
              </div>
              <p className="text-[11.5px] text-slate-500 font-medium mt-0.5 truncate">
                {lesson.meaning}
              </p>
            </div>

            {/* Score Box Right */}
            <div className="bg-emerald-50/80 rounded-2xl px-3 py-2 text-center border border-emerald-200/80 min-w-[80px] flex-shrink-0 shadow-2xs">
              <div className="text-[20px] font-black text-emerald-700 leading-none tracking-tight">
                {isAnalyzing ? (
                  <span className="animate-pulse text-amber-600 text-xs">Đang chấm...</span>
                ) : (
                  <>
                    {lesson.score}
                    <span className="text-[10px] text-emerald-600/70 font-bold">/100</span>
                  </>
                )}
              </div>
              <span className="text-[10.5px] font-extrabold text-emerald-700 block mt-1 leading-none">
                {isAnalyzing ? '...' : 'Rất tốt!'}
              </span>

              {/* Score Mini Bar */}
              <div className="w-full h-1.5 bg-emerald-200/60 rounded-full mt-1.5 overflow-hidden">
                <div
                  className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                  style={{ width: isAnalyzing ? '40%' : `${lesson.score}%` }}
                />
              </div>
            </div>
          </div>

          {/* Audio Waveform */}
          <div className="mt-2 bg-slate-50 p-2 rounded-2xl border border-slate-200/60">
            <PronunciationWaveform
              isActivePlaying={isPlayingSample}
              isActiveRecording={isRecording}
            />
          </div>

          {/* 3 Action Buttons Row */}
          <div className="mt-3 flex items-center justify-center space-x-6 pt-1">
            {/* Button 1: Thu âm */}
            <div className="flex flex-col items-center">
              <button
                onClick={handleToggleRecord}
                type="button"
                className={`w-13 h-13 rounded-full flex items-center justify-center text-white shadow-lg transition-spring active:scale-90 cursor-pointer ${
                  isRecording
                    ? 'bg-amber-500 animate-pulse ring-4 ring-amber-300/50'
                    : 'bg-gradient-to-r from-[#EF3B32] to-[#D92329] shadow-red-500/25 hover:scale-105'
                }`}
              >
                {isRecording ? (
                  <Square className="w-5 h-5 fill-current" />
                ) : (
                  <Mic className="w-5.5 h-5.5 stroke-[2.2]" />
                )}
              </button>
              <span className="text-[11px] font-extrabold text-slate-700 mt-1.5">
                {isRecording ? `${recordingTimer}s (Dừng)` : 'Thu âm'}
              </span>
            </div>

            {/* Button 2: Nghe mẫu */}
            <div className="flex flex-col items-center">
              <button
                onClick={handlePlaySample}
                type="button"
                className={`w-13 h-13 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[#EF3B32] shadow-md transition-spring active:scale-90 cursor-pointer hover:border-red-300 hover:scale-105 ${
                  isPlayingSample ? 'bg-red-50 border-red-400' : ''
                }`}
              >
                {isPlayingSample ? (
                  <VolumeX className="w-5 h-5 stroke-[2.2]" />
                ) : (
                  <Play className="w-5.5 h-5.5 fill-current stroke-none ml-0.5" />
                )}
              </button>
              <span className="text-[11px] font-extrabold text-slate-700 mt-1.5">
                {isPlayingSample ? 'Dừng' : 'Nghe mẫu'}
              </span>
            </div>

            {/* Button 3: Luyện lại */}
            <div className="flex flex-col items-center">
              <button
                onClick={() => {
                  handlePlaySample();
                }}
                type="button"
                className="w-13 h-13 rounded-full bg-slate-900 hover:bg-slate-800 flex items-center justify-center text-white shadow-lg active:scale-90 transition-spring cursor-pointer hover:scale-105"
              >
                <RefreshCw className="w-5 h-5 stroke-[2.2]" />
              </button>
              <span className="text-[11px] font-extrabold text-slate-700 mt-1.5">
                Luyện lại
              </span>
            </div>
          </div>

          {/* Audio Error Alert if any */}
          {audioError && (
            <div className="mt-2 text-xs font-bold text-red-600 text-center">
              {audioError}
            </div>
          )}

          {/* Bottom Feedback Banner */}
          <div className="mt-3 bg-emerald-50/90 border border-emerald-200/80 rounded-2xl p-3 flex items-center justify-between shadow-2xs">
            <div className="flex items-start space-x-2.5 min-w-0 pr-2">
              <CheckCircle2 className="w-4.5 h-4.5 text-emerald-700 flex-shrink-0 mt-0.5 stroke-[2.5]" />
              <div className="min-w-0">
                <h4 className="text-xs font-black text-emerald-900 leading-tight">
                  Phát âm của bạn rất chuẩn!
                </h4>
                <p className="text-[10.5px] text-slate-600 font-semibold leading-tight mt-0.5 truncate">
                  Âm "{lesson.char}" của bạn giống {lesson.score}% giọng bản xứ.
                </p>
              </div>
            </div>

            {/* Chi tiết Pill Button */}
            <button
              onClick={onOpenDetailsModal}
              type="button"
              className="group/btn bg-white border border-emerald-300/80 text-emerald-800 text-[10.5px] font-extrabold px-3.5 py-1.5 rounded-full shadow-2xs active:scale-95 transition-spring flex items-center space-x-1 flex-shrink-0 cursor-pointer hover:bg-emerald-100/50"
            >
              <span>Chi tiết</span>
              <ChevronRight className="w-3 h-3 stroke-[2.5] transition-transform group-hover/btn:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
