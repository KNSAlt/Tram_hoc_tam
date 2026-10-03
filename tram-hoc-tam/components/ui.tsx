"use client";

import { useState } from "react";

export function Toast({ message, onClose }: { message: string | null; onClose: () => void }) {
  if (!message) return null;
  return <div className="fixed bottom-5 right-5 z-[80] max-w-sm rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white shadow-xl ring-1 ring-white/10">{message}<button onClick={onClose} className="ml-4 rounded-lg px-2 py-1 text-slate-300 hover:bg-white/10">×</button></div>;
}

export function useToast() {
  const [message, setMessage] = useState<string | null>(null);
  const toast = (next: string) => setMessage(next);
  return { message, toast, dismiss: () => setMessage(null) };
}

export function ProgressBar({ value }: { value: number }) {
  return <div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-slate-900 transition-all" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} /></div>;
}

export function Modal({ title, children, onClose, footer }: { title: string; children: React.ReactNode; onClose: () => void; footer?: React.ReactNode }) {
  return <div className="fixed inset-0 z-[70] grid place-items-center bg-slate-950/50 p-4 backdrop-blur-sm"><div className="w-full max-w-xl overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-2xl"><div className="flex items-center justify-between border-b border-slate-100 px-5 py-4"><h2 className="font-black">{title}</h2><button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 text-xl text-slate-500">×</button></div><div className="max-h-[70vh] overflow-y-auto p-5">{children}</div>{footer && <div className="border-t border-slate-100 bg-slate-50 px-5 py-4">{footer}</div>}</div></div>;
}

export function Empty({ title, detail }: { title: string; detail: string }) {
  return <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center"><div className="text-lg font-black">{title}</div><div className="mt-2 text-sm text-slate-500">{detail}</div></div>;
}
