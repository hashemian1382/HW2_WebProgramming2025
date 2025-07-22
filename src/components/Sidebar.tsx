import React from 'react';
import type { ShapeType } from '../types';

const ToolShape = ({ type }: { type: ShapeType }) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('shapeType', type);
  };

  return (
    <div
      className={`shape-tool ${type}`}
      draggable
      onDragStart={handleDragStart}
    ></div>
  );
};

export const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h2>Tools</h2>
      <div className="tools-container">
        <ToolShape type="circle" />
        <ToolShape type="square" />
        <ToolShape type="triangle" />
      </div>
    </aside>
  );
};