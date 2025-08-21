import React from "react";

/**
 * 헤더 컴포넌트
 * 
 * 이 컴포넌트는 플립북 애플리케이션의 상단 헤더를 구현합니다.
 * 주요 기능:
 * - Friender와 VQ 프로젝트 간 전환
 * - 현재 선택된 프로젝트 정보 표시
 * - PDF 프린트 및 다운로드 기능
 * - 반응형 디자인 지원
 */
function Header({ selectedBook, onBookChange }) {
  /**
   * 현재 선택된 책 PDF 다운로드 함수
   * 선택된 프로젝트에 따라 적절한 PDF 파일을 다운로드
   */
  const handleDownloadCurrentPDF = () => {
    const link = document.createElement("a");
    if (selectedBook === "friender") {
      link.href = "/func-file/FrienderFile/프랜더-소개-책자.pdf";
      link.download = "프랜더-소개-책자.pdf";
    } else {
      link.href = "/func-file/VQFile/(주)브이큐스튜디오_소개 카달로그.pdf";
      link.download = "(주)브이큐스튜디오_소개 카달로그.pdf";
    }
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /**
   * 현재 선택된 책 PDF 프린트 함수
   * 새 창에서 PDF를 열고 자동으로 프린트 다이얼로그 표시
   */
  const handlePrintCurrentPDF = () => {
    const pdfUrl =
      selectedBook === "friender"
        ? "/func-file/FrienderFile/프랜더-소개-책자.pdf"
        : "/func-file/VQFile/(주)브이큐스튜디오_소개 카달로그.pdf";

    const pdfWindow = window.open(pdfUrl, "_blank");

    if (pdfWindow) {
      pdfWindow.onload = () => {
        pdfWindow.print();
      };

      // PDF 로딩 상태 확인을 위한 인터벌 설정
      const checkPdfLoaded = setInterval(() => {
        try {
          if (pdfWindow.document.readyState === "complete") {
            clearInterval(checkPdfLoaded);
            pdfWindow.print();
          }
        } catch {
          clearInterval(checkPdfLoaded);
          alert(
            "PDF가 열렸습니다. 브라우저의 프린트 버튼을 사용하여 프린트하세요."
          );
        }
      }, 100);

      // 10초 후 인터벌 정리 (타임아웃)
      setTimeout(() => {
        clearInterval(checkPdfLoaded);
      }, 10000);
    }
  };

  return (
    <header className="w-full py-4 px-6 flex flex-col items-center gap-4">
      {/* 책자 선택 버튼들과 기능 버튼들을 한 줄에 배치 */}
      <div className="flex items-center gap-4">
        {/* 책자 선택 버튼들 */}
        <div className="flex gap-3">
          {/* Friender 프로젝트 선택 버튼 */}
          <button
            onClick={() => onBookChange("friender")}
            className={`px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2 ${
              selectedBook === "friender"
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-gray-300 hover:bg-gray-400 text-gray-700"
            }`}
            title="Friender 플립북 보기"
          >Friender
          </button>
          
          {/* VQ 프로젝트 선택 버튼 */}
          <button
            onClick={() => onBookChange("vq")}
            className={`px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2 ${
              selectedBook === "vq"
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-gray-300 hover:bg-gray-400 text-gray-700"
            }`}
            title="VQ 플립북 보기"
          >VQ
          </button>
        </div>

        {/* 구분선 */}
        <div className="w-px h-8 bg-gray-300"></div>

        {/* 기능 버튼들 */}
        <div className="flex gap-3">
          {/* 프린트 버튼 */}
          <button
            onClick={handlePrintCurrentPDF}
            className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200"
            title={`${
              selectedBook === "friender" ? "Friender" : "VQ"
            } 프로젝트 프린트`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
              />
            </svg>
          </button>
          
          {/* 다운로드 버튼 */}
          <button
            onClick={handleDownloadCurrentPDF}
            className="p-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200"
            title={`${
              selectedBook === "friender" ? "Friender" : "VQ"
            } 프로젝트 PDF 다운로드`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </button>
        </div>
      </div>
{/* 
      현재 선택된 책 정보 표시
      <div className="text-white text-lg font-semibold">
        현재 선택:{" "}
        {selectedBook === "friender" ? "Friender 프로젝트" : "VQ 프로젝트"}
      </div> */}
    </header>
  );
}

export default Header;
