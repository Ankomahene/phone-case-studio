import { PaintBucket } from 'lucide-react';
import { CirclePicker, ChromePicker } from 'react-color';
import { useEditor } from '@/contexts/EditorContext';
import { Separator } from '@/components/ui/separator';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { defaultColors } from '../constants';

export const FillTab = () => {
  const {
    backgroundColor,
    frameColor,
    cameraColor,
    setBackgroundColor,
    setFrameColor,
    setCameraColor,
  } = useEditor();

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h4 className="text-sm font-medium flex items-center gap-2">
          <PaintBucket className="w-4 h-4" />
          Colors
        </h4>

        {/* Background Color */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Background Color</label>
          <Popover>
            <PopoverTrigger asChild>
              <button className="w-full py-2 px-4 bg-background border border-input rounded-lg hover:bg-accent transition-colors flex items-center justify-between">
                <span className="text-sm">Select color</span>
                <div
                  className="w-6 h-6 rounded-full border border-input"
                  style={{ backgroundColor }}
                />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-3" align="start">
              <div className="space-y-3">
                <CirclePicker
                  colors={defaultColors}
                  color={backgroundColor}
                  onChange={(color) => setBackgroundColor(color.hex)}
                />
                <Separator />
                <ChromePicker
                  color={backgroundColor}
                  onChange={(color) => setBackgroundColor(color.hex)}
                  className="!shadow-none"
                />
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Frame Color */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Frame Color</label>
          <Popover>
            <PopoverTrigger asChild>
              <button className="w-full py-2 px-4 bg-background border border-input rounded-lg hover:bg-accent transition-colors flex items-center justify-between">
                <span className="text-sm">Select color</span>
                <div
                  className="w-6 h-6 rounded-full border border-input"
                  style={{ backgroundColor: frameColor }}
                />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-3" align="start">
              <div className="space-y-3">
                <CirclePicker
                  colors={defaultColors}
                  color={frameColor}
                  onChange={(color) => setFrameColor(color.hex)}
                />
                <Separator />
                <ChromePicker
                  color={frameColor}
                  onChange={(color) => setFrameColor(color.hex)}
                  className="!shadow-none"
                />
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Camera Color */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Camera Color</label>
          <Popover>
            <PopoverTrigger asChild>
              <button className="w-full py-2 px-4 bg-background border border-input rounded-lg hover:bg-accent transition-colors flex items-center justify-between">
                <span className="text-sm">Select color</span>
                <div
                  className="w-6 h-6 rounded-full border border-input"
                  style={{ backgroundColor: cameraColor }}
                />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-3" align="start">
              <div className="space-y-3">
                <CirclePicker
                  colors={defaultColors}
                  color={cameraColor}
                  onChange={(color) => setCameraColor(color.hex)}
                />
                <Separator />
                <ChromePicker
                  color={cameraColor}
                  onChange={(color) => setCameraColor(color.hex)}
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
