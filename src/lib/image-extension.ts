import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { ResizableImageNodeView } from '@/components/admin/ResizableImageNodeView';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    image: {
      setImage: (options: { src: string; alt?: string; width?: number }) => ReturnType;
    };
  }
}

export const ImageExtension = Node.create({
  name: 'image',
  inline: true,
  group: 'inline',
  atom: true,
  draggable: true,
  selectable: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      width: {
        default: 100,
        parseHTML: (element: HTMLElement) => {
          const styleWidth = element.style?.width || '';
          const attrWidth =
            element.getAttribute('data-width') ||
            element.getAttribute('width') ||
            styleWidth;

          const parsed = attrWidth ? parseFloat(attrWidth) : NaN;
          return Number.isFinite(parsed) ? parsed : 100;
        },
      },
      float: {
        default: 'none',
        parseHTML: (element: HTMLElement) => {
          const value =
            element.getAttribute('data-float') || element.style?.float || '';
          if (value === 'left' || value === 'right') {
            return value;
          }
          return 'none';
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'img[src]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { width = 100, float = 'none', ...rest } = HTMLAttributes;

    let layoutClasses = 'my-4';
    if (float === 'left') {
      layoutClasses = 'my-2 mr-4 float-left';
    } else if (float === 'right') {
      layoutClasses = 'my-2 ml-4 float-right';
    }

    return [
      'img',
      mergeAttributes(rest, {
        class:
          'editor-image rounded-lg shadow-md max-w-full h-auto ' +
          layoutClasses,
        'data-width': width,
        'data-float': float,
        style: `width: ${width}%; height: auto;`,
      }),
    ];
  },

  addCommands() {
    return {
      setImage:
        (options: { src: string; alt?: string; width?: number }) =>
        ({ commands }) =>
          commands.insertContent({
            type: this.name,
            attrs: {
              src: options.src,
              alt: options.alt ?? null,
              width: options.width ?? 100,
            },
          }),
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(ResizableImageNodeView);
  },
});
