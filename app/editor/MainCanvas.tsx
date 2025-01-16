'use client';
import { PhoneCaseBg } from '@/components/PhoneCaseBg';
import { IPhoneCase } from '@/components/phone-cases/Iphone';

export const MainCanvas = () => {
  return (
    <div className="relative w-[90%] h-[90%] m-4 border border-dashed border-gray-400 dark:border-gray-700 rounded-lg overflow-hidden">
      <IPhoneCase model="iphone14">
        <PhoneCaseBg />
      </IPhoneCase>
    </div>
  );
};
