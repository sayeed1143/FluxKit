import React from 'react';
import { motion } from 'framer-motion';

const Orb: React.FC = () => {
  return (
    <div className="relative w-full h-full">
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 blur-xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.7, 1, 0.7],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute inset-4 rounded-full bg-gradient-to-r from-indigo-600/30 via-purple-600/30 to-pink-600/30 blur-lg"
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.8, 0.5, 0.8],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute inset-8 rounded-full bg-gradient-to-r from-cyan-600/40 via-blue-600/40 to-indigo-600/40 blur-md"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.9, 0.6, 0.9],
          rotate: [0, 360, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default Orb;