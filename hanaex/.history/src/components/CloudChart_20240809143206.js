import React, { useEffect, useRef, useState } from 'react';
import WordCloud from 'wordcloud';

const WordCloudComponent = () => {
  const canvasRef = useRef(null);
  const [selectedFilter, setSelectedFilter] = useState('긍정');

  useEffect(() => {
    const words = [
      ['React', 20],
      ['WordCloud', 15],
      ['JavaScript', 25],
      ['D3', 10],
      ['Programming', 30],
      ['Visualization', 20],
      ['Frontend', 15],
      ['Backend', 10],
      ['Fullstack', 25],
    ];

    const pastelColors = [
      '#AEC6CF', '#FFB347', '#FF6961', '#FDFD96',
      '#77DD77', '#C23B22', '#F49AC2', '#CB99C9',
      '#B39EB5', '#FFB6C1', '#CFCFC4', '#F5DEB3'
    ];

    WordCloud(canvasRef.current, {
      list: words,
      gridSize: 8,
      weightFactor: 2,
      fontFamily: 'Times, serif',
      color: () => {
        return pastelColors[Math.floor(Math.random() * pastelColors.length)];
      },
      rotateRatio: 0.5,
      rotationSteps: 2,
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
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
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
      </div>
    </div>

  );
};

export default WordCloudComponent;