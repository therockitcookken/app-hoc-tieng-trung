import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Sparkles, Send } from 'lucide-react';

interface PremiumPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  startIndex?: number;
  endIndex?: number;
  onPageChange: (page: number) => void;
  variant?: 'green' | 'red' | 'blue' | 'purple' | 'orange';
}

export const PremiumPagination: React.FC<PremiumPaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  startIndex,
  endIndex,
  onPageChange,
  variant = 'green',
}) => {
  const [jumpInput, setJumpInput] = useState('');

  if (totalPages <= 1) return null;

  // Variant Color Profiles
  const getVariantStyles = () => {
    switch (variant) {
      case 'red':
        return {
          deckBg: 'linear-gradient(135deg, rgba(60, 10, 15, 0.92) 0%, rgba(35, 5, 8, 0.96) 100%)',
          borderColor: 'rgba(239, 68, 68, 0.35)',
          activeBtn: 'btn-3d-red text-white shadow-[0_0_15px_rgba(239,68,68,0.6)]',
          badgeText: 'text-rose-300',
          accentColor: '#EF4444',
          shadow: '0 20px 40px -10px rgba(100, 0, 15, 0.4)',
        };
      case 'blue':
        return {
          deckBg: 'linear-gradient(135deg, rgba(15, 35, 80, 0.92) 0%, rgba(8, 20, 50, 0.96) 100%)',
          borderColor: 'rgba(59, 130, 246, 0.35)',
          activeBtn: 'btn-3d-blue text-white shadow-[0_0_15px_rgba(59,130,246,0.6)]',
          badgeText: 'text-blue-300',
          accentColor: '#3B82F6',
          shadow: '0 20px 40px -10px rgba(10, 30, 80, 0.4)',
        };
      case 'purple':
        return {
          deckBg: 'linear-gradient(135deg, rgba(45, 12, 65, 0.92) 0%, rgba(25, 6, 40, 0.96) 100%)',
          borderColor: 'rgba(168, 85, 247, 0.35)',
          activeBtn: 'btn-3d-purple text-white shadow-[0_0_15px_rgba(168,85,247,0.6)]',
          badgeText: 'text-purple-300',
          accentColor: '#A855F7',
          shadow: '0 20px 40px -10px rgba(50, 10, 70, 0.4)',
        };
      case 'orange':
        return {
          deckBg: 'linear-gradient(135deg, rgba(70, 25, 5, 0.92) 0%, rgba(40, 12, 0, 0.96) 100%)',
          borderColor: 'rgba(249, 115, 22, 0.35)',
          activeBtn: 'btn-3d-amber text-slate-900 shadow-[0_0_15px_rgba(249,115,22,0.6)]',
          badgeText: 'text-amber-300',
          accentColor: '#F97316',
          shadow: '0 20px 40px -10px rgba(80, 20, 0, 0.4)',
        };
      case 'green':
      default:
        return {
          deckBg: 'linear-gradient(135deg, rgba(16, 45, 25, 0.92) 0%, rgba(8, 28, 14, 0.96) 100%)',
          borderColor: 'rgba(52, 211, 153, 0.35)',
          activeBtn: 'btn-3d-amber text-slate-900 shadow-[0_0_15px_rgba(251,191,36,0.6)]',
          badgeText: 'text-emerald-300',
          accentColor: '#10B981',
          shadow: '0 20px 40px -10px rgba(5, 40, 20, 0.45)',
        };
    }
  };

  const theme = getVariantStyles();

  // Handle Quick Jump Submit
  const handleJumpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const p = parseInt(jumpInput, 10);
    if (!isNaN(p) && p >= 1 && p <= totalPages) {
      onPageChange(p);
      setJumpInput('');
    }
  };

  // Generate Page Numbers Array
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  const progressPercent = Math.round((currentPage / totalPages) * 100);

  return (
    <div className="w-full max-w-3xl mx-auto pt-4 pb-2 px-2 select-none">
      {/* Dynamic 3D Floating Glassmorphic Deck */}
      <div
        style={{
          background: theme.deckBg,
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: `1px solid ${theme.borderColor}`,
          boxShadow: `${theme.shadow}, inset 0 1px 1px rgba(255, 255, 255, 0.25)`,
        }}
        className="rounded-3xl p-3 sm:p-4 space-y-3 transition-all duration-300 transform-style-3d"
      >
        {/* Top Info Bar: Progress Indicator & Total Items */}
        <div className="flex items-center justify-between text-xs text-white/90 border-b border-white/10 pb-2 px-1">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-amber-300 animate-sparkle" />
            <span className="font-extrabold tracking-wide">
              Trang <span className={theme.badgeText}>{currentPage}</span> / {totalPages}
            </span>
            {totalItems !== undefined && (
              <span className="hidden sm:inline text-white/60 text-[11px]">
                ({startIndex !== undefined ? startIndex + 1 : 1} - {endIndex} của {totalItems} từ)
              </span>
            )}
          </div>

          {/* Progress Bar Gauge */}
          <div className="flex items-center space-x-2">
            <div className="w-20 sm:w-28 h-2 bg-black/40 rounded-full overflow-hidden border border-white/15 shadow-inner">
              <div
                className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-amber-400 to-amber-300 shadow-[0_0_8px_rgba(251,191,36,0.8)]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-[10px] font-black text-amber-300">{progressPercent}%</span>
          </div>
        </div>

        {/* Main Controls Row */}
        <div className="flex items-center justify-between space-x-1 sm:space-x-2">
          {/* First Page Button */}
          <button
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            type="button"
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
              currentPage === 1
                ? 'opacity-30 cursor-not-allowed text-white/40 bg-white/5'
                : 'bg-white/10 text-white hover:bg-white/20 active:scale-90 border border-white/15'
            }`}
            title="Trang đầu tiên"
          >
            <ChevronsLeft className="w-4 h-4" />
          </button>

          {/* Previous Page Button */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            type="button"
            className={`px-3 py-2 rounded-xl text-xs font-extrabold flex items-center space-x-1 transition-all cursor-pointer ${
              currentPage === 1
                ? 'opacity-30 cursor-not-allowed text-white/40 bg-white/5'
                : 'btn-3d-emerald text-white active:scale-95'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Trước</span>
          </button>

          {/* Numbered Page Buttons */}
          <div className="flex items-center space-x-1 sm:space-x-1.5 overflow-x-auto no-scrollbar py-0.5">
            {getPageNumbers().map((pg, idx) => {
              if (typeof pg === 'string') {
                return (
                  <span key={idx} className="px-1 text-xs text-white/40 font-bold select-none">
                    •••
                  </span>
                );
              }
              const isCurrent = pg === currentPage;
              return (
                <button
                  key={idx}
                  onClick={() => onPageChange(pg)}
                  type="button"
                  className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl text-xs font-extrabold flex items-center justify-center transition-all cursor-pointer ${
                    isCurrent
                      ? theme.activeBtn
                      : 'bg-white/10 text-white/90 hover:bg-white/25 border border-white/15 hover:border-white/30'
                  }`}
                >
                  {pg}
                </button>
              );
            })}
          </div>

          {/* Next Page Button */}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            type="button"
            className={`px-3 py-2 rounded-xl text-xs font-extrabold flex items-center space-x-1 transition-all cursor-pointer ${
              currentPage === totalPages
                ? 'opacity-30 cursor-not-allowed text-white/40 bg-white/5'
                : 'btn-3d-emerald text-white active:scale-95'
            }`}
          >
            <span className="hidden sm:inline">Sau</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Last Page Button */}
          <button
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            type="button"
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
              currentPage === totalPages
                ? 'opacity-30 cursor-not-allowed text-white/40 bg-white/5'
                : 'bg-white/10 text-white hover:bg-white/20 active:scale-90 border border-white/15'
            }`}
            title="Trang cuối cùng"
          >
            <ChevronsRight className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Quick Jump Input Widget */}
        <form onSubmit={handleJumpSubmit} className="flex items-center justify-center space-x-2 pt-1 border-t border-white/10">
          <span className="text-[11px] text-white/70 font-semibold">Nhảy nhanh tới trang:</span>
          <div className="relative flex items-center">
            <input
              type="number"
              min={1}
              max={totalPages}
              value={jumpInput}
              onChange={(e) => setJumpInput(e.target.value)}
              placeholder={`1-${totalPages}`}
              className="w-20 bg-black/30 border border-white/20 rounded-xl px-2.5 py-1 text-xs text-white placeholder:text-white/40 text-center font-bold focus:outline-none focus:border-amber-400"
            />
            <button
              type="submit"
              className="ml-1.5 p-1 bg-amber-400 hover:bg-amber-300 text-slate-900 rounded-lg cursor-pointer active:scale-90 transition-transform"
              title="Đi tới trang"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
