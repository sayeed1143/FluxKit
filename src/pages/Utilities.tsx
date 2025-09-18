import React from 'react';
import { Link } from 'react-router-dom';

const items = [
  { title: 'Image to Text (OCR)', link: '/image-to-text' },
  { title: 'Audio to Text', link: '/audio-to-text' },
  { title: 'File Compressor', link: '/file-compressor' },
  { title: 'QR Code Generator', link: '/qr-code-generator' },
];

const Utilities: React.FC = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-brand-foreground">
    <h1 className="text-4xl md:text-6xl font-extrabold mb-6">Utilities</h1>
    <p className="text-brand-muted text-lg mb-8">Powerful utilities like OCR, transcription, and file compression.</p>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.sort((a,b)=>a.title.localeCompare(b.title)).map(i=> (
        <Link key={i.title} to={i.link} className="bg-brand-card border border-brand-border rounded-lg p-4 hover:border-accent transition-colors" data-cursor-hover>
          {i.title}
        </Link>
      ))}
    </div>
  </div>
);

export default Utilities;
