'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section id="hero" className="relative w-full h-screen bg-black overflow-visible z-10">
      {/* Static Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/LC%20WEB%20podklady/1)%20sekcia%20uvod/1%20-%20hern%C3%AD%20zony.jpg"
          alt="Gaming marketing a eventy"
          fill
          className="object-cover w-full h-full"
          style={{ filter: 'blur(1.5px)' }}
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/65" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-6 md:px-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full text-center"
        >
          {/* Main Prominent Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-montserrat font-extrabold mb-6 sm:mb-8 leading-tight"
            style={{ textShadow: '0 3px 10px rgba(0,0,0,0.7)' }}>
            <span className="text-white">Herní marketing, influenceři a eventy. </span>
            <span className="text-yellow-400">Kompletně </span>
            <span className="text-white">vše pod jednou střechou.</span>
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 font-montserrat mb-6 sm:mb-8 leading-relaxed max-w-4xl mx-auto"
            style={{ textShadow: '0 2px 6px rgba(0,0,0,0.6)' }}>
            Nabízíme široké spektrum možností, díky čemuž dokážeme pro klienty vytvořit aktivitu na míru. Naším cílem je dosáhnout maximální spokojenosti klientů, proto se snažíme o individuální přístup a kvalitní služby.
          </p>

          {/* CTA Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Link
              href="/spoluprace"
              className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black px-6 sm:px-8 py-3 sm:py-4 font-montserrat font-bold text-xs sm:text-sm md:text-base uppercase transition-all"
            >
              Spolupracujte s námi
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );

}
