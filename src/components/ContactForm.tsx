'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingSpinner from './LoadingSpinner';

const licenseTypes = [
  "Microsoft Office",
  "Adobe Creative Cloud",
  "Windows Server",
  "Microsoft 365",
  "Other"
];

const validateName = (name: string): string | null => {
  if (!name.trim()) return 'Name is required';
  if (name.length < 2) return 'Name must be at least 2 characters';
  if (name.length > 50) return 'Name must be less than 50 characters';
  if (!/^[a-zA-Z\s\-']+$/.test(name)) return 'Name can only contain letters, spaces, hyphens, and apostrophes';
  return null;
};

export default function ContactForm() {
  const [isMutating, setIsMutating] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    licenseType: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setIsMutating(false);
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Name validation
    const nameError = validateName(formData.name);
    if (nameError) newErrors.name = nameError;
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    // Company validation
    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    } else if (formData.company.length < 2) {
      newErrors.company = 'Company name must be at least 2 characters';
    }
    
    // License type validation
    if (!formData.licenseType) {
      newErrors.licenseType = 'Please select a license type';
    }
    
    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    } else if (formData.message.length > 500) {
      newErrors.message = 'Message must be less than 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched when submitting
    const allTouched = Object.keys(formData).reduce((acc, key) => ({
      ...acc,
      [key]: true
    }), {});
    setTouched(allTouched);
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSubmitSuccess(true);
    setIsSubmitting(false);
    setFormData({
      name: '',
      email: '',
      company: '',
      licenseType: '',
      message: ''
    });
    setTouched({});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validate on change if field has been touched
    if (touched[name]) {
      if (name === 'name') {
        const nameError = validateName(value);
        setErrors(prev => ({
          ...prev,
          name: nameError || ''
        }));
      }
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    // Validate on blur
    if (name === 'name') {
      const nameError = validateName(formData.name);
      setErrors(prev => ({
        ...prev,
        name: nameError || ''
      }));
    }
  };

  if (isMutating) {
    return <LoadingSpinner />;
  }

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Touch</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Ready to sell your software licenses? Fill out the form below and we'll get back to you within 24 hours.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <AnimatePresence mode="wait">
            {submitSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-green-50 dark:bg-green-900/50 text-green-800 dark:text-green-200 p-6 rounded-2xl text-center"
              >
                <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
                <p>We've received your message and will get back to you soon.</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 ${
                        errors.name ? 'border-red-500 focus:border-red-500' : 'border-gray-300 dark:border-gray-600 focus:border-indigo-500'
                      } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50`}
                      placeholder="John Doe"
                    />
                    <AnimatePresence>
                      {errors.name && touched.name && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="mt-1 text-sm text-red-500"
                        >
                          {errors.name}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 ${
                        errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-300 dark:border-gray-600 focus:border-indigo-500'
                      } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50`}
                      placeholder="john@example.com"
                    />
                    <AnimatePresence>
                      {errors.email && touched.email && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="mt-1 text-sm text-red-500"
                        >
                          {errors.email}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 ${
                      errors.company ? 'border-red-500 focus:border-red-500' : 'border-gray-300 dark:border-gray-600 focus:border-indigo-500'
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50`}
                    placeholder="Your Company Name"
                  />
                  <AnimatePresence>
                    {errors.company && touched.company && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-1 text-sm text-red-500"
                      >
                        {errors.company}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div>
                  <label htmlFor="licenseType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    License Type
                  </label>
                  <select
                    id="licenseType"
                    name="licenseType"
                    value={formData.licenseType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 ${
                      errors.licenseType ? 'border-red-500 focus:border-red-500' : 'border-gray-300 dark:border-gray-600 focus:border-indigo-500'
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50`}
                  >
                    <option value="">Select a license type</option>
                    {licenseTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  <AnimatePresence>
                    {errors.licenseType && touched.licenseType && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-1 text-sm text-red-500"
                      >
                        {errors.licenseType}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={4}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 ${
                      errors.message ? 'border-red-500 focus:border-red-500' : 'border-gray-300 dark:border-gray-600 focus:border-indigo-500'
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50`}
                    placeholder="Tell us about your licenses..."
                  />
                  <AnimatePresence>
                    {errors.message && touched.message && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-1 text-sm text-red-500"
                      >
                        {errors.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 ${
                    isSubmitting 
                      ? 'opacity-75 cursor-not-allowed' 
                      : 'hover:bg-indigo-700 hover:shadow-lg active:shadow-md'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
} 