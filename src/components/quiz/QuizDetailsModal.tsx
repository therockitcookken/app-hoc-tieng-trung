import React, { useEffect } from 'react';
import { X, Trophy, Flame, Target } from 'lucide-react';

interface QuizDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuizDetailsModal: React.FC<QuizDetailsModalProps> = ({
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-5 w-full max-w-[340px] shadow-2xl relative border border-amber-100 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-3.5 right-3.5 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-amber-50 text-[#F57C00] flex items-center justify-center flex-shrink-0">
            <Trophy className="w-5 h-5 fill-amber-400 stroke-[1.5]" />
          </div>
          <div>
            <h3 className="text-[15px] font-extrabold text-slate-900 leading-tight">
              Thống kê làm Quiz
            </h3>
            <p className="text-[11px] text-slate-500 font-medium">
              Đã hoàn thành <span className="font-extrabold text-[#F57C00]">42/50 bài</span> (84%)
            </p>
          </div>
        </div>

        {/* Stats Summary Grid */}
        <div className="grid grid-cols-2 gap-2 text-[11.5px] pt-1">
          <div className="bg-emerald-50 border border-emerald-200/60 rounded-xl p-2.5 space-y-0.5">
            <span className="text-[10px] text-emerald-700 font-bold block">Bài hoàn thành</span>
            <span className="text-[18px] font-extrabold text-emerald-900">42/50</span>
          </div>

          <div className="bg-amber-50 border border-amber-200/60 rounded-xl p-2.5 space-y-0.5">
            <span className="text-[10px] text-amber-700 font-bold block">Điểm trung bình</span>
            <span className="text-[18px] font-extrabold text-amber-900">86/100</span>
          </div>

          <div className="bg-blue-50 border border-blue-200/60 rounded-xl p-2.5 space-y-0.5">
            <span className="text-[10px] text-blue-700 font-bold block">Tổng câu đã làm</span>
            <span className="text-[18px] font-extrabold text-blue-900">368 câu</span>
          </div>

          <div className="bg-red-50 border border-red-200/60 rounded-xl p-2.5 space-y-0.5">
            <span className="text-[10px] text-red-700 font-bold block">Câu sai cần ôn</span>
            <span className="text-[18px] font-extrabold text-red-900">24 câu</span>
          </div>
        </div>

        {/* Accuracy & Streaks Info */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 space-y-2 text-[11px] text-slate-700">
          <div className="flex items-center justify-between font-bold">
            <div className="flex items-center space-x-1.5 text-amber-700">
              <Target className="w-4 h-4 text-[#F57C00]" />
              <span>Độ chính xác:</span>
            </div>
            <span className="text-[#F57C00] font-extrabold text-xs">88%</span>
          </div>

          <div className="flex items-center justify-between font-bold">
            <div className="flex items-center space-x-1.5 text-amber-600">
              <Flame className="w-4 h-4 text-amber-500" />
              <span>Chuỗi Quiz:</span>
            </div>
            <span className="text-amber-700 font-extrabold">16 ngày</span>
          </div>

          <div className="pt-1 border-t border-slate-200/60 space-y-1">
            <p className="text-[10.5px] text-emerald-800 font-semibold">
              ⭐ Chủ đề tốt nhất: <span className="font-bold text-slate-900">Từ vựng công xưởng (94%)</span>
            </p>
            <p className="text-[10.5px] text-amber-800 font-semibold">
              💡 Chủ đề cần cải thiện: <span className="font-bold text-slate-900">Nghe hiểu (78%)</span>
            </p>
          </div>
        </div>

        {/* Confirm Button */}
        <button
          onClick={onClose}
          type="button"
          className="w-full bg-gradient-to-r from-[#FF9800] to-[#F57C00] text-white text-[12px] font-bold py-2.5 rounded-xl shadow-md active:scale-95 transition-transform cursor-pointer"
        >
          Hoàn tất
        </button>
      </div>
    </div>
  );
};
