import React from 'react';
import { motion } from 'framer-motion';
import { Image, Menu, Search } from 'lucide-react';

interface PalettePreviewProps {
  palette: string[];
}

const getContrastColor = (hexColor: string): string => {
  if (!hexColor) return '#000000';
  const r = parseInt(hexColor.substr(1, 2), 16);
  const g = parseInt(hexColor.substr(3, 2), 16);
  const b = parseInt(hexColor.substr(5, 2), 16);
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (yiq >= 128) ? '#000000' : '#FFFFFF';
};

const PalettePreview: React.FC<PalettePreviewProps> = ({ palette }) => {
  if (palette.length < 5) return null;

  const [bg, card, text, accent, muted] = palette;
  const accentContrast = getContrastColor(accent);
  const cardContrast = getContrastColor(card);
  const bgContrast = getContrastColor(bg);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto mt-8"
    >
      <h3 className="text-xl font-semibold text-center mb-4 text-brand-foreground">Live Website Preview</h3>
      <div className="rounded-xl overflow-hidden shadow-2xl border-4 border-brand-card">
        <div className="p-4" style={{ backgroundColor: bg, color: bgContrast }}>
          {/* Header */}
          <div className="flex justify-between items-center mb-4 px-2">
            <div className="w-6 h-6 rounded-full" style={{ backgroundColor: accent }}></div>
            <div className="flex space-x-4">
              <div className="w-12 h-3 rounded-full" style={{ backgroundColor: muted }}></div>
              <div className="w-12 h-3 rounded-full" style={{ backgroundColor: muted }}></div>
              <div className="w-12 h-3 rounded-full" style={{ backgroundColor: muted }}></div>
            </div>
            <Menu className="w-5 h-5" style={{ color: muted }} />
          </div>

          {/* Hero */}
          <div className="text-center p-8">
            <h1 className="text-3xl font-bold mb-2" style={{ color: text }}>Main Headline Here</h1>
            <p className="text-sm mb-4" style={{ color: muted }}>A subtitle that describes your amazing product.</p>
            <button className="px-6 py-2 rounded-md text-sm font-semibold" style={{ backgroundColor: accent, color: accentContrast }}>
              Call to Action
            </button>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="p-4 rounded-lg" style={{ backgroundColor: card, color: cardContrast }}>
                <div className="w-full h-12 rounded-md mb-3 flex items-center justify-center" style={{ backgroundColor: bg }}>
                    <Image className="w-6 h-6" style={{color: muted}}/>
                </div>
                <div className="w-3/4 h-3 rounded-full mb-2" style={{ backgroundColor: text, opacity: 0.8 }}></div>
                <div className="w-full h-2 rounded-full mb-1" style={{ backgroundColor: muted }}></div>
                <div className="w-2/3 h-2 rounded-full" style={{ backgroundColor: muted }}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PalettePreview;
