'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section className="py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <h1 className="text-5xl font-bold leading-tight">
              Transform Your Phone into a{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Masterpiece
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Design your perfect phone case with our intuitive editor. Express
              yourself with custom artwork, photos, or choose from our curated
              collection of designs.
            </p>
            <div className="flex gap-4">
              <Link
                href="/editor"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity inline-block"
              >
                Start Creating
              </Link>
              <Link
                href="#how-it-works"
                className="text-gray-700 dark:text-gray-200 px-8 py-3 rounded-full border border-gray-300 dark:border-gray-700 hover:border-blue-600 dark:hover:border-blue-500 transition-colors inline-block"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <div className="relative w-full h-[600px]">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-3xl" />
              <Image
                src="/images/phone-case.svg"
                alt="Phone Case Design Preview"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-3xl rounded-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
