import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata = {
  title: "RailPulse | AI Railway Block Planning & Maintenance",
  description:
    "AI-Powered Automatic Railway Block Planning & Infrastructure Maintenance System for zero-conflict, multi-department track works."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-950 antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}