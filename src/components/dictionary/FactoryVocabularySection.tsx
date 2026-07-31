import React from 'react';
import { Plus, ChevronRight, MessageSquare, Home, Clock, ShoppingBag, Plane } from 'lucide-react';
import { VOCABULARY_TOPICS } from '../../data/dictionaryData';

interface FactoryVocabularySectionProps {
  onSelectTopic: (title: string) => void;
  onSeeAllClick?: () => void;
}

export const FactoryVocabularySection: React.FC<FactoryVocabularySectionProps> = ({
  onSelectTopic,
  onSeeAllClick,
}) => {
  const renderIcon = (icon: string) => {
    const iconProps = { className: "w-5 h-5 text-[#28B849]" };
    switch (icon) {
      case 'chat':
        return <MessageSquare {...iconProps} />;
      case 'home':
        return <Home className="w-5 h-5 text-amber-600" />;
      case 'clock':
        return <Clock className="w-5 h-5 text-blue-600" />;
      case 'bag':
        return <ShoppingBag className="w-5 h-5 text-purple-600" />;
      case 'plane':
        return <Plane className="w-5 h-5 text-teal-600" />;
      default:
        return <MessageSquare {...iconProps} />;
    }
  };

  const getBgColor = (icon: string) => {
    switch (icon) {
      case 'chat': return 'bg-emerald-50';
      case 'home': return 'bg-amber-50';
      case 'clock': return 'bg-blue-50';
      case 'bag': return 'bg-purple-50';
      case 'plane': return 'bg-teal-50';
      default: return 'bg-emerald-50';
    }
  };

  return (
    <div className="w-full px-4 py-1.5 relative z-10">
      {/* Header Row */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-1.5">
          <Plus className="w-4 h-4 text-[#28B849] stroke-[2.5]" />
          <h2 className="text-[14px] font-extrabold text-[#242424] tracking-tight">
            Chủ đề từ vựng
          </h2>
        </div>
        <button
          onClick={onSeeAllClick}
          type="button"
          className="text-[11px] text-[#666666] font-medium flex items-center hover:text-[#28B849] cursor-pointer"
        >
          <span>Xem tất cả</span>
          <ChevronRight className="w-3.5 h-3.5 text-[#999999]" />
        </button>
      </div>

      {/* Horizontal Scroll Cards */}
      <div className="flex items-center space-x-2.5 overflow-x-auto no-scrollbar py-1 px-0.5 scroll-smooth snap-x">
        {VOCABULARY_TOPICS.map((topic) => (
          <button
            key={topic.id}
            onClick={() => onSelectTopic(topic.title)}
            type="button"
            className="w-[105px] flex-shrink-0 bg-white rounded-2xl p-3 shadow-xs border border-slate-100 hover:border-slate-200 text-center flex flex-col items-center justify-between transition-all active:scale-95 cursor-pointer snap-start"
          >
            <div className={`w-11 h-11 rounded-2xl ${getBgColor(topic.icon)} flex items-center justify-center mb-2 shadow-2xs`}>
              {renderIcon(topic.icon)}
            </div>

            <div>
              <h3 className="text-[12px] font-extrabold text-[#242424] truncate">
                {topic.title}
              </h3>
              <span className="text-[9.5px] text-[#888888] font-medium block mt-0.5">
                {topic.count} từ
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
