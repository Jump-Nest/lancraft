'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { useRef, useEffect, useState } from 'react';
import LiquidEther from './LiquidEther';
import { useMotionValue, useAnimation } from 'framer-motion';

const clients = [
  { name: 'Yenkee', logo: '/LC%20WEB%20podklady/5)%20nasi%20klienti/Yenkee.png' },
  { name: 'Samsung', logo: '/LC%20WEB%20podklady/5)%20nasi%20klienti/samsung.png' },
  { name: 'Nutrend', logo: '/LC%20WEB%20podklady/5)%20nasi%20klienti/Nutrend.png' },
  { name: 'CCP', logo: '/LC%20WEB%20podklady/5)%20nasi%20klienti/ccp_logo_black_v2.png' },
  { name: 'NVIDIA', logo: '/LC%20WEB%20podklady/5)%20nasi%20klienti/nvidia-gf-rtx-logo-rgb-for-screen.jpg' },
  { name: 'Red Bull', logo: '/LC%20WEB%20podklady/5)%20nasi%20klienti/red%20bull.png' },
  { name: 'MSI', logo: '/LC%20WEB%20podklady/5)%20nasi%20klienti/MSI.png' },
  { name: 'DXRacer', logo: '/LC%20WEB%20podklady/5)%20nasi%20klienti/DXracer-logo-vector-white.png' },
  { name: 'CZC', logo: '/LC%20WEB%20podklady/5)%20nasi%20klienti/CZC%20logo.png' },
  { name: 'FAST CR', logo: '/LC%20WEB%20podklady/5)%20nasi%20klienti/FAST%20CR.png' },
  { name: 'TCL', logo: '/LC%20WEB%20podklady/5)%20nasi%20klienti/TCL.png' },
  { name: 'Score', logo: '/LC%20WEB%20podklady/5)%20nasi%20klienti/logo_score_white.png' },
];

const testimonials = [
  {
    clientName: 'Samsung',
    logo: '/LC%20WEB%20podklady/5)%20nasi%20klienti/samsung.png',
    text: 'Skvělá spolupráce na našich gaming eventech. Profesionální přístup a kreativní řešení, která přesně odpovídala našim požadavkům.',
  },
  {
    clientName: 'NVIDIA',
    logo: '/LC%20WEB%20podklady/5)%20nasi%20klienti/nvidia-gf-rtx-logo-rgb-for-screen.jpg',
    text: 'LanCraft nám pomohl oslovit gaming komunitu autentickým způsobem. Výsledky kampaně předčily naše očekávání.',
  },
  {
    clientName: 'Red Bull',
    logo: '/LC%20WEB%20podklady/5)%20nasi%20klienti/red%20bull.png',
    text: 'Organizace turnaje byla na nejvyšší úrovni. Tým LanCraft zvládl vše od technického zajištění až po live streaming.',
  },
  {
    clientName: 'MSI',
    logo: '/LC%20WEB%20podklady/5)%20nasi%20klienti/MSI.png',
    text: 'Díky LanCraft jsme úspěšně představili naše nové produkty gaming komunitě. Profesionální přístup a skvělé výsledky.',
  },
];

export default function ClientsSection() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [isDragging, setIsDragging] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const x = useMotionValue(0);
  const containerRef = useRef(null);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef(null);
  const dragStartPositionRef = useRef(0);

  const itemWidth = 260;
  const itemGap = 48;
  const loopDistance = clients.length * (itemWidth + itemGap);

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleDragStart = () => {
    dragStartPositionRef.current = x.get();
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const unsubscribe = x.on('change', (latest) => {
      if (latest <= -loopDistance) {
        x.set(latest + loopDistance);
      } else if (latest >= 0) {
        x.set(latest - loopDistance);
      }
    });

    return () => unsubscribe();
  }, [x, loopDistance]);

  useEffect(() => {
    if (isDragging) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      return;
    }

    const speed = 0.5;
    
    const animate = () => {
      if (isDragging) return;

      const currentX = x.get();
      x.set(currentX - speed);
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isDragging, x]);

  return (
    <section id="clients" className="bg-white py-12 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        {/* Section Title */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: -30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-montserrat font-bold text-black text-center">
            Naši klienti
          </h2>
        </motion.div>

        {/* Clients Carousel */}
        <div className="relative mb-12 sm:mb-16 md:mb-20 overflow-hidden h-24 sm:h-28 md:h-40 cursor-grab active:cursor-grabbing">
          <motion.div
            ref={containerRef}
            className="flex gap-4 sm:gap-8 md:gap-12 justify-center items-center cursor-grab active:cursor-grabbing"
            drag="x"
            dragElastic={0.2}
            dragMomentum={false}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            style={{ x }}
          >
            {[0, 1, 2].map((setIndex) =>
              clients.map((client, index) => (
                <motion.div
                  key={`${setIndex}-${index}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="flex-shrink-0 h-24 sm:h-28 md:h-40 w-32 sm:w-40 md:w-64 relative group flex items-center justify-center p-1 sm:p-2 select-none"
                >
                  <Image
                    src={client.logo}
                    alt={client.name}
                    fill
                    sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, 256px"
                    className="object-contain p-1 sm:p-2 pointer-events-none"
                  />
                </motion.div>
              ))
            )}
          </motion.div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-12 sm:mb-16 md:mb-20"></div>

        {/* Testimonials Section Title */}
        <motion.h3
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-3xl sm:text-4xl md:text-5xl font-montserrat font-bold text-black text-center mb-12 sm:mb-16"
        >
          Co o nás <span className="text-yellow-400">říkají</span>
        </motion.h3>

        {/* Testimonial Slideshow with Side Arrows */}
        <div className="max-w-6xl mx-auto">
          <div className="relative flex items-center gap-4 sm:gap-6 md:gap-8">
              {/* Left Arrow */}
              <button
                onClick={() =>
                  setCurrentTestimonial((prev) =>
                    prev === 0 ? testimonials.length - 1 : prev - 1
                  )
                }
                className="flex-shrink-0 bg-yellow-400 hover:bg-yellow-500 text-black w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-300 font-bold text-xl sm:text-2xl md:text-3xl shadow-lg"
                aria-label="Previous testimonial"
              >
                ‹
              </button>

              {/* Testimonial Content */}
              <div className="flex-1 relative min-h-[400px] sm:min-h-[350px] md:min-h-[300px]">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{
                      opacity: currentTestimonial === index ? 1 : 0,
                      x: currentTestimonial === index ? 0 : 100,
                      display: currentTestimonial === index ? 'block' : 'none',
                    }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <div className="bg-gray-50 border-2 border-gray-200 p-8 sm:p-10 md:p-12 rounded-lg h-full flex flex-col justify-center shadow-xl">
                      {/* Client Logo */}
                      <div className="flex justify-center mb-6 sm:mb-8">
                        <div className="relative w-32 h-16 sm:w-40 sm:h-20 md:w-48 md:h-24">
                          <Image
                            src={testimonial.logo}
                            alt={testimonial.clientName}
                            fill
                            className="object-contain"
                            sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, 192px"
                          />
                        </div>
                      </div>

                      {/* Quote Icon */}
                      <div className="text-yellow-400 text-4xl sm:text-5xl md:text-6xl mb-4 text-center">
                        "
                      </div>

                      {/* Testimonial Text */}
                      <p className="text-base sm:text-lg md:text-xl text-black font-montserrat text-center leading-relaxed">
                        {testimonial.text}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Right Arrow */}
              <button
                onClick={() =>
                  setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
                }
                className="flex-shrink-0 bg-yellow-400 hover:bg-yellow-500 text-black w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-300 font-bold text-xl sm:text-2xl md:text-3xl shadow-lg"
                aria-label="Next testimonial"
              >
                ›
              </button>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-3 mt-8 sm:mt-10">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentTestimonial === index
                    ? 'bg-yellow-400 w-8'
                    : 'bg-gray-400 hover:bg-gray-500'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}