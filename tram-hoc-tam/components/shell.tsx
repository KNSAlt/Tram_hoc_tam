"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useApp } from "./app-provider";
import { IconBook, IconChart, IconClose, IconHome, IconInfo, IconLibrary, IconMenu, IconShield } from "./icons";
import { classInfo } from "@/lib/data";

const nav = [
  { href: "/", label: "Tổng quan", icon: IconHome },
  { href: "/solution", label: "Giải pháp", icon: IconInfo },
  { href: "/student", label: "Góc học sinh", icon: IconBook },
  { href: "/library", label: "Tủ sách", icon: IconLibrary },
  { href: "/teacher", label: "Góc giáo viên", icon: IconChart },
  { href: "/copyright", label: "Kiểm tra bản quyền", icon: IconShield },
];

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { role, setRole, stationOpen, resetDemo } = useApp();

  return <div className="min-h-screen bg-[#f6f8fb] text-slate-900">
    <header className="no-print sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-900 text-white shadow-sm"><span className="text-lg font-black">T</span></div>
          <div><div className="font-black tracking-tight">Trạm Học Tạm</div><div className="hidden text-[11px] text-slate-500 sm:block">Học không gián đoạn • Bản quyền được tôn trọng</div></div>
        </Link>
        <div className="flex items-center gap-3">
          <div className={`hidden items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold sm:flex ${stationOpen ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}><span className={`h-2 w-2 rounded-full ${stationOpen ? "bg-emerald-500" : "bg-slate-400"}`} /> {stationOpen ? "Trạm đang hoạt động" : "Trạm đã đóng"}</div>
          <select value={role} onChange={e => setRole(e.target.value as "student" | "teacher")} className="hidden rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold sm:block"><option value="student">Chế độ học sinh</option><option value="teacher">Chế độ giáo viên</option></select>
          <button onClick={() => { setRole(role === "student" ? "teacher" : "student"); setOpen(false); }} className="hidden rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold hover:bg-slate-50 md:block">Đổi vai trò</button>
          <div className="grid h-10 w-10 place-items-center rounded-full bg-sky-100 text-sm font-bold text-sky-800">BA</div>
          <button className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 lg:hidden" onClick={() => setOpen(v => !v)} aria-label="Mở menu">{open ? <IconClose className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}</button>
        </div>
      </div>
    </header>
    <div className="mx-auto flex max-w-[1440px]">
      <aside className={`no-print ${open ? "fixed inset-y-16 left-0 z-30 flex" : "hidden"} w-72 shrink-0 border-r border-slate-200 bg-white p-4 lg:sticky lg:top-16 lg:flex lg:h-[calc(100vh-4rem)] lg:flex-col`}>
        <div className="mb-6 rounded-3xl bg-slate-950 p-4 text-white"><div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Lớp hiện tại</div><div className="mt-2 text-2xl font-black">{classInfo.code}</div><div className="mt-1 text-sm text-slate-400">{classInfo.school}</div><div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full w-[62%] rounded-full bg-emerald-400" /></div><div className="mt-2 text-xs text-slate-300">62% học sinh đã có đủ SGK</div></div>
        <nav className="space-y-1">{nav.map(item => { const active = pathname === item.href; const Icon = item.icon; return <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className={`flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold transition ${active ? "bg-slate-900 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`}><Icon className="h-5 w-5" />{item.label}</Link>; })}</nav>
        <div className="mt-auto space-y-2"><button onClick={() => { resetDemo(); setOpen(false); }} className="w-full rounded-2xl border border-slate-200 px-3 py-3 text-xs font-bold text-slate-600 hover:bg-slate-50">Đặt lại dữ liệu demo</button><div className="rounded-3xl border border-slate-200 bg-slate-50 p-4"><div className="text-sm font-bold">Chế độ chuyển tiếp</div><div className="mt-1 text-xs leading-5 text-slate-500">Chỉ duy trì trong thời gian thiếu sách. Không dùng để phát tán bản scan toàn bộ SGK.</div></div></div>
      </aside>
      <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
    </div>
  </div>;
}
