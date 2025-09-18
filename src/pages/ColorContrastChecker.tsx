import React, { useMemo, useState } from 'react';

function luminance(hex:string){
  const c = hex.replace('#','');
  const rgb = [0,1,2].map(i=>parseInt(c.slice(i*2,i*2+2),16)/255).map(v=>v<=0.03928? v/12.92 : Math.pow((v+0.055)/1.055,2.4));
  return 0.2126*rgb[0]+0.7152*rgb[1]+0.0722*rgb[2];
}
function ratio(fg:string,bg:string){ const L1=luminance(fg), L2=luminance(bg); const [a,b]=[L1,L2].sort((x,y)=>y-x); return (a+0.05)/(b+0.05); }

const ColorContrastChecker: React.FC = () => {
  const [fg, setFg] = useState('#111111');
  const [bg, setBg] = useState('#ffffff');
  const r = useMemo(()=>ratio(fg,bg),[fg,bg]);
  const passAA = r >= 4.5; const passAAA = r >= 7;
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-brand-foreground">
      <h1 className="text-3xl md:text-5xl font-bold mb-6">Color Contrast Checker</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-brand-card border border-brand-border rounded p-4">
          <label className="block text-sm mb-2">Foreground</label>
          <input type="color" value={fg} onChange={e=>setFg(e.target.value)} />
        </div>
        <div className="bg-brand-card border border-brand-border rounded p-4">
          <label className="block text-sm mb-2">Background</label>
          <input type="color" value={bg} onChange={e=>setBg(e.target.value)} />
        </div>
      </div>
      <div className="mt-6 p-6 rounded-xl border" style={{backgroundColor:bg,color:fg}}>
        <p className="text-lg">Sample text preview</p>
      </div>
      <div className="mt-4 text-brand-muted">Contrast ratio: <span className="font-bold text-brand-foreground">{r.toFixed(2)}:1</span> — AA: {passAA? 'Pass':'Fail'} · AAA: {passAAA? 'Pass':'Fail'}</div>
    </div>
  );
};

export default ColorContrastChecker;
