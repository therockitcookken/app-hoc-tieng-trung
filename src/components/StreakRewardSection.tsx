import React from 'react';
import { LearningStreak } from './LearningStreak';
import { RewardCard } from './RewardCard';
import { ThreeDCard } from './3d/ThreeDCard';

export const StreakRewardSection: React.FC = () => {
  return (
    <div className="w-full py-1.5 relative z-10">
      <ThreeDCard glowColor="rgba(255, 138, 40, 0.25)" className="bg-white p-3.5 border border-white/80 shadow-md">
        <div className="flex items-stretch space-x-2.5">
          {/* Left 65%: Streak Days */}
          <LearningStreak />

          {/* Vertical Divider */}
          <div className="w-[1px] bg-slate-100 my-1 self-stretch" />

          {/* Right 35%: Reward Box */}
          <RewardCard />
        </div>
      </ThreeDCard>
    </div>
  );
};
