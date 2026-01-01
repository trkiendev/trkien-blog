// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
      title: "trKienBlog",
      description: "Technical Software Blog",
};

export default function RootLayout({
      children,
}: {
      children: React.ReactNode;
}) {
      return (
            <html lang="vi">
                  <body className="bg-zinc-50 dark:bg-black">
                        {children}
                  </body>
            </html>
      );
}
