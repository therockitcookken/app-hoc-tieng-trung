import React, { useEffect } from 'react';
import { X, Award, Clock, Flame, Brain } from 'lucide-react';

interface FlashcardDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FlashcardDetailsModal: React.FC<FlashcardDetailsModalProps> = ({
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
        className="bg-white rounded-2xl p-5 w-full max-w-[340px] shadow-2xl relative border border-purple-100 space-y-4"
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
          <div className="w-10 h-10 rounded-full bg-purple-50 text-[#8E24AA] flex items-center justify-center flex-shrink-0">
            <Award className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <h3 className="text-[15px] font-extrabold text-slate-900 leading-tight">
              Thống kê học Flashcard
            </h3>
            <p className="text-[11px] text-slate-500 font-medium">
              Đã ghi nhớ <span className="font-extrabold text-[#8E24AA]">234/300 từ</span> (78%)
            </p>
          </div>
        </div>

        {/* Stats Summary Grid */}
        <div className="grid grid-cols-2 gap-2 text-[11.5px] pt-1">
          <div className="bg-emerald-50 border border-emerald-200/60 rounded-xl p-2.5 space-y-0.5">
            <span className="text-[10px] text-emerald-700 font-bold block">Đã thuộc</span>
            <span className="text-[18px] font-extrabold text-emerald-900">156 từ</span>
          </div>

          <div className="bg-amber-50 border border-amber-200/60 rounded-xl p-2.5 space-y-0.5">
            <span className="text-[10px] text-amber-700 font-bold block">Đang học</span>
            <span className="text-[18px] font-extrabold text-amber-900">18 từ</span>
          </div>

          <div className="bg-blue-50 border border-blue-200/60 rounded-xl p-2.5 space-y-0.5">
            <span className="text-[10px] text-blue-700 font-bold block">Cần ôn</span>
            <span className="text-[18px] font-extrabold text-blue-900">24 từ</span>
          </div>

          <div className="bg-red-50 border border-red-200/60 rounded-xl p-2.5 space-y-0.5">
            <span className="text-[10px] text-red-700 font-bold block">Từ khó</span>
            <span className="text-[18px] font-extrabold text-red-900">12 từ</span>
          </div>
        </div>

        {/* Time & Accuracy Info */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 space-y-2 text-[11px] text-slate-700">
          <div className="flex items-center justify-between font-bold">
            <div className="flex items-center space-x-1.5 text-purple-700">
              <Brain className="w-4 h-4 text-[#8E24AA]" />
              <span>Độ chính xác:</span>
            </div>
            <span className="text-[#8E24AA] font-extrabold text-xs">86%</span>
          </div>

          <div className="flex items-center justify-between font-bold">
            <div className="flex items-center space-x-1.5 text-slate-700">
              <Clock className="w-4 h-4 text-slate-500" />
              <span>Tổng thời gian học:</span>
            </div>
            <span className="text-slate-900">9 giờ 25 phút</span>
          </div>

          <div className="flex items-center justify-between font-bold">
            <div className="flex items-center space-x-1.5 text-amber-600">
              <Flame className="w-4 h-4 text-amber-500" />
              <span>Chuỗi ngày học:</span>
            </div>
            <span className="text-amber-700 font-extrabold">15 ngày</span>
          </div>
        </div>

        {/* Confirm Button */}
        <button
          onClick={onClose}
          type="button"
          className="w-full bg-gradient-to-r from-[#A73CEB] to-[#8E24AA] text-white text-[12px] font-bold py-2.5 rounded-xl shadow-md active:scale-95 transition-transform cursor-pointer"
        >
          Hoàn tất
        </button>
      </div>
    </div>
  );
};
