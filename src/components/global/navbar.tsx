"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { ModeToggle } from "./mode-toggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const navItems = [
    { href: "/about", label: "About" },
    { href: "/courses", label: "Courses" },
    { href: "/login", label: "Log In", variant: "ghost" as const },
    { href: "/signup", label: "Sign Up", variant: "default" as const },
  ];

  if (!isMounted) return null;

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center space-x-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <span className="text-xl font-orbitron font-bold text-foreground">BIPOCA AI</span>
        </Link>
        <div className="hidden md:flex items-center space-x-4">
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant={item.variant || "ghost"}
              asChild
              className="text-base"
            >
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
          <ModeToggle />
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Open menu">
              {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <SheetClose asChild key={item.href}>
                  <Button
                    variant={item.variant || "ghost"}
                    asChild
                    className="w-full justify-start text-base"
                  >
                    <Link href={item.href}>{item.label}</Link>
                  </Button>
                </SheetClose>
              ))}
              <ModeToggle />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}