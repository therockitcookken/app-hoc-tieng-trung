export interface FeatureItem {
  id: string;
  title: string;
  subtitle: string;
  gradient: string;
  shadowColor: string;
  borderStyle?: string;
  iconName: 'mic' | 'book' | 'dictionary' | 'flashcard' | 'quiz';
  fullWidth?: boolean;
}

export const FEATURES: FeatureItem[] = [
  {
    id: 'phat-am',
    title: 'PHÁT ÂM',
    subtitle: 'Luyện phát âm chuẩn',
    gradient: 'from-[#FF3B30] via-[#EF3B32] to-[#FF6B3B]',
    shadowColor: 'rgba(239, 59, 50, 0.3)',
    iconName: 'mic',
  },
  {
    id: 'ngu-phap',
    title: 'NGỮ PHÁP',
    subtitle: 'Nắm vững ngữ pháp',
    gradient: 'from-[#2B7FFF] via-[#246BFD] to-[#1E52E8]',
    shadowColor: 'rgba(36, 107, 253, 0.3)',
    iconName: 'book',
  },
  {
    id: 'tu-dien',
    title: 'TỪ ĐIỂN',
    subtitle: 'Tra cứu từ vựng',
    gradient: 'from-[#34C759] via-[#28B849] to-[#1FB03E]',
    shadowColor: 'rgba(40, 184, 73, 0.3)',
    iconName: 'dictionary',
  },
  {
    id: 'flashcard',
    title: 'FLASHCARD',
    subtitle: 'Ghi nhớ từ vựng',
    gradient: 'from-[#BF5AF2] via-[#A73CEB] to-[#8F26E6]',
    shadowColor: 'rgba(167, 60, 235, 0.3)',
    iconName: 'flashcard',
  },
  {
    id: 'quiz',
    title: 'QUIZ',
    subtitle: 'Kiểm tra kiến thức',
    gradient: 'from-[#FFBD2E] via-[#FFA000] to-[#FF8A00]',
    shadowColor: 'rgba(255, 160, 0, 0.3)',
    iconName: 'quiz',
    fullWidth: true,
  },
];
