import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CaseSensitive, Copy, Trash2, CheckCircle } from 'lucide-react';

const TextCaseConverter: React.FC = () => {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const convertCase = (type: string) => {
    switch (type) {
      case 'uppercase':
        setText(text.toUpperCase());
        break;
      case 'lowercase':
        setText(text.toLowerCase());
        break;
      case 'sentencecase':
        setText(text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase()));
        break;
      case 'titlecase':
        setText(text.toLowerCase().replace(/\b\w/g, c => c.toUpperCase()));
        break;
      default:
        break;
    }
  };

  const conversionButtons = [
    { type: 'uppercase', label: 'UPPERCASE' },
    { type: 'lowercase', label: 'lowercase' },
    { type: 'sentencecase', label: 'Sentence case' },
    { type: 'titlecase', label: 'Title Case' },
  ];

  return (
    <div className="min-h-[calc(100vh-8rem)] py-12 text-brand-foreground">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
            <CaseSensitive className="w-8 h-8 text-accent-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-brand-foreground mb-4">
            Text Case Converter
          </h1>
          <p className="text-xl text-brand-muted max-w-2xl mx-auto">
            Easily convert your text between different letter cases.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-brand-card border border-brand-border rounded-xl shadow-lg p-8"
        >
          <div className="relative">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste or type your text here..."
              className="w-full px-4 py-3 bg-brand-background border-2 border-brand-border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent h-64 resize-none text-brand-foreground placeholder-brand-muted"
            />
            <div className="absolute top-3 right-3 flex space-x-2">
              <button
                onClick={handleCopy}
                className="p-2 bg-brand-background rounded-md hover:bg-brand-border/50 transition-colors"
                title="Copy"
                data-cursor-hover
              >
                {copied ? <CheckCircle className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5 text-brand-muted" />}
              </button>
              <button
                onClick={() => setText('')}
                className="p-2 bg-brand-background rounded-md hover:bg-brand-border/50 transition-colors"
                title="Clear"
                data-cursor-hover
              >
                <Trash2 className="w-5 h-5 text-brand-muted" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {conversionButtons.map(btn => (
              <button
                key={btn.type}
                onClick={() => convertCase(btn.type)}
                className="bg-accent/80 text-accent-foreground py-3 rounded-lg hover:bg-accent transition-colors font-medium"
                data-cursor-hover
              >
                {btn.label}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TextCaseConverter;
