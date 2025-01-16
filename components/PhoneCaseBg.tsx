'use client';
import React, { useRef } from 'react';
import Image from 'next/image';
import { Rnd } from 'react-rnd';
import { ResizeControl } from './ResizeControl';
import { useEditor } from '@/contexts/EditorContext';

export const PhoneCaseBg = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rndRef = useRef<Rnd>(null);
  const {
    originalImage,
    croppedImage,
    isResizeMode,
    imagePosition,
    setImagePosition,
    setOriginalImage,
    setIsResizeMode,
    scale,
    rotation,
  } = useEditor();

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setOriginalImage(e.target?.result as string);
        setIsResizeMode(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragStop = (e: any, d: { x: number; y: number }) => {
    setImagePosition({ ...imagePosition, x: d.x, y: d.y });
  };

  const handleResize = (
    ref: HTMLElement,
    position: { x: number; y: number }
  ) => {
    setImagePosition({
      x: position.x,
      y: position.y,
      width: ref.offsetWidth,
      height: ref.offsetHeight,
    });
  };

  const currentImage = isResizeMode
    ? originalImage
    : croppedImage || originalImage;

  return (
    <div
      ref={containerRef}
      className="phone-case-bg-container absolute top-0 left-0 w-full z-10 h-full rounded-[38px]"
    >
      {currentImage ? (
        <>
          {isResizeMode ? (
            <Rnd
              ref={rndRef}
              default={imagePosition}
              position={{ x: imagePosition.x, y: imagePosition.y }}
              size={{
                width: imagePosition.width,
                height: imagePosition.height,
              }}
              lockAspectRatio
              disableDragging={!isResizeMode}
              enableResizing={isResizeMode}
              onDragStop={handleDragStop}
              onResize={(_e, _d, ref, _delta, position) =>
                handleResize(ref, position)
              }
              resizeHandleComponent={
                isResizeMode
                  ? {
                      topLeft: <ResizeControl />,
                      topRight: <ResizeControl />,
                      bottomLeft: <ResizeControl />,
                      bottomRight: <ResizeControl />,
                    }
                  : {}
              }
            >
              <div
                className="relative w-full h-full"
                style={{
                  transform: `scale(${scale}) rotate(${rotation}deg)`,
                  transformOrigin: 'center center',
                }}
              >
                <Image
                  fill
                  src={currentImage}
                  alt="Background"
                  className="pointer-events-none"
                  draggable={false}
                />
              </div>
            </Rnd>
          ) : (
            <div className="relative w-full h-full rounded-[38px] overflow-hidden">
              <Image
                fill
                src={currentImage}
                alt="Background"
                className="pointer-events-none"
                draggable={false}
              />
            </div>
          )}
        </>
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
