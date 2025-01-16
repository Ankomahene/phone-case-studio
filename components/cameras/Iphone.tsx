import React from 'react';
import { IPhoneModel } from '@/types';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

interface IPhoneCameraProps {
  model: IPhoneModel;
}

const cameraLayouts = {
  iphone14: 'grid grid-cols-2 gap-2',
  iphone15: 'grid grid-cols-2 gap-3',
  iphone15pro: 'grid grid-cols-2 gap-2',
};

export const IphoneCamera = ({ model }: IPhoneCameraProps) => {
  const { resolvedTheme } = useTheme();

  return (
    <div
      className={cn(
        'absolute top-1 left-1 rounded-[38px] p-6 shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.8),0_1px_3px_0_rgba(0,0,0,0.6)] z-50',
        {
          'bg-gray-300': resolvedTheme === 'light',
          'bg-gray-800': resolvedTheme === 'dark',
        }
      )}
    >
      <div className={cameraLayouts[model]}>
        {Array.from({ length: model === 'iphone15pro' ? 3 : 4 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'w-10 h-10 rounded-full flex items-center justify-center shadow-inner',
              {
                'bg-gray-400': resolvedTheme === 'light',
                'bg-gray-700': resolvedTheme === 'dark',
              }
            )}
          >
            <div
              className={cn('w-8 h-8 rounded-full bg-gradient-to-br', {
                'from-gray-300 to-gray-500': resolvedTheme === 'light',
                'from-gray-500 to-gray-700': resolvedTheme === 'dark',
              })}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
