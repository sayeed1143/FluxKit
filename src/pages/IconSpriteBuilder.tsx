import React, { useState } from 'react';

const IconSpriteBuilder: React.FC = () => {
  const [sprite,setSprite]=useState('<svg xmlns="http://www.w3.org/2000/svg" style="display:none"></svg>');

  const onFiles = async (files: FileList) => {
    const symbols: string[] = [];
    for(const f of Array.from(files)){
      const txt = await f.text();
      const inner = txt.replace(/^[\s\S]*?<svg[\s\S]*?>/,'').replace(/<\/svg>[\s\S]*$/,'');
      const id = f.name.replace(/\.[^/.]+$/,'');
      symbols.push(`<symbol id="${id}" viewBox="0 0 24 24">${inner}</symbol>`);
    }
    setSprite(`<svg xmlns="http://www.w3.org/2000/svg" style="display:none">${symbols.join('')}</svg>`);
  };

  const download=()=>{ const a=document.createElement('a'); const blob=new Blob([sprite],{type:'image/svg+xml'}); a.href=URL.createObjectURL(blob); a.download='sprite.svg'; a.click(); };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-brand-foreground">
      <h1 className="text-3xl md:text-5xl font-bold mb-6">Icon Spritesheet Builder</h1>
      <input type="file" accept="image/svg+xml" multiple onChange={e=>e.target.files&&onFiles(e.target.files)} />
      <div className="mt-4 bg-brand-card border border-brand-border rounded p-3 text-sm overflow-auto h-64">{sprite}</div>
      <button onClick={download} className="mt-3 bg-accent text-accent-foreground px-4 py-2 rounded">Download Sprite</button>
    </div>
  );
};

export default IconSpriteBuilder;
