"use client";
import React from "react";
import { SquigglyText } from "./ui/squiggly-text";

export const HeroTitle = () => {
  return (
    <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold mb-8 leading-[1.1] tracking-tight text-stone-900 dark:text-white flex flex-col items-center">
      <SquigglyText 
        stepDuration={40} 
        scale={[10, 15]} 
        className="text-amber-500 py-2"
      >
        Suarakan Perubahan,
      </SquigglyText>
      <span className="text-stone-900 dark:text-white">
        Bangun Kota Masa Depan
      </span>
    </h1>
  );
};
