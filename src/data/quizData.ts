export interface QuizQuestion {
  id: string;
  category: 'all' | 'vocabulary' | 'grammar' | 'listening' | 'reading' | 'factory';
  mode: 'multiple-choice' | 'fill-blank' | 'ordering' | 'matching' | 'listening' | 'true-false';
  level: 'Dễ' | 'Trung bình' | 'Khó';
  hskLevel: string;
  promptText: string;
  questionChinese: string;
  questionPinyin: string;
  questionVietnamese?: string;
  options?: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  correctAnswer: string;
  explanation: string;
  relatedWords?: string[];
  audioText?: string;
  timeLimit?: number;
  xp: number;
  tags: string[];
  // Extra fields for non-multiple-choice modes
  sentenceParts?: string[];
  matchingPairs?: { left: string; right: string }[];
  acceptedAnswers?: string[];
}

export interface QuizCategory {
  id: string;
  name: string;
  iconName: 'all' | 'vocab' | 'grammar' | 'listening' | 'reading' | 'factory';
  gradient: string;
  questionCount: number;
}

export interface RecommendedLesson {
  id: string;
  title: string;
  questionCount: number;
  rating: number;
  iconName: 'book' | 'grammar' | 'headphones' | 'document';
  color: string;
  category: string;
}

export const QUIZ_CATEGORIES: QuizCategory[] = [
  {
    id: 'all',
    name: 'Tất cả',
    iconName: 'all',
    gradient: 'from-[#FF9800] to-[#F57C00]',
    questionCount: 100,
  },
  {
    id: 'vocabulary',
    name: 'Từ vựng',
    iconName: 'vocab',
    gradient: 'from-[#66BB6A] to-[#388E3C]',
    questionCount: 40,
  },
  {
    id: 'grammar',
    name: 'Ngữ pháp',
    iconName: 'grammar',
    gradient: 'from-[#AB47BC] to-[#7B1FA2]',
    questionCount: 25,
  },
  {
    id: 'listening',
    name: 'Nghe hiểu',
    iconName: 'listening',
    gradient: 'from-[#42A5F5] to-[#1E88E5]',
    questionCount: 20,
  },
  {
    id: 'reading',
    name: 'Đọc hiểu',
    iconName: 'reading',
    gradient: 'from-[#EC407A] to-[#C2185B]',
    questionCount: 15,
  },
];

export const RECOMMENDED_LESSONS: RecommendedLesson[] = [
  {
    id: 'rec-vocab',
    title: 'Từ vựng cơ bản',
    questionCount: 20,
    rating: 5,
    iconName: 'book',
    color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    category: 'vocabulary',
  },
  {
    id: 'rec-grammar',
    title: 'Ngữ pháp HSK 1',
    questionCount: 15,
    rating: 4,
    iconName: 'grammar',
    color: 'bg-purple-50 text-purple-600 border-purple-200',
    category: 'grammar',
  },
  {
    id: 'rec-listening',
    title: 'Nghe hiểu cơ bản',
    questionCount: 15,
    rating: 4,
    iconName: 'headphones',
    color: 'bg-blue-50 text-blue-600 border-blue-200',
    category: 'listening',
  },
  {
    id: 'rec-reading',
    title: 'Đọc hiểu ngắn',
    questionCount: 10,
    rating: 5,
    iconName: 'document',
    color: 'bg-pink-50 text-pink-600 border-pink-200',
    category: 'reading',
  },
];

export const INITIAL_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q-xuexi',
    category: 'vocabulary',
    mode: 'multiple-choice',
    level: 'Dễ',
    hskLevel: 'HSK 1',
    promptText: 'Chọn nghĩa đúng của từ sau:',
    questionChinese: '学习',
    questionPinyin: 'xuéxí',
    questionVietnamese: 'học tập, rèn luyện',
    options: [
      { id: 'opt-a', text: 'A. học tập', isCorrect: true },
      { id: 'opt-b', text: 'B. công việc', isCorrect: false },
      { id: 'opt-c', text: 'C. nói chuyện', isCorrect: false },
      { id: 'opt-d', text: 'D. ăn uống', isCorrect: false },
    ],
    correctAnswer: 'opt-a',
    explanation: '学习 (xuéxí) nghĩa là học tập, học hỏi hoặc rèn luyện kiến thức.',
    audioText: '学习',
    xp: 20,
    tags: ['Căn bản', 'HSK 1'],
  },
  {
    id: 'q-anquanmao',
    category: 'factory',
    mode: 'multiple-choice',
    level: 'Trung bình',
    hskLevel: 'HSK 3',
    promptText: 'Điền từ còn thiếu vào khoảng trống:',
    questionChinese: '工人在进入车间前必须戴____。',
    questionPinyin: 'Gōngrén zài jìnrù chējiān qián bìxū dài ____.',
    questionVietnamese: 'Trước khi vào xưởng, công nhân bắt buộc phải đội ____.',
    options: [
      { id: 'opt-a', text: 'A. 安全帽 (mũ bảo hộ)', isCorrect: true },
      { id: 'opt-b', text: 'B. 手套 (găng tay)', isCorrect: false },
      { id: 'opt-c', text: 'C. 口罩 (khẩu trang)', isCorrect: false },
      { id: 'opt-d', text: 'D. 工作服 (quần áo bảo hộ)', isCorrect: false },
    ],
    correctAnswer: 'opt-a',
    explanation: '安全帽 (ānquánmào) nghĩa là mũ bảo hộ và là trang bị an toàn bắt buộc khi vào phân xưởng.',
    audioText: '工人在进入车间前必须戴安全帽。',
    xp: 25,
    tags: ['Công xưởng', 'An toàn'],
  },
  {
    id: 'q-shengchanxian',
    category: 'factory',
    mode: 'multiple-choice',
    level: 'Trung bình',
    hskLevel: 'HSK 4',
    promptText: 'Chọn từ tiếng Trung tương ứng với nghĩa "Dây chuyền sản xuất":',
    questionChinese: 'Dây chuyền sản xuất',
    questionPinyin: 'dây chuyền sản xuất nhà máy',
    options: [
      { id: 'opt-a', text: 'A. 生产线 (shēngchǎnxiàn)', isCorrect: true },
      { id: 'opt-b', text: 'B. 机器 (jīqì)', isCorrect: false },
      { id: 'opt-c', text: 'C. 仓库 (cāngkù)', isCorrect: false },
      { id: 'opt-d', text: 'D. 质量 (zhìliàng)', isCorrect: false },
    ],
    correctAnswer: 'opt-a',
    explanation: '生产线 (shēngchǎnxiàn) là thuật ngữ chỉ dây chuyền sản xuất lắp ráp.',
    audioText: '生产线',
    xp: 25,
    tags: ['Công xưởng', 'Sản xuất'],
  },
  {
    id: 'q-kaiji',
    category: 'factory',
    mode: 'multiple-choice',
    level: 'Dễ',
    hskLevel: 'HSK 2',
    promptText: 'Từ "开机" (kāijī) có nghĩa là gì?',
    questionChinese: '开机',
    questionPinyin: 'kāijī',
    options: [
      { id: 'opt-a', text: 'A. Bật máy / Khởi động máy', isCorrect: true },
      { id: 'opt-b', text: 'B. Tắt máy', isCorrect: false },
      { id: 'opt-c', text: 'C. Sửa máy', isCorrect: false },
      { id: 'opt-d', text: 'D. Mua máy', isCorrect: false },
    ],
    correctAnswer: 'opt-a',
    explanation: '开机 (kāijī) kết hợp từ 开 (bật, mở) + 机 (máy), có nghĩa là khởi động hoặc bật máy.',
    audioText: '开机',
    xp: 20,
    tags: ['Thao tác', 'Máy móc'],
  },
  {
    id: 'q-listening-hao',
    category: 'listening',
    mode: 'listening',
    level: 'Dễ',
    hskLevel: 'HSK 1',
    promptText: 'Lắng nghe âm thanh và chọn chữ Hán đúng:',
    questionChinese: '🔊 Nghe audio',
    questionPinyin: 'Lắng nghe giọng đọc và chọn từ đúng:',
    options: [
      { id: 'opt-a', text: 'A. 好 (hǎo - tốt)', isCorrect: true },
      { id: 'opt-b', text: 'B. 号 (hào - số)', isCorrect: false },
      { id: 'opt-c', text: 'C. 喝 (hē - uống)', isCorrect: false },
      { id: 'opt-d', text: 'D. 和 (hé - và)', isCorrect: false },
    ],
    correctAnswer: 'opt-a',
    explanation: 'Từ phát âm trong audio là 好 (hǎo) có thanh 3.',
    audioText: '好',
    xp: 30,
    tags: ['Nghe hiểu', 'Phát âm'],
  },
  {
    id: 'q-truefalse-tingzhi',
    category: 'factory',
    mode: 'true-false',
    level: 'Dễ',
    hskLevel: 'HSK 2',
    promptText: 'Xác định câu sau Đúng hay Sai:',
    questionChinese: '紧急情况下，工人应该按“停止”按钮。',
    questionPinyin: 'Jǐnjí qíngkuàng xià, gōngrén yīnggāi àn "tíngzhǐ" ànniǔ.',
    questionVietnamese: 'Trong trường hợp khẩn cấp, công nhân nên nhấn nút "Dừng lại".',
    options: [
      { id: 'opt-true', text: 'Đúng', isCorrect: true },
      { id: 'opt-false', text: 'Sai', isCorrect: false },
    ],
    correctAnswer: 'opt-true',
    explanation: 'Đúng! Nhấn nút 停止 (ngừng) giúp đảm bảo an toàn tuyệt đối trong khu vực sản xuất.',
    audioText: '紧急情况下，工人应该按停止按钮。',
    xp: 20,
    tags: ['An toàn', 'Đúng/Sai'],
  },
];
