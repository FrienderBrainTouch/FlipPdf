import React, { useState, useEffect, useRef } from "react";
import Model3D from "./Model3D";

/**
 * IntroScreen 컴포넌트
 * 
 * 이 컴포넌트는 독립적인 인트로 화면을 구현합니다.
 * 주요 기능:
 * - 초기 로딩 애니메이션 (Friender 로고)
 * - 흰 화면에서 본 화면으로의 전환 효과
 * - 중앙 이미지 애니메이션
 * - 네비게이션 및 툴바 기능
 */
function IntroScreen() {
  // 상태 관리 변수들
  const [showIntro, setShowIntro] = useState(true); // 인트로 화면 표시 여부
  const [logoOpacity, setLogoOpacity] = useState(0); // 로고 투명도
  const [whiteScreenVisible, setWhiteScreenVisible] = useState(true); // 흰 화면 표시 여부
  const [mainScreenVisible, setMainScreenVisible] = useState(false); // 본 화면 표시 여부
  const [imageScale, setImageScale] = useState(1.2); // 중앙 이미지 스케일 (120%에서 시작)
  const [imageOpacity, setImageOpacity] = useState(0); // 중앙 이미지 투명도
  const [overlay1Opacity, setOverlay1Opacity] = useState(0); // SampleTitle.png 투명도
  const [overlay1Transform, setOverlay1Transform] = useState('translateX(-100%)'); // SampleTitle.png 위치
  const [overlay2Opacity, setOverlay2Opacity] = useState(0); // SampleSubTitle.png 투명도
  const [overlay2Transform, setOverlay2Transform] = useState('translateX(100%)'); // SampleSubTitle.png 위치
  const [overlay3Opacity, setOverlay3Opacity] = useState(0); // SampleTitle2.png 투명도
  const [overlay3Transform, setOverlay3Transform] = useState('translateX(-100%)'); // SampleTitle2.png 위치
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 번호 (0: 표지, 1-7: 내부 페이지)
  const [selectedGif, setSelectedGif] = useState(null); // 선택된 GIF 파일
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태
  const [modalSourcePage, setModalSourcePage] = useState(null); // 모달을 연 페이지
  const [is3DModalOpen, setIs3DModalOpen] = useState(false); // 3D 모달 열림 상태

  // ref 변수들
  const animationRef = useRef(null);

  // GIF 파일 매핑 (환경 관련 애니메이션)
  const gifMapping = {
    1: "/interacivefile/FrienderFile/1-탄소-중립을-통해-지구촌-기후변화를-예방.gif",
    2: "/interacivefile/FrienderFile/2-친환경-에너지-자립마을-만들기.gif",
    3: "/interacivefile/FrienderFile/3-탄소-중립-실천.gif",
    4: "/interacivefile/FrienderFile/4-똑똑한-재활용-쓰레기-분리배출-실천.gif",
    5: "/interacivefile/FrienderFile/5-에너지가-가정에-오기까지의-여정.gif",
    6: "/interacivefile/FrienderFile/6-해양-오염-구조-탐사대-체험.gif",
  };

  // section-img 이미지 매핑 (페이지별 상세 이미지)
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

  // 페이지별 개별 이미지 위치 설정 (절대 위치)
  const individualImagePositions = {
    2: [
      {
        // 2-1번 이미지 - 상단
        position: "absolute",
        top: "3%",
        width: "100%",
      },
      {
        // 2-2번 이미지 - 중단
        position: "absolute",
        top: "25%",
        width: "100%",
      },
      {
        // 2-3번 이미지 - 하단
        position: "absolute",
        bottom: "0%",
        width: "100%",
      },
    ],
    3: [
      {
        // 3-1번 이미지 - 상단 왼쪽
        position: "absolute",
        top: "7%",
        width: "100%",
      },
      {
        // 3-2번 이미지 - 상단 오른쪽
        position: "absolute",
        top: "38%",
        width: "100%",
      },
      {
        // 3-3번 이미지 - 하단 중앙
        position: "absolute",
        bottom: "0%",
        width: "100%",
      },
    ],
    4: [
      {
        // 4-1번 이미지 - 상단 왼쪽
        position: "absolute",
        top: "0%",
        width: "100%",
      },
      {
        // 4-2번 이미지 - 상단 오른쪽
        position: "absolute",
        top: "22%",
        width: "100%",
      },
      {
        // 4-3번 이미지 - 하단 왼쪽
        position: "absolute",
        bottom: "39%",
        width: "100%",
      },
      {
        // 4-4번 이미지 - 하단 오른쪽
        position: "absolute",
        bottom: "3%",
        width: "100%",
      },
    ],
    5: [
      {
        // 5-1번 이미지 - 상단
        position: "absolute",
        top: "0%",
        width: "100%",
      },
      {
        // 5-2번 이미지 - 중단 왼쪽
        position: "absolute",
        top: "33%",
        width: "100%",
      },
      {
        // 5-3번 이미지 - 중단 오른쪽
        position: "absolute",
        bottom: "3%",
        width: "100%",
      },
    ],
    6: [
      {
        // 6-1번 이미지 - 상단 중앙
        position: "absolute",
        top: "0%",
        width: "100%",
      },
      {
        // 6-2번 이미지 - 중단 왼쪽
        position: "absolute",
        top: "12%",
        width: "100%",
      },
      {
        // 6-3번 이미지 - 중단 오른쪽
        position: "absolute",
        bottom: "27%",
        width: "100%",
      },
      {
        // 6-4번 이미지 - 하단
        position: "absolute",
        bottom: "3%",
        width: "100%",
      },
    ],
    7: [
      {
        // 7-1번 이미지 - 상단 왼쪽
        position: "absolute",
        top: "0%",
        width: "100%",
      },
      {
        // 7-2번 이미지 - 상단 오른쪽
        position: "absolute",
        top: "11%",
        width: "100%",
      },
      {
        // 7-3번 이미지 - 하단 왼쪽
        position: "absolute",
        bottom: "39%",
        width: "100%",
      },
      {
        // 7-4번 이미지 - 하단 오른쪽
        position: "absolute",
        bottom: "4%",
        width: "100%",
      },
    ],
    8: [
      {
        // 8-1번 이미지 - 중앙
        position: "absolute",
        bottom: "1%",
        width: "100%",
      },
    ],
  };

  // 페이지별 이미지 데이터
  const pageImages = [
    {
      id: 0,
      name: "표지",
      backgroundImage: "/SampleFile/Image/AniBackground.jpg",
      overlays: [
        { src: "/SampleFile/Image/SampleTitle.png", opacity: overlay1Opacity, transform: overlay1Transform },
        { src: "/SampleFile/Image/SampleSubTitle.png", opacity: overlay2Opacity, transform: overlay2Transform },
        { src: "/SampleFile/Image/SampleTitle2.png", opacity: overlay3Opacity, transform: overlay3Transform }
      ]
    },
    {
      id: 1,
      name: "페이지 1",
      backgroundImage: "/Pdf-img/Friender/2.jpg",
      overlays: []
    },
    {
      id: 2,
      name: "페이지 2", 
      backgroundImage: "/Pdf-img/Friender/3.jpg",
      overlays: []
    },
    {
      id: 3,
      name: "페이지 3",
      backgroundImage: "/Pdf-img/Friender/4.jpg",
      overlays: []
    },
    {
      id: 4,
      name: "페이지 4",
      backgroundImage: "/Pdf-img/Friender/5.jpg",
      overlays: []
    },
    {
      id: 5,
      name: "페이지 5",
      backgroundImage: "/Pdf-img/Friender/6.jpg",
      overlays: []
    },
    {
      id: 6,
      name: "페이지 6",
      backgroundImage: "/Pdf-img/Friender/7.jpg",
      overlays: []
    },
    {
      id: 7,
      name: "페이지 7",
      backgroundImage: "/Pdf-img/Friender/8.jpg",
      overlays: []
    }
  ];

  /**
   * 컴포넌트 마운트 시 애니메이션 시퀀스 실행
   */
  useEffect(() => {
    // 1단계: 로고 애니메이션 (opacity 0 → 100)
    const logoAnimation = () => {
      const startTime = performance.now();
      const duration = 1500; // 1.5초

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // ease-out 효과 적용
        const easeOut = 1 - Math.pow(1 - progress, 3);
        setLogoOpacity(easeOut);

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          // 로고 애니메이션 완료 후 2초 대기
          setTimeout(() => {
            startTransition();
          }, 2000);
        }
      };

      animationRef.current = requestAnimationFrame(animate);
    };

    // 2단계: 흰 화면이 위로 사라지는 전환
    const startTransition = () => {
      setWhiteScreenVisible(false);
      
      // 전환 완료 후 본 화면 표시
      setTimeout(() => {
        setMainScreenVisible(true);
        startImageAnimation();
      }, 500);
    };

    // 3단계: 중앙 이미지 애니메이션
    const startImageAnimation = () => {
      const startTime = performance.now();
      const duration = 2000; // 2초

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // ease-out 효과 적용
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
        // 이미지가 div 크기로 줄어들면서 나타남
        setImageScale(1.2 - 0.2 * easeOut); // 120%에서 100%로 줄어듦
        setImageOpacity(easeOut);

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          // 중앙 이미지 애니메이션 완료 후 오버레이 애니메이션 시작
          startOverlayAnimations();
        }
      };

      animationRef.current = requestAnimationFrame(animate);
    };

    // 오버레이 애니메이션 함수
    const startOverlayAnimations = () => {
      // 1. SampleTitle.png 왼쪽에서 나타남
      setTimeout(() => {
        animateOverlayFromLeft(setOverlay1Opacity, setOverlay1Transform, 1000);
      }, 500);

      // 2. SampleSubTitle.png 오른쪽에서 나타남
      setTimeout(() => {
        animateOverlayFromRight(setOverlay2Opacity, setOverlay2Transform, 1000);
      }, 1500);

      // 3. SampleTitle2.png 왼쪽에서 나타남
      setTimeout(() => {
        animateOverlayFromLeft(setOverlay3Opacity, setOverlay3Transform, 1000);
      }, 2500);
    };

    // 왼쪽에서 나타나는 오버레이 애니메이션 함수
    const animateOverlayFromLeft = (setOpacity, setTransform, duration) => {
      const startTime = performance.now();

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easeOut = 1 - Math.pow(1 - progress, 3);
        setOpacity(easeOut);
        setTransform(`translateX(${-100 + 100 * easeOut}%)`);

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        }
      };

      animationRef.current = requestAnimationFrame(animate);
    };

    // 오른쪽에서 나타나는 오버레이 애니메이션 함수
    const animateOverlayFromRight = (setOpacity, setTransform, duration) => {
      const startTime = performance.now();

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easeOut = 1 - Math.pow(1 - progress, 3);
        setOpacity(easeOut);
        setTransform(`translateX(${100 - 100 * easeOut}%)`);

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        }
      };

      animationRef.current = requestAnimationFrame(animate);
    };

    // 애니메이션 시작
    setTimeout(() => {
      logoAnimation();
    }, 500);

    // 컴포넌트 언마운트 시 정리
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  /**
   * 이전 페이지로 이동
   */
  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  /**
   * 다음 페이지로 이동
   */
  const goToNextPage = () => {
    if (currentPage < pageImages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  /**
   * GIF 클릭 핸들러
   * 환경 관련 애니메이션 GIF를 클릭하면 모달로 표시
   * @param {number} gifNumber - GIF 번호
   * @param {Event} event - 클릭 이벤트
   */
  const handleGifClick = (gifNumber, event) => {
    event.stopPropagation(); // 이벤트 전파 방지
    setSelectedGif(gifMapping[gifNumber]);
    // 4페이지(index === 2)의 environ 이미지들은 페이지 ID 4로 설정
    setModalSourcePage(4);
    setIsModalOpen(true);
  };

  /**
   * section-img 클릭 핸들러
   * 페이지별 상세 이미지를 클릭하면 모달로 표시
   * 특정 이미지(3-3.png)는 3D 모델로 표시
   * @param {string} imgSrc - 이미지 경로
   * @param {Event} event - 클릭 이벤트
   * @param {string} pageId - 페이지 ID
   */
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

  /**
   * 모달 닫기 핸들러
   * 모달이 닫힐 때 해당 페이지로 이동
   */
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedGif(null);

    // 모달이 닫힐 때 해당 페이지로 이동
    if (modalSourcePage !== null) {
      setTimeout(() => {
        // 페이지 ID를 인덱스로 변환 (표지 페이지는 0, 나머지는 ID-1)
        const pageIndex = modalSourcePage === 1 ? 0 : modalSourcePage - 1;
        setCurrentPage(pageIndex);
      }, 100);
    }
    setModalSourcePage(null);
  };

  /**
   * 3D 모달 열기
   */
  const open3DModal = () => {
    setIs3DModalOpen(true);
  };

  /**
   * 3D 모달 닫기
   */
  const close3DModal = () => {
    setIs3DModalOpen(false);
  };

  /**
   * 홈 버튼 클릭 핸들러 - IntroScreen 재시작
   */
  const handleHomeClick = () => {
    // 상태 초기화
    setShowIntro(true);
    setLogoOpacity(0);
    setWhiteScreenVisible(true);
    setMainScreenVisible(false);
    setImageScale(1.2);
    setImageOpacity(0);
    setOverlay1Opacity(0);
    setOverlay1Transform('translateX(-100%)');
    setOverlay2Opacity(0);
    setOverlay2Transform('translateX(100%)');
    setOverlay3Opacity(0);
    setOverlay3Transform('translateX(-100%)');
    setCurrentPage(0);
    setSelectedGif(null);
    setIsModalOpen(false);
    setModalSourcePage(null);
    setIs3DModalOpen(false);

    // 애니메이션 재시작
    setTimeout(() => {
      const logoAnimation = () => {
        const startTime = performance.now();
        const duration = 1500;

        const animate = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          const easeOut = 1 - Math.pow(1 - progress, 3);
          setLogoOpacity(easeOut);

          if (progress < 1) {
            animationRef.current = requestAnimationFrame(animate);
          } else {
            setTimeout(() => {
              setWhiteScreenVisible(false);
              setTimeout(() => {
                setMainScreenVisible(true);
                startImageAnimation();
              }, 500);
            }, 2000);
          }
        };

        animationRef.current = requestAnimationFrame(animate);
      };

      const startImageAnimation = () => {
        const startTime = performance.now();
        const duration = 2000;

        const animate = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          const easeOut = 1 - Math.pow(1 - progress, 3);
          
          setImageScale(1.2 - 0.2 * easeOut); // 120%에서 100%로 줄어듦
          setImageOpacity(easeOut);

          if (progress < 1) {
            animationRef.current = requestAnimationFrame(animate);
          } else {
            // 중앙 이미지 애니메이션 완료 후 오버레이 애니메이션 시작
            startOverlayAnimations();
          }
        };

        animationRef.current = requestAnimationFrame(animate);
      };

      // 오버레이 애니메이션 함수
      const startOverlayAnimations = () => {
        // 1. SampleTitle.png 왼쪽에서 나타남
        setTimeout(() => {
          animateOverlayFromLeft(setOverlay1Opacity, setOverlay1Transform, 1000);
        }, 500);

        // 2. SampleSubTitle.png 오른쪽에서 나타남
        setTimeout(() => {
          animateOverlayFromRight(setOverlay2Opacity, setOverlay2Transform, 1000);
        }, 1500);

        // 3. SampleTitle2.png 왼쪽에서 나타남
        setTimeout(() => {
          animateOverlayFromLeft(setOverlay3Opacity, setOverlay3Transform, 1000);
        }, 2500);
      };

      // 왼쪽에서 나타나는 오버레이 애니메이션 함수
      const animateOverlayFromLeft = (setOpacity, setTransform, duration) => {
        const startTime = performance.now();

        const animate = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          const easeOut = 1 - Math.pow(1 - progress, 3);
          setOpacity(easeOut);
          setTransform(`translateX(${-100 + 100 * easeOut}%)`);

          if (progress < 1) {
            animationRef.current = requestAnimationFrame(animate);
          }
        };

        animationRef.current = requestAnimationFrame(animate);
      };

      // 오른쪽에서 나타나는 오버레이 애니메이션 함수
      const animateOverlayFromRight = (setOpacity, setTransform, duration) => {
        const startTime = performance.now();

        const animate = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          const easeOut = 1 - Math.pow(1 - progress, 3);
          setOpacity(easeOut);
          setTransform(`translateX(${100 - 100 * easeOut}%)`);

          if (progress < 1) {
            animationRef.current = requestAnimationFrame(animate);
          }
        };

        animationRef.current = requestAnimationFrame(animate);
      };

      logoAnimation();
    }, 500);
  };

  /**
   * 프린터 버튼 클릭 핸들러
   */
  const handlePrintClick = () => {
    window.print();
  };

  /**
   * PDF 다운로드 버튼 클릭 핸들러
   */
  const handleDownloadClick = () => {
    const link = document.createElement("a");
    link.href = "/func-file/FrienderFile/프랜더-소개-책자.pdf";
    link.download = "프랜더-소개-책자.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /**
   * 공유 버튼 클릭 핸들러
   */
  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Friender',
        text: 'Friender 프로젝트를 확인해보세요!',
        url: window.location.href,
      });
    } else {
      // Web Share API를 지원하지 않는 경우 클립보드에 복사
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert('링크가 클립보드에 복사되었습니다!');
      });
    }
  };

  return (
    <div className="w-full h-screen overflow-hidden relative">
      {/* 인트로 화면 (흰 화면 + 로고) */}
      {showIntro && (
        <div 
          className={`fixed inset-0 bg-white z-50 transition-transform duration-500 ease-out ${
            whiteScreenVisible ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          {/* Friender 로고 */}
          <div className="w-full h-full flex items-center justify-center">
            <h1 
              className="text-6xl md:text-8xl font-bold text-green-600"
              style={{ opacity: logoOpacity }}
            >
              FRIENDER
            </h1>
          </div>
        </div>
      )}

      {/* 본 화면 */}
      {mainScreenVisible && (
        <div className="w-full h-full relative bg-white">
          {/* 왼쪽 위 Friender 로고 (홈 버튼) */}
          <button
            onClick={handleHomeClick}
            className="absolute top-6 left-6 z-40 text-green-600 font-bold text-2xl cursor-pointer"
          >
            FRIENDER
          </button>

          {/* 오른쪽 툴바 - 상단 아이콘들 */}
          <div className="absolute top-0 right-0 h-full z-40 flex flex-col gap-3 bg-gray-800 p-3">
            {/* 프린터 버튼 */}
            <button
              onClick={handlePrintClick}
              className="w-8 h-8 text-white flex items-center justify-center hover:text-gray-300 hover:bg-gray-700 rounded transition-colors duration-300 cursor-pointer"
              title="프린트"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
            </button>

            {/* PDF 다운로드 버튼 */}
            <button
              onClick={handleDownloadClick}
              className="w-8 h-8 text-white flex items-center justify-center hover:text-gray-300 hover:bg-gray-700 rounded transition-colors duration-300 cursor-pointer"
              title="PDF 다운로드"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </button>

            {/* 공유 버튼 */}
            <button
              onClick={handleShareClick}
              className="w-8 h-8 text-white flex items-center justify-center hover:text-gray-300 hover:bg-gray-700 rounded transition-colors duration-300 cursor-pointer"
              title="공유"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
            </button>
          </div>

          {/* 중앙 이미지 컨테이너 */}
          <div className="absolute top-2.5 left-32 right-20 bottom-2.5 flex items-center justify-center">
            <div className="relative flex items-center justify-center w-full h-full">
              {/* 중앙 이미지 */}
              <div 
                className="h-full overflow-hidden shadow-2xl border-2 border-black relative"
                style={{
                  opacity: imageOpacity,
                  transition: 'opacity 0.3s ease-in-out',
                  aspectRatio: 'auto',
                  width: 'auto'
                }}
              >
                {/* 현재 페이지의 배경 이미지 */}
                <img
                  src={pageImages[currentPage].backgroundImage}
                  alt={pageImages[currentPage].name}
                  className="w-full h-full object-cover"
                  style={{
                    transform: currentPage === 0 ? `scale(${imageScale})` : 'scale(1)',
                    transition: 'transform 0.3s ease-in-out'
                  }}
                />

                {/* 표지 페이지(0번)일 때만 오버레이 이미지들 표시 */}
                {currentPage === 0 && (
                  <>
                    {/* SampleTitle.png - 왼쪽에서 나타남 */}
                    <div 
                      className="absolute inset-0"
                      style={{
                        opacity: overlay1Opacity,
                        transform: overlay1Transform,
                        transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out'
                      }}
                    >
                      <img
                        src="/SampleFile/Image/SampleTitle.png"
                        alt="Sample Title"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* SampleSubTitle.png - 오른쪽에서 나타남 */}
                    <div 
                      className="absolute inset-0"
                      style={{
                        opacity: overlay2Opacity,
                        transform: overlay2Transform,
                        transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out'
                      }}
                    >
                      <img
                        src="/SampleFile/Image/SampleSubTitle.png"
                        alt="Sample SubTitle"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* SampleTitle2.png - 왼쪽에서 나타남 */}
                    <div 
                      className="absolute inset-0"
                      style={{
                        opacity: overlay3Opacity,
                        transform: overlay3Transform,
                        transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out'
                      }}
                    >
                      <img
                        src="/SampleFile/Image/SampleTitle2.png"
                        alt="Sample Title 2"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </>
                )}

                {/* 내부 페이지들(1-7번)의 인터랙티브 요소들 */}
                {currentPage > 0 && (
                  <>
                    {/* 각 페이지별 section-img 이미지들을 개별적으로 배치 */}
                    {sectionImgMapping[currentPage + 1] &&
                      individualImagePositions[currentPage + 1] && (
                        <>
                          {sectionImgMapping[currentPage + 1].map((imgSrc, imgIndex) => {
                            const imagePosition = individualImagePositions[currentPage + 1]?.[imgIndex];
                            
                            // 이미지 위치 설정이 없는 경우 렌더링하지 않음
                            if (!imagePosition) {
                              return null;
                            }
                            
                            return (
                              <div
                                key={imgIndex}
                                className="absolute cursor-pointer hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-blue-500 rounded-lg pointer-events-auto bg-transparent"
                                style={imagePosition}
                                onClick={(e) =>
                                  handleSectionImgClick(imgSrc, e, currentPage + 1)
                                }
                              >
                                <img
                                  src={imgSrc}
                                  alt={`Section ${currentPage + 1}-${imgIndex + 1}`}
                                  className="w-full h-full object-contain opacity-0 hover:opacity-100 transition-opacity duration-300"
                                />
                              </div>
                            );
                          })}
                        </>
                      )}

                    {/* 4페이지(currentPage === 3)에만 기존 environ 이미지들도 추가로 배치 */}
                    {currentPage === 3 && (
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
                          className="flex-1 opacity-0 max-w-[calc(15%-2px)] h-auto object-contain cursor-pointer hover:scale-110 transition-transform duration-300"
                          onClick={(e) => handleGifClick(1, e)}
                        />
                        <img
                          src="/interacivefile/FrienderFile/environ-2.png"
                          alt="Environment 2"
                          className="flex-1 opacity-0 max-w-[calc(15%-2px)] h-auto object-contain cursor-pointer hover:scale-110 transition-transform duration-300"
                          onClick={(e) => handleGifClick(2, e)}
                        />
                        <img
                          src="/interacivefile/FrienderFile/environ-3.png"
                          alt="Environment 3"
                          className="flex-1 opacity-0 max-w-[calc(15%-2px)] h-auto object-contain cursor-pointer hover:scale-110 transition-transform duration-300"
                          onClick={(e) => handleGifClick(3, e)}
                        />
                        <img
                          src="/interacivefile/FrienderFile/environ-4.png"
                          alt="Environment 4"
                          className="flex-1 opacity-0 max-w-[calc(15%-2px)] h-auto object-contain cursor-pointer hover:scale-110 transition-transform duration-300"
                          onClick={(e) => handleGifClick(4, e)}
                        />
                        <img
                          src="/interacivefile/FrienderFile/environ-5.png"
                          alt="Environment 5"
                          className="flex-1 opacity-0 max-w-[calc(15%-2px)] h-auto object-contain cursor-pointer hover:scale-110 transition-transform duration-300"
                          onClick={(e) => handleGifClick(5, e)}
                        />
                        <img
                          src="/interacivefile/FrienderFile/environ-6.png"
                          alt="Environment 6"
                          className="flex-1 opacity-0 max-w-[calc(15%-2px)] h-auto object-contain cursor-pointer hover:scale-110 transition-transform duration-300"
                          onClick={(e) => handleGifClick(6, e)}
                        />
                      </div>
                    )}

                    {/* 5페이지(currentPage === 4)에만 비디오 추가 */}
                    {currentPage === 4 && (
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
                          className="w-[30%] object-contain cursor-pointer hover:scale-105 transition-transform duration-300"
                          controls
                          muted
                          loop
                          autoPlay={false}
                        />
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* 페이지 네비게이션 화살표 - 중앙 이미지 옆에 배치 */}
              <div className="ml-4 flex flex-col gap-2">
                <button 
                  onClick={goToPreviousPage}
                  disabled={currentPage === 0}
                  className="w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-300 shadow-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  onClick={goToNextPage}
                  disabled={currentPage === pageImages.length - 1}
                  className="w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-300 shadow-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* 페이지 정보 표시 */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
            {pageImages[currentPage].name} ({currentPage + 1} / {pageImages.length})
          </div>
        </div>
      )}

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

export default IntroScreen;
