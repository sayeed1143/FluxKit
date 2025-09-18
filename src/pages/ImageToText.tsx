import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ScanText, Upload, Copy, CheckCircle, Trash2 } from 'lucide-react';

const ImageToText: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedText, setExtractedText] = useState('');
  const [copied, setCopied] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setExtractedText('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleExtract = () => {
    if (!image) return;
    setIsProcessing(true);
    setTimeout(() => {
      setExtractedText(
        'This is sample text extracted from the image using Optical Character Recognition (OCR).\n\nA-Plus Tools makes it easy to convert your images into editable text.\n\nKey Features:\n- High accuracy\n- Supports multiple languages\n- Fast processing'
      );
      setIsProcessing(false);
    }, 2500);
  };

  const handleCopy = async () => {
    if (!extractedText) return;
    await navigator.clipboard.writeText(extractedText);
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
            <ScanText className="w-8 h-8 text-accent-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-brand-foreground mb-4">
            Image to Text (OCR)
          </h1>
          <p className="text-xl text-brand-muted max-w-2xl mx-auto">
            Extract text from your images with our powerful OCR tool.
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
              <h3 className="text-xl font-semibold">1. Upload Image</h3>
              {image ? (
                <div className="relative">
                  <img src={image} alt="Uploaded preview" className="rounded-lg max-h-80 w-full object-contain bg-brand-background" />
                   <button onClick={() => setImage(null)} className="absolute top-2 right-2 p-2 bg-black/50 rounded-full text-white hover:bg-red-500" data-cursor-hover>
                       <Trash2 className="w-5 h-5"/>
                   </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-brand-border rounded-lg p-12 text-center">
                  <Upload className="w-12 h-12 text-brand-muted mx-auto mb-4" />
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="ocr-upload" />
                  <label htmlFor="ocr-upload" className="inline-flex items-center space-x-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg cursor-pointer hover:bg-accent/90" data-cursor-hover>
                    <span>Choose Image</span>
                  </label>
                </div>
              )}
              <button onClick={handleExtract} disabled={!image || isProcessing} className="w-full bg-accent text-accent-foreground py-3 rounded-lg hover:bg-accent/90 disabled:opacity-50 font-medium" data-cursor-hover>
                {isProcessing ? 'Extracting Text...' : 'Extract Text'}
              </button>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">2. Extracted Text</h3>
              <div className="relative">
                <textarea
                  readOnly
                  value={isProcessing ? 'Processing...' : extractedText}
                  placeholder="Extracted text will appear here..."
                  className="w-full h-96 p-4 bg-brand-background border-2 border-brand-border rounded-lg resize-none text-brand-foreground placeholder-brand-muted"
                />
                {extractedText && (
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

export default ImageToText;
