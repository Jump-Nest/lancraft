'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { useEffect, useState } from 'react';

const stats = [
  { number: 40, label: 'eventů ročně' },
  { number: 6578, label: 'počet návštěvníků' },
  { number: 135, label: 'projektů ročně' },
  { number: 93412, label: 'oslovených lidí' },
];

function AnimatedNumber({ value, inView }: { value: number; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value, inView]);

  return <>{count.toLocaleString('cs-CZ')}</>;
}

export default function StatisticsSection() {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <section id="about" className="relative bg-[#111111] py-12 sm:py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10">
        <div
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 md:gap-16 lg:gap-32"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center flex flex-col items-center"
            >
              {/* Number */}
              <div className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-montserrat font-extrabold text-white mb-2 sm:mb-4 text-center">
                <AnimatedNumber value={stat.number} inView={inView} />
              </div>

              {/* Label */}
              <div className="text-xs sm:text-sm md:text-base lg:text-lg text-[#AAAAAA] font-montserrat font-regular leading-relaxed">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}