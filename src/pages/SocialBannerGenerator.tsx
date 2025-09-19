import React, { useRef, useState } from 'react';

const presets = {
  Twitter: { w: 1500, h: 500 },
  YouTube: { w: 2560, h: 1440 },
  LinkedIn: { w: 1584, h: 396 },
  Thumbnail: { w: 1280, h: 720 },
};

const fonts = ['Inter, system-ui, Arial', 'Georgia, serif', 'Verdana, sans-serif', 'Impact, sans-serif'];

const SocialBannerGenerator: React.FC = () => {
  const [title,setTitle]=useState('Your Title');
  const [subtitle,setSubtitle]=useState('Subtitle goes here');
  const [from,setFrom]=useState('#6366F1');
  const [to,setTo]=useState('#2F4673');
  const [preset,setPreset]=useState<keyof typeof presets>('Thumbnail');
  const [imageSrc,setImageSrc]=useState<string|null>(null);
  const [titleColor,setTitleColor]=useState('#ffffff');
  const [subtitleColor,setSubtitleColor]=useState('rgba(255,255,255,0.9)');
  const [font,setFont]=useState(fonts[0]);
  const [titleX,setTitleX]=useState(0.08);
  const [titleY,setTitleY]=useState(0.42);
  const canvasRef=useRef<HTMLCanvasElement>(null);
  const imgRef=useRef<HTMLImageElement>(null);

  const onFile=(f:File)=>{const r=new FileReader(); r.onload=()=>setImageSrc(r.result as string); r.readAsDataURL(f);};

  const render=()=>{
    const {w,h}=presets[preset]; const c=canvasRef.current!; c.width=w; c.height=h; const ctx=c.getContext('2d')!;
    if(imageSrc){ const img=new Image(); img.onload=()=>{ ctx.drawImage(img,0,0,w,h); drawText(ctx,w,h); }; img.src=imageSrc; return; }
    const g=ctx.createLinearGradient(0,0,w,h); g.addColorStop(0,from); g.addColorStop(1,to); ctx.fillStyle=g; ctx.fillRect(0,0,w,h);
    drawText(ctx,w,h);
  };

  const drawText = (ctx:CanvasRenderingContext2D, w:number, h:number) =>{
    ctx.fillStyle=titleColor; ctx.font='bold '+Math.round(h*0.14)+'px '+font; ctx.textAlign='left'; ctx.fillText(title, Math.round(w*titleX), Math.round(h*titleY));
    ctx.fillStyle=subtitleColor; ctx.font='normal '+Math.round(h*0.07)+'px '+font; ctx.fillText(subtitle, Math.round(w*titleX), Math.round(h*(titleY+0.16)));
  };

  const download=()=>{ const a=document.createElement('a'); a.href=canvasRef.current!.toDataURL('image/png'); a.download=`${preset.toLowerCase()}.png`; a.click(); };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-brand-foreground">
      <h1 className="text-3xl md:text-5xl font-bold mb-6">Social Banner & Thumbnail Maker</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <select value={preset} onChange={e=>setPreset(e.target.value as any)} className="p-2 rounded border border-brand-border">
            {Object.keys(presets).map(p=>(<option key={p} value={p}>{p}</option>))}
          </select>
          <input value={title} onChange={e=>setTitle(e.target.value)} className="w-full p-2 rounded border" placeholder="Title" />
          <input value={subtitle} onChange={e=>setSubtitle(e.target.value)} className="w-full p-2 rounded border" placeholder="Subtitle" />

          <div>
            <label className="block text-sm">Background Image (optional)</label>
            <input type="file" accept="image/*" onChange={e=>e.target.files&&onFile(e.target.files[0])} />
          </div>

          <div className="flex items-center gap-4"><label>From</label><input type="color" value={from} onChange={e=>setFrom(e.target.value)} /><label>To</label><input type="color" value={to} onChange={e=>setTo(e.target.value)} /></div>
          <div className="flex items-center gap-4 mt-2">
            <label>Title color</label>
            <input type="color" value={titleColor} onChange={e=>setTitleColor(e.target.value)} />
            <label>Subtitle color</label>
            <input type="color" value={subtitleColor} onChange={e=>setSubtitleColor(e.target.value)} />
          </div>
          <div className="flex items-center gap-2 mt-2">
            <label>Font</label>
            <select value={font} onChange={e=>setFont(e.target.value)} className="p-2 rounded border">
              {fonts.map(f=> <option key={f} value={f}>{f.split(',')[0]}</option>)}
            </select>
          </div>

          <div className="mt-2">
            <label>Title position X: {Math.round(titleX*100)}%</label>
            <input type="range" min={0} max={100} value={Math.round(titleX*100)} onChange={e=>setTitleX(parseInt(e.target.value)/100)} className="w-full" />
            <label>Title position Y: {Math.round(titleY*100)}%</label>
            <input type="range" min={0} max={100} value={Math.round(titleY*100)} onChange={e=>setTitleY(parseInt(e.target.value)/100)} className="w-full" />
          </div>

          <div className="space-x-2"><button onClick={render} className="bg-brand-foreground text-brand-background px-4 py-2 rounded">Render</button><button onClick={download} className="bg-accent text-accent-foreground px-4 py-2 rounded">Download</button></div>
        </div>
        <canvas ref={canvasRef} className="w-full border rounded" />
      </div>
    </div>
  );
};

export default SocialBannerGenerator;
