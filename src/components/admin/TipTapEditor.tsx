'use client';

import { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import { VideoExtension, getVideoEmbedUrl } from '@/lib/video-extension';
import { ImageExtension } from '@/lib/image-extension';
import ImageUpload from './ImageUpload';

interface TipTapEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export default function TipTapEditor({ value, onChange, placeholder }: TipTapEditorProps) {
  const [showVideoDialog, setShowVideoDialog] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [videoSize, setVideoSize] = useState('large');
  const [videoError, setVideoError] = useState('');
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [imageAlt, setImageAlt] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: { HTMLAttributes: { class: 'list-disc list-inside' } },
        orderedList: { HTMLAttributes: { class: 'list-decimal list-inside' } },
        codeBlock: { HTMLAttributes: { class: 'bg-zinc-900 p-2 rounded font-mono text-sm' } },
        paragraph: { HTMLAttributes: { class: 'mb-2' } },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: 'text-yellow-400 underline' },
      }),
      VideoExtension,
      ImageExtension,
    ],
    content: value || '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none bg-zinc-800 text-white p-2 sm:p-3 min-h-48 text-sm sm:text-base editor-content',
      },
    },
    immediatelyRender: false,
  });

  if (!editor) return null;

  const handleImageInsertFromUpload = (url: string) => {
    if (!editor) return;

    editor
      .chain()
      .focus()
      .setImage({
        src: url,
        alt: imageAlt || undefined,
      })
      .run();

    setShowImageDialog(false);
    setImageAlt('');
  };

  const handleVideoInsert = () => {
    setVideoError('');

    if (!videoUrl.trim()) {
      setVideoError('Prosím zadejte URL videa');
      return;
    }

    const result = getVideoEmbedUrl(videoUrl);
    if (!result) {
      setVideoError('Nepodporované video URL. Zkuste YouTube, Vimeo, Twitch, Instagram nebo TikTok.');
      return;
    }

    editor.chain().focus().setVideo({
      src: result.embedUrl,
      platform: result.platform,
      size: videoSize,
    }).run();

    setVideoUrl('');
    setVideoSize('large');
    setShowVideoDialog(false);
  };

  const toggleBold = () => editor.chain().focus().toggleBold().run();
  const toggleItalic = () => editor.chain().focus().toggleItalic().run();
  const toggleStrike = () => editor.chain().focus().toggleStrike().run();
  const toggleHeading1 = () => editor.chain().focus().toggleHeading({ level: 1 }).run();
  const toggleHeading2 = () => editor.chain().focus().toggleHeading({ level: 2 }).run();
  const toggleBulletList = () => editor.chain().focus().toggleBulletList().run();
  const toggleOrderedList = () => editor.chain().focus().toggleOrderedList().run();
  const toggleCodeBlock = () => editor.chain().focus().toggleCodeBlock().run();
  const toggleBlockquote = () => editor.chain().focus().toggleBlockquote().run();
  const clearFormatting = () => editor.chain().focus().clearNodes().unsetAllMarks().run();
  const setImageFloat = (value: 'none' | 'left' | 'right') =>
    editor.chain().focus().updateAttributes('image', { float: value }).run();



  return (
    <>
    <style jsx global>{`
      .editor-content [data-type="video"] {
        position: relative;
        margin: 1rem auto;
        border: 2px solid #facc15;
        border-radius: 8px;
        overflow: hidden;
        background: #18181b;
        padding-bottom: 56.25%;
        height: 0;
      }
      .editor-content [data-type="video"][data-platform="instagram"] {
        padding-bottom: 0;
        height: auto;
        min-height: 600px;
      }
      .editor-content [data-type="video"][data-size="small"],
      .editor-content [data-type="video"][data-size="medium"],
      .editor-content [data-type="video"][data-size="large"] {
        display: inline-block;
        vertical-align: top;
        margin: 1rem 0.5rem;
      }
      .editor-content [data-type="video"][data-size="small"] {
        width: 100%;
        max-width: 400px;
      }
      .editor-content [data-type="video"][data-size="medium"] {
        width: 100%;
        max-width: 600px;
      }
      .editor-content [data-type="video"][data-size="large"] {
        width: 100%;
        max-width: 800px;
      }
      .editor-content [data-type="video"][data-size="full"] {
        width: 100%;
        display: block;
      }
      .editor-content [data-type="video"] iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: none;
        pointer-events: auto;
      }
      .editor-content [data-type="video"][data-platform="instagram"] iframe {
        position: relative;
        min-height: 600px;
      }
    `}</style>
    <div className="border border-zinc-700 rounded overflow-hidden">
      {/* Toolbar */}
      <div className="bg-zinc-900 border-b border-zinc-700 p-2 flex flex-wrap gap-1 overflow-x-auto">
        <button
          type="button"
          onClick={toggleBold}
          className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-semibold transition flex-shrink-0 ${
            editor.isActive('bold')
              ? 'bg-yellow-400 text-zinc-900'
              : 'bg-zinc-800 text-white hover:bg-zinc-700'
          }`}
          title="Tučné"
        >
          B
        </button>
        <button
          type="button"
          onClick={toggleItalic}
          className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm italic transition flex-shrink-0 ${
            editor.isActive('italic')
              ? 'bg-yellow-400 text-zinc-900'
              : 'bg-zinc-800 text-white hover:bg-zinc-700'
          }`}
          title="Kurzíva"
        >
          I
        </button>
        <button
          type="button"
          onClick={toggleStrike}
          className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm line-through transition flex-shrink-0 ${
            editor.isActive('strike')
              ? 'bg-yellow-400 text-zinc-900'
              : 'bg-zinc-800 text-white hover:bg-zinc-700'
          }`}
          title="Přeškrtnutí"
        >
          S
        </button>

        <div className="border-l border-zinc-700 mx-1 flex-shrink-0" />

        <button
          type="button"
          onClick={toggleHeading1}
          className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-bold transition flex-shrink-0 ${
            editor.isActive('heading', { level: 1 })
              ? 'bg-yellow-400 text-zinc-900'
              : 'bg-zinc-800 text-white hover:bg-zinc-700'
          }`}
          title="Nadpis 1"
        >
          H1
        </button>
        <button
          type="button"
          onClick={toggleHeading2}
          className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-bold transition flex-shrink-0 ${
            editor.isActive('heading', { level: 2 })
              ? 'bg-yellow-400 text-zinc-900'
              : 'bg-zinc-800 text-white hover:bg-zinc-700'
          }`}
          title="Nadpis 2"
        >
          H2
        </button>

        <div className="border-l border-zinc-700 mx-1 flex-shrink-0" />

        <button
          type="button"
          onClick={toggleBulletList}
          className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm transition flex-shrink-0 ${
            editor.isActive('bulletList')
              ? 'bg-yellow-400 text-zinc-900'
              : 'bg-zinc-800 text-white hover:bg-zinc-700'
          }`}
          title="Odrážkový seznam"
        >
          <span className="hidden sm:inline">• Seznam</span>
          <span className="sm:hidden">•</span>
        </button>
        <button
          type="button"
          onClick={toggleOrderedList}
          className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm transition flex-shrink-0 ${
            editor.isActive('orderedList')
              ? 'bg-yellow-400 text-zinc-900'
              : 'bg-zinc-800 text-white hover:bg-zinc-700'
          }`}
          title="Číslovaný seznam"
        >
          <span className="hidden sm:inline">1. Seznam</span>
          <span className="sm:hidden">1.</span>
        </button>

        <div className="border-l border-zinc-700 mx-1 flex-shrink-0" />

        <button
          type="button"
          onClick={toggleBlockquote}
          className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm transition flex-shrink-0 ${
            editor.isActive('blockquote')
              ? 'bg-yellow-400 text-zinc-900'
              : 'bg-zinc-800 text-white hover:bg-zinc-700'
          }`}
          title="Citace"
        >
          ❝
        </button>
        <button
          type="button"
          onClick={toggleCodeBlock}
          className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-mono transition flex-shrink-0 ${
            editor.isActive('codeBlock')
              ? 'bg-yellow-400 text-zinc-900'
              : 'bg-zinc-800 text-white hover:bg-zinc-700'
          }`}
          title="Kód"
        >
          &lt;/&gt;
        </button>

        <div className="border-l border-zinc-700 mx-1 flex-shrink-0" />

        <button
          type="button"
          onClick={() => setShowImageDialog(true)}
          className="px-2 sm:px-3 py-1 rounded text-xs sm:text-sm bg-zinc-800 text-white hover:bg-zinc-700 transition flex-shrink-0"
          title="Vložit obrázek"
        >
          <span className="hidden sm:inline">🖼 Obrázek</span>
          <span className="sm:hidden">🖼</span>
        </button>

        {editor.isActive('image') && (
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setImageFloat('none')}
              className="px-2 sm:px-3 py-1 rounded text-xs sm:text-sm bg-zinc-800 text-white hover:bg-zinc-700 transition flex-shrink-0"
              title="Bez obtékání"
            >
              <span className="hidden sm:inline">Bez obtékání</span>
              <span className="sm:hidden">⊘</span>
            </button>
            <button
              type="button"
              onClick={() => setImageFloat('left')}
              className="px-2 sm:px-3 py-1 rounded text-xs sm:text-sm bg-zinc-800 text-white hover:bg-zinc-700 transition flex-shrink-0"
              title="Obrázek vlevo, text vpravo"
            >
              <span className="hidden sm:inline">Obrázek vlevo</span>
              <span className="sm:hidden">⟵</span>
            </button>
            <button
              type="button"
              onClick={() => setImageFloat('right')}
              className="px-2 sm:px-3 py-1 rounded text-xs sm:text-sm bg-zinc-800 text-white hover:bg-zinc-700 transition flex-shrink-0"
              title="Obrázek vpravo, text vlevo"
            >
              <span className="hidden sm:inline">Obrázek vpravo</span>
              <span className="sm:hidden">⟶</span>
            </button>
          </div>
        )}


        <button
          type="button"
          onClick={() => setShowVideoDialog(true)}
          className="px-2 sm:px-3 py-1 rounded text-xs sm:text-sm bg-zinc-800 text-white hover:bg-zinc-700 transition flex-shrink-0"
          title="Vložit video"
        >
          <span className="hidden sm:inline">▶ Video</span>
          <span className="sm:hidden">▶</span>
        </button>

        <button
          type="button"
          onClick={clearFormatting}
          className="px-2 sm:px-3 py-1 rounded text-xs sm:text-sm bg-red-900 text-white hover:bg-red-800 transition flex-shrink-0"
          title="Vyčistit formátování"
        >
          <span className="hidden sm:inline">✕ Smazat</span>
          <span className="sm:hidden">✕</span>
        </button>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />

      {/* Image Dialog */}
      {showImageDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-bold text-white mb-4">Vložit obrázek</h3>

            <div className="mb-4">
              <label className="block text-sm text-white mb-2">Popis obrázku (ALT)</label>
              <input
                type="text"
                value={imageAlt}
                onChange={(e) => setImageAlt(e.target.value)}
                placeholder="Nepovinné – pro přístupnost a SEO"
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-yellow-400"
              />
              <p className="text-xs text-zinc-400 mt-2">
                Popis se uloží jako ALT text. Pokud ho nevyplníte, obrázek se vloží bez něj.
              </p>
            </div>

            <div className="mb-4">
              <ImageUpload onImageUpload={handleImageInsertFromUpload} aspectRatio="16/9" />
              <p className="text-xs text-zinc-400 mt-2">
                Po nahrání se obrázek automaticky vloží na pozici kurzoru v článku.
              </p>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowImageDialog(false);
                  setImageAlt('');
                }}
                className="bg-zinc-700 hover:bg-zinc-600 text-white font-bold py-2 px-4 rounded transition-colors text-sm"
              >
                Zavřít
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Video Dialog */}
      {showVideoDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-bold text-white mb-4">Vložit video</h3>

            <div className="mb-4">
              <label className="block text-sm text-white mb-2">Video URL</label>
              <input
                type="text"
                value={videoUrl}
                onChange={(e) => {
                  setVideoUrl(e.target.value);
                  setVideoError('');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleVideoInsert();
                  }
                }}
                placeholder="https://youtube.com/watch?v=..."
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-yellow-400"
                autoFocus
              />
              <p className="text-xs text-zinc-400 mt-2">
                Podporované: YouTube, Vimeo, Twitch, Instagram, TikTok
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-sm text-white mb-2">Velikost videa</label>
              <div className="grid grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => setVideoSize('small')}
                  className={`px-3 py-2 rounded text-xs font-semibold transition ${
                    videoSize === 'small'
                      ? 'bg-yellow-400 text-black'
                      : 'bg-zinc-800 text-white hover:bg-zinc-700'
                  }`}
                >
                  Malé
                </button>
                <button
                  type="button"
                  onClick={() => setVideoSize('medium')}
                  className={`px-3 py-2 rounded text-xs font-semibold transition ${
                    videoSize === 'medium'
                      ? 'bg-yellow-400 text-black'
                      : 'bg-zinc-800 text-white hover:bg-zinc-700'
                  }`}
                >
                  Střední
                </button>
                <button
                  type="button"
                  onClick={() => setVideoSize('large')}
                  className={`px-3 py-2 rounded text-xs font-semibold transition ${
                    videoSize === 'large'
                      ? 'bg-yellow-400 text-black'
                      : 'bg-zinc-800 text-white hover:bg-zinc-700'
                  }`}
                >
                  Velké
                </button>
                <button
                  type="button"
                  onClick={() => setVideoSize('full')}
                  className={`px-3 py-2 rounded text-xs font-semibold transition ${
                    videoSize === 'full'
                      ? 'bg-yellow-400 text-black'
                      : 'bg-zinc-800 text-white hover:bg-zinc-700'
                  }`}
                >
                  Celá šířka
                </button>
              </div>
              <p className="text-xs text-zinc-400 mt-2">
                Malé: 400px | Střední: 600px | Velké: 800px | Celá šířka: 100%
              </p>
            </div>

            {videoError && (
              <div className="bg-red-900/20 border border-red-700 rounded px-3 py-2 text-red-300 text-xs mb-4">
                {videoError}
              </div>
            )}

            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleVideoInsert}
                className="flex-1 bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2 px-4 rounded transition-colors text-sm"
              >
                Vložit
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowVideoDialog(false);
                  setVideoUrl('');
                  setVideoSize('large');
                  setVideoError('');
                }}
                className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white font-bold py-2 px-4 rounded transition-colors text-sm"
              >
                Zrušit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}