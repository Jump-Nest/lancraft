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
    <section id="rental" className="relative w-full min-h-[500px] md:min-h-[600px] overflow-hidden bg-[#111111]">
      {/* Background Image with Filter - Left Side */}
      <div className="absolute inset-0 w-full md:w-[54%]">
        <Image
          src="/LC%20WEB%20podklady/4)%20pronajem%20techniky/1%20-%20pronajem%20techniky.jpg"
          alt="Pronájem techniky background"
          fill
          sizes="(max-width: 768px) 100vw, 54vw"
          className="object-cover w-full h-full"
          style={{ filter: 'brightness(0.4) blur(2px)' }}
          priority
        />
      </div>

      {/* Placeholder Image - Centered on left side */}
      <div className="absolute left-0 md:left-0 top-1/2 -translate-y-1/2 z-10 w-full md:w-[54%] flex items-center justify-center px-4 sm:px-8 md:px-12 hidden md:flex">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.6 }}
          className="relative w-[280px] sm:w-[350px] md:w-[420px] lg:w-[480px] aspect-[4/3] border-4 border-white bg-gray-800"
        >
          {/* Placeholder content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">🖼️</div>
              <p className="text-white font-montserrat text-sm">Placeholder Image</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mobile Dark Overlay */}
      <div
        className="absolute inset-0 z-10 md:hidden"
        style={{
          background: 'rgba(0,0,0,0.7)'
        }}
      />

      {/* Desktop Gradient Overlay - 54% photo, 46% solid background */}
      <div
        className="absolute inset-0 z-10 hidden md:block"
        style={{
          background: 'linear-gradient(to right, transparent 0%, transparent 35%, rgba(17,17,17,1) 54%, rgba(17,17,17,1) 100%)'
        }}
      />

      {/* Content Container - Right Side */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
        className="relative z-20 min-h-[500px] md:min-h-[600px] flex items-center justify-center md:justify-end w-full"
      >
        <div className="w-full md:w-1/2 px-6 sm:px-8 md:px-12 py-12 md:py-16">
          <div className="max-w-2xl text-center md:text-left">
            {/* Title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-montserrat font-bold text-white mb-6 sm:mb-8"
              style={{ textShadow: '0 3px 12px rgba(0,0,0,0.9)' }}>
              Pronájem techniky
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl font-montserrat text-white leading-relaxed mb-8 sm:mb-10 max-w-xl mx-auto md:mx-0"
              style={{ textShadow: '0 2px 8px rgba(0,0,0,0.9)' }}>
              Disponujeme modulárními truss konstrukcemi v desítkách metrů, ze kterých rychle postavíme bránu, rámování stánku, závěsy pro bannery/LED/TV, světla i navigační prvky. Každé řešení umíme navrhnout na míru podle účelu a zatížení, dodat jako samostatný pronájem nebo včetně dopravy, montáže a technického dozoru. Klíčová je pro nás bezpečnost: pracujeme s prověřeným vybavením, montáží proškoleným týmem a průběžnými kontrolami/inspekcemi před provozem.
            </p>

            {/* CTA Button */}
            <div className="flex justify-center md:justify-start">
              <motion.button
                className="bg-yellow-400 hover:bg-yellow-300 text-black px-6 sm:px-8 md:px-10 py-3 sm:py-4 font-montserrat font-bold text-xs sm:text-sm md:text-base uppercase tracking-wide transition-all duration-300"
                whileHover={{ scale: 1.05, translateY: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Získat cenovou nabídku
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}