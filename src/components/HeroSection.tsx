'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    image: '/LC%20WEB%20podklady/1)%20sekcia%20uvod/1%20-%20hern%C3%AD%20zony.jpg',
    title: 'LanCraft je ',
    highlight: 'branou do světa ',
    subtitle: 'gamingu a e-sportu',
    description: 'Nabízíme široké spektrum možností, díky čemuž dokážeme pro klienty vytvořit aktivitu na míru. Naším cílem je dosáhnout maximální spokojenosti klientů, proto se snažíme o individuální přístup a kvalitní služby.',
  },
  {
    image: '/LC%20WEB%20podklady/1)%20sekcia%20uvod/2%20-%20online%20mark.jpg',
    title: 'Online ',
    highlight: 'marketing ',
    subtitle: 'a strategie',
    description: 'Vytváříme komplexní marketingové strategie pro gaming a esport komunitu s důrazem na autenticitu a engagement.',
  },
  {
    image: '/LC%20WEB%20podklady/1)%20sekcia%20uvod/3%20-%20influencer%20marketing.jpg',
    title: 'Influencer ',
    highlight: 'marketing ',
    subtitle: 'a spolupráce',
    description: 'Propojujeme značky s gaming influencery a vytváříme autentické kampaně, které rezonují s cílovou skupinou.',
  },
  {
    image: '/LC%20WEB%20podklady/1)%20sekcia%20uvod/4%20-%20zive%20prenosy.jpg',
    title: 'Živé ',
    highlight: 'přenosy ',
    subtitle: 'a streaming',
    description: 'Profesionální streaming a živé přenosy esportových událostí s vysokou kvalitou obrazu a zvuku.',
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section id="hero" className="relative w-full h-screen bg-black overflow-visible z-10">
      {/* Slideshow Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <Image
            src={slides[currentSlide].image}
            alt={`Slide ${currentSlide + 1}`}
            fill
            className="object-cover w-full h-full"
            priority={currentSlide === 0}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-start justify-center px-4 sm:px-6 md:px-10 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl w-full"
          >
            {/* Main Headline */}
            <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-montserrat font-extrabold mb-4 sm:mb-6 leading-tight">
              <span className="text-white">{slides[currentSlide].title}</span>
              <span className="text-yellow-400">{slides[currentSlide].highlight}</span>
              <span className="text-white">{slides[currentSlide].subtitle}</span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base md:text-lg text-gray-300 font-montserrat mb-6 sm:mb-8 leading-relaxed">
              {slides[currentSlide].description}
            </p>

            {/* CTA Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/spoluprace"
                className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black px-6 sm:px-8 py-3 sm:py-4 font-montserrat font-bold text-xs sm:text-sm md:text-base uppercase transition-all"
              >
                Spolupracujte s námi
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-yellow-400 w-8' : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}