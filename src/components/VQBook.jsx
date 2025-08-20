import React, { useState, useEffect, useRef } from 'react'
import HTMLFlipBook from "react-pageflip";

function VQBook() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isCoverVisible, setIsCoverVisible] = useState(false);
  const [isMainImageAnimating, setIsMainImageAnimating] = useState(false);
  const [mainImageSize, setMainImageSize] = useState(1);
  const [selectedGif, setSelectedGif] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSourcePage, setModalSourcePage] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const animationRef = useRef(null);
  const bookRef = useRef(null);

  // PDF 경로 설정
  const pdfPath = "/func-file/VQFile/(주)브이큐스튜디오_소개 카달로그.pdf";

  // main 이미지 애니메이션 함수
  const animateMainImage = (startSize, endSize, duration) => {
    const startTime = performance.now();
    const sizeDiff = endSize - startSize;
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // 일정한 선형 애니메이션 (ease-out 효과 제거)
      const currentSize = startSize + (sizeDiff * progress);
      
      setMainImageSize(currentSize);
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
  };

  // PDF 프린트 기능
  const printPDF = () => {
    const printWindow = window.open(pdfPath, '_blank');
    if (printWindow) {
      printWindow.onload = () => {
        printWindow.print();
      };
    }
  };

  // PDF 다운로드 기능
  const downloadPDF = () => {
    const link = document.createElement('a');
    link.href = pdfPath;
    link.download = 'VQ 프로젝트.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 컴포넌트 마운트 시 표지 페이지 애니메이션 자동 실행
  useEffect(() => {
    // 페이지 로드 후 더 긴 지연을 두고 애니메이션 시작
    const timer = setTimeout(() => {
      setIsCoverVisible(true);
      
      // 2초 후에 main 이미지 애니메이션 시작
      const mainImageTimer = setTimeout(() => {
        setIsMainImageAnimating(true);
        // 애니메이션 시작
        const endSize = Math.min(window.innerWidth < 768 ? 320 : 320, 320); // 100px 작은 크기
        animateMainImage(1, endSize, 1000);
      }, 2000);
      
      return () => clearTimeout(mainImageTimer);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // 컴포넌트 언마운트 시 애니메이션 정리
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // 윈도우 크기 변경 감지
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 키보드 이벤트 처리
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        if (bookRef.current && currentPage > 0) {
          bookRef.current.pageFlip().flip(currentPage - 1);
        }
      } else if (e.key === 'ArrowRight') {
        if (bookRef.current && currentPage < 24) {
          bookRef.current.pageFlip().flip(currentPage + 1);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentPage]);

  // VQ 데이터
  const vqData = [
    {
      id: "2", 
      name: "VQ Page 2",
      description: "VQ 프로젝트 두 번째 페이지입니다."
    },
    {
      id: "3",
      name: "VQ Page 3", 
      description: "VQ 프로젝트 세 번째 페이지입니다."
    },
    {
      id: "4",
      name: "VQ Page 4", 
      description: "VQ 프로젝트 네 번째 페이지입니다."
    },
    {
      id: "5",
      name: "VQ Page 5", 
      description: "VQ 프로젝트 다섯 번째 페이지입니다."
    },
    {
      id: "6",
      name: "VQ Page 6", 
      description: "VQ 프로젝트 여섯 번째 페이지입니다."
    },
    {
      id: "7",
      name: "VQ Page 7", 
      description: "VQ 프로젝트 일곱 번째 페이지입니다."
    },
    {
      id: "8",
      name: "VQ Page 8", 
      description: "VQ 프로젝트 여덟 번째 페이지입니다."
    },
    {
      id: "9",
      name: "VQ Page 9", 
      description: "VQ 프로젝트 아홉 번째 페이지입니다."
    },
    {
      id: "10",
      name: "VQ Page 10", 
      description: "VQ 프로젝트 열 번째 페이지입니다."
    },
    {
      id: "11",
      name: "VQ Page 11", 
      description: "VQ 프로젝트 열한 번째 페이지입니다."
    },
    {
      id: "12",
      name: "VQ Page 12", 
      description: "VQ 프로젝트 열두 번째 페이지입니다."
    },
    {
      id: "13",
      name: "VQ Page 13", 
      description: "VQ 프로젝트 열세 번째 페이지입니다."
    },
    {
      id: "14",
      name: "VQ Page 14", 
      description: "VQ 프로젝트 열네 번째 페이지입니다."
    },
    {
      id: "15",
      name: "VQ Page 15", 
      description: "VQ 프로젝트 열다섯 번째 페이지입니다."
    },
    {
      id: "16",
      name: "VQ Page 16", 
      description: "VQ 프로젝트 열여섯 번째 페이지입니다."
    },
    {
      id: "17",
      name: "VQ Page 17", 
      description: "VQ 프로젝트 열일곱 번째 페이지입니다."
    },
    {
      id: "18",
      name: "VQ Page 18", 
      description: "VQ 프로젝트 열여덟 번째 페이지입니다."
    },
    {
      id: "19",
      name: "VQ Page 19", 
      description: "VQ 프로젝트 열아홉 번째 페이지입니다."
    },
    {
      id: "20",
      name: "VQ Page 20", 
      description: "VQ 프로젝트 스물 번째 페이지입니다."
    },
    {
      id: "21",
      name: "VQ Page 21", 
      description: "VQ 프로젝트 스물한 번째 페이지입니다."
    },
    {
      id: "22",
      name: "VQ Page 22", 
      description: "VQ 프로젝트 스물두 번째 페이지입니다."
    },
    {
      id: "23",
      name: "VQ Page 23", 
      description: "VQ 프로젝트 스물세 번째 페이지입니다."
    },
    {
      id: "24",
      name: "VQ Page 24", 
      description: "VQ 프로젝트 스물네 번째 페이지입니다."
    }
  ];

  // VQ section-img 이미지 매핑 (페이지별)
  const vqSectionImgMapping = {
    2: [
      "/interacivefile/VQFile/sectionimg/2-1.png",
      "/interacivefile/VQFile/sectionimg/2-2.png",
      "/interacivefile/VQFile/sectionimg/2-3.png"
    ],
    3: [
      "/interacivefile/VQFile/sectionimg/3-1.png",
      "/interacivefile/VQFile/sectionimg/3-2.png"
    ],
    4: ["/interacivefile/VQFile/sectionimg/4-1.png"],
    5: ["/interacivefile/VQFile/sectionimg/5-1.png"],
    6: ["/interacivefile/VQFile/sectionimg/6-1.png"],
    7: ["/interacivefile/VQFile/sectionimg/7-1.png"],
    8: ["/interacivefile/VQFile/sectionimg/8-1.png"],
    9: ["/interacivefile/VQFile/sectionimg/9-1.png"],
    10: ["/interacivefile/VQFile/sectionimg/10-1.png"],
    11: ["/interacivefile/VQFile/sectionimg/11-1.png"],
    12: ["/interacivefile/VQFile/sectionimg/12-1.png"],
    13: ["/interacivefile/VQFile/sectionimg/13-1.png"],
    14: ["/interacivefile/VQFile/sectionimg/14-1.png"],
    15: ["/interacivefile/VQFile/sectionimg/15-1.png"],
    16: ["/interacivefile/VQFile/sectionimg/16-1.png"],
    17: ["/interacivefile/VQFile/sectionimg/17-1.png"],
    18: ["/interacivefile/VQFile/sectionimg/18-1.png"],
    19: ["/interacivefile/VQFile/19-1-video.mp4"],
    20: ["/interacivefile/VQFile/sectionimg/20-1.png"],
    21: ["/interacivefile/VQFile/sectionimg/21-1.png"],
    22: ["/interacivefile/VQFile/sectionimg/22-1.png"],
    23: ["/interacivefile/VQFile/sectionimg/23-1.png"]
  };

  // VQ 페이지별 개별 이미지 위치 설정
  const vqIndividualImagePositions = {
    2: [
      {
        position: 'absolute',
        top: '17%',
        left: '9%',
        width: '100%',
        maxWidth: '300px'
      },
      {
        position: 'absolute',
        top: '48%',
        left: '8%',
        width: '100%',
        maxWidth: '320px'
      },
      {
        position: 'absolute',
        bottom: '8%',
        left: '9%',
        width: '100%',
        maxWidth: '320px'
      }
    ],
    3: [
      {
        position: 'absolute',
        top: '17%',
        left: '4%',
        width: '100%',
        maxWidth: '310px'
      },
      {
        position: 'absolute',
        bottom: '4%',
        right: '12%',
        width: '100%',
        maxWidth: '310px'
      }
    ],
    4: [
      {
        position: 'absolute',
        top: '9%',
        left: '8%',
        width: '100%',
        maxWidth: '300px'
      }
    ],
    5: [
      {
        position: 'absolute',
        bottom: '6%',
        right: '7%',
        width: '100%',
        maxWidth: '180px'
      }
    ],
    6: [
      {
        position: 'absolute',
        top: '19%',
        left: '25%',
        width: '100%',
        maxWidth: '190px'
      }
    ],
    7: [
      {
        position: 'absolute',
        top: '19%',
        left: '9%',
        width: '100%',
        maxWidth: '300px'
      }
    ],
    8: [
      {
        position: 'absolute',
        top: '20%',
        left: '25%',
        width: '100%',
        maxWidth: '190px'
      }
    ],
    9: [
      {
        position: 'absolute',
        top: '19%',
        left: '16%',
        width: '100%',
        maxWidth: '245px'
      }
    ],
    10: [
      {
        position: 'absolute',
        top: '20%',
        left: '25%',
        width: '100%',
        maxWidth: '190px'
      }
    ],
    11: [
      {
        position: 'absolute',
        top: '17%',
        left: '24%',
        width: '100%',
        maxWidth: '184px'
      }
    ],
    12: [
      {
        position: 'absolute',
        top: '20%',
        left: '24%',
        width: '100%',
        maxWidth: '195px'
      }
    ],
    13: [
      {
        position: 'absolute',
        top: '11%',
        left: '0%',
        width: '100%',
        maxWidth: '292px'
      }
    ],
    14: [
      {
        position: 'absolute',
        top: '20%',
        left: '25%',
        width: '100%',
        maxWidth: '190px'
      }
    ],
    15: [
      {
        position: 'absolute',
        top: '30%',
        left: '14%',
        width: '100%',
        maxWidth: '268px'
      }
    ],
    16: [
      {
        position: 'absolute',
        top: '20%',
        left: '25%',
        width: '100%',
        maxWidth: '190px'
      }
    ],
    17: [
      {
        position: 'absolute',
        top: '8%',
        left: '0%',
        width: '100%',
        maxWidth: '288px'
      }
    ],
    18: [
      {
        position: 'absolute',
        top: '10%',
        left: '9%',
        width: '100%',
        maxWidth: '298px'
      }
    ],
    19: [
      {
        position: 'absolute',
        top: '10%',
        left: '25%',
        width: '100%',
        maxWidth: '175px'
      }
    ],
    20: [
      {
        position: 'absolute',
        top: '9%',
        left: '9%',
        width: '100%',
        maxWidth: '308px'
      }
    ],
    21: [
      {
        position: 'absolute',
        top: '9%',
        left: '12%',
        width: '100%',
        maxWidth: '264px'
      }
    ],
    22: [
      {
        position: 'absolute',
        top: '27%',
        left: '13%',
        width: '100%',
        maxWidth: '284px'
      }
    ],
    23: [
      {
        position: 'absolute',
        top: '35%',
        left: '31%',
        width: '100%',
        maxWidth: '134px'
      }
    ]
  };

  // section-img 클릭 핸들러
  const handleSectionImgClick = (imgSrc, event, pageId) => {
    event.stopPropagation(); // 이벤트 전파 방지
    setSelectedGif(imgSrc);
    setModalSourcePage(parseInt(pageId));
    setIsModalOpen(true);
  };

  // 모달 닫기 핸들러
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedGif(null);
    
    // 모달이 닫힐 때 해당 페이지로 이동
    if (modalSourcePage !== null && bookRef.current) {
      setTimeout(() => {
        // 페이지 ID를 인덱스로 변환 (표지 페이지는 0, 나머지는 ID-1)
        const pageIndex = modalSourcePage === 1 ? 0 : modalSourcePage - 1;
        bookRef.current.pageFlip().flip(pageIndex);
      }, 100);
    }
    setModalSourcePage(null);
  };

  // 해상도 확인하여 크기 지정
  const bookWidth = isMobile ? 320 : 370;
  const bookHeight = isMobile ? 450 : 500;

  // 반응형 이미지 크기 계산 함수
  const getResponsiveImageSize = (baseSize, isMobile) => {
    return isMobile ? baseSize * 0.8 : baseSize;
  };

  // 반응형 이미지 위치 계산 함수
  const getResponsiveImagePosition = (baseConfig, isMobile) => {
    const scale = isMobile ? 0.9 : 1;
    return {
      ...baseConfig,
      width: `${parseFloat(baseConfig.width) * scale}%`,
      maxWidth: `${getResponsiveImageSize(parseInt(baseConfig.maxWidth), isMobile)}px`
    };
  };

  // 페이지 변경 감지
  const handlePageChange = (e) => {
    const newPage = e.data;
    setCurrentPage(newPage);
    
    // 표지 페이지(0번)가 완전히 보일 때 애니메이션 활성화
    if (newPage === 0) {
      setTimeout(() => {
        setIsCoverVisible(true);
        // 2초 후에 main 이미지 애니메이션 시작
        setTimeout(() => {
          setIsMainImageAnimating(true);
          const endSize = Math.min(window.innerWidth < 768 ? 320 : 320, 320);
          animateMainImage(1, endSize, 1000);
        }, 2000);
      }, 500);
    } else {
      setIsCoverVisible(false);
      setIsMainImageAnimating(false);
      setMainImageSize(1);

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-2 sm:p-3 md:p-4 lg:p-6">
      {/* 기능 버튼들 */}
      <div className="flex justify-center gap-4 mb-6">
        <button 
          onClick={printPDF}
          className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-2"
        >
          🖨️ 프린트
        </button>
        <button 
          onClick={downloadPDF}
          className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-2"
        >
          📥 PDF 다운로드
        </button>
      </div>

      {/* 플립북 컨테이너 */}
      <div className="flex justify-center items-center perspective-1000">
        <HTMLFlipBook 
          ref={bookRef}
          width={bookWidth} 
          height={bookHeight}
          maxShadowOpacity={0.5}
          drawShadow={true}
          showCover={true}
          flippingTime={800}
          showPageCorners={false}
          size='fixed'
          onFlip={handlePageChange}
          usePortrait={isMobile}
          useMouseEvents={true}
          swipeDistance={50}
          disableFlipByClick={false}
          className="transform-style-preserve-3d"
        >
          {/* 표지 페이지 */}
          <div className="bg-gradient-to-br from-white to-gray-50 rounded shadow-lg relative overflow-hidden">
            <div className="w-full h-full flex flex-col justify-center items-center p-0 text-center bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold relative">
              {/* 배경 이미지 */}
              <img 
                src="/Pdf-img/VQ/1.png"
                alt="VQ Cover Background" 
                className="w-full h-full object-cover"
              />
              
              {/* 페이지 그림자 효과 */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent pointer-events-none"></div>
            </div>
          </div>

          {vqData.map((page, index) => (
            <div 
              key={page.id} 
              className="bg-gradient-to-br from-white to-gray-50 rounded shadow-lg relative"
            >
              <div className="w-full h-full flex flex-col justify-center items-center p-0">
                <div className="w-full h-full relative">
                  <img 
                    src={`/Pdf-img/VQ/${page.id}.png`}
                    alt={page.name} 
                    className="w-full h-full object-cover pointer-events-none"
                  />
                  
                  {/* 각 페이지별 section-img 이미지들을 개별적으로 배치 */}
                  {vqSectionImgMapping[page.id] && vqIndividualImagePositions[page.id] && (
                    <>
                      {vqSectionImgMapping[page.id].map((mediaSrc, imgIndex) => {
                        const isVideo = mediaSrc.endsWith('.mp4');
                        return (
                          <div
                            key={imgIndex}
                            className="absolute cursor-pointer hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-blue-500 rounded-lg pointer-events-auto bg-transparent"
                            style={getResponsiveImagePosition(vqIndividualImagePositions[page.id][imgIndex], isMobile)}
                            onClick={(e) => handleSectionImgClick(mediaSrc, e, page.id)}
                          >
                            {isVideo ? (
                              <video 
                                src={mediaSrc}
                                className="w-full h-full rounded-lg object-contain opacity-100 cursor-pointer hover:scale-105 transition-transform duration-300"
                                controls
                                muted
                                loop
                                autoPlay={false}
                              />
                            ) : (
                              <img 
                                src={mediaSrc}
                                alt={`Section ${page.id}-${imgIndex + 1}`}
                                className="w-full h-full object-contain opacity-0 hover:opacity-100 transition-opacity duration-300"
                              />
                            )}
                          </div>
                        );
                      })}
                    </>
                  )}
                  
                  {/* 페이지 그림자 효과 */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent pointer-events-none"></div>
                </div>
              </div>
            </div>
          ))}
        </HTMLFlipBook>
      </div>

      {/* 네비게이션 */}
      <div className="flex justify-center gap-5 mt-6">
        <button 
          onClick={() => bookRef.current?.pageFlip().flip(currentPage - 1)}
          disabled={currentPage === 0}
          className="px-4 py-2 bg-white text-gray-700 rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          ◀ 이전
        </button>
        <span className="px-4 py-2 text-white font-bold">
          {currentPage + 1} / 25
        </span>
        <button 
          onClick={() => bookRef.current?.pageFlip().flip(currentPage + 1)}
          disabled={currentPage === 24}
          className="px-4 py-2 bg-white text-gray-700 rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          다음 ▶
        </button>
      </div>

      {/* 개선된 Gif 모달 */}
      {isModalOpen && selectedGif && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-2xl p-6 max-w-4xl max-h-[90vh] overflow-auto relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 닫기 버튼 */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-3xl font-bold z-10 transition-colors duration-300"
            >
              ×
            </button>
            
            {/* 미디어 (이미지 또는 비디오) */}
            {selectedGif.endsWith('.mp4') ? (
              <video 
                src={selectedGif} 
                className="w-full h-auto object-contain rounded-lg"
                controls
                muted
                loop
                autoPlay={false}
              />
            ) : (
              <img 
                src={selectedGif} 
                alt="Selected Media" 
                className="w-full h-auto object-contain rounded-lg"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default VQBook