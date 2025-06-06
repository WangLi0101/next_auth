import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/home/header";
import { Aos } from "@/components/aos";
import { ThemeProvider } from "@/components/theme";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "home",
  description:
    "Welcome to my personal homepage where I share insights on frontend development, React, technology growth, and life reflections. Explore high-quality blog posts, discover the latest programming tips, and keep progressing every day.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn("min-h-screen font-sans antialiased", geistMono.variable)}
      >
        <Aos>
          <ThemeProvider>
            <Header />
            <div className="content">{children}</div>
            <Toaster richColors />
          </ThemeProvider>
        </Aos>
      </body>
    </html>
  );
}
