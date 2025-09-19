import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { MouseEvent } from 'react';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({ children, className }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.35 }}
      className={`group relative w-full overflow-hidden rounded-xl bg-brand-card border border-brand-border/50 p-8 shadow-lg motion-safe:animate-card-float motion-safe:animate-fade-in-slow ${className}`}
      onMouseMove={handleMouseMove}
      data-cursor-hover
    >
      {/* Spotlight radial */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              350px circle at ${mouseX}px ${mouseY}px,
              rgba(56,59,67,0.08),
              transparent 80%
            )
          `,
        }}
      />

      {/* Shine overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-xl"
        initial={{ x: '-120%' }}
        whileHover={{ x: '120%' }}
        transition={{ duration: 0.9, ease: 'easeInOut' }}
        style={{
          background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.45) 50%, rgba(255,255,255,0) 100%)',
          transform: 'skewX(-15deg)',
          mixBlendMode: 'overlay',
          opacity: 0.6,
        }}
      />

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export default SpotlightCard;
