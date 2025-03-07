"use client";

import React from "react";
import { useTheme } from "next-themes";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingProps {
  text?: string;
  size?: "small" | "medium" | "large";
  fullScreen?: boolean;
  className?: string;
}

export function Loading({
  text = "Loading...",
  size = "medium",
  fullScreen = false,
  className,
}: LoadingProps) {
  const { theme } = useTheme();
  
  // Size mappings for the spinner
  const sizeMap = {
    small: "h-4 w-4",
    medium: "h-8 w-8",
    large: "h-12 w-12",
  };

  // Determine text size based on spinner size
  const textSizeMap = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
  };

  // Determine color based on theme
  const getSpinnerColor = () => {
    switch (theme) {
      case "dark":
        return "text-primary";
      case "high-contrast":
        return "text-black dark:text-white";
      case "visionease":
        return "text-primary"; // Blue is colorblind-friendly
      default:
        return "text-primary";
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3",
        fullScreen && "fixed inset-0 bg-background/80 backdrop-blur-sm z-50",
        className
      )}
      role="status"
      aria-live="polite"
    >
      <Loader2
        className={cn(
          "animate-spin",
          sizeMap[size],
          getSpinnerColor()
        )}
      />
      {text && (
        <p className={cn(
          textSizeMap[size], 
          "font-medium text-foreground"
        )}>
          {text}
        </p>
      )}
      <span className="sr-only">{text || "Loading"}</span>
    </div>
  );
}

export default Loading;