import type { Metadata } from "next";
import { Noto_Sans_Hebrew } from "next/font/google";
import "./globals.css";

const notoSansHebrew = Noto_Sans_Hebrew({
  subsets: ["latin", "hebrew"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Haven",
  description: "The Haven Social Network",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body className={notoSansHebrew.className}>{children}</body>
    </html>
  );
}
