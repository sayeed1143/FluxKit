import React, { useMemo, useRef, useState } from 'react';

function hex(c:number){return '#'+c.toString(16).padStart(6,'0');}

const PaletteFromImage: React.FC = () => {
  const [src,setSrc]=useState<string|nil>(null as any);
  const [count,setCount]=useState(8);
  const canvasRef=useRef<HTMLCanvasElement>(null);
  const imgRef=useRef<HTMLImageElement>(null);

  const onFile=(f:File)=>{const r=new FileReader(); r.onload=()=>setSrc(r.result as string); r.readAsDataURL(f);};

  const colors = useMemo(()=>{
    const canvas = canvasRef.current; const img = imgRef.current; if(!canvas||!img||!src) return [] as string[];
    const w = 200; const h = Math.round((img.naturalHeight/img.naturalWidth)*w);
    canvas.width=w; canvas.height=h; const ctx=canvas.getContext('2d')!; ctx.drawImage(img,0,0,w,h);
    const data = ctx.getImageData(0,0,w,h).data; const map = new Map<number,number>();
    for(let i=0;i<data.length;i+=4){ const r=data[i], g=data[i+1], b=data[i+2], a=data[i+3]; if(a<64) continue; const key=(r&0xF0)<<16 | (g&0xF0)<<8 | (b&0xF0); map.set(key,(map.get(key)||0)+1); }
    return [...map.entries()].sort((a,b)=>b[1]-a[1]).slice(0,count).map(([k])=>hex(k));
  },[src,count]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-brand-foreground">
      <h1 className="text-3xl md:text-5xl font-bold mb-6">Palette from Image</h1>
      <input type="file" accept="image/*" onChange={e=>e.target.files&&onFile(e.target.files[0])} className="mb-4" />
      {src ? (
        <img ref={imgRef} src={src} alt="" onLoad={()=>{}} className="hidden" />
      ) : null}
      <canvas ref={canvasRef} className="hidden" />
      <div className="flex items-center gap-4 mb-4"><label>Colors: {count}</label><input type="range" min={3} max={16} value={count} onChange={e=>setCount(parseInt(e.target.value))} /></div>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
        {colors.map(c=> (
          <div key={c} className="rounded-lg border border-brand-border overflow-hidden">
            <div className="h-16" style={{backgroundColor:c}} />
            <div className="p-2 text-center text-sm">{c}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaletteFromImage;
