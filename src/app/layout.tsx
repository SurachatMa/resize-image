import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Footer from "@/components/Footer";
import SideContact from "@/components/SideContact";

export const metadata: Metadata = {
  title: "Image Optimiser",
  description: "ลดขนาดไฟล์รูปภาพโดยไม่สูญเสียคุณภาπ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <ThemeProvider>
          <div className="grow">{children}</div>
          <SideContact />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
