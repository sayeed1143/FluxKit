import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface DockItem {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

interface DockProps {
  items: DockItem[];
}

const Dock: React.FC<DockProps> = ({ items }) => {
  const mouseX = useMotionValue(Infinity);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="flex h-16 items-end gap-4 rounded-2xl bg-brand-card/70 backdrop-blur-md px-4 pb-3 border border-brand-border/50 shadow-lg"
    >
      {items.map((item, i) => (
        <DockItem key={i} mouseX={mouseX} item={item} />
      ))}
    </motion.div>
  );
};

const DockItem = ({ mouseX, item }: { mouseX: any; item: DockItem }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });
  const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.button
      ref={ref}
      style={{ width }}
      onClick={item.onClick}
      className="aspect-square w-10 rounded-full bg-brand-background/50 flex items-center justify-center text-brand-muted hover:text-brand-foreground transition-colors"
      data-cursor-hover
      aria-label={item.label}
    >
      {item.icon}
    </motion.button>
  );
};

export default Dock;
