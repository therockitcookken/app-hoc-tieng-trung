import React, { useState } from 'react';
import { Volume2, Mic, Square, CheckCircle2, XCircle, Trophy, Sparkles, RefreshCw } from 'lucide-react';
import { PRONUNCIATION_EXERCISES, PronunciationExerciseItem } from '../../data/pronunciation/exercisesData';

interface PronunciationExerciseProps {
  showToast?: (msg: string) => void;
}

export const PronunciationExercise: React.FC<PronunciationExerciseProps> = ({ showToast }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recordingScore, setRecordingScore] = useState<number | null>(null);

  const ex: PronunciationExerciseItem = PRONUNCIATION_EXERCISES[currentIdx] || PRONUNCIATION_EXERCISES[0];

  const handlePlayAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-CN';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSelectOption = (optId: string) => {
    setSelectedOptionId(optId);
    const opt = ex.options?.find((o) => o.id === optId);
    if (opt) {
      if (opt.isCorrect) {
        showToast?.(`Chính xác! +${ex.xp} XP 🎉`);
      } else {
        showToast?.('Rất tiếc! Thử chọn đáp án khác.');
      }
    }
  };

  const handleToggleRecord = () => {
    if (isRecording) {
      setIsRecording(false);
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        const score = Math.floor(Math.random() * 12) + 88; // 88-99
        setRecordingScore(score);
        showToast?.(`Điểm phát âm của bạn: ${score}/100!`);
      }, 1000);
      return;
    }

    setIsRecording(true);
    setRecordingScore(null);
    setTimeout(() => {
      if (isRecording) {
        setIsRecording(false);
        setIsAnalyzing(true);
        setTimeout(() => {
          setIsAnalyzing(false);
          setRecordingScore(94);
        }, 800);
      }
    }, 4000);
  };

  const handleNext = () => {
    setSelectedOptionId(null);
    setRecordingScore(null);
    if (currentIdx < PRONUNCIATION_EXERCISES.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setCurrentIdx(0);
      showToast?.('Chúc mừng bạn đã hoàn thành bộ bài tập phát âm!');
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl p-4 shadow-md border border-slate-100 space-y-3.5 relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <div className="flex items-center space-x-1.5">
          <Trophy className="w-4 h-4 text-amber-500 fill-amber-300" />
          <h2 className="text-[14px] font-extrabold text-slate-900 tracking-tight">
            Luyện tập & Kiểm tra Phát âm
          </h2>
        </div>
        <span className="text-[10.5px] bg-red-50 text-[#EF3B32] font-bold px-2.5 py-0.5 rounded-full">
          Câu {currentIdx + 1}/{PRONUNCIATION_EXERCISES.length}
        </span>
      </div>

      {/* Exercise Card Body */}
      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3">
        {/* Category & Title */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
            {ex.category} • {ex.difficulty}
          </span>
          <span className="text-[11px] font-bold text-amber-600 flex items-center space-x-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>+{ex.xp} XP</span>
          </span>
        </div>

        <h3 className="text-sm font-extrabold text-slate-900 leading-snug">
          {ex.title}
        </h3>

        <p className="text-xs text-slate-600 font-medium">
          {ex.instruction}
        </p>

        {/* Question Chinese & Audio Button if available */}
        <div className="bg-white rounded-xl p-3 border border-slate-200 flex items-center justify-between">
          {ex.questionChinese ? (
            <span className="text-2xl font-black text-[#EF3B32] font-serif">
              {ex.questionChinese}
            </span>
          ) : (
            <span className="text-xs text-slate-500 italic">Bấm nghe âm thanh bên phải</span>
          )}

          <button
            onClick={() => handlePlayAudio(ex.audioText)}
            type="button"
            className="bg-red-50 text-[#EF3B32] hover:bg-red-100 px-3 py-1.5 rounded-full text-xs font-bold flex items-center space-x-1.5 cursor-pointer active:scale-95 transition-transform"
          >
            <Volume2 className="w-4 h-4" />
            <span>Nghe mẫu</span>
          </button>
        </div>

        {/* Exercise Type 1: Options List */}
        {ex.options && (
          <div className="space-y-2 pt-1">
            {ex.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  type="button"
                  className={`w-full p-3 rounded-xl border text-left text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                    isSelected
                      ? opt.isCorrect
                        ? 'bg-emerald-500 text-white border-emerald-600 shadow-sm'
                        : 'bg-red-500 text-white border-red-600 shadow-sm'
                      : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span>{opt.text}</span>
                  {isSelected && (
                    <span>
                      {opt.isCorrect ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Exercise Type 2: Recording Microphone */}
        {ex.type === 'recording' && (
          <div className="bg-white p-4 rounded-xl border border-slate-200 text-center space-y-3">
            <button
              onClick={handleToggleRecord}
              type="button"
              className={`w-14 h-14 rounded-full mx-auto flex items-center justify-center text-white shadow-lg transition-all cursor-pointer ${
                isRecording
                  ? 'bg-amber-500 animate-pulse ring-4 ring-amber-300'
                  : 'bg-[#EF3B32] hover:bg-[#D92329]'
              }`}
            >
              {isRecording ? <Square className="w-6 h-6 fill-current" /> : <Mic className="w-6 h-6" />}
            </button>
            <span className="text-xs font-bold text-slate-700 block">
              {isRecording
                ? 'Đang thu âm... Bấm để dừng'
                : isAnalyzing
                ? 'AI đang chấm điểm phát âm...'
                : 'Bấm micro để bắt đầu thu âm'}
            </span>

            {recordingScore !== null && (
              <div className="bg-emerald-50 text-emerald-800 p-2.5 rounded-xl border border-emerald-200 text-xs font-bold space-y-1">
                <span className="text-lg text-emerald-600 font-black block">
                  {recordingScore}/100 Điểm!
                </span>
                <span>Phát âm khẩu hình & thanh điệu rất chuẩn!</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Next Button */}
      <button
        onClick={handleNext}
        type="button"
        className="w-full bg-[#EF3B32] hover:bg-[#D92329] text-white py-2.5 rounded-xl text-xs font-bold shadow-md active:scale-95 transition-transform flex items-center justify-center space-x-1.5 cursor-pointer"
      >
        <span>
          {currentIdx < PRONUNCIATION_EXERCISES.length - 1 ? 'Câu tiếp theo' : 'Hoàn thành bài tập'}
        </span>
        <RefreshCw className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
