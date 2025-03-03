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
    <div className="fixed bottom-4 left-4 right-4 sm:max-w-md mx-auto bg-gray-100 dark:bg-gray-900 border border-amber-400 dark:border-cyan-600 rounded-lg p-4 shadow-glow z-50">
      <p className="text-black dark:text-white text-sm sm:text-base">
        We use cookies to improve your experience. Accept to continue.
      </p>
      <div className="mt-2 flex justify-end gap-2">
        <Button
          variant="ghost"
          onClick={() => setIsVisible(false)}
          className="text-gray-700 dark:text-gray-300 hover:text-orange-400 text-sm"
        >
          Decline
        </Button>
        <Button
          onClick={() => setIsVisible(false)}
          className="bg-amber-400 text-black hover:bg-gold-300 dark:bg-amber-600 dark:hover:bg-gold-500 text-sm"
        >
          Accept
        </Button>
      </div>
    </div>
  );
}