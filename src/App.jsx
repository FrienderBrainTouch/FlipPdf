import React from 'react';
import Header from './components/Header';
import Book from './components/Book';

function App() {
  return (
    <div className="w-full h-full flex flex-col">
      <Header />
      <div className="flex-1 flex justify-center items-center p-2.5">
        <Book />
      </div>
    </div>
  );
}

export default App;
