import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-muted text-muted-foreground py-6 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-4">
        <p className="text-base high-contrast:text-foreground">
          © 2025 BIPOCA AI. All rights reserved.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="/privacy" className="hover:underline text-foreground high-contrast:text-foreground" aria-label="Privacy Policy">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:underline text-foreground high-contrast:text-foreground" aria-label="Terms of Service">
            Terms of Service
          </Link>
          <Link href="/accessibility" className="hover:underline text-foreground high-contrast:text-foreground" aria-label="Accessibility">
            Accessibility
          </Link>
        </div>
      </div>
    </footer>
  );
}