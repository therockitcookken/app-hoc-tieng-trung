export interface FlashcardItem {
  id: string;
  simplified: string;
  traditional?: string;
  pinyin: string;
  vietnamese: string;
  partOfSpeech: string;
  exampleChinese: string;
  examplePinyin: string;
  exampleVietnamese: string;
  category: 'all' | 'factory' | 'greetings' | 'hsk' | 'favorites' | 'recent';
  deckId: string;
  hskLevel: string;
  difficulty: 'Dễ' | 'Đang học' | 'Khó';
  tags: string[];
  audioText: string;
  note?: string;
  isFavorite?: boolean;
  reviewState: 'learned' | 'learning' | 'unlearned' | 'difficult';
  repetition: number;
  interval: number;
  easeFactor: number;
  lastReviewedAt?: string;
}

export interface FlashcardDeck {
  id: string;
  name: string;
  description: string;
  icon: string;
  gradient: string;
  totalCards: number;
  masteredCards: number;
  dueCards: number;
  progressPercent: number;
  category: string;
}

export interface FlashcardCategory {
  id: string;
  name: string;
  iconName: 'all' | 'learned' | 'unlearned' | 'favorites' | 'recent';
  gradient: string;
}

export const FLASHCARD_CATEGORIES: FlashcardCategory[] = [
  {
    id: 'all',
    name: 'Tất cả',
    iconName: 'all',
    gradient: 'from-[#AB47BC] to-[#7B1FA2]',
  },
  {
    id: 'learned',
    name: 'Đã học',
    iconName: 'learned',
    gradient: 'from-[#66BB6A] to-[#388E3C]',
  },
  {
    id: 'unlearned',
    name: 'Chưa học',
    iconName: 'unlearned',
    gradient: 'from-[#FFA726] to-[#F57C00]',
  },
  {
    id: 'favorites',
    name: 'Yêu thích',
    iconName: 'favorites',
    gradient: 'from-[#EC407A] to-[#C2185B]',
  },
  {
    id: 'recent',
    name: 'Gần đây',
    iconName: 'recent',
    gradient: 'from-[#42A5F5] to-[#1E88E5]',
  },
];

export const FLASHCARD_DECKS: FlashcardDeck[] = [
  {
    id: 'deck-factory',
    name: 'Từ vựng công xưởng',
    description: 'Từ vựng sản xuất, máy móc & an toàn',
    icon: 'factory',
    gradient: 'from-[#AB47BC] to-[#7B1FA2]',
    totalCards: 45,
    masteredCards: 36,
    dueCards: 9,
    progressPercent: 80,
    category: 'factory',
  },
  {
    id: 'deck-safety',
    name: 'An toàn lao động',
    description: 'Các quy định & cảnh báo nguy hiểm',
    icon: 'shield',
    gradient: 'from-[#66BB6A] to-[#388E3C]',
    totalCards: 30,
    masteredCards: 22,
    dueCards: 8,
    progressPercent: 73,
    category: 'factory',
  },
  {
    id: 'deck-[#machinery]',
    name: 'Máy móc thiết bị',
    description: 'Tên các thiết bị & công cụ nhà máy',
    icon: 'cpu',
    gradient: 'from-[#FFA726] to-[#F57C00]',
    totalCards: 28,
    masteredCards: 20,
    dueCards: 8,
    progressPercent: 71,
    category: 'factory',
  },
  {
    id: 'deck-qc',
    name: 'Kiểm tra chất lượng',
    description: 'Tiêu chuẩn KCS & phân loại hàng',
    icon: 'check-circle',
    gradient: 'from-[#42A5F5] to-[#1E88E5]',
    totalCards: 25,
    masteredCards: 18,
    dueCards: 7,
    progressPercent: 72,
    category: 'factory',
  },
  {
    id: 'deck-greetings',
    name: 'Giao tiếp cơ bản',
    description: 'Chào hỏi & làm việc hàng ngày',
    icon: 'message-square',
    gradient: 'from-[#EC407A] to-[#C2185B]',
    totalCards: 50,
    masteredCards: 42,
    dueCards: 8,
    progressPercent: 84,
    category: 'greetings',
  },
];

export const INITIAL_FLASHCARDS: FlashcardItem[] = [
  {
    id: 'fc-ni',
    simplified: '你',
    pinyin: 'nǐ',
    vietnamese: 'bạn, anh, chị, ông, bà, ngài',
    partOfSpeech: 'Đại từ',
    exampleChinese: '你好！很高兴认识你。',
    examplePinyin: 'Nǐ hǎo! Hěn gāoxìng rènshi nǐ.',
    exampleVietnamese: 'Xin chào! Rất vui được quen biết bạn.',
    category: 'all',
    deckId: 'deck-greetings',
    hskLevel: 'HSK 1',
    difficulty: 'Dễ',
    tags: ['Căn bản', 'Chào hỏi'],
    audioText: '你',
    note: 'Đại từ nhân xưng ngôi thứ 2 số ít.',
    isFavorite: false,
    reviewState: 'learned',
    repetition: 4,
    interval: 6,
    easeFactor: 2.5,
  },
  {
    id: 'fc-hao',
    simplified: '好',
    pinyin: 'hǎo',
    vietnamese: 'tốt, khỏe, được, ngon',
    partOfSpeech: 'Tính từ',
    exampleChinese: '今天天气很好。',
    examplePinyin: 'Jīntiān tiānqì hěn hǎo.',
    exampleVietnamese: 'Hôm nay thời tiết rất tốt.',
    category: 'all',
    deckId: 'deck-greetings',
    hskLevel: 'HSK 1',
    difficulty: 'Dễ',
    tags: ['Căn bản', 'Giao tiếp'],
    audioText: '好',
    note: 'Bộ Nữ (女) kết hợp với bộ Tử (子).',
    isFavorite: true,
    reviewState: 'learned',
    repetition: 5,
    interval: 10,
    easeFactor: 2.6,
  },
  {
    id: 'fc-gongchang',
    simplified: '工厂',
    pinyin: 'gōngchǎng',
    vietnamese: 'nhà máy, công xưởng, xí nghiệp',
    partOfSpeech: 'Danh từ',
    exampleChinese: '这家工厂生产电子配件。',
    examplePinyin: 'Zhè jiā gōngchǎng shēngchǎn diànzǐ pèijiàn.',
    exampleVietnamese: 'Nhà máy này sản xuất linh kiện điện tử.',
    category: 'factory',
    deckId: 'deck-factory',
    hskLevel: 'HSK 3',
    difficulty: 'Đang học',
    tags: ['Công xưởng', 'Lao động'],
    audioText: '工厂',
    note: 'Công xưởng sản xuất quy mô lớn.',
    isFavorite: false,
    reviewState: 'learning',
    repetition: 2,
    interval: 2,
    easeFactor: 2.3,
  },
  {
    id: 'fc-shengchanxian',
    simplified: '生产线',
    pinyin: 'shēngchǎnxiàn',
    vietnamese: 'dây chuyền sản xuất',
    partOfSpeech: 'Danh từ',
    exampleChinese: '新生产线今天正式开工。',
    examplePinyin: 'Xīn shēngchǎnxiàn jīntiān zhèngshì kāigōng.',
    exampleVietnamese: 'Dây chuyền sản xuất mới hôm nay chính thức hoạt động.',
    category: 'factory',
    deckId: 'deck-factory',
    hskLevel: 'HSK 4',
    difficulty: 'Khó',
    tags: ['Công xưởng', 'Sản xuất'],
    audioText: '生产线',
    note: 'Dây chuyền lắp ráp và đóng gói.',
    isFavorite: true,
    reviewState: 'difficult',
    repetition: 1,
    interval: 1,
    easeFactor: 1.8,
  },
  {
    id: 'fc-jiqi',
    simplified: '机器',
    pinyin: 'jīqì',
    vietnamese: 'máy móc, thiết bị máy',
    partOfSpeech: 'Danh từ',
    exampleChinese: '操作机器时要注意安全。',
    examplePinyin: 'Cāozuò jīqì shí yào zhùyì ānquán.',
    exampleVietnamese: 'Khi thao tác máy móc phải chú ý an toàn.',
    category: 'factory',
    deckId: 'deck-machinery',
    hskLevel: 'HSK 3',
    difficulty: 'Đang học',
    tags: ['Máy móc', 'Thiết bị'],
    audioText: '机器',
    isFavorite: false,
    reviewState: 'learning',
    repetition: 2,
    interval: 3,
    easeFactor: 2.4,
  },
  {
    id: 'fc-anquanmao',
    simplified: '安全帽',
    pinyin: 'ānquánmào',
    vietnamese: 'mũ bảo hộ an toàn',
    partOfSpeech: 'Danh từ',
    exampleChinese: '进入车间必须佩戴安全帽。',
    examplePinyin: 'Jìnrù chējiān bìxū pèidài ānquánmào.',
    exampleVietnamese: 'Vào phân xưởng bắt buộc phải đội mũ bảo hộ.',
    category: 'factory',
    deckId: 'deck-safety',
    hskLevel: 'HSK 4',
    difficulty: 'Dễ',
    tags: ['An toàn', 'Trang thiết bị'],
    audioText: '安全帽',
    isFavorite: true,
    reviewState: 'learned',
    repetition: 4,
    interval: 7,
    easeFactor: 2.5,
  },
  {
    id: 'fc-zhiliang',
    simplified: '质量检查',
    pinyin: 'zhìliàng jiǎnchá',
    vietnamese: 'kiểm tra chất lượng (KCS)',
    partOfSpeech: 'Cụm danh từ',
    exampleChinese: '质检员正在做质量检查。',
    examplePinyin: 'Zhìjiǎnyuán zhèngzài zuò zhìliàng jiǎnchá.',
    exampleVietnamese: 'Nhân viên KCS đang thực hiện kiểm tra chất lượng.',
    category: 'factory',
    deckId: 'deck-qc',
    hskLevel: 'HSK 4',
    difficulty: 'Đang học',
    tags: ['Chất lượng', 'KCS'],
    audioText: '质量检查',
    isFavorite: false,
    reviewState: 'learning',
    repetition: 3,
    interval: 4,
    easeFactor: 2.4,
  },
  {
    id: 'fc-kaiji',
    simplified: '开机',
    pinyin: 'kāijī',
    vietnamese: 'bật máy, khởi động máy',
    partOfSpeech: 'Động từ',
    exampleChinese: '开机前请检查电源。',
    examplePinyin: 'Kāijī qián qǐng jiǎnchá diànyuán.',
    exampleVietnamese: 'Trước khi bật máy xin kiểm tra nguồn điện.',
    category: 'factory',
    deckId: 'deck-machinery',
    hskLevel: 'HSK 2',
    difficulty: 'Dễ',
    tags: ['Thao tác', 'Máy móc'],
    audioText: '开机',
    isFavorite: false,
    reviewState: 'learned',
    repetition: 5,
    interval: 9,
    easeFactor: 2.6,
  },
  {
    id: 'fc-guanji',
    simplified: '关机',
    pinyin: 'guānjī',
    vietnamese: 'tắt máy, ngắt nguồn máy',
    partOfSpeech: 'Động từ',
    exampleChinese: '下班后请按规定关机。',
    examplePinyin: 'Xiàbān hòu qǐng àn guīdìng guānjī.',
    exampleVietnamese: 'Sau khi tan làm xin hãy tắt máy theo đúng quy định.',
    category: 'factory',
    deckId: 'deck-machinery',
    hskLevel: 'HSK 2',
    difficulty: 'Dễ',
    tags: ['Thao tác', 'Máy móc'],
    audioText: '关机',
    isFavorite: false,
    reviewState: 'learned',
    repetition: 5,
    interval: 9,
    easeFactor: 2.6,
  },
  {
    id: 'fc-tingzhi',
    simplified: '停止',
    pinyin: 'tíngzhǐ',
    vietnamese: 'dừng lại, đình chỉ, ngừng',
    partOfSpeech: 'Động từ',
    exampleChinese: '紧急情况下请按停止按钮。',
    examplePinyin: 'Jǐnjí qíngkuàng xià qǐng àn tíngzhǐ ànniǔ.',
    exampleVietnamese: 'Trong trường hợp khẩn cấp hãy nhấn nút dừng.',
    category: 'factory',
    deckId: 'deck-safety',
    hskLevel: 'HSK 3',
    difficulty: 'Dễ',
    tags: ['An toàn', 'Cảnh báo'],
    audioText: '停止',
    isFavorite: true,
    reviewState: 'learned',
    repetition: 4,
    interval: 8,
    easeFactor: 2.5,
  },
];

export const FLASHCARD_TIPS = [
  'Lặp lại từ vựng thường xuyên để ghi nhớ lâu hơn!',
  'Hãy liên tưởng chữ Hán với hình ảnh thực tế trong nhà máy.',
  'Ôn tập các từ có mức độ "Khó" 2 lần mỗi ngày để đạt kết quả tốt nhất.',
  'Kết hợp nghe phát âm và đọc to lại để ghi nhớ cả Pinyin và âm điệu.',
  'Phân loại từ vựng theo chủ đề giúp bộ não ghi nhớ có hệ thống hơn.',
];
