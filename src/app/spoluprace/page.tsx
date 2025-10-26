'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useInView } from '@/hooks/useInView';

export default function Spoluprace() {
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
    <main className="bg-black">
      <Header />
      
      {/* Add top padding for fixed header */}
      <div className="pt-20 md:pt-24" />

      {/* Hero Section with Team Image - Full Width */}
      <section className="relative w-full h-96 sm:h-[500px] md:h-[600px] lg:h-[900px] bg-black overflow-hidden">
        <Image
          src="/designs/lancraft-070.jpg"
          alt="LanCraft Team"
          fill
          className="object-cover w-full h-full"
          priority
        />
        {/* Overlay - Gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/80" />
        
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl"
          >
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-montserrat font-extrabold text-white mb-4 sm:mb-6">
              Spolupracujte{' '}
              <span className="text-yellow-400">s LanCraftem</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-200 font-montserrat leading-relaxed">
              Jsme tým nadšenců z oblasti gamingu, e-sportu a live eventů. Naším cílem je vytvářet nezapomenutelné zážitky a propojovat značky s jejich publikem.
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-950" ref={containerRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-montserrat font-extrabold text-white mb-4 sm:mb-6 leading-tight">
              O nás
            </h2>
            
            <p className="text-sm sm:text-base text-gray-400 font-montserrat leading-relaxed mb-6 sm:mb-8 max-w-4xl mx-auto">
              LanCraft je herní eventová agentura, která už od roku 2006 zaměřuje svou činnost na herní průmysl a jeho populaci. Mezi hlavní činnosti LanCraftu patří zajišťování herních zón v širokém spektru eventů spolu se samostatným pronájmem výkonné a moderní herní techniky včetně kvalifikované obsluhy.
            </p>

            <p className="text-sm sm:text-base text-gray-400 font-montserrat leading-relaxed mb-8 sm:mb-12 max-w-4xl mx-auto">
              V rámci online aktivit pořádá počítačové turnaje i dlouhodobé ligy ať už pro širokou veřejnost či specifické oblasti, jako jsou např. univerzity či střední školy. Aktivně se také podílí na vzdělávání studentů středních škol, kde od roku 2020 zajišťuje zkušené lektory v prvním maturitním oboru v ČR zaměřeném na počítačové hry a e-sport.
            </p>
          </motion.div>

          {/* Contact Information - 3 Columns */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 max-w-4xl mx-auto"
          >
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-800 text-center">
              <p className="text-gray-500 font-montserrat text-xs sm:text-sm mb-3 uppercase tracking-wide">Sídlo společnosti</p>
              <p className="text-white font-montserrat text-sm mb-2">Benešova 175</p>
              <p className="text-white font-montserrat text-sm mb-2">471 52 Sloup v Čechách</p>
              <p className="text-white font-montserrat text-sm">Česká republika</p>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-800 text-center">
              <p className="text-gray-500 font-montserrat text-xs sm:text-sm mb-3 uppercase tracking-wide">Telefon</p>
              <a 
                href="tel:+421917269443" 
                className="text-white font-montserrat font-bold text-lg sm:text-xl hover:text-yellow-400 transition-colors"
              >
                +421 917 269 443
              </a>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-800 text-center">
              <p className="text-gray-500 font-montserrat text-xs sm:text-sm mb-3 uppercase tracking-wide">E-mail</p>
              <a 
                href="mailto:daniel.sokol@lancraft.cz" 
                className="text-white font-montserrat font-bold text-sm hover:text-yellow-400 transition-colors break-all"
              >
                daniel.sokol@lancraft.cz
              </a>
            </div>
          </motion.div>

          {/* Contact Form - Full Width */}
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="max-w-4xl mx-auto"
          >
            <h3 className="text-xl sm:text-2xl font-montserrat font-bold text-white mb-8 text-center">
              Ozvěte se nám
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
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
            </div>

            {/* Subject */}
            <div className="mb-6 sm:mb-8">
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
            <div className="mb-6 sm:mb-8">
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
            <div className="flex justify-center">
              <motion.button
                type="submit"
                className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 sm:px-8 py-3 rounded-lg font-montserrat font-bold text-sm sm:text-base uppercase transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Odeslat
              </motion.button>
            </div>
          </motion.form>
        </div>
      </section>

      <Footer />
    </main>
  );
}