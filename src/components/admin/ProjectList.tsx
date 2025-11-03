'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

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

// Funkce pro extrahování plain textu z HTML
const stripHtml = (html: string): string => {
  const temp = document.createElement('div');
  temp.innerHTML = html;
  return temp.innerText || temp.textContent || '';
};

interface ProjectListProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onRefresh: () => void;
}

export default function ProjectList({ projects, onEdit, onRefresh }: ProjectListProps) {
  const { token } = useAuth();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Skutečně chcete smazat tento projekt?')) {
      return;
    }

    setDeletingId(id);
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Chyba při mazání');
      }

      onRefresh();
    } catch (error: any) {
      alert('Chyba: ' + error.message);
    } finally {
      setDeletingId(null);
    }
  };

  if (projects.length === 0) {
    return (
      <div className="bg-zinc-900 rounded-lg p-6 sm:p-8 border border-zinc-800 text-center">
        <p className="text-zinc-400 text-sm sm:text-base">Žádné projekty. Přidejte svůj první projekt!</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm sm:text-base">
        <thead>
          <tr className="border-b border-zinc-700">
            <th className="text-left px-2 sm:px-4 py-3 text-white font-semibold text-xs sm:text-sm">Náhled</th>
            <th className="text-left px-2 sm:px-4 py-3 text-white font-semibold text-xs sm:text-sm">Název</th>
            <th className="hidden sm:table-cell text-left px-4 py-3 text-white font-semibold text-xs sm:text-sm">Kategorie</th>
            <th className="hidden md:table-cell text-left px-4 py-3 text-white font-semibold text-xs sm:text-sm">Popis</th>
            <th className="text-right px-2 sm:px-4 py-3 text-white font-semibold text-xs sm:text-sm">Akce</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id} className="border-b border-zinc-800 hover:bg-zinc-800/50 transition">
              <td className="px-2 sm:px-4 py-3">
                {project.thumbnail_image && (
                  <img src={project.thumbnail_image} alt={project.title} className="w-12 h-12 rounded object-cover" />
                )}
              </td>
              <td className="px-2 sm:px-4 py-3 text-white text-xs sm:text-sm truncate">{project.title}</td>
              <td className="hidden sm:table-cell px-4 py-3 text-zinc-400 text-xs sm:text-sm">{project.category}</td>
              <td className="hidden md:table-cell px-4 py-3 text-zinc-400 text-xs sm:text-sm truncate max-w-xs">{stripHtml(project.description)}</td>
              <td className="px-2 sm:px-4 py-3 text-right space-x-2">
                <button
                  onClick={() => onEdit(project)}
                  className="inline-flex items-center gap-1 text-yellow-400 hover:text-yellow-300 transition"
                  title="Upravit"
                >
                  <FiEdit2 size={16} className="sm:size-[18px]" />
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  disabled={deletingId === project.id}
                  className="inline-flex items-center gap-1 text-red-400 hover:text-red-300 transition disabled:opacity-50"
                  title="Smazat"
                >
                  <FiTrash2 size={16} className="sm:size-[18px]" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}