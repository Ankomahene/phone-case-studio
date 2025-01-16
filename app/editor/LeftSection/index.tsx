import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { PaintBucket, Smartphone, Sticker, Type, Upload } from 'lucide-react';
import { ProductTab } from './tabs/ProductTab';
import { UploadsTab } from './tabs/UploadsTab';
import { TextTab } from './tabs/TextTab';
import { ClipArtTab } from './tabs/ClipArtTab';
import { FillTab } from './tabs/FillTab';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const tabs = [
  {
    value: 'product',
    icon: Smartphone,
    tooltip: 'Product',
    content: ProductTab,
  },
  {
    value: 'uploads',
    icon: Upload,
    tooltip: 'Uploads',
    content: UploadsTab,
  },
  {
    value: 'text',
    icon: Type,
    tooltip: 'Text',
    content: TextTab,
  },
  {
    value: 'clipart',
    icon: Sticker,
    tooltip: 'Clip Art',
    content: ClipArtTab,
  },
  {
    value: 'fill',
    icon: PaintBucket,
    tooltip: 'Fill',
    content: FillTab,
  },
] as const;

export const LeftSection = () => {
  const [activeTab, setActiveTab] = useState('product');

  return (
    <div className="w-full p-2">
      <Tabs
        defaultValue="product"
        className="w-full"
        onValueChange={setActiveTab}
        value={activeTab}
      >
        <TooltipProvider>
          <TabsList className="grid w-full grid-cols-5 mb-4">
            {tabs.map(({ value, icon: Icon, tooltip }) => (
              <Tooltip key={value}>
                <TooltipTrigger asChild>
                  <TabsTrigger
                    value={value}
                    className={cn(
                      'transition-all duration-200',
                      activeTab === value &&
                        'bg-gradient-to-r from-blue-600 to-purple-600'
                    )}
                  >
                    <Icon
                      className={cn(
                        'h-5 w-5 transition-colors',
                        activeTab === value && 'text-white'
                      )}
                    />
                  </TabsTrigger>
                </TooltipTrigger>
                <TooltipContent>{tooltip}</TooltipContent>
              </Tooltip>
            ))}
          </TabsList>
        </TooltipProvider>

        {tabs.map(({ value, content: Content }) => (
          <TabsContent key={value} value={value}>
            <Content />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
