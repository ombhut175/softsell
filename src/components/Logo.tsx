'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        {/* Logo circle background */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
          {/* Letter S */}
          <span className="text-white text-xl font-bold">S</span>
        </div>
        {/* Decorative dot */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-400 border-2 border-white dark:border-gray-900"
        />
      </motion.div>
      <motion.span
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-xl font-bold text-gray-900 dark:text-white"
      >
        SoftSell
      </motion.span>
    </Link>
  );
} 