import { GrammarPoint } from '../../types/grammar';

export const GRAMMAR_POINTS_DATA: GrammarPoint[] = [
  // 1. Câu chữ 把 (HSK 3)
  {
    id: 'gp-ba-sentence',
    slug: 'cau-chu-ba',
    titleVietnamese: 'Cấu trúc Câu chữ 把 (Tác động làm thay đổi trạng thái)',
    titleChinese: '把字句',
    hskLevel: 'HSK 3',
    difficulty: 'Trung cấp',
    category: 'Câu đặc biệt (把, 被, 比)',
    summary: 'Nhấn mạnh sự tác động của chủ ngữ làm thay đổi vị trí, trạng thái hoặc kết quả của tân ngữ.',
    detailedExplanation:
      'Câu chữ 把 được dùng khi người nói muốn nhấn mạnh một hành động đã xảy ra làm thay đổi vị trí, hình dáng, tính chất hoặc quyền sở hữu của đối tượng bị tác động (tân ngữ). Tân ngữ đứng sau 把 phải là đối tượng cụ thể đã được xác định trước.',
    formulas: [
      {
        pattern: 'Chủ ngữ + 把 + Tân ngữ + Động từ + Thành phần khác (了/Bổ ngữ/Địa điểm)',
        explanation: 'Mẫu câu khẳng định cơ bản của câu chữ 把.',
        exampleChinese: '请把机器关掉。',
        examplePinyin: 'Qǐng bǎ jīqì guāndiào.',
        exampleVietnamese: 'Xin hãy tắt máy đi.',
      },
      {
        pattern: 'Chủ ngữ + 没(有) / 不 / 必须要 + 把 + Tân ngữ + Động từ...',
        explanation: 'Phó từ phủ định hoặc động từ năng nguyện BẮT BUỘC đứng TRƯỚC 把.',
        exampleChinese: '不要把手伸进机器里。',
        examplePinyin: 'Bùyào bǎ shǒu shēnjìn jīqì lǐ.',
        exampleVietnamese: 'Đừng đưa tay vào trong máy móc.',
      },
    ],
    usageConditions: [
      'Tân ngữ sau 把 phải là đối tượng cụ thể mà cả người nói và người nghe đều biết.',
      'Động từ trong câu phải là động từ tha động có tính chất tác động (không dùng với 是, 有, 喜欢, 知道...).',
      'Động từ không được đứng đơn độc, phải đi kèm bổ ngữ, 了, hoặc tân ngữ phụ.',
      'Phó từ phủ định (没, 不) và động từ năng nguyện (要, 想, 可以) phải đứng TRƯỚC chữ 把.',
    ],
    affirmativePattern: 'S + 把 + O + V + Bổ ngữ / 了',
    negativePattern: 'S + 没(有) + 把 + O + V + Bổ ngữ',
    questionPattern: 'S + 把 + O + V + Bổ ngữ + 了吗？',
    commonMistakes: [
      'Động từ đứng một mình không có thành phần bổ trợ đằng sau (Sai: 我把衣服洗。➔ Đúng: 我把衣服洗了。)',
      'Đặt 没 hoặc 不 đằng sau chữ 把 (Sai: 我把机器没关。➔ Đúng: 我 subm没把机器关掉。)',
      'Dùng với các động từ không có tính tác động như 是, 有, 在, 喜欢.',
    ],
    examples: [
      {
        id: 'ex-ba-1',
        chinese: '我把作业做完了。',
        pinyin: 'Wǒ bǎ zuòyè zuòwán le.',
        vietnamese: 'Tôi đã làm xong bài tập rồi.',
        audioText: '我把作业做完了。',
        tokens: [
          { word: '我', pinyin: 'Wǒ', role: 'Chủ ngữ (S)', roleDescription: 'Người thực hiện hành động', colorClass: 'bg-blue-100 text-blue-800' },
          { word: '把', pinyin: 'bǎ', role: 'Trợ từ (Part)', roleDescription: 'Giới từ đưa tân ngữ lên trước', colorClass: 'bg-rose-100 text-rose-800' },
          { word: '作业', pinyin: 'zuòyè', role: 'Tân ngữ (O)', roleDescription: 'Đối tượng bị tác động', colorClass: 'bg-purple-100 text-purple-800' },
          { word: '做完', pinyin: 'zuòwán', role: 'Động từ (V)', roleDescription: 'Hành động + Bổ ngữ kết quả', colorClass: 'bg-emerald-100 text-emerald-800' },
          { word: '了', pinyin: 'le', role: 'Trợ từ (Part)', roleDescription: 'Trợ từ hoàn thành', colorClass: 'bg-[#FFF3E0] text-[#E65100]' },
        ],
      },
    ],
    factoryExamples: [
      {
        id: 'fac-ba-1',
        chinese: '进入车间前，请把安全帽戴好。',
        pinyin: 'Jìnrù chējiān qián, qǐng bǎ ānquánmào dài hǎo.',
        vietnamese: 'Trước khi vào phân xưởng, xin hãy đội mũ bảo hộ cẩn thận.',
        audioText: '进入车间前，请把安全帽戴好。',
        isFactoryExample: true,
      },
      {
        id: 'fac-ba-2',
        chinese: '工人已经把故障机器修好了。',
        pinyin: 'Gōngrén yǐjīng bǎ gùzhàng jīqì xiūhǎo le.',
        vietnamese: 'Công nhân đã sửa xong chiếc máy bị sự cố rồi.',
        audioText: '工人已经把故障机器修好了。',
        isFactoryExample: true,
      },
    ],
    isFactoryTopic: true,
  },

  // 2. Câu bị động 被 (HSK 3)
  {
    id: 'gp-bei-sentence',
    slug: 'cau-bi-dong-bei',
    titleVietnamese: 'Cấu trúc Câu Bị Động Chữ 被 (Cho biết ai bị tác động)',
    titleChinese: '被字句',
    hskLevel: 'HSK 3',
    difficulty: 'Trung cấp',
    category: 'Câu đặc biệt (把, 被, 比)',
    summary: 'Biểu thị chủ ngữ chịu sự tác động hoặc ảnh hưởng từ kẻ gây ra hành động.',
    detailedExplanation:
      'Câu chữ 被 biểu thị ý nghĩa bị động. Chủ ngữ trong câu là đối tượng hứng chịu hành động, còn tác nhân gây ra hành động đứng sau chữ 被. Trong văn nói hàng ngày, 被 có thể thay bằng 让 (ràng) hoặc 叫 (jiào).',
    formulas: [
      {
        pattern: 'Chủ thể bị tác động (S) + 被 + Kẻ gây ra + Động từ + Thành phần khác',
        explanation: 'Mẫu câu bị động đầy đủ tác nhân.',
        exampleChinese: '机器被工人修好了。',
        examplePinyin: 'Jīqì bèi gōngrén xiūhǎo le.',
        exampleVietnamese: 'Máy móc đã được công nhân sửa xong.',
      },
      {
        pattern: 'Chủ thể + 被 + Động từ + Thành phần khác (Khuyết tác nhân)',
        explanation: 'Mẫu câu bị động ẩn tác nhân.',
        exampleChinese: '产品已经被送走了。',
        examplePinyin: 'Chǎnpǐn yǐjīng bèi sòngzǒu le.',
        exampleVietnamese: 'Sản phẩm đã được chuyển đi rồi.',
      },
    ],
    usageConditions: [
      'Chủ ngữ phải là đối tượng bị tác động.',
      'Động từ trong câu bị động cũng không được đứng đơn độc.',
      'Trong giao tiếp bình thường, 让 và 叫 bắt buộc phải có tác nhân đứng sau (Không thể ẩn tác nhân như 被).',
    ],
    affirmativePattern: 'S + 被 + (Tác nhân) + V + Bổ ngữ / 了',
    negativePattern: 'S + 没(有) + 被 + (Tác nhân) + V...',
    commonMistakes: [
      'Dùng 没 đằng sau 被 (Sai: 产品被没送走 ➔ Đúng: 产品没有被送走).',
      'Dùng 叫 hoặc 让 nhưng ẩn tác nhân gây ra.',
    ],
    examples: [
      {
        id: 'ex-bei-1',
        chinese: '我的手机被他拿走了。',
        pinyin: 'Wǒ de shǒujī bèi tā názǒu le.',
        vietnamese: 'Điện thoại của tôi đã bị anh ấy cầm đi rồi.',
        audioText: '我的手机被他拿走了。',
      },
    ],
    factoryExamples: [
      {
        id: 'fac-bei-1',
        chinese: '不合格的产品被退回给供应商了。',
        pinyin: 'Bù hégé de chǎnpǐn bèi tuìhuí gěi gōngyìngshāng le.',
        vietnamese: 'Sản phẩm không đạt chuẩn đã bị trả về cho nhà cung cấp.',
        audioText: '不合格的产品被退回给供应商了。',
        isFactoryExample: true,
      },
    ],
    isFactoryTopic: true,
  },

  // 3. Trợ từ kết cấu 的, 地, 得 (HSK 2-3)
  {
    id: 'gp-de-particles',
    slug: 'tro-tu-de-di-de',
    titleVietnamese: 'Phân biệt 3 Trợ từ kết cấu 的, 地, 得',
    titleChinese: '结构助词“的、地、得”',
    hskLevel: 'HSK 2',
    difficulty: 'Sơ cấp',
    category: 'Trợ từ (的/地/得, 了/过/着)',
    summary: 'Ba trợ từ phát âm giống hệt nhau ("de") nhưng có vai trò ngữ pháp hoàn toàn khác nhau trong câu.',
    detailedExplanation:
      'Trong tiếng Trung:\n- 的 (bạch bao de): Đứng trước Danh từ (Định ngữ + 的 + Danh từ).\n- 地 (thổ dã de): Đứng trước Động từ (Trạng ngữ + 地 + Động từ).\n- 得 (xích đắc de): Đứng sau Động từ (Động từ + 得 + Bổ ngữ trình độ/trạng thái).',
    formulas: [
      {
        pattern: 'Định ngữ + 的 + Danh từ',
        explanation: 'Biểu thị sở hữu hoặc tính chất bổ nghĩa cho danh từ.',
        exampleChinese: '安全的设备',
        examplePinyin: 'ānquán de shèbèi',
        exampleVietnamese: 'Thiết bị an toàn',
      },
      {
        pattern: 'Trạng ngữ + 地 + Động từ',
        explanation: 'Mô tả trạng thái hay cách thức thực hiện hành động.',
        exampleChinese: '认真地检查',
        examplePinyin: 'rènzhēn de jiǎnchá',
        exampleVietnamese: 'Kiểm tra một cách nghiêm túc',
      },
      {
        pattern: 'Động từ + 得 + Bổ ngữ trình độ / trạng thái',
        explanation: 'Đánh giá mức độ hoặc kết quả đạt được của hành động.',
        exampleChinese: '做得很好',
        examplePinyin: 'zuò de hěn hǎo',
        exampleVietnamese: 'Làm rất tốt',
      },
    ],
    usageConditions: [
      'Không được viết lẫn lộn 3 chữ 的, 地, 得 trong văn viết.',
      'Sau 得 là từ hoặc cụm từ chỉ mức độ, trình độ.',
    ],
    commonMistakes: [
      'Dùng 的 trước động từ (Sai: 认真地检查 ➔ Viết nhầm thành 认真的检查).',
      'Dùng 得 trước danh từ.',
    ],
    examples: [
      {
        id: 'ex-de-1',
        chinese: '这是我的书。',
        pinyin: 'Zhè shì wǒ de shū.',
        vietnamese: 'Đây là sách của tôi.',
        audioText: '这是我的书。',
      },
    ],
    factoryExamples: [
      {
        id: 'fac-de-1',
        chinese: '质检员仔细地检查每一件产品，机器运行得非常稳定。',
        pinyin: 'Zhìjiǎnyuán zǐxì de jiǎnchá měi yī jiàn chǎnpǐn, jīqì yùnxíng de fēicháng wěndìng.',
        vietnamese: 'Nhân viên KCS tỉ mỉ kiểm tra từng sản phẩm, máy móc vận hành cực kỳ ổn định.',
        audioText: '质检员仔细地检查每一件产品，机器运行得非常稳定。',
        isFactoryExample: true,
      },
    ],
    isFactoryTopic: true,
  },

  // 4. Trợ từ động thái 了 (HSK 1-2)
  {
    id: 'gp-le-aspect',
    slug: 'tro-tu-dong-thai-le',
    titleVietnamese: 'Trợ từ 了 (Hoàn thành hành động & Thay đổi trạng thái)',
    titleChinese: '动态助词“了”',
    hskLevel: 'HSK 1',
    difficulty: 'Cơ bản',
    category: 'Trợ từ (的/地/得, 了/过/着)',
    summary: 'Biểu thị một hành động đã hoàn thành hoặc trạng thái mới đã xuất hiện.',
    detailedExplanation:
      'Trợ từ 了 có 2 chức năng chính:\n1. 了 sau động từ: Biểu thị hành động đã thực hiện xong (Ví dụ: 我吃了饭 - Tôi đã ăn cơm).\n2. 了 cuối câu: Biểu thị sự thay đổi trạng thái hoặc tình huống mới (Ví dụ: 下雨了 - Trời mưa rồi).',
    formulas: [
      {
        pattern: 'Động từ + 了 + Tân ngữ',
        explanation: 'Hành động đã hoàn thành.',
        exampleChinese: '我买了一台设备。',
        examplePinyin: 'Wǒ mǎi le yī tái shèbèi.',
        exampleVietnamese: 'Tôi đã mua một chiếc thiết bị.',
      },
      {
        pattern: 'Chủ ngữ + Tính từ / Động từ + 了 (cuối câu)',
        explanation: 'Biểu thị sự thay đổi tình huống.',
        exampleChinese: '机器坏了。',
        examplePinyin: 'Jīqì huài le.',
        exampleVietnamese: 'Máy móc bị hỏng rồi.',
      },
    ],
    usageConditions: [
      'Không dùng 了 với các thói quen hàng ngày mang tính chu kỳ.',
      'Không dùng 了 trong câu phủ định với 没 (Khi có 没 thì bỏ 了).',
    ],
    commonMistakes: [
      'Dùng 没 và 了 cùng lúc (Sai: 我没去了一趟 ➔ Đúng: 我没去).',
      'Thêm 了 vào hành động diễn ra hàng ngày.',
    ],
    examples: [
      {
        id: 'ex-le-1',
        chinese: '我们去过了。',
        pinyin: 'Wǒmen qùguò le.',
        vietnamese: 'Chúng tôi đã từng đi rồi.',
        audioText: '我们去过了。',
      },
    ],
    factoryExamples: [
      {
        id: 'fac-le-1',
        chinese: '一车间已经完成今天的生产计划了。',
        pinyin: 'Yī chējiān yǐjīng wánchéng jīntiān de shēngchǎn jìhuà le.',
        vietnamese: 'Phân xưởng 1 đã hoàn thành kế hoạch sản xuất hôm nay rồi.',
        audioText: '一车间已经完成今天的生产计划了。',
        isFactoryExample: true,
      },
    ],
    isFactoryTopic: true,
  },

  // 5. Câu so sánh 比 (HSK 2)
  {
    id: 'gp-bi-comparison',
    slug: 'cau-so-sanh-bi',
    titleVietnamese: 'Cấu trúc Câu So Sánh Chữ 比 (A hơn B)',
    titleChinese: '“比”字比较句',
    hskLevel: 'HSK 2',
    difficulty: 'Sơ cấp',
    category: 'Câu đặc biệt (把, 被, 比)',
    summary: 'Dùng chữ 比 để so sánh mức độ, tính chất giữa đối tượng A và đối tượng B.',
    detailedExplanation:
      'Cấu trúc cơ bản: A + 比 + B + Tính từ. Nếu muốn nhấn mạnh mức độ chênh lệch nhiều, dùng 得多 (de duō) hoặc 多了 (duō le) ở cuối. Nếu chênh lệch ít, dùng 一点儿 (yìdiǎnr).',
    formulas: [
      {
        pattern: 'A + 比 + B + Tính từ + (得多 / 多了 / 一点儿)',
        explanation: 'Công thức so sánh hơn cơ bản.',
        exampleChinese: '新设备比旧设备快得多。',
        examplePinyin: 'Xīn shèbèi bǐ jiù shèbèi kuài de duō.',
        exampleVietnamese: 'Thiết bị mới nhanh hơn thiết bị cũ rất nhiều.',
      },
    ],
    usageConditions: [
      'Không dùng các phó từ chỉ mức độ như 很, 非常, 特别 trước tính từ trong câu chữ 比.',
    ],
    commonMistakes: [
      'Thêm 很 vào câu chữ 比 (Sai: A 比 B 很高 ➔ Đúng: A 比 B 高 / A 比 B 高得多).',
    ],
    examples: [
      {
        id: 'ex-bi-1',
        chinese: '哥哥比我高。',
        pinyin: 'Gēge bǐ wǒ gāo.',
        vietnamese: 'Anh trai cao hơn tôi.',
        audioText: '哥哥比我高。',
      },
    ],
    factoryExamples: [
      {
        id: 'fac-bi-1',
        chinese: '自动生产线的效率比人工操作高得多。',
        pinyin: 'Zìdòng shēngchǎnxiàn de xiàolǜ bǐ réngōng cāozuò gāo de duō.',
        vietnamese: 'Hiệu suất của dây chuyền tự động cao hơn thao tác thủ công rất nhiều.',
        audioText: '自动生产线的效率比人工操作高得多。',
        isFactoryExample: true,
      },
    ],
    isFactoryTopic: true,
  },
];
