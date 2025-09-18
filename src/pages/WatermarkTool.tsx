import React, { useEffect, useRef, useState } from 'react';

const WatermarkTool: React.FC = () => {
  const [src, setSrc] = useState<string | null>(null);
  const [text, setText] = useState('© ToolForge');
  const [opacity, setOpacity] = useState(0.5);
  const [size, setSize] = useState(32);
  const [position, setPosition] = useState('bottom-right');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const onFile = (f: File) => { const r = new FileReader(); r.onload=()=>setSrc(r.result as string); r.readAsDataURL(f); };

  useEffect(()=>{
    if(!src) return;
    const img = imgRef.current!; const canvas = canvasRef.current!; const ctx = canvas.getContext('2d')!;
    if(!img.complete) return;
    canvas.width = img.naturalWidth; canvas.height = img.naturalHeight; ctx.drawImage(img,0,0);
    ctx.globalAlpha = opacity; ctx.fillStyle = '#fff'; ctx.strokeStyle = 'rgba(0,0,0,0.6)'; ctx.lineWidth = Math.max(1, size/16);
    ctx.font = `${size}px Inter, system-ui, Arial`; ctx.textBaseline = 'bottom';
    const metrics = ctx.measureText(text); const padding = 16; let x = padding, y = canvas.height - padding;
    if(position.includes('right')) x = canvas.width - metrics.width - padding; if(position.includes('top')) y = size + padding;
    ctx.strokeText(text, x, y); ctx.fillText(text, x, y);
    ctx.globalAlpha = 1;
  },[src,text,opacity,size,position]);

  const download = ()=>{ const a=document.createElement('a'); a.href=canvasRef.current!.toDataURL('image/png'); a.download='watermarked.png'; a.click(); };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-brand-foreground">
      <h1 className="text-3xl md:text-5xl font-bold mb-6">Watermark Tool</h1>
      <input type="file" accept="image/*" onChange={e=>e.target.files&&onFile(e.target.files[0])} className="mb-4" />
      {src && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <input value={text} onChange={e=>setText(e.target.value)} className="w-full p-2 rounded border border-brand-border" />
            <label className="text-sm text-brand-muted">Opacity: {(opacity*100)|0}%</label>
            <input type="range" min={0.1} max={1} step={0.05} value={opacity} onChange={e=>setOpacity(parseFloat(e.target.value))} />
            <label className="text-sm text-brand-muted">Font size: {size}px</label>
            <input type="range" min={12} max={120} value={size} onChange={e=>setSize(parseInt(e.target.value))} />
            <select value={position} onChange={e=>setPosition(e.target.value)} className="w-full p-2 rounded border border-brand-border">
              <option value="top-left">Top Left</option>
              <option value="top-right">Top Right</option>
              <option value="bottom-left">Bottom Left</option>
              <option value="bottom-right">Bottom Right</option>
            </select>
            <button onClick={download} className="bg-accent text-accent-foreground px-4 py-2 rounded-lg">Download PNG</button>
          </div>
          <div>
            <img ref={imgRef} src={src} alt="original" onLoad={()=>{}} className="hidden" />
            <canvas ref={canvasRef} className="w-full border border-brand-border rounded" />
          </div>
        </div>
      )}
    </div>
  );
};

export default WatermarkTool;
