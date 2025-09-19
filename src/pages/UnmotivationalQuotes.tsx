import React, { useState } from 'react';

const MODEL_ORDER = [
  'google/gemini-2.5-flash-lite',
  'openai/gpt-4.1-nano',
  'google/gemini-2.5-flash-lite-preview-06-17',
];

const UnmotivationalQuotes: React.FC = () => {
  const [count, setCount] = useState(5);
  const [loading, setLoading] = useState(false);
  const [quotes, setQuotes] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const generate = async () => {
    setLoading(true); setError(null); setQuotes([]);
    try{
      const prompt = `Generate ${count} short unmotivational one-line quotes. Keep them witty, concise, and each on its own line.`;
      const res = await fetch('/api/openrouter', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ prompt, modelOrder: MODEL_ORDER, max_tokens: 300 }) });
      if(!res.ok) throw new Error(await res.text());
      const data = await res.json(); const raw = data.text || '';
      const items = raw.split(/\n+/).map(s=>s.trim()).filter(Boolean).slice(0,count);
      setQuotes(items);
    }catch(err:any){ setError(err.message||'Failed'); }
    setLoading(false);
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] py-12 text-brand-foreground">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-4">Unmotivational Quotes Generator</h1>
        <p className="text-brand-muted mb-4">Generate a list of unmotivational one-liners for fun content.</p>
        <div className="flex gap-2 items-center mb-4">
          <input type="number" min={1} max={20} value={count} onChange={e=>setCount(parseInt(e.target.value||'5'))} className="p-2 rounded border w-24" />
          <button onClick={generate} className="px-4 py-2 bg-accent text-accent-foreground rounded">{loading? 'Generating...':'Generate'}</button>
          {error && <div className="text-red-500 ml-2">{error}</div>}
        </div>
        <div className="bg-brand-card border border-brand-border rounded p-4">
          {quotes.length===0 ? <div className="text-brand-muted">No quotes yet.</div> : (
            <ol className="list-decimal list-inside space-y-2">
              {quotes.map((q,i)=>(<li key={i}>{q}</li>))}
            </ol>
          )}
        </div>
      </div>
    </div>
  );
};

export default UnmotivationalQuotes;
