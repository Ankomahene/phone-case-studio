"use client";

import { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/components/ui/use-toast';
import { Smartphone, Upload, Download, ZoomIn, ZoomOut, RefreshCcw } from 'lucide-react';
import { DraggableImage } from '@/components/ui/draggable-image';

export default function PhoneCaseEditor() {
  const [image, setImage] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const editorRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = async () => {
    if (!editorRef.current) return;

    try {
      const dataUrl = await toPng(editorRef.current, {
        quality: 1.0,
        backgroundColor: 'transparent',
      });
      
      const link = document.createElement('a');
      link.download = 'custom-phone-case.png';
      link.href = dataUrl;
      link.click();

      toast({
        title: "Success!",
        description: "Your phone case design has been downloaded.",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to download the image. Please try again.",
        variant: "destructive",
      });
    }
  };

  const resetDesign = () => {
    setImage(null);
    setScale(1);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start justify-center">
      <div className="w-full lg:w-1/2 flex flex-col items-center gap-6">
        <div
          ref={editorRef}
          className="relative w-[300px] h-[600px] bg-white rounded-[3rem] shadow-xl overflow-hidden"
        >
          {/* Phone case frame */}
          <div className="absolute inset-0 pointer-events-none border-[12px] border-gray-200 rounded-[3rem] z-20">
            <div className="absolute top-12 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-200 rounded-b-2xl" />
          </div>

          {/* Image container */}
          <div className="absolute inset-0 overflow-hidden">
            {image && (
              <DraggableImage 
                src={image}
                scale={scale}
              />
            )}
          </div>

          {/* Upload overlay */}
          {!image && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
              <div className="text-center p-6">
                <Smartphone className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500">Upload an image to start designing</p>
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="w-full max-w-md space-y-4">
          <div className="flex gap-4">
            <Button 
              className="flex-1"
              onClick={() => document.getElementById('imageUpload')?.click()}
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Image
            </Button>
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
            {image && (
              <Button variant="outline" onClick={resetDesign}>
                <RefreshCcw className="w-4 h-4" />
              </Button>
            )}
          </div>

          {image && (
            <>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Image Scale</label>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setScale(Math.max(0.5, scale - 0.1))}
                    >
                      <ZoomOut className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setScale(Math.min(2, scale + 0.1))}
                    >
                      <ZoomIn className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <Slider
                  value={[scale]}
                  min={0.5}
                  max={2}
                  step={0.1}
                  onValueChange={([value]) => setScale(value)}
                />
              </div>

              <Button className="w-full" onClick={handleDownload}>
                <Download className="w-4 h-4 mr-2" />
                Download Design
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="w-full lg:w-1/2 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">How to Create Your Custom Case</h2>
        <ol className="space-y-4 text-gray-600 dark:text-gray-300">
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">1</span>
            <div>
              <h3 className="font-semibold">Upload Your Image</h3>
              <p>Click the "Upload Image" button to select your desired photo or design</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">2</span>
            <div>
              <h3 className="font-semibold">Position Your Design</h3>
              <p>Click and drag your image to position it perfectly on the case</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">3</span>
            <div>
              <h3 className="font-semibold">Adjust the Size</h3>
              <p>Use the scale slider or zoom buttons to resize your image as needed</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">4</span>
            <div>
              <h3 className="font-semibold">Download Your Design</h3>
              <p>Once you're happy with your design, click "Download Design" to save your creation</p>
            </div>
          </li>
        </ol>
      </div>
    </div>
  );
}