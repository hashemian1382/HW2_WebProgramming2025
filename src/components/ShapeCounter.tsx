import React from 'react';
import { usePainting } from '../context/PaintingContext';
import type { ShapeType } from '../types';

export const ShapeCounter = () => {
  const { paintingState } = usePainting();

  const counts = paintingState.shapes.reduce(
    (acc, shape) => {
      acc[shape.type]++;
      return acc;
    },
    { circle: 0, square: 0, triangle: 0 } as Record<ShapeType, number>
  );

  return (
    <footer className="counter">
      <div className="counter-item">
        <div className="shape-icon circle"></div>
        <span>{counts.circle}</span>
      </div>
      <div className="counter-item">
        <div className="shape-icon square"></div>
        <span>{counts.square}</span>
      </div>
      <div className="counter-item">
        <div className="shape-icon triangle"></div>
        <span>{counts.triangle}</span>
      </div>
    </footer>
  );
};