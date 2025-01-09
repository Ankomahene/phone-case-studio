import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { HowItWorks } from '@/components/HowItWorks';
import { PhoneCaseSelector } from '@/components/PhoneCaseSelector';
import React from 'react';
const HomePage = () => {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <Header />
      <Hero />
      <HowItWorks />
      <PhoneCaseSelector />
    </main>
  );
};

export default HomePage;
