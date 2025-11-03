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

const features = [
  {
    title: 'Statistiky',
    description: 'Sledujeme a měříme výkon vašich akcí s nejnovějšími analytickými nástroji',
  },
  {
    title: 'Růst',
    description: 'Zajišťujeme kontinuální růst vaší značky a dosahu v gaming komunitě',
  },
  {
    title: 'Premium',
    description: 'Poskytujeme prémiové služby s garantovanou kvalitou a výsledky',
  },
];

export default function ClientsSection() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [isDragging, setIsDragging] = useState(false);
  const x = useMotionValue(0);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const startTimeRef = useRef(null);
  const dragStartPositionRef = useRef(0);

  const itemWidth = 260;
  const itemGap = 48;
  const loopDistance = clients.length * (itemWidth + itemGap);

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
    <>
      {/* Clients Carousel - White Section */}
      <section id="clients" className="pt-12 sm:pt-16 md:pt-20 pb-6 sm:pb-8 md:pb-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
          {/* Section Title */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: -30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
            transition={{ duration: 0.6 }}
            className="mb-10 sm:mb-12 md:mb-16"
          >
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-montserrat font-bold text-black text-center">
              Naši klienti
            </h2>
          </motion.div>

          {/* Clients Carousel */}
          <div className="relative mb-6 sm:mb-8 md:mb-8 overflow-hidden h-24 sm:h-28 md:h-40 cursor-grab active:cursor-grabbing">
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
        </div>
      </section>

      {/* Features Section - Black Background */}
      <section className="relative bg-black py-12 sm:py-16 md:py-20 overflow-hidden">
        {/* Liquid Ether Background Animation - Only on Desktop */}
        <div className="absolute inset-0 z-0 pointer-events-none -top-24 -bottom-24 hidden md:block">
          <LiquidEther
            colors={['#FACC15', '#FBD34D', '#FBBF24']}
            mouseForce={20}
            cursorSize={100}
            isViscous={false}
            viscous={30}
            iterationsViscous={32}
            iterationsPoisson={32}
            resolution={0.5}
            isBounce={false}
            autoDemo={true}
            autoSpeed={0.8}
            autoIntensity={2.2}
            takeoverDuration={0.25}
            autoResumeDelay={500}
            autoRampDuration={0.6}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 pointer-events-none">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 pointer-events-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 md:gap-16">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex flex-col items-center text-center"
                >
                  {/* Yellow Circle Icon */}
                  <motion.div
                    className="w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 rounded-full bg-yellow-400 flex items-center justify-center mb-4 sm:mb-6"
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="text-2xl sm:text-3xl md:text-4xl text-black font-montserrat font-bold">
                      {['📊', '📈', '⭐'][index]}
                    </div>
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl md:text-2xl font-montserrat font-bold text-white mb-2 sm:mb-3">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm md:text-base text-gray-400 font-montserrat max-w-sm">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}