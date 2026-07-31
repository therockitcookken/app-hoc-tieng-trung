export interface CommunicationPhrase {
  id: string;
  category: string;
  chinese: string;
  pinyin: string;
  vietnamese: string;
  politenessLevel: 'Lịch sự' | 'Thân mật' | 'Trang trọng';
  audioText: string;
  contextUsage: string;
  suggestedResponse?: string;
}

export const ESSENTIAL_COMMUNICATION_DATA: CommunicationPhrase[] = [
  // 1. Chào hỏi
  {
    id: 'comm-1',
    category: 'Chào hỏi',
    chinese: '你好！',
    pinyin: 'Nǐ hǎo!',
    vietnamese: 'Xin chào!',
    politenessLevel: 'Thân mật',
    audioText: '你好！',
    contextUsage: 'Chào hỏi thông thường khi gặp bất kỳ ai.',
    suggestedResponse: '你好！(Nǐ hǎo!)',
  },
  {
    id: 'comm-2',
    category: 'Chào hỏi',
    chinese: '您好，主管！',
    pinyin: 'Nín hǎo, zhǔguǎn!',
    vietnamese: 'Xin chào quản lý!',
    politenessLevel: 'Trang trọng',
    audioText: '您好，主管！',
    contextUsage: 'Chào cấp trên, quản lý hoặc người lớn tuổi hơn.',
    suggestedResponse: '你好！(Nǐ hǎo!)',
  },
  {
    id: 'comm-3',
    category: 'Chào hỏi',
    chinese: '早上好！',
    pinyin: 'Zǎoshang hǎo!',
    vietnamese: 'Chào buổi sáng!',
    politenessLevel: 'Lịch sự',
    audioText: '早上好！',
    contextUsage: 'Chào đồng nghiệp khi bắt đầu ca làm việc buổi sáng.',
  },

  // 2. Giới thiệu
  {
    id: 'comm-4',
    category: 'Giới thiệu',
    chinese: '我是新来的员工。',
    pinyin: 'Wǒ shì xīn lái de yuángōng.',
    vietnamese: 'Tôi là nhân viên mới đến.',
    politenessLevel: 'Lịch sự',
    audioText: '我是新来的员工。',
    contextUsage: 'Tự giới thiệu bản thân trong ngày đầu làm việc.',
  },
  {
    id: 'comm-5',
    category: 'Giới thiệu',
    chinese: '很高兴认识你！',
    pinyin: 'Hěn gāoxìng rènshí nǐ!',
    vietnamese: 'Rất vui được làm quen với bạn!',
    politenessLevel: 'Thân mật',
    audioText: '很高兴认识你！',
    contextUsage: 'Khi mới làm quen với đồng nghiệp.',
    suggestedResponse: '我也很高兴认识你！(Wǒ yě hěn gāoxìng rènshí nǐ!)',
  },

  // 3. Nhờ giúp đỡ & Hỏi đáp
  {
    id: 'comm-6',
    category: 'Nhờ giúp đỡ',
    chinese: '请问，这个怎么操作？',
    pinyin: 'Qǐngwèn, zhège zěnme cāozuò?',
    vietnamese: 'Xin hỏi, cái này thao tác như thế nào?',
    politenessLevel: 'Lịch sự',
    audioText: '请问，这个怎么操作？',
    contextUsage: 'Hỏi hướng dẫn cách vận hành thiết bị hoặc máy móc.',
  },
  {
    id: 'comm-7',
    category: 'Nhờ giúp đỡ',
    chinese: '请说慢一点，我听不懂。',
    pinyin: 'Qǐng shuō màn yīdiǎn, wǒ tīng bù dǒng.',
    vietnamese: 'Xin nói chậm lại một chút, tôi nghe không hiểu.',
    politenessLevel: 'Lịch sự',
    audioText: '请说慢一点，我听不懂。',
    contextUsage: 'Khi người Trung Quốc nói quá nhanh.',
  },

  // 4. Tình huống khẩn cấp
  {
    id: 'comm-8',
    category: 'Khẩn cấp',
    chinese: '小心！有危险！',
    pinyin: 'Xiǎoxīn! Yǒu wēixiǎn!',
    vietnamese: 'Cẩn thận! Có nguy hiểm!',
    politenessLevel: 'Trang trọng',
    audioText: '小心！有危险！',
    contextUsage: 'Cảnh báo nguy hiểm lập tức cho người xung quanh.',
  },
  {
    id: 'comm-9',
    category: 'Khẩn cấp',
    chinese: '快停下来！按紧急按钮！',
    pinyin: 'Kuài tíng xiàlái! Àn jǐnjí ànniǔ!',
    vietnamese: 'Nhanh dừng lại! Ấn nút khẩn cấp!',
    politenessLevel: 'Trang trọng',
    audioText: '快停下来！按紧急按钮！',
    contextUsage: 'Yêu cầu dừng máy khẩn cấp khi gặp sự cố.',
  },
];
