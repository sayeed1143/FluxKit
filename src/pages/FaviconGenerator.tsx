import React, { useEffect, useRef, useState } from 'react';

const sizes = [16,32,48,64,96,128,192,256,512];
const fonts = ['Inter, system-ui, Arial', 'Georgia, serif', 'Times New Roman, serif', 'Verdana, sans-serif', 'Impact, sans-serif'];

const FaviconGenerator: React.FC = () => {
  const [src,setSrc]=useState<string|null>(null);
  const [char,setChar]=useState('');
  const [bgColor,setBgColor]=useState('#ffffff');
  const [textColor,setTextColor]=useState('#000000');
  const [font,setFont]=useState(fonts[0]);

  const imgRef=useRef<HTMLImageElement>(null);

  const onFile=(f:File)=>{const r=new FileReader(); r.onload=()=>setSrc(r.result as string); r.readAsDataURL(f);};

  const downloadImage = (canvas: HTMLCanvasElement, size:number) => {
    const a=document.createElement('a'); a.href=canvas.toDataURL('image/png'); a.download=`favicon-${size}.png`; a.click();
  };

  const downloadFromImage=(size:number)=>{
    const img=imgRef.current!; const c=document.createElement('canvas'); c.width=c.height=size; const ctx=c.getContext('2d')!;
    const side=Math.min(img.naturalWidth, img.naturalHeight); const sx=(img.naturalWidth-side)/2, sy=(img.naturalHeight-side)/2;
    ctx.drawImage(img, sx, sy, side, side, 0,0,size,size);
    downloadImage(c,size);
  };

  const downloadFromChar=(size:number)=>{
    const c=document.createElement('canvas'); c.width=c.height=size; const ctx=c.getContext('2d')!;
    ctx.fillStyle = bgColor; ctx.fillRect(0,0,size,size);
    ctx.fillStyle = textColor; const fontSize = Math.round(size*0.65);
    ctx.font = `bold ${fontSize}px ${font}`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(char.slice(0,1).toUpperCase(), size/2, size/2);
    downloadImage(c,size);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-brand-foreground">
      <h1 className="text-3xl md:text-5xl font-bold mb-6">Favicon Generator</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Upload image (or generate from text)</label>
            <input type="file" accept="image/*,image/svg+xml" onChange={e=>e.target.files&&onFile(e.target.files[0])} />
          </div>

          <div className="border rounded p-4">
            <label className="block text-sm mb-1">Or generate from text</label>
            <div className="flex gap-2 items-center mb-2">
              <input value={char} onChange={e=>setChar(e.target.value)} maxLength={1} placeholder="A" className="w-16 p-2 rounded border text-center" />
              <select value={font} onChange={e=>setFont(e.target.value)} className="p-2 rounded border">
                {fonts.map(f=>(<option key={f} value={f}>{f.split(',')[0]}</option>))}
              </select>
            </div>
            <div className="flex gap-2 items-center">
              <label>BG</label>
              <input type="color" value={bgColor} onChange={e=>setBgColor(e.target.value)} />
              <label>Text</label>
              <input type="color" value={textColor} onChange={e=>setTextColor(e.target.value)} />
            </div>
          </div>

          <p className="text-xs text-brand-muted mt-2">ICO export not supported in-browser; download PNG sizes.</p>
        </div>

        <div>
          {src ? (
            <>
              <img ref={imgRef} src={src} alt="uploaded" className="max-w-full mb-4 hidden" onLoad={()=>{}} />
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {sizes.map(s=>(
                  <button key={s} onClick={()=>downloadFromImage(s)} className="p-3 border rounded hover:bg-brand-background/60">{s}×{s}</button>
                ))}
              </div>
            </>
          ) : (
            <div className="bg-brand-card border border-brand-border rounded p-6 text-center">
              <div className="w-24 h-24 mx-auto rounded-md flex items-center justify-center mb-4" style={{ backgroundColor: bgColor }}>
                <span style={{ color: textColor, fontFamily: font, fontSize: 40, fontWeight: 700 }}>{char ? char[0].toUpperCase() : '?'}</span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {sizes.map(s=>(
                  <button key={s} onClick={()=>downloadFromChar(s)} className="p-3 border rounded hover:bg-brand-background/60">{s}×{s}</button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FaviconGenerator;
