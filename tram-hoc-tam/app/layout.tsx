import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/components/app-provider";
import { Shell } from "@/components/shell";

export const metadata: Metadata = {
  title: "Trạm Học Tạm",
  description: "MVP hỗ trợ học tập chuyển tiếp khi học sinh chưa được cung ứng đầy đủ sách giáo khoa.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><body><AppProvider><Shell>{children}</Shell></AppProvider></body></html>;
}
