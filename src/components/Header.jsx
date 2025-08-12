import React from 'react';
import { useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  
  // 현재 경로에 따라 선택된 책 결정
  const selectedBook = location.pathname === '/vq' ? 'vq' : 'friender';

  // PDF 다운로드 함수
  const handleDownloadPDF = () => {
    const link = document.createElement('a');
    if (selectedBook === 'friender') {
      link.href = '/func-file/FrienderFile/프랜더-소개-책자.pdf';
      link.download = '프랜더-소개-책자.pdf';
    } else {
      link.href = '/func-file/VQFile/(주)브이큐스튜디오_소개 카달로그.pdf';
      link.download = '(주)브이큐스튜디오_소개 카달로그.pdf';
    }
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // PDF 프린트 함수
  const handlePrint = () => {
    // PDF 파일 경로
    const pdfUrl = selectedBook === 'friender' 
      ? '/func-file/FrienderFile/프랜더-소개-책자.pdf'
      : '/func-file/VQFile/(주)브이큐스튜디오_소개 카달로그.pdf';
    
    // 1단계: PDF를 새 창에서 열기
    const pdfWindow = window.open(pdfUrl, '_blank');
    
    // 2단계: PDF가 로드된 후 프린트 호출
    if (pdfWindow) {
      pdfWindow.onload = () => {
        // PDF 페이지에서 프린트 다이얼로그 열기
        pdfWindow.print();
      };
      
      // PDF 로드 확인을 위한 폴링 (onload가 작동하지 않는 경우 대비)
      const checkPdfLoaded = setInterval(() => {
        try {
          if (pdfWindow.document.readyState === 'complete') {
            clearInterval(checkPdfLoaded);
            pdfWindow.print();
          }
        } catch (error) {
          // CORS 오류 등으로 인해 접근할 수 없는 경우
          clearInterval(checkPdfLoaded);
          // 대안: 사용자가 수동으로 프린트하도록 안내
          alert('PDF가 열렸습니다. 브라우저의 프린트 버튼을 사용하여 프린트하세요.');
        }
      }, 100);
      
      // 10초 후 폴링 중단
      setTimeout(() => {
        clearInterval(checkPdfLoaded);
      }, 10000);
    }
  };

  return (
    <header className="w-full py-4 px-6 flex justify-center items-center">
      {/* 기능 버튼들 */}
      <div className="flex gap-3">
        <button
          onClick={handlePrint}
          className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200"
          title="프린트"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
        </button>
        <button
          onClick={handleDownloadPDF}
          className="p-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200"
          title="PDF 다운로드"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </button>
      </div>
    </header>
  );
}

export default Header;
