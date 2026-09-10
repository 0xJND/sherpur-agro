"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getGridSpanClass } from "@/app/hooks/gridHelpMaper";

const positionClasses: Record<string, { container: string; text: string }> = {
  "top-left": {
    container: "items-start justify-start text-left pt-3 sm:pt-6 md:pt-8",
    text: "items-start",
  },
  "top-center": {
    container: "items-start justify-center text-center pt-3 sm:pt-6 md:pt-8",
    text: "items-center",
  },
  "top-right": {
    container: "items-start justify-end text-right pt-3 sm:pt-6 md:pt-8",
    text: "items-end",
  },
  "middle-left": {
    container: "items-center justify-start text-left",
    text: "items-start",
  },
  center: {
    container: "items-center justify-center text-center",
    text: "items-center",
  },
  "middle-right": {
    container: "items-center justify-end text-right",
    text: "items-end",
  },
  "bottom-left": {
    container: "items-end justify-start text-left pb-3 sm:pb-6 md:pb-8",
    text: "items-start",
  },
  "bottom-center": {
    container: "items-end justify-center text-center pb-3 sm:pb-6 md:pb-8",
    text: "items-center",
  },
  "bottom-right": {
    container: "items-end justify-end text-right pb-3 sm:pb-6 md:pb-8",
    text: "items-end",
  },
};

export const HeroSlider = ({ slides = [] }: any) => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (slides.length <= 1 || isPaused) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [slides.length, isPaused, nextSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) nextSlide();
    else if (distance < -50) prevSlide();

    setTouchStart(null);
    setTouchEnd(null);
  };

  if (!slides || slides.length === 0) return null;

  const currentSlide = slides[current];
  const isCurrentDark = currentSlide?.theme === "dark";
  const navBgColor =
    currentSlide?.buttonBgColor ||
    (isCurrentDark ? "#0a0a0a" : "rgba(255, 255, 255, 0.25)");
  const navTextColor =
    currentSlide?.buttonTextColor || (isCurrentDark ? "#ffffff" : "#ffffff");

  return (
    <div
      className="relative w-full aspect-[1000/400] overflow-hidden select-none bg-black rounded-md shadow-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
    >
      {slides.map((slide: any, index: number) => {
        const isActive = index === current;
        const isDark = slide.theme === "dark";
        const pos =
          positionClasses[slide.position || "middle-left"] ||
          positionClasses["middle-left"];
        const bgUrl = slide.backgroundImageUrl;

        return (
          <div
            key={slide._key || index}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
              isActive
                ? "opacity-100 z-10"
                : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            {slide.slideLink && (
              <Link
                href={slide.slideLink}
                className="absolute inset-0 z-10 block"
                aria-label={slide.title || "Slide redirect"}
              />
            )}

            {bgUrl && (
              <Image
                src={bgUrl}
                alt={slide.title || "Slide Image"}
                fill
                priority={index === 0}
                className="object-cover object-center absolute inset-0"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            )}

            {slide.contentType !== "none" && slide?.title && (
              <div
                className={`relative z-20 h-full w-full flex px-4 sm:px-8 md:px-12 pointer-events-none ${pos.container}`}
              >
                <div
                  className={`relative overflow-hidden w-full max-w-xs sm:max-w-sm md:max-w-md backdrop-blur-md bg-black/20 flex flex-col p-3 sm:p-4 transition-all duration-300 pointer-events-auto rounded-none ${pos.text}`}
                >
                  <Image
                    src={bgUrl || ""}
                    alt={slide.title || "Slide Image"}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 1480px) 100vw, 1480px"
                    className="object-cover object-center absolute inset-0 scale-[1] blur-[100px]"
                  />
                  <div className="z-50">
                    {slide.contentType === "text" && (
                      <>
                        {slide.title && (
                          <h2
                            style={{
                              color:
                                slide.titleColor ||
                                (isDark ? "#0a0a0a" : "#ffffff"),
                            }}
                            className="text-base sm:text-xl md:text-2xl font-bold tracking-tight leading-tight mb-1 transition-colors duration-200"
                          >
                            {slide.title}
                          </h2>
                        )}

                        {slide.description && (
                          <p
                            style={{
                              color:
                                slide.descColor ||
                                (isDark
                                  ? "#262626"
                                  : "rgba(255, 255, 255, 0.9)"),
                            }}
                            className="text-xs sm:text-sm font-medium mb-2 sm:mb-3 line-clamp-2 leading-relaxed transition-colors duration-200"
                          >
                            {slide.description}
                          </p>
                        )}

                        {slide.buttonText && (
                          <div>
                            <Link
                              href={slide.buttonLink || slide.slideLink || "#"}
                              onClick={(e) => e.stopPropagation()}
                              style={{
                                backgroundColor:
                                  slide.buttonBgColor ||
                                  (isDark
                                    ? "#0a0a0a"
                                    : "rgba(255, 255, 255, 0.25)"),
                                borderColor:
                                  slide.buttonBgColor ||
                                  (isDark
                                    ? "#0a0a0a"
                                    : "rgba(255, 255, 255, 0.4)"),
                                color: slide.buttonTextColor || "#ffffff",
                                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                              }}
                              className="inline-flex items-center justify-center gap-1 px-3 py-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-none border transition-all duration-200 hover:brightness-110 active:scale-95"
                            >
                              <span>{slide.buttonText}</span>
                              <ChevronRight
                                className="h-3.5 w-3.5"
                                strokeWidth={2.5}
                              />
                            </Link>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {slides.length > 1 && (
        <>
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-20 md:w-24 lg:w-28 z-30 flex items-center justify-start group/left pointer-events-auto">
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
              style={{
                backgroundColor: navBgColor,
                color: navTextColor,
                borderColor: navBgColor,
              }}
              aria-label="Previous Slide"
              className="w-5 h-9 md:w-6 md:h-10 lg:w-7 lg:h-12 flex items-center justify-center rounded-none opacity-0 group-hover/left:opacity-100 transition-all duration-200 border-r border-t border-b hover:brightness-110 active:scale-95 shadow-sm"
            >
              <ChevronLeft
                className="w-4 h-4 md:w-4.5 md:h-4.5 lg:w-5 lg:h-5"
                strokeWidth={2.5}
              />
            </button>
          </div>

          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-20 md:w-24 lg:w-28 z-30 flex items-center justify-end group/right pointer-events-auto">
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
              style={{
                backgroundColor: navBgColor,
                color: navTextColor,
                borderColor: navBgColor,
              }}
              aria-label="Next Slide"
              className="w-5 h-9 md:w-6 md:h-10 lg:w-7 lg:h-12 flex items-center justify-center rounded-none opacity-0 group-hover/right:opacity-100 transition-all duration-200 border-l border-t border-b hover:brightness-110 active:scale-95 shadow-sm"
            >
              <ChevronRight
                className="w-4 h-4 md:w-4.5 md:h-4.5 lg:w-5 lg:h-5"
                strokeWidth={2.5}
              />
            </button>
          </div>

          <div
            style={{
              borderColor: "rgba(255, 255, 255, 0.2)",
            }}
            className="absolute bottom-2.5 sm:bottom-3.5 right-3 sm:right-5 z-30 flex items-center space-x-1.5 px-2 py-1 rounded-none border bg-black/30 backdrop-blur-md"
          >
            {slides.map((_: any, dotIndex: number) => {
              const isSelected = dotIndex === current;
              return (
                <button
                  key={dotIndex}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrent(dotIndex);
                  }}
                  style={{
                    backgroundColor: isSelected ? navBgColor : undefined,
                  }}
                  className={`h-1.5 transition-all duration-200 rounded-none ${
                    isSelected
                      ? "w-5 md:w-6"
                      : "w-2 md:w-2.5 bg-white/40 hover:bg-white/80"
                  }`}
                  aria-label={`Go to slide ${dotIndex + 1}`}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export const HeroBanner = ({ topBanner, bottomBanners = [] }: any) => {
  return (
    <div className="w-full h-full flex flex-col justify-between gap-3 lg:gap-4">
      {topBanner?.imageUrl && (
        <Link
          href={topBanner.link || "#"}
          className="relative w-full aspect-[700/190] overflow-hidden block rounded-none"
        >
          <Image
            src={topBanner.imageUrl}
            alt={topBanner.alt || "Top Banner"}
            fill
            className="object-cover object-center rounded-md"
            sizes="(max-width: 1024px) 100vw, 40vw"
            priority
          />
        </Link>
      )}

      {bottomBanners.length > 0 && (
        <div
          className={`grid gap-3 lg:gap-4 w-full ${
            bottomBanners.length > 1 ? "grid-cols-2" : "grid-cols-1"
          }`}
        >
          {bottomBanners.map((banner: any, idx: number) => {
            if (!banner?.imageUrl) return null;
            return (
              <Link
                key={banner._key || idx}
                href={banner.link || "#"}
                className="relative w-full aspect-[342/190] overflow-hidden block rounded-none"
              >
                <Image
                  src={banner.imageUrl}
                  alt={banner.alt || `Promo ${idx + 1}`}
                  fill
                  className="object-cover object-center rounded-md"
                  sizes="(max-width: 1024px) 50vw, 20vw"
                />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

const components: Record<string, React.ComponentType<any>> = {
  heroSliderWidget: HeroSlider,
  heroBannerWidget: HeroBanner,
};

export default function RenderWidget({ data }: { data: any }) {
  if (!data?._type) return null;
  const Component = components[data._type];
  if (!Component) return null;

  const spanClasses = getGridSpanClass(
    data.gridColsMobile,
    data.gridColsDesktop,
  );

  return (
    <div className={`${spanClasses} w-full flex flex-col self-stretch`}>
      <Component {...data} />
    </div>
  );
}
