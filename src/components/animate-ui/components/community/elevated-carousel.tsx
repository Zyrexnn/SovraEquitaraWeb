'use client';

import React, { useState, useRef, useEffect, startTransition } from "react";
import { motion, useMotionValue, animate } from "framer-motion";

export interface CarouselItem {
  id: string | number;
  image: string;
  title: string;
  category: string;
  status: string;
  votes: number;
  time: string;
  location: string;
}

interface ElevatedCarouselProps {
  items: CarouselItem[];
  cardWidth?: number;
  cardHeight?: number;
  cardGap?: number;
  elevationOffset?: number;
  onCardClick?: (index: number) => void;
  onVoteClick?: (item: CarouselItem) => void;
}

export function ElevatedCarousel({
  items = [],
  cardWidth = 320,
  cardHeight = 400,
  cardGap = 24,
  elevationOffset = 60,
  onCardClick,
  onVoteClick
}: ElevatedCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(() => Math.floor(items.length / 2));
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  
  const cardTotalWidth = cardWidth + (cardGap || 0);
  const centerOffset = containerWidth > 0 ? (containerWidth / 2 - cardWidth / 2) : 0;

  useEffect(() => {
    if (!containerRef.current) return;
    
    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        setContainerWidth(entries[0].contentRect.width);
      }
    });
    
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (containerWidth === 0) return;
    const targetX = -activeIndex * cardTotalWidth + centerOffset;
    animate(x, targetX, { type: "spring", stiffness: 300, damping: 30 });
  }, [activeIndex, cardTotalWidth, centerOffset, containerWidth, x]);

  const handlePrevious = () => {
    if (activeIndex > 0) {
      startTransition(() => setActiveIndex(activeIndex - 1));
    }
  };

  const handleNext = () => {
    if (activeIndex < items.length - 1) {
      startTransition(() => setActiveIndex(activeIndex + 1));
    }
  };

  const handleDragEnd = () => {
    const currentX = x.get();
    const newIndex = Math.round((-currentX + centerOffset) / cardTotalWidth);
    const clampedIndex = Math.max(0, Math.min(items.length - 1, newIndex));
    startTransition(() => {
      setActiveIndex(clampedIndex);
      setIsDragging(false);
    });
  };

  const handleCardClick = (index: number) => {
    if (!isDragging && index !== activeIndex) {
      startTransition(() => setActiveIndex(index));
    }
    if (onCardClick && !isDragging) {
      onCardClick(index);
    }
  };

  return (
    <div className="w-full flex flex-col overflow-hidden relative pb-12">
      {/* Container holding the carousel tracks */}
      <div ref={containerRef} className="w-full relative overflow-hidden flex items-start min-h-[660px] pt-12 pb-12">
        <motion.div
          drag="x"
          dragConstraints={{
            left: containerWidth > 0 ? centerOffset - (items.length - 1) * cardTotalWidth : 0,
            right: centerOffset
          }}
          dragElastic={0.1}
          onDragStart={() => startTransition(() => setIsDragging(true))}
          onDragEnd={handleDragEnd}
          style={{ display: "flex", gap: cardGap, x, cursor: isDragging ? "grabbing" : "grab" }}
          className="items-center"
        >
          <div className="flex" style={{ gap: cardGap }}>
            {items.map((item, index) => {
              const isActive = index === activeIndex;
              
              return (
                <motion.div
                  key={index}
                  onClick={() => handleCardClick(index)}
                  style={{ width: cardWidth, flexShrink: 0, cursor: "pointer", position: "relative" }}
                >
                  <motion.div
                    animate={{ 
                      y: isActive ? -elevationOffset : 0, 
                      scale: isActive ? 1 : 0.9, 
                      opacity: isActive ? 1 : 0.4 
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    style={{ width: "100%", height: cardHeight, zIndex: 2 }}
                    className="rounded-3xl overflow-hidden relative bg-stone-100 dark:bg-stone-900 shadow-xl border border-stone-200/50 dark:border-white/10"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover", pointerEvents: "none", userSelect: "none" }}
                      draggable={false}
                    />
                    {/* Category Tag */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 bg-black/60 backdrop-blur-md text-white text-[11px] font-bold rounded-full border border-white/20 uppercase tracking-wider">
                        {item.category}
                      </span>
                    </div>
                    {/* Status Tag */}
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1.5 backdrop-blur-md text-[11px] font-bold rounded-full border uppercase tracking-wider ${
                        item.status === 'selesai' ? 'bg-emerald-500/80 text-white border-emerald-400/50' : 
                        item.status === 'proses' ? 'bg-blue-500/80 text-white border-blue-400/50' : 
                        'bg-amber-500/80 text-white border-amber-400/50'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  </motion.div>

                  {/* Content Below */}
                  <div 
                    className={`absolute left-0 w-full flex flex-col pt-6 z-10 pointer-events-none transition-all duration-500 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                    style={{ top: cardHeight }}
                  >
                    <h3 className="text-xl font-bold text-stone-900 dark:text-white mb-2 line-clamp-2">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm font-medium text-stone-500 dark:text-stone-400 mb-4">
                      <div className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        <span className="truncate max-w-[120px]">{item.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>{item.time}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pointer-events-auto">
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                          {[1,2,3].map((i) => (
                            <div key={i} className="w-7 h-7 rounded-full bg-stone-200 border-2 border-white dark:border-stone-900 overflow-hidden">
                              <img src={`https://i.pravatar.cc/100?img=${i * (Number(item.id) || 1)}`} alt="User" />
                            </div>
                          ))}
                        </div>
                        <span className="text-xs font-bold text-stone-600 dark:text-stone-400">+{item.votes}</span>
                      </div>
                      
                      <button 
                        onClick={(e) => { e.stopPropagation(); onVoteClick && onVoteClick(item); }}
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-stone-100 dark:bg-white/10 hover:bg-stone-200 dark:hover:bg-white/20 transition-colors"
                      >
                        <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg>
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center gap-4 pointer-events-auto relative z-20">
        <button
          onClick={handlePrevious}
          disabled={activeIndex === 0}
          className="w-12 h-12 rounded-full border border-stone-200 dark:border-white/10 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-stone-100 dark:hover:bg-white/5 transition-colors text-stone-600 dark:text-stone-300"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <div className="flex gap-2">
          {items.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-2 rounded-full transition-all duration-300 ${idx === activeIndex ? 'w-6 bg-amber-500' : 'w-2 bg-stone-300 dark:bg-stone-700'}`} 
            />
          ))}
        </div>
        <button
          onClick={handleNext}
          disabled={activeIndex === items.length - 1}
          className="w-12 h-12 rounded-full border border-stone-200 dark:border-white/10 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-stone-100 dark:hover:bg-white/5 transition-colors text-stone-600 dark:text-stone-300"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>
  );
}
