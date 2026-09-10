"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

interface Category {
  icon: any;
  name: string;
  slug: string;
}

export default function CategorySlider({ items }: { items: Category[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const checkScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
  }, []);

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [checkScroll]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || (!canScrollRight && !canScrollLeft)) return;

    const interval = setInterval(() => {
      if (isHovered || !el) return;

      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: 180, behavior: "smooth" });
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isHovered, canScrollRight, canScrollLeft]);

  const handleManualScroll = (direction: "left" | "right") => {
    const el = containerRef.current;
    if (!el) return;
    const scrollAmount = direction === "left" ? -250 : 250;
    el.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const getMaskStyle = () => {
    if (canScrollLeft && canScrollRight) {
      return {
        maskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      };
    }
    if (canScrollLeft) {
      return {
        maskImage: "linear-gradient(to right, transparent, black 10%)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 10%)",
      };
    }
    if (canScrollRight) {
      return {
        maskImage: "linear-gradient(to left, transparent, black 10%)",
        WebkitMaskImage: "linear-gradient(to left, transparent, black 10%)",
      };
    }
    return {};
  };

  return (
    <div
      className="relative group pt-3"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {canScrollLeft && (
        <button
          onClick={() => handleManualScroll("left")}
          aria-label="Scroll Left"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center !text-emerald-800 hover:bg-white hover:scale-105 transition"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      )}

      <div
        ref={containerRef}
        onScroll={checkScroll}
        style={getMaskStyle()}
        className="flex items-center gap-3 overflow-x-auto scrollbar-none scroll-smooth pb-1 -mt-4 md:-mt-1"
      >
        {items?.map(({ slug, name, icon }) => (
          <Link
            key={`category-${slug}`}
            href={`/category/${slug}`}
            className="flex-shrink-0"
          >
            <article className="flex items-center gap-2 md:gap-3 min-w-[130px] sm:min-w-[150px] md:min-w-44 lg:min-w-48 p-1.5 sm:p-2 md:p-2.5 bg-slate-100/40 border border-zinc-200/60 rounded-md hover:bg-slate-100 transition">
              <div className="relative flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10">
                <Image
                  alt={name}
                  src={icon}
                  fill
                  sizes="(max-width: 640px) 28px, (max-width: 768px) 32px, 40px"
                  className="object-contain"
                />
              </div>

              <div className="flex flex-col justify-center min-w-0 flex-1">
                <h5 className="text-xs sm:text-sm md:text-base font-semibold truncate text-zinc-800">
                  {name}
                </h5>
                <p className="text-[9px] sm:text-[10px] md:text-xs text-zinc-500">
                  Explore
                </p>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {canScrollRight && (
        <button
          onClick={() => handleManualScroll("right")}
          aria-label="Scroll Right"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center   !text-emerald-800 hover:scale-105 transition"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
