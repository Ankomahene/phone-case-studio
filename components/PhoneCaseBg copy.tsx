'use client';
import React, { useRef, useState } from 'react';
import { useEditor } from '@/contexts/EditorContext';
import Image from 'next/image';

export const PhoneCaseBg = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStartScale, setResizeStartScale] = useState(1);
  const [resizeStartPos, setResizeStartPos] = useState({ x: 0, y: 0 });
  const { image, setImage, scale, setScale, rotation, setRotation } =
    useEditor();

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - imagePosition.x,
      y: e.clientY - imagePosition.y,
    });
  };

  const handleDrag = (e: React.MouseEvent) => {
    if (isDragging) {
      setImagePosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    } else if (isResizing) {
      const dx = e.clientX - resizeStartPos.x;
      const dy = e.clientY - resizeStartPos.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const scaleFactor = 1 + distance / 200; // Adjust this value to control resize sensitivity
      const newScale =
        resizeStartScale * (dx > 0 ? scaleFactor : 1 / scaleFactor);
      setScale(Math.max(0.1, Math.min(5, newScale)));
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  const handleResizeStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeStartScale(scale);
    setResizeStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const scaleFactor = e.deltaY > 0 ? 0.9 : 1.1;
    const newScale = Math.max(0.1, Math.min(5, scale * scaleFactor));
    setScale(newScale);
  };

  return (
    <div
      className="absolute top-0 left-0 w-full h-full bg-transparent overflow-hidden"
      onMouseMove={handleDrag}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onWheel={handleWheel}
    >
      {image ? (
        <div
          className="absolute cursor-move group"
          style={{
            transform: `translate(${imagePosition.x}px, ${imagePosition.y}px) scale(${scale}) rotate(${rotation}deg)`,
            transformOrigin: 'center',
          }}
          onMouseDown={handleDragStart}
        >
          <Image
            src={image}
            alt="Background"
            width={400}
            height={400}
            className="pointer-events-none"
            draggable={false}
          />
          {/* Resize handles */}
          <div
            className="absolute -bottom-3 -right-3 w-6 h-6 bg-white border-2 border-blue-500 rounded-full cursor-se-resize opacity-0 group-hover:opacity-100 transition-opacity"
            onMouseDown={handleResizeStart}
          />
          <div
            className="absolute -top-3 -right-3 w-6 h-6 bg-white border-2 border-blue-500 rounded-full cursor-ne-resize opacity-0 group-hover:opacity-100 transition-opacity"
            onMouseDown={handleResizeStart}
          />
          <div
            className="absolute -bottom-3 -left-3 w-6 h-6 bg-white border-2 border-blue-500 rounded-full cursor-sw-resize opacity-0 group-hover:opacity-100 transition-opacity"
            onMouseDown={handleResizeStart}
          />
          <div
            className="absolute -top-3 -left-3 w-6 h-6 bg-white border-2 border-blue-500 rounded-full cursor-nw-resize opacity-0 group-hover:opacity-100 transition-opacity"
            onMouseDown={handleResizeStart}
          />
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Upload Image
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
};
