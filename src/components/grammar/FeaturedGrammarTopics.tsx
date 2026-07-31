import React from 'react';
import { Flower2, ChevronRight } from 'lucide-react';
import { FEATURED_GRAMMAR_TOPICS, GrammarTopic } from '../../data/grammarData';

interface FeaturedGrammarTopicsProps {
  selectedTopicId: string;
  onSelectTopic: (topic: GrammarTopic) => void;
  onSeeAllClick?: () => void;
}

export const FeaturedGrammarTopics: React.FC<FeaturedGrammarTopicsProps> = ({
  selectedTopicId,
  onSelectTopic,
  onSeeAllClick,
}) => {
  return (
    <div className="w-full px-4 py-1.5 relative z-10">
      {/* Header Row */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-1.5">
          <Flower2 className="w-4 h-4 text-[#1E52E8] fill-[#1E52E8]/10" />
          <h2 className="text-[14px] font-extrabold text-[#242424] tracking-tight">
            Chủ điểm nổi bật
          </h2>
        </div>
        <button
          onClick={onSeeAllClick}
          type="button"
          className="text-[11px] text-[#666666] font-medium flex items-center hover:text-[#1E52E8] cursor-pointer"
        >
          <span>Xem tất cả</span>
          <ChevronRight className="w-3.5 h-3.5 text-[#999999]" />
        </button>
      </div>

      {/* Horizontal Scroll Cards */}
      <div className="flex items-center space-x-2.5 overflow-x-auto no-scrollbar py-1 px-0.5 scroll-smooth snap-x">
        {FEATURED_GRAMMAR_TOPICS.map((topic) => {
          const isSelected = selectedTopicId === topic.id;

          return (
            <button
              key={topic.id}
              onClick={() => onSelectTopic(topic)}
              type="button"
              className={`w-[130px] flex-shrink-0 bg-white rounded-2xl p-3 shadow-sm border text-left transition-all duration-150 active:scale-95 cursor-pointer relative snap-start ${
                isSelected ? 'border-blue-500 ring-2 ring-blue-500/30' : 'border-slate-100 hover:border-slate-200'
              }`}
            >
              {/* Number Badge Top-Left */}
              <div className={`w-5 h-5 rounded-lg ${topic.badgeBg} text-[11px] font-extrabold flex items-center justify-center mb-2 shadow-2xs`}>
                {topic.badgeNumber}
              </div>

              {/* Title */}
              <h3 className="text-[12px] font-extrabold text-[#242424] tracking-tight leading-tight truncate">
                {topic.title}
              </h3>

              {/* Subtitle */}
              <p className="text-[9.5px] text-[#777777] font-medium leading-tight mt-1 line-clamp-2 min-h-[24px]">
                {topic.subtitle}
              </p>

              {/* Lessons Progress Count & Percent */}
              <div className="mt-3 flex items-center justify-between text-[9.5px] font-bold text-[#555555]">
                <span>
                  <strong className="text-[#242424]">{topic.completedLessons}/{topic.totalLessons}</strong> bài học
                </span>
                <span className="text-[#1E52E8]">{topic.progressPercent}%</span>
              </div>

              {/* Mini Progress Bar */}
              <div className="w-full h-1.5 bg-slate-100 rounded-full mt-1.5 overflow-hidden">
                <div
                  className={`h-full ${topic.color} rounded-full transition-all duration-500`}
                  style={{ width: `${topic.progressPercent}%` }}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
