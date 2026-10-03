import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl rounded-[28px] border border-slate-200 bg-white p-8 text-center shadow-sm">
      <div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Lỗi 404</div>
      <h1 className="mt-2 text-2xl font-black">Không tìm thấy trang này</h1>
      <p className="mt-3 text-sm leading-6 text-slate-500">Đường dẫn có thể đã thay đổi hoặc không tồn tại.</p>
      <Link href="/" className="mt-6 inline-flex rounded-2xl bg-slate-900 px-4 py-3 text-sm font-bold text-white">Về trang tổng quan</Link>
    </div>
  );
}
