'use client';

import { useState, useRef } from 'react';
import imageCompression from 'browser-image-compression';
import { useAuth } from '@/lib/auth-context';
import { FiUpload, FiX } from 'react-icons/fi';

interface ImageUploadProps {
  onImageUpload: (url: string) => void;
  currentImage?: string;
}

export default function ImageUpload({ onImageUpload, currentImage }: ImageUploadProps) {
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState<string | undefined>(currentImage);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);

  const compressImage = async (file: File): Promise<File> => {
    try {
      const compressed = await imageCompression(file, {
        maxSizeMB: 0.5, // 500 KB max
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        quality: 0.75, // 75% quality
      });
      return compressed;
    } catch (err) {
      throw new Error('Chyba při kompresi obrázku');
    }
  };

  const uploadImage = async (file: File) => {
    setError('');
    setIsLoading(true);

    try {
      // Komprese
      const compressedFile = await compressImage(file);

      // Vytvoření FormData pro multipart upload
      const formData = new FormData();
      formData.append('file', compressedFile);

      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Chyba při nahrávání');
      }

      const { url } = await response.json();
      setPreview(url);
      onImageUpload(url);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Prosím vyberte obrázek');
      return;
    }
    uploadImage(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    dragRef.current?.classList.add('border-yellow-400', 'bg-yellow-400/10');
  };

  const handleDragLeave = () => {
    dragRef.current?.classList.remove('border-yellow-400', 'bg-yellow-400/10');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    dragRef.current?.classList.remove('border-yellow-400', 'bg-yellow-400/10');
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  return (
    <div className="space-y-3">
      <label className="block text-xs sm:text-sm font-medium text-white">Obrázek projektu</label>

      {preview && (
        <div className="relative w-full h-32 sm:h-48 bg-zinc-800 rounded overflow-hidden border border-zinc-700">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={() => {
              setPreview(undefined);
              onImageUpload('');
            }}
            className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 p-1 rounded"
          >
            <FiX className="w-4 h-4" />
          </button>
        </div>
      )}

      <div
        ref={dragRef}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-zinc-600 rounded-lg p-4 sm:p-6 text-center cursor-pointer transition-colors hover:border-zinc-500 bg-zinc-800/50"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFileSelect(file);
          }}
          className="hidden"
        />

        <div className="flex flex-col items-center gap-2">
          <FiUpload className="w-5 sm:w-6 h-5 sm:h-6 text-zinc-400" />
          <div>
            <p className="text-white font-medium text-xs sm:text-sm">Drag obrázek nebo klikněte</p>
            <p className="text-xs text-zinc-400">
              {isLoading ? 'Nahrávám a komprimo...' : 'Max 500 KB po kompresi'}
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-900/20 border border-red-700 rounded px-3 py-2 text-red-300 text-xs sm:text-sm">
          {error}
        </div>
      )}
    </div>
  );
}