import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { useEditor } from '@/contexts/EditorContext';
import { extractFontFamily, extractGoogleFontUrl } from '@/lib/font-utils';
import { useToast } from '@/components/ui/use-toast';

export const AddGoogleFont = () => {
  const [fontLink, setFontLink] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { addGoogleFont, googleFonts } = useEditor();
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    try {
      setError(null);

      // Extract and validate the Google Font URL
      const cleanUrl = extractGoogleFontUrl(fontLink);

      // Extract the font family from the URL
      const fontFamily = extractFontFamily(cleanUrl);

      // Check if font already exists
      const fontExists = googleFonts.some(
        (font) => font.family.toLowerCase() === fontFamily.toLowerCase()
      );

      if (fontExists) {
        toast({
          title: 'Font already exists',
          description: `The font "${fontFamily}" is already in your collection.`,
          variant: 'destructive',
        });
        return;
      }

      // Create a link element to load the font
      const linkElement = document.createElement('link');
      linkElement.href = cleanUrl;
      linkElement.rel = 'stylesheet';

      // Wait for the font to load
      await new Promise((resolve, reject) => {
        linkElement.onload = resolve;
        linkElement.onerror = () => reject(new Error('Failed to load font'));
        document.head.appendChild(linkElement);
      });

      // Add the font to the context
      addGoogleFont({
        family: fontFamily,
        link: cleanUrl,
      });

      // Show success toast
      toast({
        title: 'Font added successfully',
        description: `"${fontFamily}" has been added to your fonts.`,
      });

      // Reset form and close dialog
      setFontLink('');
      setOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add font');
      toast({
        title: 'Failed to add font',
        description:
          err instanceof Error
            ? err.message
            : 'An error occurred while adding the font.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="w-full flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Google Font
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Google Font</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Google Font Link</label>
            <Input
              placeholder="Paste link, <link> tag, or @import statement"
              value={fontLink}
              onChange={(e) => setFontLink(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              You can paste the Google Fonts URL, HTML link tag, or CSS @import
              statement
            </p>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button onClick={handleSubmit} className="w-full">
            Add Font
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
