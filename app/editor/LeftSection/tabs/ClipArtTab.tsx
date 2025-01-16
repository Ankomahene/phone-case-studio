import { Sticker } from 'lucide-react';

export const ClipArtTab = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h4 className="text-sm font-medium flex items-center gap-2">
          <Sticker className="w-4 h-4" />
          Clip Art
        </h4>
        <div className="grid grid-cols-3 gap-2">
          {/* Clip art content will go here */}
          <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
            <Sticker className="w-8 h-8 text-muted-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
};
