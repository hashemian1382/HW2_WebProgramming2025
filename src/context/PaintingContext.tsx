import React, { createContext, useState, useContext, ReactNode } from 'react';
import type { PaintingState, PaintingContextType, Shape } from '../types';

const PaintingContext = createContext<PaintingContextType | undefined>(undefined);

export const PaintingProvider = ({ children }: { children: ReactNode }) => {
  const [paintingState, setPaintingState] = useState<PaintingState>({
    title: 'My Painting',
    shapes: [],
  });

  const setPaintingTitle = (title: string) => {
    setPaintingState((prevState) => ({ ...prevState, title }));
  };

  const addShape = (shape: Omit<Shape, 'id'>) => {
    const newShape: Shape = { ...shape, id: crypto.randomUUID() };
    setPaintingState((prevState) => ({
      ...prevState,
      shapes: [...prevState.shapes, newShape],
    }));
  };

  const removeShape = (id: string) => {
    setPaintingState((prevState) => ({
      ...prevState,
      shapes: prevState.shapes.filter((shape) => shape.id !== id),
    }));
  };

  const updateShapePosition = (id: string, x: number, y: number) => {
    setPaintingState((prevState) => ({
      ...prevState,
      shapes: prevState.shapes.map((shape) =>
        shape.id === id ? { ...shape, x, y } : shape
      ),
    }));
  };

  const loadPainting = (newState: PaintingState) => {
    setPaintingState(newState);
  };

  const value = {
    paintingState,
    setPaintingTitle,
    addShape,
    removeShape,
    updateShapePosition,
    loadPainting,
  };

  return (
    <PaintingContext.Provider value={value}>
      {children}
    </PaintingContext.Provider>
  );
};

export const usePainting = () => {
  const context = useContext(PaintingContext);
  if (context === undefined) {
    throw new Error('usePainting must be used within a PaintingProvider');
  }
  return context;
};