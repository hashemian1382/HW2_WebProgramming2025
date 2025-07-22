import React, { useRef } from 'react';
import { usePainting } from '../context/PaintingContext';
import { Shape as ShapeComponent } from './Shape';
import type { ShapeType } from '../types';

export const Canvas = () => {
  const { paintingState, addShape, updateShapePosition } = usePainting();
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!canvasRef.current) return;

    const canvasRect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - canvasRect.left;
    const y = e.clientY - canvasRect.top;

    const shapeType = e.dataTransfer.getData('shapeType') as ShapeType;
    const shapeId = e.dataTransfer.getData('shapeId');

    if (shapeId) {
      const offsetX = parseFloat(e.dataTransfer.getData('offsetX'));
      const offsetY = parseFloat(e.dataTransfer.getData('offsetY'));
      updateShapePosition(shapeId, x - offsetX, y - offsetY);
    } else if (shapeType) {
      addShape({ type: shapeType, x, y });
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <main
      ref={canvasRef}
      className="canvas"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {paintingState.shapes.map((shape) => (
        <ShapeComponent key={shape.id} shape={shape} />
      ))}
    </main>
  );
};