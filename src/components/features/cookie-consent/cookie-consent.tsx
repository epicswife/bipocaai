"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setIsVisible(true);
  }, []);

  if (!isMounted || !isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:max-w-md mx-auto bg-card border border-primary dark:border-secondary visionease:border-primary high-contrast:border-primary rounded-lg p-4 shadow-glow z-50 glassmorphism">
      <p className="text-foreground text-sm sm:text-base">
        We use cookies to improve your experience. Accept to continue.
      </p>
      <div className="mt-2 flex justify-end gap-2">
        <Button
          variant="ghost"
          onClick={() => setIsVisible(false)}
          className="text-muted-foreground hover:text-secondary dark:text-muted-foreground dark:hover:text-primary visionease:text-muted-foreground visionease:hover:text-primary high-contrast:text-muted-foreground high-contrast:hover:text-primary text-sm"
        >
          Decline
        </Button>
        <Button
          onClick={() => setIsVisible(false)}
          className="bg-primary hover:bg-secondary dark:bg-secondary dark:hover:bg-primary visionease:bg-primary visionease:hover:bg-secondary high-contrast:bg-primary high-contrast:hover:bg-primary text-primary-foreground text-sm"
        >
          Accept
        </Button>
      </div>
    </div>
  );
}