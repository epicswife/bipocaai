"use client";

import HeroSection from "@/components/homepage/hero-section/hero-section";
import FeaturedLessonSection from "@/components/homepage/featured-lesson-section/featured-lesson-section";
import RoleBasedSections from "@/components/homepage/role-based-sections/role-based-sections";
import CookieConsent from "@/components/features/cookie-consent/cookie-consent";

export default function HomePage() {
  return (
    <div className="flex flex-col bg-gray-100 dark:bg-gray-900">
      <HeroSection />
      <FeaturedLessonSection />
      <RoleBasedSections />
      <CookieConsent />
    </div>
  );
}