'use client';

import React, { createContext, useContext, useState } from 'react';
import { toPng } from 'html-to-image';

interface TextElement {
  id: string;
  text: string;
  font: string;
  position: { x: number; y: number };
}

interface ImageEffects {
  opacity: number;
  brightness: number;
  contrast: number;
  saturation: number;
  blur: number;
  hue: number;
}

interface ImagePosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface EditorContextType {
  originalImage: string | null;
  croppedImage: string | null;
  isResizeMode: boolean;
  imagePosition: ImagePosition;
  setImagePosition: (position: ImagePosition) => void;
  setOriginalImage: (image: string | null) => void;
  setCroppedImage: (image: string | null) => void;
  setIsResizeMode: (isResizeMode: boolean) => void;
  scale: number;
  setScale: (scale: number) => void;
  rotation: number;
  setRotation: (rotation: number) => void;
  resetImageTransforms: () => void;
  textElements: TextElement[];
  addText: (text: string, font: string) => void;
  updateTextPosition: (id: string, position: { x: number; y: number }) => void;
  removeText: (id: string) => void;
  imageEffects: ImageEffects;
  updateImageEffects: (effects: Partial<ImageEffects>) => void;
  downloadDesign: (
    editorRef: React.RefObject<HTMLDivElement | null>
  ) => Promise<void>;
  startResizeMode: () => void;
  keepChanges: () => void;
}

const defaultImageEffects: ImageEffects = {
  opacity: 100,
  brightness: 100,
  contrast: 100,
  saturation: 100,
  blur: 0,
  hue: 0,
};

const EditorContext = createContext<EditorContextType | null>(null);

export function EditorProvider({ children }: { children: React.ReactNode }) {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [isResizeMode, setIsResizeMode] = useState(false);
  const [imagePosition, setImagePosition] = useState<ImagePosition>({
    x: 0,
    y: 0,
    width: 400,
    height: 400,
  });
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [textElements, setTextElements] = useState<TextElement[]>([]);
  const [imageEffects, setImageEffects] =
    useState<ImageEffects>(defaultImageEffects);

  const resetImageTransforms = () => {
    setScale(1);
    setRotation(0);
  };

  const startResizeMode = () => {
    setCroppedImage(null);
    setIsResizeMode(true);
    resetImageTransforms();
  };

  const keepChanges = async () => {
    // Find the phone case container element
    const containerElement = document.querySelector('.phone-case-bg-container');
    const rndElement = containerElement?.querySelector('.react-draggable');

    if (!containerElement || !rndElement || !originalImage) return;

    // Get the bounds of both container and the draggable element
    const containerBounds = containerElement.getBoundingClientRect();
    const rndBounds = rndElement.getBoundingClientRect();

    // Calculate relative position of the image to the container
    const relativeX = rndBounds.x - containerBounds.x;
    const relativeY = rndBounds.y - containerBounds.y;

    // Create a canvas with the container's dimensions
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = containerBounds.width;
    canvas.height = containerBounds.height;

    // Load the original image
    const img = document.createElement('img');
    img.src = originalImage;

    await new Promise((resolve) => {
      img.onload = () => {
        // Calculate the scale ratios
        const scaleRatioX = rndBounds.width / img.width;
        const scaleRatioY = rndBounds.height / img.height;

        // Save the canvas state
        ctx.save();

        // Apply transformations from the center of the image
        ctx.translate(
          relativeX + rndBounds.width / 2,
          relativeY + rndBounds.height / 2
        );
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.scale(scaleRatioX, scaleRatioY);

        // Draw the image centered at the transformed position
        ctx.drawImage(
          img,
          -img.width / 2,
          -img.height / 2,
          img.width,
          img.height
        );

        // Restore canvas state
        ctx.restore();

        // Convert to base64, save, and trigger download
        const croppedImage = canvas.toDataURL('image/png');
        setCroppedImage(croppedImage);

        // Create and trigger download link
        const link = document.createElement('a');
        link.download = 'cropped-image.png';
        link.href = croppedImage;
        link.click();
        resolve(null);
      };
    });

    setIsResizeMode(false);
  };

  const addText = (text: string, font: string) => {
    setTextElements((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substr(2, 9),
        text,
        font,
        position: { x: 0, y: 0 },
      },
    ]);
  };

  const updateTextPosition = (
    id: string,
    position: { x: number; y: number }
  ) => {
    setTextElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, position } : el))
    );
  };

  const removeText = (id: string) => {
    setTextElements((prev) => prev.filter((el) => el.id !== id));
  };

  const updateImageEffects = (effects: Partial<ImageEffects>) => {
    setImageEffects((prev) => ({ ...prev, ...effects }));
  };

  const downloadDesign = async (
    editorRef: React.RefObject<HTMLDivElement | null>
  ) => {
    if (!editorRef.current) return;

    try {
      const dataUrl = await toPng(editorRef.current, {
        quality: 1.0,
        backgroundColor: 'transparent',
      });

      const link = document.createElement('a');
      link.download = 'custom-phone-case.png';
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to download design:', err);
    }
  };

  return (
    <EditorContext.Provider
      value={{
        originalImage,
        croppedImage,
        isResizeMode,
        imagePosition,
        setImagePosition,
        setOriginalImage,
        setCroppedImage,
        setIsResizeMode,
        scale,
        setScale,
        rotation,
        setRotation,
        resetImageTransforms,
        textElements,
        addText,
        updateTextPosition,
        removeText,
        imageEffects,
        updateImageEffects,
        downloadDesign,
        startResizeMode,
        keepChanges,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor() {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
}
