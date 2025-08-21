import React, { useState } from "react";
import Header from "./components/Header";
import Book from "./components/Book";
import VQBook from "./components/VQBook";

/**
 * 메인 애플리케이션 컴포넌트
 * 
 * 이 컴포넌트는 플립북 애플리케이션의 루트 컴포넌트입니다.
 * 주요 기능:
 * - Friender와 VQ 프로젝트 간 전환 관리
 * - 헤더와 플립북 컴포넌트 렌더링
 * - 전역 상태 관리
 */
function App() {
  // 현재 선택된 책 상태 (기본값: friender)
  const [selectedBook, setSelectedBook] = useState("friender");

  /**
   * 책 변경 핸들러
   * 사용자가 다른 프로젝트를 선택할 때 호출
   * @param {string} bookType - 선택된 책 타입 ("friender" 또는 "vq")
   */
  const handleBookChange = (bookType) => {
    setSelectedBook(bookType);
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* 헤더 컴포넌트 */}
      <Header selectedBook={selectedBook} onBookChange={handleBookChange} />
      
      {/* 메인 콘텐츠 영역 */}
      <div className="flex-1 flex justify-center items-center p-2.5">
        {/* 선택된 책에 따라 적절한 플립북 컴포넌트 렌더링 */}
        {selectedBook === "friender" ? <Book /> : <VQBook />}
      </div>
    </div>
  );
}

export default App;
