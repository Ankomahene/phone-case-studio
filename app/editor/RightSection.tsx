import { useEditor } from '@/contexts/EditorContext';
import {
  Maximize,
  MinusCircle,
  PlusCircle,
  RotateCcw,
  RotateCw,
  Trash2,
  Crop,
  Sliders,
} from 'lucide-react';
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

export const RightSection = () => {
  const {
    originalImage,
    croppedImage,
    isResizeMode,
    scale,
    setScale,
    rotation,
    setRotation,
    resetImageTransforms,
    imageEffects,
    updateImageEffects,
    startResizeMode,
    keepChanges,
    setOriginalImage,
    imagePosition,
    setImagePosition,
  } = useEditor();

  const handleRotateLeft = () => {
    const newRotation = rotation - 90;
    setRotation(newRotation);

    // Get the current Rnd element
    const rndElement = document.querySelector('.react-draggable');
    if (!rndElement) return;

    // Get current bounds
    const bounds = rndElement.getBoundingClientRect();
    setImagePosition({
      ...imagePosition,
      width: bounds.width,
      height: bounds.height,
    });
  };

  const handleRotateRight = () => {
    const newRotation = rotation + 90;
    setRotation(newRotation);

    // Get the current Rnd element
    const rndElement = document.querySelector('.react-draggable');
    if (!rndElement) return;

    // Get current bounds
    const bounds = rndElement.getBoundingClientRect();
    setImagePosition({
      ...imagePosition,
      width: bounds.width,
      height: bounds.height,
    });
  };

  const handleScaleChange = (delta: number) => {
    const newScale = Math.max(0.1, Math.min(5, scale + delta));
    setScale(newScale);

    // Get the current Rnd element
    const rndElement = document.querySelector('.react-draggable');
    if (!rndElement) return;

    // Get current bounds
    const bounds = rndElement.getBoundingClientRect();
    setImagePosition({
      ...imagePosition,
      width: bounds.width,
      height: bounds.height,
    });
  };

  const handleEffectChange = (
    effect: keyof typeof imageEffects,
    value: number
  ) => {
    updateImageEffects({ [effect]: value });
  };

  const handleResetTransforms = () => {
    resetImageTransforms();
    // Reset position to default
    setImagePosition({
      x: 0,
      y: 0,
      width: 400,
      height: 400,
    });
  };

  const hasImage = Boolean(originalImage);
  const isCropped = Boolean(croppedImage);

  return (
    <div className="w-full p-2 ">
      <div className="flex flex-col gap-6">
        {/* Header with clear button */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Image Controls</h3>
          {hasImage && (
            <button
              onClick={() => setOriginalImage(null)}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              title="Clear Image"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>

        {hasImage && (
          <>
            {/* Resize Mode Controls */}
            <div className={cn('space-y-4')}>
              <h4 className="text-sm font-medium flex items-center gap-2">
                <Crop className="w-4 h-4" />
                Resize & Position
              </h4>

              <div
                className={cn(
                  'flex items-center justify-between gap-2',
                  !isResizeMode && 'opacity-50'
                )}
              >
                <span className="text-sm">Rotation</span>
                <div className="flex gap-2">
                  <button
                    onClick={handleRotateLeft}
                    disabled={!isResizeMode}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Rotate Left"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleRotateRight}
                    disabled={!isResizeMode}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Rotate Right"
                  >
                    <RotateCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div
                className={cn(
                  'flex items-center justify-between gap-2',
                  !isResizeMode && 'opacity-50'
                )}
              >
                <span className="text-sm">Scale</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleScaleChange(-0.1)}
                    disabled={!isResizeMode}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Scale Down"
                  >
                    <MinusCircle className="w-4 h-4" />
                  </button>
                  <span className="text-sm w-12 text-center">
                    {Math.round(scale * 100)}%
                  </span>
                  <button
                    onClick={() => handleScaleChange(0.1)}
                    disabled={!isResizeMode}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Scale Up"
                  >
                    <PlusCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {isResizeMode ? (
                <>
                  <button
                    onClick={handleResetTransforms}
                    className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2"
                  >
                    <Maximize className="w-4 h-4" />
                    Reset to Default
                  </button>
                  <button
                    onClick={keepChanges}
                    className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2"
                  >
                    <Crop className="w-4 h-4" />
                    Keep Changes
                  </button>
                </>
              ) : (
                <button
                  onClick={startResizeMode}
                  className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2"
                >
                  <Crop className="w-4 h-4" />
                  Resize Image
                </button>
              )}
            </div>

            {/* Image Effects Controls - Only visible when cropped */}
            <div
              className={cn(
                'space-y-4',
                (!isCropped || isResizeMode) && 'opacity-50'
              )}
            >
              <Separator />
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
                    disabled={!isCropped || isResizeMode}
                    value={[value]}
                    min={0}
                    max={effect === 'blur' ? 20 : 200}
                    step={1}
                    className="w-full"
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
                onClick={handleResetTransforms}
                disabled={!isCropped || isResizeMode}
                className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Maximize className="w-4 h-4" />
                Reset Effects
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
