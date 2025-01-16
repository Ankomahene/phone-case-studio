'use client';

import { useRef, useCallback, useState } from 'react';
import { fabric } from 'fabric';

type FabricObject = fabric.Object & {
  set: (key: string, value: any) => fabric.Object;
};

export const useEditor = () => {
  const canvasRef = useRef<fabric.Canvas | null>(null);
  const [currentColor, setCurrentColor] = useState('#6366f1');

  const initCanvas = useCallback((canvas: HTMLCanvasElement) => {
    if (!canvasRef.current) {
      canvasRef.current = new fabric.Canvas(canvas, {
        width: 400,
        height: 800,
        backgroundColor: '#ffffff',
      });
    }
  }, []);

  const addImage = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      fabric.Image.fromURL(e.target?.result as string, (img: fabric.Image) => {
        img.scaleToWidth(200);
        canvasRef.current?.add(img);
        canvasRef.current?.renderAll();
      });
    };
    reader.readAsDataURL(file);
  }, []);

  const addText = useCallback(
    (text: string) => {
      const fabricText = new fabric.Text(text, {
        left: 100,
        top: 100,
        fill: currentColor,
        fontFamily: 'Arial',
      });
      canvasRef.current?.add(fabricText);
      canvasRef.current?.renderAll();
    },
    [currentColor]
  );

  const changeColor = useCallback((color: string) => {
    setCurrentColor(color);
    const activeObject = canvasRef.current?.getActiveObject() as FabricObject;
    if (activeObject) {
      activeObject.set('fill', color);
      canvasRef.current?.renderAll();
    }
  }, []);

  return {
    canvasRef,
    initCanvas,
    addImage,
    addText,
    changeColor,
    currentColor,
  };
};
