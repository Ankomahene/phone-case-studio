import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { useEditor } from '@/contexts/EditorContext';
import { cn } from '@/lib/utils';
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  ChevronsUpDown,
  Italic,
  Minus,
  Plus,
  Trash2,
  Type,
} from 'lucide-react';
import React, { useEffect } from 'react';
import { ChromePicker, CirclePicker } from 'react-color';
import { AddGoogleFont } from '@/components/AddGoogleFont';
import { defaultColors, fonts, fontSizes } from '../constants';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

export const TextTab = () => {
  const {
    addText,
    textElements,
    selectedTextId,
    updateTextFont,
    updateTextColor,
    updateTextStyle,
    removeText,
    googleFonts,
    systemFonts,
    loadSystemFonts,
  } = useEditor();

  const selectedText = textElements.find((el) => el.id === selectedTextId);

  useEffect(() => {
    loadSystemFonts();
  }, [loadSystemFonts]);

  const handleColorChange = (color: any) => {
    if (selectedTextId) {
      updateTextColor(selectedTextId, color.hex);
    }
  };

  return (
    <div className="space-y-6">
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
                  <ScrollArea className="h-[200px]">
                    {systemFonts.map((font) => (
                      <SelectItem key={font} value={font}>
                        <span style={{ fontFamily: font }}>{font}</span>
                      </SelectItem>
                    ))}
                    <ScrollBar orientation="vertical" />
                  </ScrollArea>

                  {googleFonts.length > 0 && (
                    <>
                      <SelectItem
                        value="__google_fonts"
                        disabled
                        className="mt-2 border-t pt-2"
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
            <div className="flex items-center gap-2">
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
                <Bold className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  'flex-1',
                  selectedText?.isItalic && 'bg-accent text-accent-foreground'
                )}
                onClick={() =>
                  updateTextStyle(selectedTextId, {
                    isItalic: !selectedText?.isItalic,
                  })
                }
              >
                <Italic className="w-4 h-4" />
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
                <ChevronsUpDown className="w-4 h-4" />
              </Button>
            </div>

            {/* Text Alignment Controls */}
            <div className="flex items-center gap-2">
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
                <AlignLeft className="w-4 h-4" />
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
                <AlignCenter className="w-4 h-4" />
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
                <AlignRight className="w-4 h-4" />
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
                  <CirclePicker
                    colors={defaultColors}
                    color={selectedText?.color}
                    onChange={handleColorChange}
                  />
                  <Separator />
                  <ChromePicker
                    color={selectedText?.color}
                    onChange={handleColorChange}
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
    </div>
  );
};
