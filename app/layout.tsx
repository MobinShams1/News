import { Toaster } from "sonner";
import "./globals.css";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: " پایگاه خبری",
  description: "جدیدترین اخبار و رویدادهای روز",
  icons: {
    icon: "/Icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        {children}
        <Toaster theme="dark" position="top-center" duration={3000} dir="rtl" richColors />
      </body>
    </html>
  );
}