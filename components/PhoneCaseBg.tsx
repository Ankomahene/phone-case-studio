'use client';
import React, { useRef } from 'react';
import Image from 'next/image';
import { Rnd } from 'react-rnd';
import { ResizeControl } from './ResizeControl';
import { useEditor } from '@/contexts/EditorContext';

export const PhoneCaseBg = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
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
    imageEffects,
    backgroundColor,
  } = useEditor();

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = document.createElement('img');
        img.src = e.target?.result as string;

        img.onload = () => {
          const containerElement = document.querySelector(
            '.phone-case-bg-container'
          );
          if (!containerElement) return;

          const containerBounds = containerElement.getBoundingClientRect();
          const imageAspectRatio = img.width / img.height;

          let newWidth, newHeight;
          if (imageAspectRatio > 1) {
            // Landscape image
            newWidth = containerBounds.width * 0.8;
            newHeight = newWidth / imageAspectRatio;
          } else {
            // Portrait or square image
            newHeight = containerBounds.height * 0.8;
            newWidth = newHeight * imageAspectRatio;
          }

          // Center the image in the container
          const newX = (containerBounds.width - newWidth) / 2;
          const newY = (containerBounds.height - newHeight) / 2;

          setImagePosition({
            x: newX,
            y: newY,
            width: newWidth,
            height: newHeight,
          });

          setOriginalImage(e.target?.result as string);
          setIsResizeMode(true);
        };
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

  const generateFilterString = (effects: typeof imageEffects) => {
    return `
      opacity(${effects.opacity}%)
      brightness(${effects.brightness}%)
      contrast(${effects.contrast}%)
      saturate(${effects.saturation}%)
      blur(${effects.blur}px)
      hue-rotate(${effects.hue}deg)
    `;
  };

  const currentImage = isResizeMode
    ? originalImage
    : croppedImage || originalImage;

  return (
    <div
      ref={containerRef}
      className="phone-case-bg-container absolute top-0 left-0 w-full z-10 h-full rounded-[38px]"
      style={{
        backgroundColor,
      }}
    >
      {currentImage && (
        <>
          {isResizeMode ? (
            <Rnd
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
                style={{
                  filter: generateFilterString(imageEffects),
                }}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};
