"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Compass, Calendar, MapPin } from "lucide-react";
import { PravasanLogo } from "@/components/ui/pravasan-logo";

export const LandingNavbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-[#FDF4EB] border-b-[3px] border-[#171313] px-6 sm:px-10 lg:px-16 py-3.5 select-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
          {/* LEFT: Official Pravasan Karnataka Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 hover:-translate-x-0.5 hover:-translate-y-0.5 transition-transform"
          >
            <PravasanLogo size="md" />
          </Link>

          {/* CENTER: Karnataka Tour Navigation with Kannada Elements */}
          <nav className="hidden md:flex items-center gap-8 font-display font-black text-xs uppercase tracking-wider text-[#171313]">
            <Link
              href="/explore"
              className="flex items-center gap-1.5 hover:text-[#E51919] transition-colors py-1 px-2 rounded-lg hover:bg-[#FAECDC]"
            >
              <Compass className="w-3.5 h-3.5 text-[#E51919]" />
              <span>ಅನ್ವೇಷಿಸಿ • EXPLORE</span>
            </Link>
            <Link
              href="/calendar"
              className="flex items-center gap-1.5 hover:text-[#E51919] transition-colors py-1 px-2 rounded-lg hover:bg-[#FAECDC]"
            >
              <Calendar className="w-3.5 h-3.5 text-[#E51919]" />
              <span>ಕ್ಯಾಲೆಂಡರ್ • SCHEDULE</span>
            </Link>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FFF4E6] border-2 border-[#171313] rounded-md text-[10px] font-black uppercase text-[#E51919] shadow-[1.5px_1.5px_0px_#171313]">
              <span className="w-2 h-2 rounded-full bg-[#E51919] animate-pulse" />
              <span>ಕರುನಾಡು ಪ್ರವಾಸ</span>
            </span>
          </nav>

          {/* RIGHT: Auth Buttons with Kannada + English */}
          <div className="hidden sm:flex items-center gap-3">
            <Link href="/login">
              <button className="py-2 px-5 bg-[#FFFFFF] text-[#171313] border-[2.5px] border-[#171313] rounded-xl shadow-[3px_3px_0px_#171313] font-display font-black text-xs uppercase tracking-wider hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer">
                <span>ಲಾಗಿನ್ • SIGN IN</span>
              </button>
            </Link>
            <Link href="/register">
              <button className="flex items-center gap-2 py-2 px-5 bg-[#E51919] hover:bg-[#C81515] text-white border-[2.5px] border-[#171313] rounded-xl shadow-[3px_3px_0px_#171313] font-display font-black text-xs uppercase tracking-wider hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer">
                <span>ಸೈನ್ ಅಪ್ • SIGN UP</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </Link>
          </div>

          {/* MOBILE TOGGLE */}
          <div className="flex sm:hidden items-center gap-2">
            <Link href="/login">
              <button className="px-2.5 py-1 bg-[#FFFFFF] text-[#171313] border-[2px] border-[#171313] rounded-lg font-display font-black text-[11px] uppercase shadow-[2px_2px_0px_#171313]">
                ಲಾಗಿನ್
              </button>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl border-[2.5px] border-[#171313] bg-[#E51919] text-white shadow-[2px_2px_0px_#171313] cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE SLIDE-OUT MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 sm:hidden flex flex-col">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-[#171313]/60 backdrop-blur-xs"
            />
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative bg-[#FDF4EB] border-b-[4px] border-[#171313] p-6 shadow-[6px_6px_0px_#171313] z-10 flex flex-col gap-5"
            >
              <div className="flex items-center justify-between pb-3 border-b-2 border-[#171313]">
                <PravasanLogo size="sm" />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg border border-[#171313] bg-[#FFFFFF]"
                >
                  <X className="w-5 h-5 text-[#171313]" />
                </button>
              </div>

              <div className="flex flex-col gap-3 font-display font-black text-sm uppercase">
                <Link
                  href="/explore"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-3 bg-[#FFFFFF] border-2 border-[#171313] rounded-xl shadow-[2px_2px_0px_#171313] hover:bg-[#FAECDC] flex items-center justify-between"
                >
                  <span>ಅನ್ವೇಷಿಸಿ • EXPLORE</span>
                  <Compass className="w-4 h-4 text-[#E51919]" />
                </Link>
                <Link
                  href="/calendar"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-3 bg-[#FFFFFF] border-2 border-[#171313] rounded-xl shadow-[2px_2px_0px_#171313] hover:bg-[#FAECDC] flex items-center justify-between"
                >
                  <span>ಕ್ಯಾಲೆಂಡರ್ • SCHEDULE</span>
                  <Calendar className="w-4 h-4 text-[#E51919]" />
                </Link>
              </div>

              <div className="flex flex-col gap-2.5 pt-3 border-t-2 border-[#171313]">
                <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                  <button className="w-full flex items-center justify-center gap-2 py-3 bg-[#E51919] text-white border-[3px] border-[#171313] rounded-xl shadow-[3px_3px_0px_#171313] font-display font-black uppercase text-sm">
                    <span>ಸೈನ್ ಅಪ್ • SIGN UP</span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </button>
                </Link>
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <button className="w-full py-3 bg-[#FFFFFF] text-[#171313] border-[3px] border-[#171313] rounded-xl shadow-[3px_3px_0px_#171313] font-display font-black uppercase text-sm">
                    ಲಾಗಿನ್ • SIGN IN
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
