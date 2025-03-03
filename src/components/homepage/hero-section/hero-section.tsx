"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      className="py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center relative bg-gradient-amber-gold dark:bg-gradient-amber-gold"
    >
      <motion.div
        className="max-w-7xl mx-auto transition-opacity duration-1000"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-orbitron font-bold text-black dark:text-white mb-6">
          Education Without Barriers
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl text-gray-700 dark:text-gray-300 mb-10 max-w-3xl mx-auto">
          Join millions using BIPOCA AI to achieve their educational goals.
        </p>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          <Link href="/signup?role=teacher">
            <Button
              variant="default"
              className="px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold rounded-lg bg-amber-400 text-black hover:bg-gold-300 dark:bg-amber-600 dark:hover:bg-gold-500 shadow-glow"
              aria-label="Join as a Teacher"
            >
              I’m a Teacher
            </Button>
          </Link>
          <Link href="/signup?role=student">
            <Button
              variant="default"
              className="px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold rounded-lg bg-amber-400 text-black hover:bg-gold-300 dark:bg-amber-600 dark:hover:bg-gold-500 shadow-glow"
              aria-label="Join as a Student"
            >
              I’m a Student
            </Button>
          </Link>
          <Link href="/signup?role=parent">
            <Button
              variant="default"
              className="px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold rounded-lg bg-amber-400 text-black hover:bg-gold-300 dark:bg-amber-600 dark:hover:bg-gold-500 shadow-glow"
              aria-label="Join as a Parent"
            >
              I’m a Parent
            </Button>
          </Link>
          <Link href="/signup?role=district">
            <Button
              variant="default"
              className="px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold rounded-lg bg-amber-400 text-black hover:bg-gold-300 dark:bg-amber-600 dark:hover:bg-gold-500 shadow-glow"
              aria-label="District Sign Up"
            >
              District Sign Up
            </Button>
          </Link>
        </div>
      </motion.div>
      <svg
        className="absolute bottom-0 left-0 w-full h-24 text-gray-100 dark:text-gray-900 dark:fill-current"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
      >
        <path d="M0 100 C360 50 1080 50 1440 100 L1440 100 L0 100 Z" fill="currentColor" />
      </svg>
    </section>
  );
}