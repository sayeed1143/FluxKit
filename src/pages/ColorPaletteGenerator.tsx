import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Copy, CheckCircle, RefreshCw, Lock, Unlock, Image as ImageIcon, Download, Info } from 'lucide-react';
import PalettePreview from '../components/previews/PalettePreview';

const ColorPaletteGenerator: React.FC = () => {
  const [palette, setPalette] = useState<string[]>([]);
  const [lockedColors, setLockedColors] = useState<boolean[]>(Array(5).fill(false));
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [activeColorInfo, setActiveColorInfo] = useState<string | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const generateRandomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');

  const generatePalette = () => {
    const newPalette = Array(5).fill(null).map((_, index) => {
      return lockedColors[index] && palette[index] ? palette[index] : generateRandomColor();
    });
    setPalette(newPalette);
  };

  useEffect(() => {
    generatePalette();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedColor(text);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const toggleLock = (index: number) => {
    const newLocked = [...lockedColors];
    newLocked[index] = !newLocked[index];
    setLockedColors(newLocked);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          if (!ctx) return;
          ctx.drawImage(img, 0, 0);
          const newPalette = [];
          for (let i = 0; i < 5; i++) {
            const x = Math.floor(Math.random() * img.width);
            const y = Math.floor(Math.random() * img.height);
            const pixel = ctx.getImageData(x, y, 1, 1).data;
            const hex = `#${("000000" + ((pixel[0] << 16) | (pixel[1] << 8) | pixel[2]).toString(16)).slice(-6)}`;
            newPalette.push(hex);
          }
          setPalette(newPalette);
          setLockedColors(Array(5).fill(false));
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : null;
  };
  
  const hexToHsl = (hex: string) => {
      const rgb = hexToRgb(hex);
      if (!rgb) return null;
      let { r, g, b } = rgb;
      r /= 255; g /= 255; b /= 255;
      const max = Math.max(r, g, b), min = Math.min(r, g, b);
      let h=0, s=0; const l = (max + min) / 2;
      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
      }
      return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  }

  const getShadesTints = (color: string) => {
    const rgb = hexToRgb(color);
    if (!rgb) return { shades: [], tints: [] };
    const shades = Array(5).fill(0).map((_, i) => {
      const factor = (i + 1) * 0.15;
      const r = Math.round(rgb.r * (1 - factor));
      const g = Math.round(rgb.g * (1 - factor));
      const b = Math.round(rgb.b * (1 - factor));
      return `rgb(${r}, ${g}, ${b})`;
    });
    const tints = Array(5).fill(0).map((_, i) => {
      const factor = (i + 1) * 0.15;
      const r = Math.round(rgb.r + (255 - rgb.r) * factor);
      const g = Math.round(rgb.g + (255 - rgb.g) * factor);
      const b = Math.round(rgb.b + (255 - rgb.b) * factor);
      return `rgb(${r}, ${g}, ${b})`;
    });
    return { shades, tints };
  };

  const ColorInfoPanel = ({ color }: { color: string }) => {
    const rgb = hexToRgb(color);
    const hsl = hexToHsl(color);
    const { shades, tints } = getShadesTints(color);
    return (
        <motion.div initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: 10}} className="absolute bottom-full left-1/2 -translate-x-1/2 w-72 mb-3 bg-brand-card p-4 rounded-lg shadow-2xl z-20 border border-brand-border">
            <h4 className="font-bold text-lg mb-2 text-brand-foreground">{color.toUpperCase()}</h4>
            <div className="text-sm space-y-1 mb-3 text-brand-muted">
                <p><strong>RGB:</strong> {rgb ? `${rgb.r}, ${rgb.g}, ${rgb.b}` : 'N/A'}</p>
                <p><strong>HSL:</strong> {hsl ? `${hsl.h}, ${hsl.s}%, ${hsl.l}%` : 'N/A'}</p>
            </div>
            <div className="mb-3">
                <h5 className="font-semibold text-xs uppercase text-brand-muted mb-1">Shades</h5>
                <div className="flex rounded overflow-hidden h-6">{shades.map((s, i) => <div key={i} style={{backgroundColor: s}} className="flex-1"/>)}</div>
            </div>
            <div>
                <h5 className="font-semibold text-xs uppercase text-brand-muted mb-1">Tints</h5>
                <div className="flex rounded overflow-hidden h-6">{tints.map((t, i) => <div key={i} style={{backgroundColor: t}} className="flex-1"/>)}</div>
            </div>
             <div className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-brand-border"></div>
        </motion.div>
    );
  };

  const [roleMap, setRoleMap] = useState<{[k:string]:number}>({ bg:0, card:1, text:2, accent:3, muted:4 });

  // keep roleMap within palette bounds when palette changes
  React.useEffect(()=>{
    setRoleMap(prev=>{
      const newMap: any = {};
      ['bg','card','text','accent','muted'].forEach((r,i)=>{ newMap[r] = prev[r] && prev[r] < palette.length ? prev[r] : i; });
      return newMap;
    });
  },[palette]);

  const setRoleIndex = (role:string, idx:number)=> setRoleMap(prev=>({ ...prev, [role]: idx }));

  return (
    <div className="min-h-[calc(100vh-8rem)] py-12 text-brand-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Palette className="w-8 h-8 text-accent-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-brand-foreground mb-4">
            Advanced Color Palette Generator
          </h1>
          <p className="text-xl text-brand-muted max-w-2xl mx-auto">
            Create, explore, and export beautiful color schemes for your next project.
          </p>
        </motion.div>

        <motion.div layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-brand-card border border-brand-border rounded-xl shadow-lg p-8">
          <div className="flex flex-col md:flex-row h-[400px] rounded-lg overflow-hidden">
            {palette.map((color, index) => (
              <motion.div layout key={index} className="flex-1 flex flex-col justify-end items-center p-4 relative group" style={{ backgroundColor: color }}>
                <AnimatePresence>{activeColorInfo === color && <ColorInfoPanel color={color} />}</AnimatePresence>
                <div className="text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-2">
                  <span className="font-mono font-semibold text-lg bg-black/60 text-white px-3 py-1 rounded-md">
                    {color.toUpperCase()}
                  </span>
                  <div className="flex gap-2">
                    <button onClick={() => handleCopy(color)} className="p-2 bg-black/60 rounded-full" title="Copy HEX">
                      {copiedColor === color ? <CheckCircle className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5 text-white" />}
                    </button>
                    <button onClick={() => toggleLock(index)} className="p-2 bg-black/60 rounded-full" title={lockedColors[index] ? 'Unlock' : 'Lock'}>
                      {lockedColors[index] ? <Lock className="w-5 h-5 text-yellow-400" /> : <Unlock className="w-5 h-5 text-white" />}
                    </button>
                     <button onMouseEnter={() => setActiveColorInfo(color)} onMouseLeave={() => setActiveColorInfo(null)} className="p-2 bg-black/60 rounded-full" title="More Info">
                        <Info className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-2">
            {['bg','card','text','accent','muted'].map(role => (
              <div key={role} className="p-2 bg-brand-card border border-brand-border rounded">
                <label className="block text-xs text-brand-muted mb-1">{role.toUpperCase()}</label>
                <select value={roleMap[role]} onChange={e=>setRoleIndex(role, parseInt(e.target.value))} className="w-full p-2 rounded border">
                  {palette.map((c, i)=>(<option key={i} value={i}>{c}</option>))}
                </select>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-8">
             <div className="flex items-center gap-2">
                <button onClick={() => imageInputRef.current?.click()} className="inline-flex items-center space-x-2 bg-brand-border/50 text-brand-foreground px-4 py-2 rounded-lg hover:bg-brand-border/70 transition-colors" data-cursor-hover>
                    <ImageIcon className="w-5 h-5" />
                    <span>From Image</span>
                </button>
                <input type="file" ref={imageInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
            </div>
            <button onClick={generatePalette} className="inline-flex items-center space-x-2 bg-accent text-accent-foreground px-8 py-3 rounded-lg hover:bg-accent/90 transition-colors font-medium text-lg" data-cursor-hover>
              <RefreshCw className="w-5 h-5" />
              <span>Generate</span>
            </button>
             <button className="inline-flex items-center space-x-2 bg-brand-border/50 text-brand-foreground px-4 py-2 rounded-lg hover:bg-brand-border/70 transition-colors" data-cursor-hover>
                <Download className="w-5 h-5" />
                <span>Export</span>
            </button>
          </div>
        </motion.div>
        
        <PalettePreview palette={palette} />
      </div>
    </div>
  );
};

export default ColorPaletteGenerator;
