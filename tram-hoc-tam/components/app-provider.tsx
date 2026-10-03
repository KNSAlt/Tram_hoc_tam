"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { initialActivities, initialBooks, initialLessons, initialReviews, type Activity, type Book, type CopyrightStatus, type Lesson, type ReviewItem, type Role, classInfo } from "@/lib/data";

type AppState = {
  role: Role;
  lessons: Lesson[];
  books: Book[];
  reviews: ReviewItem[];
  activities: Activity[];
  completedTasks: Record<string, string[]>;
  borrowedBooks: string[];
  publishedLessons: string[];
  stationOpen: boolean;
};

type ContextType = AppState & {
  setRole: (role: Role) => void;
  toggleTask: (lessonId: string, taskIndex: number) => void;
  toggleBorrow: (bookId: string) => void;
  publishLesson: (lessonId: string) => void;
  addLesson: (input: Pick<Lesson, "subject" | "title" | "week" | "objective">) => void;
  reviewResource: (id: string, status: CopyrightStatus) => void;
  submitReview: (input: { title: string; source: string; owner: string; reason: string }) => void;
  closeStation: () => void;
  reopenStation: () => void;
  resetDemo: () => void;
};

const STORAGE_KEY = "tram-hoc-tam-mvp-v2";
const defaults: AppState = {
  role: "student",
  lessons: initialLessons,
  books: initialBooks,
  reviews: initialReviews,
  activities: initialActivities,
  completedTasks: { "toan-1": ["0"], "ngu-1": ["0", "1", "2"] },
  borrowedBooks: [],
  publishedLessons: ["toan-1"],
  stationOpen: true,
};

const AppContext = createContext<ContextType | null>(null);

function makeId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return crypto.randomUUID();
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(item => typeof item === "string");
}

// Chỉ nhận lại dữ liệu đã lưu nếu đúng dạng; dữ liệu hỏng sẽ bị bỏ qua thay vì làm sập trang.
function sanitize(raw: unknown): Partial<AppState> {
  if (!raw || typeof raw !== "object") return {};
  const r = raw as Record<string, unknown>;
  const out: Partial<AppState> = {};
  if (r.role === "student" || r.role === "teacher") out.role = r.role;
  if (Array.isArray(r.lessons) && r.lessons.length > 0) out.lessons = r.lessons as Lesson[];
  if (Array.isArray(r.books)) out.books = r.books as Book[];
  if (Array.isArray(r.reviews)) out.reviews = r.reviews as ReviewItem[];
  if (Array.isArray(r.activities)) out.activities = r.activities as Activity[];
  if (r.completedTasks && typeof r.completedTasks === "object" && !Array.isArray(r.completedTasks)) out.completedTasks = r.completedTasks as Record<string, string[]>;
  if (isStringArray(r.borrowedBooks)) out.borrowedBooks = r.borrowedBooks;
  if (isStringArray(r.publishedLessons)) out.publishedLessons = r.publishedLessons;
  if (typeof r.stationOpen === "boolean") out.stationOpen = r.stationOpen;
  return out;
}

function nowTime() {
  return new Intl.DateTimeFormat("vi-VN", { hour: "2-digit", minute: "2-digit" }).format(new Date());
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(defaults);
  const [hydrated, setHydrated] = useState(false);

  // Đọc dữ liệu đã lưu sau khi trang tải xong (tránh lệch giữa server và client).
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setState({ ...defaults, ...sanitize(JSON.parse(saved)) });
    } catch {
      // giữ dữ liệu mặc định
    }
    setHydrated(true);
  }, []);

  // Chỉ ghi lại sau khi đã đọc xong, để không ghi đè dữ liệu cũ bằng dữ liệu mặc định.
  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
  }, [state, hydrated]);

  const addActivity = (text: string) => ({ id: makeId(), time: nowTime(), text });

  const value = useMemo<ContextType>(() => ({
    ...state,
    setRole: (role) => setState(s => ({ ...s, role })),
    toggleTask: (lessonId, taskIndex) => setState(s => {
      const key = String(taskIndex);
      const current = s.completedTasks[lessonId] ?? [];
      const next = current.includes(key) ? current.filter(x => x !== key) : [...current, key];
      const lesson = s.lessons.find(l => l.id === lessonId);
      const progress = lesson ? Math.round((next.length / Math.max(lesson.tasks.length, 1)) * 100) : 0;
      return { ...s, completedTasks: { ...s.completedTasks, [lessonId]: next }, lessons: s.lessons.map(l => l.id === lessonId ? { ...l, progress, status: progress >= 100 ? "Đã hoàn thành" : progress > 0 ? "Đang học" : "Sắp học" } : l), activities: [addActivity(`${lesson?.title ?? "Bài học"}: cập nhật nhiệm vụ ${next.length}/${lesson?.tasks.length ?? 0}`), ...s.activities].slice(0, 12) };
    }),
    toggleBorrow: (bookId) => setState(s => {
      const isBorrowed = s.borrowedBooks.includes(bookId);
      const book = s.books.find(b => b.id === bookId);
      if (!book) return s;
      if (!isBorrowed && book.available <= 0) return s;
      return { ...s, borrowedBooks: isBorrowed ? s.borrowedBooks.filter(id => id !== bookId) : [...s.borrowedBooks, bookId], books: s.books.map(b => b.id === bookId ? { ...b, available: b.available + (isBorrowed ? 1 : -1) } : b), activities: [addActivity(`${isBorrowed ? "Trả" : "Đăng ký mượn"} ${book.title} • ${book.shelf}`), ...s.activities].slice(0, 12) };
    }),
    publishLesson: (lessonId) => setState(s => {
      const lesson = s.lessons.find(l => l.id === lessonId);
      if (!lesson || s.publishedLessons.includes(lessonId)) return s;
      return { ...s, publishedLessons: [...s.publishedLessons, lessonId], activities: [addActivity(`Publish ${lesson.title}`), ...s.activities].slice(0, 12) };
    }),
    addLesson: (input) => setState(s => {
      const id = `custom-${Date.now()}`;
      const lesson: Lesson = { id, ...input, status: "Sắp học", progress: 0, highlights: ["Khái niệm trọng tâm", "Ví dụ tự biên soạn", "Bài tập luyện tập"], tasks: ["Đọc Bản đồ bài học", "Xem ví dụ", "Làm bài luyện tập"], quiz: [
        { question: "Bạn đã xác định được mục tiêu bài học?", options: ["Rồi", "Chưa"], answer: 0 },
        { question: "Bạn đã làm ví dụ?", options: ["Rồi", "Chưa"], answer: 0 },
        { question: "Bạn đã hoàn thành bài tập?", options: ["Rồi", "Chưa"], answer: 0 },
      ] };
      return { ...s, lessons: [...s.lessons, lesson], activities: [addActivity(`Tạo Bản đồ bài học mới: ${lesson.title}`), ...s.activities].slice(0, 12) };
    }),
    reviewResource: (id, status) => setState(s => {
      const item = s.reviews.find(r => r.id === id);
      if (!item) return s;
      return { ...s, reviews: s.reviews.map(r => r.id === id ? { ...r, status } : r), activities: [addActivity(`${status === "XANH" ? "Duyệt" : "Chặn"} tài liệu: ${item.title}`), ...s.activities].slice(0, 12) };
    }),
    submitReview: (input) => setState(s => {
      const item: ReviewItem = { id: `review-${Date.now()}`, ...input, status: "VÀNG" };
      return { ...s, reviews: [item, ...s.reviews], activities: [addActivity(`Gửi tài liệu vào hàng đợi kiểm duyệt: ${item.title}`), ...s.activities].slice(0, 12) };
    }),
    closeStation: () => setState(s => ({ ...s, stationOpen: false, activities: [addActivity(`Đóng Trạm Học Tạm lớp ${classInfo.code}`), ...s.activities].slice(0, 12) })),
    reopenStation: () => setState(s => ({ ...s, stationOpen: true, activities: [addActivity(`Mở lại Trạm Học Tạm lớp ${classInfo.code}`), ...s.activities].slice(0, 12) })),
    resetDemo: () => setState(defaults),
  }), [state]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
