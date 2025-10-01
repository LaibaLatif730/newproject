"use client";

import { useEffect, useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { School, MessageCircle, Phone } from "lucide-react";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = () => alert("Login functionality is disabled in this demo.");

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
        suppressHydrationWarning
      >
        {mounted && (
          <>
            {/* GLOBAL NAVBAR */}
            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
              <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image src="/images/logo.png" alt="School Logo" width={40} height={40} className="rounded-full" />
                  <span className="font-bold text-lg">Beacon House School</span>
                </div>
                <div className="hidden md:flex items-center gap-6 text-sm font-medium">
                  <a href="/" className="hover:text-indigo-600">Home</a>
                  <a href="/about-us" className="hover:text-indigo-600">About Us</a>
                  <a href="/career-guidance" className="hover:text-indigo-600">Career Guidance</a>
                  <a href="/courses-overview" className="hover:text-indigo-600">Courses Overview</a>
                  <a href="/application-portal" className="hover:text-indigo-600">Application Portal</a>
                  <a href="/portfolio" className="hover:text-indigo-600">Portfolio</a>
                  <Button size="sm" onClick={handleLogin}>Sign In</Button>
                </div>
              </div>
            </nav>

            {/* PAGE CONTENT */}
            <main className="flex-1">{children}</main>

            {/* GLOBAL FOOTER */}
            <footer className="bg-gray-900 text-gray-300 mt-20">
              <div className="mx-auto max-w-7xl px-4 py-10 grid md:grid-cols-3 gap-8">
                <div>
                  <div className="flex items-center gap-2 font-semibold">
                    <School className="h-5 w-5" />
                    Beacon House School
                  </div>
                  <p className="text-sm mt-2 text-gray-400">
                    A digital growth platform for schools—portfolio + admissions + guidance.
                  </p>
                </div>
                <div>
                  <div className="font-semibold mb-2">Quick Links</div>
                  <ul className="space-y-1 text-sm text-gray-400">
                    <li><a href="#programs" className="hover:text-white">Programs</a></li>
                    <li><a href="#admission" className="hover:text-white">Admissions</a></li>
                    <li><a href="#events" className="hover:text-white">Events</a></li>
                  </ul>
                </div>
                <div>
                  <div className="font-semibold mb-2">Support</div>
                  <div className="flex gap-2">
                    <Button variant="secondary" size="sm" className="gap-2">
                      <MessageCircle className="h-4 w-4" /> WhatsApp
                    </Button>
                    <Button variant="secondary" size="sm" className="gap-2">
                      <Phone className="h-4 w-4" /> Call
                    </Button>
                  </div>
                </div>
              </div>
              <div className="border-t border-white/10 py-4 text-center text-xs text-gray-400">
                © 2025 Champion School. All rights reserved.
              </div>
            </footer>
          </>
        )}
      </body>
    </html>
  );
}
