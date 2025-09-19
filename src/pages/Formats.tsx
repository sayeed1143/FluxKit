import React from 'react';
import { motion } from 'framer-motion';
import { File, Image, Music, Video, Archive, HardDrive } from 'lucide-react';

const Formats: React.FC = () => {
  const formatCategories = [
    {
      name: 'Document',
      icon: File,
      formats: ['PDF', 'DOC', 'DOCX', 'XLS', 'XLSX', 'PPT', 'PPTX', 'TXT', 'RTF', 'ODT', 'WPS', 'CSV', 'EPUB', 'EML', 'MSG', 'PUB'],
    },
    {
      name: 'Image',
      icon: Image,
      formats: ['JPG', 'JPEG', 'PNG', 'GIF', 'BMP', 'TIFF', 'WEBP', 'SVG', 'ICO', 'HEIC'],
    },
    {
      name: 'Audio',
      icon: Music,
      formats: ['MP3', 'WAV', 'M4A', 'FLAC', 'AAC', 'OGG', 'WMA', 'AIFF'],
    },
    {
      name: 'Video',
      icon: Video,
      formats: ['MP4', 'MOV', 'AVI', 'MKV', 'WMV', 'FLV', 'WEBM', 'GIF'],
    },
    {
      name: 'Archive',
      icon: Archive,
      formats: ['ZIP', 'RAR', '7Z', 'TAR', 'GZ', 'BZ2'],
    },
    {
      name: 'CAD',
      icon: HardDrive,
      formats: ['DWG', 'DXF'],
    },
  ];

  return (
    <div className="min-h-[calc(100vh-8rem)] py-12 text-brand-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-brand-foreground mb-4">
            Supported File Formats
          </h1>
          <p className="text-xl text-brand-foreground max-w-3xl mx-auto">
            We support over 100+ file formats for all your conversion needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {formatCategories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
              className="bg-brand-card border border-brand-border rounded-xl p-8"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center border border-accent/20">
                    <category.icon className="w-6 h-6 text-accent" />
                </div>
                <h2 className="text-2xl font-semibold text-brand-foreground">{category.name}</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.formats.map(format => (
                  <span key={format} className="px-3 py-1 bg-brand-background text-brand-foreground rounded-full text-sm font-medium">
                    {format}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Formats;
