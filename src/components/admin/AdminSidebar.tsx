"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface AdminSidebarProps {
  userEmail: string;
}

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Clients", href: "/admin/clients", icon: Users },
];

export default function AdminSidebar({ userEmail }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  };

  function isActive(href: string): boolean {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  }

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="px-6 pt-6 pb-2">
        <Link href="/admin" className="block">
          <h1 className="text-xl font-bold font-display tracking-tight">
            <span className="text-brand-cyan-bright">OUT</span>
            <span className="text-brand-text">PACE</span>
            <span className="text-brand-cyan-bright">.</span>
          </h1>
        </Link>
        <p className="text-xs text-brand-cyan font-semibold uppercase tracking-wider mt-1">
          Admin
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 mt-6 space-y-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                active
                  ? "text-brand-cyan-bright bg-brand-cyan/10"
                  : "text-brand-muted hover:text-brand-text hover:bg-white/5"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Sign out */}
      <div className="px-3 pb-4 mt-auto border-t border-brand-border/50 pt-4">
        <p className="px-3 mb-2 text-xs text-brand-muted truncate">
          {userEmail}
        </p>
        <button
          type="button"
          onClick={handleSignOut}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-brand-muted hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
        >
          <LogOut size={18} />
          Sign out
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:flex-col md:fixed md:inset-y-0 md:left-0 md:w-64 bg-brand-dark border-r border-brand-border/50 z-40">
        {sidebarContent}
      </aside>

      {/* Mobile hamburger */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-brand-dark border-b border-brand-border/50 z-50 flex items-center px-4 justify-between">
        <Link href="/admin">
          <h1 className="text-lg font-bold font-display tracking-tight">
            <span className="text-brand-cyan-bright">OUT</span>
            <span className="text-brand-text">PACE</span>
            <span className="text-brand-cyan-bright">.</span>
          </h1>
        </Link>
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-brand-muted hover:text-brand-text transition-colors"
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-0 bg-black/60 z-40"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="md:hidden fixed inset-y-0 left-0 w-64 bg-brand-dark border-r border-brand-border/50 z-50 flex flex-col"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
