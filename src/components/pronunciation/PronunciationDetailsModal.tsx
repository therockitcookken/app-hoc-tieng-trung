import React, { useEffect } from 'react';
import { X, Award, CheckCircle } from 'lucide-react';
import { LessonItem } from '../../data/pronunciationData';

interface PronunciationDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  lesson?: LessonItem;
}

export const PronunciationDetailsModal: React.FC<PronunciationDetailsModalProps> = ({
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

  const scoreItems = [
    { label: 'Thanh điệu', score: 95, color: 'bg-emerald-500' },
    { label: 'Phụ âm đầu', score: 89, color: 'bg-blue-500' },
    { label: 'Nguyên âm', score: 91, color: 'bg-indigo-500' },
    { label: 'Độ trôi chảy', score: 93, color: 'bg-amber-500' },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-5 w-full max-w-[340px] shadow-2xl relative border border-red-100 space-y-4"
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
          <div className="w-10 h-10 rounded-full bg-red-50 text-[#EF3B32] flex items-center justify-center flex-shrink-0">
            <Award className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <h3 className="text-[15px] font-extrabold text-slate-900 leading-tight">
              Phân tích âm "{lesson?.char || '好'}"
            </h3>
            <p className="text-[11px] text-slate-500 font-medium">
              Điểm tổng hợp: <span className="font-extrabold text-[#EF3B32]">{lesson?.score || 92}/100</span>
            </p>
          </div>
        </div>

        {/* Score Breakdown Lines */}
        <div className="space-y-2.5 pt-1">
          {scoreItems.map((item) => (
            <div key={item.label} className="space-y-1">
              <div className="flex justify-between text-[11.5px] font-bold text-slate-700">
                <span>{item.label}</span>
                <span className="text-slate-900">{item.score}/100</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${item.color} rounded-full transition-all duration-500`}
                  style={{ width: `${item.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Feedback Suggestion Box */}
        <div className="bg-amber-50 border border-amber-200/60 rounded-xl p-3 flex items-start space-x-2">
          <CheckCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-[11px] text-amber-900 font-medium leading-relaxed">
            <strong className="block text-amber-950 font-bold">Gợi ý cải thiện:</strong>
            Hãy nâng giọng rõ hơn một chút ở cuối âm để đạt điểm tối đa thanh 3!
          </p>
        </div>

        {/* Confirm Button */}
        <button
          onClick={onClose}
          type="button"
          className="w-full bg-gradient-to-r from-[#EF3B32] to-[#D92329] text-white text-[12px] font-bold py-2.5 rounded-xl shadow-md active:scale-95 transition-transform cursor-pointer"
        >
          Hoàn tất
        </button>
      </div>
    </div>
  );
};
