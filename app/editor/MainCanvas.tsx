'use client';
import { IPhoneCase } from '@/components/phone-cases/Iphone';
import { useEditor } from '@/contexts/EditorContext';
import { PhoneCaseBg } from '@/components/PhoneCaseBg';
import { forwardRef } from 'react';

export const MainCanvas = forwardRef<HTMLDivElement>(() => {
  const { frameColor, cameraColor, containerRef } = useEditor();

  return (
    <div className="relative w-[90%] h-[90%] m-4 border border-dashed border-gray-400 dark:border-gray-700 rounded-lg overflow-hidden">
      <div ref={containerRef} className="w-fit mx-auto">
        <IPhoneCase
          model="iphone14"
          frameColor={frameColor}
          cameraColor={cameraColor}
        >
          <PhoneCaseBg />
        </IPhoneCase>
      </div>
    </div>
  );
});

MainCanvas.displayName = 'MainCanvas';
