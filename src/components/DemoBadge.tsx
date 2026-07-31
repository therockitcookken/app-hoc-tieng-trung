import React from 'react';
import { Award } from 'lucide-react';

interface DemoBadgeProps {
  onClick?: () => void;
}

export const DemoBadge: React.FC<DemoBadgeProps> = ({ onClick }) => {
  return (
    <div className="relative inline-flex items-center">
      {/* Official Badge Main Container */}
      <button
        onClick={onClick}
        type="button"
        className="bg-white px-3 py-1.5 rounded-xl shadow-md flex items-center space-x-2 border border-white/60 transition-transform active:scale-95 text-left cursor-pointer"
        aria-label="Bản Chính Thức - Full 100% Tính Năng"
      >
        {/* Award Icon */}
        <div className="w-6 h-6 rounded-lg flex items-center justify-center text-amber-500 flex-shrink-0">
          <Award className="w-5 h-5 text-amber-500 stroke-[2]" />
        </div>

        {/* Badge Labels */}
        <div className="flex flex-col pr-1 leading-tight">
          <span className="text-[#D92329] font-bold text-[12px] tracking-tight">
            BẢN CHÍNH THỨC
          </span>
          <span className="text-slate-600 text-[10px] font-medium tracking-tight mt-[0.5px]">
            Full 100% Tính Năng
          </span>
        </div>
      </button>
    </div>
  );
};
