import { Logo } from '@/components/Logo';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Download, RotateCcw, Share2 } from 'lucide-react';
import React from 'react';

export const Header = () => {
  return (
    <div className="border-b p-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Logo />
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 transition-opacity">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
        <Separator orientation="vertical" className="mx-2 h-7" />
        <div>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};
