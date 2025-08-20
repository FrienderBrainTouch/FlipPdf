import React, { useState, useEffect, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import Model3D from "./Model3D";

function Book() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isCoverVisible, setIsCoverVisible] = useState(false);
  const [isMainImageAnimating, setIsMainImageAnimating] = useState(false);
  const [mainImageSize, setMainImageSize] = useState(1);
  const [mainImageRotation, setMainImageRotation] = useState(0);
  const [mainImageOpacity, setMainImageOpacity] = useState(0);
  const [titleOpacity, setTitleOpacity] = useState(0);
  const [subtitleOpacity, setSubtitleOpacity] = useState(0);
  const [backgroundScale, setBackgroundScale] = useState(1.2);
  const [backgroundBlur, setBackgroundBlur] = useState(0);
  const [selectedGif, setSelectedGif] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSourcePage, setModalSourcePage] = useState(null);
  const [is3DModalOpen, setIs3DModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const animationRef = useRef(null);
  const bookRef = useRef(null);

  // PDF 경로 설정
  const pdfPath = "/func-file/FrienderFile/프랜더-소개-책자.pdf";

  // 화려한 표지 애니메이션 함수
  const animateCover = (duration) => {
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // 배경 애니메이션 (0-30%)
      if (progress <= 0.3) {
        const bgProgress = progress / 0.3;
        setBackgroundScale(1.2 - 0.2 * bgProgress);
        setBackgroundBlur(5 * bgProgress);
      }

      // 메인 이미지 등장 애니메이션 (20-50%)
      if (progress >= 0.2 && progress <= 0.5) {
        const imgProgress = (progress - 0.2) / 0.3;
        setMainImageOpacity(imgProgress);
        setMainImageRotation(360 * imgProgress);
        setMainImageSize(1 + 319 * imgProgress);
      }

      // 메인 이미지 크기 조정 및 회전 정리 (50-80%)
      if (progress >= 0.5 && progress <= 0.8) {
        const sizeProgress = (progress - 0.5) / 0.3;
        setMainImageSize(320 + 0 * sizeProgress); // 크기 유지
        setMainImageRotation(360 - 360 * sizeProgress); // 360도에서 0도로 회전 정리
      }

      // 타이틀과 서브타이틀 등장 (70-100%)
      if (progress >= 0.7 && progress <= 1) {
        const textProgress = (progress - 0.7) / 0.3;
        setTitleOpacity(textProgress);
        setSubtitleOpacity(textProgress);
      }

      // 애니메이션 완료 시 회전을 0도로 직접 설정
      if (progress >= 1) {
        setMainImageRotation(0);
      }

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  // PDF 프린트 기능
  const printPDF = () => {
    const printWindow = window.open(pdfPath, "_blank");
    if (printWindow) {
      printWindow.onload = () => {
        printWindow.print();
      };
    }
  };

  // PDF 다운로드 기능
  const downloadPDF = () => {
    const link = document.createElement("a");
    link.href = pdfPath;
    link.download = "Friender 프로젝트.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 컴포넌트 마운트 시 표지 페이지 애니메이션 자동 실행
  useEffect(() => {
    // 페이지 로드 후 더 긴 지연을 두고 애니메이션 시작
    const timer = setTimeout(() => {
      setIsCoverVisible(true);

      // 1초 후에 화려한 애니메이션 시작
      const animationTimer = setTimeout(() => {
        setIsMainImageAnimating(true);
        // 화려한 애니메이션 시작 (3초)
        animateCover(3000);
      }, 1000);

      return () => clearTimeout(animationTimer);
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

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 키보드 이벤트 처리
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        if (bookRef.current && currentPage > 0) {
          bookRef.current.pageFlip().flip(currentPage - 1);
        }
      } else if (e.key === "ArrowRight") {
        if (bookRef.current && currentPage < 7) {
          bookRef.current.pageFlip().flip(currentPage + 1);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [currentPage]);

  const frienderData = [
    {
      id: "2",
      name: "Friender Page 2",
      description: "Friender 프로젝트 두 번째 페이지입니다.",
    },
    {
      id: "3",
      name: "Friender Page 3",
      description: "Friender 프로젝트 세 번째 페이지입니다.",
    },
    {
      id: "4",
      name: "Friender Page 4",
      description: "Friender 프로젝트 네 번째 페이지입니다.",
    },
    {
      id: "5",
      name: "Friender Page 5",
      description: "Friender 프로젝트 다섯 번째 페이지입니다.",
    },
    {
      id: "6",
      name: "Friender Page 6",
      description: "Friender 프로젝트 여섯 번째 페이지입니다.",
    },
    {
      id: "7",
      name: "Friender Page 7",
      description: "Friender 프로젝트 일곱 번째 페이지입니다.",
    },
    {
      id: "8",
      name: "Friender Page 8",
      description: "Friender 프로젝트 여덟 번째 페이지입니다.",
    },
  ];

  // gif 파일 매핑
  const gifMapping = {
    1: "/interacivefile/FrienderFile/1-탄소-중립을-통해-지구촌-기후변화를-예방.gif",
    2: "/interacivefile/FrienderFile/2-친환경-에너지-자립마을-만들기.gif",
    3: "/interacivefile/FrienderFile/3-탄소-중립-실천.gif",
    4: "/interacivefile/FrienderFile/4-똑똑한-재활용-쓰레기-분리배출-실천.gif",
    5: "/interacivefile/FrienderFile/5-에너지가-가정에-오기까지의-여정.gif",
    6: "/interacivefile/FrienderFile/6-해양-오염-구조-탐사대-체험.gif",
  };

  // section-img 이미지 매핑 (페이지별)
  const sectionImgMapping = {
    2: [
      "/interacivefile/FrienderFile/section-img/2-1.png",
      "/interacivefile/FrienderFile/section-img/2-2.png",
      "/interacivefile/FrienderFile/section-img/2-3.png",
    ],
    3: [
      "/interacivefile/FrienderFile/section-img/3-1.png",
      "/interacivefile/FrienderFile/section-img/3-2.png",
      "/interacivefile/FrienderFile/section-img/3-3.png",
    ],
    4: [
      "/interacivefile/FrienderFile/section-img/4-1.png",
      "/interacivefile/FrienderFile/section-img/4-2.png",
      "/interacivefile/FrienderFile/section-img/4-3.png",
      "/interacivefile/FrienderFile/section-img/4-4.png",
    ],
    5: [
      "/interacivefile/FrienderFile/section-img/5-1.png",
      "/interacivefile/FrienderFile/section-img/5-2.png",
      "/interacivefile/FrienderFile/section-img/5-3.png",
    ],
    6: [
      "/interacivefile/FrienderFile/section-img/6-1.png",
      "/interacivefile/FrienderFile/section-img/6-2.png",
      "/interacivefile/FrienderFile/section-img/6-3.png",
      "/interacivefile/FrienderFile/section-img/6-4.png",
    ],
    7: [
      "/interacivefile/FrienderFile/section-img/7-1.png",
      "/interacivefile/FrienderFile/section-img/7-2.png",
      "/interacivefile/FrienderFile/section-img/7-3.png",
      "/interacivefile/FrienderFile/section-img/7-4.png",
    ],
    8: ["/interacivefile/FrienderFile/section-img/8-1.png"],
  };

  // 페이지별 개별 이미지 위치 설정
  const individualImagePositions = {
    2: [
      {
        // 2-1번 이미지 - 상단
        position: "absolute",
        top: "3%",
        left: "5%",
        width: "100%",
        maxWidth: "345px",
      },
      {
        // 2-2번 이미지 - 중단
        position: "absolute",
        top: "25%",
        left: "3%",
        width: "100%",
        maxWidth: "340px",
      },
      {
        // 2-3번 이미지 - 하단
        position: "absolute",
        bottom: "0%",
        right: "0%",
        width: "100%",
        maxWidth: "355px",
      },
    ],
    3: [
      {
        // 3-1번 이미지 - 상단 왼쪽
        position: "absolute",
        top: "7%",
        left: "2%",
        width: "100%",
        maxWidth: "353px",
      },
      {
        // 3-2번 이미지 - 상단 오른쪽
        position: "absolute",
        top: "38%",
        right: "2%",
        width: "100%",
        maxWidth: "354px",
      },
      {
        // 3-3번 이미지 - 하단 중앙
        position: "absolute",
        bottom: "0%",
        left: "3%",
        width: "100%",
        maxWidth: "351px",
      },
    ],
    4: [
      {
        // 4-1번 이미지 - 상단 왼쪽
        position: "absolute",
        top: "0%",
        left: "7%",
        width: "100%",
        maxWidth: "340px",
      },
      {
        // 4-2번 이미지 - 상단 오른쪽
        position: "absolute",
        top: "22%",
        right: "2%",
        width: "100%",
        maxWidth: "340px",
      },
      {
        // 4-3번 이미지 - 하단 왼쪽
        position: "absolute",
        bottom: "39%",
        left: "7%",
        width: "100%",
        maxWidth: "340px",
      },
      {
        // 4-4번 이미지 - 하단 오른쪽
        position: "absolute",
        bottom: "3%",
        right: "0%",
        width: "100%",
        maxWidth: "340px",
      },
    ],
    5: [
      {
        // 5-1번 이미지 - 상단
        position: "absolute",
        top: "0%",
        left: "0%",
        width: "100%",
        maxWidth: "340px",
      },
      {
        // 5-2번 이미지 - 중단 왼쪽
        position: "absolute",
        top: "33%",
        left: "0%",
        width: "100%",
        maxWidth: "340px",
      },
      {
        // 5-3번 이미지 - 중단 오른쪽
        position: "absolute",
        bottom: "3%",
        right: "10%",
        width: "100%",
        maxWidth: "340px",
      },
    ],
    6: [
      {
        // 6-1번 이미지 - 상단 중앙
        position: "absolute",
        top: "0%",
        left: "9%",
        width: "100%",
        maxWidth: "305px",
      },
      {
        // 6-2번 이미지 - 중단 왼쪽
        position: "absolute",
        top: "12%",
        left: "6%",
        width: "100%",
        maxWidth: "340px",
      },
      {
        // 6-3번 이미지 - 중단 오른쪽
        position: "absolute",
        bottom: "27%",
        right: "0%",
        width: "100%",
        maxWidth: "340px",
      },
      {
        // 6-4번 이미지 - 하단
        position: "absolute",
        bottom: "3%",
        left: "7%",
        width: "100%",
        maxWidth: "340px",
      },
    ],
    7: [
      {
        // 7-1번 이미지 - 상단 왼쪽
        position: "absolute",
        top: "0%",
        left: "0%",
        width: "100%",
        maxWidth: "340px",
      },
      {
        // 7-2번 이미지 - 상단 오른쪽
        position: "absolute",
        top: "11%",
        right: "8%",
        width: "100%",
        maxWidth: "340px",
      },
      {
        // 7-3번 이미지 - 하단 왼쪽
        position: "absolute",
        bottom: "39%",
        left: "0%",
        width: "100%",
        maxWidth: "340px",
      },
      {
        // 7-4번 이미지 - 하단 오른쪽
        position: "absolute",
        bottom: "4%",
        right: "7%",
        width: "100%",
        maxWidth: "340px",
      },
    ],
    8: [
      {
        // 8-1번 이미지 - 중앙
        position: "absolute",
        bottom: "1%",
        left: "0%",
        width: "100%",
        maxWidth: "340px",
      },
    ],
  };

  // gif 클릭 핸들러
  const handleGifClick = (gifNumber, event) => {
    event.stopPropagation(); // 이벤트 전파 방지
    setSelectedGif(gifMapping[gifNumber]);
    // 4페이지(index === 2)의 environ 이미지들은 페이지 ID 4로 설정
    setModalSourcePage(4);
    setIsModalOpen(true);
  };

  // section-img 클릭 핸들러
  const handleSectionImgClick = (imgSrc, event, pageId) => {
    event.stopPropagation(); // 이벤트 전파 방지

    // 3-3.png 이미지 클릭 시 3D 모델 표시
    if (imgSrc.includes("3-3.png")) {
      open3DModal();
    } else {
      setSelectedGif(imgSrc);
      setModalSourcePage(parseInt(pageId));
      setIsModalOpen(true);
    }
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

  // 3D 모달 열기
  const open3DModal = () => {
    setIs3DModalOpen(true);
  };

  // 3D 모달 닫기
  const close3DModal = () => {
    setIs3DModalOpen(false);
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
      maxWidth: `${getResponsiveImageSize(
        parseInt(baseConfig.maxWidth),
        isMobile
      )}px`,
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
        // 1초 후에 화려한 애니메이션 시작
        setTimeout(() => {
          setIsMainImageAnimating(true);
          animateCover(3000);
        }, 1000);
      }, 500);
    } else {
      setIsCoverVisible(false);
      setIsMainImageAnimating(false);
      setMainImageSize(1);
      setMainImageRotation(0);
      setMainImageOpacity(0);
      setTitleOpacity(0);
      setSubtitleOpacity(0);
      setBackgroundScale(1.2);
      setBackgroundBlur(0);

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
          size="fixed"
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
                src="/Pdf-img/Friender/1.jpg"
                alt="Friender Cover Background"
                className="w-full h-full object-cover"
                style={{
                  transform: `scale(${backgroundScale})`,
                  filter: `blur(${backgroundBlur}px)`,
                  transition: "transform 0.3s ease-out, filter 0.3s ease-out",
                }}
              />

              {/* main 이미지 오버레이 - 중앙에 배치 */}
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src="/interacivefile/FrienderFile/main.png"
                  alt="Friender Main"
                  style={{
                    width: `${mainImageSize}px`,
                    height: `${mainImageSize}px`,
                    opacity: mainImageOpacity,
                    transform: `rotate(${mainImageRotation}deg)`,
                    objectFit: "contain",
                    transition: "transform 0.1s linear",
                  }}
                />

                {/* title과 subtitle - main 이미지 위에 오버레이 */}
                {isMainImageAnimating && mainImageSize > 50 && (
                  <div
                    className="absolute"
                    style={{
                      left: `${mainImageSize * 0.1}px`, // main 이미지 왼쪽에서 10% 위치
                      bottom: `${mainImageSize * 0.1 + 50}px`, // main 이미지 아래에서 10% + 50px 위치
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "10px",
                    }}
                  >
                    {/* title */}
                    <img
                      src="/interacivefile/FrienderFile/title.png"
                      alt="Friender Title"
                      style={{
                        width: `${mainImageSize * 0.8}px`, // main 이미지보다 20% 작게
                        height: "auto",
                        opacity: titleOpacity,
                        transform: `translateY(${20 - titleOpacity * 20}px)`,
                        transition:
                          "opacity 0.3s ease-out, transform 0.3s ease-out",
                      }}
                    />

                    {/* subtitle */}
                    <img
                      src="/interacivefile/FrienderFile/subtitle.png"
                      alt="Friender Subtitle"
                      style={{
                        width: `${mainImageSize * 0.5}px`, // main 이미지의 50% 크기
                        height: "auto",
                        opacity: subtitleOpacity,
                        transform: `translateY(${20 - subtitleOpacity * 20}px)`,
                        transition:
                          "opacity 0.3s ease-out, transform 0.3s ease-out",
                      }}
                    />
                  </div>
                )}
              </div>

              {/* 페이지 그림자 효과 */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent pointer-events-none"></div>
            </div>
          </div>

          {frienderData.map((page, index) => (
            <div
              key={page.id}
              className="bg-gradient-to-br from-white to-gray-50 rounded shadow-lg relative"
            >
              <div className="w-full h-full flex flex-col justify-center items-center p-0">
                <div className="w-full h-full relative">
                  <img
                    src={`/Pdf-img/Friender/${page.id}.jpg`}
                    alt={page.name}
                    className="w-full h-full object-cover pointer-events-none"
                  />

                  {/* 각 페이지별 section-img 이미지들을 개별적으로 배치 */}
                  {sectionImgMapping[page.id] &&
                    individualImagePositions[page.id] && (
                      <>
                        {sectionImgMapping[page.id].map((imgSrc, imgIndex) => (
                          <div
                            key={imgIndex}
                            className="absolute cursor-pointer hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-blue-500 rounded-lg pointer-events-auto bg-transparent"
                            style={getResponsiveImagePosition(
                              individualImagePositions[page.id][imgIndex],
                              isMobile
                            )}
                            onClick={(e) =>
                              handleSectionImgClick(imgSrc, e, page.id)
                            }
                          >
                            <img
                              src={imgSrc}
                              alt={`Section ${page.id}-${imgIndex + 1}`}
                              className="w-full h-full object-contain opacity-0 hover:opacity-100 transition-opacity duration-300"
                            />
                          </div>
                        ))}
                      </>
                    )}

                  {/* 4페이지(index === 2)에만 기존 environ 이미지들도 추가로 배치 */}
                  {index === 2 && (
                    <div
                      className="absolute flex justify-between items-center pointer-events-auto"
                      style={{
                        top: "13%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "85%",
                      }}
                    >
                      <img
                        src="/interacivefile/FrienderFile/environ-1.png"
                        alt="Environment 1"
                        className="flex-1 max-w-[calc(15%-2px)] h-auto object-contain cursor-pointer hover:scale-110 transition-transform duration-300"
                        onClick={(e) => handleGifClick(1, e)}
                      />
                      <img
                        src="/interacivefile/FrienderFile/environ-2.png"
                        alt="Environment 2"
                        className="flex-1 max-w-[calc(15%-2px)] h-auto object-contain cursor-pointer hover:scale-110 transition-transform duration-300"
                        onClick={(e) => handleGifClick(2, e)}
                      />
                      <img
                        src="/interacivefile/FrienderFile/environ-3.png"
                        alt="Environment 3"
                        className="flex-1 max-w-[calc(15%-2px)] h-auto object-contain cursor-pointer hover:scale-110 transition-transform duration-300"
                        onClick={(e) => handleGifClick(3, e)}
                      />
                      <img
                        src="/interacivefile/FrienderFile/environ-4.png"
                        alt="Environment 4"
                        className="flex-1 max-w-[calc(15%-2px)] h-auto object-contain cursor-pointer hover:scale-110 transition-transform duration-300"
                        onClick={(e) => handleGifClick(4, e)}
                      />
                      <img
                        src="/interacivefile/FrienderFile/environ-5.png"
                        alt="Environment 5"
                        className="flex-1 max-w-[calc(15%-2px)] h-auto object-contain cursor-pointer hover:scale-110 transition-transform duration-300"
                        onClick={(e) => handleGifClick(5, e)}
                      />
                      <img
                        src="/interacivefile/FrienderFile/environ-6.png"
                        alt="Environment 6"
                        className="flex-1 max-w-[calc(15%-2px)] h-auto object-contain cursor-pointer hover:scale-110 transition-transform duration-300"
                        onClick={(e) => handleGifClick(6, e)}
                      />
                    </div>
                  )}

                  {/* 5페이지(index === 3)에만 비디오 추가 */}
                  {index === 3 && (
                    <div
                      className="absolute flex justify-center items-center"
                      style={{
                        top: "10%",
                        left: "47%",
                        transform: "translateX(-50%)",
                        width: "90%",
                      }}
                    >
                      <video
                        src="/interacivefile/FrienderFile/BlockCoding-VR.mp4"
                        className="w-[200px] h-[100px] object-contain cursor-pointer hover:scale-105 transition-transform duration-300"
                        controls
                        muted
                        loop
                        autoPlay={false}
                      />
                    </div>
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
          {currentPage + 1} / 8
        </span>
        <button
          onClick={() => bookRef.current?.pageFlip().flip(currentPage + 1)}
          disabled={currentPage === 7}
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

            {/* Gif 이미지 */}
            <img
              src={selectedGif}
              alt="Selected Gif"
              className="w-full h-auto object-contain rounded-lg"
            />
          </div>
        </div>
      )}

      {/* 3D 모델 모달 */}
      {is3DModalOpen && <Model3D onClose={close3DModal} />}
    </div>
  );
}

export default Book;
