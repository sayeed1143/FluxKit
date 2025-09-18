import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Archive, Upload, CheckCircle, File as FileIcon } from 'lucide-react';

const FileCompressor: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<{ originalSize: number; newSize: number } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setResult(null);
    }
  };

  const handleCompress = () => {
    if (!file) return;
    setIsProcessing(true);
    setTimeout(() => {
      const originalSize = file.size;
      const newSize = originalSize * (Math.random() * (0.6 - 0.3) + 0.3); // Simulate 40-70% compression
      setResult({ originalSize, newSize });
      setIsProcessing(false);
    }, 2500);
  };
  
  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] py-12 text-brand-foreground">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Archive className="w-8 h-8 text-accent-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-brand-foreground mb-4">
            File Compressor
          </h1>
          <p className="text-xl text-brand-muted max-w-2xl mx-auto">
            Reduce the size of your images and documents without losing quality.
          </p>
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
              <p className="text-brand-muted mb-4">Drag and drop your file here</p>
              <input type="file" onChange={handleFileChange} className="hidden" id="compress-upload" />
              <label htmlFor="compress-upload" className="inline-flex items-center space-x-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg cursor-pointer hover:bg-accent/90" data-cursor-hover>
                <span>Choose File</span>
              </label>
            </div>
          ) : (
            <div className="text-center">
              <FileIcon className="w-12 h-12 text-accent mx-auto mb-4" />
              <p className="font-semibold text-brand-foreground mb-2">{file.name}</p>
              <p className="text-sm text-brand-muted mb-6">Original Size: {formatBytes(file.size)}</p>
              
              <button onClick={handleCompress} disabled={isProcessing} className="w-full max-w-xs mx-auto bg-accent text-accent-foreground py-3 rounded-lg hover:bg-accent/90 disabled:opacity-50" data-cursor-hover>
                {isProcessing ? 'Compressing...' : 'Compress File'}
              </button>

              {isProcessing && (
                <div className="mt-6">
                  <div className="relative w-full max-w-xs mx-auto bg-brand-border rounded-full h-2.5">
                    <div className="bg-accent h-2.5 rounded-full animate-pulse" style={{ width: `100%` }}></div>
                  </div>
                  <p className="text-sm text-brand-muted mt-2">Analyzing and compressing...</p>
                </div>
              )}

              {result && (
                 <div className="mt-6 p-6 bg-green-500/10 border border-green-500/30 rounded-lg max-w-md mx-auto">
                    <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-3" />
                    <p className="text-xl font-semibold text-brand-foreground mb-3">Compression Complete!</p>
                    <div className="flex justify-around text-center">
                        <div>
                            <p className="text-sm text-brand-muted">Original Size</p>
                            <p className="text-lg font-bold text-brand-foreground">{formatBytes(result.originalSize)}</p>
                        </div>
                        <div>
                            <p className="text-sm text-brand-muted">New Size</p>
                            <p className="text-lg font-bold text-green-500">{formatBytes(result.newSize)}</p>
                        </div>
                        <div>
                            <p className="text-sm text-brand-muted">Reduction</p>
                            <p className="text-lg font-bold text-green-500">
                                {Math.round(100 - (result.newSize / result.originalSize) * 100)}%
                            </p>
                        </div>
                    </div>
                    <p className="text-xs text-green-400 mt-4">(This is a simulation. File download is not available.)</p>
                    <button onClick={() => setFile(null)} className="mt-4 text-accent hover:text-accent/80">Compress another file</button>
                 </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default FileCompressor;
