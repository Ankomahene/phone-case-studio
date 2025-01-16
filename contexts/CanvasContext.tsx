import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';

type CanvasContextType = {
  image: File | null;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  addImage: (file: File) => void;
};

const CanvasContext = createContext<CanvasContextType | undefined>(undefined);

export function CanvasProvider({ children }: { children: React.ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<File | null>(null);

  const addImage = useCallback((file: File) => {
    setImage(file);
  }, []);

  return (
    <CanvasContext.Provider value={{ image, canvasRef, addImage }}>
      {children}
    </CanvasContext.Provider>
  );
}

export function useCanvas() {
  const context = useContext(CanvasContext);
  if (context === undefined) {
    throw new Error('useCanvas must be used within a CanvasProvider');
  }
  return context;
}
