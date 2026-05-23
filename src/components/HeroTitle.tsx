"use client";
import React from "react";
import { SquigglyText } from "./ui/squiggly-text";

export const HeroTitle = () => {
  return (
    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold mb-8 leading-[1.05] tracking-tight text-stone-900 dark:text-white flex flex-col items-center gap-1">
      <span className="text-stone-900 dark:text-white">
        Suarakan Perubahan,
      </span>
      <SquigglyText 
        stepDuration={50} 
        scale={[6, 10]} 
        className="text-stone-500 dark:text-stone-400 py-1"
      >
        Bangun Kota Masa Depan
      </SquigglyText>
    </h1>
  );
};
