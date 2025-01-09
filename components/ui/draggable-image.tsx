"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';

interface DraggableImageProps {
  src: string;
  scale: number;
}

export function DraggableImage({ src, scale }: DraggableImageProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  return (
    <motion.div
      className="absolute inset-0 cursor-move"
      drag
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={{
        top: -300,
        left: -300,
        right: 300,
        bottom: 300
      }}
      animate={position}
      onDragEnd={(_, info) => {
        setPosition({
          x: position.x + info.offset.x,
          y: position.y + info.offset.y
        });
      }}
      style={{
        scale,
        transition: 'scale 0.2s'
      }}
    >
      <img
        src={src}
        alt="Uploaded design"
        className="w-full h-full object-cover"
        draggable={false}
      />
    </motion.div>
  );
}