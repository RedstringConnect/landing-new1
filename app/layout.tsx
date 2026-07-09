import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";

const InterDisplay = localFont({
  src: "../public/InterVariable.ttf",
  variable: "--font-inter-display",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
});
export const metadata: Metadata = {
  metadataBase: new URL("https://www.redstring.co.in"),
  title: "Redstring — The Hiring OS",
  description: "AI-powered hiring operating system that automates candidate sourcing, screening, and interview scheduling.",
  openGraph: {
    title: "Redstring — The Hiring OS",
    description: "AI-powered hiring operating system that automates candidate sourcing, screening, and interview scheduling.",
    url: "https://www.redstring.co.in",
    siteName: "Redstring",
    images: [
      {
        url: "/Logo.png",
        width: 800,
        height: 600,
        alt: "Redstring Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Redstring — The Hiring OS",
    description: "AI-powered hiring operating system that automates candidate sourcing, screening, and interview scheduling.",
    images: ["/Logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.redstring.co.in",
  },
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/favicon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

import { ThemeProvider } from "@/components/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Redstring",
    url: "https://www.redstring.co.in",
    description: "AI-powered hiring operating system that automates candidate sourcing, screening, and interview scheduling.",
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
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
