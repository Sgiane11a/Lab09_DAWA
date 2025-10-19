import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lab09 — Galería de Películas y Series",
  description: "Aplicación de ejemplo que compara SSR y CSR usando la API de OMDb",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 text-slate-900`}
      >
        <header className="w-full bg-white/80 backdrop-blur sticky top-0 z-40 border-b border-slate-200">
          <nav className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-4">
            <Link href="/" className="text-lg font-bold text-slate-800">Galería</Link>
            <Link href="/search" className="text-sm font-medium text-slate-600">Búsqueda</Link>
          </nav>
        </header>

        <main className="min-h-[80vh]">
          {children}
        </main>

        <footer className="max-w-6xl mx-auto px-6 py-6 text-xs text-slate-500">
          Hecho por Gianella Cordova
        </footer>
      </body>
    </html>
  );
}
