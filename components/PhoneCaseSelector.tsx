'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import React from 'react';

const phoneTypes = [
  {
    id: 1,
    name: 'Clear Case for iPhone®',
    models: 'iPhone 7/8 - iPhone 16 Pro Max',
    image: '/images/clear-iphone-case.png',
  },
  {
    id: 2,
    name: 'Clear Case for Samsung®',
    models: 'Samsung Galaxy S10 - Samsung Galaxy S24 Ultra',
    image: '/images/clear-samsung-case.png',
  },
  {
    id: 3,
    name: 'Tough Case for iPhone®',
    models: 'iPhone 11 - iPhone 16 Pro Max',
    image: '/images/tough-iphone-case.png',
  },
  {
    id: 4,
    name: 'Tough Case for Samsung®',
    models: 'Samsung Galaxy S10 - Samsung Galaxy S24 Ultra',
    image: '/images/tough-samsung-case.png',
  },
];

export const PhoneCaseSelector = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Select a phone case to get started
          </span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {phoneTypes.map((phone, index) => (
            <motion.div
              key={phone.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 hover:border-blue-600 dark:hover:border-purple-600"
            >
              <div className="relative w-full h-64 mb-4 group-hover:scale-105 transition-transform duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 rounded-lg" />
                <Image
                  src={phone.image}
                  alt={phone.name}
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold mb-2 dark:text-white">
                {phone.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                {phone.models}
              </p>
              <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg hover:opacity-90 transition-opacity">
                Choose
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
