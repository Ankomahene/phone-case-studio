'use client';

import { useToast } from '@/components/ui/use-toast';
import { EditorProvider, useEditor } from '@/contexts/EditorContext';
import { Header } from './Header';
import { LeftSection } from './LeftSection';
import { MainCanvas } from './MainCanvas';
import { RightSection } from './RightSection';

function Editor() {
  const {
    image,
    setImage,
    scale,
    setScale,
    addText,
    imageEffects,
    updateImageEffects,
    downloadDesign,
  } = useEditor();

  const { toast } = useToast();

  return (
    <div className="h-screen flex flex-col">
      <Header />

      <div className="flex-1 flex">
        {/* Left Sidebar */}
        <div className="w-72 border-r bg-background h-[calc(100vh-75px)] overflow-auto">
          <LeftSection />
        </div>

        {/* Main Canvas */}
        <div className="flex-1 h-[calc(100vh-75px)] overflow-auto flex items-center justify-center bg-gray-100 dark:bg-gray-900">
          <MainCanvas />
        </div>

        {/* Right Sidebar */}
        <div className="w-72 border-l bg-background p-4 h-[calc(100vh-75px)] overflow-auto">
          <RightSection />
        </div>
      </div>
    </div>
  );
}

export default function EditorPage() {
  return (
    <EditorProvider>
      <Editor />
    </EditorProvider>
  );
}
