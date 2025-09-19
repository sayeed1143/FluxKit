import React, { useEffect, useRef, useState } from 'react';

const MemeMaker: React.FC = () => {
  const [src,setSrc]=useState<string|null>(null);
  const [top,setTop]=useState('TOP TEXT');
  const [bottom,setBottom]=useState('BOTTOM TEXT');
  const [size,setSize]=useState(48);
  const [color,setColor]=useState('#ffffff');
  const [strokeColor,setStrokeColor]=useState('#000000');
  const [font,setFont]=useState('Impact, Arial Black, Arial, sans-serif');
  const canvasRef=useRef<HTMLCanvasElement>(null);
  const imgRef=useRef<HTMLImageElement>(null);

  const fonts = ['Impact, Arial Black, Arial, sans-serif', 'Inter, system-ui, Arial', 'Georgia, serif', 'Verdana, sans-serif'];

  const onFile=(f:File)=>{const r=new FileReader(); r.onload=()=>setSrc(r.result as string); r.readAsDataURL(f);};
  useEffect(()=>{
    if(!src) return; const img=imgRef.current!, c=canvasRef.current!, ctx=c.getContext('2d')!; if(!img.complete) return;
    c.width=img.naturalWidth; c.height=img.naturalHeight; ctx.clearRect(0,0,c.width,c.height); ctx.drawImage(img,0,0);
    ctx.fillStyle=color; ctx.strokeStyle=strokeColor; ctx.lineWidth=Math.max(2, size/10); ctx.textAlign='center'; ctx.font=`bold ${size}px ${font}`;
    ctx.textBaseline='top'; ctx.strokeText(top, c.width/2, 10); ctx.fillText(top, c.width/2, 10);
    ctx.textBaseline='bottom'; ctx.strokeText(bottom, c.width/2, c.height-10); ctx.fillText(bottom, c.width/2, c.height-10);
  },[src,top,bottom,size,color,strokeColor,font]);
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
          <div className="flex gap-2 items-center">
            <label>Text</label>
            <input type="color" value={color} onChange={e=>setColor(e.target.value)} />
            <label>Stroke</label>
            <input type="color" value={strokeColor} onChange={e=>setStrokeColor(e.target.value)} />
            <select value={font} onChange={e=>setFont(e.target.value)} className="p-2 rounded border">
              {fonts.map(f=> <option key={f} value={f}>{f.split(',')[0]}</option>)}
            </select>
          </div>
          <button onClick={download} className="bg-accent text-accent-foreground px-4 py-2 rounded">Download PNG</button>
        </div>
        <div>
          {src ? (
            <img ref={imgRef} src={src} alt="" onLoad={()=>{}} className="hidden" />
          ) : null}
          <canvas ref={canvasRef} className="w-full border border-brand-border rounded" />
        </div>
      </div>
    </div>
  );
};

export default MemeMaker;
