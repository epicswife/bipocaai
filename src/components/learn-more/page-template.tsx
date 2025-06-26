"use client";

import React from 'react';

import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface PageTemplateProps {
  title: string;
  description: string;
  children: React.ReactNode;
  breadcrumbs?: {
    label: string;
    href: string;
  }[];
}

export const PageTemplate: React.FC<PageTemplateProps> = ({
  title,
  description,
  children,
  breadcrumbs = []
}) => {
  const pathname = usePathname();
  
  // Generate breadcrumbs if not provided
  const generatedBreadcrumbs = React.useMemo(() => {
    if (breadcrumbs.length > 0) return breadcrumbs;
    
    const paths = pathname.split('/').filter(Boolean);
    return paths.map((path, index) => {
      const href = `/${paths.slice(0, index + 1).join('/')}`;
      return {
        label: path.split('-').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' '),
        href
      };
    });
  }, [pathname, breadcrumbs]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Breadcrumb navigation */}
      <nav className="flex mb-6 text-sm">
        <ol className="flex items-center space-x-1">
          <li>
            <Link href="/" className="text-[var(--color-pan-amber)] hover:text-[var(--color-pan-green)] transition-colors duration-200">
              Home
            </Link>
          </li>
          {generatedBreadcrumbs.map((crumb, index) => (
            <React.Fragment key={crumb.href}>
              <li className="flex items-center">
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </li>
              <li>
                {index === generatedBreadcrumbs.length - 1 ? (
                  <span className="text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] font-medium">
                    {crumb.label}
                  </span>
                ) : (
                  <Link 
                    href={crumb.href}
                    className="text-[var(--color-pan-amber)] hover:text-[var(--color-pan-green)] transition-colors duration-200"
                  >
                    {crumb.label}
                  </Link>
                )}
              </li>
            </React.Fragment>
          ))}
        </ol>
      </nav>

      {/* Page header */}
      <header className="mb-12">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[var(--color-pan-green)] to-[var(--color-pan-amber)] bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h1>
        <motion.p 
          className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {description}
        </motion.p>
      </header>

      {/* Main content */}
      <motion.main 
        className="min-h-[50vh]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {children}
      </motion.main>
    </div>
  );
};
