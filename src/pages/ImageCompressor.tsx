import React, { useRef, useState } from 'react';

const ImageCompressor: React.FC = () => {
  const [src, setSrc] = useState<string | null>(null);
  const [quality, setQuality] = useState(0.8);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const onFile = (f: File) => {
    const reader = new FileReader();
    reader.onload = () => setSrc(reader.result as string);
    reader.readAsDataURL(f);
  };

  const download = () => {
    const canvas = canvasRef.current!;
    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/jpeg', quality);
    a.download = 'compressed.jpg';
    a.click();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-brand-foreground">
      <h1 className="text-3xl md:text-5xl font-bold mb-6">Image Compressor</h1>
      <input type="file" accept="image/*" onChange={e=>e.target.files&&onFile(e.target.files[0])} className="mb-4" />
      {src && (
        <div className="space-y-4">
          <img ref={imgRef} src={src} alt="original" onLoad={()=>{
            const img = imgRef.current!;
            const canvas = canvasRef.current!;
            const ctx = canvas.getContext('2d')!;
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            ctx.drawImage(img,0,0);
          }} className="max-w-full rounded" />
          <div>
            <label className="text-sm text-brand-muted">Quality: {(quality*100)|0}%</label>
            <input type="range" min={0.1} max={1} step={0.01} value={quality} onChange={e=>setQuality(parseFloat(e.target.value))} className="w-full" />
          </div>
          <canvas ref={canvasRef} className="hidden" />
          <button onClick={download} className="bg-accent text-accent-foreground px-4 py-2 rounded-lg">Download JPEG</button>
        </div>
      )}
    </div>
  );
};

export default ImageCompressor;
