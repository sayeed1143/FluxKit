import React, { useRef, useState } from 'react';

const WatermarkRemover: React.FC = () => {
  const [src, setSrc] = useState<string | null>(null);
  const [mode, setMode] = useState<'blur'|'fill'|'crop'>('blur');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const rectRef = useRef<{x:number,y:number,w:number,h:number}|null>(null);

  const onFile=(f:File)=>{const r=new FileReader(); r.onload=()=>setSrc(r.result as string); r.readAsDataURL(f);};

  const render = ()=>{
    if(!src) return; const img=imgRef.current!, c=canvasRef.current!, ctx=c.getContext('2d')!; if(!img.complete) return;
    c.width=img.naturalWidth; c.height=img.naturalHeight; ctx.clearRect(0,0,c.width,c.height); ctx.drawImage(img,0,0);
  };

  const apply = ()=>{
    const rect = rectRef.current; const c=canvasRef.current!, ctx=c.getContext('2d')!; if(!rect) return;
    const {x,y,w,h}=rect;
    if(mode==='crop'){
      const canvas=document.createElement('canvas'); canvas.width=w; canvas.height=h; const cc=canvas.getContext('2d')!; cc.drawImage(c, x,y,w,h, 0,0,w,h); const a=document.createElement('a'); a.href=canvas.toDataURL('image/png'); a.download='cropped.png'; a.click(); return;
    }
    const imageData = ctx.getImageData(x,y,w,h);
    const data = imageData.data;
    // simple blur/fill: replace each pixel with average of neighbors (box blur)
    if(mode==='blur'){
      const radius=5; const out = new Uint8ClampedArray(data.length);
      for(let py=0; py<h; py++){
        for(let px=0; px<w; px++){
          let r=0,g=0,b=0,a=0,count=0;
          for(let oy=-radius; oy<=radius; oy++){
            for(let ox=-radius; ox<=radius; ox++){
              const nx=px+ox, ny=py+oy; if(nx<0||ny<0||nx>=w||ny>=h) continue; const idx=(ny*w+nx)*4; r+=data[idx]; g+=data[idx+1]; b+=data[idx+2]; a+=data[idx+3]; count++;
            }
          }
          const i=(py*w+px)*4; out[i]=r/count; out[i+1]=g/count; out[i+2]=b/count; out[i+3]=a/count;
        }
      }
      const newImg = new ImageData(out, w, h);
      ctx.putImageData(newImg, x, y);
    }
    if(mode==='fill'){
      // fill with surrounding average color
      let r=0,g=0,b=0,count=0; const pad=5;
      for(let ix=-pad; ix<=pad; ix++){
        for(let iy=-pad; iy<=pad; iy++){
          const sx = Math.max(0, Math.min(c.width-1, x + (ix<0? -1: w+ (ix>0?1:0))));
          const sy = Math.max(0, Math.min(c.height-1, y + (iy<0? -1: h+ (iy>0?1:0))));
          const p = ctx.getImageData(sx, sy, 1, 1).data; r+=p[0]; g+=p[1]; b+=p[2]; count++;
        }
      }
      const avg = `rgb(${Math.round(r/count)},${Math.round(g/count)},${Math.round(b/count)})`;
      ctx.fillStyle = avg; ctx.fillRect(x,y,w,h);
    }
    const a=document.createElement('a'); a.href=c.toDataURL('image/png'); a.download='watermark-removed.png'; a.click();
  };

  // rectangle drawing handlers
  const drawing = useRef(false);
  const start = useRef({sx:0, sy:0});
  const onDown = (e: React.MouseEvent<HTMLCanvasElement>)=>{
    const c = canvasRef.current!; const rect=c.getBoundingClientRect(); drawing.current=true; start.current={sx:e.clientX-rect.left, sy:e.clientY-rect.top};
  };
  const onMove = (e: React.MouseEvent<HTMLCanvasElement>)=>{
    if(!drawing.current) return; const c=canvasRef.current!; const rect=c.getBoundingClientRect(); const sx=start.current.sx, sy=start.current.sy; const cx=e.clientX-rect.left, cy=e.clientY-rect.top; const x=Math.min(sx,cx), y=Math.min(sy,cy), w=Math.abs(cx-sx), h=Math.abs(cy-sy);
    // render overlay
    render(); const ctx=c.getContext('2d')!; ctx.strokeStyle='red'; ctx.lineWidth=2; ctx.strokeRect(x,y,w,h); rectRef.current={x:Math.round(x),y:Math.round(y),w:Math.round(w),h:Math.round(h)};
  };
  const onUp = ()=>{ drawing.current=false; };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-brand-foreground">
      <h1 className="text-3xl md:text-5xl font-bold mb-6">Watermark Remover (safe tools)</h1>
      <p className="text-brand-muted mb-4">Select the watermark region and choose an action: Blur region, Fill with surrounding color, or Crop it out.</p>
      <input type="file" accept="image/*" onChange={e=>e.target.files&&onFile(e.target.files[0])} />
      <div className="mt-4 flex gap-3 items-center">
        <select value={mode} onChange={e=>setMode(e.target.value as any)} className="p-2 rounded border">
          <option value="blur">Blur region</option>
          <option value="fill">Fill with surrounding</option>
          <option value="crop">Crop region</option>
        </select>
        <button onClick={render} className="px-4 py-2 rounded bg-brand-border/50">Render</button>
        <button onClick={apply} className="px-4 py-2 rounded bg-accent text-accent-foreground">Apply & Download</button>
      </div>

      <div className="mt-4">
        <img ref={imgRef} src={src||''} alt="" className="hidden" onLoad={render} />
        <canvas ref={canvasRef} onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp} className="w-full border rounded" />
        <p className="text-sm text-brand-muted mt-2">Tip: Drag on the image to draw a selection rectangle around the watermark.</p>
      </div>
    </div>
  );
};

export default WatermarkRemover;
