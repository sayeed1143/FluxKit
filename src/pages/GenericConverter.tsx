import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { Upload, CheckCircle, File as FileIcon, ArrowRight, ArrowLeft } from 'lucide-react';

const GenericConverter: React.FC = () => {
  const { from, to } = useParams<{ from: string; to: string }>();
  const [file, setFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setIsDone(false);
      setProgress(0);
    }
  };

  const handleConvert = () => {
    if (!file) return;
    setIsConverting(true);
    setIsDone(false);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsConverting(false);
          setIsDone(true);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] py-12 text-brand-foreground">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-4 mb-4">
            <span className="text-2xl md:text-4xl font-bold uppercase">{from}</span>
            <ArrowRight className="w-8 h-8 text-accent" />
            <span className="text-2xl md:text-4xl font-bold uppercase">{to}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-brand-foreground mb-4">
            File Converter
          </h1>
          <Link to="/all-converters" className="inline-flex items-center space-x-2 text-accent hover:text-accent/80">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Converters</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-brand-card border border-brand-border rounded-xl shadow-lg p-8"
        >
          {!file ? (
            <div className="border-2 border-dashed border-brand-border rounded-lg p-12 text-center">
              <Upload className="w-12 h-12 text-brand-muted mx-auto mb-4" />
              <p className="text-brand-muted mb-4">Drag and drop your .{from} file here</p>
              <input type="file" onChange={handleFileChange} className="hidden" id="file-upload" />
              <label htmlFor="file-upload" className="inline-flex items-center space-x-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg cursor-pointer hover:bg-accent/90" data-cursor-hover>
                <span>Choose File</span>
              </label>
            </div>
          ) : (
            <div className="text-center">
              <FileIcon className="w-12 h-12 text-accent mx-auto mb-4" />
              <p className="font-semibold text-brand-foreground mb-2">{file.name}</p>
              <p className="text-sm text-brand-muted mb-6">Ready to convert to .{to}</p>
              
              <div className="max-w-sm mx-auto space-y-4">
                <button onClick={handleConvert} disabled={isConverting} className="w-full bg-accent text-accent-foreground py-3 rounded-lg hover:bg-accent/90 disabled:opacity-50" data-cursor-hover>
                  {isConverting ? 'Converting...' : `Convert to ${to?.toUpperCase()}`}
                </button>
              </div>

              {isConverting && (
                <div className="mt-6">
                  <div className="w-full bg-brand-border rounded-full h-2.5">
                    <div className="bg-accent h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                  </div>
                  <p className="text-sm text-brand-muted mt-2">{progress}%</p>
                </div>
              )}

              {isDone && (
                 <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <p className="font-semibold text-brand-foreground">Conversion Complete!</p>
                    <p className="text-sm text-green-400 mb-3">(This is a simulation. File download is not available.)</p>
                    <button onClick={() => { setFile(null); setIsDone(false); }} className="text-accent hover:text-accent/80">Convert another file</button>
                 </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default GenericConverter;
