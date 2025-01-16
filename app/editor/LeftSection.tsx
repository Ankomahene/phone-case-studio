import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEditor } from '@/contexts/EditorContext';
import { cn } from '@/lib/utils';
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  ChevronsUpDown,
  Image as ImageIcon,
  Italic,
  Minus,
  Palette,
  Plus,
  Trash2,
  Type,
  Upload,
} from 'lucide-react';
import React, { useRef } from 'react';
import { ChromePicker, CirclePicker } from 'react-color';
import { AddGoogleFont } from '@/components/AddGoogleFont';

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

const fonts = [
  'Arial',
  'Times New Roman',
  'Courier New',
  'Georgia',
  'Verdana',
  'Helvetica',
];

const fontSizes = Array.from({ length: 20 }, (_, i) => (i + 1) * 4);

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
    addText,
    textElements,
    selectedTextId,
    updateTextFont,
    updateTextColor,
    updateTextStyle,
    removeText,
    setImagePosition,
    googleFonts,
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

  const handleColorChange = (
    color: any,
    type: 'bg' | 'frame' | 'camera' | 'text'
  ) => {
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
      case 'text':
        if (selectedTextId) {
          updateTextColor(selectedTextId, color.hex);
        }
        break;
    }
  };

  const selectedText = textElements.find((el) => el.id === selectedTextId);

  return (
    <div className="w-full p-2">
      <Tabs defaultValue="customize" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="customize">Customize</TabsTrigger>
          <TabsTrigger value="text">Text</TabsTrigger>
        </TabsList>

        <TabsContent value="customize" className="space-y-6">
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
                    <p className="text-sm text-muted-foreground mb-2">
                      Presets
                    </p>
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
                    <p className="text-sm text-muted-foreground mb-2">
                      Presets
                    </p>
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
                    <p className="text-sm text-muted-foreground mb-2">
                      Presets
                    </p>
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
        </TabsContent>

        <TabsContent value="text" className="space-y-6">
          {/* Text Controls */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <Type className="w-4 h-4" />
              Text
            </h4>
            <button
              onClick={addText}
              className="w-full py-2 px-4 bg-background border border-input rounded-lg hover:bg-accent transition-colors flex items-center justify-center gap-2"
            >
              <Type className="w-4 h-4" />
              Add Text
            </button>

            {selectedTextId && (
              <div className="space-y-4 pt-2">
                {/* Font Controls */}
                <div className="space-y-2">
                  <Select
                    value={selectedText?.font}
                    onValueChange={(value: string) =>
                      updateTextFont(selectedTextId, value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select font" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__system_fonts" disabled>
                        System Fonts
                      </SelectItem>
                      {fonts.map((font) => (
                        <SelectItem key={font} value={font}>
                          <span style={{ fontFamily: font }}>{font}</span>
                        </SelectItem>
                      ))}

                      {googleFonts.length > 0 && (
                        <>
                          <SelectItem
                            value="__google_fonts"
                            disabled
                            className="mt-2"
                          >
                            Google Fonts
                          </SelectItem>
                          {googleFonts.map((font) => (
                            <SelectItem key={font.family} value={font.family}>
                              <span style={{ fontFamily: font.family }}>
                                {font.family}
                              </span>
                            </SelectItem>
                          ))}
                        </>
                      )}
                    </SelectContent>
                  </Select>
                  <AddGoogleFont />
                </div>

                {/* Font Size */}
                <div className="flex items-center gap-2">
                  <Select
                    value={selectedText?.fontSize?.toString()}
                    onValueChange={(value: string) =>
                      updateTextStyle(selectedTextId, {
                        fontSize: parseInt(value),
                      })
                    }
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue>
                        {selectedText?.fontSize
                          ? `${selectedText.fontSize}px`
                          : 'Font size'}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        ...(selectedText?.fontSize &&
                        !fontSizes.includes(selectedText.fontSize)
                          ? [selectedText.fontSize]
                          : []),
                        ...fontSizes,
                      ]
                        .sort((a, b) => a - b)
                        .map((size) => (
                          <SelectItem key={size} value={size.toString()}>
                            {size}px
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      updateTextStyle(selectedTextId, {
                        fontSize: (selectedText?.fontSize || 16) - 1,
                      })
                    }
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      updateTextStyle(selectedTextId, {
                        fontSize: (selectedText?.fontSize || 16) + 1,
                      })
                    }
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {/* Text Style Controls */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className={cn(
                      'flex-1',
                      selectedText?.isBold && 'bg-accent text-accent-foreground'
                    )}
                    onClick={() =>
                      updateTextStyle(selectedTextId, {
                        isBold: !selectedText?.isBold,
                      })
                    }
                  >
                    <Bold className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className={cn(
                      'flex-1',
                      selectedText?.isItalic &&
                        'bg-accent text-accent-foreground'
                    )}
                    onClick={() =>
                      updateTextStyle(selectedTextId, {
                        isItalic: !selectedText?.isItalic,
                      })
                    }
                  >
                    <Italic className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className={cn(
                      'flex-1',
                      selectedText?.isUppercase &&
                        'bg-accent text-accent-foreground'
                    )}
                    onClick={() =>
                      updateTextStyle(selectedTextId, {
                        isUppercase: !selectedText?.isUppercase,
                      })
                    }
                  >
                    <ChevronsUpDown className="h-4 w-4" />
                  </Button>
                </div>

                {/* Text Alignment */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className={cn(
                      'flex-1',
                      selectedText?.textAlign === 'left' &&
                        'bg-accent text-accent-foreground'
                    )}
                    onClick={() =>
                      updateTextStyle(selectedTextId, { textAlign: 'left' })
                    }
                  >
                    <AlignLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className={cn(
                      'flex-1',
                      selectedText?.textAlign === 'center' &&
                        'bg-accent text-accent-foreground'
                    )}
                    onClick={() =>
                      updateTextStyle(selectedTextId, { textAlign: 'center' })
                    }
                  >
                    <AlignCenter className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className={cn(
                      'flex-1',
                      selectedText?.textAlign === 'right' &&
                        'bg-accent text-accent-foreground'
                    )}
                    onClick={() =>
                      updateTextStyle(selectedTextId, { textAlign: 'right' })
                    }
                  >
                    <AlignRight className="h-4 w-4" />
                  </Button>
                </div>

                {/* Text Color */}
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="w-full py-2 px-4 bg-background border border-input rounded-lg hover:bg-accent transition-colors flex items-center justify-between">
                      <span className="text-sm">Text Color</span>
                      <div
                        className="w-6 h-6 rounded-full border border-input"
                        style={{ backgroundColor: selectedText?.color }}
                      />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-3" align="start">
                    <div className="space-y-3">
                      <div className="pt-2">
                        <p className="text-sm text-muted-foreground mb-2">
                          Presets
                        </p>
                        <CirclePicker
                          colors={defaultColors}
                          color={selectedText?.color}
                          onChange={(color) => handleColorChange(color, 'text')}
                        />
                      </div>
                      <Separator />
                      <ChromePicker
                        color={selectedText?.color}
                        onChange={(color) => handleColorChange(color, 'text')}
                        className="!shadow-none"
                      />
                    </div>
                  </PopoverContent>
                </Popover>

                <button
                  onClick={() => removeText(selectedTextId)}
                  className="w-full py-2 px-4 bg-red-50 hover:bg-red-100 dark:bg-red-950 dark:hover:bg-red-900 text-red-600 dark:text-red-400 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove Text
                </button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
