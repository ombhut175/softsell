'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import WhyChooseUs from '@/components/WhyChooseUs';
import Testimonials from '@/components/Testimonials';
import ContactForm from '@/components/ContactForm';
import LoadingSpinner from '@/components/LoadingSpinner';
import ChatWidget from '@/components/ChatWidget';
import { motion } from 'framer-motion';

export default function Home() {
  const [isMutating, setIsMutating] = useState(true);

  useEffect(() => {
    setIsMutating(false);
  }, []);

  if (isMutating) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      
      {/* Main content */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Hero />
        <HowItWorks />
        <WhyChooseUs />
        <Testimonials />
        <ContactForm />
      </motion.main>
      
      {/* Footer */}
      <footer className="py-6 text-center text-gray-500 dark:text-gray-400 text-sm">
        <div className="container mx-auto px-4">
          <p>© {new Date().getFullYear()} SoftSell. All rights reserved.</p>
        </div>
      </footer>

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  );
}
