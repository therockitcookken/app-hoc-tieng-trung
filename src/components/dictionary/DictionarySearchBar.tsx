import React from 'react';
import { Search, Mic, X } from 'lucide-react';

interface DictionarySearchBarProps {
  value: string;
  onChange: (val: string) => void;
  onSearch: () => void;
  onVoiceClick: () => void;
}

export const DictionarySearchBar: React.FC<DictionarySearchBarProps> = ({
  value,
  onChange,
  onSearch,
  onVoiceClick,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="w-full px-4 py-2 relative z-10">
      <div className="bg-white rounded-full px-3.5 py-2.5 shadow-[0_6px_20px_rgba(0,0,0,0.08)] flex items-center space-x-2 border border-white/90 relative">
        {/* Search Icon */}
        <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />

        {/* Input */}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Nhập từ vựng, pinyin hoặc nghĩa tiếng Việt..."
          className="flex-1 bg-transparent text-[12.5px] font-medium text-slate-900 placeholder:text-slate-400 outline-none border-none min-w-0"
        />

        {/* Clear Button if typed */}
        {value && (
          <button
            onClick={() => onChange('')}
            type="button"
            className="p-1 text-slate-400 hover:text-slate-600 rounded-full cursor-pointer"
            aria-label="Xóa nội dung"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Microphone Voice Button */}
        <button
          onClick={onVoiceClick}
          type="button"
          className="p-1.5 text-slate-500 hover:text-[#28B849] rounded-full active:scale-90 transition-transform cursor-pointer"
          aria-label="Tìm kiếm bằng giọng nói"
        >
          <Mic className="w-4.5 h-4.5" />
        </button>
      </div>
    </div>
  );
};
