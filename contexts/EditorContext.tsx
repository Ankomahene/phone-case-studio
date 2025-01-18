'use client';

import { fallbackFonts, getSystemFonts } from '@/lib/font-utils';
import { ImageEffects } from '@/types';
import { useToJpeg, useToPng, useToSvg } from '@hugocxl/react-to-image';
import React, {
  ReactInstance,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

interface TextElement {
  id: string;
  text: string;
  font: string;
  color: string;
  position: { x: number; y: number };
  fontSize: number;
  isBold: boolean;
  isItalic: boolean;
  isUppercase: boolean;
  textAlign: 'left' | 'center' | 'right';
}

interface TextStyle {
  fontSize?: number;
  isBold?: boolean;
  isItalic?: boolean;
  isUppercase?: boolean;
  textAlign?: 'left' | 'center' | 'right';
}

interface ImagePosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface GoogleFont {
  family: string;
  link: string;
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
  selectedTextId: string | null;
  containerRef: React.RefObject<HTMLDivElement | null>;
  addText: () => void;
  updateTextPosition: (id: string, position: { x: number; y: number }) => void;
  updateTextContent: (id: string, text: string) => void;
  updateTextFont: (id: string, font: string) => void;
  updateTextColor: (id: string, color: string) => void;
  updateTextStyle: (id: string, style: TextStyle) => void;
  removeText: (id: string) => void;
  selectText: (id: string | null) => void;
  imageEffects: ImageEffects;
  updateImageEffects: (effects: Partial<ImageEffects>) => void;
  downloadDesign: () => Promise<void>;
  startResizeMode: () => void;
  keepChanges: () => void;
  backgroundColor: string;
  frameColor: string;
  cameraColor: string;
  setBackgroundColor: (color: string) => void;
  setFrameColor: (color: string) => void;
  setCameraColor: (color: string) => void;
  googleFonts: GoogleFont[];
  addGoogleFont: (font: GoogleFont) => void;
  systemFonts: string[];
  loadSystemFonts: () => Promise<void>;
}

const defaultImageEffects: ImageEffects = {
  opacity: 100,
  brightness: 100,
  contrast: 100,
  saturation: 100,
  blur: 0,
  hue: 0,
};

export const EditorContext = createContext<EditorContextType | null>(null);

export function EditorProvider({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [state, convert] = useToPng<HTMLDivElement>({
    selector: '#phone-case-container',
    quality: 1.0,
    style: {
      transform: 'scale(1)',
    },
    onSuccess: (data) => {
      const link = document.createElement('a');
      link.href = data;
      link.download = crypto.randomUUID() + '.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
  });
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
  const [selectedTextId, setSelectedTextId] = useState<string | null>(null);
  const [imageEffects, setImageEffects] =
    useState<ImageEffects>(defaultImageEffects);
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [frameColor, setFrameColor] = useState('#000000');
  const [cameraColor, setCameraColor] = useState('#000000');
  const [googleFonts, setGoogleFonts] = useState<GoogleFont[]>([]);
  const [systemFonts, setSystemFonts] = useState<string[]>(fallbackFonts);

  const resetImageTransforms = () => {
    setScale(1);
    setRotation(0);
  };

  const startResizeMode = () => {
    setCroppedImage(null);
    setIsResizeMode(true);
  };

  const keepChanges = async () => {
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
        // Calculate the scale ratios based on both manual scale and resize dimensions
        const scaleRatioX = (rndBounds.width / img.width) * scale;
        const scaleRatioY = (rndBounds.height / img.height) * scale;

        // Save the canvas state
        ctx.save();

        // Apply transformations from the center of the image
        ctx.translate(
          relativeX + rndBounds.width / 2,
          relativeY + rndBounds.height / 2
        );

        // Apply rotation in radians
        ctx.rotate((rotation * Math.PI) / 180);

        // Apply both resize and manual scaling
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

        // Convert to base64 and save
        const croppedImage = canvas.toDataURL('image/png');
        setCroppedImage(croppedImage);
        resolve(null);
      };
    });

    // Reset transforms after cropping
    resetImageTransforms();
    setIsResizeMode(false);
  };

  const addText = () => {
    const newText: TextElement = {
      id: Math.random().toString(36).substr(2, 9),
      text: 'Double click to edit',
      font: 'Arial',
      color: '#000000',
      position: { x: 50, y: 50 },
      fontSize: 16,
      isBold: false,
      isItalic: false,
      isUppercase: false,
      textAlign: 'left',
    };
    setTextElements((prev) => [...prev, newText]);
    setSelectedTextId(newText.id);
  };

  const updateTextPosition = (
    id: string,
    position: { x: number; y: number }
  ) => {
    setTextElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, position } : el))
    );
  };

  const updateTextContent = (id: string, text: string) => {
    setTextElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, text } : el))
    );
  };

  const updateTextFont = (id: string, font: string) => {
    setTextElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, font } : el))
    );
  };

  const updateTextColor = (id: string, color: string) => {
    setTextElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, color } : el))
    );
  };

  const updateTextStyle = (id: string, style: TextStyle) => {
    setTextElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, ...style } : el))
    );
  };

  const removeText = (id: string) => {
    setTextElements((prev) => prev.filter((el) => el.id !== id));
    if (selectedTextId === id) {
      setSelectedTextId(null);
    }
  };

  const selectText = (id: string | null) => {
    setSelectedTextId(id);
  };

  const updateImageEffects = (effects: Partial<ImageEffects>) => {
    setImageEffects((prev) => ({ ...prev, ...effects }));
  };

  const downloadDesign = async () => {
    console.log(state);
    const shadowElement = document.querySelector('.shadow-element');

    // reduce opacity of shadowElement to zero
    // if (shadowElement) {
    //   shadowElement.classList.add('opacity-0');
    // }

    // // Wait for next frame to ensure styles are applied
    requestAnimationFrame(() => {
      convert();
    });
  };

  const addGoogleFont = (font: GoogleFont) => {
    setGoogleFonts((prev) => [...prev, font]);
  };

  const loadSystemFonts = async () => {
    const fonts = await getSystemFonts();
    setSystemFonts(fonts);
  };

  // Load system fonts when the provider mounts
  useEffect(() => {
    loadSystemFonts();
  }, []);

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
        selectedTextId,
        containerRef,
        addText,
        updateTextPosition,
        updateTextContent,
        updateTextFont,
        updateTextColor,
        updateTextStyle,
        removeText,
        selectText,
        imageEffects,
        updateImageEffects,
        downloadDesign,
        startResizeMode,
        keepChanges,
        backgroundColor,
        frameColor,
        cameraColor,
        setBackgroundColor,
        setFrameColor,
        setCameraColor,
        googleFonts,
        addGoogleFont,
        systemFonts,
        loadSystemFonts,
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
