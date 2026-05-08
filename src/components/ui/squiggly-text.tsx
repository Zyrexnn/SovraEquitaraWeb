"use client";
import React, { useId, useEffect, useState } from "react";
import { motion, useTime, useTransform } from "framer-motion";
import { cn } from "../../lib/utils";

export const SquigglyText = ({
  children,
  className,
  stepDuration = 50,
  scale = [8, 12],
}: {
  children: React.ReactNode;
  className?: string;
  stepDuration?: number;
  scale?: [number, number];
}) => {
  const id = useId();
  // Ensure the ID is safe for SVG filters and consistent
  const safeId = `sq-${id.replace(/[^a-zA-Z0-9]/g, "")}`;
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const time = useTime();
  // Cycle through 0, 1, 2, 3, 4 based on time
  const filterIndex = useTransform(time, (t) => {
    return Math.floor(t / stepDuration) % 5;
  });

  // Since we can't use useTransform directly in the style object for a string like url(),
  // we use a small hack or just animate the index. 
  // Actually, framer-motion handles string arrays in animate prop better.
  
  if (!isMounted) return <span className={className}>{children}</span>;

  return (
    <span className={cn("relative inline-block", className)}>
      <motion.span
        style={{
          display: "inline-block",
        }}
        animate={{
          filter: [
            `url(#${safeId}-0)`,
            `url(#${safeId}-1)`,
            `url(#${safeId}-2)`,
            `url(#${safeId}-3)`,
            `url(#${safeId}-4)`,
          ],
        }}
        transition={{
          duration: (stepDuration * 5) / 1000,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {children}
      </motion.span>

      <svg
        aria-hidden="true"
        style={{
          position: "absolute",
          width: 0,
          height: 0,
          pointerEvents: "none",
        }}
      >
        <defs>
          {[0, 1, 2, 3, 4].map((i) => (
            <filter key={i} id={`${safeId}-${i}`} colorInterpolationFilters="sRGB">
              <feTurbulence
                type="turbulence"
                baseFrequency="0.05"
                numOctaves="2"
                result="noise"
                seed={i * 10}
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale={i % 2 === 0 ? scale[0] : scale[1]}
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          ))}
        </defs>
      </svg>
    </span>
  );
};
