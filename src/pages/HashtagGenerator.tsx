import React, { useState } from 'react';

const MODEL_ORDER = [
  'google/gemini-2.5-flash-lite',
  'openai/gpt-4.1-nano',
  'google/gemini-2.5-flash-lite-preview-06-17',
];

const HashtagGenerator: React.FC = () => {
  const [text, setText] = useState('');
  const [platform, setPlatform] = useState('instagram');
  const [count, setCount] = useState(10);
  const [tone, setTone] = useState('engaging');
  const [loading, setLoading] = useState(false);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [caption, setCaption] = useState('');
  const [error, setError] = useState<string | null>(null);

  const generate = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setError(null);
    setHashtags([]);
    setCaption('');

    try {
      const res = await fetch('/api/openrouter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // provide a clear prompt to the serverless proxy which will call OpenRouter
          prompt: `Generate ${count} relevant hashtags for the following ${platform} post. Keep them in a single line separated by spaces and no extra commentary. Tone: ${tone}. Post text: ${text}`,
          modelOrder: MODEL_ORDER,
          max_tokens: 256,
        }),
      });

      if (!res.ok) {
        const body = await res.text();
        throw new Error(body || 'OpenRouter proxy error');
      }

      const data = await res.json();
      const raw = (data.text || '').trim();
      // attempt to split into hashtags
      const parsed = raw
        .replace(/\n/g, ' ')
        .split(/\s+/)
        .map(s => s.trim())
        .filter(Boolean)
        .map(s => (s.startsWith('#') ? s : '#' + s.replace(/[^a-zA-Z0-9_]/g, '')))
        .slice(0, count);

      setHashtags(parsed);

      // generate a caption using hashtags + a short AI line (second call)
      const captionPrompt = `Write an engaging ${platform} caption in ${tone} tone (one short paragraph) for this post: ${text}. Then append the following hashtags inline: ${parsed.join(' ')}.`;
      const capRes = await fetch('/api/openrouter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: captionPrompt, modelOrder: MODEL_ORDER, max_tokens: 220 }),
      });
      if (!capRes.ok) throw new Error('Caption generation failed');
      const capData = await capRes.json();
      setCaption(capData.text || '');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Generation failed');
    } finally {
      setLoading(false);
    }
  };

  const copy = async (str: string) => {
    await navigator.clipboard.writeText(str);
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] py-12 text-brand-foreground">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-5xl font-bold mb-6">Hashtag & AI Caption Generator</h1>
        <p className="text-brand-muted mb-6">Enter a short description of your post and generate optimized hashtags and an engaging caption.</p>

        <div className="bg-brand-card border border-brand-border rounded-xl p-6 space-y-4">
          <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Describe your post (what's happening, mood, keywords)..." className="w-full p-3 rounded border border-brand-border bg-brand-background text-brand-foreground" rows={5} />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <select value={platform} onChange={e => setPlatform(e.target.value)} className="p-2 rounded border bg-white">
              <option value="instagram">Instagram</option>
              <option value="youtube">YouTube</option>
              <option value="x">X (Twitter)</option>
              <option value="tiktok">TikTok</option>
              <option value="linkedin">LinkedIn</option>
            </select>
            <input type="number" min={3} max={30} value={count} onChange={e => setCount(parseInt(e.target.value || '10'))} className="p-2 rounded border" />
            <select value={tone} onChange={e => setTone(e.target.value)} className="p-2 rounded border bg-white">
              <option value="engaging">Engaging</option>
              <option value="professional">Professional</option>
              <option value="funny">Funny</option>
              <option value="short">Short</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={generate} disabled={loading} className="bg-accent text-accent-foreground px-4 py-2 rounded shadow">{loading ? 'Generating...' : 'Generate'}</button>
            <button onClick={() => { setText(''); setHashtags([]); setCaption(''); }} className="px-4 py-2 rounded border">Clear</button>
            {error && <div className="text-red-500">{error}</div>}
          </div>

          {hashtags.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Hashtags</h3>
              <div className="flex flex-wrap gap-2">
                {hashtags.map(h => (
                  <button key={h} onClick={() => copy(h)} className="px-3 py-1 bg-brand-background rounded-md border">{h}</button>
                ))}
              </div>
              <div className="mt-2">
                <button onClick={() => copy(hashtags.join(' '))} className="text-sm text-accent">Copy all</button>
              </div>
            </div>
          )}

          {caption && (
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Generated Caption</h3>
              <div className="bg-brand-background p-4 rounded border">{caption}</div>
              <div className="mt-2"><button onClick={() => copy(caption + '\n\n' + hashtags.join(' '))} className="text-sm text-accent">Copy caption + hashtags</button></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HashtagGenerator;
