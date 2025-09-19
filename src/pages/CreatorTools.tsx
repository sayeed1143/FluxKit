import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SpotlightCard from '../components/animations/SpotlightCard';

// Curated creator-focused tools (easy to use, high engagement). Hashtag Generator intentionally excluded.
const tools = [
  { name: 'Social Banner & Thumbnail Studio', link: '/social-banner' },
  { name: 'Auto Resize for Platforms', link: '/image-resizer' },
  { name: 'Background Remover', link: '/background-remover' },
  { name: 'Image Compressor', link: '/image-compressor' },
  { name: 'Image Format Converter', link: '/image-format-converter' },
  { name: 'Palette from Image', link: '/palette-from-image' },
  { name: 'Color Palette / Brand Kit', link: '/color-palette-generator' },
  { name: 'Meme / Text-on-Image', link: '/meme-maker' },
  { name: 'Transparent PNG Maker', link: '/transparent-png' },
  { name: 'Watermark Tool', link: '/watermark' },
  { name: 'Watermark Remover', link: '/watermark-remover' },
  { name: 'Favicon Generator', link: '/favicon-generator' },
  { name: 'SVG Optimizer', link: '/svg-optimizer' },
  { name: 'Icon Spritesheet Builder', link: '/icon-sprite' },
  { name: 'Audio → Subtitles (Transcribe)', link: '/audio-to-text' },
  { name: 'Short Video → GIF (Coming Soon)', link: '/video-to-gif' },
  { name: 'Audio Trimmer (Coming Soon)', link: '/audio-trimmer' },
  { name: 'Word Counter (Captions)', link: '/word-counter' },
  { name: 'Hashtag & AI Caption Generator', link: '/hashtag-generator' },
  { name: 'Unmotivational Quotes Generator', link: '/unmotivational-quotes' },
];

const CreatorTools: React.FC = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-brand-foreground">
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-6">
      <h1 className="text-3xl md:text-5xl font-bold">Creator Tools</h1>
      <p className="text-brand-muted max-w-2xl mt-2">Essential, easy-to-use tools for social media creators — designed for speed, templates, and shareable exports.</p>
    </motion.div>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      {tools.map((t, i) => (
        <motion.div key={t.name} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: i * 0.05 }} viewport={{ once: true }}>
          <SpotlightCard className="h-full hover:scale-[1.01] transition-transform">
            <Link to={t.link} className="block h-full" data-cursor-hover>
              <div className="flex flex-col h-full">
                <h3 className="text-lg font-semibold text-brand-foreground mb-2">{t.name}</h3>
                <p className="text-sm text-brand-muted flex-grow">{getToolDescription(t.name)}</p>
                <div className="mt-4 text-right">
                  <span className="inline-flex items-center text-accent font-medium">Open →</span>
                </div>
              </div>
            </Link>
          </SpotlightCard>
        </motion.div>
      ))}
    </div>
  </div>
);

function getToolDescription(name: string) {
  if (name.includes('Banner') || name.includes('Thumbnail')) return 'Create social banners and thumbnails with templates for all platforms.';
  if (name.includes('Auto Resize')) return 'Resize images to platform-specific dimensions in one click.';
  if (name.includes('Background Remover')) return 'Remove backgrounds automatically for cleaner assets.';
  if (name.includes('Compressor')) return 'Optimize images for web without losing visible quality.';
  if (name.includes('Format Converter')) return 'Convert between PNG, JPG, WEBP, and more.';
  if (name.includes('Palette') || name.includes('Brand Kit')) return 'Generate palettes and save brand colors for reuse.';
  if (name.includes('Meme')) return 'Quickly add captions, stickers, and export share-ready images.';
  if (name.includes('Transparent')) return 'Create transparent PNGs for overlays and stickers.';
  if (name.includes('Watermark')) return 'Add or remove watermarks for branding.';
  if (name.includes('Favicon')) return 'Generate favicons and small logo assets.';
  if (name.includes('SVG')) return 'Optimize SVGs for size and performance.';
  if (name.includes('Spritesheet')) return 'Build icon spritesheets for faster loading.';
  if (name.includes('Audio')) return 'Transcribe audio into subtitles for social videos.';
  if (name.includes('Video')) return 'Trim and convert short clips to GIFs for sharing.';
  if (name.includes('Word Counter')) return 'Count words and characters for captions and limits.';
  return '';
}

export default CreatorTools;
