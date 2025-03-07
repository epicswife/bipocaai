"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  className?: string;
  quality?: number;
  onLoad?: () => void;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  sizes = "100vw",
  priority = false,
  className = "",
  quality = 85,
  onLoad,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={cn(
      "overflow-hidden",
      fill ? "relative w-full h-full" : "",
      className
    )}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        sizes={sizes}
        priority={priority}
        quality={quality}
        className={cn(
          "object-cover duration-700 ease-in-out",
          isLoading ? "scale-110 blur-lg" : "scale-100 blur-0"
        )}
        onLoad={() => {
          setIsLoading(false);
          onLoad?.();
        }}
      />
    </div>
  );
}
