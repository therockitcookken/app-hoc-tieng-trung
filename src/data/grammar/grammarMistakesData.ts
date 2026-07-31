import { GrammarMistakeItem } from '../../types/grammar';

export const GRAMMAR_MISTAKES_DATA: GrammarMistakeItem[] = [
  {
    id: 'mistake-1',
    wrongSentence: '我是很高。',
    correctSentence: '我很高。',
    explanation: 'Trong tiếng Trung, trước tính từ làm vị ngữ không dùng động từ 是 (chỉ dùng phó từ chỉ mức độ như 很, 非常, 特别).',
    relatedPointTitle: 'Cấu trúc Chủ ngữ + Tính từ',
    hskLevel: 'HSK 1',
  },
  {
    id: 'mistake-2',
    wrongSentence: '我把机器没关。',
    correctSentence: '我没有把机器关掉。',
    explanation: 'Phó từ phủ định 没(有) hoặc 不 BẮT BUỘC phải đứng TRƯỚC chữ 把, không được đặt sau 把.',
    relatedPointTitle: 'Câu chữ 把',
    hskLevel: 'HSK 3',
  },
  {
    id: 'mistake-3',
    wrongSentence: '我学汉语在工厂。',
    correctSentence: '我在工厂学汉语。',
    explanation: 'Trạng ngữ chỉ địa điểm (在 + Địa điểm) phải đứng TRƯỚC động từ, không được đứng sau động từ như tiếng Việt.',
    relatedPointTitle: 'Trật tự từ chỉ địa điểm trong câu',
    hskLevel: 'HSK 1',
  },
  {
    id: 'mistake-4',
    wrongSentence: '他比我很高。',
    correctSentence: '他比我高 / 他比我高得多。',
    explanation: 'Trong câu so sánh chữ 比 không được dùng các phó từ chỉ mức độ như 很, 非常.',
    relatedPointTitle: 'Câu so sánh 比',
    hskLevel: 'HSK 2',
  },
  {
    id: 'mistake-5',
    wrongSentence: '我一机器买。',
    correctSentence: '我买了一台机器。',
    explanation: 'Khi danh từ đi với số từ bắt buộc phải có Lượng từ (台) phù hợp đứng giữa.',
    relatedPointTitle: 'Số từ + Lượng từ + Danh từ',
    hskLevel: 'HSK 1',
  },
];
