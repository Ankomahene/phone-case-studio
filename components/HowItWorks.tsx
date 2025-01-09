import Image from 'next/image';

const steps = [
  {
    number: 1,
    title: 'Select a phone case',
    description: 'Choose an iPhone or Samsung case, then pick your model',
    image: '/images/step-1.svg',
  },
  {
    number: 2,
    title: 'Add your design',
    description: 'Make the phone case your own with a personal design',
    image: '/images/step-2.svg',
  },
  {
    number: 3,
    title: 'Download or Share',
    description: 'Download your phone case or share it with your friends',
    image: '/images/step-3.svg',
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-16 bg-gray-50/50 dark:bg-gray-900/50"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            How to create your own phone case
          </span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-6">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="rounded-full bg-gradient-to-r from-blue-600/10 to-purple-600/10 w-12 h-12 mb-4 flex items-center justify-center">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold text-lg">
                  {step.number}
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
