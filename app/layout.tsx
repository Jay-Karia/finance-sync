import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "./providers/theme";
import { Toaster } from "@/components/ui/sonner";
import { JotaiProvider } from "./providers/jotai";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Finance Sync",
  description: "💳 Group expense tracker.",
  icons: [
    {
      rel: "icon",
      url: "/credit-card-yellow.png",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <JotaiProvider>
            <Navbar />
            {children}
            <Toaster />
          </JotaiProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
