import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/studyspot/theme-provider";
import { AuthProvider } from "@/components/studyspot/auth-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StudySpot — Prince Sultan University Study Spaces",
  description:
    "StudySpot helps Prince Sultan University students find available study spaces on campus in real time. Check seating availability across PSU libraries, quiet zones, and group study rooms in Riyadh before you walk over.",
  keywords: [
    "StudySpot",
    "Prince Sultan University",
    "PSU",
    "study spaces",
    "Riyadh",
    "library desks",
    "study rooms",
    "Saudi Arabia",
    "student app",
  ],
  authors: [{ name: "StudySpot" }],
  openGraph: {
    title: "StudySpot — Find Your Study Space",
    description:
      "Check real-time seating availability across campus study areas and save time finding a desk.",
    siteName: "StudySpot",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "StudySpot — Find Your Study Space",
    description:
      "Check real-time seating availability across campus study areas and save time finding a desk.",
  },
};

export const viewport: Viewport = {
  themeColor: "#1e2a78",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
