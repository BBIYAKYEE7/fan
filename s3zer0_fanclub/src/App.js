import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const appRef = useRef(null);
  
  // 표시할 텍스트 배열 - 원하는 내용으로 수정하세요
  const texts = [
    "세영선배님 혹시 MBTI가 CUTE이신가요?",
    "세영선배님은 왜 항상 같은 티만 입어요?",
    "큐티, 프리티.",
    "아니 누가 세영선배를 좋아해?",
    "안녕하세요 누 입니다.",
    "세계 3대 마요.",
    "참치마요, 치킨마요, 선배님 제 마음 훔쳐가지 마요.",
    "세영 선배님 사랑합니다!"
  ];

  useEffect(() => {
    const handleScroll = (event) => {
      // 이미 스크롤 애니메이션 중이면 무시
      if (isScrolling) return;
      
      // 스크롤 방향 감지
      const direction = event.deltaY > 0 ? 1 : -1;
      
      // 새 인덱스 계산 (범위 내에서만)
      const newIndex = Math.min(Math.max(currentIndex + direction, 0), texts.length - 1);
      
      // 인덱스가 변경된 경우에만 처리
      if (newIndex !== currentIndex) {
        setIsScrolling(true);
        setCurrentIndex(newIndex);
        
        // 스크롤 잠금 해제 (애니메이션 시간과 일치하게 설정)
        setTimeout(() => {
          setIsScrolling(false);
        }, 1000); // 1초 (CSS 애니메이션 시간과 일치)
      }
    };

    const appElement = appRef.current;
    if (appElement) {
      appElement.addEventListener('wheel', handleScroll, { passive: false });
    }

    return () => {
      if (appElement) {
        appElement.removeEventListener('wheel', handleScroll);
      }
    };
  }, [currentIndex, isScrolling, texts.length]);

  return (
    <div className="app" ref={appRef}>
      <div className="text-container">
        {texts.map((text, index) => (
          <div
            key={index}
            className={`text-item ${index === currentIndex ? 'active' : ''} ${
              index < currentIndex ? 'above' : index > currentIndex ? 'below' : ''
            }`}
          >
            {text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;