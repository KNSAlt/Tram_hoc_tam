# Trạm Học Tạm

> Giải pháp **chuyển tiếp** giúp học sinh học liên tục khi sách giáo khoa (SGK) chưa được cung ứng đầy đủ — **không photocopy SGK**, tuân thủ bản quyền, chi phí thấp, triển khai nhanh.

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6)
![License](https://img.shields.io/badge/license-MIT-green)

| | |
| --- | --- |
| **Mã nguồn (Source code)** | https://github.com/vatsuc210/Tam-hoc-tam |
| **Tài liệu mô tả** | [`docs/PROJECT-SPEC.pdf`](docs/PROJECT-SPEC.pdf) |

## Mục lục

1. [Bài toán](#bài-toán)
2. [Giải pháp](#giải-pháp)
3. [Đối chiếu với yêu cầu đề bài](#đối-chiếu-với-yêu-cầu-đề-bài)
4. [Dùng thử trong 2 phút](#dùng-thử-trong-2-phút)
5. [Tính năng](#tính-năng)
6. [Chạy trên máy](#chạy-trên-máy)
7. [Triển khai web](#triển-khai-web)
8. [Cấu trúc thư mục](#cấu-trúc-thư-mục)
9. [Bản quyền và pháp lý](#bản-quyền-và-pháp-lý)
10. [Hạn chế và hướng phát triển](#hạn-chế-và-hướng-phát-triển)

## Bài toán

Khi thống nhất và điều chỉnh hệ thống SGK, nguồn cung có thể chưa kịp ở một số địa phương và trường học, khiến một bộ phận học sinh thiếu tài liệu trong những tuần đầu năm học. Photocopy cả cuốn là cách làm quen thuộc, nhưng việc sao chép và phát hành tài liệu có bản quyền khi chưa được phép có thể phát sinh vấn đề pháp lý về sở hữu trí tuệ.

## Giải pháp

Mỗi lớp thiếu sách được mở một **“Trạm Học Tạm”** có thời hạn, gồm bốn thành phần:

1. **Bản đồ bài học** — học liệu ngắn theo tuần do giáo viên *tự biên soạn* (mục tiêu, từ khóa, ví dụ riêng, checklist, quiz). Không chép lại nguyên văn SGK.
2. **Tủ sách bản gốc luân chuyển** — tận dụng số bản sách trường/thư viện đang có, mượn theo ca ngắn hoặc dùng chung theo nhóm. Chỉ mượn – trả, không sao chép.
3. **Cổng kiểm duyệt bản quyền** — mọi tài liệu cần có nguồn, trạng thái **XANH / VÀNG / ĐỎ** và người chịu trách nhiệm trước khi được publish.
4. **Tự đóng khi đủ sách** — Trạm có hạn hiệu lực, nút đóng và nhật ký hoạt động.

Có **phương án giấy**: học sinh học bằng *phiếu bài học in A4* (nút “In phiếu bài học” ở Góc học sinh), không cần thiết bị hay Internet cá nhân.

## Đối chiếu với yêu cầu đề bài

| Yêu cầu | Trạm Học Tạm đáp ứng bằng |
| --- | --- |
| Học sinh vẫn tiếp cận nội dung, không gián đoạn chương trình | Bản đồ bài học theo tuần, checklist, quiz; phiếu in A4 cho em không có thiết bị |
| Tuân thủ bản quyền, sở hữu trí tuệ | Không lưu/phát tán bản scan SGK; chỉ dùng học liệu tự biên soạn, tài nguyên có giấy phép hoặc liên kết nguồn chính thức; quy trình XANH–VÀNG–ĐỎ và nhật ký |
| Hạn chế chi phí cho học sinh, phụ huynh | Không phải mua thêm sách hay photo cả cuốn; dùng sách sẵn có của trường và một web nhẹ |
| Triển khai nhanh, mở rộng được | Chạy trên trình duyệt, không cần cài đặt; bắt đầu từ một lớp rồi nhân rộng theo trường hoặc phòng giáo dục |
| Tận dụng công nghệ, thư viện, chia sẻ tài liệu | Web điều phối + tủ sách xoay vòng + liên kết tài nguyên chính thức; phần cốt lõi vẫn dùng được hoàn toàn trên giấy |
| Chỉ là giải pháp chuyển tiếp | Mỗi Trạm có hạn hiệu lực, nút đóng khi đủ SGK, nhật ký vẫn được giữ |

Trang **`/solution`** trong web trình bày nội dung này ngay trên giao diện.

## Dùng thử trong 2 phút

Dữ liệu lớp 7A1, học sinh và sách đều là **dữ liệu mẫu giả lập**. Thử theo thứ tự:

1. **`/`** — xem thông báo “15/40 học sinh chưa nhận đủ SGK” và các số liệu tổng quan.
2. **`/student`** — chọn bài, tick checklist (thanh tiến độ tăng), bấm **Làm quiz luyện tập**, thử **In phiếu bài học**.
3. **`/library`** — bấm **Đăng ký mượn** một cuốn; số bản còn lại giảm, bấm **Trả sách** để hoàn lại.
4. **`/teacher`** — **+ Tạo bài học**, sang tab **Bài học** để **Publish**, thử **Xuất CSV** và **Đóng Trạm Học Tạm**.
5. **`/copyright`** — gửi một tài liệu mới (vào hàng đợi VÀNG), rồi **Duyệt** hoặc **Chặn publish**. Bản scan toàn bộ SGK (ĐỎ) không được phép publish.
6. Thanh bên có nút **Đặt lại dữ liệu demo** để quay về trạng thái ban đầu.

## Tính năng

| Trang | Nội dung |
| --- | --- |
| `/` Tổng quan | Trạng thái Trạm, số liệu, tiến độ tuần, hoạt động gần đây |
| `/solution` Giải pháp | Ý tưởng, quy trình, đối chiếu với đề bài, căn cứ tham khảo |
| `/student` Góc học sinh | Chọn bài, checklist, tiến độ, quiz, in phiếu bài học |
| `/library` Tủ sách | Tìm kiếm, lọc theo môn, mượn/trả, số bản còn lại |
| `/teacher` Góc giáo viên | Tạo và publish bài học, theo dõi học sinh, xuất CSV, đóng/mở Trạm, audit log |
| `/copyright` Bản quyền | Hàng đợi kiểm duyệt XANH/VÀNG/ĐỎ, duyệt/chặn, gửi tài liệu mới |

Đây là **prototype chạy phía trình duyệt**: dữ liệu được lưu trong `localStorage`, không cần database hay backend. Chuyển vai trò học sinh/giáo viên ở thanh trên cùng.

**Công nghệ:** Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS 4. Font dùng font hệ thống, không tải gì từ Internet nên hiển thị đủ dấu tiếng Việt trên mọi thiết bị.

## Chạy trên máy

Yêu cầu **Node.js ≥ 20.9** (khuyến nghị 22, xem [`.nvmrc`](.nvmrc)).

```bash
npm install
npm run dev        # mở http://localhost:3000
```

Build bản production:

```bash
npm run build
npm start
```

Kiểm tra kiểu dữ liệu: `npm run typecheck`.

Không cần biến môi trường hay kết nối Internet khi chạy. File `.env.example` chỉ dành cho hướng phát triển production.

### Chạy trong GitHub Codespaces

```bash
npm install
npm run dev
```

Đợi dòng `✓ Ready`, mở tab **PORTS** rồi bấm biểu tượng quả địa cầu ở cổng 3000. Gặp `HTTP 504` nghĩa là chưa có server nào chạy ở cổng 3000 — kiểm tra terminal còn chạy `npm run dev` không. File `next.config.mjs` đã cho phép tên miền `*.app.github.dev`.


## Cấu trúc thư mục

```
app/            Các trang (App Router): /, /solution, /student, /library, /teacher, /copyright
components/     Shell (khung + menu), AppProvider (trạng thái + localStorage), UI, icon
lib/data.ts     Kiểu dữ liệu và dữ liệu mẫu
docs/           Kiến trúc, lưu ý pháp lý, tài liệu mô tả dự án (PDF)
tests/          Checklist nghiệm thu
prisma/         Lược đồ cơ sở dữ liệu tham khảo cho bản production (chưa dùng trong demo)
assets/         Hình minh họa
```

Tài liệu liên quan: [kiến trúc](docs/architecture.md) · [lưu ý pháp lý](docs/legal-safeguards.md) · [checklist nghiệm thu](tests/acceptance-checklist.md).

## Bản quyền và pháp lý

- Hệ thống **không lưu, không phát tán bản scan toàn bộ SGK**.
- Chỉ dùng học liệu tự biên soạn, tài nguyên có giấy phép, hoặc liên kết tới nguồn chính thức.
- Sách bản gốc chỉ **mượn – trả**, không sao chép.
- Căn cứ tham khảo: Luật số 131/2025/QH15 sửa đổi, bổ sung một số điều của Luật Sở hữu trí tuệ; Nghị định 134/2026/NĐ-CP sửa đổi Nghị định 17/2023/NĐ-CP về quyền tác giả, quyền liên quan. Chi tiết và đường dẫn ở [`docs/legal-safeguards.md`](docs/legal-safeguards.md).

> Đây là checklist thiết kế, **không phải tư vấn pháp lý**. Nhà trường cần kiểm tra văn bản còn hiệu lực và xin ý kiến bộ phận pháp chế hoặc chủ sở hữu quyền tác giả trước khi triển khai.

## Hạn chế và hướng phát triển

Bản demo chưa có đăng nhập, cơ sở dữ liệu hay phân quyền thật; số liệu lớp, học sinh, sách là dữ liệu mẫu. Để dùng thực tế cần:

- Đăng nhập theo vai trò (Auth.js/SSO trường học) và phân quyền.
- PostgreSQL + Prisma (lược đồ tham khảo trong `prisma/schema.prisma`), API route/server actions.
- Lưu trữ học liệu tự tạo, audit log phía máy chủ, phê duyệt nhiều cấp.
- Kết nối LMS hoặc kho tài nguyên chính thức; xuất phiếu bài học PDF hàng loạt.

## Giấy phép

[MIT](LICENSE).
