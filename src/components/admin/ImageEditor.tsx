'use client';

import { useState, useRef, useEffect } from 'react';
import { FiZoomIn, FiZoomOut, FiRotateCcw } from 'react-icons/fi';

interface ImageEditorProps {
  imageUrl: string;
  onSave: (editedImageUrl: string) => void;
  onCancel: () => void;
}

export default function ImageEditor({ imageUrl, onSave, onCancel }: ImageEditorProps) {
  const editorCanvasRef = useRef<HTMLCanvasElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const [scale, setScale] = useState(1);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageUrl;
    img.onload = () => {
      setImage(img);
    };
  }, [imageUrl]);

  const drawCanvas = (canvas: HTMLCanvasElement | null, width: number, height: number) => {
    if (!image || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, width, height);

    ctx.save();
    ctx.translate(width / 2 + offsetX, height / 2 + offsetY);
    ctx.scale(scale, scale);
    ctx.drawImage(image, -image.width / 2, -image.height / 2);
    ctx.restore();
  };

  useEffect(() => {
    drawCanvas(editorCanvasRef.current, 800, 500);
    drawCanvas(previewCanvasRef.current, 800, 500);
  }, [image, scale, offsetX, offsetY]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - offsetX, y: e.clientY - offsetY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setOffsetX(e.clientX - dragStart.x);
    setOffsetY(e.clientY - dragStart.y);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleSave = () => {
    if (editorCanvasRef.current) {
      const editedUrl = editorCanvasRef.current.toDataURL('image/jpeg', 0.9);
      onSave(editedUrl);
    }
  };

  const handleReset = () => {
    setScale(1);
    setOffsetX(0);
    setOffsetY(0);
  };

  const handleZoom = (delta: number) => {
    setScale((prev) => Math.max(0.5, Math.min(3, prev + delta)));
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-900 rounded-lg border border-zinc-700 p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-bold text-white mb-4">Úprava obrázku náhledu</h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Editor Canvas */}
          <div className="flex flex-col gap-4">
            <label className="text-sm font-medium text-white">Editor obrázku:</label>
            <canvas
              ref={editorCanvasRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className="w-full border border-zinc-600 rounded cursor-move bg-black"
              style={{ aspectRatio: '800/500' }}
            />

            <div className="flex gap-2">
              <button
                onClick={() => handleZoom(0.1)}
                className="flex items-center gap-1 bg-yellow-400 hover:bg-yellow-300 text-black px-3 py-2 rounded text-sm font-semibold transition"
              >
                <FiZoomIn size={16} /> Přiblížit
              </button>
              <button
                onClick={() => handleZoom(-0.1)}
                className="flex items-center gap-1 bg-yellow-400 hover:bg-yellow-300 text-black px-3 py-2 rounded text-sm font-semibold transition"
              >
                <FiZoomOut size={16} /> Oddálit
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-1 bg-zinc-700 hover:bg-zinc-600 text-white px-3 py-2 rounded text-sm font-semibold transition"
              >
                <FiRotateCcw size={16} /> Obnovit
              </button>
            </div>
            <p className="text-xs text-zinc-400">
              Zoom: {Math.round(scale * 100)}% | Táhni myší pro posun obrázku
            </p>
          </div>

          {/* Preview */}
          <div className="flex flex-col gap-4">
            <label className="text-sm font-medium text-white">Náhled na Front page:</label>
            <div className="relative w-full rounded-lg overflow-hidden shadow-lg shadow-transparent group-hover:shadow-yellow-400/30 transition-shadow duration-300 border border-zinc-700">
              <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-lg overflow-hidden transform group-hover:scale-110 transition-transform duration-500">
                <canvas
                  ref={previewCanvasRef}
                  className="w-full h-full absolute inset-0"
                  style={{ aspectRatio: '16/10', objectFit: 'cover' }}
                />

                {/* Overlay with gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black from-0% via-black/60 via-30% to-black/40 to-100% group-hover:from-black group-hover:via-black/70 transition-all duration-300" />

                {/* Content preview */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-7 text-white">
                  <h3 className="text-lg sm:text-xl md:text-3xl font-bold mb-2 sm:mb-3 group-hover:text-yellow-300 transition-colors duration-300">
                    Název projektu
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-white font-light leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                    Text náhledu projektu bude zobrazen zde...
                  </p>
                </div>
              </div>
            </div>
            <p className="text-xs text-zinc-400">Takto bude obrázek vypadat na front page</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 justify-end border-t border-zinc-700 pt-4">
          <button
            onClick={onCancel}
            className="bg-zinc-700 hover:bg-zinc-600 text-white px-6 py-2 rounded font-semibold transition"
          >
            Zrušit
          </button>
          <button
            onClick={handleSave}
            className="bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-2 rounded font-semibold transition"
          >
            Uložit a pokračovat
          </button>
        </div>
      </div>
    </div>
  );
}
