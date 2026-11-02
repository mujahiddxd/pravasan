"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Compass,
  Layers,
  Wallet,
  ChevronRight,
  Sparkles,
  MapPin,
  Palmtree,
  Mountain,
  Castle,
  Coffee,
} from "lucide-react";
import { NeoCard } from "@/components/ui/neo-card";
import { LandingNavbar } from "@/components/landing/landing-navbar";
import { TravelMotionScene } from "@/components/landing/travel-motion-scene";
import { PravasanLogo } from "@/components/ui/pravasan-logo";
import { destinationService } from "@/services/destinations";
import type { Destination } from "@/types";

export default function LandingPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);

  useEffect(() => {
    destinationService.search({ limit: 4 }).then((res) => {
      if (res.success && res.data) {
        const items = Array.isArray(res.data)
          ? res.data
          : (res.data as any).items || [];
        setDestinations(items);
      }
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#FDF4EB] text-[#171313] flex flex-col selection:bg-[#E51919] selection:text-white">
      {/* ─── 🧭 TOP NAVIGATION WITH KARNATAKA LOGO & KANNADA BADGES ─── */}
      <LandingNavbar />

      {/* ─── 🚩 OFFICIAL MOTTO BANNER: "ಒಂದು ರಾಜ್ಯ, ಹಲವು ಜಗತ್ತುಗಳು" ─── */}
      <div className="bg-[#FFD700] border-b-[3px] border-[#171313] py-2 px-4 text-center font-display font-black text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-3 shadow-[0_2px_0px_#171313]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#E51919] border border-[#171313]" />
        <span>ಒಂದು ರಾಜ್ಯ, ಹಲವು ಜಗತ್ತುಗಳು • One State, Many Worlds • Welcome to Karnataka</span>
        <span className="w-2.5 h-2.5 rounded-full bg-[#E51919] border border-[#171313]" />
      </div>

      {/* ─── 🌍 HERO SECTION (KARNATAKA HERITAGE & NEO-BRUTALISM) ─── */}
      <section className="relative px-6 sm:px-10 lg:px-16 pt-8 sm:pt-12 pb-10 sm:pb-14 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          {/* LEFT COLUMN: Pravasan Branding & Hero Typography */}
          <div className="lg:col-span-6 flex flex-col items-start text-left pl-0 z-10">
            {/* Heritage Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFFFFF] border-[2.5px] border-[#171313] rounded-xl font-display font-black text-xs uppercase mb-4 shadow-[3px_3px_0px_#171313]">
              <span className="w-3 h-3 rounded-full bg-[#E51919] border border-[#171313]" />
              <span className="text-[#E51919]">ಕರ್ನಾಟಕ ಪ್ರವಾಸ</span>
              <span className="text-neutral-400">•</span>
              <span className="text-[#171313]">PRAVASAN TRAVEL DESK</span>
            </div>

            {/* Main Headline with Kannada Script */}
            <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-[62px] xl:text-[70px] text-[#171313] tracking-[-0.03em] leading-[0.98] uppercase mb-4 text-left">
              ಕರ್ನಾಟಕದ <br />
              <span className="text-[#E51919]">ಅದ್ಭುತ ಪ್ರವಾಸ</span> <br />
              STARTS HERE<span className="text-[#FFD700] text-stroke">.</span>
            </h1>

            {/* Subtext */}
            <p className="text-sm sm:text-base font-medium text-neutral-700 leading-relaxed mb-6 max-w-lg">
              Explore royal palaces, Western Ghats mist, UNESCO heritage boulders, and sun-kissed Arabian Sea beaches. Pravasan (ಪ್ರವಾಸನ್) is your dedicated platform for curated Karnataka journeys.
            </p>

            {/* Quick Karnataka Highlights Pills */}
            <div className="flex flex-wrap items-center gap-2 mb-8 text-xs font-black">
              <span className="px-2.5 py-1 bg-[#FFF4E6] border-2 border-[#171313] rounded-lg shadow-[2px_2px_0px_#171313] flex items-center gap-1.5">
                <Castle className="w-3.5 h-3.5 text-[#E51919]" />
                ಮೈಸೂರು ಅರಮನೆ
              </span>
              <span className="px-2.5 py-1 bg-[#FFF4E6] border-2 border-[#171313] rounded-lg shadow-[2px_2px_0px_#171313] flex items-center gap-1.5">
                <Palmtree className="w-3.5 h-3.5 text-[#059669]" />
                ಗೋಕರ್ಣ ಕಡಲತೀರ
              </span>
              <span className="px-2.5 py-1 bg-[#FFF4E6] border-2 border-[#171313] rounded-lg shadow-[2px_2px_0px_#171313] flex items-center gap-1.5">
                <Mountain className="w-3.5 h-3.5 text-[#D97706]" />
                ಹಂಪಿ ರಥ
              </span>
              <span className="px-2.5 py-1 bg-[#FFF4E6] border-2 border-[#171313] rounded-lg shadow-[2px_2px_0px_#171313] flex items-center gap-1.5">
                <Coffee className="w-3.5 h-3.5 text-[#78350F]" />
                ಕೂರ್ಗ್ ಕಾಫಿ
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <Link href="/register">
                <button className="flex items-center gap-2 py-3.5 sm:py-4 px-6 sm:px-7 bg-[#E51919] hover:bg-[#C81515] text-white border-[3px] border-[#171313] rounded-2xl shadow-[4px_4px_0px_#171313] font-display font-black text-xs sm:text-sm uppercase tracking-wider hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer">
                  <span>ಪ್ರವಾಸ ಆರಂಭಿಸಿ • PLAN TRIP</span>
                  <ArrowRight className="w-5 h-5 stroke-[3]" />
                </button>
              </Link>
              <Link href="/explore">
                <button className="py-3.5 sm:py-4 px-6 sm:px-7 bg-[#FFFFFF] text-[#171313] border-[3px] border-[#171313] rounded-2xl shadow-[4px_4px_0px_#171313] font-display font-black text-xs sm:text-sm uppercase tracking-wider hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer">
                  ಅನ್ವೇಷಿಸಿ • EXPLORE
                </button>
              </Link>
            </div>

            {/* SCROLL TO EXPLORE ↓ Indicator */}
            <div className="mt-8 sm:mt-12 flex flex-col items-start gap-1 text-[11px] font-display font-black uppercase tracking-widest text-[#171313]">
              <span>SCROLL TO EXPLORE KARNATAKA</span>
              <span className="text-[#E51919] text-base leading-none font-black">
                ↓
              </span>
            </div>
          </div>

          {/* RIGHT COLUMN: Travel Artwork */}
          <div className="lg:col-span-6 w-full flex justify-center items-center">
            <TravelMotionScene />
          </div>
        </div>
      </section>

      {/* ─── 🟥 BRAND MOMENT MARQUEE RIBBON WITH KANNADA SCRIPT ─── */}
      <section className="bg-[#171313] text-[#FDF4EB] border-y-[4px] border-[#171313] py-3.5 select-none overflow-hidden">
        <div className="flex items-center gap-10 whitespace-nowrap font-display font-black text-xs sm:text-sm uppercase tracking-widest">
          <span className="text-[#FFD700]">ಪ್ರವಾಸನ್ • PRAVASAN</span>
          <span className="text-[#E51919]">✦</span>
          <span>ಒಂದು ರಾಜ್ಯ, ಹಲವು ಜಗತ್ತುಗಳು</span>
          <span className="text-[#E51919]">✦</span>
          <span>HAMPI UNESCO RUINS</span>
          <span className="text-[#E51919]">✦</span>
          <span>ಪಶ್ಚಿಮ ಘಟ್ಟಗಳು • WESTERN GHATS</span>
          <span className="text-[#E51919]">✦</span>
          <span>MYSURU ROYAL HERITAGE</span>
          <span className="text-[#E51919]">✦</span>
          <span>ಗೋಕರ್ಣ & ಮುರುಡೇಶ್ವರ ಕರಾವಳಿ</span>
          <span className="text-[#E51919]">✦</span>
          <span>KABINI & BANDIPUR SAFARIS</span>
          <span className="text-[#E51919]">✦</span>
          <span>ಬಾದಾಮಿ ಗುಹೆಗಳು</span>
          <span className="text-[#E51919]">✦</span>
        </div>
      </section>

      {/* ─── 📊 3 COMPACT PILLARS SECTION ─── */}
      <section className="px-6 sm:px-10 lg:px-16 py-16 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-3.5 py-1 rounded-lg border-2 border-[#171313] bg-[#E51919] text-white font-display font-black text-[11px] uppercase tracking-wider shadow-[2px_2px_0px_#171313] mb-3">
            ಪ್ರಮುಖ ಸೇವೆಗಳು • Key Capabilities
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-[#171313] tracking-tight uppercase">
            Everything for your Karnataka journey
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <NeoCard className="p-7 bg-[#FFFFFF] border-[3px] border-[#171313] shadow-[5px_5px_0px_#171313] flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#E51919] text-white border-2 border-[#171313] flex items-center justify-center shadow-[3px_3px_0px_#171313] mb-5">
                <Compass className="w-6 h-6" />
              </div>
              <div className="font-display font-black text-xs uppercase tracking-widest text-[#E51919] mb-1">
                01 / ಅನ್ವೇಷಿಸಿ • DISCOVER
              </div>
              <h3 className="font-display font-black text-2xl text-[#171313] mb-3">
                Curated Destinations
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 font-medium leading-relaxed">
                Discover 25+ vetted Karnataka destinations: Hampi, Gokarna, Coorg, Chikkamagaluru, Kabini, Badami, and Jog Falls with verified Google Place photos.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t-2 border-[#171313] flex items-center justify-between text-xs font-bold">
              <span>ಕರ್ನಾಟಕ ತಾಣಗಳು</span>
              <span className="text-[#E51919]">Live Plotted →</span>
            </div>
          </NeoCard>

          {/* Card 2 */}
          <NeoCard className="p-7 bg-[#FAECDC] border-[3px] border-[#171313] shadow-[5px_5px_0px_#E51919] flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#171313] text-[#FDF4EB] border-2 border-[#171313] flex items-center justify-center shadow-[3px_3px_0px_#171313] mb-5">
                <Layers className="w-6 h-6 text-[#FFD700]" />
              </div>
              <div className="font-display font-black text-xs uppercase tracking-widest text-[#171313] mb-1">
                02 / ಪ್ರವಾಸ ಯೋಜನೆ • ITINERARY
              </div>
              <h3 className="font-display font-black text-2xl text-[#171313] mb-3">
                Multi-Stop Circuits
              </h3>
              <p className="text-xs sm:text-sm text-neutral-700 font-medium leading-relaxed">
                Connect ancient dynasties to misty hill stations chronologically. Plan activities day-by-day with interactive large 880px Karnataka maps.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t-2 border-[#171313] flex items-center justify-between text-xs font-bold">
              <span>ದಿನವಾರು ಮಾರ್ಗ</span>
              <span className="text-[#171313]">Interactive Polyline →</span>
            </div>
          </NeoCard>

          {/* Card 3 */}
          <NeoCard className="p-7 bg-[#FFFFFF] border-[3px] border-[#171313] shadow-[5px_5px_0px_#171313] flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#FFF4E6] text-[#15803D] border-2 border-[#171313] flex items-center justify-center shadow-[3px_3px_0px_#171313] mb-5">
                <Wallet className="w-6 h-6 text-[#15803D]" />
              </div>
              <div className="font-display font-black text-xs uppercase tracking-widest text-[#15803D] mb-1">
                03 / ವೆಚ್ಚ ನಿರ್ವಹಣೆ • LEDGER
              </div>
              <h3 className="font-display font-black text-2xl text-[#171313] mb-3">
                Budget & Split Ledger
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 font-medium leading-relaxed">
                Manage group travel expenses across stays, wildlife jungle safaris, transport, and temple entries with real-time Neo-Brutalist charts.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t-2 border-[#171313] flex items-center justify-between text-xs font-bold">
              <span>ಖರ್ಚು ನಿರ್ವಹಣೆ</span>
              <span className="text-[#15803D]">Zero Stress →</span>
            </div>
          </NeoCard>
        </div>
      </section>

      {/* ─── 🌄 FEATURED REGIONAL CIRCUITS (Curated Destinations) ─── */}
      <section className="px-6 sm:px-10 lg:px-16 py-12 max-w-7xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="inline-block px-3 py-1 rounded-lg border-2 border-[#171313] bg-[#E51919] text-white font-display font-black text-[11px] uppercase tracking-wider shadow-[2px_2px_0px_#171313] mb-2">
              ಜನಪ್ರಿಯ ತಾಣಗಳು • Top Karnataka Circuits
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-[#171313] tracking-tight uppercase">
              Featured Destinations
            </h2>
          </div>
          <Link href="/explore">
            <button className="py-2.5 px-4 bg-[#FFFFFF] border-[2px] border-[#171313] rounded-xl shadow-[2px_2px_0px_#171313] font-display font-black text-xs uppercase flex items-center gap-1.5 cursor-pointer hover:bg-[#FFF4E6]">
              <span>ಸಂಪೂರ್ಣ ಪಟ್ಟಿ • VIEW ALL DESTINATIONS</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.slice(0, 4).map((dest) => (
            <NeoCard
              key={dest.id}
              interactive
              className="p-0 overflow-hidden flex flex-col justify-between group bg-[#FFFFFF]"
            >
              <div className="relative h-48 w-full border-b-[3px] border-[#171313] overflow-hidden">
                <Image
                  src={dest.image_url || "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600"}
                  alt={dest.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  unoptimized
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 bg-[#E51919] text-white border-2 border-[#171313] rounded-md font-display font-extrabold text-[11px] uppercase shadow-[2px_2px_0px_#171313]">
                    {dest.region}
                  </span>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="font-display font-black text-lg text-[#171313] mb-1">
                    {dest.name}
                  </h3>
                  <p className="text-xs text-neutral-600 line-clamp-2 font-medium">
                    {dest.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t-2 border-[#171313] flex items-center justify-between">
                  <span className="text-xs font-bold text-[#E51919]">
                    {dest.city}, {dest.country}
                  </span>
                  <Link href={`/explore?city=${encodeURIComponent(dest.city)}`}>
                    <button className="text-xs font-display font-black uppercase hover:underline flex items-center gap-1 cursor-pointer text-[#171313]">
                      ಯೋಜಿಸಿ • Plan <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </Link>
                </div>
              </div>
            </NeoCard>
          ))}
        </div>
      </section>

      {/* ─── 🚀 BOTTOM CTA EXPERIENCE BANNER ─── */}
      <section className="px-6 sm:px-10 lg:px-16 py-16 max-w-7xl mx-auto w-full">
        <div className="relative rounded-3xl border-[4px] border-[#171313] bg-[#E51919] p-8 sm:p-12 md:p-16 text-white shadow-[8px_8px_0px_#171313] overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#171313] text-[#FDF4EB] border-2 border-white rounded-lg font-display font-black text-xs uppercase mb-4 shadow-[2px_2px_0px_#FFFFFF]">
              <Sparkles className="w-4 h-4 fill-[#FFD700] text-[#FFD700]" />
              <span>ಕರುನಾಡ ಪ್ರವಾಸಕ್ಕೆ ಸುಸ್ವಾಗತ • Welcome to Karunadu</span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase leading-[1.05] mb-4">
              ನಿಮ್ಮ ಕರ್ನಾಟಕ ಪ್ರವಾಸ ಇಂದೇ ಪ್ರಾರಂಭಿಸಿ.
            </h2>

            <p className="text-sm sm:text-base text-[#FDF4EB]/90 font-medium mb-8">
              Join travelers building dynamic itineraries, interactive maps, and authentic Karnataka expedition routes on Pravasan (ಪ್ರವಾಸನ್).
            </p>

            <Link href="/register">
              <button className="flex items-center gap-2 py-4 px-8 bg-[#FFD700] hover:bg-[#F5CB00] text-[#171313] border-[3px] border-[#171313] rounded-2xl shadow-[5px_5px_0px_#171313] font-display font-black text-base uppercase hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer">
                <span>ಪ್ರವಾಸ ಪ್ರಾರಂಭಿಸಿ • START PLANNING FREE</span>
                <ArrowRight className="w-5 h-5 stroke-[3]" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 🧭 CLEAN FOOTER WITH PRAVASAN LOGO ─── */}
      <footer className="mt-auto bg-[#171313] text-[#FDF4EB] border-t-[4px] border-[#171313] py-12 px-6 sm:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-[#FFFFFF] rounded-2xl border-2 border-[#171313] shadow-[3px_3px_0px_#FFFFFF]">
              <PravasanLogo variant="icon" size="sm" />
            </div>
            <div>
              <div className="font-display font-black text-lg text-white tracking-tight flex items-center gap-2">
                <span>PRAVASAN</span>
                <span className="text-sm text-[#FFD700] font-normal" style={{ fontFamily: "'Noto Sans Kannada', sans-serif" }}>
                  ಪ್ರವಾಸನ್
                </span>
              </div>
              <p className="text-xs text-neutral-400 font-medium">
                ಕರ್ನಾಟಕ ಪ್ರವಾಸ ಮತ್ತು ಯಾತ್ರಾ ಯೋಜನೆ • Karnataka Tour & Travel Platform
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs font-bold text-neutral-300">
            <Link href="/explore" className="hover:text-white transition-colors">
              ಅನ್ವೇಷಿಸಿ (Explore)
            </Link>
            <Link href="/calendar" className="hover:text-white transition-colors">
              ಕ್ಯಾಲೆಂಡರ್ (Calendar)
            </Link>
            <Link href="/login" className="hover:text-white transition-colors">
              ಲಾಗಿನ್ (Sign In)
            </Link>
          </div>

          <div className="text-xs text-neutral-400 font-medium">
            © 2026 Pravasan (ಪ್ರವಾಸನ್). All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
