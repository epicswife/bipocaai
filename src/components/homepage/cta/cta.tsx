"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-green-yellow dark:bg-gradient-green-yellow text-center">
      <h2 className="text-3xl sm:text-4xl font-orbitron font-bold text-black dark:text-white mb-4">
        Ready to Transform Education?
      </h2>
      <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
        Join BIPOCA AI today and empower learners worldwide with accessible, inclusive education.
      </p>
      <Link href="/signup">
        <Button
          className="px-8 py-4 text-lg font-semibold rounded-lg bg-yellow-300 text-black hover:bg-green-300 dark:bg-yellow-300 dark:hover:bg-green-300 shadow-glow"
          aria-label="Get Started Now"
        >
          Get Started Now
        </Button>
      </Link>
    </section>
  );
}