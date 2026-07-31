import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
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

  // Dynamically measure actual rendered height of BottomNavigation and update CSS custom property --bottom-nav-height
  useEffect(() => {
    if (!navRef.current) return;

    const updateHeight = () => {
      if (navRef.current) {
        const height = navRef.current.getBoundingClientRect().height;
        document.documentElement.style.setProperty('--bottom-nav-height', `${Math.ceil(height)}px`);
        document.documentElement.style.setProperty('--mini-player-height', hasMiniPlayer ? '64px' : '0px');
      }
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(navRef.current);

    return () => resizeObserver.disconnect();
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

  // Dynamic Theme Glass styling for each route
  const getThemeStyles = () => {
    switch (activeTab) {
      case 'pronunciation':
        return {
          background: 'linear-gradient(180deg, rgba(185, 20, 30, 0.88) 0%, rgba(150, 10, 20, 0.98) 100%)',
          borderColor: 'rgba(255, 255, 255, 0.22)',
          inactiveText: 'text-white/70 hover:text-white',
          activeText: 'text-white font-extrabold',
          indicator: 'bg-amber-300 shadow-[0_0_10px_rgba(252,211,77,0.6)]',
          shadow: '0 -10px 30px rgba(100, 0, 10, 0.3)',
        };
      case 'grammar':
        return {
          background: 'linear-gradient(180deg, rgba(18, 60, 160, 0.88) 0%, rgba(12, 45, 130, 0.98) 100%)',
          borderColor: 'rgba(255, 255, 255, 0.22)',
          inactiveText: 'text-blue-100/70 hover:text-white',
          activeText: 'text-white font-extrabold',
          indicator: 'bg-amber-300 shadow-[0_0_10px_rgba(252,211,77,0.6)]',
          shadow: '0 -10px 30px rgba(10, 35, 100, 0.3)',
        };
      case 'dictionary':
        return {
          background: 'linear-gradient(180deg, rgba(20, 85, 30, 0.88) 0%, rgba(15, 65, 22, 0.98) 100%)',
          borderColor: 'rgba(255, 255, 255, 0.22)',
          inactiveText: 'text-emerald-100/70 hover:text-white',
          activeText: 'text-white font-extrabold',
          indicator: 'bg-amber-300 shadow-[0_0_10px_rgba(252,211,77,0.6)]',
          shadow: '0 -10px 30px rgba(10, 50, 15, 0.3)',
        };
      case 'flashcard':
      case 'flashcards':
        return {
          background: 'linear-gradient(180deg, rgba(110, 20, 150, 0.88) 0%, rgba(85, 12, 120, 0.98) 100%)',
          borderColor: 'rgba(255, 255, 255, 0.22)',
          inactiveText: 'text-purple-100/70 hover:text-white',
          activeText: 'text-white font-extrabold',
          indicator: 'bg-amber-300 shadow-[0_0_10px_rgba(252,211,77,0.6)]',
          shadow: '0 -10px 30px rgba(60, 10, 80, 0.3)',
        };
      case 'quiz':
        return {
          background: 'linear-gradient(180deg, rgba(210, 70, 0, 0.88) 0%, rgba(175, 50, 0, 0.98) 100%)',
          borderColor: 'rgba(255, 255, 255, 0.22)',
          inactiveText: 'text-amber-100/70 hover:text-white',
          activeText: 'text-white font-extrabold',
          indicator: 'bg-yellow-300 shadow-[0_0_10px_rgba(253,224,71,0.6)]',
          shadow: '0 -10px 30px rgba(120, 35, 0, 0.3)',
        };
      case 'settings':
        return {
          background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.92) 0%, rgba(10, 15, 30, 0.98) 100%)',
          borderColor: 'rgba(255, 255, 255, 0.15)',
          inactiveText: 'text-slate-400 hover:text-white',
          activeText: 'text-white font-extrabold',
          indicator: 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.6)]',
          shadow: '0 -10px 30px rgba(0, 0, 0, 0.4)',
        };
      case 'home':
      default:
        return {
          background: 'linear-gradient(180deg, rgba(145, 20, 25, 0.88) 0%, rgba(120, 10, 15, 0.98) 100%)',
          borderColor: 'rgba(255, 255, 255, 0.22)',
          inactiveText: 'text-red-100/70 hover:text-white',
          activeText: 'text-white font-extrabold',
          indicator: 'bg-amber-300 shadow-[0_0_10px_rgba(252,211,77,0.6)]',
          shadow: '0 -10px 30px rgba(80, 10, 15, 0.3)',
        };
    }
  };

  const theme = getThemeStyles();

  const tabs = [
    { id: 'home' as NavTab, path: '/', label: 'Trang chủ', icon: Home },
    { id: 'pronunciation' as NavTab, path: '/pronunciation', label: 'Phát âm', icon: Mic },
    { id: 'quiz' as NavTab, path: '/quiz', label: 'QUIZ', icon: Trophy },
    { id: 'grammar' as NavTab, path: '/grammar', label: 'Ngữ pháp', icon: BookOpen },
    { id: 'dictionary' as NavTab, path: '/dictionary', label: 'Từ điển', icon: BookMarked },
    { id: 'flashcard' as NavTab, path: '/flashcards', label: 'Flashcard', icon: Layers },
    { id: 'settings' as NavTab, path: '/settings', label: 'Cài đặt', icon: Settings },
  ];

  const handleTabClick = (tab: typeof tabs[0]) => {
    if (onTabChange) {
      onTabChange(tab.id);
    } else {
      navigate(tab.path);
    }
  };

  const navContent = (
    <div
      style={{
        position: 'fixed',
        bottom: '8px',
        left: 0,
        right: 0,
        zIndex: 50,
        pointerEvents: 'none',
        margin: 0,
        padding: '0 8px',
      }}
      className="w-full flex justify-center"
    >
      {/* Centered Floating Island Nav Bar matching exact app content surface width */}
      <div
        ref={navRef}
        style={{
          pointerEvents: 'auto',
          background: theme.background,
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: `1px solid ${theme.borderColor}`,
          boxShadow: theme.shadow,
          borderRadius: '24px',
        }}
        className="w-full max-w-[1380px] mx-auto pt-2 pb-[calc(0.4rem+env(safe-area-inset-bottom,0px))] px-2 sm:px-4 select-none transition-all duration-300 transform-gpu"
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
                className="flex flex-col items-center justify-center flex-1 py-1 group cursor-pointer transition-spring active:scale-90 relative"
              >
                {/* Icon Container */}
                <div className={`relative flex items-center justify-center mb-0.5 p-1 rounded-xl transition-all duration-200 ${isActive ? 'bg-white/15 scale-110 shadow-inner' : 'group-hover:bg-white/10'}`}>
                  <Icon
                    className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 ${
                      isActive
                        ? 'text-white stroke-[2.5] scale-105'
                        : `${theme.inactiveText} stroke-[1.8] group-hover:scale-105`
                    }`}
                  />
                </div>

                {/* Label */}
                <span
                  className={`text-[9px] sm:text-[11px] tracking-tight transition-all duration-200 ${
                    isActive
                      ? `${theme.activeText} scale-105`
                      : theme.inactiveText
                  }`}
                >
                  {tab.label}
                </span>

                {/* Active Indicator Bar */}
                {isActive && (
                  <div className={`w-4 sm:w-6 h-0.5 sm:h-1 rounded-full mt-0.5 ${theme.indicator} animate-pulse-slow`} />
                )}
              </button>
            );
          })}
        </div>

        {/* Mobile iOS Indicator Bar */}
        <div className="w-full flex justify-center pt-1 pb-0.5 sm:hidden">
          <div className="w-20 h-1 bg-white/30 rounded-full" />
        </div>
      </div>
    </div>
  );

  return createPortal(navContent, document.body);
};
