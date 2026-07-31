import React from 'react';
import { LearningStreak } from './LearningStreak';
import { RewardCard } from './RewardCard';

export const StreakRewardSection: React.FC = () => {
  return (
    <div className="w-full px-4 py-1.5 relative z-10">
      <div className="bg-white rounded-2xl p-3.5 shadow-[0_6px_20px_rgba(0,0,0,0.06)] border border-white/80 flex items-stretch space-x-2.5">
        {/* Left 65%: Streak Days */}
        <LearningStreak />

        {/* Vertical Divider */}
        <div className="w-[1px] bg-slate-100 my-1 self-stretch" />

        {/* Right 35%: Reward Box */}
        <RewardCard />
      </div>
    </div>
  );
};
