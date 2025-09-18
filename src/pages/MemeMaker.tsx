import React, { useEffect, useRef, useState } from 'react';

const MemeMaker: React.FC = () => {
  const [src,setSrc]=useState<string|nil>(null as any);
  const [top,setTop]=useState('TOP TEXT');
  const [bottom,setBottom]=useState('BOTTOM TEXT');
  const [size,setSize]=useState(48);
  const canvasRef=useRef<HTMLCanvasElement>(null);
  const imgRef=useRef<HTMLImageElement>(null);

  const onFile=(f:File)=>{const r=new FileReader(); r.onload=()=>setSrc(r.result as string); r.readAsDataURL(f);};
  useEffect(()=>{
    if(!src) return; const img=imgRef.current!, c=canvasRef.current!, ctx=c.getContext('2d')!; if(!img.complete) return;
    c.width=img.naturalWidth; c.height=img.naturalHeight; ctx.drawImage(img,0,0);
    ctx.fillStyle='#fff'; ctx.strokeStyle='#000'; ctx.lineWidth=Math.max(2, size/10); ctx.textAlign='center'; ctx.font=`bold ${size}px Impact, Arial Black, Arial, sans-serif`;
    ctx.textBaseline='top'; ctx.strokeText(top, c.width/2, 10); ctx.fillText(top, c.width/2, 10);
    ctx.textBaseline='bottom'; ctx.strokeText(bottom, c.width/2, c.height-10); ctx.fillText(bottom, c.width/2, c.height-10);
  },[src,top,bottom,size]);
  const download=()=>{const a=document.createElement('a'); a.href=canvasRef.current!.toDataURL('image/png'); a.download='meme.png'; a.click();};

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-brand-foreground">
      <h1 className="text-3xl md:text-5xl font-bold mb-6">Meme / Text-on-Image</h1>
      <input type="file" accept="image/*" onChange={e=>e.target.files&&onFile(e.target.files[0])} />
      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <div className="space-y-2">
          <input value={top} onChange={e=>setTop(e.target.value)} className="w-full p-2 rounded border" />
          <input value={bottom} onChange={e=>setBottom(e.target.value)} className="w-full p-2 rounded border" />
          <label>Font size: {size}px</label>
          <input type="range" min={16} max={128} value={size} onChange={e=>setSize(parseInt(e.target.value))} />
          <button onClick={download} className="bg-accent text-accent-foreground px-4 py-2 rounded">Download PNG</button>
        </div>
        <div>
          <img ref={imgRef} src={src||''} alt="" onLoad={()=>{}} className="hidden" />
          <canvas ref={canvasRef} className="w-full border border-brand-border rounded" />
        </div>
      </div>
    </div>
  );
};

export default MemeMaker;
