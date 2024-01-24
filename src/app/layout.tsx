import type { Metadata } from "next";
import { Noto_Sans_Hebrew } from "next/font/google";
import DirectionProvider from "@/components/direction-provider";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/header";
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
      <body className={notoSansHebrew.className}>
        <DirectionProvider>
          <div className="container max-w-2xl">
            <Header />
            <Separator className="mb-6 mt-4" />
            {children}
          </div>
        </DirectionProvider>
      </body>
    </html>
  );
}
