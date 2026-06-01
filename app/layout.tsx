import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";

const InterDisplay = localFont({
  src: "../public/InterVariable.ttf",
  variable: "--font-inter-display",
});
export const metadata: Metadata = {
  title: "Redstring — The Hiring OS",
  description: "AI-powered hiring operating system that automates candidate sourcing, screening, and interview scheduling.",
};

import { ThemeProvider } from "@/components/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`antialiased ${InterDisplay.className}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Global Platform Vertical Grid Lines */}
          <div className="pointer-events-none fixed inset-y-0 left-4 w-px bg-border md:left-16 z-0" />
          <div className="pointer-events-none fixed inset-y-0 right-4 w-px bg-border md:right-16 z-0" />
          
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
