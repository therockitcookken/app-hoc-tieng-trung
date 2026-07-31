export interface QuizCategoryItem {
  id: string;
  name: string;
  description: string;
  iconName: string;
  color: string;
  badge?: string;
}

export const QUIZ_CATEGORIES_DATA: QuizCategoryItem[] = [
  {
    id: 'vocab-hsk',
    name: 'Từ vựng HSK 1–6',
    description: 'Trắc nghiệm nghĩa từ, Pinyin và chữ Hán HSK',
    iconName: 'BookOpen',
    color: 'bg-emerald-500',
    badge: '3000+ Câu',
  },
  {
    id: 'factory-quiz',
    name: 'Công xưởng & Nhà máy',
    description: 'Thiết bị, vận hành, an toàn lao động & KCS',
    iconName: 'Briefcase',
    color: 'bg-orange-500',
    badge: '800+ Câu',
  },
  {
    id: 'grammar-quiz',
    name: 'Ngữ pháp HSK',
    description: 'Cấu trúc câu 把, 被, 比, 的/地/得, 了/过/着',
    iconName: 'Layers',
    color: 'bg-blue-500',
    badge: '700+ Câu',
  },
  {
    id: 'pronunciation-quiz',
    name: 'Phát âm & Pinyin',
    description: 'Phân biệt phụ âm b/p, zh/ch/sh, z/c/s & 5 thanh điệu',
    iconName: 'Volume2',
    color: 'bg-purple-500',
    badge: '300+ Câu',
  },
  {
    id: 'listening-quiz',
    name: 'Nghe hiểu hội thoại',
    description: 'Nghe audio phát âm và chọn đáp án chính xác',
    iconName: 'Headphones',
    color: 'bg-rose-500',
    badge: '300+ Câu',
  },
  {
    id: 'mock-exam',
    name: 'Thi thử HSK Mô phỏng',
    description: 'Đề thi tổng hợp đo lường trình độ HSK 1 đến 6',
    iconName: 'Award',
    color: 'bg-amber-500',
    badge: '20 Đề thi',
  },
];
