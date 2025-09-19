import React, { useEffect, useRef, useState } from 'react';

const sizes = [16,32,48,64,96,128,192,256,512];

const FaviconGenerator: React.FC = () => {
  const [src,setSrc]=useState<string|nil>(null as any);
  const imgRef=useRef<HTMLImageElement>(null);

  const onFile=(f:File)=>{const r=new FileReader(); r.onload=()=>setSrc(r.result as string); r.readAsDataURL(f);};
  const download=(size:number)=>{
    const img=imgRef.current!; const c=document.createElement('canvas'); c.width=c.height=size; const ctx=c.getContext('2d')!;
    const side=Math.min(img.naturalWidth, img.naturalHeight); const sx=(img.naturalWidth-side)/2, sy=(img.naturalHeight-side)/2;
    ctx.drawImage(img, sx, sy, side, side, 0,0,size,size);
    const a=document.createElement('a'); a.href=c.toDataURL('image/png'); a.download=`favicon-${size}.png`; a.click();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-brand-foreground">
      <h1 className="text-3xl md:text-5xl font-bold mb-6">Favicon Generator</h1>
      <input type="file" accept="image/*,image/svg+xml" onChange={e=>e.target.files&&onFile(e.target.files[0])} />
      {src ? (
        <img ref={imgRef} src={src} alt="" className="hidden" onLoad={()=>{}} />
      ) : null}
      {src && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mt-4">
          {sizes.map(s=>(
            <button key={s} onClick={()=>download(s)} className="p-3 border rounded hover:bg-brand-background/60">{s}×{s}</button>
          ))}
        </div>
      )}
      <p className="text-xs text-brand-muted mt-3">ICO export is not supported in-browser; download PNG sizes.</p>
    </div>
  );
};

export default FaviconGenerator;
