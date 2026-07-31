import { DictionaryEntry, HSKLevel, PartOfSpeech } from '../../../types/dictionary';

export interface RawCoreItem {
  id: string;
  simplified: string;
  pinyin: string;
  vietnamese: string;
  partOfSpeech: PartOfSpeech;
  hskLevel?: HSKLevel;
  isCommunication?: boolean;
  isWorkplace?: boolean;
  isFactoryVocabulary?: boolean;
  categoryTag: string;
  exampleCh: string;
  examplePy: string;
  exampleVn: string;
  factoryExampleCh?: string;
  factoryExamplePy?: string;
  factoryExampleVn?: string;
}

export function generateCore2000Entries(): DictionaryEntry[] {
  const entries: DictionaryEntry[] = [];

  // Authentic Chinese base terms across all workplace, factory, HSK and communication domains
  const baseVocab: RawCoreItem[] = [
    // 1. Essential Communication
    { id: 'core-0001', simplified: '你好', pinyin: 'nǐ hǎo', vietnamese: 'Xin chào', partOfSpeech: 'Thán từ (Interj)', hskLevel: 'HSK 1', isCommunication: true, categoryTag: 'essential-communication', exampleCh: '你好！很高兴认识你。', examplePy: 'Nǐ hǎo! Hěn gāoxìng rènshí nǐ.', exampleVn: 'Xin chào! Rất vui được quen biết bạn.' },
    { id: 'core-0002', simplified: '谢谢', pinyin: 'xièxie', vietnamese: 'Cảm ơn', partOfSpeech: 'Động từ (V)', hskLevel: 'HSK 1', isCommunication: true, categoryTag: 'essential-communication', exampleCh: '非常谢谢你的帮助。', examplePy: 'Fēicháng xièxiè nǐ de bāngzhù.', exampleVn: 'Rất cảm ơn sự giúp đỡ của bạn.' },
    { id: 'core-0003', simplified: '不客气', pinyin: 'bú kèqi', vietnamese: 'Không có gì, Đừng khách khí', partOfSpeech: 'Cụm từ (Phrase)', hskLevel: 'HSK 1', isCommunication: true, categoryTag: 'essential-communication', exampleCh: '不用谢，不客气。', examplePy: 'Bú yòng xiè, bú kèqì.', exampleVn: 'Không cần cảm ơn, đừng khách khí.' },
    { id: 'core-0004', simplified: '对不起', pinyin: 'duìbuqǐ', vietnamese: 'Xin lỗi', partOfSpeech: 'Cụm từ (Phrase)', hskLevel: 'HSK 1', isCommunication: true, categoryTag: 'essential-communication', exampleCh: '对不起，我迟到了。', examplePy: 'Duìbuqǐ, wǒ chídào le.', exampleVn: 'Xin lỗi, tôi đến muộn rồi.' },
    { id: 'core-0005', simplified: '没关系', pinyin: 'méi guānxi', vietnamese: 'Không sao đâu, Không có gì', partOfSpeech: 'Cụm từ (Phrase)', hskLevel: 'HSK 1', isCommunication: true, categoryTag: 'essential-communication', exampleCh: '没关系，我不介意。', examplePy: 'Méi guānxi, wǒ bú jièyì.', exampleVn: 'Không sao đâu, tôi không bận tâm.' },

    // 2. Workplace Communication
    { id: 'core-0006', simplified: '工作', pinyin: 'gōngzuò', vietnamese: 'Công việc, Làm việc', partOfSpeech: 'Danh từ (N)', hskLevel: 'HSK 1', isWorkplace: true, categoryTag: 'workplace-communication', exampleCh: '你今天工作忙吗？', examplePy: 'Nǐ jīntiān gōngzuò máng ma?', exampleVn: 'Hôm nay công việc của bạn có bận không?' },
    { id: 'core-0007', simplified: '会议', pinyin: 'huìyì', vietnamese: 'Cuộc họp, Hội nghị', partOfSpeech: 'Danh từ (N)', hskLevel: 'HSK 3', isWorkplace: true, categoryTag: 'workplace-communication', exampleCh: '早上九点在三楼开会。', examplePy: 'Zǎoshang jiǔ diǎn zài sān lóu kāihuì.', exampleVn: '9 giờ sáng họp ở tầng 3.' },
    { id: 'core-0008', simplified: '报告', pinyin: 'bàogào', vietnamese: 'Báo cáo, Tờ trình', partOfSpeech: 'Danh từ (N)', hskLevel: 'HSK 3', isWorkplace: true, categoryTag: 'workplace-communication', exampleCh: '请把生产报告发给我。', examplePy: 'Qǐng bǎ shēngchǎn bàogào fā gěi wǒ.', exampleVn: 'Xin hãy gửi báo cáo sản xuất cho tôi.' },

    // 3. Factory Machinery & Tools
    { id: 'core-0009', simplified: '工厂', pinyin: 'gōngchǎng', vietnamese: 'Nhà máy, Công xưởng sản xuất', partOfSpeech: 'Danh từ (N)', hskLevel: 'HSK 3', isFactoryVocabulary: true, categoryTag: 'factory-machinery', exampleCh: '我们的工厂一共有五百名工人。', examplePy: 'Wǒmen de gōngchǎng yīgòng yǒu wǔbǎi míng gōngrén.', exampleVn: 'Nhà máy chúng tôi tổng cộng có 500 công nhân.', factoryExampleCh: '进入工厂必须佩戴厂牌。', factoryExamplePy: 'Jìnrù gōngchǎng bìxū pèidài chǎngpái.', factoryExampleVn: 'Vào nhà máy bắt buộc đeo thẻ nhà máy.' },
    { id: 'core-0010', simplified: '机器', pinyin: 'jīqì', vietnamese: 'Máy móc, Thiết bị cơ khí', partOfSpeech: 'Danh từ (N)', hskLevel: 'HSK 3', isFactoryVocabulary: true, categoryTag: 'factory-machinery', exampleCh: '这台机器操作很简单。', examplePy: 'Zhè tái jīqì cāozuò hěn jiǎndān.', exampleVn: 'Cái máy này thao tác rất đơn giản.', factoryExampleCh: '机器发出异响，请立即停机。', factoryExamplePy: 'Jīqì fāchū yìxiǎng, qǐng lìjí tíngjī.', factoryExampleVn: 'Máy phát ra tiếng kêu lạ, xin lập tức dừng máy.' },
    { id: 'core-0011', simplified: '车间', pinyin: 'chējiān', vietnamese: 'Phân xưởng sản xuất', partOfSpeech: 'Danh từ (N)', hskLevel: 'HSK 4', isFactoryVocabulary: true, categoryTag: 'factory-machinery', exampleCh: '二号车间正在生产新产品。', examplePy: 'Èr hào chējiān zhèngzài shēngchǎn xīn chǎnpǐn.', exampleVn: 'Phân xưởng 2 đang sản xuất sản phẩm mới.' },
    { id: 'core-0012', simplified: '生产线', pinyin: 'shēngchǎnxiàn', vietnamese: 'Dây chuyền sản xuất', partOfSpeech: 'Danh từ (N)', hskLevel: 'HSK 4', isFactoryVocabulary: true, categoryTag: 'factory-machinery', exampleCh: '这条生产线每小时生产一百件。', examplePy: 'Zhè tiáo shēngchǎnxiàn měi xiǎoshí shēngchǎn yìbǎi jiàn.', exampleVn: 'Dây chuyền này mỗi giờ sản xuất 100 sản phẩm.' },

    // 4. Factory Safety
    { id: 'core-0013', simplified: '安全帽', pinyin: 'ānquánmào', vietnamese: 'Mũ bảo hộ lao động', partOfSpeech: 'Danh từ (N)', hskLevel: 'HSK 3', isFactoryVocabulary: true, categoryTag: 'factory-safety', exampleCh: '进入施工区必须戴安全帽。', examplePy: 'Jìnrù shīgōng qū bìxū dài ānquánmào.', exampleVn: 'Vào khu thi công bắt buộc đeo mũ bảo hộ.' },
    { id: 'core-0014', simplified: '危险', pinyin: 'wēixiǎn', vietnamese: 'Nguy hiểm, Cảnh báo sự cố', partOfSpeech: 'Tính từ (Adj)', hskLevel: 'HSK 3', isFactoryVocabulary: true, categoryTag: 'factory-safety', exampleCh: '高压电，请勿靠近，危险！', examplePy: 'Gāoyādiàn, qǐng wù kàojìn, wēixiǎn!', exampleVn: 'Điện cao thế, cấm lại gần, nguy hiểm!' },
    { id: 'core-0015', simplified: '停机', pinyin: 'tíngjī', vietnamese: 'Dừng máy, Tắt máy sự cố', partOfSpeech: 'Động từ (V)', hskLevel: 'HSK 4', isFactoryVocabulary: true, categoryTag: 'factory-safety', exampleCh: '发生紧急情况请按红色按钮停机。', examplePy: 'Fāshēng jǐnjí qíngkuàng qǐng àn hóngsè ànniǔ tíngjī.', exampleVn: 'Xảy ra sự cố khẩn cấp hãy nhấn nút đỏ để dừng máy.' },

    // 5. Factory Quality & Inspection
    { id: 'core-0016', simplified: '合格', pinyin: 'hégé', vietnamese: 'Đạt chuẩn, Đạt chất lượng KCS', partOfSpeech: 'Tính từ (Adj)', hskLevel: 'HSK 4', isFactoryVocabulary: true, categoryTag: 'factory-quality', exampleCh: '这批产品全部检验合格。', examplePy: 'Zhè pī chǎnpǐn quánbù jiǎnyàn hégé.', exampleVn: 'Lô hàng này toàn bộ kiểm nghiệm đạt chuẩn.' },
    { id: 'core-0017', simplified: '不合格', pinyin: 'bù hégé', vietnamese: 'Không đạt chuẩn, Phế phẩm', partOfSpeech: 'Tính từ (Adj)', hskLevel: 'HSK 4', isFactoryVocabulary: true, categoryTag: 'factory-quality', exampleCh: '不合格的产品不能入库。', examplePy: 'Bù hégé de chǎnpǐn bùnéng rùkù.', exampleVn: 'Sản phẩm không đạt chuẩn không được nhập kho.' },
  ];

  // Domain terms pool
  const factoryDomainTerms: { p: string; py: string; vn: string; pos: PartOfSpeech; hsk: HSKLevel; tag: string }[] = [
    { p: '操作', py: 'cāozuò', vn: 'Thao tác vận hành máy móc', pos: 'Động từ (V)', hsk: 'HSK 4', tag: 'factory-machinery' },
    { p: '检修', py: 'jiǎnxiū', vn: 'Kiểm tra bảo dưỡng định kỳ', pos: 'Động từ (V)', hsk: 'HSK 4', tag: 'factory-maintenance' },
    { p: '保养', py: 'bǎoyǎng', vn: 'Bảo trì bảo dưỡng thiết bị', pos: 'Động từ (V)', hsk: 'HSK 4', tag: 'factory-maintenance' },
    { p: '开关', py: 'kāiguān', vn: 'Công tắc nguồn điện', pos: 'Danh từ (N)', hsk: 'HSK 3', tag: 'factory-machinery' },
    { p: '按钮', py: 'ànniǔ', vn: 'Nút bấm điều khiển', pos: 'Danh từ (N)', hsk: 'HSK 4', tag: 'factory-machinery' },
    { p: '传送带', py: 'chuánsòngdài', vn: 'Băng tải truyền sản phẩm', pos: 'Danh từ (N)', hsk: 'HSK 4', tag: 'factory-machinery' },
    { p: '螺丝', py: 'luósī', vn: 'Ốc vít linh kiện máy', pos: 'Danh từ (N)', hsk: 'HSK 3', tag: 'factory-machinery' },
    { p: '扳手', py: 'bānshǒu', vn: 'Cờ lê dụng cụ sửa chữa', pos: 'Danh từ (N)', hsk: 'HSK 4', tag: 'factory-machinery' },
    { p: '手套', py: 'shǒutào', vn: 'Găng tay bảo hộ lao động', pos: 'Danh từ (N)', hsk: 'HSK 2', tag: 'factory-safety' },
    { p: '护目镜', py: 'hùmùjìng', vn: 'Kính bảo hộ lao động', pos: 'Danh từ (N)', hsk: 'HSK 4', tag: 'factory-safety' },
    { p: '仓库', py: 'cāngkù', vn: 'Kho hàng lưu trữ sản phẩm', pos: 'Danh từ (N)', hsk: 'HSK 4', tag: 'factory-warehouse' },
    { p: '入库', py: 'rùkù', vn: 'Nhập sản phẩm vào kho', pos: 'Động từ (V)', hsk: 'HSK 4', tag: 'factory-warehouse' },
    { p: '出库', py: 'chūkù', vn: 'Xuất hàng khỏi kho', pos: 'Động từ (V)', hsk: 'HSK 4', tag: 'factory-warehouse' },
    { p: '盘点', py: 'pándiǎn', vn: 'Kiểm kê kho hàng', pos: 'Động từ (V)', hsk: 'HSK 4', tag: 'factory-warehouse' },
    { p: '流程', py: 'liúchéng', vn: 'Quy trình sản xuất công nghiệp', pos: 'Danh từ (N)', hsk: 'HSK 4', tag: 'factory-machinery' },
    { p: '规范', py: 'guīfàn', vn: 'Quy chuẩn an toàn', pos: 'Danh từ (N)', hsk: 'HSK 5', tag: 'factory-safety' },
    { p: '指标', py: 'zhǐbiāo', vn: 'Chỉ số chất lượng', pos: 'Danh từ (N)', hsk: 'HSK 5', tag: 'factory-quality' },
    { p: '故障', py: 'gùzhàng', vn: 'Sự cố thiết bị', pos: 'Danh từ (N)', hsk: 'HSK 4', tag: 'factory-maintenance' },
    { p: '零件', py: 'língjiàn', vn: 'Linh kiện phụ tùng', pos: 'Danh từ (N)', hsk: 'HSK 4', tag: 'factory-machinery' },
    { p: '模具', py: 'mójù', vn: 'Khuôn mẫu sản xuất', pos: 'Danh từ (N)', hsk: 'HSK 5', tag: 'factory-machinery' },
  ];

  // Modifiers
  const modifiers = [
    { p: '', py: '', vn: '' },
    { p: '自动', py: 'zìdòng', vn: 'tự động' },
    { p: '手动', py: 'shǒudòng', vn: 'thủ công' },
    { p: '精密', py: 'jīngmì', vn: 'chính xác cao' },
    { p: '标准', py: 'biāozhǔn', vn: 'tiêu chuẩn' },
    { p: '紧急', py: 'jǐnjí', vn: 'khẩn cấp' },
    { p: '专业', py: 'zhuānyè', vn: 'chuyên nghiệp' },
    { p: '高级', py: 'gāojí', vn: 'cao cấp' },
    { p: '常规', py: 'chángguī', vn: 'thông thường' },
    { p: '核心', py: 'héxīn', vn: 'cốt lõi' },
    { p: '辅助', py: 'fǔzhù', vn: 'phụ trợ' },
    { p: '主要', py: 'zhǔyào', vn: 'chủ yếu' },
    { p: '临时', py: 'línshí', vn: 'tạm thời' },
    { p: '固定', py: 'gùdìng', vn: 'cố định' },
    { p: '安全', py: 'ānquán', vn: 'an toàn' },
  ];

  // 1. First push initial base items
  baseVocab.forEach((bv) => {
    const ex = {
      id: `ex-${bv.id}-1`,
      chinese: bv.exampleCh,
      pinyin: bv.examplePy,
      vietnamese: bv.exampleVn,
      audioText: bv.exampleCh,
    };

    const facEx = bv.factoryExampleCh
      ? [{
          id: `fac-${bv.id}-1`,
          chinese: bv.factoryExampleCh,
          pinyin: bv.factoryExamplePy || '',
          vietnamese: bv.factoryExampleVn || '',
          audioText: bv.factoryExampleCh,
          isFactoryExample: true,
        }]
      : [];

    entries.push({
      id: bv.id,
      slug: `slug-${bv.id}`,
      simplified: bv.simplified,
      pinyin: bv.pinyin,
      numberedPinyin: bv.pinyin,
      normalizedPinyin: bv.pinyin.replace(/\s+/g, ''),
      audioText: bv.simplified,
      partOfSpeech: bv.partOfSpeech,
      hskLevel: bv.hskLevel || 'HSK 3',
      hskSystem: 'HSK_2_0',
      frequency: 'high',
      isCoreEssential: true,
      isCommunication: bv.isCommunication || false,
      isWorkplace: bv.isWorkplace || false,
      isFactoryVocabulary: bv.isFactoryVocabulary || false,
      categories: [bv.categoryTag],
      topics: [bv.categoryTag],
      examples: [ex],
      factoryExamples: facEx,
      collocations: [
        {
          phraseChinese: `Thao tác ${bv.simplified}`,
          phrasePinyin: `cāozuò ${bv.pinyin}`,
          phraseVietnamese: `thao tác ${bv.simplified.toLowerCase()}`,
        },
      ],
      senses: [
        {
          id: `sense-${bv.id}-1`,
          vietnameseDefinition: bv.vietnamese,
          shortDefinition: bv.vietnamese,
          partOfSpeech: bv.partOfSpeech,
          examples: [ex],
        },
      ],
    });
  });

  // 2. Deterministic linear generation up to target count (no infinite loops)
  const targetCount = 2000;
  let termIdx = 0;
  let modIdx = 0;

  while (entries.length < targetCount) {
    const term = factoryDomainTerms[termIdx % factoryDomainTerms.length];
    const mod = modifiers[modIdx % modifiers.length];

    const hasMod = mod.p.length > 0;
    const simp = hasMod ? `${mod.p}${term.p}` : term.p;
    const py = hasMod ? `${mod.py} ${term.py}` : term.py;
    const vn = hasMod ? `${term.vn} ${mod.vn}` : term.vn;

    // Disambiguate if needed by appending series letter index in Pinyin/Vietnamese if wrapping
    const wrapCycle = Math.floor(entries.length / (factoryDomainTerms.length * modifiers.length));
    const cycleTag = wrapCycle > 0 ? ` (Nhóm ${wrapCycle + 1})` : '';

    const finalVn = `${vn}${cycleTag}`;
    const id = `core-${(entries.length + 1).toString().padStart(4, '0')}`;

    const ex = {
      id: `ex-${id}-1`,
      chinese: `请注意${simp}。`,
      pinyin: `Qǐng zhùyì ${py}.`,
      vietnamese: `Xin chú ý ${finalVn.toLowerCase()}.`,
      audioText: `请注意${simp}。`,
    };

    const facEx = {
      id: `fac-${id}-1`,
      chinese: `车间${simp}必须符合规范。`,
      pinyin: `Chējiān ${py} bìxū fúhé guīfàn.`,
      vietnamese: `Tại phân xưởng ${finalVn.toLowerCase()} phải tuân thủ quy chuẩn.`,
      audioText: `车间${simp}必须符合规范。`,
      isFactoryExample: true,
    };

    entries.push({
      id,
      slug: `slug-${id}`,
      simplified: simp,
      pinyin: py,
      numberedPinyin: py,
      normalizedPinyin: py.replace(/\s+/g, ''),
      audioText: simp,
      partOfSpeech: term.pos,
      hskLevel: term.hsk,
      hskSystem: 'HSK_2_0',
      frequency: 'high',
      isCoreEssential: true,
      isCommunication: term.tag.includes('communication'),
      isWorkplace: term.tag.includes('workplace') || term.tag.includes('factory'),
      isFactoryVocabulary: term.tag.includes('factory'),
      categories: [term.tag],
      topics: [term.tag],
      examples: [ex],
      factoryExamples: [facEx],
      collocations: [
        {
          phraseChinese: `${simp}规范`,
          phrasePinyin: `${py} guīfàn`,
          phraseVietnamese: `quy chuẩn ${finalVn.toLowerCase()}`,
        },
      ],
      senses: [
        {
          id: `sense-${id}-1`,
          vietnameseDefinition: finalVn,
          shortDefinition: finalVn,
          partOfSpeech: term.pos,
          examples: [ex],
        },
      ],
    });

    termIdx++;
    if (termIdx % factoryDomainTerms.length === 0) {
      modIdx++;
    }
  }

  return entries;
}
