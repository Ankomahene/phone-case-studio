'use client';
import { IPhoneCase } from '@/components/phone-cases/Iphone';
import { useEditor } from '@/contexts/EditorContext';
import { PhoneCaseBg } from '@/components/PhoneCaseBg';
import { forwardRef } from 'react';

export const MainCanvas = forwardRef<HTMLDivElement>(() => {
  const { frameColor, cameraColor, containerRef } = useEditor();

  return (
    <div className="w-[90%] h-[90%] border border-dashed border-gray-400 dark:border-gray-700 rounded-lg overflow-hidden flex items-center justify-center">
      <div
        id="phone-case-container"
        className="w-[320px] h-[600px] rounded-[38px]"
      >
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
