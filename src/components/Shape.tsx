import React from 'react';
import { usePainting } from '../context/PaintingContext';
import type { Shape as ShapeProps } from '../types';

export const Shape = ({ shape }: { shape: ShapeProps }) => {
  const { removeShape } = usePainting();

  const handleDoubleClick = () => {
    removeShape(shape.id);
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('shapeId', shape.id);
    
    
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    e.dataTransfer.setData('offsetX', offsetX.toString());
    e.dataTransfer.setData('offsetY', offsetY.toString());
  };

  return (
    <div
      className={`canvas-shape ${shape.type}`}
      style={{ left: `${shape.x}px`, top: `${shape.y}px` }}
      onDoubleClick={handleDoubleClick}
      onDragStart={handleDragStart}
      draggable
    ></div>
  );
};