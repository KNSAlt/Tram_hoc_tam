import type { Metadata } from "next";
import Link from "next/link";
import { IconArrow, IconBook, IconClock, IconLibrary, IconShield } from "@/components/icons";

export const metadata: Metadata = {
  title: "Giải pháp • Trạm Học Tạm",
  description: "Giải pháp chuyển tiếp hợp pháp, chi phí thấp, triển khai nhanh để học sinh học liên tục khi chưa có đủ sách giáo khoa.",
};

const pillars = [
  { icon: <IconBook className="h-6 w-6" />, title: "Bản đồ bài học", text: "Giáo viên tự biên soạn học liệu ngắn theo tuần: mục tiêu, từ khóa, ví dụ riêng, checklist và quiz — không chép lại nguyên văn sách giáo khoa." },
  { icon: <IconLibrary className="h-6 w-6" />, title: "Tủ sách bản gốc luân chuyển", text: "Tận dụng số bản sách mà trường/thư viện đang có; mượn theo ca ngắn hoặc dùng chung theo nhóm. Chỉ mượn – trả, không sao chép." },
  { icon: <IconShield className="h-6 w-6" />, title: "Cổng kiểm duyệt bản quyền", text: "Mọi tài liệu phải có nguồn, trạng thái XANH / VÀNG / ĐỎ và người chịu trách nhiệm trước khi được publish." },
  { icon: <IconClock className="h-6 w-6" />, title: "Tự đóng khi đủ sách", text: "Trạm có hạn hiệu lực và nút đóng. Khi học sinh nhận đủ SGK thì kết thúc, nhật ký hoạt động vẫn được giữ." },
];

const steps = [
  { title: "Xác định", text: "Giáo viên xác nhận học sinh chưa có sách, mở Trạm cho lớp và đặt ngày hết hiệu lực." },
  { title: "Soạn", text: "Tổ chuyên môn soạn Bản đồ bài học theo tuần; tài liệu của bên thứ ba phải qua kiểm duyệt." },
  { title: "Luân chuyển", text: "Chia sách bản gốc theo ca và theo nhóm; các em còn lại học bằng phiếu bài học in A4, không cần Internet." },
  { title: "Theo dõi", text: "Học sinh làm checklist và quiz; giáo viên xem tiến độ, xuất danh sách CSV." },
  { title: "Kết thúc", text: "Khi nhận đủ SGK, giáo viên đóng Trạm và quay về học bằng sách chính thức." },
];

const criteria = [
  { title: "Học không gián đoạn", text: "Bản đồ bài học theo tuần cùng checklist và quiz giúp học sinh theo kịp chương trình ngay từ tuần đầu; có phương án in giấy cho em không có thiết bị." },
  { title: "Tuân thủ bản quyền", text: "Không lưu hay phát tán bản scan SGK. Chỉ dùng học liệu tự biên soạn, tài nguyên có giấy phép hoặc liên kết tới nguồn chính thức; có quy trình XANH – VÀNG – ĐỎ và nhật ký." },
  { title: "Giảm chi phí", text: "Không phải mua thêm sách hay photo cả cuốn: dùng sách sẵn có của trường, phiếu bài học ngắn và một web nhẹ, chi phí vận hành thấp." },
  { title: "Triển khai nhanh", text: "Chạy trên trình duyệt, không cần cài đặt; có thể bắt đầu từ một lớp rồi nhân rộng theo trường hoặc phòng giáo dục." },
  { title: "Tận dụng công nghệ, thư viện, chia sẻ", text: "Kết hợp web app, tủ sách xoay vòng và liên kết tài nguyên chính thức. Công nghệ chỉ để điều phối; phần cốt lõi vẫn dùng được hoàn toàn trên giấy." },
  { title: "Chỉ là giải pháp chuyển tiếp", text: "Mỗi Trạm có hạn hiệu lực, nút đóng và nhật ký; kết thúc khi nguồn sách chính thức được cung ứng đủ." },
];

const sources = [
  { label: "Luật số 131/2025/QH15 sửa đổi, bổ sung một số điều của Luật Sở hữu trí tuệ (WIPO Lex)", href: "https://www.wipo.int/wipolex/en/legislation/details/23828" },
  { label: "Nghị định 134/2026/NĐ-CP sửa đổi, bổ sung Nghị định 17/2023/NĐ-CP về quyền tác giả, quyền liên quan", href: "https://thuvienphapluat.vn/van-ban/So-huu-tri-tue/Decree-134-2026-ND-CP-amendment-to-Decree-17-2023-ND-CP-elaborating-Law-on-Intellectual-Property-704845.aspx?tab=1" },
  { label: "Cục Bản quyền tác giả", href: "https://cov.gov.vn" },
];

export default function SolutionPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <section className="hero-glow relative overflow-hidden rounded-[32px] p-6 text-white shadow-xl sm:p-8 lg:p-10">
        <div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Giải pháp đề xuất</div>
        <h1 className="mt-3 max-w-3xl text-3xl font-black tracking-tight sm:text-5xl">Không photocopy sách. Vẫn học đủ, đúng luật, tiết kiệm.</h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300">
          Khi sách giáo khoa chưa kịp đến tay một bộ phận học sinh, cách làm quen thuộc là sao chụp cả cuốn — nhưng việc sao chép và phát hành tài liệu có bản quyền khi chưa được phép có thể vướng quy định về sở hữu trí tuệ.
          Trạm Học Tạm thay bằng một cơ chế chuyển tiếp ngắn hạn: học liệu tự biên soạn, sách bản gốc luân chuyển và kiểm duyệt bản quyền trước khi chia sẻ.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/student" className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-bold text-slate-900">Dùng thử góc học sinh <IconArrow className="h-4 w-4" /></Link>
          <Link href="/teacher" className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-bold text-white">Dùng thử góc giáo viên</Link>
        </div>
      </section>

      <section>
        <div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Bốn thành phần</div>
        <div className="mt-3 grid gap-4 md:grid-cols-2">
          {pillars.map(p => (
            <div key={p.title} className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-900 text-white">{p.icon}</div>
              <h2 className="mt-4 text-lg font-black">{p.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Quy trình vận hành</div>
        <ol className="mt-4 grid gap-3 md:grid-cols-5">
          {steps.map((s, i) => (
            <li key={s.title} className="rounded-2xl bg-slate-50 p-4">
              <div className="text-xs font-bold text-slate-400">0{i + 1}</div>
              <div className="mt-1 font-black">{s.title}</div>
              <p className="mt-2 text-xs leading-5 text-slate-600">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Đối chiếu với yêu cầu của đề bài</div>
        <div className="mt-3 grid gap-4 md:grid-cols-2">
          {criteria.map(c => (
            <div key={c.title} className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="font-black">{c.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{c.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[28px] border border-amber-200 bg-amber-50 p-5 sm:p-6">
        <div className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700">Phạm vi bản demo</div>
        <p className="mt-2 text-sm leading-6 text-amber-900">
          Bản này là prototype chạy phía trình duyệt: dữ liệu học sinh, lớp và sách đều là dữ liệu mẫu giả lập, được lưu trong localStorage. Để dùng thật cần thêm đăng nhập theo vai trò, cơ sở dữ liệu, nhật ký phía máy chủ và quy trình phê duyệt của nhà trường (xem README).
        </p>
      </section>

      <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Căn cứ tham khảo</div>
        <ul className="mt-3 space-y-2 text-sm">
          {sources.map(s => (
            <li key={s.href}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="font-semibold text-sky-700 underline underline-offset-4">{s.label}</a>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs leading-5 text-slate-500">
          Đây là checklist thiết kế, không phải tư vấn pháp lý. Trước khi triển khai, nhà trường cần kiểm tra văn bản còn hiệu lực và xin ý kiến bộ phận pháp chế hoặc chủ sở hữu quyền tác giả khi cần sử dụng nội dung có bản quyền.
        </p>
      </section>
    </div>
  );
}
