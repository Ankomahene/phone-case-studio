'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { EditorCanvas } from './EditorCanvas';
import { EditorSidebar } from './EditorSidebar';
import { EditorHeader } from './EditorHeader';
import { EditorTools } from './EditorTools';
import { EditorProvider } from '@/contexts/EditorContext';

export const PhoneCaseEditor = () => {
  const [activeTab, setActiveTab] = useState<
    'design' | 'customize' | 'preview'
  >('design');

  return (
    <EditorProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <EditorHeader />
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-[300px_1fr] gap-8">
            <EditorSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8"
            >
              <EditorCanvas />
              <EditorTools />
            </motion.div>
          </div>
        </div>
      </div>
    </EditorProvider>
  );
};
