import React from 'react';

interface StructurePart {
  word: string;
  role: string;
  color: string;
}

interface GrammarStructureAnalysisProps {
  parts?: StructurePart[];
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export const GrammarStructureAnalysis: React.FC<GrammarStructureAnalysisProps> = ({
  parts = [
    { word: '我', role: 'Chủ ngữ (S)', color: 'bg-blue-100 text-blue-900 border-blue-200' },
    { word: '一边', role: 'Liên từ 1', color: 'bg-amber-100 text-amber-900 border-amber-200' },
    { word: '听音乐', role: 'Hành động 1 (V1)', color: 'bg-emerald-100 text-emerald-900 border-emerald-200' },
    { word: '一边', role: 'Liên từ 2', color: 'bg-amber-100 text-amber-900 border-amber-200' },
    { word: '学习', role: 'Hành động 2 (V2)', color: 'bg-purple-100 text-purple-900 border-purple-200' },
  ],
  isExpanded,
  onToggleExpand,
}) => {
  return (
    <div className="w-full mt-3 bg-slate-50 border border-slate-200/80 rounded-xl p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[11.5px] font-extrabold text-[#242424] tracking-tight">
          Phân tích cấu trúc câu
        </span>
        <button
          onClick={onToggleExpand}
          type="button"
          className="text-[10px] text-[#1E52E8] font-bold hover:underline cursor-pointer"
        >
          {isExpanded ? 'Thu gọn ▲' : 'Xem giải thích ▼'}
        </button>
      </div>

      {/* Colored Sentence Block Row */}
      <div className="flex flex-wrap gap-1.5 pt-1">
        {parts.map((p, idx) => (
          <div
            key={idx}
            className={`px-2.5 py-1.5 rounded-lg border text-center font-serif text-[15px] font-bold shadow-2xs ${p.color}`}
          >
            <div>{p.word}</div>
            <div className="text-[9px] font-sans font-medium opacity-85 mt-0.5">
              {p.role}
            </div>
          </div>
        ))}
      </div>

      {/* Expanded Detailed Breakdown */}
      {isExpanded && (
        <div className="pt-2 border-t border-slate-200/60 space-y-1 text-[10.5px] text-slate-700 leading-relaxed font-medium animate-fade-in">
          <p><strong className="text-blue-800">我 (Wǒ):</strong> Chủ ngữ thực hiện hai hành động.</p>
          <p><strong className="text-amber-800">一边…一边…:</strong> Phụ từ/Liên từ biểu thị hai hành động xảy ra cùng một thời điểm.</p>
          <p><strong className="text-emerald-800">听音乐 (Tīng yīnyuè):</strong> Động từ thứ nhất (Nghe nhạc).</p>
          <p><strong className="text-purple-800">学习 (Xuéxí):</strong> Động từ thứ hai (Học bài).</p>
        </div>
      )}
    </div>
  );
};
