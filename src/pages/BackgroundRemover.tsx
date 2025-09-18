import React, { useEffect, useRef, useState } from 'react';

function hexToRgb(hex:string){ const n=parseInt(hex.replace('#',''),16); return {r:(n>>16)&255, g:(n>>8)&255, b:n&255}; }

const BackgroundRemover: React.FC = () => {
  const [src,setSrc]=useState<string|nil>(null as any);
  const [color,setColor]=useState('#00ff00');
  const [tol,setTol]=useState(60);
  const inRef=useRef<HTMLImageElement>(null); const outRef=useRef<HTMLCanvasElement>(null);
  const onFile=(f:File)=>{const r=new FileReader(); r.onload=()=>setSrc(r.result as string); r.readAsDataURL(f);};
  useEffect(()=>{ const img=inRef.current, c=outRef.current; if(!img||!c||!src||!img.complete) return; const ctx=c.getContext('2d')!; c.width=img.naturalWidth; c.height=img.naturalHeight; ctx.drawImage(img,0,0); const id=ctx.getImageData(0,0,c.width,c.height); const d=id.data; const {r:rr,g:gg,b:bb}=hexToRgb(color); for(let i=0;i<d.length;i+=4){ const dr=d[i]-rr,dg=d[i+1]-gg,db=d[i+2]-bb; if(Math.sqrt(dr*dr+dg*dg+db*db)<tol){ d[i+3]=0; } } ctx.putImageData(id,0,0); },[src,color,tol]);
  const download=()=>{const a=document.createElement('a'); a.href=outRef.current!.toDataURL('image/png'); a.download='bg-removed.png'; a.click();};

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-brand-foreground">
      <h1 className="text-3xl md:text-5xl font-bold mb-6">Background Remover (Chroma Key)</h1>
      <input type="file" accept="image/*" onChange={e=>e.target.files&&onFile(e.target.files[0])} />
      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <div className="space-y-3">
          <label>Remove color</label>
          <input type="color" value={color} onChange={e=>setColor(e.target.value)} />
          <label>Tolerance: {tol}</label>
          <input type="range" min={0} max={150} value={tol} onChange={e=>setTol(parseInt(e.target.value))} />
          <button onClick={download} className="bg-accent text-accent-foreground px-4 py-2 rounded">Download PNG</button>
        </div>
        <div>
          <img ref={inRef} src={src||''} alt="" onLoad={()=>{}} className="hidden" />
          <canvas ref={outRef} className="w-full border rounded" />
        </div>
      </div>
    </div>
  );
};

export default BackgroundRemover;
