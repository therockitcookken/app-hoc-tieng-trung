import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChineseBackground } from '../components/ChineseBackground';
import { StatusBar } from '../components/StatusBar';
import { BottomNavigation } from '../components/BottomNavigation';
import { Home, AlertCircle } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-[#D92329] flex flex-col justify-between relative font-sans overflow-x-hidden">
      <ChineseBackground />

      <div className="responsive-container py-4 flex-1 flex flex-col justify-between relative z-10">
        <div>
          <StatusBar />

          <div className="px-6 py-20 text-center text-white space-y-4 max-w-md mx-auto">
            <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md mx-auto flex items-center justify-center border border-white/20 shadow-lg">
              <AlertCircle className="w-10 h-10 text-amber-300" />
            </div>

            <h1 className="text-5xl font-extrabold font-serif">404</h1>
            <h2 className="text-xl font-bold">Trang không tồn tại</h2>
            <p className="text-xs sm:text-sm text-white/80 max-w-[280px] mx-auto leading-relaxed">
              Đường dẫn bạn vừa truy cập không khả dụng. Bạn có thể quay về Trang chủ bất cứ lúc nào.
            </p>

            <button
              onClick={() => navigate('/')}
              type="button"
              className="mt-4 bg-white text-[#D92329] font-extrabold text-xs sm:text-sm px-6 py-3 rounded-full shadow-lg active:scale-95 transition-transform inline-flex items-center space-x-2 cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>Quay về Trang chủ</span>
            </button>
          </div>
        </div>

        <div className="h-4" />
      </div>

      <BottomNavigation activeTab="home" />
    </div>
  );
};
