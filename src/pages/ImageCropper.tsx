import React, { useEffect, useRef, useState } from 'react';

const ImageCropper: React.FC = () => {
  const [src,setSrc]=useState<string|nil>(null as any);
  const [x,setX]=useState(0); const [y,setY]=useState(0); const [w,setW]=useState(200); const [h,setH]=useState(200);
  const imgRef=useRef<HTMLImageElement>(null); const outRef=useRef<HTMLCanvasElement>(null);

  const onFile=(f:File)=>{const r=new FileReader(); r.onload=()=>setSrc(r.result as string); r.readAsDataURL(f);};
  useEffect(()=>{
    const img=imgRef.current; const c=outRef.current; if(!img||!c||!src||!img.complete) return; const ctx=c.getContext('2d')!; c.width=w; c.height=h; ctx.drawImage(img, x,y,w,h, 0,0,w,h);
  },[src,x,y,w,h]);
  const download=()=>{const a=document.createElement('a'); a.href=outRef.current!.toDataURL('image/png'); a.download='cropped.png'; a.click();};

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-brand-foreground">
      <h1 className="text-3xl md:text-5xl font-bold mb-6">Image Cropper</h1>
      <input type="file" accept="image/*" onChange={e=>e.target.files&&onFile(e.target.files[0])} />
      <div className="grid md:grid-cols-2 gap-4 mt-4 items-start">
        <div>
          <img ref={imgRef} src={src||''} alt="" onLoad={()=>{ setX(0); setY(0); setW(imgRef.current!.naturalWidth/2|0); setH(imgRef.current!.naturalHeight/2|0); }} className="max-w-full rounded border" />
          <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
            <label>X<input type="number" value={x} onChange={e=>setX(parseInt(e.target.value))} className="w-full p-1 rounded border"/></label>
            <label>Y<input type="number" value={y} onChange={e=>setY(parseInt(e.target.value))} className="w-full p-1 rounded border"/></label>
            <label>W<input type="number" value={w} onChange={e=>setW(parseInt(e.target.value))} className="w-full p-1 rounded border"/></label>
            <label>H<input type="number" value={h} onChange={e=>setH(parseInt(e.target.value))} className="w-full p-1 rounded border"/></label>
          </div>
        </div>
        <div>
          <canvas ref={outRef} className="w-full border rounded" />
          <button onClick={download} className="mt-2 bg-accent text-accent-foreground px-4 py-2 rounded">Download PNG</button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropper;
