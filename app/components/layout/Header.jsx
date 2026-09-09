"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, Search, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function Header({ logo, data }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    const diff = latest - prev;

    if (latest <= 40) {
      setIsVisible(true);
      setIsScrolled(false);
      return;
    }

    setIsScrolled(true);

    if (diff > 5) {
      setIsVisible(false);
    } else if (diff < -5) {
      setIsVisible(true);
    }
  });

  // Sanity Data Destructuring with Fallbacks
  const {
    searchPlaceholder = "Search products...",
    categoriesButtonText = "All Categories",
    primaryNavLinks = [],
    secondaryNavLinks = [],
    signInLink = { label: "Sign in", href: "/signin" },
    signUpLink = { label: "Sign up", href: "/signup" },
  } = data || {};

  // মোবাইলে স্লাইডারে দেখানোর জন্য Primary ও Secondary লিংক একত্রিত করা হয়েছে
  const mobileNavLinks = [...primaryNavLinks, ...secondaryNavLinks];

  return (
    <motion.header
      variants={{
        visible: { top: "0px" },
        hidden: { top: "-130px" },
      }}
      initial={false}
      animate={isVisible ? "visible" : "hidden"}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className={`fixed left-0 z-50 w-full bg-white ${
        isScrolled
          ? "border-b border-zinc-200 shadow-xs"
          : "border-b border-zinc-100"
      }`}
    >
      <div className="mx-auto flex max-w-[1480px] flex-col">
        {/* Main Navbar Row */}
        <div className="flex h-12 sm:h-16 lg:h-20 items-center justify-between gap-3 sm:gap-6 lg:gap-10 px-3 sm:px-6 lg:px-8">
          {/* Logo & Search Bar */}
          <div className="flex flex-1 items-center gap-2.5 sm:gap-6 min-w-0">
            <Link href="/" className="shrink-0 flex items-center">
              <div className="relative h-6 sm:h-8 md:h-9 w-auto">
                <Image
                  src={logo}
                  alt="Sherpur Agro"
                  height={36}
                  width={140}
                  className="h-full w-auto max-w-[105px] sm:max-w-[130px] md:max-w-[160px] object-contain"
                  priority
                />
              </div>
            </Link>

            <form
              action="/search"
              method="GET"
              className="relative flex flex-1 items-center min-w-0 md:max-w-md border border-zinc-200 bg-zinc-50 focus-within:border-emerald-900 focus-within:bg-white"
            >
              <input
                type="text"
                name="q"
                placeholder={searchPlaceholder}
                className="w-full min-w-0 bg-transparent py-1 pl-2.5 pr-1 sm:pl-3.5 sm:pr-2 text-xs text-zinc-800 placeholder:text-zinc-400 outline-none sm:py-1.5 sm:text-sm"
              />

              <button
                type="submit"
                aria-label="Submit search"
                className="flex shrink-0 items-center justify-center self-stretch px-2 sm:px-3 text-zinc-500 hover:text-emerald-900 cursor-pointer"
              >
                <Search className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2} />
              </button>
            </form>
          </div>

          {/* Desktop & Tablet Actions */}
          <div className="hidden md:flex items-center gap-5 lg:gap-7 shrink-0">
            <button className="flex items-center gap-2 text-zinc-700 hover:text-zinc-950 cursor-pointer">
              <ShoppingBag size={18} strokeWidth={1.5} />
              <span className="text-sm font-medium">Cart</span>
            </button>

            {signInLink?.label && (
              <Link
                href={signInLink.href || "/signin"}
                className="text-sm font-medium text-zinc-700 hover:text-zinc-950"
              >
                {signInLink.label}
              </Link>
            )}

            {signUpLink?.label && (
              <Link
                href={signUpLink.href || "/signup"}
                className="rounded-none bg-emerald-800 px-5 py-2 text-xs lg:text-sm font-medium text-zinc-50 hover:bg-emerald-900 active:bg-zinc-950"
              >
                {signUpLink.label}
              </Link>
            )}
          </div>
        </div>

        {/* Mobile & Tablet Slider Navigation (Primary + Secondary Merged) */}
        {mobileNavLinks.length > 0 && (
          <div className="relative w-full lg:hidden border-t border-zinc-200 px-3 sm:px-6 lg:px-8">
            <div className="flex items-center gap-5 overflow-x-auto py-2 pr-10 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none]">
              {mobileNavLinks.map((item, idx) => (
                <Link
                  key={item._key || idx}
                  href={item.href || "/"}
                  className="shrink-0 text-xs font-medium text-zinc-600 hover:text-zinc-950 whitespace-nowrap"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white via-white to-transparent" />
          </div>
        )}

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center justify-between py-3 text-sm px-3 sm:px-6 lg:px-8 border-t border-zinc-100">
          {/* Left: Categories + Primary Nav Links */}
          <div className="flex items-center gap-8 font-medium">
            {categoriesButtonText && (
              <button className="flex items-center gap-2 text-zinc-700 hover:text-zinc-950 cursor-pointer">
                <Menu size={16} strokeWidth={1.75} />
                <span>{categoriesButtonText}</span>
              </button>
            )}

            {primaryNavLinks.map((item, idx) => (
              <Link
                key={item._key || idx}
                href={item.href || "/"}
                className="text-zinc-600 hover:text-zinc-950"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right: Secondary Nav Links */}
          <div className="flex items-center gap-7 font-normal text-zinc-500">
            {secondaryNavLinks.map((item, idx) => (
              <Link
                key={item._key || idx}
                href={item.href || "/"}
                className="hover:text-zinc-900"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.header>
  );
}

export default Header;
