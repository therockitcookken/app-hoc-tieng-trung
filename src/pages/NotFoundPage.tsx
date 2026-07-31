import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChineseBackground } from '../components/ChineseBackground';
import { StatusBar } from '../components/StatusBar';
import { BottomNavigation } from '../components/BottomNavigation';
import { Home, AlertCircle } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-[390px] h-[100vh] sm:h-[844px] bg-[#D92329] sm:rounded-[28px] shadow-[0_25px_60px_-15px_rgba(200,20,20,0.5),0_0_0_1px_rgba(255,255,255,0.15)] flex flex-col justify-between relative overflow-hidden font-sans border-0 sm:border border-white/20">
      <ChineseBackground />

      <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col justify-between relative z-10">
        <div>
          <StatusBar />

          <div className="px-6 py-16 text-center text-white space-y-4">
            <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md mx-auto flex items-center justify-center border border-white/20 shadow-lg">
              <AlertCircle className="w-10 h-10 text-amber-300" />
            </div>

            <h1 className="text-4xl font-extrabold font-serif">404</h1>
            <h2 className="text-lg font-bold">Trang không tồn tại</h2>
            <p className="text-xs text-white/80 max-w-[260px] mx-auto leading-relaxed">
              Đường dẫn bạn vừa truy cập không khả dụng. Bạn có thể quay về Trang chủ bất cứ lúc nào.
            </p>

            <button
              onClick={() => navigate('/')}
              type="button"
              className="mt-4 bg-white text-[#D92329] font-extrabold text-xs px-6 py-2.5 rounded-full shadow-lg active:scale-95 transition-transform inline-flex items-center space-x-2 cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>Quay về Trang chủ</span>
            </button>
          </div>
        </div>

        <div className="h-3" />
      </div>

      <BottomNavigation activeTab="home" />
    </div>
  );
};
