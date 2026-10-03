"use client";

import { useMemo, useState } from "react";
import { useApp } from "@/components/app-provider";
import { IconBook, IconCheck, IconClock } from "@/components/icons";
import { Toast, useToast } from "@/components/ui";

export default function LibraryPage() {
  const { books, borrowedBooks, toggleBorrow } = useApp();
  const [query, setQuery] = useState("");
  const [subject, setSubject] = useState("Tất cả");
  const { message, toast, dismiss } = useToast();
  const subjects = ["Tất cả", ...Array.from(new Set(books.map(b => b.subject)))];
  const filtered = useMemo(() => books.filter(b => (subject === "Tất cả" || b.subject === subject) && b.title.toLowerCase().includes(query.toLowerCase())), [books, query, subject]);

  const action = (bookId: string) => {
    const book = books.find(b => b.id === bookId);
    const borrowed = borrowedBooks.includes(bookId);
    toggleBorrow(bookId);
    if (book) toast(borrowed ? `Đã trả ${book.title}.` : book.available > 0 ? `Đã đăng ký mượn ${book.title}.` : "Sách đã hết bản sẵn sàng.");
  };

  return <div className="mx-auto max-w-6xl space-y-6"><section className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8"><div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Thư viện • Tủ sách xoay vòng</div><div className="mt-2 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"><div><h1 className="text-3xl font-black tracking-tight sm:text-4xl">Sách bản gốc, dùng đúng lúc</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">Quản lý lượt mượn/trả, tìm nhanh theo môn và hiển thị số bản còn sẵn.</p></div><div className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-bold text-white">{books.reduce((sum, b) => sum + b.available, 0)} bản đang sẵn sàng</div></div></section>
    <section className="flex flex-col gap-3 sm:flex-row"><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Tìm sách..." className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-900" /><select value={subject} onChange={e => setSubject(e.target.value)} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold">{subjects.map(s => <option key={s}>{s}</option>)}</select></section>
    <section className="grid gap-4 md:grid-cols-2">{filtered.map(book => { const isBorrowed = borrowedBooks.includes(book.id); return <div key={book.id} className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-start justify-between"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-sky-50 text-sky-700"><IconBook className="h-6 w-6" /></div><span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${isBorrowed ? "bg-emerald-50 text-emerald-700" : book.available > 0 ? "bg-slate-100 text-slate-600" : "bg-rose-50 text-rose-700"}`}>{isBorrowed ? "Đang giữ" : book.available > 0 ? `${book.available} bản trống` : "Hết bản"}</span></div><h2 className="mt-5 text-xl font-black">{book.title}</h2><div className="mt-2 text-sm text-slate-500">{book.subject} • {book.copies} bản • {book.shelf}</div><div className="mt-5 grid grid-cols-2 gap-2"><button disabled={!isBorrowed && book.available <= 0} onClick={() => action(book.id)} className={`rounded-2xl px-3 py-3 text-sm font-bold ${isBorrowed ? "border border-slate-200 text-slate-700" : book.available > 0 ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-400"}`}>{isBorrowed ? "Trả sách" : "Đăng ký mượn"}</button><div className="grid place-items-center rounded-2xl bg-slate-50 text-xs font-semibold text-slate-500"><IconClock className="mr-1 inline h-4 w-4" /> {book.borrowMinutes} phút</div></div></div>; })}</section>
    <section className="rounded-[26px] border border-emerald-200 bg-emerald-50 p-5"><div className="flex gap-3"><div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-emerald-500 text-white"><IconCheck className="h-5 w-5" /></div><div><div className="font-black text-emerald-900">Nguyên tắc vận hành</div><p className="mt-1 text-sm leading-6 text-emerald-900/80">Sách được quản lý theo lượt mượn/trả. Trạm không lưu hoặc phát tán bản scan toàn bộ SGK.</p></div></div></section>
    <Toast message={message} onClose={dismiss} />
  </div>;
}
