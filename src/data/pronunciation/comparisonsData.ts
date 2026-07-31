export interface PronunciationComparisonPair {
  id: string;
  soundA: string;
  soundB: string;
  title: string;
  differenceSummary: string;
  keyDistinction: 'aspirated' | 'tongue-position' | 'vowel-rounding' | 'nasal-ending';
  itemA: {
    symbol: string;
    description: string;
    exampleWord: string;
    pinyin: string;
    vietnamese: string;
    audioText: string;
  };
  itemB: {
    symbol: string;
    description: string;
    exampleWord: string;
    pinyin: string;
    vietnamese: string;
    audioText: string;
  };
  practiceQuestion: {
    audioTargetText: string;
    correctOption: 'A' | 'B';
    questionText: string;
    explanation: string;
  };
}

export const COMPARISON_PAIRS: PronunciationComparisonPair[] = [
  {
    id: 'comp-b-p',
    soundA: 'b',
    soundB: 'p',
    title: 'Phân biệt b và p (Bật hơi)',
    differenceSummary: 'Âm "b" KHÔNG bật hơi (ngắt nhẹ sau môi), âm "p" BẬT HƠI CỰC MẠNH.',
    keyDistinction: 'aspirated',
    itemA: {
      symbol: 'b',
      description: 'Hai môi mím nhẹ nhả ra, không thổi luồng khí mạnh.',
      exampleWord: '包',
      pinyin: 'bāo',
      vietnamese: 'gói, bao',
      audioText: '包',
    },
    itemB: {
      symbol: 'p',
      description: 'Hai môi mím chặt nén khí rồi bật bung ra luồng hơi mạnh.',
      exampleWord: '跑',
      pinyin: 'pǎo',
      vietnamese: 'chạy',
      audioText: '跑',
    },
    practiceQuestion: {
      audioTargetText: '跑',
      correctOption: 'B',
      questionText: 'Nghe audio và đoán âm tiết được đọc là gì?',
      explanation: 'Âm tiết được đọc là "pǎo" (âm p bật hơi mạnh làm thổi bay giấy).',
    },
  },
  {
    id: 'comp-d-t',
    soundA: 'd',
    soundB: 't',
    title: 'Phân biệt d và t (Bật hơi)',
    differenceSummary: 'Âm "d" đọc như "t" nhẹ (không bật hơi), âm "t" đọc như "th" (bật hơi mạnh).',
    keyDistinction: 'aspirated',
    itemA: {
      symbol: 'd',
      description: 'Đầu lưỡi chạm lợi trên hạ nhẹ nhả âm, không thổi hơi.',
      exampleWord: '大',
      pinyin: 'dà',
      vietnamese: 'to lớn',
      audioText: '大',
    },
    itemB: {
      symbol: 't',
      description: 'Đầu lưỡi chạm lợi trên nén khí rồi bật luồng hơi mạnh ra ngoài.',
      exampleWord: '他',
      pinyin: 'tā',
      vietnamese: 'anh ấy',
      audioText: '他',
    },
    practiceQuestion: {
      audioTargetText: '他',
      correctOption: 'B',
      questionText: 'Nghe audio và xác định xem âm tiết có bật hơi hay không?',
      explanation: 'Âm tiết đọc là "tā" có luồng hơi bật ra mạnh tương tự chữ "th".',
    },
  },
  {
    id: 'comp-g-k',
    soundA: 'g',
    soundB: 'k',
    title: 'Phân biệt g và k (Gốc lưỡi bật hơi)',
    differenceSummary: 'Âm "g" đọc giống "c/k" nhẹ (không bật hơi), âm "k" đọc giống "kh" (bật hơi cuống họng).',
    keyDistinction: 'aspirated',
    itemA: {
      symbol: 'g',
      description: 'Gốc lưỡi nâng áp vòm mềm nhả nhẹ, đọc như k nhẹ.',
      exampleWord: '高',
      pinyin: 'gāo',
      vietnamese: 'cao',
      audioText: '高',
    },
    itemB: {
      symbol: 'k',
      description: 'Gốc lưỡi dính vòm mềm nén khí rồi khạc luồng hơi bùng nổ.',
      exampleWord: '开',
      pinyin: 'kāi',
      vietnamese: 'mở, bật',
      audioText: '开',
    },
    practiceQuestion: {
      audioTargetText: '开',
      correctOption: 'B',
      questionText: 'Nghe âm tiết và chọn âm tiết đúng:',
      explanation: 'Âm đọc là "kāi" (âm k bật hơi mạnh từ cuống họng).',
    },
  },
  {
    id: 'comp-zh-z',
    soundA: 'zh',
    soundB: 'z',
    title: 'Phân biệt zh và z (Cuốn lưỡi vs Phẳng lưỡi)',
    differenceSummary: 'Âm "zh" CUỐN CONG LƯỠI lên ngạc cứng, âm "z" ĐẦU LƯỠI DUỖI PHẲNG sau răng cửa.',
    keyDistinction: 'tongue-position',
    itemA: {
      symbol: 'zh',
      description: 'Đầu lưỡi uốn cong ngửa áp vòm cứng đằng sau lợi trên.',
      exampleWord: '中',
      pinyin: 'zhōng',
      vietnamese: 'trung tâm',
      audioText: '中',
    },
    itemB: {
      symbol: 'z',
      description: 'Đầu lưỡi duỗi thẳng ép phẳng sau mặt răng cửa trên.',
      exampleWord: '早',
      pinyin: 'zǎo',
      vietnamese: 'buổi sáng',
      audioText: '早',
    },
    practiceQuestion: {
      audioTargetText: '中',
      correctOption: 'A',
      questionText: 'Âm tiết vừa đọc có cuộn lưỡi hay không?',
      explanation: 'Âm đọc là "zhōng" có vị trí đầu lưỡi uốn cong áp vòm ngạc cứng.',
    },
  },
  {
    id: 'comp-u-uumlaut',
    soundA: 'u',
    soundB: 'ü',
    title: 'Phân biệt u và ü (Vận mẫu tròn môi)',
    differenceSummary: 'Âm "u" lưỡi lùi sau; âm "ü" lưỡi đưa cao về phía trước nhưng giữ tròn môi hẹp.',
    keyDistinction: 'vowel-rounding',
    itemA: {
      symbol: 'u',
      description: 'Đọc u bình thường, gốc lưỡi rút về sau.',
      exampleWord: '路',
      pinyin: 'lù',
      vietnamese: 'con đường',
      audioText: '路',
    },
    itemB: {
      symbol: 'ü',
      description: 'Vị trí lưỡi như đọc chữ "i", nhưng môi nhọn tròn hẹp như đọc "u".',
      exampleWord: '绿',
      pinyin: 'lǜ',
      vietnamese: 'màu xanh lá',
      audioText: '绿',
    },
    practiceQuestion: {
      audioTargetText: '绿',
      correctOption: 'B',
      questionText: 'Âm tiết được phát âm là "lù" hay "lǜ"?',
      explanation: 'Âm đọc là "lǜ" (âm ü môi nhọn tròn hẹp, lưỡi đưa trước).',
    },
  },
  {
    id: 'comp-an-ang',
    soundA: 'an',
    soundB: 'ang',
    title: 'Phân biệt an và ang (Âm mũi n vs ng)',
    differenceSummary: 'Âm "an" kết thúc bằng đầu lưỡi chạm lợi (n); âm "ang" kết thúc bằng gốc lưỡi dính vòm mềm (ng).',
    keyDistinction: 'nasal-ending',
    itemA: {
      symbol: 'an',
      description: 'Kết thúc âm đầu lưỡi áp chặt vào lợi trên.',
      exampleWord: '安',
      pinyin: 'ān',
      vietnamese: 'an toàn',
      audioText: '安',
    },
    itemB: {
      symbol: 'ang',
      description: 'Kết thúc âm gốc lưỡi áp vòm mềm khoang miệng mở rộng.',
      exampleWord: '昂',
      pinyin: 'áng',
      vietnamese: 'ngẩng đầu',
      audioText: '昂',
    },
    practiceQuestion: {
      audioTargetText: '安',
      correctOption: 'A',
      questionText: 'Âm tiết vừa đọc kết thúc bằng n hay ng?',
      explanation: 'Âm đọc là "ān" kết thúc bằng đầu lưỡi chạm vào lợi trên.',
    },
  },
];
