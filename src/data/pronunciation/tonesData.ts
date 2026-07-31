export interface ToneSandhiRule {
  id: string;
  title: string;
  originalForm: string;
  sandhiForm: string;
  explanation: string;
  examples: {
    originalPinyin: string;
    actualPinyin: string;
    chinese: string;
    vietnamese: string;
    audioText: string;
  }[];
}

export interface MandarinTone {
  toneNumber: 1 | 2 | 3 | 4 | 0;
  name: string;
  symbolExample: string;
  pitchContour: string; // e.g. "55", "35", "214", "51"
  description: string;
  pitchPoints: number[]; // SVG contour values [start, mid, end]
  vietnameseGuide: string;
  commonMistakes: string;
  practiceTip: string;
  examples: {
    chinese: string;
    pinyin: string;
    vietnamese: string;
    audioText: string;
  }[];
}

export const MANDARIN_TONES: MandarinTone[] = [
  {
    toneNumber: 1,
    name: 'Thanh 1 (Âm bình - 高平调)',
    symbolExample: 'ā',
    pitchContour: '55',
    description: 'Giọng đọc giữ ở mức cao nhất (mức 5) và kéo dài đều, không lên không xuống.',
    pitchPoints: [90, 90, 90], // SVG Y coordinates (high & level)
    vietnameseGuide: 'Đọc cao, trong và kéo dài đều giống giọng ngâm nốt nhạc cao.',
    commonMistakes: 'Đọc bị rơi giọng xuống ở cuối câu.',
    practiceTip: 'Tưởng tượng bạn đang hát nốt nhạc "Laaaa" giữ giọng cao mượt.',
    examples: [
      { chinese: '妈', pinyin: 'mā', vietnamese: 'mẹ', audioText: '妈' },
      { chinese: '八', pinyin: 'bā', vietnamese: 'số 8', audioText: '八' },
      { chinese: '车间', pinyin: 'chējiān', vietnamese: 'phân xưởng', audioText: '车间' },
    ],
  },
  {
    toneNumber: 2,
    name: 'Thanh 2 (Dương bình - 升调)',
    symbolExample: 'á',
    pitchContour: '35',
    description: 'Giọng đọc đi từ mức trung bình (mức 3) vuốt nhanh lên cao nhất (mức 5).',
    pitchPoints: [60, 75, 90], // SVG Y rising
    vietnameseGuide: 'Gần giống dấu sắc tiếng Việt nhưng vuốt hơi dài hơn một chút.',
    commonMistakes: 'Đọc dấu sắc quá gắt ngắt ngập.',
    practiceTip: 'Tương tự khi bạn ngạc nhiên hỏi lại: "Cái gì? Thật á?"',
    examples: [
      { chinese: '麻', pinyin: 'má', vietnamese: 'cây gai, tê', audioText: '麻' },
      { chinese: '来', pinyin: 'lái', vietnamese: 'đến', audioText: '来' },
      { chinese: '合格', pinyin: 'hégé', vietnamese: 'đạt tiêu chuẩn', audioText: '合格' },
    ],
  },
  {
    toneNumber: 3,
    name: 'Thanh 3 (Thượng thanh - 折调)',
    symbolExample: 'ǎ',
    pitchContour: '214',
    description: 'Giọng đọc bắt đầu ở mức 2, hạ xuống thấp nhất (mức 1) rồi nâng nhẹ lên mức 4.',
    pitchPoints: [50, 10, 70], // SVG Y dipping
    vietnameseGuide: 'Gần giống dấu hỏi tiếng Việt nhưng đè giọng xuống cực thấp ở giữa.',
    commonMistakes: 'Nâng giọng lên quá cao ở cuối khiến âm bị gượng ép.',
    practiceTip: 'Trong giao tiếp tự nhiên, thanh 3 thường chỉ cần đè giọng xuống thấp (nửa thanh 3).',
    examples: [
      { chinese: '马', pinyin: 'mǎ', vietnamese: 'con ngựa', audioText: '马' },
      { chinese: '好', pinyin: 'hǎo', vietnamese: 'tốt, khỏe', audioText: '好' },
      { chinese: '检', pinyin: 'jiǎn', vietnamese: 'kiểm tra', audioText: '检' },
    ],
  },
  {
    toneNumber: 4,
    name: 'Thanh 4 (Khứ thanh - 降调)',
    symbolExample: 'à',
    pitchContour: '51',
    description: 'Giọng đọc giật mạnh từ cao nhất (mức 5) dứt khoát xuống thấp nhất (mức 1).',
    pitchPoints: [90, 50, 10], // SVG Y falling
    vietnameseGuide: 'Gần giống dấu nặng dứt khoát, đọc như ra lệnh.',
    commonMistakes: 'Đọc quá nhẹ thành không dấu hoặc đọc thành dấu huyền tiếng Việt.',
    practiceTip: 'Dứt khoát đập mạnh giọng từ cao xuống như khi quát "Không!".',
    examples: [
      { chinese: '骂', pinyin: 'mà', vietnamese: 'mắng chửi', audioText: '骂' },
      { chinese: '大', pinyin: 'dà', vietnamese: 'to lớn', audioText: '大' },
      { chinese: '设备', pinyin: 'shèbèi', vietnamese: 'thiết bị', audioText: '设备' },
    ],
  },
  {
    toneNumber: 0,
    name: 'Thanh nhẹ (Khinh thanh - 轻声)',
    symbolExample: 'ma',
    pitchContour: 'Nhẹ & Ngắn',
    description: 'Không có dấu thanh, phát âm siêu nhẹ và ngắn, cao độ phụ thuộc vào âm đứng trước.',
    pitchPoints: [40, 40, 40],
    vietnameseGuide: 'Đọc lướt nhẹ ngắt nửa chừng.',
    commonMistakes: 'Đọc kéo dài hoặc đọc thành thanh 1.',
    practiceTip: 'Đọc lướt qua cực nhanh như âm đệm.',
    examples: [
      { chinese: '妈妈', pinyin: 'māma', vietnamese: 'mẹ', audioText: '妈妈' },
      { chinese: '爸爸', pinyin: 'bàba', vietnamese: 'bố', audioText: '爸爸' },
      { chinese: '帽子', pinyin: 'màozi', vietnamese: 'mũ', audioText: '帽子' },
    ],
  },
];

export const TONE_SANDHI_RULES: ToneSandhiRule[] = [
  {
    id: 'sandhi-two-3rds',
    title: 'Quy tắc 2 thanh 3 đi liền nhau (3 + 3 ➔ 2 + 3)',
    originalForm: 'Thanh 3 + Thanh 3',
    sandhiForm: 'Thanh 2 + Thanh 3',
    explanation: 'Khi hai từ mang thanh 3 đi liền nhau, âm thứ nhất sẽ tự động đọc biến thành thanh 2.',
    examples: [
      { originalPinyin: 'nǐ hǎo', actualPinyin: 'ní hǎo', chinese: '你好', vietnamese: 'Xin chào', audioText: '你好' },
      { originalPinyin: 'hěn hǎo', actualPinyin: 'hén hǎo', chinese: '很好', vietnamese: 'Rất tốt', audioText: '很好' },
      { originalPinyin: 'sǎomǎ', actualPinyin: 'sáomǎ', chinese: '扫码', vietnamese: 'Quét mã vạch', audioText: '扫码' },
    ],
  },
  {
    id: 'sandhi-bu',
    title: 'Biến điệu của chữ 不 (bù)',
    originalForm: 'bù + Thanh 4',
    sandhiForm: 'bú + Thanh 4',
    explanation: 'Từ 不 (bù) khi đứng trước một âm mang thanh 4 sẽ tự động đọc đổi thành thanh 2 (bú).',
    examples: [
      { originalPinyin: 'bù shì', actualPinyin: 'bú shì', chinese: '不是', vietnamese: 'Không phải', audioText: '不是' },
      { originalPinyin: 'bù yào', actualPinyin: 'bú yào', chinese: '不要', vietnamese: 'Không cần, đừng', audioText: '不要' },
      { originalPinyin: 'bù hégé', actualPinyin: 'bù hégé', chinese: '不合格', vietnamese: 'Không đạt tiêu chuẩn', audioText: '不合格' },
    ],
  },
  {
    id: 'sandhi-yi',
    title: 'Biến điệu của chữ 一 (yī)',
    originalForm: 'yī + Thanh 1/2/3 hoặc Thanh 4',
    sandhiForm: 'yì + Thanh 1/2/3 | yí + Thanh 4',
    explanation: 'Gốc 一 đọc là yī (thanh 1). Khi đứng trước thanh 1,2,3 đọc đổi thành yì (thanh 4). Khi đứng trước thanh 4 đọc đổi thành yí (thanh 2).',
    examples: [
      { originalPinyin: 'yī tiān', actualPinyin: 'yì tiān', chinese: '一天', vietnamese: 'Một ngày', audioText: '一天' },
      { originalPinyin: 'yī gè', actualPinyin: 'yí gè', chinese: '一个', vietnamese: 'Một cái', audioText: '一个' },
      { originalPinyin: 'dì yī', actualPinyin: 'dì yī', chinese: '第一', vietnamese: 'Thứ nhất (giữ nguyên thanh 1)', audioText: '第一' },
    ],
  },
];
