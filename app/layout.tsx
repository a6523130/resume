import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "高强 | 个人简历",
  description:
    "高强，哈尔滨医科大学基础医学院讲师，研究方向涵盖氧化应激、神经损伤、自噬、铁死亡与非编码 RNA 调控。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
