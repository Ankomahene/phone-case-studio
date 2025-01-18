'use client';
import { IPhoneModel } from '@/types';
import React from 'react';
import { IphoneCamera } from '../cameras/Iphone';

export type PhoneModel = 'iphone14' | 'iphone15' | 'iphone15pro';

interface IPhoneCaseProps {
  model: IPhoneModel;
  children: React.ReactNode;
  frameColor: string;
  cameraColor: string;
}

export const IPhoneCase: React.FC<IPhoneCaseProps> = ({
  model,
  children,
  frameColor,
  cameraColor,
}) => {
  return (
    <div className="relative h-full w-full rounded-[38px]">
      {/* Side Buttons - Left Side */}
      <div className="absolute left-[-6px] top-[120px] h-[200px] flex flex-col gap-6 z-40 pointer-events-none">
        {/* Volume Up */}
        <div className="h-12">
          <div
            className="h-full w-2 rounded-l-md shadow-lg bg-gray-400 dark:bg-gray-600"
            style={{
              backgroundColor: frameColor,
            }}
          />
        </div>
        {/* Volume Down */}
        <div className="h-12">
          <div
            className="h-full w-2 rounded-l-md shadow-lg bg-gray-400 dark:bg-gray-600"
            style={{
              backgroundColor: frameColor,
            }}
          />
        </div>
        {/* Silent Switch */}
        <div className="h-8">
          <div
            className="h-full w-2 rounded-l-md shadow-lg bg-gray-400 dark:bg-gray-600"
            style={{
              backgroundColor: frameColor,
            }}
          />
        </div>
      </div>

      {/* Side Button - Right Side */}
      <div className="absolute right-[-6px] top-[120px] h-12 z-40 pointer-events-none">
        <div
          className="h-full w-2 rounded-r-md shadow-lg bg-gray-400 dark:bg-gray-600"
          style={{
            backgroundColor: frameColor,
          }}
        />
      </div>

      <div
        className="absolute h-full w-full rounded-[38px] shadow-xl bg-transparent border-[6px] z-40 pointer-events-none"
        style={{ borderColor: frameColor }}
      />

      {/* Outer Shadow */}
      <div className="shadow-element absolute inset-0 rounded-[38px] z-30 top-[-12px] right-[-12px] left-[-12px] bottom-[-12px]  shadow-[0_0_0_100vh_rgba(229,231,235,0.8)] dark:shadow-[0_0_0_100vh_rgba(17,24,39,0.8)] bg-transparent pointer-events-none" />

      {/* Camera Module */}
      <IphoneCamera model={model} cameraColor={cameraColor} />

      {children}
    </div>
  );
};
