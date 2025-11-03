'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  thumbnail_image?: string;
  article_image?: string;
  preview_text?: string;
  category: string;
  created_at: string;
}

export default function ProjectPage() {
  const params = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const projectId = params.id;

  useEffect(() => {
    if (!projectId) return;

    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/projects/${projectId}`);
        if (response.ok) {
          const data = await response.json();
          setProject(data);
        } else {
          setError('Projekt nebyl nalezen');
        }
      } catch (err) {
        setError('Chyba při načítání projektu');
        console.error('Chyba:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white text-lg">Načítám projekt...</p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <div className="pt-20 min-h-screen flex flex-col items-center justify-center">
          <p className="text-white text-lg mb-6">{error || 'Projekt nebyl nalezen'}</p>
          <Link href="/#projects">
            <button className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-3 rounded font-semibold transition">
              <FiArrowLeft /> Zpět na projekty
            </button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />

      {/* Obsah projektu */}
      <main className="flex-grow pt-20 sm:pt-24 md:pt-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 py-12 sm:py-14 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Obrázek */}
          <div className="relative w-full h-[250px] sm:h-[350px] md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden mb-8 sm:mb-10 md:mb-12">
            <Image
              src={project.article_image || project.image}
              alt={project.title}
              fill
              className="object-cover w-full h-full"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
              priority
            />
          </div>

          {/* Nadpis */}
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-montserrat font-bold mb-4 sm:mb-6">
            {project.title}
          </h1>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8 sm:mb-10 md:mb-12 pb-6 sm:pb-8 border-b border-zinc-700">
            <span className="bg-yellow-400 text-black px-3 sm:px-4 py-1 sm:py-2 rounded font-semibold text-xs sm:text-sm uppercase">
              {project.category}
            </span>
            <span className="text-zinc-400 text-xs sm:text-sm">
              {new Date(project.created_at).toLocaleDateString('cs-CZ', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>

          {/* Obsah textu */}
          <div
            className="project-content mb-12 sm:mb-14 md:mb-16 text-white text-sm sm:text-base leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: project.description,
            }}
          />

          {/* CTA tlačítko */}
          <motion.div
            className="flex justify-center pt-6 sm:pt-8 border-t border-zinc-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/#projects">
              <button className="bg-yellow-400 hover:bg-yellow-300 text-black px-6 sm:px-8 md:px-10 py-3 sm:py-4 font-montserrat font-bold text-xs sm:text-sm md:text-lg uppercase tracking-wide rounded transition">
                Zpět na projekty
              </button>
            </Link>
          </motion.div>
        </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}