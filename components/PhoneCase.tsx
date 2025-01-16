import { PhoneCaseBg } from './PhoneCaseBg';
import { IPhoneCase } from './phone-cases/Iphone';

const PhoneCase = () => {
  return (
    <IPhoneCase model="iphone14">
      <PhoneCaseBg />
    </IPhoneCase>
  );
};
//   {/* Side Buttons - Left Side */}
//   <div className="absolute left-3 top-[120px] h-[200px] flex flex-col gap-6 z-10">
//     {/* Volume Up */}
//     <div className="h-12">
//       <div className="h-full w-2 bg-gray-900 rounded-l-md shadow-lg" />
//     </div>
//     {/* Volume Down */}
//     <div className="h-12">
//       <div className="h-full w-2 bg-gray-900 rounded-l-md shadow-lg" />
//     </div>
//     {/* Silent Switch */}
//     <div className="h-8">
//       <div className="h-full w-2 bg-gray-900 rounded-l-md shadow-lg" />
//     </div>
//   </div>

//   {/* Side Button - Right Side */}
//   <div className="absolute right-3 top-[120px] h-12">
//     <div className="h-full w-2 bg-gray-800 rounded-r-md shadow-lg" />
//   </div>

//   {/* Phone Case Back */}
//   <div
//     className="h-full w-full rounded-[50px] shadow-xl relative"
//     style={{
//       ...backPanelStyle,
//       boxShadow: '0 0 0 6px #1a1a1a, 0 0 20px rgba(0,0,0,0.2)',
//     }}
//   >
//     {/* Camera Module */}
//     <IphoneCamera model={model} />

//     {/* Apple Logo */}
//     <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//       <div className="w-8 h-8 rounded-full bg-black/10 backdrop-blur-sm" />
//     </div>
//   </div>
// </div>

export default PhoneCase;
