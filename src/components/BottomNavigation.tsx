import React, { useEffect, useRef } from 'react';
import { Home, Mic, Trophy, BookOpen, BookMarked, Layers, Settings } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export type NavTab = 'home' | 'pronunciation' | 'quiz' | 'grammar' | 'dictionary' | 'flashcard' | 'flashcards' | 'settings';

interface BottomNavigationProps {
  activeTab?: NavTab;
  onTabChange?: (tab: NavTab) => void;
  hasMiniPlayer?: boolean;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab: overrideTab,
  onTabChange,
  hasMiniPlayer = false,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const navRef = useRef<HTMLDivElement>(null);

  // Update CSS custom property --bottom-nav-height dynamically based on rendered height
  useEffect(() => {
    if (navRef.current) {
      const height = navRef.current.getBoundingClientRect().height;
      document.documentElement.style.setProperty('--bottom-nav-height', `${height}px`);
      document.documentElement.style.setProperty('--mini-player-height', hasMiniPlayer ? '64px' : '0px');
    }
  }, [hasMiniPlayer]);

  // Determine current active tab automatically based on route if override not supplied
  const getActiveTab = (): NavTab => {
    if (overrideTab) return overrideTab;
    const path = location.pathname;
    if (path === '/pronunciation') return 'pronunciation';
    if (path === '/quiz') return 'quiz';
    if (path === '/grammar') return 'grammar';
    if (path === '/dictionary') return 'dictionary';
    if (path === '/flashcards' || path === '/flashcard') return 'flashcard';
    if (path === '/settings') return 'settings';
    return 'home';
  };

  const activeTab = getActiveTab();

  const tabs = [
    { id: 'home' as NavTab, path: '/', label: 'Trang chủ', icon: Home, colorClass: 'text-[#EF3B32]' },
    { id: 'pronunciation' as NavTab, path: '/pronunciation', label: 'Phát âm', icon: Mic, colorClass: 'text-[#EF3B32]' },
    { id: 'quiz' as NavTab, path: '/quiz', label: 'QUIZ', icon: Trophy, colorClass: 'text-[#F57C00]' },
    { id: 'grammar' as NavTab, path: '/grammar', label: 'Ngữ pháp', icon: BookOpen, colorClass: 'text-[#1E52E8]' },
    { id: 'dictionary' as NavTab, path: '/dictionary', label: 'Từ điển', icon: BookMarked, colorClass: 'text-[#28B849]' },
    { id: 'flashcard' as NavTab, path: '/flashcards', label: 'Flashcard', icon: Layers, colorClass: 'text-[#8E24AA]' },
    { id: 'settings' as NavTab, path: '/settings', label: 'Cài đặt', icon: Settings, colorClass: 'text-slate-700' },
  ];

  const handleTabClick = (tab: typeof tabs[0]) => {
    if (onTabChange) {
      onTabChange(tab.id);
    } else {
      navigate(tab.path);
    }
  };

  return (
    <div
      ref={navRef}
      className="fixed bottom-0 left-0 right-0 z-40 w-full bg-white/95 backdrop-blur-md border-t border-slate-200/90 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] px-2 sm:px-4 select-none shadow-[0_-6px_25px_rgba(0,0,0,0.09)]"
    >
      {/* 7 Tabs Row Container */}
      <div className="flex items-center justify-around max-w-5xl mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive =
            activeTab === tab.id ||
            (activeTab === 'flashcards' && tab.id === 'flashcard');

          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab)}
              type="button"
              className="flex flex-col items-center justify-center flex-1 py-1 group cursor-pointer transition-all duration-150 active:scale-95 relative"
            >
              {/* Icon Container */}
              <div className="relative flex items-center justify-center mb-0.5">
                <Icon
                  className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-200 ${
                    isActive
                      ? `${tab.colorClass} stroke-[2.4]`
                      : 'text-[#8E8E93] stroke-[1.8] group-hover:text-slate-600'
                  }`}
                />
              </div>

              {/* Label */}
              <span
                className={`text-[9px] sm:text-[11px] tracking-tight transition-colors duration-200 ${
                  isActive
                    ? `${tab.colorClass} font-bold`
                    : 'text-[#8E8E93] font-medium group-hover:text-slate-600'
                }`}
              >
                {tab.label}
              </span>

              {/* Active Indicator Bar */}
              {isActive && (
                <div className={`w-4 sm:w-6 h-0.5 sm:h-1 rounded-full mt-0.5 bg-current ${tab.colorClass}`} />
              )}
            </button>
          );
        })}
      </div>

      {/* Mobile iOS Indicator Bar */}
      <div className="w-full flex justify-center pt-1 pb-0.5 sm:hidden">
        <div className="w-24 h-1 bg-slate-200 rounded-full" />
      </div>
    </div>
  );
};
