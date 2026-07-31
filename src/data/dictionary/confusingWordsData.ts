import { ConfusingWordPair } from '../../types/dictionary';

export const CONFUSING_WORDS_DATA: ConfusingWordPair[] = [
  {
    id: 'cw-1',
    wordA: '合格',
    pinyinA: 'hégé',
    wordB: '合适',
    pinyinB: 'héshì',
    differenceSummary: '合格 (hégé): Đạt tiêu chuẩn/chất lượng quy định; 合适 (héshì): Thích hợp, vừa vặn (tính từ).',
    exampleA: '这批产品全部合格。(Lô sản phẩm này đều đạt chuẩn)',
    exampleB: '这件工作服很合适。(Bộ quần áo bảo hộ này rất vừa vặn)',
  },
  {
    id: 'cw-2',
    wordA: '适合',
    pinyinA: 'shìhé',
    wordB: '合适',
    pinyinB: 'héshì',
    differenceSummary: '适合 (shìhé) là Động từ (nhận tân ngữ theo sau, ví dụ: 适合你); 合适 (héshì) là Tính từ (không nhận tân ngữ).',
    exampleA: '这个工作适合你。(Công việc này phù hợp với bạn)',
    exampleB: '时间很合适。(Thời gian rất thích hợp)',
  },
  {
    id: 'cw-3',
    wordA: '检查',
    pinyinA: 'jiǎnchá',
    wordB: '检验',
    pinyinB: 'jiǎnyàn',
    differenceSummary: '检查 (jiǎnchá): Kiểm tra tổng quát; 检验 (jiǎnyàn): Kiểm nghiệm bằng thiết bị/tiêu chuẩn kỹ thuật KCS.',
    exampleA: '开机前请检查设备。(Trước khi mở máy hãy kiểm tra thiết bị)',
    exampleB: '质检员正在检验产品。(Nhân viên KCS đang kiểm nghiệm sản phẩm)',
  },
  {
    id: 'cw-4',
    wordA: '维修',
    pinyinA: 'wéixiū',
    wordB: '维护',
    pinyinB: 'wéihù',
    differenceSummary: '维修 (wéixiū): Sửa chữa khi máy hỏng; 维护 (wéihù): Bảo trì định kỳ để máy không bị hỏng.',
    exampleA: '机器坏了，需要维修。(Máy hỏng rồi, cần sửa chữa)',
    exampleB: '日常要做好设备维护。(Hàng ngày phải làm tốt việc bảo trì thiết bị)',
  },
];
