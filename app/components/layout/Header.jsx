"use client";

import { useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useMotionValue,
  useMotionValueEvent,
  animate,
  AnimatePresence,
} from "framer-motion";
import { ChevronDown, Menu, Search, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const colorCache = new Map();

function extractPrimaryColor(src, callback) {
  if (typeof window === "undefined" || !src) return;

  if (colorCache.has(src)) {
    callback(colorCache.get(src));
    return;
  }

  const img = new window.Image();
  img.crossOrigin = "anonymous";
  const separator = src.includes("?") ? "&" : "?";
  img.src = `${src}${separator}cors_bust=${Date.now()}`;

  img.onload = () => {
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;

      canvas.width = 32;
      canvas.height = 32;
      ctx.drawImage(img, 0, 0, 32, 32);

      const imageData = ctx.getImageData(0, 0, 32, 32);
      const data = imageData.data;

      let r = 0,
        g = 0,
        b = 0,
        count = 0;

      for (let i = 0; i < data.length; i += 4) {
        const alpha = data[i + 3];
        if (alpha > 50) {
          const red = data[i];
          const green = data[i + 1];
          const blue = data[i + 2];
          const isNearWhite = red > 230 && green > 230 && blue > 230;
          const isNearBlack = red < 25 && green < 25 && blue < 25;

          if (!isNearWhite && !isNearBlack) {
            r += red;
            g += green;
            b += blue;
            count++;
          }
        }
      }

      if (count > 0) {
        const result = `${Math.round(r / count)}, ${Math.round(g / count)}, ${Math.round(b / count)}`;
        colorCache.set(src, result);
        callback(result);
      } else {
        colorCache.set(src, null);
        callback(null);
      }
    } catch {
      colorCache.set(src, null);
      callback(null);
    }
  };

  img.onerror = () => {
    colorCache.set(src, null);
    callback(null);
  };
}

function CategoryCard({ item }) {
  const iconSrc = typeof item.icon === "string" ? item.icon : item.icon?.src;
  const [rgbColor, setRgbColor] = useState(
    item.color || (iconSrc ? colorCache.get(iconSrc) || null : null),
  );

  useEffect(() => {
    if (item.color) {
      setRgbColor(item.color);
      return;
    }
    if (iconSrc) {
      if (colorCache.has(iconSrc)) {
        setRgbColor(colorCache.get(iconSrc));
        return;
      }
      extractPrimaryColor(iconSrc, (rgb) => setRgbColor(rgb));
    }
  }, [iconSrc, item.color]);

  return (
    <Link href={`/category/${item.slug}`} className="block">
      <article
        style={
          rgbColor
            ? {
                backgroundColor: `rgba(${rgbColor}, 0.07)`,
                borderColor: `rgba(${rgbColor}, 0.3)`,
              }
            : undefined
        }
        className={`relative flex items-center justify-between px-2.5 py-2 border overflow-hidden ${
          !rgbColor ? "bg-transparent border-zinc-200" : ""
        }`}
      >
        <div className="relative z-10 min-w-0 pr-6">
          <h5 className="text-[14px] font-medium leading-tight truncate text-zinc-700">
            {item.name}
          </h5>
        </div>

        <div className="pointer-events-none absolute -bottom-1 -right-1 w-7 h-7 opacity-100">
          <Image
            alt={item.name}
            src={item.icon}
            width={28}
            height={28}
            className="w-full h-full object-contain"
          />
        </div>
      </article>
    </Link>
  );
}

function Header({ logo, data, categories = [] }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const { scrollY } = useScroll();
  const headerY = useMotionValue(0);

  const headerHeight = 130;

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    const diff = latest - prev;

    if (latest <= 20) {
      headerY.set(0);
      setIsScrolled(false);
      return;
    }

    setIsScrolled(true);

    if (diff > 0) {
      const currentY = headerY.get();
      const newY = Math.max(-headerHeight, currentY - diff);
      headerY.set(newY);
      setIsCategoriesOpen(false);
    } else if (diff < -2) {
      if (headerY.get() < 0) {
        animate(headerY, 0, {
          duration: 0.18,
          ease: [0.16, 1, 0.3, 1],
        });
      }
    }
  });

  const {
    searchPlaceholder = "Search products...",
    categoriesButtonText = "All Categories",
    primaryNavLinks = [],
    secondaryNavLinks = [],
    signInLink = { label: "Sign in", href: "/signin" },
    signUpLink = { label: "Sign up", href: "/signup" },
  } = data || {};

  const mobileNavLinks = [...primaryNavLinks, ...secondaryNavLinks];

  return (
    <>
      <div
        className="h-[89px] sm:h-[105px] md:h-[135px] lg:h-[145px] w-full shrink-0"
        aria-hidden="true"
      />

      <motion.header
        style={{ y: headerY }}
        className={`fixed top-0 left-0 z-50 w-full border-b border-zinc-100 ${
          isScrolled ? "bg-white/95 backdrop-blur-md" : "bg-white"
        }`}
      >
        <div className="mx-auto flex max-w-[1480px] flex-col">
          <div className="flex h-12 sm:h-16 lg:h-20 items-center justify-between gap-3 sm:gap-6 lg:gap-10 px-3 sm:px-6 lg:px-8">
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
                className="relative flex flex-1 items-center min-w-0 md:max-w-md border border-zinc-100 bg-zinc-50 focus-within:border-emerald-900 focus-within:bg-white"
              >
                <input
                  type="text"
                  name="q"
                  placeholder={searchPlaceholder}
                  className="w-full min-w-0 bg-transparent py-1 pl-2.5 pr-1 sm:pl-3.5 sm:pr-2 text-xs text-zinc-800 placeholder:text-zinc-500 outline-none sm:py-1.5 sm:text-sm"
                />

                <button
                  type="submit"
                  aria-label="Submit search"
                  className="flex shrink-0 items-center justify-center self-stretch px-2 sm:px-3 text-zinc-600 hover:text-emerald-900 cursor-pointer"
                >
                  <Search
                    className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                    strokeWidth={2}
                  />
                </button>
              </form>
            </div>

            <div className="flex items-center gap-3 sm:gap-5 lg:gap-7 shrink-0">
              <button className="flex items-center gap-1.5 sm:gap-2 text-zinc-700 hover:text-zinc-950 cursor-pointer">
                <ShoppingBag size={18} strokeWidth={1.5} />
                <span className="hidden sm:inline text-sm font-medium">
                  Cart
                </span>
              </button>

              {signInLink?.label && (
                <Link
                  href={signInLink.href || "/signin"}
                  className="text-xs sm:text-sm font-medium text-zinc-700 hover:text-zinc-950"
                >
                  {signInLink.label}
                </Link>
              )}

              {signUpLink?.label && (
                <Link
                  href={signUpLink.href || "/signup"}
                  className="rounded-none bg-emerald-800 px-3 sm:px-5 py-1.5 sm:py-2 text-xs lg:text-sm font-medium text-zinc-50 hover:bg-emerald-900 active:bg-zinc-950"
                >
                  {signUpLink.label}
                </Link>
              )}
            </div>
          </div>
        </div>

        {mobileNavLinks.length > 0 && (
          <div className="w-full md:hidden border-t border-zinc-100">
            <div className="mx-auto max-w-[1480px] relative px-3 sm:px-6 lg:px-8">
              <div className="flex items-center gap-5 overflow-x-auto py-2 pr-10 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none]">
                {mobileNavLinks.map((item, idx) => (
                  <Link
                    key={item._key || idx}
                    href={item.href || "/"}
                    className="shrink-0 text-xs font-medium text-zinc-700 hover:text-zinc-950 whitespace-nowrap"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div
                className={`pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l to-transparent ${
                  isScrolled
                    ? "from-white via-white"
                    : "from-white/50 via-white/30"
                }`}
              />
            </div>
          </div>
        )}

        <div className="hidden md:flex w-full border-t border-zinc-100 bg-white">
          <div className="mx-auto flex w-full max-w-[1480px] items-center justify-between py-2.5 sm:py-3 text-xs md:text-sm px-3 sm:px-6 lg:px-8 relative">
            <div className="flex items-center gap-4 md:gap-6 lg:gap-8 font-medium">
              {categoriesButtonText && (
                <div
                  className="relative"
                  onMouseEnter={() => setIsCategoriesOpen(true)}
                  onMouseLeave={() => setIsCategoriesOpen(false)}
                >
                  <button
                    type="button"
                    onClick={() => setIsCategoriesOpen((prev) => !prev)}
                    className="flex items-center gap-1.5 md:gap-2 text-zinc-800 hover:text-emerald-900 cursor-pointer py-1 select-none font-semibold"
                  >
                    <Menu size={16} strokeWidth={2} />
                    <span>{categoriesButtonText}</span>
                    <ChevronDown
                      size={14}
                      className={
                        isCategoriesOpen ? "rotate-180 text-emerald-900" : ""
                      }
                    />
                  </button>

                  <AnimatePresence>
                    {isCategoriesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute left-0 top-full z-[100] w-72 md:w-80 pt-2"
                      >
                        <div className="bg-white p-2.5 pt-3 border border-zinc-200 shadow-xl rounded-none max-h-[70vh] overflow-y-auto space-y-1.5 scrollbar-thin grid gap-2 grid-cols-2">
                          {categories.length > 0 ? (
                            categories.map((item, i) => (
                              <CategoryCard
                                key={`category-${item.slug}-${i}`}
                                item={item}
                              />
                            ))
                          ) : (
                            <p className="text-xs text-zinc-500 py-4 text-center col-span-2">
                              No categories available
                            </p>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {primaryNavLinks.map((item, idx) => (
                <Link
                  key={item._key || idx}
                  href={item.href || "/"}
                  className="text-zinc-700 hover:text-emerald-900 whitespace-nowrap"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4 lg:gap-7 font-normal text-zinc-600">
              {secondaryNavLinks.map((item, idx) => (
                <Link
                  key={item._key || idx}
                  href={item.href || "/"}
                  className="hover:text-zinc-950 whitespace-nowrap"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </motion.header>
    </>
  );
}

export default Header;
