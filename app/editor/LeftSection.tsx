import React, { useRef } from 'react';
import { CirclePicker, ChromePicker } from 'react-color';
import { Image as ImageIcon, Upload, Palette } from 'lucide-react';
import { useEditor } from '@/contexts/EditorContext';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';

const defaultColors = [
  '#f44336',
  '#e91e63',
  '#9c27b0',
  '#673ab7',
  '#3f51b5',
  '#2196f3',
  '#03a9f4',
  '#00bcd4',
  '#009688',
  '#4caf50',
  '#8bc34a',
  '#cddc39',
  '#ffeb3b',
  '#ffc107',
  '#ff9800',
  '#ff5722',
];

export const LeftSection = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    originalImage,
    setOriginalImage,
    setIsResizeMode,
    backgroundColor,
    frameColor,
    cameraColor,
    setBackgroundColor,
    setFrameColor,
    setCameraColor,
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

  const handleColorChange = (color: any, type: 'bg' | 'frame' | 'camera') => {
    switch (type) {
      case 'bg':
        setBackgroundColor(color.hex);
        break;
      case 'frame':
        setFrameColor(color.hex);
        break;
      case 'camera':
        setCameraColor(color.hex);
        break;
    }
  };

  return (
    <div className="w-full p-2">
      <div className="flex flex-col gap-6">
        {/* Image Upload Section */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <ImageIcon className="w-4 h-4" />
            Image
          </h4>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:opacity-90 transition-opacity flex items-center justify-center gap-2 font-medium"
          >
            <Upload className="w-4 h-4" />
            {originalImage ? 'Replace Image' : 'Upload Image'}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />
        </div>

        {/* Color Controls */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Colors
          </h4>

          {/* Background Color */}
          <Popover>
            <PopoverTrigger asChild>
              <button className="w-full py-2 px-4 bg-background border border-input rounded-lg hover:bg-accent transition-colors flex items-center justify-between">
                <span className="text-sm">Background Color</span>
                <div
                  className="w-6 h-6 rounded-full border border-input"
                  style={{ backgroundColor }}
                />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-3 bg-popover" align="start">
              <div className="space-y-3">
                <div className="pt-2">
                  <p className="text-sm text-muted-foreground mb-2">Presets</p>
                  <CirclePicker
                    colors={defaultColors}
                    color={backgroundColor}
                    onChange={(color) => handleColorChange(color, 'bg')}
                  />
                </div>
                <Separator />

                <ChromePicker
                  color={backgroundColor}
                  onChange={(color) => handleColorChange(color, 'bg')}
                  className="!shadow-none"
                />
              </div>
            </PopoverContent>
          </Popover>

          {/* Frame Color */}
          <Popover>
            <PopoverTrigger asChild>
              <button className="w-full py-2 px-4 bg-background border border-input rounded-lg hover:bg-accent transition-colors flex items-center justify-between">
                <span className="text-sm">Frame Color</span>
                <div
                  className="w-6 h-6 rounded-full border border-input"
                  style={{ backgroundColor: frameColor }}
                />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-3 bg-popover" align="start">
              <div className="space-y-3">
                <div className="pt-2">
                  <p className="text-sm text-muted-foreground mb-2">Presets</p>
                  <CirclePicker
                    colors={defaultColors}
                    color={frameColor}
                    onChange={(color) => handleColorChange(color, 'frame')}
                  />
                </div>
                <Separator />
                <ChromePicker
                  color={frameColor}
                  onChange={(color) => handleColorChange(color, 'frame')}
                  className="!shadow-none"
                />
              </div>
            </PopoverContent>
          </Popover>

          {/* Camera Color */}
          <Popover>
            <PopoverTrigger asChild>
              <button className="w-full py-2 px-4 bg-background border border-input rounded-lg hover:bg-accent transition-colors flex items-center justify-between">
                <span className="text-sm">Camera Color</span>
                <div
                  className="w-6 h-6 rounded-full border border-input"
                  style={{ backgroundColor: cameraColor }}
                />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-3 bg-popover" align="start">
              <div className="space-y-3">
                <div className="pt-2">
                  <p className="text-sm text-muted-foreground mb-2">Presets</p>
                  <CirclePicker
                    colors={defaultColors}
                    color={cameraColor}
                    onChange={(color) => handleColorChange(color, 'camera')}
                  />
                </div>
                <Separator />
                <ChromePicker
                  color={cameraColor}
                  onChange={(color) => handleColorChange(color, 'camera')}
                  className="!shadow-none"
                />
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};
