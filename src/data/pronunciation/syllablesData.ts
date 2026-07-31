export interface SyllableExample {
  character: string;
  pinyinWithTone: string;
  tone: number;
  vietnamese: string;
  audioText: string;
  isFactoryWord?: boolean;
}

export interface PinyinSyllable {
  id: string;
  baseSyllable: string; // e.g. "hao"
  initial: string; // e.g. "h"
  final: string; // e.g. "ao"
  articulationGroup: string;
  validTones: number[]; // e.g. [1, 2, 3, 4]
  examples: SyllableExample[];
  isRare?: boolean;
}

// Complete Standard Mandarin Valid Syllables List (~400 syllables)
export const VALID_MANDARIN_SYLLABLES: PinyinSyllable[] = [
  // b
  { id: 'syl-ba', baseSyllable: 'ba', initial: 'b', final: 'a', articulationGroup: 'bilabial', validTones: [1, 2, 3, 4], examples: [{ character: '八', pinyinWithTone: 'bā', tone: 1, vietnamese: 'số 8', audioText: '八' }] },
  { id: 'syl-bo', baseSyllable: 'bo', initial: 'b', final: 'o', articulationGroup: 'bilabial', validTones: [1, 2, 3, 4], examples: [{ character: '波', pinyinWithTone: 'bō', tone: 1, vietnamese: 'sóng', audioText: '波' }] },
  { id: 'syl-bai', baseSyllable: 'bai', initial: 'b', final: 'ai', articulationGroup: 'bilabial', validTones: [1, 2, 3, 4], examples: [{ character: '白', pinyinWithTone: 'bái', tone: 2, vietnamese: 'màu trắng', audioText: '白' }] },
  { id: 'syl-bei', baseSyllable: 'bei', initial: 'b', final: 'ei', articulationGroup: 'bilabial', validTones: [1, 2, 3, 4], examples: [{ character: '北', pinyinWithTone: 'běi', tone: 3, vietnamese: 'phía bắc', audioText: '北' }] },
  { id: 'syl-bao', baseSyllable: 'bao', initial: 'b', final: 'ao', articulationGroup: 'bilabial', validTones: [1, 2, 3, 4], examples: [{ character: '包', pinyinWithTone: 'bāo', tone: 1, vietnamese: 'gói, bao', audioText: '包' }, { character: '包装', pinyinWithTone: 'bāozhuāng', tone: 1, vietnamese: 'đóng gói', audioText: '包装', isFactoryWord: true }] },
  { id: 'syl-ban', baseSyllable: 'ban', initial: 'b', final: 'an', articulationGroup: 'bilabial', validTones: [1, 2, 3, 4], examples: [{ character: '班', pinyinWithTone: 'bān', tone: 1, vietnamese: 'lớp, ca làm việc', audioText: '班', isFactoryWord: true }] },
  { id: 'syl-ben', baseSyllable: 'ben', initial: 'b', final: 'en', articulationGroup: 'bilabial', validTones: [1, 3, 4], examples: [{ character: '本', pinyinWithTone: 'běn', tone: 3, vietnamese: 'cuốn, sách', audioText: '本' }] },
  { id: 'syl-bang', baseSyllable: 'bang', initial: 'b', final: 'ang', articulationGroup: 'bilabial', validTones: [1, 3, 4], examples: [{ character: '帮', pinyinWithTone: 'bāng', tone: 1, vietnamese: 'giúp đỡ', audioText: '帮' }] },
  { id: 'syl-beng', baseSyllable: 'beng', initial: 'b', final: 'eng', articulationGroup: 'bilabial', validTones: [1, 2, 3, 4], examples: [{ character: '蹦', pinyinWithTone: 'bèng', tone: 4, vietnamese: 'nhảy', audioText: '蹦' }] },
  { id: 'syl-bi', baseSyllable: 'bi', initial: 'b', final: 'i', articulationGroup: 'bilabial', validTones: [1, 2, 3, 4], examples: [{ character: '比', pinyinWithTone: 'bǐ', tone: 3, vietnamese: 'so sánh', audioText: '比' }] },
  { id: 'syl-bie', baseSyllable: 'bie', initial: 'b', final: 'ie', articulationGroup: 'bilabial', validTones: [1, 2, 3, 4], examples: [{ character: '别', pinyinWithTone: 'bié', tone: 2, vietnamese: 'đừng, khác', audioText: '别' }] },
  { id: 'syl-biao', baseSyllable: 'biao', initial: 'b', final: 'iao', articulationGroup: 'bilabial', validTones: [1, 3, 4], examples: [{ character: '表', pinyinWithTone: 'biǎo', tone: 3, vietnamese: 'bảng biểu', audioText: '表' }] },
  { id: 'syl-bian', baseSyllable: 'bian', initial: 'b', final: 'ian', articulationGroup: 'bilabial', validTones: [1, 3, 4], examples: [{ character: '边', pinyinWithTone: 'biān', tone: 1, vietnamese: 'bên cạnh', audioText: '边' }] },
  { id: 'syl-bin', baseSyllable: 'bin', initial: 'b', final: 'in', articulationGroup: 'bilabial', validTones: [1, 3, 4], examples: [{ character: '宾', pinyinWithTone: 'bīn', tone: 1, vietnamese: 'khách', audioText: '宾' }] },
  { id: 'syl-bing', baseSyllable: 'bing', initial: 'b', final: 'ing', articulationGroup: 'bilabial', validTones: [1, 3, 4], examples: [{ character: '冰', pinyinWithTone: 'bīng', tone: 1, vietnamese: 'đá lạnh', audioText: '冰' }] },
  { id: 'syl-bu', baseSyllable: 'bu', initial: 'b', final: 'u', articulationGroup: 'bilabial', validTones: [1, 2, 3, 4], examples: [{ character: '不', pinyinWithTone: 'bù', tone: 4, vietnamese: 'không', audioText: '不' }] },

  // p
  { id: 'syl-pa', baseSyllable: 'pa', initial: 'p', final: 'a', articulationGroup: 'bilabial', validTones: [1, 2, 3, 4], examples: [{ character: '爬', pinyinWithTone: 'pá', tone: 2, vietnamese: 'bò, leo', audioText: '爬' }] },
  { id: 'syl-po', baseSyllable: 'po', initial: 'p', final: 'o', articulationGroup: 'bilabial', validTones: [1, 2, 3, 4], examples: [{ character: '破', pinyinWithTone: 'pò', tone: 4, vietnamese: 'hỏng, vỡ', audioText: '破' }] },
  { id: 'syl-pai', baseSyllable: 'pai', initial: 'p', final: 'ai', articulationGroup: 'bilabial', validTones: [1, 2, 3, 4], examples: [{ character: '派', pinyinWithTone: 'pài', tone: 4, vietnamese: 'phái, phân công', audioText: '派' }] },
  { id: 'syl-pao', baseSyllable: 'pao', initial: 'p', final: 'ao', articulationGroup: 'bilabial', validTones: [1, 2, 3, 4], examples: [{ character: '跑', pinyinWithTone: 'pǎo', tone: 3, vietnamese: 'chạy', audioText: '跑' }] },
  { id: 'syl-pou', baseSyllable: 'pou', initial: 'p', final: 'ou', articulationGroup: 'bilabial', validTones: [1, 2, 3, 4], examples: [{ character: '剖', pinyinWithTone: 'pōu', tone: 1, vietnamese: 'mổ xẻ', audioText: '剖' }] },
  { id: 'syl-pan', baseSyllable: 'pan', initial: 'p', final: 'an', articulationGroup: 'bilabial', validTones: [1, 2, 3, 4], examples: [{ character: '盘', pinyinWithTone: 'pán', tone: 2, vietnamese: 'khay, đĩa', audioText: '盘' }] },
  { id: 'syl-pen', baseSyllable: 'pen', initial: 'p', final: 'en', articulationGroup: 'bilabial', validTones: [1, 2, 3, 4], examples: [{ character: '喷', pinyinWithTone: 'pēn', tone: 1, vietnamese: 'phun sơn', audioText: '喷', isFactoryWord: true }] },
  { id: 'syl-pang', baseSyllable: 'pang', initial: 'p', final: 'ang', articulationGroup: 'bilabial', validTones: [1, 2, 3, 4], examples: [{ character: '旁', pinyinWithTone: 'páng', tone: 2, vietnamese: 'bên cạnh', audioText: '旁' }] },
  { id: 'syl-peng', baseSyllable: 'peng', initial: 'p', final: 'eng', articulationGroup: 'bilabial', validTones: [1, 2, 3, 4], examples: [{ character: '碰', pinyinWithTone: 'pèng', tone: 4, vietnamese: 'va chạm', audioText: '碰' }] },
  { id: 'syl-pi', baseSyllable: 'pi', initial: 'p', final: 'i', articulationGroup: 'bilabial', validTones: [1, 2, 3, 4], examples: [{ character: '批', pinyinWithTone: 'pī', tone: 1, vietnamese: 'lô hàng / phê duyệt', audioText: '批', isFactoryWord: true }] },
  { id: 'syl-pie', baseSyllable: 'pie', initial: 'p', final: 'ie', articulationGroup: 'bilabial', validTones: [1, 3, 4], examples: [{ character: '撇', pinyinWithTone: 'piě', tone: 3, vietnamese: 'nét phẩy', audioText: '撇' }] },
  { id: 'syl-piao', baseSyllable: 'piao', initial: 'p', final: 'iao', articulationGroup: 'bilabial', validTones: [1, 3, 4], examples: [{ character: '票', pinyinWithTone: 'piào', tone: 4, vietnamese: 'vé, phiếu', audioText: '票' }] },
  { id: 'syl-pian', baseSyllable: 'pian', initial: 'p', final: 'ian', articulationGroup: 'bilabial', validTones: [1, 3, 4], examples: [{ character: '片', pinyinWithTone: 'piàn', tone: 4, vietnamese: 'miếng, tấm', audioText: '片' }] },
  { id: 'syl-pin', baseSyllable: 'pin', initial: 'p', final: 'in', articulationGroup: 'bilabial', validTones: [1, 3, 4], examples: [{ character: '品质', pinyinWithTone: 'pǐnzhì', tone: 3, vietnamese: 'phẩm chất / chất lượng', audioText: '品质', isFactoryWord: true }] },
  { id: 'syl-ping', baseSyllable: 'ping', initial: 'p', final: 'ing', articulationGroup: 'bilabial', validTones: [1, 2, 3, 4], examples: [{ character: '平', pinyinWithTone: 'píng', tone: 2, vietnamese: 'bằng phẳng', audioText: '平' }] },
  { id: 'syl-pu', baseSyllable: 'pu', initial: 'p', final: 'u', articulationGroup: 'bilabial', validTones: [1, 2, 3, 4], examples: [{ character: '普', pinyinWithTone: 'pǔ', tone: 3, vietnamese: 'phổ thông', audioText: '普' }] },

  // m
  { id: 'syl-ma', baseSyllable: 'ma', initial: 'm', final: 'a', articulationGroup: 'bilabial', validTones: [1, 2, 3, 4, 0], examples: [{ character: '妈', pinyinWithTone: 'mā', tone: 1, vietnamese: 'mẹ', audioText: '妈' }] },
  { id: 'syl-mo', baseSyllable: 'mo', initial: 'm', final: 'o', articulationGroup: 'bilabial', validTones: [1, 2, 3, 4], examples: [{ character: '模具', pinyinWithTone: 'mújù', tone: 2, vietnamese: 'khuôn mẫu nhà máy', audioText: '模具', isFactoryWord: true }] },
  { id: 'syl-me', baseSyllable: 'me', initial: 'm', final: 'e', articulationGroup: 'bilabial', validTones: [0], examples: [{ character: '么', pinyinWithTone: 'me', tone: 0, vietnamese: 'trợ từ', audioText: '么' }] },
  { id: 'syl-mai', baseSyllable: 'mai', initial: 'm', final: 'ai', articulationGroup: 'bilabial', validTones: [1, 2, 3, 4], examples: [{ character: '买', pinyinWithTone: 'mǎi', tone: 3, vietnamese: 'mua', audioText: '买' }] },
  { id: 'syl-mei', baseSyllable: 'mei', initial: 'm', final: 'ei', articulationGroup: 'bilabial', validTones: [2, 3, 4], examples: [{ character: '没', pinyinWithTone: 'méi', tone: 2, vietnamese: 'chưa, không có', audioText: '没' }] },
  { id: 'syl-mao', baseSyllable: 'mao', initial: 'm', final: 'ao', articulationGroup: 'bilabial', validTones: [1, 2, 3, 4], examples: [{ character: '帽子', pinyinWithTone: 'màozi', tone: 4, vietnamese: 'mũ bảo hộ', audioText: '帽子', isFactoryWord: true }] },
  { id: 'syl-mou', baseSyllable: 'mou', initial: 'm', final: 'ou', articulationGroup: 'bilabial', validTones: [3], examples: [{ character: '某', pinyinWithTone: 'mǒu', tone: 3, vietnamese: 'nào đó', audioText: '某' }] },

  // f
  { id: 'syl-fa', baseSyllable: 'fa', initial: 'f', final: 'a', articulationGroup: 'labiodental', validTones: [1, 2, 3, 4], examples: [{ character: '发', pinyinWithTone: 'fā', tone: 1, vietnamese: 'phát, gửi', audioText: '发' }] },
  { id: 'syl-fo', baseSyllable: 'fo', initial: 'f', final: 'o', articulationGroup: 'labiodental', validTones: [2], examples: [{ character: '佛', pinyinWithTone: 'fó', tone: 2, vietnamese: 'Phật', audioText: '佛' }] },
  { id: 'syl-fei', baseSyllable: 'fei', initial: 'f', final: 'ei', articulationGroup: 'labiodental', validTones: [1, 2, 4], examples: [{ character: '飞', pinyinWithTone: 'fēi', tone: 1, vietnamese: 'bay', audioText: '飞' }] },
  { id: 'syl-fou', baseSyllable: 'fou', initial: 'f', final: 'ou', articulationGroup: 'labiodental', validTones: [3], examples: [{ character: '否', pinyinWithTone: 'fǒu', tone: 3, vietnamese: 'phủ định', audioText: '否' }] },
  { id: 'syl-fan', baseSyllable: 'fan', initial: 'f', final: 'an', articulationGroup: 'labiodental', validTones: [1, 2, 3, 4], examples: [{ character: '饭', pinyinWithTone: 'fàn', tone: 4, vietnamese: 'cơm', audioText: '饭' }] },
  { id: 'syl-fen', baseSyllable: 'fen', initial: 'f', final: 'en', articulationGroup: 'labiodental', validTones: [1, 3, 4], examples: [{ character: '分', pinyinWithTone: 'fēn', tone: 1, vietnamese: 'phút', audioText: '分' }] },
  { id: 'syl-fang', baseSyllable: 'fang', initial: 'f', final: 'ang', articulationGroup: 'labiodental', validTones: [1, 2, 3, 4], examples: [{ character: '防护服', pinyinWithTone: 'fánghùfú', tone: 2, vietnamese: 'quần áo bảo hộ', audioText: '防护服', isFactoryWord: true }] },

  // g / k / h
  { id: 'syl-gong', baseSyllable: 'gong', initial: 'g', final: 'ong', articulationGroup: 'velar', validTones: [1, 3, 4], examples: [{ character: '工厂', pinyinWithTone: 'gōngchǎng', tone: 1, vietnamese: 'nhà máy', audioText: '工厂', isFactoryWord: true }] },
  { id: 'syl-kai', baseSyllable: 'kai', initial: 'k', final: 'ai', articulationGroup: 'velar', validTones: [1, 3, 4], examples: [{ character: '开机', pinyinWithTone: 'kāijī', tone: 1, vietnamese: 'khởi động', audioText: '开机', isFactoryWord: true }] },
  { id: 'syl-hao', baseSyllable: 'hao', initial: 'h', final: 'ao', articulationGroup: 'velar', validTones: [3, 4], examples: [{ character: '好', pinyinWithTone: 'hǎo', tone: 3, vietnamese: 'tốt', audioText: '好' }] },
  { id: 'syl-he', baseSyllable: 'he', initial: 'h', final: 'e', articulationGroup: 'velar', validTones: [2, 4], examples: [{ character: '合格', pinyinWithTone: 'hégé', tone: 2, vietnamese: 'đạt tiêu chuẩn', audioText: '合格', isFactoryWord: true }] },

  // j / q / x
  { id: 'syl-ji', baseSyllable: 'ji', initial: 'j', final: 'i', articulationGroup: 'palatal', validTones: [1, 2, 3, 4], examples: [{ character: '机器', pinyinWithTone: 'jīqì', tone: 1, vietnamese: 'máy móc', audioText: '机器', isFactoryWord: true }] },
  { id: 'syl-qi', baseSyllable: 'qi', initial: 'q', final: 'i', articulationGroup: 'palatal', validTones: [1, 2, 3, 4], examples: [{ character: '七', pinyinWithTone: 'qī', tone: 1, vietnamese: 'số 7', audioText: '七' }] },
  { id: 'syl-xian', baseSyllable: 'xian', initial: 'x', final: 'ian', articulationGroup: 'palatal', validTones: [1, 3, 4], examples: [{ character: '生产线', pinyinWithTone: 'shēngchǎnxiàn', tone: 4, vietnamese: 'dây chuyền sản xuất', audioText: '生产线', isFactoryWord: true }] },

  // zh / ch / sh / r
  { id: 'syl-zhi', baseSyllable: 'zhi', initial: 'zh', final: 'i', articulationGroup: 'retroflex', validTones: [1, 2, 3, 4], examples: [{ character: '质量', pinyinWithTone: 'zhìliàng', tone: 4, vietnamese: 'chất lượng', audioText: '质量', isFactoryWord: true }] },
  { id: 'syl-che', baseSyllable: 'che', initial: 'ch', final: 'e', articulationGroup: 'retroflex', validTones: [1, 3], examples: [{ character: '车间', pinyinWithTone: 'chējiān', tone: 1, vietnamese: 'phân xưởng', audioText: '车间', isFactoryWord: true }] },
  { id: 'syl-sheng', baseSyllable: 'sheng', initial: 'sh', final: 'eng', articulationGroup: 'retroflex', validTones: [1, 2, 3, 4], examples: [{ character: '生产线', pinyinWithTone: 'shēngchǎnxiàn', tone: 1, vietnamese: 'sản xuất', audioText: '生产线', isFactoryWord: true }] },
  { id: 'syl-ren', baseSyllable: 'ren', initial: 'r', final: 'en', articulationGroup: 'retroflex', validTones: [2, 3, 4], examples: [{ character: '人', pinyinWithTone: 'rén', tone: 2, vietnamese: 'người', audioText: '人' }] },

  // z / c / s
  { id: 'syl-zuo', baseSyllable: 'zuo', initial: 'z', final: 'uo', articulationGroup: 'dental', validTones: [1, 3, 4], examples: [{ character: '操作', pinyinWithTone: 'cāozuò', tone: 4, vietnamese: 'thao tác', audioText: '操作', isFactoryWord: true }] },
  { id: 'syl-cao', baseSyllable: 'cao', initial: 'c', final: 'ao', articulationGroup: 'dental', validTones: [1, 3, 4], examples: [{ character: '操', pinyinWithTone: 'cāo', tone: 1, vietnamese: 'thao tác', audioText: '操', isFactoryWord: true }] },
  { id: 'syl-si', baseSyllable: 'si', initial: 's', final: 'i', articulationGroup: 'dental', validTones: [1, 3, 4], examples: [{ character: '四', pinyinWithTone: 'sì', tone: 4, vietnamese: 'số 4', audioText: '四' }] },
];
