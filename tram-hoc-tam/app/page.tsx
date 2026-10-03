"use client";

import Link from "next/link";
import { useState } from "react";
import { classInfo } from "@/lib/data";
import { useApp } from "@/components/app-provider";
import { IconArrow, IconBook, IconCheck, IconClock, IconLibrary, IconShield } from "@/components/icons";
import { ProgressBar, Toast, useToast } from "@/components/ui";

export default function Page() {
  const { lessons, books, reviews, activities, stationOpen, publishedLessons, borrowedBooks } = useApp();
  const [showNotice, setShowNotice] = useState(true);
  const { message, toast, dismiss } = useToast();
  const totalAvailable = books.reduce((sum, b) => sum + b.available, 0);
  const green = reviews.filter(r => r.status === "XANH").length;

  return (
    <div className="space-y-6">
      {showNotice && (
        <div className="flex items-start gap-3 rounded-3xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <IconClock className="mt-0.5 h-5 w-5 shrink-0" />
          <div className="flex-1">
            <span className="font-bold">{stationOpen ? "Trạm Học Tạm đang bật" : "Trạm Học Tạm đã đóng"}:</span>{" "}
            {stationOpen
              ? `${classInfo.missingBooks}/${classInfo.students} học sinh lớp ${classInfo.code} chưa nhận đủ SGK.`
              : "Đang ở trạng thái kết thúc chuyển tiếp; dữ liệu học tập vẫn được giữ trên demo."}
          </div>
          <button onClick={() => setShowNotice(false)} className="text-xs font-bold underline underline-offset-4">Đóng</button>
        </div>
      )}

      <section className="hero-glow relative overflow-hidden rounded-[32px] p-6 text-white shadow-xl sm:p-8 lg:p-10">
        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full border border-white/10" />
        <div className="absolute -bottom-28 right-16 h-64 w-64 rounded-full border border-white/5" />
        <div className="relative grid gap-8 lg:grid-cols-[1.5fr_.8fr] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-200">
              Giải pháp chuyển tiếp • Hợp pháp • Chi phí thấp
            </div>
            <h1 className="mt-5 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">Học không gián đoạn trong khi chờ sách.</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              Một “trạm” kết hợp Bản đồ bài học tự biên soạn, tủ sách bản gốc luân chuyển, hàng đợi kiểm duyệt bản quyền và nhật ký vận hành — không photocopy sách giáo khoa.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/student" className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-bold text-slate-900 shadow-sm">
                Vào góc học sinh <IconArrow className="h-4 w-4" />
              </Link>
              <Link href="/teacher" className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-bold text-white">
                Mở góc giáo viên
              </Link>
              <Link href="/solution" className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-bold text-white">
                Xem giải pháp
              </Link>
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Thẻ Trạm Học Tạm</div>
            <div className="mt-4 rounded-3xl bg-white p-5 text-slate-900">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-slate-400">LỚP</div>
                  <div className="text-2xl font-black">{classInfo.code}</div>
                </div>
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-100"><IconBook className="h-6 w-6" /></div>
              </div>
              <div className="mt-5 space-y-2 text-sm font-semibold">
                <div>• Bản đồ bài học tuần này</div>
                <div>• Tủ sách • Kệ B2</div>
                <div>• Tài nguyên chính thức</div>
              </div>
              <div className="mt-5 flex items-center justify-between rounded-2xl bg-slate-50 px-3 py-2 text-xs">
                <span className="text-slate-500">Hiệu lực chuyển tiếp</span>
                <span className="font-bold">đến {classInfo.transitionEnds}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        <Stat title="Thiếu SGK" value={`${classInfo.missingBooks}/${classInfo.students}`} detail="Học sinh cần hỗ trợ" icon={<IconBook className="h-5 w-5" />} />
        <Stat title="Bản đồ bài học" value={publishedLessons.length.toString()} detail="Đã publish" icon={<IconCheck className="h-5 w-5" />} />
        <Stat title="Sách luân chuyển" value={totalAvailable.toString()} detail="Bản đang sẵn sàng" icon={<IconLibrary className="h-5 w-5" />} />
        <Stat title="Bản quyền" value={`${green}/${reviews.length}`} detail="Tài liệu XANH" icon={<IconShield className="h-5 w-5" />} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.25fr_.75fr]">
        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Tiến độ tuần</div>
              <h2 className="mt-1 text-xl font-black">Bản đồ bài học của lớp {classInfo.code}</h2>
            </div>
            <Link href="/student" className="text-sm font-bold text-slate-700 underline underline-offset-4">Xem tất cả</Link>
          </div>
          <div className="mt-5 grid gap-3">
            {lessons.slice(0, 4).map(lesson => (
              <Link href={`/student?lesson=${lesson.id}`} key={lesson.id} className="rounded-2xl border border-slate-200 p-4 transition hover:bg-slate-50">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-semibold text-slate-400">{lesson.subject} • Tuần {lesson.week}</div>
                    <div className="mt-1 font-bold">{lesson.title}</div>
                  </div>
                  <div className="text-sm font-black">{lesson.progress}%</div>
                </div>
                <div className="mt-3"><ProgressBar value={lesson.progress} /></div>
              </Link>
            ))}
          </div>
        </div>
        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Hoạt động gần đây</div>
          <div className="mt-4 space-y-3">
            {activities.slice(0, 6).map(a => (
              <div key={a.id} className="rounded-2xl bg-slate-50 p-3">
                <div className="text-[11px] font-bold text-slate-400">{a.time}</div>
                <div className="mt-1 text-sm font-semibold">{a.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Quick href="/student" icon={<IconBook className="h-6 w-6" />} title="Góc học sinh" description="Học bài, checklist, quiz và theo dõi tiến độ." />
        <Quick href="/library" icon={<IconLibrary className="h-6 w-6" />} title="Tủ sách xoay vòng" description={`${borrowedBooks.length} sách bạn đang giữ trong demo.`} />
        <Quick href="/copyright" icon={<IconShield className="h-6 w-6" />} title="Kiểm soát bản quyền" description="Duyệt, chặn và ghi nhận mọi tài liệu trước publish." />
      </section>

      <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="font-black">Đây là môi trường demo</div>
          <div className="mt-1 text-sm text-slate-500">Dữ liệu mẫu, lưu trên trình duyệt của bạn; chưa kết nối backend thật.</div>
        </div>
        <button onClick={() => toast("Đã kiểm tra trạng thái demo — mọi nút chính đều có hành vi.")} className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-bold text-white">
          Kiểm tra tương tác
        </button>
      </div>
      <Toast message={message} onClose={dismiss} />
    </div>
  );
}

function Stat({ title, value, detail, icon }: { title: string; value: string; detail: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-100 text-slate-700">{icon}</div>
        <span className="text-xs font-semibold text-emerald-600">Live demo</span>
      </div>
      <div className="mt-5 text-3xl font-black tracking-tight">{value}</div>
      <div className="mt-1 text-sm font-bold">{title}</div>
      <div className="mt-1 text-xs text-slate-500">{detail}</div>
    </div>
  );
}

function Quick({ href, icon, title, description }: { href: string; icon: React.ReactNode; title: string; description: string }) {
  return (
    <Link href={href} className="group rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center justify-between">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-900 text-white">{icon}</div>
        <IconArrow className="h-5 w-5 text-slate-300 transition group-hover:translate-x-1 group-hover:text-slate-700" />
      </div>
      <div className="mt-5 text-lg font-black">{title}</div>
      <div className="mt-2 text-sm leading-6 text-slate-500">{description}</div>
    </Link>
  );
}
