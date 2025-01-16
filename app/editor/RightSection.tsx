import { useEditor } from '@/contexts/EditorContext';
import { Maximize, Trash2, Sliders, Crop } from 'lucide-react';
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

export const RightSection = () => {
  const {
    originalImage,
    croppedImage,
    isResizeMode,
    imageEffects,
    updateImageEffects,
    setOriginalImage,
    setIsResizeMode,
    startResizeMode,
    keepChanges,
  } = useEditor();

  const handleEffectChange = (
    effect: keyof typeof imageEffects,
    value: number
  ) => {
    updateImageEffects({ [effect]: value });
  };

  const handleResetEffects = () => {
    Object.keys(imageEffects).forEach((effect) => {
      updateImageEffects({
        [effect]: effect === 'blur' || effect === 'hue' ? 0 : 100,
      });
    });
  };

  const hasImage = Boolean(originalImage);
  const isCropped = Boolean(croppedImage);

  return (
    <div className="w-full p-2">
      <div className="flex flex-col gap-6">
        {/* Header with clear button */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Image Controls</h3>

          <button
            onClick={
              hasImage
                ? () => {
                    setOriginalImage(null);
                    setIsResizeMode(true);
                  }
                : () => {}
            }
            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            title="Clear Image"
            disabled={!hasImage}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        <>
          {/* Resize Controls */}
          <div className={cn('space-y-4', !hasImage && 'opacity-30')}>
            {isResizeMode ? (
              <button
                onClick={hasImage ? keepChanges : () => {}}
                disabled={!hasImage}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:opacity-90 transition-opacity flex items-center justify-center gap-2 font-medium disabled:cursor-not-allowed"
              >
                <Crop className="w-4 h-4" />
                Keep Changes
              </button>
            ) : (
              <button
                onClick={hasImage ? startResizeMode : () => {}}
                className="w-full py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:opacity-90 transition-opacity flex items-center justify-center gap-2 font-medium disabled:cursor-not-allowed"
                disabled={!hasImage}
              >
                <Crop className="w-4 h-4" />
                Resize Image
              </button>
            )}
          </div>

          {/* Image Effects Controls */}
          <div
            className={cn(
              'space-y-4',
              (!isCropped || isResizeMode || !hasImage) && 'opacity-50'
            )}
          >
            <h4 className="text-sm font-medium flex items-center gap-2">
              <Sliders className="w-4 h-4" />
              Image Effects
            </h4>

            {Object.entries(imageEffects).map(([effect, value]) => (
              <div key={effect} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm capitalize">{effect}</span>
                  <span className="text-sm text-gray-500">{value}%</span>
                </div>
                <Slider
                  disabled={!isCropped || isResizeMode || !hasImage}
                  value={[value]}
                  min={0}
                  max={effect === 'blur' ? 20 : 200}
                  step={1}
                  className="w-full [&>[role=slider]]:bg-gradient-to-r [&>[role=slider]]:from-blue-600 [&>[role=slider]]:to-purple-600 disabled:cursor-not-allowed"
                  onValueChange={([newValue]) =>
                    handleEffectChange(
                      effect as keyof typeof imageEffects,
                      newValue
                    )
                  }
                />
              </div>
            ))}

            <button
              onClick={hasImage ? handleResetEffects : () => {}}
              disabled={!isCropped || isResizeMode || !hasImage}
              className="w-full py-2 px-4 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Maximize className="w-4 h-4" />
              Reset Effects
            </button>
          </div>
        </>
      </div>
    </div>
  );
};
