import React, { useEffect, useRef, useState } from 'react';
import WordCloud from 'wordcloud';

const WordCloudComponent = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Google Fonts에서 Noto Sans KR 로드
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const words = [
      ['트럼프전대통령', 20, "긍정"],
      ['경기침체우려', 15, "부정"],
      ['5000만', 25, "긍정"],
      ['전년동기대비', 10, "긍정"],
      ['경기침체우려', 30, "부정"],
      ['5월현지시간', 20, "부정"],
      ['달러흑자', 15, "긍정"],
      ['윤석열', 10, "부정"],
      ['현지시간', 25, "부정"],
      ["달러흑자", 30, "긍정"]
    ];

    WordCloud(canvasRef.current, {
      list: words,
      gridSize: 6,
      weightFactor: 1.7,
      fontWeight : "700",
      fontFamily: 'Noto Sans KR, sans-serif',
      color: (word, weight) => {
        // `word`는 문자열로 전달되며, `list`의 첫 번째 요소로만 참조됩니다.
        const wordData = words.find(w => w[0] === word);
        return wordData && wordData[2] === '긍정' ? '#df513e' : '#0a7cee';
      },
      rotateRatio: 0,
      rotationSteps: 1,
      backgroundColor: '#ffffff',
    });
  }, []);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={800}
        height={300}
      />
    </div>
  );
};

export default WordCloudComponent;