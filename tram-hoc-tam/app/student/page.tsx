"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useApp } from "@/components/app-provider";
import { IconArrow, IconCheck, IconClock } from "@/components/icons";
import { Modal, ProgressBar, Toast, useToast } from "@/components/ui";

export default function StudentPage() {
  const { lessons, completedTasks, toggleTask } = useApp();
  const [activeId, setActiveId] = useState(lessons[0]?.id);
  const [quizOpen, setQuizOpen] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const { message, toast, dismiss } = useToast();
  const appliedQuery = useRef(false);

  // Mở đúng bài khi vào từ trang tổng quan: /student?lesson=<id>
  useEffect(() => {
    if (appliedQuery.current) return;
    const id = new URLSearchParams(window.location.search).get("lesson");
    if (!id) { appliedQuery.current = true; return; }
    if (lessons.some(l => l.id === id)) { setActiveId(id); appliedQuery.current = true; }
  }, [lessons]);

  const active = lessons.find(l => l.id === activeId) ?? lessons[0];
  const done = completedTasks[active.id] ?? [];
  const progress = useMemo(() => Math.round((done.length / Math.max(active.tasks.length, 1)) * 100), [active, done.length]);

  const submitQuiz = () => {
    const score = active.quiz.reduce((sum, q, i) => sum + (answers[i] === q.answer ? 1 : 0), 0);
    toast(`Bạn đạt ${score}/${active.quiz.length} câu đúng.`);
    setQuizOpen(false);
  };

  return <div className="mx-auto max-w-6xl space-y-6">
    <section className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8"><div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"><div><div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Góc học sinh • Lớp 7A1</div><h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Bản đồ bài học của bạn</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">Học theo học liệu chuyển tiếp, dùng sách bản gốc khi được phân bổ và hoàn thành nhiệm vụ từng bài.</p></div><div className="min-w-[220px] rounded-3xl bg-slate-950 p-5 text-white"><div className="flex items-center justify-between text-xs text-slate-400"><span>Tiến độ bài hiện tại</span><span>{progress}%</span></div><div className="mt-3 h-2 rounded-full bg-white/10"><div className="h-full rounded-full bg-emerald-400 transition-all" style={{ width: `${progress}%` }} /></div><div className="mt-3 text-xs text-slate-300">Hoàn thành checklist để tăng tiến độ.</div></div></div></section>

    <div className="grid gap-6 lg:grid-cols-[.78fr_1.22fr]"><section className="no-print rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm"><div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Các bài học</div><div className="mt-4 space-y-2">{lessons.map(item => <button key={item.id} onClick={() => setActiveId(item.id)} className={`w-full rounded-2xl border p-4 text-left transition ${active.id === item.id ? "border-slate-900 bg-slate-950 text-white" : "border-slate-200 hover:bg-slate-50"}`}><div className="flex items-start justify-between gap-4"><div><div className="text-xs font-semibold text-slate-400">{item.subject} • Tuần {item.week}</div><div className="mt-1 font-bold">{item.title}</div></div><span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${item.status === "Đã hoàn thành" ? "bg-emerald-100 text-emerald-700" : item.status === "Đang học" ? "bg-sky-100 text-sky-700" : "bg-slate-100 text-slate-500"}`}>{item.status}</span></div><div className="mt-3"><ProgressBar value={item.progress} /></div></button>)}</div></section>

      <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6"><div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-400"><IconClock className="h-4 w-4" /> Bản đồ bài học</div><h2 className="mt-2 text-2xl font-black">{active.title}</h2><p className="mt-3 text-sm leading-6 text-slate-600">{active.objective}</p><div className="mt-6 grid gap-3 sm:grid-cols-3">{active.highlights.map((h, i) => <div key={h} className="rounded-2xl bg-slate-50 p-4"><div className="text-xs font-bold text-slate-400">0{i + 1}</div><div className="mt-2 text-sm font-bold">{h}</div></div>)}</div>
        <div className="mt-6 rounded-3xl border border-slate-200 p-4"><div className="flex items-center justify-between"><div><div className="text-sm font-black">Checklist của bài</div><div className="text-xs text-slate-500">Đánh dấu khi hoàn thành.</div></div><div className="text-sm font-bold">{done.length}/{active.tasks.length}</div></div><div className="mt-4 space-y-2">{active.tasks.map((task, idx) => { const checked = done.includes(String(idx)); return <button key={task} onClick={() => toggleTask(active.id, idx)} className="flex w-full items-center gap-3 rounded-2xl p-3 text-left hover:bg-slate-50"><span className={`grid h-6 w-6 place-items-center rounded-full border ${checked ? "border-emerald-500 bg-emerald-500 text-white" : "border-slate-300"}`}>{checked && <IconCheck className="h-4 w-4" />}</span><span className={`text-sm font-semibold ${checked ? "text-slate-400 line-through" : "text-slate-800"}`}>{task}</span></button>; })}</div></div>
        <div className="no-print mt-5 flex flex-wrap gap-3"><button onClick={() => { setAnswers({}); setQuizOpen(true); }} className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-bold text-white">Làm quiz luyện tập <IconArrow className="h-4 w-4" /></button><button onClick={() => toast("Đã mở tài nguyên chính thức demo. Nền tảng không lưu bản scan SGK.")} className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold">Tài nguyên chính thức</button><button onClick={() => window.print()} className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold">In phiếu bài học</button></div>
        <div className="mt-5 rounded-2xl bg-emerald-50 p-4"><div className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">Tài nguyên</div><div className="mt-2 text-sm font-semibold text-emerald-900">Demo resource hub: nguồn phải được nhà trường cấp quyền trước khi publish.</div></div>
      </section></div>

      <Toast message={message} onClose={dismiss} />
      {quizOpen && <Modal title={`Quiz — ${active.subject}`} onClose={() => setQuizOpen(false)} footer={<div className="flex justify-end gap-2"><button onClick={() => setQuizOpen(false)} className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold">Hủy</button><button onClick={submitQuiz} className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-bold text-white">Nộp bài</button></div>}><div className="space-y-5">{active.quiz.map((q, qi) => <div key={q.question} className="rounded-2xl border border-slate-200 p-4"><div className="font-black">{qi + 1}. {q.question}</div><div className="mt-3 grid gap-2">{q.options.map((option, oi) => <button key={option} onClick={() => setAnswers(prev => ({ ...prev, [qi]: oi }))} className={`rounded-xl border px-3 py-3 text-left text-sm font-semibold ${answers[qi] === oi ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 hover:bg-slate-50"}`}>{option}</button>)}</div></div>)}</div></Modal>}
    </div>;
}
