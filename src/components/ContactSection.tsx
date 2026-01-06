'use client';

import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import Link from 'next/link';

export default function ContactSection() {
  const { ref: containerRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section id="contact" className="py-20 sm:py-24 md:py-32 lg:py-40 bg-black" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="text-center">
          {/* Main Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-montserrat font-extrabold text-white mb-8 sm:mb-10 md:mb-12 leading-tight"
          >
            VSTUPTE S NÁMI DO SVĚTA
            <br />
            <span className="text-yellow-400">GAMINGU A E-SPORTU</span>
          </motion.h2>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Link href="/kontakt">
              <motion.button
                className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 rounded-lg font-montserrat font-bold text-base sm:text-lg md:text-xl uppercase transition-all shadow-2xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Kontaktujte nás
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}