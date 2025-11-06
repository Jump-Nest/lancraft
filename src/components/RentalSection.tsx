'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';

export default function RentalSection() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section id="rental" className="relative w-full h-[578px] md:h-[700px] overflow-hidden">
      {/* Background Image with Filter */}
      <div className="absolute inset-0 w-full md:w-[54%]">
        <Image
          src="/LC%20WEB%20podklady/4)%20pronajem%20techniky/1%20-%20pronajem%20techniky.jpg"
          alt="Pronájem techniky"
          fill
          sizes="(max-width: 768px) 100vw, 54vw"
          className="object-cover w-full h-full"
          style={{ filter: 'brightness(0.4) blur(2px)' }}
          priority
        />
      </div>

      {/* Mobile Dark Overlay */}
      <div 
        className="absolute inset-0 z-10 md:hidden"
        style={{
          background: 'rgba(0,0,0,0.45)'
        }}
      />

      {/* Desktop Gradient Overlay - 54% photo, 46% solid gray background */}
      <div 
        className="absolute inset-0 z-10 hidden md:block"
        style={{
          background: 'linear-gradient(to right, transparent 0%, transparent 35%, rgba(17,17,17,1) 54%, rgba(17,17,17,1) 100%)'
        }}
      />

      {/* Content Container */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
        className="relative z-20 h-full flex items-center justify-end w-full"
      >
        <div className="w-full md:w-1/2 px-6 sm:px-8 md:px-12">
          <div className="max-w-2xl text-left">
            {/* Title */}
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-montserrat font-bold text-white mb-6 sm:mb-8"
              style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>
              Pronájem techniky
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl font-montserrat text-white opacity-95 leading-relaxed mb-8 sm:mb-10 max-w-xl"
              style={{ textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
              Disponujeme desítkami výkonných počítačů, monitorů a notebooků, na které je vždy při zabezpečení vašich eventů spoleň. Zároveň dokážeme z techniky vytvořit herní zónu na míru a doplnit ji o herní konzole, virtuální realitu nebo závodní simulátory.
            </p>

            {/* CTA Button */}
            <motion.button
              className="bg-yellow-400 hover:bg-yellow-300 text-black px-6 sm:px-8 md:px-10 py-3 sm:py-4 font-montserrat font-bold text-xs sm:text-sm md:text-base uppercase tracking-wide transition-all duration-300"
              whileHover={{ scale: 1.05, translateY: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Získat cenovou nabídku
            </motion.button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}