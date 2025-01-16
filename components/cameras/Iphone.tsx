import React from 'react';
import { IPhoneModel } from '@/types';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

interface IPhoneCameraProps {
  model: IPhoneModel;
  cameraColor: string;
}

const cameraLayouts = {
  iphone14: 'grid grid-cols-2 gap-2',
  iphone15: 'grid grid-cols-2 gap-3',
  iphone15pro: 'grid grid-cols-2 gap-2',
};

export const IphoneCamera = ({ model, cameraColor }: IPhoneCameraProps) => {
  const { resolvedTheme } = useTheme();

  return (
    <div
      className={cn(
        'absolute top-[8px] left-[8px] rounded-[38px] p-6 bg-gray-300 dark:bg-gray-800 ',
        'shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.8),0_1px_3px_0_rgba(0,0,0,0.6)] z-50'
      )}
      style={{ backgroundColor: cameraColor }}
    >
      <div className={cameraLayouts[model]}>
        {Array.from({ length: model === 'iphone15pro' ? 3 : 4 }).map((_, i) => (
          <div
            key={i}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-600 dark:g-gray-300 shadow-black shadow-sm opacity-30"
          >
            <div
              className={cn(
                'w-8 h-8 rounded-full bg-gradient-to-br opacity-90 border-2 border-gray-30 dark:border-gray-700 shadow-black shadow-sm',
                'from-gray-300 to-gray-500',
                'dark:from-gray-500 dark:to-gray-700'
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
