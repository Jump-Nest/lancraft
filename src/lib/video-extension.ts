import { Node } from '@tiptap/core';

export interface VideoOptions {
  controls: boolean;
  allowFullscreen: boolean;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    video: {
      setVideo: (options: { src: string; platform: string; size?: string }) => ReturnType;
    };
  }
}

export const VideoExtension = Node.create<VideoOptions>({
  name: 'video',
  group: 'block',
  atom: true,
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
        parseHTML: (element) => {
          const iframe = element.querySelector('iframe');
          return iframe?.getAttribute('src') || element.getAttribute('src');
        },
      },
      platform: {
        default: 'youtube',
        parseHTML: (element) => {
          const iframe = element.querySelector('iframe');
          return iframe?.getAttribute('data-platform') || element.getAttribute('data-platform') || 'youtube';
        },
      },
      size: {
        default: 'large',
        parseHTML: (element) => {
          return element.getAttribute('data-size') || 'large';
        },
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
        'data-size': HTMLAttributes.size || 'large',
        'data-platform': HTMLAttributes.platform || 'youtube',
        class: 'video-wrapper',
      },
      [
        'iframe',
        {
          src: HTMLAttributes.src,
          allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
          allowfullscreen: '',
        },
      ],
    ];
  },

  addCommands() {
    return {
      setVideo: (options: { src: string; platform: string; size?: string }) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: {
              src: options.src,
              platform: options.platform,
              size: options.size || 'large',
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

  // Twitch Clips
  const twitchClipMatch = url.match(/twitch\.tv\/[^/]+\/clip\/([a-zA-Z0-9_-]+)/);
  if (twitchClipMatch) {
    return {
      embedUrl: `https://clips.twitch.tv/embed?clip=${twitchClipMatch[1]}&parent=${typeof window !== 'undefined' ? window.location.hostname : 'localhost'}`,
      platform: 'twitch',
    };
  }

  // Twitch VOD and Live
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
