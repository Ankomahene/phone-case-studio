import { useEditor } from '@/contexts/EditorContext';
import { cn } from '@/lib/utils';
import { Image as ImageIcon, Upload } from 'lucide-react';
import Image from 'next/image';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export const UploadsTab = () => {
  const { originalImage, setOriginalImage, setImagePosition, setIsResizeMode } =
    useEditor();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

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
    },
    [setOriginalImage, setImagePosition, setIsResizeMode]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
    },
    maxFiles: 1,
    multiple: false,
  });

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h4 className="text-sm font-medium flex items-center gap-2">
          <Upload className="w-4 h-4" />
          Upload Image
        </h4>

        <div
          {...getRootProps()}
          className={cn(
            'dropzone cursor-pointer w-full rounded-lg border-2 border-dashed transition-colors',
            isDragActive
              ? 'border-primary bg-primary/5'
              : 'border-muted-foreground/25 hover:border-primary'
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center gap-2 p-8">
            <div className="rounded-md bg-primary/10 p-2">
              {originalImage ? (
                <Image
                  src={originalImage}
                  alt="Preview"
                  width={50}
                  height={50}
                />
              ) : (
                <ImageIcon className="h-8 w-8 text-primary" />
              )}
            </div>
            <div className="text-center">
              <p className="text-sm font-medium">
                {isDragActive
                  ? 'Drop your image here'
                  : originalImage
                  ? 'Replace image'
                  : 'Drag & drop your image here'}
              </p>
              {originalImage && (
                <p className="text-xs text-muted-foreground mt-1">
                  PNG, JPG up to 10MB
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
