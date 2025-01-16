export type IPhoneModel = 'iphone14' | 'iphone15' | 'iphone15pro';

export interface ImageEffects {
  opacity: number;
  brightness: number;
  contrast: number;
  saturation: number;
  blur: number;
  hue: number;
}

export interface TextElement {
  id: string;
  text: string;
  font: string;
  position: { x: number; y: number };
}
