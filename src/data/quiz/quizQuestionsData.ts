import { QuizQuestion } from '../../types/quiz';

export const QUIZ_QUESTIONS_DATA: QuizQuestion[] = [
  // 1. Vocabulary HSK 1
  {
    id: 'qq-vocab-1',
    slug: 'xuexi-meaning',
    type: 'multiple-choice',
    category: 'Từ vựng HSK',
    hskLevel: 'HSK 1',
    difficulty: 'Dễ',
    questionChinese: '“学习” (xuéxí) có nghĩa là gì?',
    questionVietnamese: 'Chọn nghĩa tiếng Việt chính xác của từ “学习”:',
    options: [
      { id: 'opt-a', textVietnamese: 'A. Học tập, rèn luyện', isCorrect: true, explanation: 'Chính xác! 学习 (xuéxí) có nghĩa là học tập.' },
      { id: 'opt-b', textVietnamese: 'B. Làm việc, công tác', isCorrect: false },
      { id: 'opt-c', textVietnamese: 'C. Trò chuyện, tán gẫu', isCorrect: false },
      { id: 'opt-d', textVietnamese: 'D. Mua sắm hàng hóa', isCorrect: false },
    ],
    correctAnswerId: 'opt-a',
    explanation: '学习 (xuéxí): Học tập. Ví dụ: 我在学习汉语 (Tôi đang học tiếng Trung).',
    audioText: '学习',
    xp: 15,
  },

  // 2. Grammar Câu chữ 把 (HSK 3)
  {
    id: 'qq-grammar-1',
    slug: 'ba-sentence-fill',
    type: 'multiple-choice',
    category: 'Ngữ pháp',
    hskLevel: 'HSK 3',
    difficulty: 'Trung bình',
    questionChinese: '请___安全帽戴好。',
    questionVietnamese: 'Chọn từ điền vào chỗ trống thích hợp:',
    options: [
      { id: 'opt-a', textVietnamese: 'A. 把 (bǎ)', isCorrect: true, explanation: 'Chính xác! Cấu trúc 请把 + Tân ngữ + Động từ + 好.' },
      { id: 'opt-b', textVietnamese: 'B. 被 (bèi)', isCorrect: false },
      { id: 'opt-c', textVietnamese: 'C. 让 (ràng)', isCorrect: false },
      { id: 'opt-d', textVietnamese: 'D. 给 (gěi)', isCorrect: false },
    ],
    correctAnswerId: 'opt-a',
    explanation: 'Câu chữ 把 dùng khi muốn tác động làm thay đổi trạng thái của tân ngữ: 请把安全帽戴好 (Xin hãy đội mũ bảo hộ cẩn thận).',
    audioText: '请把安全帽戴好。',
    isFactoryQuestion: true,
    xp: 20,
  },

  // 3. Factory Emergency Situation
  {
    id: 'qq-factory-1',
    slug: 'factory-abnormal-noise',
    type: 'multiple-choice',
    category: 'Công xưởng & Nhà máy',
    hskLevel: 'HSK 3',
    difficulty: 'Trung bình',
    questionChinese: 'Tình huống: Máy móc đang vận hành phát ra tiếng kêu bất thường (异常声音). Bạn nên nói câu nào?',
    questionVietnamese: 'Chọn câu xử lý sự cố chuẩn xác nhất:',
    options: [
      { id: 'opt-a', textVietnamese: 'A. 机器有异常声音，请立即停机检查！', textChinese: '机器有异常声音，请立即停机检查！', isCorrect: true, explanation: 'Chính xác! Cần yêu cầu lập tức dừng máy để kiểm tra.' },
      { id: 'opt-b', textVietnamese: 'B. 今天的生产计划完成了。', textChinese: '今天的生产计划完成了。', isCorrect: false },
      { id: 'opt-c', textVietnamese: 'C. 请把产品搬到仓库去。', textChinese: '请把产品搬到仓库去。', isCorrect: false },
      { id: 'opt-d', textVietnamese: 'D. 我想吃中饭。', textChinese: '我想吃中饭。', isCorrect: false },
    ],
    correctAnswerId: 'opt-a',
    explanation: 'Khi máy phát tiếng kêu bất thường: 机器有异常声音，请立即停机检查 (Máy có tiếng kêu bất thường, xin lập tức dừng máy kiểm tra).',
    audioText: '机器有异常声音，请立即停机检查！',
    isFactoryQuestion: true,
    xp: 25,
  },

  // 4. Pronunciation & Tones
  {
    id: 'qq-pronunciation-1',
    slug: 'pinyin-tone-hao',
    type: 'multiple-choice',
    category: 'Phát âm & Pinyin',
    hskLevel: 'HSK 1',
    difficulty: 'Dễ',
    questionChinese: 'Pinyin đúng có dấu thanh của chữ “好” (tốt, hay) là:',
    questionVietnamese: 'Chọn thanh điệu chuẩn:',
    options: [
      { id: 'opt-a', textVietnamese: 'A. hāo (Thanh 1)', isCorrect: false },
      { id: 'opt-b', textVietnamese: 'B. háo (Thanh 2)', isCorrect: false },
      { id: 'opt-c', textVietnamese: 'C. hǎo (Thanh 3 - 214)', isCorrect: true, explanation: 'Chính xác! Chữ “好” mang Thanh 3 (hǎo).' },
      { id: 'opt-d', textVietnamese: 'D. hào (Thanh 4)', isCorrect: false },
    ],
    correctAnswerId: 'opt-c',
    explanation: 'Chữ 好 (tốt) có Pinyin chuẩn là hǎo (Thanh 3).',
    audioText: '好',
    xp: 15,
  },

  // 5. Listening Audio Test
  {
    id: 'qq-listening-1',
    slug: 'listening-turn-off-machine',
    type: 'listening',
    category: 'Nghe hiểu',
    hskLevel: 'HSK 2',
    difficulty: 'Trung bình',
    questionChinese: 'Nghe âm thanh bên dưới và chọn câu dịch đúng:',
    questionVietnamese: 'Nghe audio và chọn đáp án:',
    options: [
      { id: 'opt-a', textVietnamese: 'A. Xin hãy tắt máy móc đi.', isCorrect: true, explanation: 'Chính xác! Audio đọc: 请把机器关掉 (Xin hãy tắt máy đi).' },
      { id: 'opt-b', textVietnamese: 'B. Xin hãy mở cửa phân xưởng.', isCorrect: false },
      { id: 'opt-c', textVietnamese: 'C. Xin hãy chuyển hàng vào kho.', isCorrect: false },
      { id: 'opt-d', textVietnamese: 'D. Xin hãy lau sạch thiết bị.', isCorrect: false },
    ],
    correctAnswerId: 'opt-a',
    explanation: 'Audio: 请把机器关掉 (Qǐng bǎ jīqì guāndiào) = Xin hãy tắt máy đi.',
    audioText: '请把机器关掉。',
    isFactoryQuestion: true,
    xp: 20,
  },
];
