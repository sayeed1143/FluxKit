import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Copy, Trash2, CheckCircle, Zap, ZapOff, AlertCircle } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeFormatter: React.FC = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('json');
  const [indent, setIndent] = useState(2);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCopy = async () => {
    if (!code) return;
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFormat = (minify = false) => {
    setError(null);
    try {
      if (language === 'json' && code) {
        const parsed = JSON.parse(code);
        setCode(JSON.stringify(parsed, null, minify ? 0 : indent));
      } else {
        setError(`Formatting for ${language.toUpperCase()} is a premium feature coming soon!`);
      }
    } catch (err) {
      setError('Invalid JSON. Please correct it and try again.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] py-12 text-brand-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Code className="w-8 h-8 text-accent-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-brand-foreground mb-4">
            Advanced Code Formatter
          </h1>
          <p className="text-xl text-brand-muted max-w-2xl mx-auto">
            Beautify or minify your code with advanced formatting options.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-brand-card border border-brand-border rounded-xl shadow-lg p-8">
          <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
            <div className="flex items-center gap-4">
                <select value={language} onChange={(e) => setLanguage(e.target.value)} className="px-4 py-2 bg-brand-background border border-brand-border rounded-lg focus:ring-accent text-brand-foreground">
                  <option value="json">JSON</option>
                  <option value="css">CSS</option>
                  <option value="javascript">JavaScript</option>
                  <option value="html">HTML</option>
                  <option value="sql">SQL</option>
                  <option value="xml">XML</option>
                </select>
                <div className="flex items-center gap-2">
                    <label className="text-sm text-brand-muted">Indent:</label>
                    <select value={indent} onChange={(e) => setIndent(Number(e.target.value))} className="px-3 py-2 bg-brand-background border border-brand-border rounded-lg focus:ring-accent text-brand-foreground">
                        <option value={2}>2 spaces</option>
                        <option value={4}>4 spaces</option>
                    </select>
                </div>
            </div>
            <div className="flex space-x-2">
              <button onClick={() => handleFormat(false)} className="inline-flex items-center gap-2 px-4 py-2 bg-accent/80 text-accent-foreground rounded-md hover:bg-accent transition-colors font-medium" data-cursor-hover>
                <ZapOff className="w-4 h-4" /> Beautify
              </button>
               <button onClick={() => handleFormat(true)} className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/80 text-white rounded-md hover:bg-yellow-500 transition-colors font-medium" data-cursor-hover>
                <Zap className="w-4 h-4" /> Minify
              </button>
              <button onClick={handleCopy} className="p-2 bg-brand-background rounded-md hover:bg-brand-border/50" title="Copy" data-cursor-hover>
                {copied ? <CheckCircle className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5 text-brand-muted" />}
              </button>
              <button onClick={() => { setCode(''); setError(null); }} className="p-2 bg-brand-background rounded-md hover:bg-brand-border/50" title="Clear" data-cursor-hover>
                <Trash2 className="w-5 h-5 text-brand-muted" />
              </button>
            </div>
          </div>
          
          {error && (
            <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="flex items-center gap-2 p-3 mb-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg">
                <AlertCircle className="w-5 h-5" />
                <p className="text-sm">{error}</p>
            </motion.div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[500px]">
            <textarea value={code} onChange={(e) => setCode(e.target.value)} placeholder={`Paste your ${language.toUpperCase()} code here...`} className="w-full h-full p-4 bg-brand-background border-2 border-brand-border rounded-lg resize-none text-brand-foreground placeholder-brand-muted font-mono focus:ring-2 focus:ring-accent focus:border-accent" />
            <div className="h-full bg-[#1e1e1e] rounded-lg overflow-hidden border-2 border-brand-border">
              <SyntaxHighlighter language={language} style={vscDarkPlus} customStyle={{ height: '100%', margin: 0, padding: '1rem', backgroundColor: 'transparent' }} codeTagProps={{ style: { fontFamily: '"Fira Code", "Fira Mono", monospace', fontSize: '14px' } }} showLineNumbers>
                {code || `// Formatted ${language.toUpperCase()} will appear here`}
              </SyntaxHighlighter>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CodeFormatter;
