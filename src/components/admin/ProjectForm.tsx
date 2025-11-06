'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import ImageUpload from './ImageUpload';
import TipTapEditor from './TipTapEditor';
import ImageEditor from './ImageEditor';

interface Project {
  id?: number;
  title: string;
  description: string;
  image: string;
  thumbnail_image?: string;
  article_image?: string;
  preview_text?: string;
  category: string;
}

const CATEGORIES = [
  { id: 'offline', name: 'OFFLINE EVENTY' },
  { id: 'online', name: 'ONLINE MARKETING' },
  { id: 'influencer', name: 'INFLUENCER MARKETING' },
  { id: 'live', name: 'ŽIVÉ PŘENOSY' },
];

interface ProjectFormProps {
  project?: Project;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function ProjectForm({ project, onSuccess, onCancel }: ProjectFormProps) {
  const { token } = useAuth();
  const [formData, setFormData] = useState<Project>({
    title: '',
    description: '',
    image: '',
    thumbnail_image: '',
    article_image: '',
    preview_text: '',
    category: 'online',
    ...project,
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showImageEditor, setShowImageEditor] = useState(false);
  const [tempThumbnailImage, setTempThumbnailImage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDescriptionChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      description: value,
    }));
  };

  const handleImageUpload = (url: string) => {
    setFormData((prev) => ({
      ...prev,
      image: url,
    }));
  };

  const handleThumbnailUpload = (url: string) => {
    setTempThumbnailImage(url);
    setShowImageEditor(true);
  };

  const handleImageEditorSave = (editedImageUrl: string) => {
    setFormData((prev) => ({
      ...prev,
      thumbnail_image: editedImageUrl,
    }));
    setShowImageEditor(false);
    setTempThumbnailImage('');
  };

  const handleImageEditorCancel = () => {
    setShowImageEditor(false);
    setTempThumbnailImage('');
  };

  const handleArticleImageUpload = (url: string) => {
    setFormData((prev) => ({
      ...prev,
      article_image: url,
    }));
  };

  const handleThumbnailRemove = () => {
    setFormData((prev) => ({
      ...prev,
      thumbnail_image: '',
    }));
  };

  const handleArticleImageRemove = () => {
    setFormData((prev) => ({
      ...prev,
      article_image: '',
    }));
  };

  const handlePreviewTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      preview_text: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.title.trim()) {
      setError('Název je povinný');
      return;
    }

    if (!formData.description.trim() || formData.description === '<p><br></p>') {
      setError('Popis je povinný');
      return;
    }

    if (!formData.thumbnail_image) {
      setError('Obrázek pro Front page je povinný');
      return;
    }

    if (!formData.article_image) {
      setError('Obrázek v článku je povinný');
      return;
    }

    setIsLoading(true);

    try {
      const method = project?.id ? 'PUT' : 'POST';
      const endpoint = project?.id ? `/api/projects/${project.id}` : '/api/projects';

      const dataToSend = {
        ...formData,
        image: formData.thumbnail_image || formData.article_image || formData.image,
      };

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Chyba při ukládání');
      }

      onSuccess();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit} className="bg-zinc-900 rounded-lg p-4 sm:p-6 border border-zinc-800 space-y-4 sm:space-y-5">
      <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">
        {project?.id ? 'Upravit projekt' : 'Nový projekt'}
      </h3>

      {/* Název */}
      <div>
        <label className="block text-xs sm:text-sm font-medium text-white mb-2">Název projektu *</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-yellow-400"
          placeholder="Např. Herní turnaj"
        />
      </div>

      {/* Kategorie */}
      <div>
        <label className="block text-xs sm:text-sm font-medium text-white mb-2">Kategorie *</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded text-white text-sm focus:outline-none focus:border-yellow-400"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Preview Text */}
      <div>
        <label className="block text-xs sm:text-sm font-medium text-white mb-2">Text náhledu (Front page) *</label>
        <textarea
          name="preview_text"
          value={formData.preview_text || ''}
          onChange={handlePreviewTextChange}
          className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-yellow-400"
          placeholder="Napište text, který se bude zobrazovat na front page..."
          rows={3}
        />
        <p className="text-xs text-zinc-400 mt-1">Pokud není vyplněno, použije se začátek popisu</p>
      </div>

      {/* Rich Text Editor */}
      <div>
        <label className="block text-xs sm:text-sm font-medium text-white mb-2">Popis projektu *</label>
        <TipTapEditor
          value={formData.description}
          onChange={handleDescriptionChange}
          placeholder="Napište popis projektu..."
        />
        <p className="text-xs text-zinc-400 mt-1">Můžete formátovat text - bold, kurzíva, nadpisy, seznamy...</p>
      </div>

      {/* Image Uploads */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {/* Thumbnail Image Upload */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-white mb-2">Obrázek pro Front page (náhled) *</label>
          <p className="text-xs text-zinc-400 mb-2">Ideální velikost: 800×1200px (poměr 2:3)</p>
          <ImageUpload 
            onImageUpload={handleThumbnailUpload} 
            currentImage={formData.thumbnail_image}
            onImageRemove={handleThumbnailRemove}
            aspectRatio="2/3"
          />
        </div>

        {/* Article Image Upload */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-white mb-2">Obrázek v článku *</label>
          <p className="text-xs text-zinc-400 mb-2">Ideální velikost: 1920×1080px (poměr 16:9)</p>
          <ImageUpload 
            onImageUpload={handleArticleImageUpload} 
            currentImage={formData.article_image}
            onImageRemove={handleArticleImageRemove}
            aspectRatio="16/9"
          />
        </div>
      </div>

      {/* Chyby */}
      {error && (
        <div className="bg-red-900/20 border border-red-700 rounded px-3 sm:px-4 py-3 text-red-300 text-xs sm:text-sm">
          {error}
        </div>
      )}

      {/* Tlačítka */}
      <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t border-zinc-700">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-yellow-400 hover:bg-yellow-300 disabled:bg-yellow-200 text-black font-bold py-2 px-4 rounded transition-colors text-sm"
        >
          {isLoading ? 'Ukládám...' : project?.id ? 'Uložit změny' : 'Vytvořit projekt'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white font-bold py-2 px-4 rounded transition-colors text-sm"
        >
          Zrušit
        </button>
      </div>
    </form>

    {showImageEditor && tempThumbnailImage && (
      <ImageEditor
        imageUrl={tempThumbnailImage}
        onSave={handleImageEditorSave}
        onCancel={handleImageEditorCancel}
      />
    )}
    </>
  );
}