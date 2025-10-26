'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const { ref: containerRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-950" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-start">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-montserrat font-extrabold text-white mb-4 sm:mb-6 leading-tight">
              Máte zájem o<br />
              spolupráci? Ozvěte<br />
              se nám
            </h2>
            <p className="text-sm sm:text-base text-gray-400 font-montserrat leading-relaxed">
              Naš tým se Vám věnuje a pomůže Vám s realizací Vaší vize. Kontaktujte nás bez jakýchkoliv závazků.
            </p>
          </motion.div>

          {/* Right: Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="space-y-4 sm:space-y-6"
          >
            {/* Name */}
            <div>
              <input
                type="text"
                name="name"
                placeholder="Jméno a příjmení*"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-gray-600 text-white font-montserrat placeholder-gray-500 text-sm sm:text-base py-3 focus:outline-none focus:border-yellow-400 transition-colors"
                required
              />
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="E-mail*"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-gray-600 text-white font-montserrat placeholder-gray-500 text-sm sm:text-base py-3 focus:outline-none focus:border-yellow-400 transition-colors"
                required
              />
            </div>

            {/* Subject */}
            <div>
              <input
                type="text"
                name="subject"
                placeholder="Předmět*"
                value={formData.subject}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-gray-600 text-white font-montserrat placeholder-gray-500 text-sm sm:text-base py-3 focus:outline-none focus:border-yellow-400 transition-colors"
                required
              />
            </div>

            {/* Message */}
            <div>
              <textarea
                name="message"
                placeholder="Zpráva"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full bg-transparent border-b border-gray-600 text-white font-montserrat placeholder-gray-500 py-3 focus:outline-none focus:border-yellow-400 transition-colors resize-none"
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 sm:px-8 py-3 rounded-lg font-montserrat font-bold text-sm sm:text-base uppercase transition-all mt-6 sm:mt-8"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Odeslat
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}