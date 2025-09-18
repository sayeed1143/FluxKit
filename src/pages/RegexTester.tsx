import React, { useMemo, useState } from 'react';

const RegexTester: React.FC = () => {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [text, setText] = useState('');
  const result = useMemo(()=>{
    try {
      const re = new RegExp(pattern, flags);
      const matches = [...text.matchAll(re)].map(m=>({ match: m[0], index: m.index||0 }));
      return { error: '', matches };
    } catch (e:any) { return { error: e.message, matches: [] as any[] }; }
  },[pattern,flags,text]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-brand-foreground">
      <h1 className="text-3xl md:text-5xl font-bold mb-6">Regex Tester</h1>
      <div className="grid md:grid-cols-3 gap-4">
        <input value={pattern} onChange={e=>setPattern(e.target.value)} placeholder="Pattern" className="p-2 rounded border border-brand-border" />
        <input value={flags} onChange={e=>setFlags(e.target.value)} placeholder="Flags (e.g. gmi)" className="p-2 rounded border border-brand-border" />
        <div className="text-brand-muted">{result.error || `${result.matches.length} matches`}</div>
      </div>
      <textarea value={text} onChange={e=>setText(e.target.value)} className="w-full h-64 mt-4 p-3 rounded border border-brand-border" placeholder="Test text..." />
      {result.matches.length>0 && (
        <ul className="mt-4 space-y-1 text-sm text-brand-muted">
          {result.matches.slice(0,100).map((m,i)=>(<li key={i}><span className="text-brand-foreground">{m.match}</span> at {m.index}</li>))}
        </ul>
      )}
    </div>
  );
};

export default RegexTester;
