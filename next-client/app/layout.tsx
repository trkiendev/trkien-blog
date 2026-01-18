// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import '@/components/code/code-block.css';
import { lexend } from "./(public)/font";

config.autoAddCss = false;

export const metadata: Metadata = {
      title: "trkien.dev",
      description: "Technical Software Blog",
};

export default function RootLayout({ children, }: { children: React.ReactNode; }) 
{
      return (
            <html lang="vi">
                  <body className={ lexend.className }>
                        {children}
                  </body>
            </html>
      );
}
