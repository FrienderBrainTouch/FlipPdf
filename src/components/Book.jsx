import React, { useState, useEffect, useRef } from 'react'
import HTMLFlipBook from "react-pageflip";

function Book() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isCoverVisible, setIsCoverVisible] = useState(false);
  const [isMainImageAnimating, setIsMainImageAnimating] = useState(false);
  const [mainImageSize, setMainImageSize] = useState(1);
  const [selectedGif, setSelectedGif] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const animationRef = useRef(null);

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

    const frienderData = [
    {
      id: "2", 
      name: "Friender Page 2",
      description: "Friender 프로젝트 두 번째 페이지입니다."
    },
    {
      id: "3",
      name: "Friender Page 3", 
      description: "Friender 프로젝트 세 번째 페이지입니다."
    },
    {
      id: "4",
      name: "Friender Page 4", 
      description: "Friender 프로젝트 네 번째 페이지입니다."
    },
    {
      id: "5",
      name: "Friender Page 5", 
      description: "Friender 프로젝트 다섯 번째 페이지입니다."
    },
    {
      id: "6",
      name: "Friender Page 6", 
      description: "Friender 프로젝트 여섯 번째 페이지입니다."
    },
    {
      id: "7",
      name: "Friender Page 7", 
      description: "Friender 프로젝트 일곱 번째 페이지입니다."
    },
    {
      id: "8",
      name: "Friender Page 8", 
      description: "Friender 프로젝트 여덟 번째 페이지입니다."
    }
  ];

  // gif 파일 매핑
  const gifMapping = {
    1: "/interacivefile/FrienderFile/1-탄소-중립을-통해-지구촌-기후변화를-예방.gif",
    2: "/interacivefile/FrienderFile/2-친환경-에너지-자립마을-만들기.gif",
    3: "/interacivefile/FrienderFile/3-탄소-중립-실천.gif",
    4: "/interacivefile/FrienderFile/4-똑똑한-재활용-쓰레기-분리배출-실천.gif",
    5: "/interacivefile/FrienderFile/5-에너지가-가정에-오기까지의-여정.gif",
    6: "/interacivefile/FrienderFile/6-해양-오염-구조-탐사대-체험.gif"
  };

  // gif 클릭 핸들러
  const handleGifClick = (gifNumber, event) => {
    event.stopPropagation(); // 이벤트 전파 방지
    setSelectedGif(gifMapping[gifNumber]);
    setIsModalOpen(true);
  };

  // 모달 닫기 핸들러
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedGif(null);
  };



  // 해상도 확인하여 크기 지정
  const isMobile = window.innerWidth < 768;
  const bookWidth = isMobile ? 320 : 370;
  const bookHeight = isMobile ? 450 : 500;

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
    <div className="w-full h-full flex justify-center items-center p-2 sm:p-3 md:p-4 lg:p-6">
      <HTMLFlipBook 
        width={bookWidth} 
        height={bookHeight}
        maxShadowOpacity={0.5}
        drawShadow={true}
        showCover={true}
        flippingTime={300}
        showPageCorners={false}
        size='fixed'
        onFlip={handlePageChange}
      >
        {/* 표지 페이지 */}
        <div className="bg-gradient-to-br from-white to-gray-50 rounded shadow-lg relative overflow-hidden">
          <div className="w-full h-full flex flex-col justify-center items-center p-0 text-center bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold relative">
            {/* 배경 이미지 */}
            <img 
              src="/Pdf-img/Friender/1.jpg"
              alt="Friender Cover Background" 
              className="w-full h-full object-cover"
            />
            
            {/* main 이미지 오버레이 - 중앙에 배치 */}
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src="/interacivefile/FrienderFile/main.png"
                alt="Friender Main" 
                style={{
                  width: `${mainImageSize}px`,
                  height: `${mainImageSize}px`,
                  opacity: isCoverVisible ? 1 : 0,
                  objectFit: 'contain',
                  transition: 'opacity 1s cubic-bezier(0.4, 0, 1, 1)'
                }}
              />
              
              {/* title과 subtitle - main 이미지 위에 오버레이 */}
              {isMainImageAnimating && mainImageSize > 50 && (
                <div 
                  className="absolute"
                  style={{
                    left: `${mainImageSize * 0.1}px`, // main 이미지 왼쪽에서 10% 위치
                    bottom: `${mainImageSize * 0.1 + 50}px`, // main 이미지 아래에서 10% + 50px 위치
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '10px'
                  }}
                >
                  {/* title */}
                  <img 
                    src="/interacivefile/FrienderFile/title.png"
                    alt="Friender Title" 
                    style={{
                      width: `${mainImageSize * 0.8}px`, // main 이미지보다 20% 작게
                      height: 'auto',
                      opacity: isCoverVisible ? 1 : 0,
                      transition: 'opacity 1s cubic-bezier(0.4, 0, 1, 1)'
                    }}
                  />
                  
                  {/* subtitle */}
                  <img 
                    src="/interacivefile/FrienderFile/subtitle.png"
                    alt="Friender Subtitle" 
                    style={{
                      width: `${mainImageSize * 0.5}px`, // main 이미지의 50% 크기
                      height: 'auto',
                      opacity: isCoverVisible ? 1 : 0,
                      transition: 'opacity 1s cubic-bezier(0.4, 0, 1, 1)'
                    }}
                  />
                </div>
              )}
            </div>

            {/* 기존 title과 subtitle 제거 */}
          </div>
        </div>

        {frienderData.map((page, index) => (
          <div key={page.id} className="bg-gradient-to-br from-white to-gray-50 rounded shadow-lg">
            <div className="w-full h-full flex flex-col justify-center items-center p-0">
              <div className="w-full h-full relative">
                <img 
                  src={`/Pdf-img/Friender/${page.id}.jpg`}
                  alt={page.name} 
                  className="w-full h-full object-cover"
                />
                
                {/* 4페이지(index === 2)에만 이미지들을 추가 */}
                {index === 2 && (
                  <div 
                    className="absolute flex justify-between items-center"
                    style={{
                      top: '13%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '85%'
                    }}
                  >
                    <img 
                      src="/interacivefile/FrienderFile/environ-1.png"
                      alt="Environment 1" 
                      className="flex-1 max-w-[calc(15%-2px)] h-auto object-contain cursor-pointer hover:scale-110 transition-transform duration-200"
                      onClick={(e) => handleGifClick(1, e)}
                    />
                    <img 
                      src="/interacivefile/FrienderFile/environ-2.png"
                      alt="Environment 2" 
                      className="flex-1 max-w-[calc(15%-2px)] h-auto object-contain cursor-pointer hover:scale-110 transition-transform duration-200"
                      onClick={(e) => handleGifClick(2, e)}
                    />
                    <img 
                      src="/interacivefile/FrienderFile/environ-3.png"
                      alt="Environment 3" 
                      className="flex-1 max-w-[calc(15%-2px)] h-auto object-contain cursor-pointer hover:scale-110 transition-transform duration-200"
                      onClick={(e) => handleGifClick(3, e)}
                    />
                    <img 
                      src="/interacivefile/FrienderFile/environ-4.png"
                      alt="Environment 4" 
                      className="flex-1 max-w-[calc(15%-2px)] h-auto object-contain cursor-pointer hover:scale-110 transition-transform duration-200"
                      onClick={(e) => handleGifClick(4, e)}
                    />
                    <img 
                      src="/interacivefile/FrienderFile/environ-5.png"
                      alt="Environment 5" 
                      className="flex-1 max-w-[calc(15%-2px)] h-auto object-contain cursor-pointer hover:scale-110 transition-transform duration-200"
                      onClick={(e) => handleGifClick(5, e)}
                    />
                    <img 
                      src="/interacivefile/FrienderFile/environ-6.png"
                      alt="Environment 6" 
                      className="flex-1 max-w-[calc(15%-2px)] h-auto object-contain cursor-pointer hover:scale-110 transition-transform duration-200"
                      onClick={(e) => handleGifClick(6, e)}
                    />
                  </div>
                )}
                
                {/* 5페이지(index === 3)에만 비디오 추가 */}
                {index === 3 && (
                  <div 
                    className="absolute flex justify-center items-center"
                    style={{
                      top: '10%',
                      left: '47%',
                      transform: 'translateX(-50%)',
                      width: '90%'
                    }}
                  >
                    <video 
                      src="/interacivefile/FrienderFile/BlockCoding-VR.mp4"
                      className="w-[200px] h-[100px] object-contain"
                      controls
                      muted
                      loop
                      autoPlay={false}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </HTMLFlipBook>

      {/* Gif 모달 */}
      {isModalOpen && selectedGif && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 max-w-4xl max-h-[90vh] overflow-auto relative">
            {/* 닫기 버튼 */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl font-bold z-10"
            >
              ×
            </button>
            
            {/* Gif 이미지 */}
            <img 
              src={selectedGif} 
              alt="Selected Gif" 
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Book