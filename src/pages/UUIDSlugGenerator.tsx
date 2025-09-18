import React, { useState } from 'react';

function uuidv4(){
  const a = new Uint8Array(16); crypto.getRandomValues(a); a[6] = (a[6] & 0x0f) | 0x40; a[8] = (a[8] & 0x3f) | 0x80; const h = [...a].map((b,i)=> (i===4||i===6||i===8||i===10?'-':'') + b.toString(16).padStart(2,'0')).join(''); return h;
}
function slugify(s:string){ return s.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').replace(/--+/g,'-'); }

const UUIDSlugGenerator: React.FC = () => {
  const [uuid, setUuid] = useState(uuidv4());
  const [text, setText] = useState('');
  const [slug, setSlug] = useState('');
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-brand-foreground">
      <h1 className="text-3xl md:text-5xl font-bold mb-6">UUID & Slug Generator</h1>
      <div className="bg-brand-card border border-brand-border rounded-xl p-6 space-y-3">
        <div className="flex gap-2 items-center"><input readOnly value={uuid} className="flex-1 p-2 rounded border border-brand-border" /><button onClick={()=>setUuid(uuidv4())} className="bg-accent text-accent-foreground px-3 py-2 rounded">New UUID</button></div>
        <div className="flex gap-2 items-center"><input value={text} onChange={e=>{ setText(e.target.value); setSlug(slugify(e.target.value)); }} placeholder="Text to slugify" className="flex-1 p-2 rounded border border-brand-border" /><input readOnly value={slug} className="flex-1 p-2 rounded border border-brand-border" /></div>
      </div>
    </div>
  );
};

export default UUIDSlugGenerator;
