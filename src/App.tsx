import React from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Canvas } from './components/Canvas';
import { ShapeCounter } from './components/ShapeCounter';
import { PaintingProvider } from './context/PaintingContext';

function App() {
  return (
    <PaintingProvider>
      <div className="app-container">
        <Header />
        <Sidebar />
        <Canvas />
        <ShapeCounter />
      </div>
    </PaintingProvider>
  );
}

export default App;