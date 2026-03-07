"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/", label: "Home" },
  { href: "/what-we-do", label: "What We Do" },
  { href: "/who-we-are", label: "Who We Are" },
  { href: "/how-we-do-it", label: "How We Do It" },
];

const caseStudies = [
  { href: "/case-studies/cube", label: "Cube Printing" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [csOpen, setCsOpen] = useState(false);
  const pathname = usePathname();
  const csTimeout = useRef<NodeJS.Timeout | null>(null);

  const isCaseStudy = pathname.startsWith("/case-studies");

  const handleCsEnter = () => {
    if (csTimeout.current) clearTimeout(csTimeout.current);
    setCsOpen(true);
  };
  const handleCsLeave = () => {
    csTimeout.current = setTimeout(() => setCsOpen(false), 200);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-darkest/80 backdrop-blur-xl border-b border-brand-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-3xl tracking-tight text-shimmer">
              <span className="font-extrabold">OUT</span><span className="font-light">PACE</span><span className="text-brand-cyan-bright font-extrabold">.</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? "text-brand-cyan-bright bg-brand-cyan-bright/10"
                    : "text-brand-muted hover:text-brand-text hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Case Studies dropdown */}
            <div
              className="relative"
              onMouseEnter={handleCsEnter}
              onMouseLeave={handleCsLeave}
            >
              <Link
                href="/case-studies"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 inline-flex items-center gap-1 ${
                  isCaseStudy
                    ? "text-brand-cyan-bright bg-brand-cyan-bright/10"
                    : "text-brand-muted hover:text-brand-text hover:bg-white/5"
                }`}
              >
                Case Studies
                <ChevronDown size={14} className={`transition-transform duration-200 ${csOpen ? "rotate-180" : ""}`} />
              </Link>

              <AnimatePresence>
                {csOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-1 w-52 py-2 rounded-xl bg-brand-dark/95 backdrop-blur-xl border border-brand-border/50 shadow-xl shadow-black/30"
                  >
                    {caseStudies.map((cs) => (
                      <Link
                        key={cs.href}
                        href={cs.href}
                        className={`block px-4 py-2.5 text-sm transition-colors ${
                          pathname === cs.href
                            ? "text-brand-cyan-bright bg-brand-cyan-bright/10"
                            : "text-brand-muted hover:text-brand-text hover:bg-white/5"
                        }`}
                      >
                        {cs.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/contact"
              className="ml-4 px-5 py-2.5 bg-gradient-to-r from-brand-cyan to-brand-teal hover:from-brand-cyan-bright hover:to-brand-cyan text-white text-sm font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-brand-cyan/25"
            >
              Book a Call
            </Link>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-brand-muted hover:text-brand-text transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-brand-dark border-t border-brand-border/50"
          >
            <div className="px-4 py-4 space-y-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    pathname === link.href
                      ? "text-brand-cyan-bright bg-brand-cyan-bright/10"
                      : "text-brand-muted hover:text-brand-text hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile Case Studies section */}
              <div className="px-4 py-2">
                <p className="text-xs text-brand-muted uppercase tracking-wider mb-2">Case Studies</p>
              </div>
              {caseStudies.map((cs) => (
                <Link
                  key={cs.href}
                  href={cs.href}
                  onClick={() => setOpen(false)}
                  className={`block px-6 py-3 rounded-lg text-sm font-medium transition-all ${
                    pathname === cs.href
                      ? "text-brand-cyan-bright bg-brand-cyan-bright/10"
                      : "text-brand-muted hover:text-brand-text hover:bg-white/5"
                  }`}
                >
                  {cs.label}
                </Link>
              ))}

              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="block mt-2 px-4 py-3 bg-gradient-to-r from-brand-cyan to-brand-teal text-white text-sm font-semibold rounded-lg text-center hover:from-brand-cyan-bright hover:to-brand-cyan transition-all shadow-lg shadow-brand-cyan/25"
              >
                Book a Call
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
