import React, { useRef, useState } from 'react';

const presets = {
  Twitter: { w: 1500, h: 500 },
  YouTube: { w: 2560, h: 1440 },
  LinkedIn: { w: 1584, h: 396 },
  Thumbnail: { w: 1280, h: 720 },
};

const SocialBannerGenerator: React.FC = () => {
  const [title,setTitle]=useState('Your Title');
  const [subtitle,setSubtitle]=useState('Subtitle goes here');
  const [from,setFrom]=useState('#6366F1');
  const [to,setTo]=useState('#2F4673');
  const [preset,setPreset]=useState<keyof typeof presets>('Thumbnail');
  const canvasRef=useRef<HTMLCanvasElement>(null);

  const render=()=>{
    const {w,h}=presets[preset]; const c=canvasRef.current!; c.width=w; c.height=h; const ctx=c.getContext('2d')!;
    const g=ctx.createLinearGradient(0,0,w,h); g.addColorStop(0,from); g.addColorStop(1,to); ctx.fillStyle=g; ctx.fillRect(0,0,w,h);
    ctx.fillStyle='#fff'; ctx.font='bold '+Math.round(h*0.14)+'px Inter, system-ui'; ctx.textAlign='left'; ctx.fillText(title, Math.round(w*0.08), Math.round(h*0.42));
    ctx.fillStyle='rgba(255,255,255,0.9)'; ctx.font='normal '+Math.round(h*0.07)+'px Inter, system-ui'; ctx.fillText(subtitle, Math.round(w*0.08), Math.round(h*0.58));
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
          <div className="flex items-center gap-4"><label>From</label><input type="color" value={from} onChange={e=>setFrom(e.target.value)} /><label>To</label><input type="color" value={to} onChange={e=>setTo(e.target.value)} /></div>
          <div className="space-x-2"><button onClick={render} className="bg-brand-foreground text-brand-background px-4 py-2 rounded">Render</button><button onClick={download} className="bg-accent text-accent-foreground px-4 py-2 rounded">Download</button></div>
        </div>
        <canvas ref={canvasRef} className="w-full border rounded" />
      </div>
    </div>
  );
};

export default SocialBannerGenerator;
