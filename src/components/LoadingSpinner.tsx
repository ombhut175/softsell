'use client';

import { motion } from 'framer-motion';

export default function LoadingSpinner() {
  return (
    <div className="min-h-[200px] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <motion.div
          className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-gray-600 dark:text-gray-300 font-medium"
        >
          Loading...
        </motion.p>
      </div>
    </div>
  );
} 