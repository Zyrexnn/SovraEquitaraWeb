'use client';

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import type { EmblaOptionsType } from 'embla-carousel';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../../../lib/utils';

interface MotionCarouselProps {
  slides: any[];
  options?: EmblaOptionsType;
  renderSlide?: (slide: any, index: number) => React.ReactNode;
}

export const MotionCarousel: React.FC<MotionCarouselProps> = ({ slides, options, renderSlide }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative max-w-[100vw] sm:max-w-7xl mx-auto px-4 sm:px-12">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y -ml-4 py-8">
          {slides.map((slide, index) => {
            const isActive = index === selectedIndex;
            return (
              <motion.div
                key={index}
                className="flex-[0_0_85%] sm:flex-[0_0_50%] md:flex-[0_0_33.333%] min-w-0 pl-4"
                initial={{ opacity: 0.5, scale: 0.9, y: 20 }}
                animate={{ 
                  opacity: isActive ? 1 : 0.6, 
                  scale: isActive ? 1 : 0.95,
                  y: isActive ? 0 : 10
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {renderSlide ? renderSlide(slide, index) : (
                  <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 h-full shadow-sm">
                    Slide {index + 1}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
      
      <button
        onClick={scrollPrev}
        disabled={prevBtnDisabled}
        className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center bg-white/90 dark:bg-stone-900/90 backdrop-blur-sm border border-stone-200 dark:border-white/10 rounded-full shadow-lg disabled:opacity-0 disabled:cursor-not-allowed hover:bg-stone-50 dark:hover:bg-stone-800 transition-all z-10 hover:scale-110 active:scale-95"
      >
        <ChevronLeft className="w-6 h-6 text-stone-800 dark:text-stone-200" />
      </button>
      
      <button
        onClick={scrollNext}
        disabled={nextBtnDisabled}
        className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center bg-white/90 dark:bg-stone-900/90 backdrop-blur-sm border border-stone-200 dark:border-white/10 rounded-full shadow-lg disabled:opacity-0 disabled:cursor-not-allowed hover:bg-stone-50 dark:hover:bg-stone-800 transition-all z-10 hover:scale-110 active:scale-95"
      >
        <ChevronRight className="w-6 h-6 text-stone-800 dark:text-stone-200" />
      </button>

      <div className="flex justify-center gap-3 mt-4">
        {slides.map((_, index) => (
          <button
            key={index}
            className={cn(
              "h-2 rounded-full transition-all duration-500",
              index === selectedIndex 
                ? "bg-amber-500 w-8" 
                : "bg-stone-300 dark:bg-stone-700 w-2 hover:bg-stone-400 dark:hover:bg-stone-600"
            )}
            onClick={() => emblaApi?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
