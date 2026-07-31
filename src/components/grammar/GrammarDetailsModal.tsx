import React, { useEffect } from 'react';
import { X, Award, CheckCircle, BookOpen } from 'lucide-react';
import { GrammarLesson } from '../../data/grammarData';

interface GrammarDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  lesson?: GrammarLesson;
}

export const GrammarDetailsModal: React.FC<GrammarDetailsModalProps> = ({
  isOpen,
  onClose,
  lesson,
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
        className="bg-white rounded-2xl p-5 w-full max-w-[340px] shadow-2xl relative border border-blue-100 space-y-4"
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
          <div className="w-10 h-10 rounded-full bg-blue-50 text-[#1E52E8] flex items-center justify-center flex-shrink-0">
            <Award className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <h3 className="text-[15px] font-extrabold text-slate-900 leading-tight">
              {lesson?.title || 'Tiến độ ngữ pháp'}
            </h3>
            <p className="text-[11px] text-slate-500 font-medium">
              Đã hoàn thành <span className="font-extrabold text-[#1E52E8]">36/50 chủ điểm</span> (72%)
            </p>
          </div>
        </div>

        {/* Breakdown List */}
        <div className="space-y-2 pt-1 text-[11.5px]">
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 space-y-1">
            <div className="flex justify-between font-bold text-slate-800">
              <span>Chủ điểm tốt nhất:</span>
              <span className="text-emerald-600">Câu cơ bản (92%)</span>
            </div>
            <div className="flex justify-between font-bold text-slate-800">
              <span>Chủ điểm cần cải thiện:</span>
              <span className="text-amber-600">Trợ từ & Bổ ngữ (60%)</span>
            </div>
          </div>
        </div>

        {/* Suggestion Box */}
        <div className="bg-blue-50 border border-blue-200/60 rounded-xl p-3 flex items-start space-x-2">
          <CheckCircle className="w-4 h-4 text-[#1E52E8] flex-shrink-0 mt-0.5" />
          <p className="text-[11px] text-blue-950 font-medium leading-relaxed">
            <strong className="block text-[#1E52E8] font-bold">Gợi ý học tập:</strong>
            Hãy luyện tập thêm các câu có trợ từ 的, 得, 地 để tăng tốc độ làm bài quiz!
          </p>
        </div>

        {/* Confirm Button */}
        <button
          onClick={onClose}
          type="button"
          className="w-full bg-gradient-to-r from-[#2570F0] to-[#1E52E8] text-white text-[12px] font-bold py-2.5 rounded-xl shadow-md active:scale-95 transition-transform cursor-pointer flex items-center justify-center space-x-1"
        >
          <BookOpen className="w-4 h-4" />
          <span>Tiếp tục học</span>
        </button>
      </div>
    </div>
  );
};
