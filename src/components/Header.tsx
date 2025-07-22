import React, { useRef } from 'react';
import { usePainting } from '../context/PaintingContext';
import type { PaintingState } from '../types';

export const Header = () => {
  const { paintingState, setPaintingTitle, loadPainting } = usePainting();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const dataStr = JSON.stringify(paintingState, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${paintingState.title.replace(/\s+/g, '_')}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result;
        if (typeof text === 'string') {
          const importedState: PaintingState = JSON.parse(text);
          if (importedState.title && Array.isArray(importedState.shapes)) {
            loadPainting(importedState);
          } else {
            alert('Invalid file format.');
          }
        }
      } catch (error) {
        alert('Failed to parse JSON file.');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  return (
    <header className="header">
      <input
        type="text"
        value={paintingState.title}
        onChange={(e) => setPaintingTitle(e.target.value)}
        className="painting-title-input"
      />
      <div className="header-buttons">
        <button onClick={handleExport}>Export</button>
        <button onClick={handleImportClick}>Import</button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".json"
          style={{ display: 'none' }}
        />
      </div>
    </header>
  );
};