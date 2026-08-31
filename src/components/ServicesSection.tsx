'use client';

import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { FaCalendarAlt, FaUsers, FaTrophy } from 'react-icons/fa';

const services = [
  {
    icon: FaCalendarAlt,
    title: 'Eventy',
    subtitle: 'Eventové aktivity, které lidé zapamatují',
    description: 'Vytváříme nezapomenutelné gaming eventy od mobilních brandovaných gaming zón až po kompletní turnaje. Nabízíme kreativní koncept, produkci, montáž & demontáž, obsluhu, techniku a kompletní servis.',
    features: [
      'Mobilní brandované gaming zóny',
      'Zábavný program s moderátorem',
      'Kompletní technické zajištění',
      'Kreativní koncept a produkce',
    ],
  },
  {
    icon: FaUsers,
    title: 'Influencer marketing',
    subtitle: 'Propojíme vaši značku s influencery a gaming komunitou',
    description: 'Máme síť zavedených créatorů na platformách Twitch a YouTube. Vytváříme autentické kampaně s integrací do streamů a videí, brandované sponzorské aktivity a zapojení na eventy.',
    features: [
      'Síť gaming influencerů',
      'Integrace do streamů a videí',
      'Brandované kampaně',
      'Zapojení na eventy',
    ],
  },
  {
    icon: FaTrophy,
    title: 'Ligy & turnaje',
    subtitle: 'Vytvoříme a zorganizujeme ligu, která buduje komunitu',
    description: 'Organizujeme esportové ligy a turnaje, které budují věrnou komunitu. Zajišťujeme kompletní realizaci od návrhu přes mediální propagaci až po konzultační výstupy a integraci partnerů.',
    features: [
      'Kompletní organizace turnajů',
      'Budování gaming komunity',
      'Mediální propagace',
      'Integrace partnerů',
    ],
  },
];

export default function ServicesSection() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section id="about" className="py-16 sm:py-20 md:py-24 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        {/* Section Title */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: -30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-montserrat font-bold text-white mb-4 sm:mb-6">
            <span className="text-yellow-400">Komplexní služby</span>
            pro svět gamingu
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 font-montserrat max-w-3xl mx-auto">
            Herní marketing, influencer kampaně, eventy, ligy a turnaje od návrhu po realizaci.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative bg-black border-2 border-gray-800 hover:border-yellow-400 transition-all duration-300 overflow-hidden"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/0 to-yellow-400/0 group-hover:from-yellow-400/5 group-hover:to-yellow-400/10 transition-all duration-300" />

              <div className="relative p-6 sm:p-8 text-center md:text-left">
                {/* Icon */}
                <div className="mb-6 flex justify-center md:justify-start">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-yellow-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="text-3xl sm:text-4xl text-black" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl sm:text-3xl font-montserrat font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Subtitle */}
                <p className="text-sm sm:text-base text-yellow-400 font-montserrat mb-4 font-medium">
                  {service.subtitle}
                </p>

                {/* Description */}
                <p className="text-sm sm:text-base text-gray-400 font-montserrat leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Features List */}
                <ul className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3 justify-center md:justify-start">
                      <span className="text-yellow-400 mt-1 flex-shrink-0">▸</span>
                      <span className="text-sm text-gray-300 font-montserrat text-left">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom accent line */}
              <div className="h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12 sm:mt-16 md:mt-20"
        >
          <p className="text-base sm:text-lg text-gray-300 font-montserrat mb-6 sm:mb-8">
            Zajímá vás některá z našich služeb?
          </p>
          <motion.a
            href="#contact"
            className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black px-8 sm:px-12 py-4 sm:py-5 font-montserrat font-bold text-sm sm:text-base uppercase tracking-wide transition-all shadow-lg shadow-yellow-400/20 hover:shadow-yellow-400/40"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Kontaktujte nás
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

