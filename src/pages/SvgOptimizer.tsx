import React, { useMemo, useState } from 'react';

function optimize(svg:string){
  let s = svg.replace(/<!--([\s\S]*?)-->/g,''); // remove comments
  s = s.replace(/>\s+</g,'><'); // trim whitespace between tags
  s = s.replace(/\s{2,}/g,' '); // collapse spaces
  s = s.trim();
  return s;
}

const SvgOptimizer: React.FC = () => {
  const [input,setInput]=useState('<svg><!-- demo --><rect width="100" height="100" fill="#6366F1"/></svg>');
  const out = useMemo(()=>optimize(input),[input]);
  const copy = async ()=>{ await navigator.clipboard.writeText(out); };
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-brand-foreground">
      <h1 className="text-3xl md:text-5xl font-bold mb-6">SVG Optimizer</h1>
      <textarea value={input} onChange={e=>setInput(e.target.value)} className="w-full h-48 p-3 rounded border" />
      <h2 className="mt-4 font-semibold">Optimized</h2>
      <textarea readOnly value={out} className="w-full h-48 p-3 rounded border" />
      <button onClick={copy} className="mt-2 bg-accent text-accent-foreground px-4 py-2 rounded">Copy</button>
    </div>
  );
};

export default SvgOptimizer;
