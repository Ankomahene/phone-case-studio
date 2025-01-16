import { Button } from '@/components/ui/button';
import { Smartphone } from 'lucide-react';
import React from 'react';

export const ProductTab = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h4 className="text-sm font-medium flex items-center gap-2">
          <Smartphone className="w-4 h-4" />
          Select Product
        </h4>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" className="h-20 flex flex-col gap-1">
            <Smartphone className="w-8 h-8" />
            <span className="text-xs">iPhone 14 Pro</span>
          </Button>
          <Button variant="outline" className="h-20 flex flex-col gap-1">
            <Smartphone className="w-8 h-8" />
            <span className="text-xs">iPhone 14</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
