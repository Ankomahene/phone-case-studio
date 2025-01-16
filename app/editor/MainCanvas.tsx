'use client';
import { PhoneCaseBg } from '@/components/PhoneCaseBg';
import { IPhoneCase } from '@/components/phone-cases/Iphone';
import { useEditor } from '@/contexts/EditorContext';

export const MainCanvas = () => {
  const { frameColor, cameraColor } = useEditor();

  return (
    <div className="relative w-[90%] h-[90%] m-4 border border-dashed border-gray-400 dark:border-gray-700 rounded-lg overflow-hidden">
      <IPhoneCase
        model="iphone14"
        frameColor={frameColor}
        cameraColor={cameraColor}
      >
        <PhoneCaseBg />
      </IPhoneCase>
    </div>
  );
};
