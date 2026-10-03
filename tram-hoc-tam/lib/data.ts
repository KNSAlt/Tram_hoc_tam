export type LessonStatus = "Đang học" | "Sắp học" | "Đã hoàn thành";
export type CopyrightStatus = "XANH" | "VÀNG" | "ĐỎ";
export type Role = "student" | "teacher";

export type Lesson = {
  id: string;
  subject: string;
  title: string;
  week: number;
  status: LessonStatus;
  progress: number;
  objective: string;
  highlights: string[];
  tasks: string[];
  quiz: { question: string; options: string[]; answer: number }[];
};

export type Book = {
  id: string;
  title: string;
  subject: string;
  copies: number;
  available: number;
  shelf: string;
  borrowMinutes: number;
};

export type ReviewItem = {
  id: string;
  title: string;
  source: string;
  status: CopyrightStatus;
  owner: string;
  reason: string;
};

export type Activity = { id: string; time: string; text: string };

export const classInfo = {
  code: "7A1",
  school: "Trường THCS Minh Hòa",
  students: 40,
  missingBooks: 15,
  transitionEnds: "18/09/2026",
};

export const studentDirectory = [
  { id: "HS001", name: "Nguyễn Minh Anh", hasAllBooks: false, progress: 72 },
  { id: "HS002", name: "Trần Gia Huy", hasAllBooks: false, progress: 84 },
  { id: "HS003", name: "Lê Khánh Linh", hasAllBooks: true, progress: 100 },
  { id: "HS004", name: "Phạm Đức Minh", hasAllBooks: false, progress: 55 },
  { id: "HS005", name: "Võ Ngọc Hà", hasAllBooks: true, progress: 93 },
  { id: "HS006", name: "Đỗ Hoàng Nam", hasAllBooks: false, progress: 61 },
];

export const initialLessons: Lesson[] = [
  {
    id: "toan-1",
    subject: "Toán 7",
    title: "Số hữu tỉ và tập hợp số hữu tỉ",
    week: 1,
    status: "Đang học",
    progress: 72,
    objective: "Nhận biết số hữu tỉ, biểu diễn và so sánh các số hữu tỉ.",
    highlights: ["Khái niệm số hữu tỉ", "Biểu diễn trên trục số", "So sánh và phép tính cơ bản"],
    tasks: ["Đọc Bản đồ bài học", "Xem ví dụ do giáo viên biên soạn", "Làm bài luyện tập"],
    quiz: [
      { question: "Số nào sau đây là số hữu tỉ?", options: ["√2", "3/5", "π", "√3"], answer: 1 },
      { question: "Phân số -6/8 rút gọn bằng", options: ["-3/4", "3/4", "-4/3", "6/8"], answer: 0 },
      { question: "Số 0 thuộc tập nào?", options: ["Q", "Không thuộc Q", "Chỉ thuộc N", "Chỉ thuộc Z"], answer: 0 },
    ],
  },
  {
    id: "ngu-1",
    subject: "Ngữ văn 7",
    title: "Đọc hiểu văn bản và cách ghi chú",
    week: 1,
    status: "Đã hoàn thành",
    progress: 100,
    objective: "Biết xác định ý chính và ghi chú nội dung quan trọng trong văn bản.",
    highlights: ["Ý chính", "Từ khóa", "Ghi chú bên lề"],
    tasks: ["Ôn lại 3 từ khóa", "Hoàn thành phiếu đọc hiểu", "Tự kiểm tra 1 phút"],
    quiz: [
      { question: "Ý chính của văn bản là gì?", options: ["Chi tiết nhỏ", "Thông điệp trọng tâm", "Một từ khóa", "Tiêu đề"], answer: 1 },
      { question: "Ghi chú tốt nên", options: ["Dài nhất có thể", "Chọn từ khóa", "Sao chép toàn bài", "Không cần cấu trúc"], answer: 1 },
      { question: "Cách đọc hiệu quả là", options: ["Đọc lướt mọi thứ", "Chỉ đọc tiêu đề", "Đặt câu hỏi khi đọc", "Không ghi chú"], answer: 2 },
    ],
  },
  {
    id: "khtn-2",
    subject: "Khoa học tự nhiên 7",
    title: "Năng lượng và sự chuyển hóa",
    week: 2,
    status: "Sắp học",
    progress: 0,
    objective: "Mô tả được một số dạng năng lượng và ví dụ về chuyển hóa năng lượng.",
    highlights: ["Dạng năng lượng", "Chuyển hóa", "Ví dụ thực tiễn"],
    tasks: ["Xem sơ đồ khái niệm", "Chuẩn bị ví dụ từ đời sống", "Tự kiểm tra 1 phút"],
    quiz: [
      { question: "Điện năng có thể chuyển hóa thành", options: ["Quang năng", "Âm năng", "Nhiệt năng", "Cả 3"], answer: 3 },
      { question: "Năng lượng là đại lượng", options: ["Không liên quan công", "Cho khả năng thực hiện công", "Chỉ có trong điện", "Chỉ có trong cơ học"], answer: 1 },
      { question: "Ví dụ chuyển hóa năng lượng", options: ["Đèn pin: hóa → điện → quang", "Đá đứng yên", "Sách trên bàn", "Không có"], answer: 0 },
    ],
  },
];

export const initialBooks: Book[] = [
  { id: "b1", title: "Toán 7", subject: "Toán", copies: 4, shelf: "Kệ B2", available: 2, borrowMinutes: 20 },
  { id: "b2", title: "Ngữ văn 7", subject: "Ngữ văn", copies: 5, shelf: "Kệ A1", available: 3, borrowMinutes: 20 },
  { id: "b3", title: "Khoa học tự nhiên 7", subject: "KHTN", copies: 3, shelf: "Kệ C1", available: 1, borrowMinutes: 20 },
  { id: "b4", title: "Lịch sử và Địa lí 7", subject: "LS&ĐL", copies: 2, shelf: "Kệ D1", available: 2, borrowMinutes: 20 },
];

export const initialReviews: ReviewItem[] = [
  { id: "r1", title: "Bản đồ bài học — Toán 7 / Tuần 1", source: "Giáo viên tự biên soạn", status: "XANH", owner: "Tổ Toán", reason: "Tài liệu mới, tự biên soạn." },
  { id: "r2", title: "Ảnh minh họa: Trục số", source: "Nguồn bên thứ ba", status: "VÀNG", owner: "GV Nguyễn A.", reason: "Chưa lưu giấy phép/điều kiện sử dụng." },
  { id: "r3", title: "PDF SGK Toán 7 (scan toàn bộ)", source: "Chưa xác minh", status: "ĐỎ", owner: "Phụ huynh gửi", reason: "Bản sao toàn bộ SGK, không có bằng chứng quyền sử dụng." },
];

export const initialActivities: Activity[] = [
  { id: "a1", time: "08:15", text: "Xác nhận 15/40 học sinh chưa đủ SGK" },
  { id: "a2", time: "08:27", text: "Publish Bản đồ bài học Toán 7 / Tuần 1" },
  { id: "a3", time: "08:41", text: "1 tài liệu chuyển trạng thái VÀNG" },
  { id: "a4", time: "09:05", text: "Đồng bộ tủ sách Kệ B2" },
];
