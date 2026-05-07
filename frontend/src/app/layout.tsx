import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

// ─── Fonts ──────────────────────────────────────────────────────────
const inter = Inter({
  subsets:  ["latin"],
  variable: "--font-inter",
  display:  "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets:  ["latin"],
  variable: "--font-mono",
  display:  "swap",
  weight:   ["400", "500", "600"],
});

// ─── Metadata ───────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default:  "PulseWatch — Monitor Everything. Miss Nothing.",
    template: "%s | PulseWatch",
  },
  description:
    "Production-grade observability and monitoring platform for Windows servers. Real-time metrics, logs, and alerts — all in one place.",
  keywords: [
    "monitoring",
    "observability",
    "prometheus",
    "grafana",
    "dashboard",
    "devops",
    "windows server",
    "metrics",
    "alerts",
    "logs",
  ],
  authors:  [{ name: "PulseWatch" }],
  creator:  "PulseWatch",
  metadataBase: new URL(
    process.env["NEXT_PUBLIC_APP_URL"] ?? "http://localhost:3000"
  ),
  openGraph: {
    type:        "website",
    locale:      "en_US",
    url:         "/",
    title:       "PulseWatch — Monitor Everything. Miss Nothing.",
    description: "Production-grade observability and monitoring platform for Windows servers.",
    siteName:    "PulseWatch",
  },
  twitter: {
    card:        "summary_large_image",
    title:       "PulseWatch",
    description: "Production-grade observability and monitoring platform.",
  },
  robots: {
    index:             true,
    follow:            true,
    googleBot: {
      index:            true,
      follow:           true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet":     -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f0f9ff" },
    { media: "(prefers-color-scheme: dark)",  color: "#0f1117" },
  ],
  width:        "device-width",
  initialScale: 1,
};

// ─── Root Layout ────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans antialiased min-h-screen bg-background text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}