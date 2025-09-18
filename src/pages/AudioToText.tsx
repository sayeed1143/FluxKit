import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mic, Upload, Copy, CheckCircle, File as FileIcon } from 'lucide-react';

const AudioToText: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcribedText, setTranscribedText] = useState('');
  const [copied, setCopied] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setTranscribedText('');
    }
  };

  const handleTranscribe = () => {
    if (!file) return;
    setIsProcessing(true);
    setTimeout(() => {
      setTranscribedText(
        `[00:01] Speaker 1: Welcome to the A-Plus Tools audio transcription service.
[00:05] Speaker 1: This is a demonstration of our powerful audio-to-text engine.
[00:10] Speaker 2: It seems to be working perfectly. The accuracy is impressive.
[00:15] Speaker 1: Indeed. We support various audio formats and provide speaker differentiation.`
      );
      setIsProcessing(false);
    }, 3000);
  };

  const handleCopy = async () => {
    if (!transcribedText) return;
    await navigator.clipboard.writeText(transcribedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] py-12 text-brand-foreground">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Mic className="w-8 h-8 text-accent-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-brand-foreground mb-4">
            Audio to Text Transcription
          </h1>
          <p className="text-xl text-brand-muted max-w-2xl mx-auto">
            Convert spoken audio into written text with high accuracy.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-brand-card border border-brand-border rounded-xl shadow-lg p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">1. Upload Audio File</h3>
              {file ? (
                <div className="bg-brand-background border-2 border-brand-border rounded-lg p-6 text-center">
                  <FileIcon className="w-12 h-12 text-accent mx-auto mb-4" />
                  <p className="font-semibold text-brand-foreground mb-2">{file.name}</p>
                  <button onClick={() => setFile(null)} className="text-sm text-red-500 hover:text-red-400" data-cursor-hover>
                    Clear file
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-brand-border rounded-lg p-12 text-center">
                  <Upload className="w-12 h-12 text-brand-muted mx-auto mb-4" />
                  <input type="file" accept="audio/*" onChange={handleFileChange} className="hidden" id="audio-transcribe-upload" />
                  <label htmlFor="audio-transcribe-upload" className="inline-flex items-center space-x-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg cursor-pointer hover:bg-accent/90" data-cursor-hover>
                    <span>Choose Audio File</span>
                  </label>
                </div>
              )}
              <button onClick={handleTranscribe} disabled={!file || isProcessing} className="w-full bg-accent text-accent-foreground py-3 rounded-lg hover:bg-accent/90 disabled:opacity-50 font-medium" data-cursor-hover>
                {isProcessing ? 'Transcribing...' : 'Transcribe Audio'}
              </button>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">2. Transcribed Text</h3>
              <div className="relative">
                <textarea
                  readOnly
                  value={isProcessing ? 'Processing...' : transcribedText}
                  placeholder="Transcribed text will appear here..."
                  className="w-full h-96 p-4 bg-brand-background border-2 border-brand-border rounded-lg resize-none text-brand-foreground placeholder-brand-muted"
                />
                {transcribedText && (
                  <button onClick={handleCopy} className="absolute top-3 right-3 p-2 bg-brand-border/50 rounded-md hover:bg-brand-border" title="Copy" data-cursor-hover>
                    {copied ? <CheckCircle className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5 text-brand-muted" />}
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AudioToText;
