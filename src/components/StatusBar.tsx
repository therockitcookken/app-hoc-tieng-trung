import React from 'react';
import { Wifi, Signal } from 'lucide-react';

export const StatusBar: React.FC = () => {
  return (
    <header className="w-full pt-3 pb-1 px-6 flex items-center justify-between text-white font-medium text-[14px] select-none tracking-tight">
      {/* Time */}
      <span className="font-semibold text-[15px] tracking-tight">9:41</span>

      {/* Status Icons */}
      <div className="flex items-center space-x-1.5">
        <Signal className="w-4 h-4 fill-current stroke-none" />
        <Wifi className="w-4 h-4" strokeWidth={2.5} />
        
        {/* iOS style battery icon */}
        <div className="w-[22px] h-[11.5px] border-[1.5px] border-white rounded-[4px] p-[1.5px] flex items-center relative ml-0.5">
          <div className="bg-white w-full h-full rounded-[1.5px]" />
          <div className="absolute -right-[3.5px] top-[2.5px] w-[2px] h-[4px] bg-white rounded-r-[1px]" />
        </div>
      </div>
    </header>
  );
};
