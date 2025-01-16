'use client';
import React, { useRef } from 'react';
import Image from 'next/image';
import { Rnd } from 'react-rnd';
import { ResizeControl } from './ResizeControl';
import { useEditor } from '@/contexts/EditorContext';
import { TextElement } from './TextElement';

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
    textElements,
    selectedTextId,
    updateTextPosition,
    updateTextContent,
    selectText,
  } = useEditor();

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

  const handleContainerClick = () => {
    selectText(null);
  };

  return (
    <div
      ref={containerRef}
      className="phone-case-bg-container absolute top-0 left-0 w-full z-10 h-full rounded-[38px]"
      style={{
        backgroundColor,
      }}
      onClick={handleContainerClick}
    >
      {currentImage ? (
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
      ) : null}

      {/* Text Elements */}
      {textElements.map((element) => (
        <TextElement
          key={element.id}
          {...element}
          isSelected={selectedTextId === element.id}
          onSelect={() => selectText(element.id)}
          onPositionChange={(x, y) => updateTextPosition(element.id, { x, y })}
          onTextChange={(text) => updateTextContent(element.id, text)}
        />
      ))}
    </div>
  );
};
