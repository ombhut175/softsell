'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import LoadingSpinner from './LoadingSpinner';

const testimonials = [
  {
    content: "SoftSell made selling our unused Microsoft licenses incredibly easy. The process was smooth, and we received payment within hours. Highly recommended!",
    author: {
      name: "Sarah Johnson",
      role: "IT Director",
      company: "TechCorp Solutions",
      image: "/testimonials/sarah.jpg"
    }
  },
  {
    content: "As a software reseller, I've tried many platforms, but SoftSell stands out with its fair pricing and excellent customer support. The best in the market!",
    author: {
      name: "Michael Chen",
      role: "CEO",
      company: "Digital Assets Inc",
      image: "/testimonials/michael.jpg"
    }
  }
];

export default function Testimonials() {
  const [isMutating, setIsMutating] = useState(true);

  useEffect(() => {
    setIsMutating(false);
  }, []);

  if (isMutating) {
    return <LoadingSpinner />;
  }

  return (
    <section id="testimonials" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Customers</span> Say
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Trusted by software companies and resellers worldwide
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                {/* Quote icon */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>

                {/* Testimonial content */}
                <p className="text-gray-600 dark:text-gray-300 mb-6 relative z-10">
                  {testimonial.content}
                </p>

                {/* Author info */}
                <div className="flex items-center">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4 bg-gray-200 dark:bg-gray-700">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-gray-900 dark:text-white font-semibold">
                      {testimonial.author.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.author.role} at {testimonial.author.company}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 