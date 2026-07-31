import { GrammarComparisonPair } from '../../types/grammar';

export type { GrammarComparisonPair };

export const GRAMMAR_COMPARISONS_DATA: GrammarComparisonPair[] = [
  {
    id: 'comp-bu-mei',
    title: 'Phân biệt 不 (bù) và 没 (méi)',
    structureA: '不 (bù)',
    structureB: '没 / 没有 (méi)',
    differenceSummary: '不 dùng cho hiện tại, tương lai, ý muốn bản thân hoặc tính chất khách quan; 没 dùng phủ định hành động trong quá khứ hoặc việc chưa xảy ra.',
    itemA: {
      pattern: '不 + Động từ / Tính từ / 是',
      explanation: 'Phủ định ý muốn, thói quen hoặc sự thật ở hiện tại/tương lai.',
      exampleChinese: '我不去工厂。',
      examplePinyin: 'Wǒ bù qù gōngchǎng.',
      exampleVietnamese: 'Tôi không đi nhà máy (Tôi không muốn đi).',
    },
    itemB: {
      pattern: '没(有) + Động từ / 有',
      explanation: 'Phủ định sự việc đã xảy ra trong quá khứ hoặc phủ định sự sở hữu (没有).',
      exampleChinese: '我没去工厂。',
      examplePinyin: 'Wǒ méi qù gōngchǎng.',
      exampleVietnamese: 'Tôi đã không đi nhà máy (Hôm nay tôi đã không tới đó).',
    },
  },
  {
    id: 'comp-zai-you',
    title: 'Phân biệt 再 (zài) và 又 (yòu)',
    structureA: '再 (zài)',
    structureB: '又 (yòu)',
    differenceSummary: '再 biểu thị lặp lại hành động trong TƯƠNG LAI; 又 biểu thị lặp lại hành động ĐÃ XẢY RA trong quá khứ.',
    itemA: {
      pattern: '再 + Động từ (Tương lai)',
      explanation: 'Làm lại một lần nữa ở tương lai.',
      exampleChinese: '请再检查一遍。',
      examplePinyin: 'Qǐng zài jiǎnchá yī biàn.',
      exampleVietnamese: 'Xin hãy kiểm tra lại một lần nữa.',
    },
    itemB: {
      pattern: '又 + Động từ (Quá khứ)',
      explanation: 'Lặp lại sự việc đã xảy ra rồi.',
      exampleChinese: '机器又坏了。',
      examplePinyin: 'Jīqì yòu huài le.',
      exampleVietnamese: 'Máy lại bị hỏng nữa rồi (Đã hỏng lặp lại).',
    },
  },
  {
    id: 'comp-cai-jiu',
    title: 'Phân biệt 才 (cái) và 就 (jiù)',
    structureA: '才 (cái)',
    structureB: '就 (jiù)',
    differenceSummary: '才 biểu thị sự việc diễn ra CHẬM, TRỄ, KHÓ KHĂN; 就 biểu thị sự việc diễn ra NHANH, SỚM, DỄ DÀNG.',
    itemA: {
      pattern: 'Thời gian trễ + 才 + Động từ',
      explanation: 'Nhấn mạnh sự trễ tràng hoặc muộn mằn.',
      exampleChinese: '他九点才来上班。',
      examplePinyin: 'Tā jiǔ diǎn cái lái shàngbān.',
      exampleVietnamese: 'Tận 9 giờ anh ấy mới tới làm việc.',
    },
    itemB: {
      pattern: 'Thời gian sớm + 就 + Động từ',
      explanation: 'Nhấn mạnh sự sớm hoặc nhanh chóng.',
      exampleChinese: '他七点就来上班了。',
      examplePinyin: 'Tā qī diǎn jiù lái shàngbān le.',
      exampleVietnamese: 'Mới 7 giờ anh ấy đã tới làm việc rồi.',
    },
  },
  {
    id: 'comp-hui-neng-keyi',
    title: 'Phân biệt 会 (huì), 能 (néng), 可以 (kěyǐ)',
    structureA: '会 (huì)',
    structureB: '能 / 可以 (néng / kěyǐ)',
    differenceSummary: '会: Kỹ năng có được qua học tập; 能: Khả năng thể chất/điều kiện; 可以: Sự cho phép/lịch sự.',
    itemA: {
      pattern: '会 + Động từ (Kỹ năng)',
      explanation: 'Biết làm gì nhờ qua rèn luyện học tập.',
      exampleChinese: '我会操作这台机器。',
      examplePinyin: 'Wǒ huì cāozuò zhè tái jīqì.',
      exampleVietnamese: 'Tôi biết vận hành chiếc máy này (Đã học qua).',
    },
    itemB: {
      pattern: '能 / 可以 + Động từ (Điều kiện / Cho phép)',
      explanation: 'Có đủ năng lực hoặc được phép làm gì.',
      exampleChinese: '这里可以开车吗？',
      examplePinyin: 'Zhèlǐ kěyǐ kāichē ma?',
      exampleVietnamese: 'Ở đây có được phép lái xe không?',
    },
  },
];
