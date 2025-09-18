import React from 'react';
import { Link } from 'react-router-dom';

const tools = [
  { name: 'Word Counter', link: '/word-counter' },
  { name: 'Image Compressor', link: '/image-compressor' },
  { name: 'Image Cropper', link: '/image-cropper' },
  { name: 'Background Remover', link: '/background-remover' },
  { name: 'Transparent PNG Maker', link: '/transparent-png' },
  { name: 'Watermark Tool', link: '/watermark' },
  { name: 'Palette from Image', link: '/palette-from-image' },
  { name: 'Social Banner & Thumbnail Maker', link: '/social-banner' },
  { name: 'Meme / Text-on-Image', link: '/meme-maker' },
  { name: 'Color Contrast Checker', link: '/color-contrast-checker' },
  { name: 'Favicon Generator', link: '/favicon-generator' },
  { name: 'SVG → PNG Converter', link: '/svg-png' },
  { name: 'SVG Optimizer', link: '/svg-optimizer' },
  { name: 'Icon Spritesheet Builder', link: '/icon-sprite' },
  { name: 'Table ↔ CSV Converter', link: '/table-csv' },
  { name: 'Regex Tester', link: '/regex-tester' },
  { name: 'UUID & Slug Generator', link: '/uuid-slug' },
  { name: 'Video → GIF (Coming Soon)', link: '/video-to-gif' },
  { name: 'Audio Trimmer (Coming Soon)', link: '/audio-trimmer' },
];

const CreatorTools: React.FC = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-brand-foreground">
    <h1 className="text-3xl md:text-5xl font-bold mb-8">Creator Tools</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
      {tools.map(t => (
        <Link key={t.name} to={t.link} className="bg-brand-card border border-brand-border rounded-lg p-4 hover:border-accent transition-colors" data-cursor-hover>
          {t.name}
        </Link>
      ))}
    </div>
  </div>
);

export default CreatorTools;
