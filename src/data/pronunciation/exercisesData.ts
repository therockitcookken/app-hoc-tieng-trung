export interface PronunciationExerciseItem {
  id: string;
  type: 'listen-pinyin' | 'listen-tone' | 'character-pinyin' | 'tongue-matching' | 'factory-practice' | 'recording';
  category: 'Cơ bản' | 'Phụ âm' | 'Vận mẫu' | 'Thanh điệu' | 'Công xưởng';
  title: string;
  instruction: string;
  questionChinese?: string;
  audioText: string;
  options?: { id: string; text: string; isCorrect: boolean; explanation?: string }[];
  correctAnswerId?: string;
  difficulty: 'Dễ' | 'Trung bình' | 'Khó';
  xp: number;
}

export const PRONUNCIATION_EXERCISES: PronunciationExerciseItem[] = [
  {
    id: 'ex-1',
    type: 'listen-pinyin',
    category: 'Phụ âm',
    title: 'Phân biệt bật hơi (b vs p)',
    instruction: 'Lắng nghe audio phát âm và chọn phiên âm Pinyin đúng nhất:',
    audioText: '跑',
    options: [
      { id: 'opt-a', text: 'bǎo', isCorrect: false, explanation: 'Âm "b" không bật hơi, trong khi audio bật hơi cực mạnh.' },
      { id: 'opt-b', text: 'pǎo', isCorrect: true, explanation: 'Chính xác! Âm "p" trong "pǎo" (chạy) được bật hơi rất mạnh.' },
      { id: 'opt-c', text: 'mǎo', isCorrect: false },
      { id: 'opt-d', text: 'fǎo', isCorrect: false },
    ],
    correctAnswerId: 'opt-b',
    difficulty: 'Dễ',
    xp: 15,
  },
  {
    id: 'ex-2',
    type: 'listen-tone',
    category: 'Thanh điệu',
    title: 'Nhận diện Thanh điệu (55 vs 51)',
    instruction: 'Lắng nghe từ "设备" (Thiết bị) và xác định thanh điệu của từ "设":',
    audioText: '设',
    options: [
      { id: 'opt-a', text: 'Thanh 1 (shē - cao và đều 55)', isCorrect: false },
      { id: 'opt-b', text: 'Thanh 2 (shé - đi lên 35)', isCorrect: false },
      { id: 'opt-c', text: 'Thanh 3 (shě - đè giọng 214)', isCorrect: false },
      { id: 'opt-d', text: 'Thanh 4 (shè - giật mạnh từ cao xuống thấp 51)', isCorrect: true, explanation: 'Đúng! "设" mang thanh 4 giật dứt khoát.' },
    ],
    correctAnswerId: 'opt-d',
    difficulty: 'Trung bình',
    xp: 20,
  },
  {
    id: 'ex-3',
    type: 'character-pinyin',
    category: 'Công xưởng',
    title: 'Chữ Hán Công xưởng: 工厂',
    instruction: 'Nhìn chữ Hán "工厂" (Nhà máy / công xưởng) và chọn Pinyin phiên âm chuẩn:',
    questionChinese: '工厂',
    audioText: '工厂',
    options: [
      { id: 'opt-a', text: 'gōngchǎng', isCorrect: true, explanation: 'Đúng! 工 (gōng) + 厂 (chǎng).' },
      { id: 'opt-b', text: 'kōngzhāng', isCorrect: false },
      { id: 'opt-c', text: 'gōngzhāng', isCorrect: false },
      { id: 'opt-d', text: 'gōngcáng', isCorrect: false },
    ],
    correctAnswerId: 'opt-a',
    difficulty: 'Dễ',
    xp: 20,
  },
  {
    id: 'ex-4',
    type: 'tongue-matching',
    category: 'Phụ âm',
    title: 'Nhận diện hình lưỡi: Âm cuốn lưỡi (zh, ch, sh)',
    instruction: 'Phụ âm đầu nào yêu cầu uốn cong đầu lưỡi chạm vào ngạc cứng phía trên?',
    audioText: '中',
    options: [
      { id: 'opt-a', text: 'Các phụ âm z, c, s', isCorrect: false, explanation: 'z, c, s là âm đầu lưỡi duỗi thẳng ép sau răng.' },
      { id: 'opt-b', text: 'Các phụ âm zh, ch, sh, r', isCorrect: true, explanation: 'Chính xác! zh, ch, sh, r là nhóm âm cuộn lưỡi.' },
      { id: 'opt-c', text: 'Các phụ âm j, q, x', isCorrect: false },
      { id: 'opt-d', text: 'Các phụ âm g, k, h', isCorrect: false },
    ],
    correctAnswerId: 'opt-b',
    difficulty: 'Trung bình',
    xp: 25,
  },
  {
    id: 'ex-5',
    type: 'factory-practice',
    category: 'Công xưởng',
    title: 'Phát âm An toàn: 安全帽',
    instruction: 'Luyện đọc từ vựng an toàn nhà máy "安全帽" (Mũ bảo hộ lao động):',
    questionChinese: '安全帽',
    audioText: '安全帽',
    options: [
      { id: 'opt-a', text: 'ānquánmào', isCorrect: true, explanation: 'Tuyệt vời! ān (thanh 1) - quán (thanh 2) - mào (thanh 4).' },
      { id: 'opt-b', text: 'ānkuánmào', isCorrect: false },
      { id: 'opt-c', text: 'ànquánmáo', isCorrect: false },
      { id: 'opt-d', text: 'ānquānmào', isCorrect: false },
    ],
    correctAnswerId: 'opt-a',
    difficulty: 'Trung bình',
    xp: 25,
  },
  {
    id: 'ex-6',
    type: 'recording',
    category: 'Công xưởng',
    title: 'Luyện thu âm: 操作 (Vận hành thao tác)',
    instruction: 'Nhấn nút thu âm và đọc to từ "操作" (cāozuò). Hệ thống AI sẽ phân tích khẩu hình & thanh điệu:',
    questionChinese: '操作',
    audioText: '操作',
    difficulty: 'Khó',
    xp: 30,
  },
];
