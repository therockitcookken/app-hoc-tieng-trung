import { GrammarCategory } from '../../types/grammar';

export const GRAMMAR_CATEGORIES_DATA: GrammarCategory[] = [
  {
    id: 'basic-structures',
    name: 'Cấu trúc câu cơ bản',
    description: 'Trật tự S+V+O, câu khẳng định, nghi vấn, phủ định HSK 1-2',
    color: 'bg-blue-500',
    iconName: 'Layout',
  },
  {
    id: 'particles',
    name: 'Trợ từ (的/地/得, 了/过/着)',
    description: 'Trợ từ kết cấu và trợ từ động thái biểu thị trạng thái hành động',
    color: 'bg-amber-500',
    iconName: 'Sparkles',
  },
  {
    id: 'complements',
    name: 'Hệ thống Bổ ngữ',
    description: 'Bổ ngữ kết quả, xu hướng, khả năng, trình độ, thời lượng',
    color: 'bg-emerald-500',
    iconName: 'ArrowRightCircle',
  },
  {
    id: 'special-sentences',
    name: 'Câu đặc biệt (把, 被, 比)',
    description: 'Câu chữ 把, câu bị động 被, câu so sánh 比, câu tồn hiện',
    color: 'bg-rose-500',
    iconName: 'Layers',
  },
  {
    id: 'complex-sentences',
    name: 'Liên từ & Câu phức',
    description: 'Biểu thị nguyên nhân-kết quả, điều kiện, nhượng bộ, mục đích',
    color: 'bg-purple-500',
    iconName: 'GitMerge',
  },
  {
    id: 'modal-verbs',
    name: 'Động từ năng nguyện',
    description: 'Cách dùng 会, 能, 可以, 要, 想, 应该, 必须',
    color: 'bg-indigo-500',
    iconName: 'Zap',
  },
  {
    id: 'factory-grammar',
    name: 'Ngữ pháp Công xưởng',
    description: 'Mẫu câu chỉ thị, thao tác, an toàn, báo cáo sự cố và KCS',
    color: 'bg-orange-500',
    iconName: 'Briefcase',
  },
];
