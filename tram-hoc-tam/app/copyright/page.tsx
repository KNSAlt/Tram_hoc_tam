"use client";

import { useState } from "react";
import { useApp } from "@/components/app-provider";
import { type CopyrightStatus } from "@/lib/data";
import { IconCheck, IconShield } from "@/components/icons";
import { Modal, Toast, useToast } from "@/components/ui";

const config: Record<CopyrightStatus, { bg: string; text: string; label: string }> = {
  XANH: { bg: "bg-emerald-50", text: "text-emerald-700", label: "Được sử dụng" },
  VÀNG: { bg: "bg-amber-50", text: "text-amber-700", label: "Cần kiểm tra" },
  ĐỎ: { bg: "bg-rose-50", text: "text-rose-700", label: "Không publish" },
};

export default function CopyrightPage() {
  const { reviews, reviewResource, submitReview } = useApp();
  const { message, toast, dismiss } = useToast();
  const [addOpen, setAddOpen] = useState(false);
  const [title, setTitle] = useState(""); const [source, setSource] = useState(""); const [owner, setOwner] = useState(""); const [reason, setReason] = useState("");
  const change = (id: string, status: CopyrightStatus) => { reviewResource(id, status); toast(status === "XANH" ? "Đã duyệt tài liệu." : "Đã chặn publish tài liệu."); };
  const submit = () => { if (!title.trim() || !source.trim() || !owner.trim()) return toast("Vui lòng nhập tiêu đề, nguồn và người phụ trách."); submitReview({ title, source, owner, reason: reason || "Cần kiểm tra trước khi publish." }); setAddOpen(false); setTitle(""); setSource(""); setOwner(""); setReason(""); toast("Đã đưa tài liệu vào hàng đợi VÀNG."); };

  return <div className="mx-auto max-w-6xl space-y-6"><section className="rounded-[30px] bg-slate-950 p-6 text-white shadow-xl sm:p-8"><div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"><div><div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Copyright guardrails</div><h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Không biến trạm thành kho sao chép.</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">Tài liệu phải có nguồn, trạng thái quyền sử dụng và người chịu trách nhiệm trước khi publish.</p></div><div className="grid h-16 w-16 place-items-center rounded-3xl bg-white/10"><IconShield className="h-8 w-8" /></div></div></section>
    <section className="grid gap-4 md:grid-cols-3">{(["XANH", "VÀNG", "ĐỎ"] as CopyrightStatus[]).map(code => <div key={code} className={`rounded-[26px] border border-slate-200 p-5 ${config[code].bg}`}><div className={`text-xs font-black uppercase tracking-[0.18em] ${config[code].text}`}>{code} • {config[code].label}</div><p className="mt-3 text-sm leading-6 text-slate-700">{code === "XANH" ? "Tài liệu tự tạo, tài nguyên có giấy phép phù hợp hoặc nguồn chính thức đã được cấp quyền." : code === "VÀNG" ? "Có nội dung bên thứ ba hoặc quyền sử dụng chưa rõ; cần kiểm tra và ghi nguồn." : "PDF/ảnh scan toàn bộ SGK hoặc file không xác minh được quyền sử dụng."}</p></div>)}</section>
    <div className="flex justify-end"><button onClick={() => setAddOpen(true)} className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-bold text-white">+ Gửi tài liệu kiểm duyệt</button></div>
    <section className="rounded-[28px] border border-slate-200 bg-white shadow-sm"><div className="border-b border-slate-200 p-5 sm:p-6"><div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Hàng đợi kiểm duyệt</div><h2 className="mt-1 text-xl font-black">Demo workflow</h2></div><div className="divide-y divide-slate-100">{reviews.map(item => { const style = config[item.status]; return <div key={item.id} className="p-5 sm:p-6"><div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><span className={`rounded-full px-2.5 py-1 text-[10px] font-black ${style.bg} ${style.text}`}>{item.status}</span><span className="text-xs text-slate-400">{item.owner}</span></div><div className="mt-2 font-bold">{item.title}</div><div className="mt-1 text-sm text-slate-500">Nguồn: {item.source}</div><div className="mt-1 text-xs text-slate-400">Lý do: {item.reason}</div></div><div className="flex shrink-0 flex-wrap gap-2">{item.status !== "XANH" && <button onClick={() => change(item.id, "XANH")} className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500 px-3 py-2 text-xs font-bold text-white"><IconCheck className="h-4 w-4" /> Duyệt</button>}{item.status !== "ĐỎ" && <button onClick={() => change(item.id, "ĐỎ")} className="rounded-2xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700">Chặn publish</button>}{item.status === "ĐỎ" && <button onClick={() => change(item.id, "VÀNG")} className="rounded-2xl border border-amber-200 px-3 py-2 text-xs font-bold text-amber-700">Mở lại kiểm tra</button>}</div></div></div>; })}</div></section>
    <Toast message={message} onClose={dismiss} />
    {addOpen && <Modal title="Gửi tài liệu vào hàng đợi" onClose={() => setAddOpen(false)} footer={<div className="flex justify-end gap-2"><button onClick={() => setAddOpen(false)} className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold">Hủy</button><button onClick={submit} className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-bold text-white">Gửi kiểm duyệt</button></div>}><div className="space-y-4"><Field label="Tên tài liệu"><input value={title} onChange={e => setTitle(e.target.value)} className="field" placeholder="Ví dụ: Phiếu bài tập Toán 7" /></Field><Field label="Nguồn"><input value={source} onChange={e => setSource(e.target.value)} className="field" placeholder="Giáo viên tự biên soạn / URL / nhà xuất bản" /></Field><Field label="Người phụ trách"><input value={owner} onChange={e => setOwner(e.target.value)} className="field" placeholder="GV Nguyễn A." /></Field><Field label="Lý do cần kiểm tra"><textarea value={reason} onChange={e => setReason(e.target.value)} className="field min-h-24" placeholder="Mô tả ngắn nội dung và tình trạng quyền sử dụng" /></Field></div></Modal>}
  </div>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) { return <label className="block"><span className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</span><div className="mt-1">{children}</div></label>; }
