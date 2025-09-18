import React, { useMemo, useState } from 'react';

const WordCounter: React.FC = () => {
  const [text, setText] = useState('');
  const stats = useMemo(() => {
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s+/g, '').length;
    const words = (text.trim().match(/\b\w+\b/g) || []).length;
    const sentences = (text.match(/[.!?]+/g) || []).length;
    const paragraphs = text.split(/\n{2,}/).filter(Boolean).length || (text.trim()?1:0);
    const readingTimeMin = Math.max(1, Math.round(words / 200));
    return { chars, charsNoSpaces, words, sentences, paragraphs, readingTimeMin };
  }, [text]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-brand-foreground">
      <h1 className="text-3xl md:text-5xl font-bold mb-6">Instant Word & Character Counter</h1>
      <p className="text-brand-muted mb-6">Paste or type your text to see counts update instantly.</p>
      <textarea value={text} onChange={(e)=>setText(e.target.value)} placeholder="Start typing..." className="w-full h-64 p-4 rounded-lg border border-brand-border bg-brand-card focus:outline-none focus:ring-2 focus:ring-accent" />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        <Stat label="Words" value={stats.words} />
        <Stat label="Characters" value={stats.chars} />
        <Stat label="Characters (no spaces)" value={stats.charsNoSpaces} />
        <Stat label="Sentences" value={stats.sentences} />
        <Stat label="Paragraphs" value={stats.paragraphs} />
        <Stat label="Reading time" value={`${stats.readingTimeMin} min`} />
      </div>
    </div>
  );
};

const Stat: React.FC<{label:string; value: React.ReactNode}> = ({label, value}) => (
  <div className="bg-brand-card border border-brand-border rounded-xl p-4 text-center">
    <div className="text-sm text-brand-muted">{label}</div>
    <div className="text-2xl font-bold">{value}</div>
  </div>
);

export default WordCounter;
