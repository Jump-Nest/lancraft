import { Node } from '@tiptap/core';

export interface VideoOptions {
  controls: boolean;
  allowFullscreen: boolean;
}

export const VideoExtension = Node.create<VideoOptions>({
  name: 'video',
  group: 'block',
  draggable: true,
  selectable: true,
  
  addOptions() {
    return {
      controls: true,
      allowFullscreen: true,
    };
  },

  addAttributes() {
    return {
      src: {
        default: null,
        parseHTML: (element) => element.getAttribute('src'),
        renderHTML: (attributes) => ({
          src: attributes.src,
        }),
      },
      platform: {
        default: 'youtube',
        parseHTML: (element) => element.getAttribute('data-platform'),
        renderHTML: (attributes) => ({
          'data-platform': attributes.platform,
        }),
      },
      width: {
        default: '100%',
        parseHTML: (element) => element.getAttribute('width'),
        renderHTML: (attributes) => ({
          width: attributes.width,
        }),
      },
      height: {
        default: '400',
        parseHTML: (element) => element.getAttribute('height'),
        renderHTML: (attributes) => ({
          height: attributes.height,
        }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="video"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      {
        'data-type': 'video',
        class: 'video-wrapper my-4',
        style: 'position: relative; width: 100%; padding-bottom: 56.25%; height: 0; overflow: hidden;',
      },
      [
        'iframe',
        {
          src: HTMLAttributes.src,
          'data-platform': HTMLAttributes.platform,
          width: '100%',
          height: '100%',
          style: 'position: absolute; top: 0; left: 0; width: 100%; height: 100%;',
          frameborder: '0',
          allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
          allowfullscreen: this.options.allowFullscreen,
        },
      ],
    ];
  },

  addCommands() {
    return {
      setVideo: (options: { src: string; platform: string }) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: {
              src: options.src,
              platform: options.platform,
            },
          });
        },
    };
  },
});

export const getVideoEmbedUrl = (url: string): { embedUrl: string; platform: string } | null => {
  url = url.trim();

  // YouTube
  const youtubeMatch = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?]+)/
  );
  if (youtubeMatch) {
    return {
      embedUrl: `https://www.youtube.com/embed/${youtubeMatch[1]}`,
      platform: 'youtube',
    };
  }

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) {
    return {
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}`,
      platform: 'vimeo',
    };
  }

  // Twitch
  const twitchMatch = url.match(
    /twitch\.tv\/videos\/(\d+)|twitch\.tv\/(?!directory)([a-zA-Z0-9_]+)(?:\?|$)/
  );
  if (twitchMatch) {
    if (twitchMatch[1]) {
      // VOD
      return {
        embedUrl: `https://player.twitch.tv/?video=${twitchMatch[1]}&parent=${typeof window !== 'undefined' ? window.location.hostname : 'localhost'}`,
        platform: 'twitch',
      };
    } else if (twitchMatch[2]) {
      // Live Channel
      return {
        embedUrl: `https://player.twitch.tv/?channel=${twitchMatch[2]}&parent=${typeof window !== 'undefined' ? window.location.hostname : 'localhost'}`,
        platform: 'twitch',
      };
    }
  }

  // Instagram
  const instagramMatch = url.match(/instagram\.com\/p\/([a-zA-Z0-9_-]+)/);
  if (instagramMatch) {
    return {
      embedUrl: `https://www.instagram.com/p/${instagramMatch[1]}/embed`,
      platform: 'instagram',
    };
  }

  // TikTok
  const tiktokMatch = url.match(/@([a-zA-Z0-9_.]+)\/video\/(\d+)|vm\.tiktok\.com\/(\w+)|vt\.tiktok\.com\/(\w+)/);
  if (tiktokMatch) {
    if (tiktokMatch[1] && tiktokMatch[2]) {
      return {
        embedUrl: `https://www.tiktok.com/embed/v2/${tiktokMatch[2]}`,
        platform: 'tiktok',
      };
    }
  }

  // Direct iframe embed (for custom embeds)
  if (url.includes('iframe') && url.includes('src=')) {
    return {
      embedUrl: url,
      platform: 'custom',
    };
  }

  return null;
};
