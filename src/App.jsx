import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Book from './components/Book';
import VQBook from './components/VQBook';

function App() {
  return (
    <div className="w-full h-full flex flex-col">
      <Header />
      <div className="flex-1 flex justify-center items-center p-2.5">
        <Routes>
          <Route path="/" element={<Book />} />
          <Route path="/vq" element={<VQBook />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
