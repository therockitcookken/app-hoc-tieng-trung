export interface LessonItem {
  id: string;
  char: string;
  pinyin: string;
  meaning: string;
  level: 'Dễ' | 'Trung bình' | 'Khó';
  title: string;
  rating: number;
  lessonCount: number;
  gradient: string;
  badgeBg: string;
  score: number;
  soundText: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  symbol: string;
  gradient: string;
  isIcon?: boolean;
}

export const PRONUNCIATION_CATEGORIES: CategoryItem[] = [
  {
    id: 'vowels',
    name: 'Nguyên âm',
    symbol: 'a',
    gradient: 'from-[#FF5252] to-[#FF7A38]',
  },
  {
    id: 'consonants',
    name: 'Phụ âm',
    symbol: 'b',
    gradient: 'from-[#FFA726] to-[#FB8C00]',
  },
  {
    id: 'tones',
    name: 'Thanh điệu',
    symbol: 'ü',
    gradient: 'from-[#42A5F5] to-[#1E88E5]',
  },
  {
    id: 'words',
    name: 'Từ & cụm từ',
    symbol: '词',
    gradient: 'from-[#AB47BC] to-[#8E24AA]',
  },
  {
    id: 'favorites',
    name: 'Yêu thích',
    symbol: 'star',
    gradient: 'from-[#26A69A] to-[#00897B]',
    isIcon: true,
  },
];

export const RECOMMENDED_LESSONS: LessonItem[] = [
  {
    id: 'lesson-a',
    char: 'a',
    pinyin: 'ā',
    meaning: 'Nghĩa: âm a mở rộng khẩu hình',
    level: 'Dễ',
    title: 'Nguyên âm a',
    rating: 3,
    lessonCount: 12,
    gradient: 'from-[#FF5252] to-[#FF7A38]',
    badgeBg: 'bg-amber-100 text-amber-800',
    score: 95,
    soundText: 'a',
  },
  {
    id: 'lesson-o',
    char: 'o',
    pinyin: 'ō',
    meaning: 'Nghĩa: âm o tròn môi phát ra rõ',
    level: 'Dễ',
    title: 'Nguyên âm o',
    rating: 3,
    lessonCount: 12,
    gradient: 'from-[#FFA726] to-[#FB8C00]',
    badgeBg: 'bg-amber-100 text-amber-800',
    score: 90,
    soundText: 'o',
  },
  {
    id: 'lesson-zh',
    char: 'zh',
    pinyin: 'zhī',
    meaning: 'Nghĩa: âm zh uốn lưỡi bật hơi',
    level: 'Trung bình',
    title: 'Phụ âm zh',
    rating: 3,
    lessonCount: 15,
    gradient: 'from-[#42A5F5] to-[#1E88E5]',
    badgeBg: 'bg-blue-100 text-blue-800',
    score: 86,
    soundText: 'zhi',
  },
  {
    id: 'lesson-u',
    char: 'ü',
    pinyin: 'yū',
    meaning: 'Nghĩa: âm ü môi nhọn giữ khép',
    level: 'Khó',
    title: 'Nguyên âm ü',
    rating: 3,
    lessonCount: 10,
    gradient: 'from-[#AB47BC] to-[#8E24AA]',
    badgeBg: 'bg-purple-100 text-purple-800',
    score: 88,
    soundText: 'yu',
  },
  {
    id: 'lesson-e',
    char: 'e',
    pinyin: 'ē',
    meaning: 'Nghĩa: âm e phát âm trong cổ họng',
    level: 'Dễ',
    title: 'Nguyên âm e',
    rating: 4,
    lessonCount: 12,
    gradient: 'from-[#26A69A] to-[#00897B]',
    badgeBg: 'bg-[#E8F5E9] text-[#2E7D32]',
    score: 94,
    soundText: 'e',
  },
];

export const DEFAULT_PRACTICE: LessonItem = {
  id: 'lesson-hao',
  char: '好',
  pinyin: 'hǎo',
  meaning: 'Nghĩa: tốt, khỏe, được',
  level: 'Dễ',
  title: 'Từ vựng cơ bản - 好',
  rating: 5,
  lessonCount: 1,
  gradient: 'from-[#FF5252] to-[#FF7A38]',
  badgeBg: 'bg-amber-100 text-amber-800',
  score: 92,
  soundText: 'hǎo',
};

export const PRONUNCIATION_TIPS = [
  'Hãy chú ý đến khẩu hình miệng và lắng nghe cách người bản xứ phát âm nhé!',
  'Giữ thanh 1 cao và đều kéo dài âm tiết.',
  'Thanh 2 đi lên giống ngữ điệu khi bạn hỏi lại trong tiếng Việt.',
  'Thanh 3 xuống thấp nhất rồi nâng nhẹ giọng lên ở cuối.',
  'Âm ü giữ môi tròn nhỏ nhưng vị trí lưỡi đặt gần như phát âm i.',
];
