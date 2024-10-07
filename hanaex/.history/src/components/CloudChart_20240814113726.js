import React, { useEffect, useRef, useState } from 'react';
import WordCloud from 'wordcloud';

const WordCloudComponent = () => {
  const canvasRef = useRef(null);
  const [selectedFilter, setSelectedFilter] = useState('긍정');

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

    const pastelColors = [
      "#df513e", "#0a7cee"
    ];

    WordCloud(canvasRef.current, {
      list: words,
      gridSize: 8,
      weightFactor: 2,
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
  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
    console.log(`${filter} 버튼 클릭됨`);
    // 여기에 필터링 로직 추가 가능
  };
  return (
    <div>
      <canvas
      ref={canvasRef}
      width={800}
      height={300}
      // style={{ border: '1px solid #ccc' }}
    />
    {/* <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <button
          onClick={() => handleFilterClick('긍정')}
          style={{
            padding: '10px 20px',
            margin: '0 5px',
            background: selectedFilter === '긍정' ? '#0000FF' : '#C0C0C0',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            flex: 1,
            textAlign: 'center'
          }}
        >
          긍정
        </button>
        <button
          onClick={() => handleFilterClick('부정')}
          style={{
            padding: '10px 20px',
            margin: '0 5px',
            background: selectedFilter === '부정' ? '#0000FF' : '#C0C0C0',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            flex: 1,
            textAlign: 'center'
          }}
        >
          부정
        </button>
        <button
          onClick={() => handleFilterClick('전체')}
          style={{
            padding: '10px 20px',
            margin: '0 5px',
            background: selectedFilter === '전체' ? '#0000FF' : '#C0C0C0',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            flex: 1,
            textAlign: 'center'
          }}
        >
          전체
        </button>
      </div> */}
    </div>

  );
};

export default WordCloudComponent;