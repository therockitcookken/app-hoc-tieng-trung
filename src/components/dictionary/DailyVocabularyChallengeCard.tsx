import React from 'react';
import { Trophy } from 'lucide-react';

export const DailyVocabularyChallengeCard: React.FC = () => {
  return (
    <div className="w-full px-4 py-1.5 relative z-10">
      <div className="bg-[#EFFFF0] border border-[#C6F7C8] rounded-2xl p-3.5 flex items-center justify-between shadow-xs">
        {/* Left: Trophy Icon & Text */}
        <div className="flex items-center space-x-3 min-w-0 pr-2">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0 shadow-2xs">
            <Trophy className="w-5 h-5 fill-amber-400 text-amber-600 stroke-[1.5]" />
          </div>

          <div className="min-w-0">
            <h3 className="text-[13px] font-extrabold text-[#242424] tracking-tight">
              Thử thách mỗi ngày
            </h3>
            <p className="text-[10.5px] text-[#666666] font-medium leading-tight mt-0.5 truncate">
              Học 5 từ mới mỗi ngày để nhận thưởng!
            </p>
          </div>
        </div>

        {/* Right: Progress Count */}
        <div className="text-right flex-shrink-0">
          <span className="text-[9.5px] font-medium text-[#777777] block">
            Hoàn thành
          </span>
          <span className="text-[15px] font-extrabold text-[#28B849] block leading-none mt-0.5">
            3/5
          </span>
        </div>
      </div>
    </div>
  );
};
