import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export const Logo = () => {
  return (
    <Link href="/">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
      >
        CaseCanvas
      </motion.div>
    </Link>
  );
};
