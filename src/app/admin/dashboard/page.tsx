'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import ProjectForm from '@/components/admin/ProjectForm';
import ProjectList from '@/components/admin/ProjectList';
import { FiLogOut } from 'react-icons/fi';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  created_at: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const { isAuthenticated, isLoading, logout } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [editingProject, setEditingProject] = useState<Project | undefined>();
  const [activeTab, setActiveTab] = useState<'projects' | 'new'>('projects');

  // Přesměrovat na login pokud není autentifikovaný
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/admin/login');
    }
  }, [isAuthenticated, isLoading, router]);

  // Načíst projekty
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
        setIsLoadingProjects(false);
      }
    };

    fetchProjects();
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  const handleFormSuccess = () => {
    setEditingProject(undefined);
    setActiveTab('projects');
    // Znovu načíst projekty
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => setProjects(data));
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setActiveTab('new');
  };

  const handleCancelForm = () => {
    setEditingProject(undefined);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white">Načítám...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Bude přesměrováno v useEffect
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hlavička */}
      <header className="border-b border-zinc-800 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold font-montserrat">LanCraft - Administrace</h1>
            <p className="text-zinc-400 text-xs sm:text-sm">Správa projektů</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-zinc-700 hover:bg-zinc-600 px-3 sm:px-4 py-2 rounded transition text-sm sm:text-base"
          >
            <FiLogOut />
            <span className="hidden sm:inline">Odhlásit se</span>
            <span className="sm:hidden">Odhlásit</span>
          </button>
        </div>
      </header>

      {/* Hlavní obsah */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Záložky */}
        <div className="flex gap-2 sm:gap-4 mb-8 border-b border-zinc-800 overflow-x-auto">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-3 sm:px-6 py-3 font-semibold transition-colors border-b-2 text-xs sm:text-base whitespace-nowrap ${
              activeTab === 'projects'
                ? 'border-yellow-400 text-yellow-400'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            📋 Projekty ({projects.length})
          </button>
          <button
            onClick={() => {
              setActiveTab('new');
              setEditingProject(undefined);
            }}
            className={`px-3 sm:px-6 py-3 font-semibold transition-colors border-b-2 text-xs sm:text-base whitespace-nowrap ${
              activeTab === 'new'
                ? 'border-yellow-400 text-yellow-400'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            ➕ Nový projekt
          </button>
        </div>

        {/* Obsah záložky "Projekty" */}
        {activeTab === 'projects' && (
          <div className="w-full">
            {isLoadingProjects ? (
              <div className="text-center py-8 text-zinc-400 text-sm">Načítám projekty...</div>
            ) : (
              <ProjectList
                projects={projects}
                onEdit={handleEditProject}
                onRefresh={() => {
                  fetch('/api/projects')
                    .then((res) => res.json())
                    .then((data) => setProjects(data));
                }}
              />
            )}
          </div>
        )}

        {/* Obsah záložky "Nový projekt" */}
        {activeTab === 'new' && (
          <div className="w-full">
            <ProjectForm
              project={editingProject}
              onSuccess={handleFormSuccess}
              onCancel={handleCancelForm}
            />
          </div>
        )}
      </main>
    </div>
  );
}