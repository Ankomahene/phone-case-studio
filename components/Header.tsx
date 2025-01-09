'use client';

// import React from 'react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import Link from 'next/link';
import { motion } from 'framer-motion';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-sm bg-white/75 dark:bg-gray-950/75 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        >
          CaseCanvas
        </motion.div>
        <div className="flex items-center gap-4">
          <Link
            href="/editor"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity"
          >
            Start Designing
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
