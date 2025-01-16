'use client';

import { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import { useEditor } from '@/contexts/EditorContext';

export const EditorCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { setCanvas, backgroundColor } = useEditor();
  const [dimensions, setDimensions] = useState({ width: 400, height: 800 });

  useEffect(() => {
    if (fabricCanvasRef.current) {
      // Store all objects before changing background
      const objects = fabricCanvasRef.current.getObjects();
      fabricCanvasRef.current.backgroundColor = backgroundColor;
      // Ensure all objects are preserved
      objects.forEach((obj) => {
        obj.setCoords();
      });
      fabricCanvasRef.current.renderAll();
    }
  }, [backgroundColor]);

  useEffect(() => {
    const updateDimensions = () => {
      if (!containerRef.current) return;
      const container = containerRef.current;
      const maxWidth = container.clientWidth;
      const maxHeight = container.clientHeight;
      const aspectRatio = 9 / 16;

      let width = maxWidth;
      let height = width / aspectRatio;

      if (height > maxHeight) {
        height = maxHeight;
        width = height * aspectRatio;
      }

      setDimensions({ width, height });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (!canvasRef.current || fabricCanvasRef.current) return;

    fabricCanvasRef.current = new fabric.Canvas(canvasRef.current, {
      width: dimensions.width,
      height: dimensions.height,
      backgroundColor: backgroundColor,
      preserveObjectStacking: true,
      // Add these settings for better control handling
      controlsAboveOverlay: true,
      centeredScaling: true,
      allowTouchScrolling: true,
      renderOnAddRemove: true,
    });

    // Configure canvas for better control visibility
    const canvas = fabricCanvasRef.current;

    // Configure canvas settings directly
    canvas.selection = true;
    canvas.selectionFullyContained = false;
    canvas.clipPath = undefined;

    // Set up canvas event handlers for object management
    canvas.on('object:added', (e) => {
      if (e.target) {
        e.target.set({
          cornerStyle: 'circle',
          cornerColor: '#6366f1',
          cornerStrokeColor: '#ffffff',
          cornerSize: 12,
          transparentCorners: false,
          borderColor: '#6366f1',
          borderScaleFactor: 2,
          padding: 5,
        });
        // Ensure the object is above the background
        e.target.bringToFront();
        canvas.setActiveObject(e.target);
        canvas.renderAll();
      }
    });

    // Ensure proper object stacking on selection
    canvas.on('selection:created', (e) => {
      if (e.target) {
        e.target.bringToFront();
      }
      setCanvas(canvas);
    });

    // Handle object movement beyond canvas
    canvas.on('object:moving', (e) => {
      if (e.target) {
        canvas.renderAll();
      }
    });

    // Handle object scaling beyond canvas
    canvas.on('object:scaling', (e) => {
      if (e.target) {
        canvas.renderAll();
      }
    });

    setCanvas(canvas);

    return () => {
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose();
        fabricCanvasRef.current = null;
      }
    };
  }, [setCanvas, dimensions, backgroundColor]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[500px] overflow-visible"
    >
      <div className="absolute inset-0 flex items-center justify-center overflow-visible">
        <div className="relative overflow-visible">
          <canvas
            ref={canvasRef}
            className="border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg"
            style={{
              width: dimensions.width,
              height: dimensions.height,
            }}
          />
        </div>
      </div>
    </div>
  );
};
