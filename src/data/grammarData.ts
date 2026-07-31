export interface GrammarTopic {
  id: string;
  badgeNumber: number;
  title: string;
  subtitle: string;
  completedLessons: number;
  totalLessons: number;
  progressPercent: number;
  color: string;
  badgeBg: string;
}

export interface GrammarCategory {
  id: string;
  name: string;
  iconName: 'all' | 'basic' | 'intermediate' | 'advanced' | 'favorites';
  gradient: string;
}

export interface GrammarLesson {
  id: string;
  title: string;
  subtitle: string;
  hsk: string;
  level: 'Cơ bản' | 'Trung cấp' | 'Nâng cao';
  levelBg: string;
  lessonCount: number;
  formulaShort: string;
  progressPercent: number;
  gradient: string;
  charSymbol?: string;
  pinyin?: string;
  meaning?: string;
  formula?: string;
  exampleSentence?: string;
  examplePinyin?: string;
  exampleMeaning?: string;
  structureParts?: { word: string; role: string; color: string }[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface GrammarMistake {
  id: number;
  wrongSentence: string;
  correctSentence: string;
  explanation: string;
}

export const GRAMMAR_CATEGORIES: GrammarCategory[] = [
  {
    id: 'all',
    name: 'Tất cả',
    iconName: 'all',
    gradient: 'from-[#42A5F5] to-[#1E88E5]',
  },
  {
    id: 'basic',
    name: 'Cơ bản',
    iconName: 'basic',
    gradient: 'from-[#66BB6A] to-[#388E3C]',
  },
  {
    id: 'intermediate',
    name: 'Trung cấp',
    iconName: 'intermediate',
    gradient: 'from-[#FFA726] to-[#F57C00]',
  },
  {
    id: 'advanced',
    name: 'Nâng cao',
    iconName: 'advanced',
    gradient: 'from-[#AB47BC] to-[#7B1FA2]',
  },
  {
    id: 'favorites',
    name: 'Yêu thích',
    iconName: 'favorites',
    gradient: 'from-[#EC407A] to-[#C2185B]',
  },
];

export const FEATURED_GRAMMAR_TOPICS: GrammarTopic[] = [
  {
    id: 'affirmative',
    badgeNumber: 1,
    title: 'Câu khẳng định',
    subtitle: 'Tổng hợp kiến thức cơ bản',
    completedLessons: 18,
    totalLessons: 24,
    progressPercent: 75,
    color: 'bg-blue-500',
    badgeBg: 'bg-blue-500 text-white',
  },
  {
    id: 'negative',
    badgeNumber: 2,
    title: 'Câu phủ định',
    subtitle: 'Cách sử dụng 不, 没',
    completedLessons: 14,
    totalLessons: 20,
    progressPercent: 70,
    color: 'bg-emerald-500',
    badgeBg: 'bg-emerald-500 text-white',
  },
  {
    id: 'interrogative',
    badgeNumber: 3,
    title: 'Câu nghi vấn',
    subtitle: 'Cấu trúc và cách dùng',
    completedLessons: 12,
    totalLessons: 20,
    progressPercent: 60,
    color: 'bg-amber-500',
    badgeBg: 'bg-amber-500 text-white',
  },
  {
    id: 'particles',
    badgeNumber: 4,
    title: 'Trợ từ',
    subtitle: '的, 得, 地',
    completedLessons: 8,
    totalLessons: 16,
    progressPercent: 50,
    color: 'bg-purple-500',
    badgeBg: 'bg-purple-500 text-white',
  },
];

export const RECOMMENDED_GRAMMAR_LESSONS: GrammarLesson[] = [
  {
    id: 'pronouns',
    title: 'Đại từ nhân xưng',
    subtitle: 'Tôi, bạn, anh ấy, cô ấy...',
    hsk: 'HSK 1',
    level: 'Cơ bản',
    levelBg: 'bg-[#E8F5E9] text-[#2E7D32]',
    lessonCount: 15,
    formulaShort: 'Tôi, bạn, anh ấy...',
    progressPercent: 80,
    gradient: 'from-[#42A5F5] to-[#1E88E5]',
    pinyin: 'wǒ, nǐ, tā...',
    meaning: 'Các đại từ cơ bản trong tiếng Trung',
    formula: 'Chủ ngữ = 我 / 你 / 他 / 她 / 它',
    exampleSentence: '我是学生。',
    examplePinyin: 'Wǒ shì xuésheng.',
    exampleMeaning: 'Tôi là học sinh.',
    structureParts: [
      { word: '我', role: 'Chủ ngữ (S)', color: 'bg-blue-100 text-blue-800' },
      { word: '是', role: 'Động từ (V)', color: 'bg-green-100 text-green-800' },
      { word: '学生', role: 'Tân ngữ (O)', color: 'bg-purple-100 text-purple-800' },
    ],
  },
  {
    id: 'present-simple',
    title: 'Thì hiện tại đơn',
    subtitle: 'Cấu trúc và cách sử dụng',
    hsk: 'HSK 1',
    level: 'Trung cấp',
    levelBg: 'bg-amber-100 text-amber-800',
    lessonCount: 18,
    formulaShort: 'Chủ ngữ + Động từ + Tân ngữ',
    progressPercent: 65,
    gradient: 'from-[#FFA726] to-[#F57C00]',
    pinyin: 'Chủ ngữ + Động từ + Tân ngữ',
    meaning: 'Diễn tả hành động diễn ra ở hiện tại',
    formula: 'S + V + O',
    exampleSentence: '我天天学汉语。',
    examplePinyin: 'Wǒ tiāntiān xué Hànyǔ.',
    exampleMeaning: 'Tôi học tiếng Trung mỗi ngày.',
    structureParts: [
      { word: '我', role: 'Chủ ngữ', color: 'bg-blue-100 text-blue-800' },
      { word: '天天', role: 'Trạng ngữ chỉ thời gian', color: 'bg-[#FFF3E0] text-[#E65100]' },
      { word: '学', role: 'Động từ', color: 'bg-green-100 text-green-800' },
      { word: '汉语', role: 'Tân ngữ', color: 'bg-purple-100 text-purple-800' },
    ],
  },
  {
    id: 'comparisons',
    title: 'Câu so sánh',
    subtitle: 'So sánh hơn, bằng, nhất',
    hsk: 'HSK 2',
    level: 'Nâng cao',
    levelBg: 'bg-pink-100 text-pink-800',
    lessonCount: 20,
    formulaShort: 'A + 比 + B + Tính từ',
    progressPercent: 45,
    gradient: 'from-[#EC407A] to-[#C2185B]',
    pinyin: 'A bǐ B + Adj',
    meaning: 'So sánh mức độ giữa A và B',
    formula: 'A + 比 + B + Tính từ',
    exampleSentence: '哥哥比我高。',
    examplePinyin: 'Gēge bǐ wǒ gāo.',
    exampleMeaning: 'Anh trai cao hơn tôi.',
    structureParts: [
      { word: '哥哥', role: 'Đối tượng A', color: 'bg-blue-100 text-blue-800' },
      { word: '比', role: 'Giới từ so sánh', color: 'bg-pink-100 text-pink-800' },
      { word: '我', role: 'Đối tượng B', color: 'bg-purple-100 text-purple-800' },
      { word: '高', role: 'Tính từ', color: 'bg-green-100 text-green-800' },
    ],
  },
];

export const DEFAULT_TODAY_GRAMMAR: GrammarLesson = {
  id: 'yibian-yibian',
  title: 'Cấu trúc 一边…一边…',
  subtitle: 'Diễn tả 2 hành động diễn ra song song',
  hsk: 'HSK 2',
  level: 'Trung cấp',
  levelBg: 'bg-amber-100 text-amber-800',
  lessonCount: 1,
  formulaShort: 'S + 一边 + V1 + 一边 + V2',
  progressPercent: 60,
  gradient: 'from-[#2570F0] to-[#1E52E8]',
  charSymbol: '一边',
  pinyin: 'yìbiān… yìbiān…',
  meaning: 'Vừa… vừa…',
  formula: 'Chủ ngữ + 一边 + Động từ 1 + 一边 + Động từ 2',
  exampleSentence: '我一边听音乐，一边学习。',
  examplePinyin: 'Wǒ yìbiān tīng yīnyuè, yìbiān xuéxí.',
  exampleMeaning: 'Tôi vừa nghe nhạc vừa học bài.',
  structureParts: [
    { word: '我', role: 'Chủ ngữ (S)', color: 'bg-blue-100 text-blue-800' },
    { word: '一边', role: 'Liên từ 1', color: 'bg-amber-100 text-amber-800' },
    { word: '听音乐', role: 'Hành động 1 (V1)', color: 'bg-green-100 text-green-800' },
    { word: '一边', role: 'Liên từ 2', color: 'bg-amber-100 text-amber-800' },
    { word: '学习', role: 'Hành động 2 (V2)', color: 'bg-purple-100 text-purple-800' },
  ],
};

export const QUICK_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: '我___吃饭，___看电视。',
    options: ['A. 一边 / 一边', 'B. 因为 / 所以', 'C. 虽然 / 但是', 'D. 越 / 越'],
    correctIndex: 0,
    explanation: 'Đáp án A đúng. Cấu trúc 一边…一边… diễn tả vừa ăn cơm vừa xem tivi.',
  },
  {
    id: 2,
    question: '他是老师，___是学生。',
    options: ['A. 不是', 'B. 没有', 'C. 不会', 'D. 不在'],
    correctIndex: 0,
    explanation: 'Đáp án A đúng. Phủ định câu 是 dùng 不 (不是).',
  },
  {
    id: 3,
    question: '___下雨，___我们不出门。',
    options: ['A. 因为 / 所以', 'B. 虽然 / 但是', 'C. 一边 / 一边', 'D. 如果 / 就'],
    correctIndex: 0,
    explanation: 'Đáp án A đúng. Cấu trúc 因为…所以… chỉ nguyên nhân kết quả.',
  },
  {
    id: 4,
    question: '___汉语很难，___我非常喜欢。',
    options: ['A. 虽然 / 但是', 'B. 因为 / 所以', 'C. 不但 / 而且', 'D. 只要 / 就'],
    correctIndex: 0,
    explanation: 'Đáp án A đúng. Cấu trúc 虽然… profit… (Tuy… nhưng…) biểu thị nhượng bộ.',
  },
  {
    id: 5,
    question: '请___书打开。',
    options: ['A. 把', 'B. 被', 'C. 比', 'D. 给'],
    correctIndex: 0,
    explanation: 'Đáp án A đúng. Cấu trúc câu chữ 把 tác động làm thay đổi trạng thái của tân ngữ.',
  },
  {
    id: 6,
    question: '桌子上___一本书。',
    options: ['A. 有', 'B. 是', 'C. 在', 'D. 要'],
    correctIndex: 0,
    explanation: 'Đáp án A đúng. Câu chỉ vị trí tồn tại dùng Động từ 有.',
  },
  {
    id: 7,
    question: '他___我高。',
    options: ['A. 比', 'B. 把', 'C. 被', 'D. 和'],
    correctIndex: 0,
    explanation: 'Đáp án A đúng. Cấu trúc câu so sánh A 比 B + Adj.',
  },
  {
    id: 8,
    question: '你去___不去？',
    options: ['A. 还是', 'B. 不', 'C. 没', 'D. 吗'],
    correctIndex: 1,
    explanation: 'Đáp án B đúng. Câu hỏi chính phản V + 不 + V (去不去).',
  },
  {
    id: 9,
    question: '这___书是我的。',
    options: ['A. 本', 'B. 个', 'C. 只', 'D. 张'],
    correctIndex: 0,
    explanation: 'Đáp án A đúng. Lượng từ dành cho sách là 本 (běn).',
  },
  {
    id: 10,
    question: '我___在学习汉语。',
    options: ['A. 正', 'B. 就', 'C. 才', 'D. 都'],
    correctIndex: 0,
    explanation: 'Đáp án A đúng. 正在 / 正…在… diễn tả hành động đang tiếp diễn.',
  },
];

export const COMMON_GRAMMAR_MISTAKES: GrammarMistake[] = [
  {
    id: 1,
    wrongSentence: '我一边学习和一边听音乐。',
    correctSentence: '我一边学习，一边听音乐。',
    explanation: 'Không dùng 和 giữa hai vế của cấu trúc 一边…一边…',
  },
  {
    id: 2,
    wrongSentence: '我不有钱。',
    correctSentence: '我没有钱。',
    explanation: 'Phủ định của 有 bắt buộc phải dùng 没 (没有), tuyệt đối không dùng 不.',
  },
  {
    id: 3,
    wrongSentence: '我是很高。',
    correctSentence: '很高。 / 我很高。',
    explanation: 'Không dùng 是 trước tính từ trừ khi biểu thị sự nhấn mạnh đặc biệt.',
  },
  {
    id: 4,
    wrongSentence: '他比我很高。',
    correctSentence: '他比我高。',
    explanation: 'Trong câu so sánh 比 không dùng các phó từ chỉ mức độ như 很, 非常.',
  },
  {
    id: 5,
    wrongSentence: '我把饭吃了在桌子上。',
    correctSentence: '我把饭在桌子上吃了。',
    explanation: 'Trạng ngữ chỉ địa điểm phải đứng trước động từ trong câu chữ 把.',
  },
];

export const GRAMMAR_TIPS = [
  'Hãy ghi nhớ cấu trúc bằng một câu ví dụ gắn với hoạt động hằng ngày của bạn.',
  'Luôn ghi nhớ cấu trúc cùng một câu ví dụ ngắn gọn dễ thuộc.',
  'Đánh dấu rõ vị trí Chủ ngữ (S), Động từ (V) và Tân ngữ (O) trong câu.',
  'So sánh các cấu trúc gần giống nhau (như 不 và 没) để tránh nhầm lẫn.',
  'Luyện tập đặt 3 câu mới ngay khi học xong một cấu trúc ngữ pháp.',
];
