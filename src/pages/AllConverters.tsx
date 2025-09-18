import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { File, Image, Music, Video as VideoIcon, BookOpen, Archive, HardDrive } from 'lucide-react';

const AllConverters: React.FC = () => {
  const categories = [
    {
      name: 'Document Converters',
      icon: File,
      conversions: ['PDF to DOCX', 'DOCX to PDF', 'PDF to JPG', 'WPS to DOCX', 'EPUB to PDF'],
    },
    {
      name: 'Image Converters',
      icon: Image,
      conversions: ['JPG to PDF', 'PNG to PDF', 'PNG to ICO', 'HEIC to JPG', 'WEBP to JPG'],
    },
    {
      name: 'Audio Converters',
      icon: Music,
      conversions: ['MP4 to MP3', 'WAV to MP3', 'M4A to MP3', 'MP3 to WAV', 'FLAC to MP3'],
    },
    {
      name: 'Video Converters',
      icon: VideoIcon,
      conversions: ['MKV to MP4', 'MOV to MP4', 'AVI to MP4', 'WEBM to MP4', 'MP4 to GIF'],
    },
    {
      name: 'Other Popular Converters',
      icon: HardDrive,
      conversions: ['DWG to PDF', 'EML to PDF', 'MSG to PDF', 'PDF to CSV', 'PDF to TXT'],
    },
    {
      name: 'Archive & eBook',
      icon: Archive,
      conversions: ['ZIP to PDF', 'RAR to ZIP', 'EPUB to MOBI', 'MOBI to PDF', 'AZW to PDF'],
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
            File Conversion Hub
          </h1>
          <p className="text-xl text-brand-muted max-w-3xl mx-auto">
            Convert any file format with our fast and easy-to-use tools.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              viewport={{ once: true }}
            >
              <div className="group relative w-full overflow-hidden rounded-xl bg-brand-card border border-brand-border/50 p-6 shadow-lg hover:-translate-y-0.5 transition-transform" data-cursor-hover>
                <div className="flex items-center space-x-3 mb-4">
                  <category.icon className="w-6 h-6 text-accent" />
                  <h2 className="text-xl font-semibold text-brand-foreground">{category.name}</h2>
                </div>
                <ul className="space-y-2">
                  {category.conversions.map(conv => {
                    const [from, to] = conv.toLowerCase().split(' to ');
                    return (
                      <li key={conv}>
                        <Link to={`/convert/${from}/${to}`} className="flex items-center justify-between text-brand-muted hover:text-accent transition-colors">
                          <span>{conv}</span>
                          <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllConverters;
