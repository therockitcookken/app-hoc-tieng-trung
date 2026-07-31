export interface DictionaryWord {
  id: string;
  simplified: string;
  traditional?: string;
  pinyin: string;
  pinyinClean: string;
  vietnameseMeanings: string[];
  partOfSpeech: string;
  hskLevel: string;
  frequency: string;
  radicals: string;
  strokeCount: number;
  componentsText?: string;
  grammarStructure?: string;
  examples?: {
    sentence: string;
    pinyin: string;
    vietnamese: string;
  }[];
  relatedWords?: {
    word: string;
    pinyin: string;
    meaning: string;
  }[];
  synonyms?: string[];
  antonyms?: string[];
  confusingWords?: {
    word: string;
    pinyin: string;
    distinction: string;
  }[];
  tags: string[];
  isFactoryVocabulary?: boolean;
}

export const DICTIONARY_WORDS: DictionaryWord[] = [
  {
    id: 'word-hao',
    simplified: '好',
    pinyin: 'hǎo',
    pinyinClean: 'hao',
    vietnameseMeanings: ['tốt', 'khỏe', 'được', 'ngon'],
    partOfSpeech: 'Tính từ',
    hskLevel: 'HSK 1',
    frequency: 'Thông dụng',
    radicals: '女',
    strokeCount: 6,
    componentsText: '女 (nữ) + 子 (tử) = tốt đẹp',
    grammarStructure: '好 + (danh từ) / 很好 / 好的',
    examples: [
      {
        sentence: '今天天气很好。',
        pinyin: 'Jīntiān tiānqì hěn hǎo.',
        vietnamese: 'Hôm nay thời tiết rất tốt.',
      },
      {
        sentence: '你好！很高兴认识你。',
        pinyin: 'Nǐ hǎo! Hěn gāoxìng rènshi nǐ.',
        vietnamese: 'Xin chào! Rất vui được quen biết bạn.',
      },
    ],
    relatedWords: [
      { word: '好看', pinyin: 'hǎokàn', meaning: 'đẹp mắt' },
      { word: '好吃', pinyin: 'hǎochī', meaning: 'ngon miệng' },
      { word: '好处', pinyin: 'hǎochu', meaning: 'lợi ích' },
    ],
    synonyms: ['佳', '优'],
    antonyms: ['坏', '差'],
    tags: ['Căn bản', 'Thông dụng'],
  },
  {
    id: 'word-xuexi',
    simplified: '学习',
    pinyin: 'xuéxí',
    pinyinClean: 'xuexi',
    vietnameseMeanings: ['học', 'học tập', 'rèn luyện'],
    partOfSpeech: 'Động từ',
    hskLevel: 'HSK 1',
    frequency: 'Thông dụng',
    radicals: '子 / 羽',
    strokeCount: 11,
    componentsText: '学 (học) + 习 (tập)',
    grammarStructure: '学习 + (môn học / kỹ năng)',
    examples: [
      {
        sentence: '我每天学习中文。',
        pinyin: 'Wǒ měitiān xuéxí Zhōngwén.',
        vietnamese: 'Tôi mỗi ngày học tiếng Trung.',
      },
      {
        sentence: '在工作中我们要不断学习。',
        pinyin: 'Zài gōngzuò zhōng wǒmen yào bùduàn xuéxí.',
        vietnamese: 'Trong công việc chúng ta phải không ngừng học tập.',
      },
    ],
    relatedWords: [
      { word: '学生', pinyin: 'xuéshēng', meaning: 'học sinh' },
      { word: '学校', pinyin: 'xuéxiào', meaning: 'trường học' },
      { word: '自学', pinyin: 'zìxué', meaning: 'tự học' },
    ],
    synonyms: ['读书', '研习'],
    antonyms: ['放弃', '荒废'],
    tags: ['Căn bản', 'Giáo dục'],
  },
  {
    id: 'word-gongchang',
    simplified: '工厂',
    pinyin: 'gōngchǎng',
    pinyinClean: 'gongchang',
    vietnameseMeanings: ['nhà máy', 'công xưởng', 'xí nghiệp'],
    partOfSpeech: 'Danh từ',
    hskLevel: 'HSK 3',
    frequency: 'Thông dụng',
    radicals: '工 / 广',
    strokeCount: 5,
    componentsText: '工 (công) + 厂 (xưởng)',
    grammarStructure: '在工厂 + (làm việc/sản xuất)',
    examples: [
      {
        sentence: '这家工厂生产电子配件。',
        pinyin: 'Zhè jiā gōngchǎng shēngchǎn diànzǐ pèijiàn.',
        vietnamese: 'Nhà máy này sản xuất linh kiện điện tử.',
      },
    ],
    relatedWords: [
      { word: '厂长', pinyin: 'chǎngzhǎng', meaning: 'giám đốc nhà máy' },
      { word: '车间', pinyin: 'chējiān', meaning: 'phân xưởng' },
    ],
    isFactoryVocabulary: true,
    tags: ['Công xưởng', 'Công việc'],
  },
  {
    id: 'word-shengchanxian',
    simplified: '生产线',
    pinyin: 'shēngchǎnxiàn',
    pinyinClean: 'shengchanxian',
    vietnameseMeanings: ['dây chuyền sản xuất', 'dây chuyền'],
    partOfSpeech: 'Danh từ',
    hskLevel: 'HSK 4',
    frequency: 'Chuyên ngành',
    radicals: '生 / 产 / 纟',
    strokeCount: 22,
    componentsText: '生产 (sản xuất) + 线 (dây tuyến)',
    grammarStructure: '自动化 + 生产线',
    examples: [
      {
        sentence: '新生产线今天正式开工。',
        pinyin: 'Xīn shēngchǎnxiàn jīntiān zhèngshì kāigōng.',
        vietnamese: 'Dây chuyền sản xuất mới hôm nay chính thức hoạt động.',
      },
    ],
    relatedWords: [
      { word: '生产', pinyin: 'shēngchǎn', meaning: 'sản xuất' },
      { word: '流水线', pinyin: 'liúshuǐxiàn', meaning: 'dây chuyền lắp ráp' },
    ],
    isFactoryVocabulary: true,
    tags: ['Công xưởng', 'Sản xuất'],
  },
  {
    id: 'word-jiqi',
    simplified: '机器',
    pinyin: 'jīqì',
    pinyinClean: 'jiqi',
    vietnameseMeanings: ['máy móc', 'thiết bị máy'],
    partOfSpeech: 'Danh từ',
    hskLevel: 'HSK 3',
    frequency: 'Thông dụng',
    radicals: '木 / 口',
    strokeCount: 22,
    componentsText: '机 (máy) + 器 (dụng cụ)',
    grammarStructure: '操作 + 机器',
    examples: [
      {
        sentence: '操作机器时要注意安全。',
        pinyin: 'Cāozuò jīqì shí yào zhùyì ānquán.',
        vietnamese: 'Khi thao tác máy móc phải chú ý an toàn.',
      },
    ],
    relatedWords: [
      { word: '设备', pinyin: 'shèbèi', meaning: 'thiết bị' },
      { word: '零件', pinyin: 'língjiàn', meaning: 'phụ tùng' },
    ],
    isFactoryVocabulary: true,
    tags: ['Công xưởng', 'Máy móc'],
  },
  {
    id: 'word-anquan',
    simplified: '安全',
    pinyin: 'ānquán',
    pinyinClean: 'anquan',
    vietnameseMeanings: ['an toàn', 'bình an'],
    partOfSpeech: 'Tính từ / Danh từ',
    hskLevel: 'HSK 3',
    frequency: 'Thông dụng',
    radicals: '宀 / 人',
    strokeCount: 12,
    componentsText: '安 (an) + 全 (toàn)',
    grammarStructure: '注意 + 安全 / 安全 + 第一',
    examples: [
      {
        sentence: '安全第一，生产第二。',
        pinyin: 'Ānquán dì-yī, shēngchǎn dì-èr.',
        vietnamese: 'An toàn là trên hết, sản xuất thứ hai.',
      },
    ],
    relatedWords: [
      { word: '安全帽', pinyin: 'ānquánmào', meaning: 'mũ bảo hộ' },
      { word: '危险', pinyin: 'wēixiǎn', meaning: 'nguy hiểm' },
    ],
    synonyms: ['平安', '稳妥'],
    antonyms: ['危险'],
    isFactoryVocabulary: true,
    tags: ['Công xưởng', 'An toàn'],
  },
  {
    id: 'word-anquanmao',
    simplified: '安全帽',
    pinyin: 'ānquánmào',
    pinyinClean: 'anquanmao',
    vietnameseMeanings: ['mũ bảo hộ an toàn', 'mũ bảo hiểm công trường'],
    partOfSpeech: 'Danh từ',
    hskLevel: 'HSK 4',
    frequency: 'Chuyên ngành',
    radicals: '巾',
    strokeCount: 24,
    componentsText: '安全 (an toàn) + 帽 (mũ)',
    grammarStructure: '戴 + 安全帽',
    examples: [
      {
        sentence: '进入车间必须佩戴安全帽。',
        pinyin: 'Jìnrù chējiān bìxū pèidài ānquánmào.',
        vietnamese: 'Vào phân xưởng bắt buộc phải đội mũ bảo hộ.',
      },
    ],
    relatedWords: [
      { word: '防护服', pinyin: 'fánghùfú', meaning: 'quần áo bảo hộ' },
    ],
    isFactoryVocabulary: true,
    tags: ['Công xưởng', 'An toàn'],
  },
  {
    id: 'word-zhiliang',
    simplified: '质量',
    pinyin: 'zhìliàng',
    pinyinClean: 'zhiliang',
    vietnameseMeanings: ['chất lượng'],
    partOfSpeech: 'Danh từ',
    hskLevel: 'HSK 4',
    frequency: 'Thông dụng',
    radicals: '贝 / 量',
    strokeCount: 21,
    componentsText: '质 (chất) + 量 (lượng)',
    grammarStructure: '质量 + 合格 / 保证 + 质量',
    examples: [
      {
        sentence: '我们要严格控制产品质量。',
        pinyin: 'Wǒmen yào yángé kòngzhì chǎnpǐn zhìliàng.',
        vietnamese: 'Chúng ta phải kiểm soát nghiêm ngặt chất lượng sản phẩm.',
      },
    ],
    relatedWords: [
      { word: '检查', pinyin: 'jiǎnchá', meaning: 'kiểm tra' },
      { word: '品质', pinyin: 'pǐnzhì', meaning: 'phẩm chất' },
    ],
    isFactoryVocabulary: true,
    tags: ['Công xưởng', 'Chất lượng'],
  },
  {
    id: 'word-jiancha',
    simplified: '检查',
    pinyin: 'jiǎnchá',
    pinyinClean: 'jiancha',
    vietnameseMeanings: ['kiểm tra', 'xem xét', 'khám'],
    partOfSpeech: 'Động từ / Danh từ',
    hskLevel: 'HSK 3',
    frequency: 'Thông dụng',
    radicals: '木 / 木',
    strokeCount: 18,
    componentsText: '检 (kiểm) + 查 (tra)',
    grammarStructure: '检查 + 机器 / 质量 + 检查',
    examples: [
      {
        sentence: '质检员正在检查第一批货。',
        pinyin: 'Zhìjiǎnyuán zhèngzài jiǎnchá dì-yī pī huò.',
        vietnamese: 'Nhân viên KCS đang kiểm tra lô hàng đầu tiên.',
      },
    ],
    relatedWords: [
      { word: '抽查', pinyin: 'chōuchá', meaning: 'kiểm tra xác suất' },
    ],
    isFactoryVocabulary: true,
    tags: ['Công xưởng', 'Kiểm tra'],
  },
  {
    id: 'word-gongzuo',
    simplified: '工作',
    pinyin: 'gōngzuò',
    pinyinClean: 'gongzuo',
    vietnameseMeanings: ['công việc', 'làm việc'],
    partOfSpeech: 'Danh từ / Động từ',
    hskLevel: 'HSK 1',
    frequency: 'Thông dụng',
    radicals: '工 / 亻',
    strokeCount: 10,
    componentsText: '工 (công) + 作 (tác)',
    grammarStructure: '参加 + 工作 / 努力 + 工作',
    examples: [
      {
        sentence: '祝你工作顺利！',
        pinyin: 'Zhù nǐ gōngzuò shùnlì!',
        vietnamese: 'Chúc bạn công việc thuận lợi!',
      },
    ],
    relatedWords: [
      { word: '员工', pinyin: 'yuángōng', meaning: 'nhân viên' },
      { word: '工作日', pinyin: 'gōngzuòrì', meaning: 'ngày làm việc' },
    ],
    tags: ['Công việc', 'Thông dụng'],
  },
  {
    id: 'word-yuangong',
    simplified: '员工',
    pinyin: 'yuángōng',
    pinyinClean: 'yuangong',
    vietnameseMeanings: ['nhân viên', 'công nhân viên'],
    partOfSpeech: 'Danh từ',
    hskLevel: 'HSK 4',
    frequency: 'Thông dụng',
    radicals: '口 / 工',
    strokeCount: 9,
    componentsText: '员 (viên) + 工 (công)',
    grammarStructure: '厂区 + 员工',
    examples: [
      {
        sentence: '公司为新员工举办了培训。',
        pinyin: 'Gōngsī wèi xīn yuángōng jǔbàn le péixùn.',
        vietnamese: 'Công ty đã tổ chức đào tạo cho nhân viên mới.',
      },
    ],
    relatedWords: [
      { word: '工人', pinyin: 'gōngrén', meaning: 'công nhân' },
    ],
    isFactoryVocabulary: true,
    tags: ['Nhân sự', 'Công xưởng'],
  },
  {
    id: 'word-jingli',
    simplified: '经理',
    pinyin: 'jīnglǐ',
    pinyinClean: 'jingli',
    vietnameseMeanings: ['giám đốc', 'quản lý'],
    partOfSpeech: 'Danh từ',
    hskLevel: 'HSK 3',
    frequency: 'Thông dụng',
    radicals: '纟 / 王',
    strokeCount: 19,
    componentsText: '经 (kinh) + 理 (lý)',
    grammarStructure: '生产 + 经理',
    examples: [
      {
        sentence: '张经理正在会议室开会。',
        pinyin: 'Zhāng jīnglǐ zhèngzài huìyìshì kāihuì.',
        vietnamese: 'Giám đốc Trương đang họp trong phòng họp.',
      },
    ],
    relatedWords: [
      { word: '主管', pinyin: 'zhǔguǎn', meaning: 'quản lý trực tiếp' },
    ],
    tags: ['Nhân sự', 'Công việc'],
  },
  {
    id: 'word-cangku',
    simplified: '仓库',
    pinyin: 'cāngkù',
    pinyinClean: 'cangku',
    vietnameseMeanings: ['kho hàng', 'nhà kho'],
    partOfSpeech: 'Danh từ',
    hskLevel: 'HSK 4',
    frequency: 'Thông dụng',
    radicals: '人 / 广',
    strokeCount: 15,
    componentsText: '仓 (thương) + 库 (khố)',
    grammarStructure: '存入 + 仓库',
    examples: [
      {
        sentence: '原材料已经送到仓库了。',
        pinyin: 'Yuáncáilèi yǐjīng sòngdào cāngkù le.',
        vietnamese: 'Nguyên vật liệu đã được chuyển đến kho rồi.',
      },
    ],
    relatedWords: [
      { word: '库存', pinyin: 'kùcún', meaning: 'hàng tồn kho' },
    ],
    isFactoryVocabulary: true,
    tags: ['Công xưởng', 'Kho hàng'],
  },
  {
    id: 'word-chanpin',
    simplified: '产品',
    pinyin: 'chǎnpǐn',
    pinyinClean: 'chanpin',
    vietnameseMeanings: ['sản phẩm', 'thành phẩm'],
    partOfSpeech: 'Danh từ',
    hskLevel: 'HSK 3',
    frequency: 'Thông dụng',
    radicals: '生 / 口',
    strokeCount: 20,
    componentsText: '产 (sản) + 品 (phẩm)',
    grammarStructure: '合格 + 产品',
    examples: [
      {
        sentence: '这款产品在市场上很受欢迎。',
        pinyin: 'Zhè kuǎn chǎnpǐn zài shìchǎng shàng hěn shòu huānyíng.',
        vietnamese: 'Mẫu sản phẩm này rất được ưa chuộng trên thị trường.',
      },
    ],
    relatedWords: [
      { word: '样品', pinyin: 'yàngpǐn', meaning: 'hàng mẫu' },
    ],
    isFactoryVocabulary: true,
    tags: ['Công xưởng', 'Sản phẩm'],
  },
  {
    id: 'word-baozhuang',
    simplified: '包装',
    pinyin: 'bāozhuāng',
    pinyinClean: 'baozhuang',
    vietnameseMeanings: ['đóng gói', 'bao bì'],
    partOfSpeech: 'Động từ / Danh từ',
    hskLevel: 'HSK 4',
    frequency: 'Thông dụng',
    radicals: '勹 / 衣',
    strokeCount: 17,
    componentsText: '包 (bao) + 装 (trang)',
    grammarStructure: '完成 + 包装',
    examples: [
      {
        sentence: '请检查包装是否完好。',
        pinyin: 'Qǐng jiǎnchá baozhuāng shìfǒu wánhǎo.',
        vietnamese: 'Xin kiểm tra bao bì xem có còn nguyên vẹn không.',
      },
    ],
    isFactoryVocabulary: true,
    tags: ['Công xưởng', 'Đóng gói'],
  },
  {
    id: 'word-hege',
    simplified: '合格',
    pinyin: 'hégé',
    pinyinClean: 'hege',
    vietnameseMeanings: ['đạt tiêu chuẩn', 'hợp lệ'],
    partOfSpeech: 'Tính từ',
    hskLevel: 'HSK 4',
    frequency: 'Thông dụng',
    radicals: '口 / 木',
    strokeCount: 16,
    componentsText: '合 (hợp) + 格 (cách)',
    grammarStructure: '检验 + 合格',
    examples: [
      {
        sentence: '这批货完全符合合格标准。',
        pinyin: 'Zhè pī huò wánquán fúhé hégé biāozhǔn.',
        vietnamese: 'Lô hàng này hoàn toàn phù hợp tiêu chuẩn đạt.',
      },
    ],
    synonyms: ['达标'],
    antonyms: ['不合格', '次品'],
    isFactoryVocabulary: true,
    tags: ['Công xưởng', 'Chất lượng'],
  },
  {
    id: 'word-zhongguo',
    simplified: '中国',
    pinyin: 'Zhōngguó',
    pinyinClean: 'zhongguo',
    vietnameseMeanings: ['Trung Quốc'],
    partOfSpeech: 'Danh từ riêng',
    hskLevel: 'HSK 1',
    frequency: 'Thông dụng',
    radicals: '丨 / 囗',
    strokeCount: 12,
    componentsText: '中 (trung) + 国 (quốc)',
    grammarStructure: '中国 + 文化 / 来自 + 中国',
    examples: [
      {
        sentence: '我正在学习中国文化。',
        pinyin: 'Wǒ zhèngzài xuéxí Zhōngguó wénhuà.',
        vietnamese: 'Tôi đang học văn hóa Trung Quốc.',
      },
    ],
    relatedWords: [
      { word: '中文', pinyin: 'Zhōngwén', meaning: 'tiếng Trung' },
    ],
    tags: ['Căn bản', 'Địa danh'],
  },
  {
    id: 'word-xiexie',
    simplified: '谢谢',
    pinyin: 'xièxie',
    pinyinClean: 'xiexie',
    vietnameseMeanings: ['cảm ơn'],
    partOfSpeech: 'Động từ',
    hskLevel: 'HSK 1',
    frequency: 'Thông dụng',
    radicals: '讠',
    strokeCount: 24,
    componentsText: '谢 (tạ) + 谢 (tạ)',
    grammarStructure: '谢谢 + 你 / 非常 + 谢谢',
    examples: [
      {
        sentence: '谢谢你的帮助！',
        pinyin: 'Xièxie nǐ de bāngzhù!',
        vietnamese: 'Cảm ơn sự giúp đỡ của bạn!',
      },
    ],
    synonyms: ['感谢'],
    tags: ['Chào hỏi', 'Giao tiếp'],
  },
  {
    id: 'word-zaijian',
    simplified: '再见',
    pinyin: 'zàijiàn',
    pinyinClean: 'zaijian',
    vietnameseMeanings: ['tạm biệt', 'hẹn gặp lại'],
    partOfSpeech: 'Thán từ',
    hskLevel: 'HSK 1',
    frequency: 'Thông dụng',
    radicals: '冂 / 见',
    strokeCount: 10,
    componentsText: '再 (tái) + 见 (kiến)',
    grammarStructure: '明天 + 再见',
    examples: [
      {
        sentence: '大家明天见，再见！',
        pinyin: 'Dàjiā míngtiān jiàn, zàijiàn!',
        vietnamese: 'Mọi người ngày mai gặp lại, tạm biệt!',
      },
    ],
    tags: ['Chào hỏi', 'Giao tiếp'],
  },
  {
    id: 'word-nihao',
    simplified: '你好',
    pinyin: 'nǐhǎo',
    pinyinClean: 'nihao',
    vietnameseMeanings: ['xin chào'],
    partOfSpeech: 'Thán từ',
    hskLevel: 'HSK 1',
    frequency: 'Thông dụng',
    radicals: '亻 / 女',
    strokeCount: 13,
    componentsText: '你 (bạn) + 好 (tốt)',
    grammarStructure: '你好 + 经理',
    examples: [
      {
        sentence: '你好！欢迎来到中国。',
        pinyin: 'Nǐ hǎo! Huānyíng láidào Zhōngguó.',
        vietnamese: 'Xin chào! Chào mừng đến với Trung Quốc.',
      },
    ],
    tags: ['Chào hỏi', 'Giao tiếp'],
  },
];

export const RECENT_SEARCHES_MOCK = [
  { id: 'word-hao', simplified: '好', pinyin: 'hǎo', meaning: 'tốt, khỏe' },
  { id: 'word-xuexi', simplified: '学习', pinyin: 'xuéxí', meaning: 'học tập' },
  { id: 'word-zhongguo', simplified: '中国', pinyin: 'Zhōngguó', meaning: 'Trung Quốc' },
  { id: 'word-xiexie', simplified: '谢谢', pinyin: 'xièxie', meaning: 'cảm ơn' },
  { id: 'word-zaijian', simplified: '再见', pinyin: 'zàijiàn', meaning: 'tạm biệt' },
];

export const VOCABULARY_TOPICS = [
  { id: 'greetings', title: 'Chào hỏi', count: 156, icon: 'chat', gradient: 'from-[#66BB6A] to-[#388E3C]' },
  { id: 'family', title: 'Gia đình', count: 248, icon: 'home', gradient: 'from-[#FFA726] to-[#F57C00]' },
  { id: 'time', title: 'Thời gian', count: 87, icon: 'clock', gradient: 'from-[#42A5F5] to-[#1E88E5]' },
  { id: 'shopping', title: 'Mua sắm', count: 132, icon: 'bag', gradient: 'from-[#AB47BC] to-[#7B1FA2]' },
  { id: 'travel', title: 'Du lịch', count: 98, icon: 'plane', gradient: 'from-[#26A69A] to-[#00897B]' },
];
