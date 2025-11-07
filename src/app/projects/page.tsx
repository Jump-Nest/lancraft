'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';
import { useInView } from '@/hooks/useInView';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const categories = [
  { id: 'all', name: 'VŠECHNY' },
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
  categories: string[];
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
        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[580px] overflow-hidden rounded-lg hover:scale-103 transition-transform duration-300">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover w-full h-full group-hover:scale-103 transition-transform duration-300"
          />

          {/* Overlay with gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black from-0% via-black/50 via-30% to-transparent to-100%" />

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-7 text-white">
            <h3 className="text-lg sm:text-xl md:text-3xl font-montserrat font-bold mb-2 sm:mb-3">{project.title}</h3>
            <p className="text-xs sm:text-sm md:text-base text-white font-montserrat font-light leading-relaxed opacity-90">
              {truncateText(project.description)}
            </p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default function AllProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

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

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.categories?.includes(activeCategory));

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />

      {/* Obsah */}
      <main className="flex-grow pt-20 sm:pt-24 md:pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-12 sm:py-14 md:py-16">
          {/* Nadpis */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: -30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
            transition={{ duration: 0.6 }}
            className="mb-12 sm:mb-14 md:mb-16"
          >
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-montserrat font-bold text-white mb-3 sm:mb-4">
              Všechny projekty
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-zinc-400">
              Objevte naší kompletní portfolio projektů a akcí
            </p>
          </motion.div>

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

          {/* Tlačítko zpět */}
          <motion.div
            className="flex justify-center pt-6 sm:pt-8"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/#projects">
              <button className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black px-6 sm:px-8 md:px-10 py-3 sm:py-4 font-montserrat font-bold text-xs sm:text-sm md:text-lg uppercase tracking-wide rounded transition">
                <FiArrowLeft /> Zpět na úvodní stránku
              </button>
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}