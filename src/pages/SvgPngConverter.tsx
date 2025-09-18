import React, { useRef, useState } from 'react';

const SvgPngConverter: React.FC = () => {
  const [svg,setSvg]=useState('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#6366F1"/></svg>');
  const [scale,setScale]=useState(4);
  const canvasRef=useRef<HTMLCanvasElement>(null);

  const render=()=>{
    const blob=new Blob([svg],{type:'image/svg+xml'}); const url=URL.createObjectURL(blob);
    const img=new Image(); img.onload=()=>{ const c=canvasRef.current!; const w=img.width*scale, h=img.height*scale; c.width=w; c.height=h; const ctx=c.getContext('2d')!; ctx.clearRect(0,0,w,h); ctx.drawImage(img,0,0,w,h); URL.revokeObjectURL(url); };
    img.src=url;
  };
  const download=()=>{ const a=document.createElement('a'); a.href=canvasRef.current!.toDataURL('image/png'); a.download='converted.png'; a.click(); };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-brand-foreground">
      <h1 className="text-3xl md:text-5xl font-bold mb-6">SVG → PNG Converter</h1>
      <textarea value={svg} onChange={e=>setSvg(e.target.value)} className="w-full h-48 p-3 rounded border border-brand-border" />
      <div className="flex items-center gap-4 mt-3"><label>Scale: {scale}×</label><input type="range" min={1} max={8} value={scale} onChange={e=>setScale(parseInt(e.target.value))} /></div>
      <div className="mt-3 space-x-2"><button onClick={render} className="bg-brand-foreground text-brand-background px-4 py-2 rounded">Render</button><button onClick={download} className="bg-accent text-accent-foreground px-4 py-2 rounded">Download PNG</button></div>
      <canvas ref={canvasRef} className="w-full border rounded mt-4" />
    </div>
  );
};

export default SvgPngConverter;
