import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Mic, Play, Square, RefreshCw, CheckCircle2, ChevronRight, VolumeX } from 'lucide-react';
import { PronunciationWaveform } from './PronunciationWaveform';
import { LessonItem } from '../../data/pronunciationData';
import { speakChinese } from '../../utils/chineseSpeech';

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
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    };
  }, []);

  return (
    <div className="w-full px-4 py-1.5 relative z-10">
      {/* Header Row */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-1.5">
          <Volume2 className="w-4 h-4 text-[#EF3B32] fill-[#EF3B32]/10" />
          <h2 className="text-[14px] font-extrabold text-[#242424] tracking-tight">
            Bài tập hôm nay
          </h2>
        </div>
        <button
          onClick={onSeeAllClick}
          type="button"
          className="text-[11px] text-[#666666] font-medium flex items-center hover:text-[#EF3B32] cursor-pointer"
        >
          <span>Xem tất cả</span>
          <ChevronRight className="w-3.5 h-3.5 text-[#999999]" />
        </button>
      </div>

      {/* Main Practice White Card */}
      <div className="bg-white rounded-2xl p-4 shadow-[0_6px_20px_rgba(0,0,0,0.06)] border border-white/80 relative overflow-hidden">
        {/* Top Info Section */}
        <div className="flex items-start justify-between">
          {/* Chinese Character */}
          <div className="w-16 h-16 bg-[#FAFAFA] rounded-2xl border border-slate-100 flex items-center justify-center flex-shrink-0 shadow-inner">
            <span className="text-[38px] font-extrabold text-[#111111] font-serif leading-none">
              {lesson.char}
            </span>
          </div>

          {/* Pinyin and Meaning */}
          <div className="flex-1 px-3.5 pt-1 min-w-0">
            <div className="flex items-center space-x-2">
              <span className="text-[20px] font-bold text-[#242424] tracking-tight">
                {lesson.pinyin}
              </span>
              <button
                onClick={handlePlaySample}
                type="button"
                className="w-7 h-7 rounded-full bg-red-50 text-[#EF3B32] flex items-center justify-center hover:bg-red-100 active:scale-90 transition-transform cursor-pointer"
                aria-label="Phát âm thanh"
              >
                <Volume2 className="w-4 h-4 fill-current stroke-[1.5]" />
              </button>
            </div>
            <p className="text-[11px] text-[#666666] font-medium mt-1 truncate">
              {lesson.meaning}
            </p>
          </div>

          {/* Score Box Right */}
          <div className="bg-[#F0FAED] rounded-xl px-3 py-2 text-center border border-[#D4F2CA] min-w-[76px] flex-shrink-0">
            <div className="text-[20px] font-extrabold text-[#2E7D32] leading-none tracking-tight">
              {isAnalyzing ? (
                <span className="animate-pulse text-amber-600 text-[14px]">Đang chấm...</span>
              ) : (
                <>
                  {lesson.score}
                  <span className="text-[11px] text-[#2E7D32]/70 font-normal">/100</span>
                </>
              )}
            </div>
            <span className="text-[10.5px] font-bold text-[#2E7D32] block mt-1 leading-none">
              {isAnalyzing ? '...' : 'Rất tốt!'}
            </span>

            {/* Score Mini Bar */}
            <div className="w-full h-1.5 bg-[#DCF5D6] rounded-full mt-1.5 overflow-hidden">
              <div
                className="h-full bg-[#2E7D32] rounded-full transition-all duration-500"
                style={{ width: isAnalyzing ? '40%' : `${lesson.score}%` }}
              />
            </div>
          </div>
        </div>

        {/* Audio Waveform */}
        <div className="mt-3">
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
              className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-md transition-all duration-200 active:scale-90 cursor-pointer ${
                isRecording
                  ? 'bg-amber-500 animate-pulse ring-4 ring-amber-300/50'
                  : 'bg-gradient-to-r from-[#EF3B32] to-[#D92329] shadow-red-500/20'
              }`}
            >
              {isRecording ? (
                <Square className="w-5 h-5 fill-current" />
              ) : (
                <Mic className="w-5 h-5 stroke-[2.2]" />
              )}
            </button>
            <span className="text-[10.5px] font-bold text-[#444444] mt-1.5">
              {isRecording ? `${recordingTimer}s (Dừng)` : 'Thu âm'}
            </span>
          </div>

          {/* Button 2: Nghe mẫu */}
          <div className="flex flex-col items-center">
            <button
              onClick={handlePlaySample}
              type="button"
              className={`w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[#EF3B32] shadow-sm transition-all duration-200 active:scale-90 cursor-pointer hover:border-red-200 ${
                isPlayingSample ? 'bg-red-50 border-red-300' : ''
              }`}
            >
              {isPlayingSample ? (
                <VolumeX className="w-5 h-5 stroke-[2.2]" />
              ) : (
                <Play className="w-5 h-5 fill-current stroke-none ml-0.5" />
              )}
            </button>
            <span className="text-[10.5px] font-bold text-[#444444] mt-1.5">
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
              className="w-12 h-12 rounded-full bg-gradient-to-r from-[#EF3B32] to-[#D92329] flex items-center justify-center text-white shadow-md shadow-red-500/20 active:scale-90 transition-transform cursor-pointer"
            >
              <RefreshCw className="w-5 h-5 stroke-[2.2]" />
            </button>
            <span className="text-[10.5px] font-bold text-[#444444] mt-1.5">
              Luyện lại
            </span>
          </div>
        </div>

        {/* Audio Error Alert if any */}
        {audioError && (
          <div className="mt-2 text-[10px] text-red-600 text-center">
            {audioError}
          </div>
        )}

        {/* Bottom Feedback Banner */}
        <div className="mt-4 bg-[#EFFFF0] border border-[#C6F7C8] rounded-xl p-3 flex items-center justify-between">
          <div className="flex items-start space-x-2 min-w-0 pr-2">
            <CheckCircle2 className="w-4 h-4 text-[#2E7D32] flex-shrink-0 mt-0.5 stroke-[2.5]" />
            <div className="min-w-0">
              <h4 className="text-[11.5px] font-bold text-[#2E7D32] leading-tight">
                Phát âm của bạn rất chuẩn!
              </h4>
              <p className="text-[10px] text-[#555555] font-medium leading-tight mt-0.5 truncate">
                Âm "{lesson.char}" của bạn gần giống {lesson.score}% với người bản xứ.
              </p>
            </div>
          </div>

          {/* Chi tiết Pill Button */}
          <button
            onClick={onOpenDetailsModal}
            type="button"
            className="bg-white border border-[#2E7D32]/30 text-[#2E7D32] text-[10px] font-bold px-3 py-1 rounded-full shadow-2xs active:scale-95 transition-transform flex items-center space-x-0.5 flex-shrink-0 cursor-pointer"
          >
            <span>Chi tiết</span>
            <ChevronRight className="w-3 h-3 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
};
