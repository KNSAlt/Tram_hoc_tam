"use client";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const clearAndGoHome = () => {
    try { localStorage.removeItem("tram-hoc-tam-mvp-v2"); } catch {}
    window.location.href = "/";
  };

  return (
    <div className="mx-auto max-w-xl rounded-[28px] border border-slate-200 bg-white p-8 text-center shadow-sm">
      <div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Có lỗi xảy ra</div>
      <h1 className="mt-2 text-2xl font-black">Trang không tải được</h1>
      <p className="mt-3 text-sm leading-6 text-slate-500">Bạn có thể thử lại, hoặc xóa dữ liệu demo đã lưu trong trình duyệt rồi quay về trang chủ.</p>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <button onClick={reset} className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-bold text-white">Thử lại</button>
        <button onClick={clearAndGoHome} className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold">Xóa dữ liệu demo</button>
      </div>
    </div>
  );
}
