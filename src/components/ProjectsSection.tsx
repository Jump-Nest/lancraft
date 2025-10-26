'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import LiquidEther from './LiquidEther';

const categories = [
  { id: 'offline', name: 'OFFLINE EVENTY' },
  { id: 'online', name: 'ONLINE MARKETING' },
  { id: 'influencer', name: 'INFLUENCER MARKETING' },
  { id: 'live', name: 'ŽIVÉ PŘENOSY' },
];

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
}

// Funkce pro extrahování plain textu z HTML
const stripHtml = (html: string): string => {
  const temp = document.createElement('div');
  temp.innerHTML = html;
  return temp.innerText || temp.textContent || '';
};

// Zkrácení textu na max počet znaků
const truncateText = (text: string, maxLength: number = 100): string => {
  const stripped = stripHtml(text);
  if (stripped.length <= maxLength) return stripped;
  return stripped.substring(0, maxLength) + '...';
};

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <Link href={`/projects/${project.id}`}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="group relative overflow-hidden cursor-pointer"
      >
      {/* Outer container with glow effect */}
      <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[580px] rounded-lg overflow-hidden 
        shadow-lg shadow-transparent group-hover:shadow-yellow-400/30 transition-shadow duration-300">
        
        {/* Inner card container */}
        <div className="relative w-full h-full overflow-hidden rounded-lg transform group-hover:scale-110 transition-transform duration-500">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover w-full h-full"
          />

          {/* Overlay with gradient - darker on hover for better contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black from-0% via-black/50 via-30% to-transparent to-100% 
            group-hover:from-black group-hover:via-black/60 transition-all duration-300" />

          {/* Shine effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/0 to-transparent 
            group-hover:via-white/10 transition-all duration-500 pointer-events-none" />

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-7 text-white transform 
            group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="text-lg sm:text-xl md:text-3xl font-montserrat font-bold mb-2 sm:mb-3 
              group-hover:text-yellow-300 transition-colors duration-300">{project.title}</h3>
            <p className="text-xs sm:text-sm md:text-base text-white font-montserrat font-light leading-relaxed opacity-90
              group-hover:opacity-100 transition-opacity duration-300">
              {truncateText(project.description)}
            </p>
          </div>

          {/* Icon indicator on hover */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
            opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg className="w-12 h-12 text-yellow-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
      </motion.div>
    </Link>
  );
};

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState('online');
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Načíst projekty z API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
        }
      } catch (error) {
        console.error('Chyba při načítání projektů:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(
    (project) => project.category === activeCategory
  );

  return (
    <section id="projects" className="relative bg-black py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
      {/* Liquid Ether Background Animation */}
      <div className="absolute inset-0 z-0 pointer-events-none -top-24 -bottom-24">
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
        {/* Section Title */}
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: -30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-6xl font-montserrat font-bold text-white text-center mb-10 sm:mb-12 md:mb-16"
        >
          Naše projekty
        </motion.h2>

        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-10 lg:gap-14 mb-10 sm:mb-12 md:mb-16">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`font-montserrat font-semibold text-xs sm:text-sm md:text-sm uppercase tracking-wider transition-colors duration-300 pb-2 border-b-2 ${
                activeCategory === category.id
                  ? 'text-yellow-400 border-yellow-400'
                  : 'text-white border-b-transparent hover:text-yellow-400'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
            </motion.button>
          ))}
        </div>

        {/* Projects Grid - 3 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 mb-12 sm:mb-14 md:mb-16">
          {isLoading ? (
            <p className="text-white text-center col-span-full">Načítám projekty...</p>
          ) : filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))
          ) : (
            <p className="text-zinc-400 text-center col-span-full">Zatím žádné projekty</p>
          )}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <Link href="/projects">
            <motion.button
              className="bg-yellow-400 hover:bg-yellow-300 text-black px-6 sm:px-8 md:px-10 py-3 sm:py-4 font-montserrat font-bold text-xs sm:text-sm md:text-base uppercase tracking-wide transition-all duration-300"
              whileHover={{ scale: 1.05, translateY: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Všechny projekty
            </motion.button>
          </Link>
        </div>
      </div>
      </div>
    </section>
  );
}