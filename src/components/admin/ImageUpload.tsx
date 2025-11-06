'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import imageCompression from 'browser-image-compression';
import { useAuth } from '@/lib/auth-context';
import { FiUpload, FiX } from 'react-icons/fi';

interface ImageUploadProps {
  onImageUpload: (url: string) => void;
  currentImage?: string;
  onImageRemove?: () => void;
  aspectRatio?: string;
}

export default function ImageUpload({ onImageUpload, currentImage, onImageRemove, aspectRatio = '2/3' }: ImageUploadProps) {
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState<string | undefined>(currentImage);
  const [error, setError] = useState('');
  const [compressionProgress, setCompressionProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPreview(currentImage);
  }, [currentImage]);

  const compressImage = async (file: File): Promise<File> => {
    try {
      const compressed = await imageCompression(file, {
        maxSizeMB: 0.5, // 500 KB max
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        onProgress: (progress) => {
          setCompressionProgress(progress);
        },
      });
      return compressed;
    } catch (err) {
      throw new Error('Chyba při kompresi obrázku');
    }
  };

  const uploadImage = async (file: File) => {
    setError('');
    setIsLoading(true);
    setCompressionProgress(0);

    try {
      if (!token) {
        throw new Error('Nejste přihlášeni. Prosím znovu se přihlaste.');
      }

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
      setCompressionProgress(0);
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

  const handleRemove = () => {
    setPreview(undefined);
    if (onImageRemove) {
      onImageRemove();
    }
  };

  return (
    <div className="space-y-3">
      {preview ? (
        <div className="relative">
          <div className="relative w-full rounded overflow-hidden border border-zinc-700" style={{ aspectRatio }}>
            <Image src={preview} alt="Preview" fill className="object-cover" />
          </div>
          {onImageRemove && (
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 bg-red-600 hover:bg-red-500 text-white p-2 rounded-full transition-colors"
              title="Smazat obrázek"
            >
              <FiX className="w-4 h-4" />
            </button>
          )}
        </div>
      ) : (
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
                {isLoading
                  ? compressionProgress > 0
                    ? `Komprimo... ${compressionProgress}%`
                    : 'Nahrávám...'
                  : 'Max 500 KB po kompresi'}
              </p>
            </div>
          </div>

          {/* Progress bar */}
          {isLoading && compressionProgress > 0 && (
            <div className="w-full bg-zinc-700 rounded-full h-1.5 mt-2">
              <div
                className="bg-yellow-400 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${compressionProgress}%` }}
              />
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="bg-red-900/20 border border-red-700 rounded px-3 py-2 text-red-300 text-xs sm:text-sm">
          {error}
        </div>
      )}
    </div>
  );
}