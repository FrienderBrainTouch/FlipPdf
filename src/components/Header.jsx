import React from 'react';

function Header() {
  // PDF 다운로드 함수
  const handleDownloadPDF = () => {
    const link = document.createElement('a');
    link.href = '/func-file/FrienderFile/프랜더-소개-책자.pdf';
    link.download = '프랜더-소개-책자.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 프린트 함수
  const handlePrint = () => {
    window.open('/func-file/FrienderFile/프랜더-소개-책자.pdf', '_blank');
    setTimeout(() => {
      window.print();
    }, 1000);
  };

  return (
    <header className="w-full py-4 px-6 flex justify-end items-center">
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
