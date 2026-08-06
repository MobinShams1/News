import { Toaster } from "sonner";
import "./globals.css";

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