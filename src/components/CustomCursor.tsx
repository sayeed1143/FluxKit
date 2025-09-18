import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [variant, setVariant] = useState('default');

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const mouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('[data-cursor-hover]')
      ) {
        setVariant('link');
      }
    };

    const mouseLeave = () => {
      setVariant('default');
    };

    window.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseover', mouseEnter);
    document.addEventListener('mouseout', mouseLeave);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('mouseover', mouseEnter);
      document.removeEventListener('mouseout', mouseLeave);
    };
  }, []);

  const variants = {
    default: {
      x: position.x - 8,
      y: position.y - 8,
      height: 16,
      width: 16,
      backgroundColor: '#2F4673',
      mixBlendMode: 'difference'
    },
    link: {
      x: position.x - 24,
      y: position.y - 24,
      height: 48,
      width: 48,
      backgroundColor: '#D9D9D9',
      mixBlendMode: 'difference'
    }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] hidden md:block"
      variants={variants}
      animate={variant}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
    />
  );
};

export default CustomCursor;
