import React from 'react';
import { Bell, Sparkles } from 'lucide-react';

interface WelcomeHeaderProps {
  onNotificationClick?: () => void;
}

export const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({ onNotificationClick }) => {
  return (
    <div className="w-full px-5 pt-3 pb-4 flex items-start justify-between relative z-10">
      {/* Greeting Left Side */}
      <div className="flex flex-col text-white space-y-0.5">
        <h1 className="text-[23px] font-extrabold tracking-tight leading-tight drop-shadow-sm flex items-center space-x-2">
          <span>Nǐ hǎo !</span>
          <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
        </h1>
        <div className="text-[12.5px] text-white/90 font-normal leading-[1.35] tracking-wide pt-0.5">
          <p>Chào mừng bạn đến với</p>
          <p>Học Tiếng Trung Công Xưởng</p>
        </div>
      </div>

      {/* Notification Icon Right Side */}
      <button
        onClick={onNotificationClick}
        type="button"
        className="pt-0.5 pl-2 flex-shrink-0 cursor-pointer group"
        aria-label="Thông báo"
      >
        <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-xs group-active:scale-90 transition-transform relative">
          <Bell className="w-4.5 h-4.5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-400" />
        </div>
      </button>
    </div>
  );
};
