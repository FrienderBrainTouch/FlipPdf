# FlipPdf - 인터랙티브 PDF 플립북

Friender 프로젝트를 위한 인터랙티브 PDF 플립북 애플리케이션입니다.

## 🚀 기능

- **인터랙티브 플립북**: react-pageflip을 사용한 페이지 넘기기 효과
- **애니메이션**: 부드러운 페이지 전환과 이미지 애니메이션
- **반응형 디자인**: 모바일과 데스크톱에서 최적화된 경험
- **GIF 지원**: 인터랙티브 요소로 GIF 파일 재생
- **PDF 뷰어**: PDF 파일 표시 및 상호작용

## 🛠️ 기술 스택

- **React 19**: 최신 React 버전 사용
- **Vite**: 빠른 개발 서버와 빌드 도구
- **Tailwind CSS**: 유틸리티 기반 CSS 프레임워크
- **react-pageflip**: 플립북 효과 라이브러리
- **video.js**: 비디오 재생 지원

## 📦 설치 및 실행

### 필수 요구사항
- Node.js 18.0.0 이상
- npm 또는 yarn

### 설치
```bash
# 의존성 설치
npm install
```

### 개발 서버 실행
```bash
# 개발 모드로 실행
npm run dev
```

### 빌드
```bash
# 프로덕션 빌드
npm run build
```

### 미리보기
```bash
# 빌드된 프로젝트 미리보기
npm run preview
```

## 📁 프로젝트 구조

```
FlipPdf/
├── public/
│   ├── func-file/          # PDF 파일들
│   ├── interacivefile/     # GIF 및 비디오 파일들
│   └── Pdf-img/           # PDF 페이지 이미지들
├── src/
│   ├── components/         # React 컴포넌트들
│   │   ├── Book.jsx       # 메인 플립북 컴포넌트
│   │   └── Header.jsx     # 헤더 컴포넌트
│   ├── App.jsx            # 메인 앱 컴포넌트
│   └── main.jsx           # 앱 진입점
└── package.json
```

## 🎨 주요 컴포넌트

### Book.jsx
- 플립북의 핵심 기능을 담당
- 페이지 넘기기 애니메이션
- GIF 모달 및 비디오 재생
- 반응형 이미지 크기 조정

### Header.jsx
- 네비게이션 및 헤더 UI
- 프로젝트 브랜딩

## 📱 반응형 지원

- **모바일**: 320px 최적화
- **태블릿**: 768px 이상 지원
- **데스크톱**: 1024px 이상 지원

## 🔧 개발 스크립트

- `npm run dev`: 개발 서버 실행
- `npm run build`: 프로덕션 빌드
- `npm run preview`: 빌드 결과 미리보기
- `npm run lint`: ESLint 코드 검사

## 📄 라이선스

이 프로젝트는 FrienderBrainTouch 조직의 일부입니다.

## 🤝 기여

프로젝트에 기여하고 싶으시다면:

1. 이 저장소를 포크하세요
2. 새로운 브랜치를 생성하세요 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋하세요 (`git commit -m 'Add some amazing feature'`)
4. 브랜치에 푸시하세요 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성하세요

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 [FrienderBrainTouch](https://github.com/orgs/FrienderBrainTouch) 조직에 연락해주세요.
