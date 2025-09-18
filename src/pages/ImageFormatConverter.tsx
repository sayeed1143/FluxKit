import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FileImage, Upload, Download, Trash2, Plus } from 'lucide-react';

type ImageFormat = 'image/png' | 'image/jpeg' | 'image/webp' | 'image/bmp' | 'image/gif';

interface ImageFile {
  id: string;
  file: File;
  src: string;
}

const ImageFormatConverter: React.FC = () => {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [targetFormat, setTargetFormat] = useState<ImageFormat>('image/png');
  const [quality, setQuality] = useState(0.9);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const newImage: ImageFile = {
            id: `${file.name}-${Date.now()}`,
            file,
            src: event.target?.result as string,
          };
          setImages(prev => [...prev, newImage]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (id: string) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  const downloadAllImages = () => {
    alert(`Simulating download of ${images.length} converted images as a ZIP file.`);
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] py-12 text-brand-foreground">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-lime-500 to-lime-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FileImage className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-brand-foreground to-brand-muted mb-4">
            Batch Image Format Converter
          </h1>
          <p className="text-xl text-brand-muted max-w-2xl mx-auto">
            Convert multiple images between different formats with quality control.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-brand-card/50 border border-brand-border/30 rounded-xl shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Controls */}
            <div className="md:col-span-1 space-y-6">
              <h3 className="text-xl font-semibold">Conversion Options</h3>
              <div>
                <label htmlFor="format" className="block text-sm font-medium text-brand-muted mb-2">Convert to:</label>
                <select id="format" value={targetFormat} onChange={(e) => setTargetFormat(e.target.value as ImageFormat)} className="w-full px-4 py-3 bg-primary-950 border-2 border-brand-border/50 rounded-lg text-brand-foreground">
                  <option value="image/png">PNG</option>
                  <option value="image/jpeg">JPG</option>
                  <option value="image/webp">WEBP</option>
                  <option value="image/bmp">BMP</option>
                  <option value="image/gif">GIF</option>
                </select>
              </div>
              {(targetFormat === 'image/jpeg' || targetFormat === 'image/webp') && (
                  <div>
                      <label className="block text-sm font-medium text-brand-muted mb-2">Quality: {Math.round(quality * 100)}%</label>
                      <input type="range" min="0.1" max="1" step="0.1" value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="w-full h-2 bg-primary-900 rounded-lg appearance-none cursor-pointer accent-accent-DEFAULT" />
                  </div>
              )}
              <button onClick={downloadAllImages} disabled={images.length === 0} className="w-full inline-flex items-center justify-center space-x-2 bg-accent-DEFAULT text-white px-6 py-3 rounded-lg hover:bg-accent-DEFAULT/90 transition-colors font-medium disabled:opacity-50" data-cursor-hover>
                <Download className="w-5 h-5" />
                <span>Convert & Download All ({images.length})</span>
              </button>
            </div>

            {/* Image List */}
            <div className="md:col-span-2">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[500px] overflow-y-auto p-4 bg-primary-950/50 rounded-lg">
                    {images.map(img => (
                        <div key={img.id} className="relative group">
                            <img src={img.src} alt={img.file.name} className="w-full h-32 object-cover rounded-md" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <button onClick={() => removeImage(img.id)} className="p-2 bg-red-600/80 rounded-full text-white">
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                            <p className="text-xs text-brand-muted truncate mt-1">{img.file.name}</p>
                        </div>
                    ))}
                    <label htmlFor="image-upload-more" className="w-full h-32 border-2 border-dashed border-brand-border/50 rounded-md flex flex-col items-center justify-center text-brand-muted hover:bg-primary-950 hover:border-accent-DEFAULT cursor-pointer transition-colors">
                        <Plus className="w-8 h-8" />
                        <span className="text-sm mt-1">Add Images</span>
                    </label>
                    <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" id="image-upload-more" />
                </div>
            </div>
          </div>
          <canvas ref={canvasRef} className="hidden"></canvas>
        </motion.div>
      </div>
    </div>
  );
};

export default ImageFormatConverter;
