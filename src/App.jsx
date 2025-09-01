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
  // URL 쿼리 파라미터에서 책 타입을 읽어오거나 기본값 사용
  const getInitialBookType = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const bookType = urlParams.get('book');
    return bookType === 'vq' ? 'vq' : 'friender';
  };

  // 현재 선택된 책 상태
  const [selectedBook, setSelectedBook] = useState(getInitialBookType());

  /**
   * 책 변경 핸들러
   * 사용자가 다른 프로젝트를 선택할 때 호출
   * @param {string} bookType - 선택된 책 타입 ("friender" 또는 "vq")
   */
  const handleBookChange = (bookType) => {
    setSelectedBook(bookType);
    
    // URL 쿼리 파라미터 업데이트
    const url = new URL(window.location);
    url.searchParams.set('book', bookType);
    window.history.pushState({}, '', url);
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* 헤더 컴포넌트 - 스크롤할 때 따라다님 */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#0e1a26] border-b border-gray-700">
        <Header selectedBook={selectedBook} onBookChange={handleBookChange} />
      </div>
      
      {/* 메인 콘텐츠 영역 */}
      <div className="flex-1 flex justify-center items-center p-0 pt-[32px] md:p-2.5">
        {/* 선택된 책에 따라 적절한 플립북 컴포넌트 렌더링 */}
        {selectedBook === "friender" ? <Book /> : <VQBook />}
      </div>
    </div>
  );
}

export default App;
