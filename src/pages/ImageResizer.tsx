import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Scaling, Upload, Download, Trash2, Plus, ArrowRight } from 'lucide-react';

interface ImageFile {
  id: string;
  file: File;
  src: string;
  originalWidth: number;
  originalHeight: number;
}

const ImageResizer: React.FC = () => {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [width, setWidth] = useState(1080);
  const [height, setHeight] = useState(1080);
  const [outputFormat, setOutputFormat] = useState('image/jpeg');
  const [quality, setQuality] = useState(0.9);
  const [resizedPreview, setResizedPreview] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const presets = [
    { name: 'Instagram Post', w: 1080, h: 1080 },
    { name: 'Instagram Story', w: 1080, h: 1920 },
    { name: 'Facebook Cover', w: 851, h: 315 },
    { name: 'Twitter Header', w: 1500, h: 500 },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = new Image();
          img.onload = () => {
            const newImage: ImageFile = {
              id: `${file.name}-${Date.now()}`,
              file,
              src: img.src,
              originalWidth: img.width,
              originalHeight: img.height,
            };
            setImages(prev => [...prev, newImage]);
          };
          img.src = event.target?.result as string;
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (id: string) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };
  
  const applyPreset = (w: number, h: number) => {
      setWidth(w);
      setHeight(h);
  };

  const generateResizedPreview = () => {
    if (images.length !== 1 || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = images[0].src;
    img.onload = () => {
      canvas.width = width;
      canvas.height = height;
      ctx?.drawImage(img, 0, 0, width, height);
      const dataUrl = canvas.toDataURL(outputFormat, quality);
      setResizedPreview(dataUrl);
    };
  };

  useEffect(() => {
    generateResizedPreview();
  }, [images, width, height, outputFormat, quality]);

  const downloadAllImages = async () => {
    alert(`Simulating download of ${images.length} resized images as a ZIP file.`);
  };

  const SingleImageView = () => (
    <div className="md:col-span-2 grid grid-cols-2 gap-4 items-center">
        <div className="text-center">
            <h4 className="font-semibold mb-2">Before</h4>
            <img src={images[0].src} alt="Original" className="rounded-lg shadow-md w-full" />
            <p className="text-sm text-brand-muted mt-2">{images[0].originalWidth} x {images[0].originalHeight}px</p>
        </div>
        <div className="text-center">
            <h4 className="font-semibold mb-2">After</h4>
            {resizedPreview ? <img src={resizedPreview} alt="Resized" className="rounded-lg shadow-md w-full" /> : <div className="w-full h-48 bg-brand-background rounded-lg flex items-center justify-center">Loading...</div>}
            <p className="text-sm text-brand-muted mt-2">{width} x {height}px</p>
            {resizedPreview && <p className="text-xs text-brand-muted">Est. Size: {(resizedPreview.length * 0.75 / 1024).toFixed(1)} KB</p>}
        </div>
    </div>
  );

  const MultipleImageView = () => (
    <div className="md:col-span-2">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[500px] overflow-y-auto p-4 bg-brand-background rounded-lg">
            {images.map(img => (
                <div key={img.id} className="relative group">
                    <img src={img.src} alt={img.file.name} className="w-full h-32 object-cover rounded-md" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button onClick={() => removeImage(img.id)} className="p-2 bg-red-600/80 rounded-full text-white"><Trash2 className="w-5 h-5" /></button>
                    </div>
                    <p className="text-xs text-brand-muted truncate mt-1">{img.file.name}</p>
                </div>
            ))}
            <label htmlFor="image-upload-more" className="w-full h-32 border-2 border-dashed border-brand-border rounded-md flex flex-col items-center justify-center text-brand-muted hover:bg-brand-background/70 hover:border-accent cursor-pointer transition-colors">
                <Plus className="w-8 h-8" />
                <span className="text-sm mt-1">Add Images</span>
            </label>
            <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" id="image-upload-more" />
        </div>
    </div>
  );

  return (
    <div className="min-h-[calc(100vh-8rem)] py-12 text-brand-foreground">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Scaling className="w-8 h-8 text-accent-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-brand-foreground mb-4">Batch Image Resizer</h1>
          <p className="text-xl text-brand-muted max-w-2xl mx-auto">Resize multiple images with professional presets and quality controls.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-brand-card border border-brand-border rounded-xl shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Controls */}
            <div className="md:col-span-1 space-y-6">
              <h3 className="text-xl font-semibold">Resize Options</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-brand-muted mb-2">Width (px)</label>
                  <input type="number" value={width} onChange={(e) => setWidth(Number(e.target.value))} className="w-full px-4 py-2 bg-brand-background border border-brand-border rounded-lg text-brand-foreground" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-muted mb-2">Height (px)</label>
                  <input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} className="w-full px-4 py-2 bg-brand-background border border-brand-border rounded-lg text-brand-foreground" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-muted mb-2">Presets</label>
                <div className="flex flex-wrap gap-2">
                    {presets.map(p => <button key={p.name} onClick={() => applyPreset(p.w, p.h)} className="px-3 py-1 bg-brand-background rounded-md text-sm hover:bg-brand-border">{p.name}</button>)}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-muted mb-2">Output Format</label>
                <select value={outputFormat} onChange={(e) => setOutputFormat(e.target.value)} className="w-full px-4 py-2 bg-brand-background border border-brand-border rounded-lg text-brand-foreground">
                    <option value="image/jpeg">JPG</option><option value="image/png">PNG</option><option value="image/webp">WEBP</option>
                </select>
              </div>
              {(outputFormat === 'image/jpeg' || outputFormat === 'image/webp') && (
                <div>
                    <label className="block text-sm font-medium text-brand-muted mb-2">Quality: {Math.round(quality * 100)}%</label>
                    <input type="range" min="0.1" max="1" step="0.1" value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="w-full h-2 bg-brand-background rounded-lg appearance-none cursor-pointer accent-accent" />
                </div>
              )}
              <button onClick={downloadAllImages} disabled={images.length === 0} className="w-full inline-flex items-center justify-center space-x-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg hover:bg-accent/90 transition-colors font-medium disabled:opacity-50" data-cursor-hover>
                <Download className="w-5 h-5" />
                <span>Download All ({images.length})</span>
              </button>
            </div>

            {images.length === 0 ? (
                <div className="md:col-span-2 border-2 border-dashed border-brand-border rounded-lg p-12 text-center flex flex-col justify-center items-center">
                    <Upload className="w-12 h-12 text-brand-muted mx-auto mb-4" />
                    <p className="text-brand-muted mb-4">Drag & drop images here</p>
                    <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" id="image-upload-main" />
                    <label htmlFor="image-upload-main" className="inline-flex items-center space-x-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg cursor-pointer hover:bg-accent/90" data-cursor-hover>
                        <span>Choose Images</span>
                    </label>
                </div>
            ) : images.length === 1 ? <SingleImageView /> : <MultipleImageView />}
          </div>
          <canvas ref={canvasRef} className="hidden"></canvas>
        </motion.div>
      </div>
    </div>
  );
};

export default ImageResizer;
