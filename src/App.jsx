import React, { useState } from "react";
import Header from "./components/Header";
import Book from "./components/Book";
import VQBook from "./components/VQBook";

function App() {
  const [selectedBook, setSelectedBook] = useState("friender");

  const handleBookChange = (bookType) => {
    setSelectedBook(bookType);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <Header selectedBook={selectedBook} onBookChange={handleBookChange} />
      <div className="flex-1 flex justify-center items-center p-2.5">
        {selectedBook === "friender" ? <Book /> : <VQBook />}
      </div>
    </div>
  );
}

export default App;
