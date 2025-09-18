import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Wrench } from 'lucide-react';

interface ComingSoonProps {
  toolName: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({ toolName }) => {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center text-brand-foreground">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center p-8"
      >
        <div className="w-24 h-24 bg-brand-card/50 border-2 border-brand-border rounded-full flex items-center justify-center mx-auto mb-8">
          <Wrench className="w-12 h-12 text-accent" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {toolName}
        </h1>
        <p className="text-2xl text-accent font-semibold mb-6">
          Coming Soon!
        </p>
        <p className="text-xl text-brand-muted max-w-2xl mx-auto mb-10">
          We're working hard to bring you this powerful new tool. Stay tuned for updates!
        </p>
        <Link
          to="/"
          className="inline-flex items-center space-x-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg text-lg font-semibold hover:bg-accent/90 transition-all duration-300 shadow-[0_0_15px_rgba(47,69,114,0.5)] hover:shadow-[0_0_25px_rgba(47,69,114,0.8)]"
          data-cursor-hover
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </Link>
      </motion.div>
    </div>
  );
};

export default ComingSoon;
