import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="bg-brand-card border border-brand-border/50 rounded-xl shadow-lg p-8 w-full motion-safe:animate-card-float">
      {children}
    </div>
  );
};

const CardSwap: React.FC<{ children: React.ReactNode[] }> = ({ children }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % children.length);
    }, 5000);
    return () => clearTimeout(timer);
  }, [index, children.length]);

  return (
    <div className="relative h-64 w-full max-w-lg mx-auto">
      <AnimatePresence>
        {React.Children.map(children, (child, i) => {
          const isVisible = i === index;
          const isExiting = i === (index - 1 + children.length) % children.length;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50, scale: 0.8, zIndex: 0 }}
              animate={{
                opacity: isVisible ? 1 : 0,
                y: isVisible ? 0 : 50,
                scale: isVisible ? 1 : 0.8,
                zIndex: isVisible ? 1 : 0,
              }}
              exit={{ opacity: 0, y: -50, scale: 0.8, zIndex: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="absolute inset-0"
              style={{ display: isVisible || isExiting ? 'block' : 'none' }}
            >
              {child}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default CardSwap;
