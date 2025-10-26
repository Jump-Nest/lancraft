'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';

interface TipTapEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export default function TipTapEditor({ value, onChange, placeholder }: TipTapEditorProps) {
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
    ],
    content: value || '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none bg-zinc-800 text-white p-2 sm:p-3 min-h-48 text-sm sm:text-base',
      },
    },
    immediatelyRender: false,
  });

  if (!editor) return null;

  const toggleBold = () => editor.chain().focus().toggleBold().run();
  const toggleItalic = () => editor.chain().focus().toggleItalic().run();
  const toggleUnderline = () => editor.chain().focus().toggleUnderline().run();
  const toggleStrike = () => editor.chain().focus().toggleStrike().run();
  const toggleHeading1 = () => editor.chain().focus().toggleHeading({ level: 1 }).run();
  const toggleHeading2 = () => editor.chain().focus().toggleHeading({ level: 2 }).run();
  const toggleBulletList = () => editor.chain().focus().toggleBulletList().run();
  const toggleOrderedList = () => editor.chain().focus().toggleOrderedList().run();
  const toggleCodeBlock = () => editor.chain().focus().toggleCodeBlock().run();
  const toggleBlockquote = () => editor.chain().focus().toggleBlockquote().run();
  const clearFormatting = () => editor.chain().focus().clearNodes().unsetAllMarks().run();

  return (
    <div className="border border-zinc-700 rounded overflow-hidden">
      {/* Toolbar */}
      <div className="bg-zinc-900 border-b border-zinc-700 p-2 flex flex-wrap gap-1 overflow-x-auto">
        <button
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
          onClick={toggleUnderline}
          className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm underline transition flex-shrink-0 ${
            editor.isActive('underline')
              ? 'bg-yellow-400 text-zinc-900'
              : 'bg-zinc-800 text-white hover:bg-zinc-700'
          }`}
          title="Podtržení"
        >
          U
        </button>
        <button
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
    </div>
  );
}