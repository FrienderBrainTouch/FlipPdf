import React, { useState, useEffect, useRef } from "react";

function Model3D({ onClose }) {
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [autoRotate, setAutoRotate] = useState(false);
  const autoRotateInterval = useRef(null);
  const containerRef = useRef(null);

  // 자동 회전 효과
  useEffect(() => {
    if (autoRotate) {
      autoRotateInterval.current = setInterval(() => {
        setRotationY((prev) => prev + 2);
      }, 50);
    } else {
      if (autoRotateInterval.current) {
        clearInterval(autoRotateInterval.current);
        autoRotateInterval.current = null;
      }
    }

    return () => {
      if (autoRotateInterval.current) {
        clearInterval(autoRotateInterval.current);
      }
    };
  }, [autoRotate]);

  // 마우스/터치 이벤트 처리
  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setStartX(e.clientX);
    setStartY(e.clientY);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();

    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;

    setRotationY((prev) => prev + deltaX * 0.5);
    setRotationX((prev) => Math.max(-90, Math.min(90, prev - deltaY * 0.5)));

    setStartX(e.clientX);
    setStartY(e.clientY);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // 터치 이벤트 처리
  const handleTouchStart = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();

    const deltaX = e.touches[0].clientX - startX;
    const deltaY = e.touches[0].clientY - startY;

    setRotationY((prev) => prev + deltaX * 0.5);
    setRotationX((prev) => Math.max(-90, Math.min(90, prev - deltaY * 0.5)));

    setStartX(e.touches[0].clientX);
    setStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // 리셋 함수
  const resetModel = () => {
    setRotationX(0);
    setRotationY(0);
    setAutoRotate(false);
  };

  // 자동 회전 토글
  const toggleAutoRotate = () => {
    setAutoRotate(!autoRotate);
  };

  // 전역 마우스/터치 이벤트 리스너
  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging, startX, startY]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-3xl font-bold text-gray-600 hover:text-black transition-colors"
        >
          ×
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            3D 모델 뷰어
          </h2>
          <p className="text-gray-600">
            마우스로 드래그하여 3D 모델을 회전시켜보세요
          </p>
        </div>

        <div className="flex justify-center mb-6">
          <div
            ref={containerRef}
            className="w-96 h-96 perspective-1000 cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            style={{ perspective: "1000px" }}
          >
            <div
              className="w-full h-full transform-style-preserve-3d transition-transform duration-300"
              style={{
                transformStyle: "preserve-3d",
                transform: `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`,
              }}
            >
              {/* 3D 모델의 각 면 */}
              <div
                className="absolute w-full h-full flex items-center justify-center text-2xl font-bold text-white border-2 border-white border-opacity-30"
                style={{
                  background: "linear-gradient(45deg, #ff6b6b, #ee5a24)",
                  transform: "translateZ(192px)",
                }}
              >
                3D 모델
              </div>

              <div
                className="absolute w-full h-full flex items-center justify-center text-2xl font-bold text-white border-2 border-white border-opacity-30"
                style={{
                  background: "linear-gradient(45deg, #4834d4, #686de0)",
                  transform: "translateZ(-192px) rotateY(180deg)",
                }}
              >
                뒤면
              </div>

              <div
                className="absolute w-full h-full flex items-center justify-center text-2xl font-bold text-white border-2 border-white border-opacity-30"
                style={{
                  background: "linear-gradient(45deg, #00d2d3, #54a0ff)",
                  transform: "translateX(192px) rotateY(90deg)",
                }}
              >
                오른쪽
              </div>

              <div
                className="absolute w-full h-full flex items-center justify-center text-2xl font-bold text-white border-2 border-white border-opacity-30"
                style={{
                  background: "linear-gradient(45deg, #ff9ff3, #f368e0)",
                  transform: "translateX(-192px) rotateY(-90deg)",
                }}
              >
                왼쪽
              </div>

              <div
                className="absolute w-full h-full flex items-center justify-center text-2xl font-bold text-white border-2 border-white border-opacity-30"
                style={{
                  background: "linear-gradient(45deg, #26de81, #20bf6b)",
                  transform: "translateY(-192px) rotateX(90deg)",
                }}
              >
                위쪽
              </div>

              <div
                className="absolute w-full h-full flex items-center justify-center text-2xl font-bold text-white border-2 border-white border-opacity-30"
                style={{
                  background: "linear-gradient(45deg, #fd79a8, #e84393)",
                  transform: "translateY(192px) rotateX(-90deg)",
                }}
              >
                아래쪽
              </div>
            </div>
          </div>
        </div>

        {/* 컨트롤 버튼들 */}
        <div className="flex justify-center gap-4">
          <button
            onClick={resetModel}
            className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors font-medium"
          >
            🔄 리셋
          </button>

          <button
            onClick={toggleAutoRotate}
            className={`px-6 py-3 rounded-full transition-colors font-medium ${
              autoRotate
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-gray-300 text-gray-700 hover:bg-gray-400"
            }`}
          >
            {autoRotate ? "⏸️ 자동회전 중지" : "▶️ 자동회전 시작"}
          </button>
        </div>

        <div className="text-center mt-4 text-sm text-gray-500">
          <p>마우스 드래그: 회전 | 터치: 모바일에서도 동일하게 작동</p>
        </div>
      </div>
    </div>
  );
}

export default Model3D;
