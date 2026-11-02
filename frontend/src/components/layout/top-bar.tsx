"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Search,
  Bell,
  Plus,
  Sparkles,
  MapPin,
  Calendar,
  Shield,
  Compass,
  ArrowRightLeft,
  Building2,
} from "lucide-react";
import { NeoButton } from "@/components/ui/neo-button";
import { Avatar } from "@/components/ui/avatar";
import { getStoredUser, getCurrentUser, useAuthUser } from "@/lib/auth";
import { useToast } from "@/components/ui/toast";
import { notificationService } from "@/services/notifications";
import type { User, TripzyyNotification } from "@/types";

export const TopBar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname() || "";
  const { user } = useAuthUser();
  const { showToast } = useToast();

  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<TripzyyNotification[]>([]);

  const [unreadCount, setUnreadCount] = useState(0);

  // Fetched from the API
  useEffect(() => {
    if (!showNotifications) return;
    let cancelled = false;
    (async () => {
      const res = await notificationService.list({ limit: 10 });
      if (cancelled || !res.success || !res.data) return;
      setNotifications(res.data.items);
      setUnreadCount(res.data.unread_count);
    })();
    return () => {
      cancelled = true;
    };
  }, [showNotifications]);

  const handleMarkRead = async (id: string) => {
    const res = await notificationService.markRead(id);
    if (!res.success) return;
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
    );
    setUnreadCount((c) => Math.max(0, c - 1));
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/explore?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-16 md:top-0 z-20 w-full h-20 bg-[#FFF5E9]/90 backdrop-blur-md border-b-[3px] border-[#171313] px-6 lg:px-8 flex items-center justify-between gap-4 select-none">
      {/* Search Input with Karnataka Theme */}
      <form
        onSubmit={handleSearchSubmit}
        className="flex-1 max-w-md relative hidden sm:block"
      >
        <div className="relative flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ಕರ್ನಾಟಕ ತಾಣಗಳು ಹುಡುಕಿ • Search Karnataka destinations..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#FFFFFF] border-[3px] border-[#171313] rounded-xl text-xs sm:text-sm font-medium text-[#171313] placeholder:text-neutral-500 shadow-[3px_3px_0px_#171313] focus:outline-none focus:bg-[#FFFDFB] focus:shadow-[4px_4px_0px_#E51919] transition-all"
          />
          <Search className="w-4 h-4 text-neutral-600 absolute left-3.5 pointer-events-none" />
        </div>
      </form>

      {/* Right Controls */}
      <div className="flex items-center gap-3 sm:gap-4 ml-auto">
        {/* Dynamic Role Badge */}
        {user?.role === "operator" || user?.operator_role === "owner" || user?.operator_role === "manager" ? (
          <span
            title="Signed in as Tour Operator"
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl border-[2.5px] border-[#171313] text-xs font-display font-extrabold shadow-[2px_2px_0px_#171313] bg-[#D97706] text-white"
          >
            <Shield className="w-3.5 h-3.5 fill-white" />
            <span>Operator</span>
          </span>
        ) : user?.role === "coordinator" || user?.operator_role === "coordinator" ? (
          <span
            title="Signed in as Field Coordinator"
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl border-[2.5px] border-[#171313] text-xs font-display font-extrabold shadow-[2px_2px_0px_#171313] bg-[#7C3AED] text-white"
          >
            <Compass className="w-3.5 h-3.5 text-white" />
            <span>Coordinator</span>
          </span>
        ) : (
          <span
            title="Signed in as Explorer"
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl border-[2.5px] border-[#171313] text-xs font-display font-extrabold shadow-[2px_2px_0px_#171313] bg-[#15803D] text-white"
          >
            <Compass className="w-3.5 h-3.5 text-white" />
            <span>ಯಾತ್ರಿಕ • Explorer</span>
          </span>
        )}

        {/* Quick Action Button based on Role */}
        {user?.role === "operator" || user?.operator_role === "owner" || user?.operator_role === "manager" ? (
          <Link href="/operator">
            <button className="flex items-center gap-1.5 py-2 px-3.5 bg-[#FFF4E6] hover:bg-[#FFE8CC] text-[#171313] border-2 border-[#171313] rounded-xl text-xs font-display font-extrabold shadow-[2px_2px_0px_#171313] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer">
              <Building2 className="w-4 h-4 text-[#D97706]" />
              <span className="hidden sm:inline">Operator Portal</span>
            </button>
          </Link>
        ) : (
          <Link href="/trips/new">
            <button className="flex items-center gap-1.5 py-2 px-3.5 bg-[#E51919] hover:bg-[#C81515] text-white border-2 border-[#171313] rounded-xl text-xs font-display font-extrabold shadow-[2px_2px_0px_#171313] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer">
              <Plus className="w-4 h-4" />
              <span>ಹೊಸ ಪ್ರವಾಸ • New Trip</span>
            </button>
          </Link>
        )}

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2.5 bg-[#FFFFFF] border-2 border-[#171313] rounded-xl shadow-[2px_2px_0px_#171313] hover:bg-[#FAECDC] transition-colors cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4 text-[#171313]" />
            {unreadCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#E51919] text-white rounded-full text-[10px] font-black border-2 border-[#171313] flex items-center justify-center">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown Panel */}
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-[#FFFFFF] border-[3px] border-[#171313] rounded-2xl shadow-[6px_6px_0px_#171313] overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="p-4 bg-[#FFF5E9] border-b-2 border-[#171313] flex items-center justify-between">
                <span className="font-display font-black text-xs uppercase tracking-wider text-[#171313]">
                  ಸೂಚನೆಗಳು • Notifications
                </span>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 bg-[#E51919] text-white text-[10px] font-black rounded-md border border-[#171313]">
                    {unreadCount} new
                  </span>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-neutral-200">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-xs text-neutral-500 font-medium">
                    ಯಾವುದೇ ಹೊಸ ಸೂಚನೆಗಳಿಲ್ಲ (No new notifications)
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => handleMarkRead(n.id)}
                      className={`p-3.5 text-xs hover:bg-[#FFF9F2] transition-colors cursor-pointer ${
                        !n.is_read ? "bg-[#FFF4E6]" : ""
                      }`}
                    >
                      <div className="font-bold text-[#171313] mb-1">
                        {n.title}
                      </div>
                      <div className="text-neutral-600 line-clamp-2">
                        {n.body}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
