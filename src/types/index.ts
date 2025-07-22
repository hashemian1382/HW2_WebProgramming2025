export type ShapeType = 'circle' | 'square' | 'triangle';

export interface Shape {
  id: string;
  type: ShapeType;
  x: number;
  y: number;
}

export interface PaintingState {
  title: string;
  shapes: Shape[];
}

export interface PaintingContextType {
  paintingState: PaintingState;
  setPaintingTitle: (title: string) => void;
  addShape: (shape: Omit<Shape, 'id'>) => void;
  removeShape: (id: string) => void;
  updateShapePosition: (id: string, x: number, y: number) => void;
  loadPainting: (newState: PaintingState) => void;
}