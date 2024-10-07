import React, { useEffect, useRef } from 'react';
import WordCloud from 'wordcloud';

const WordCloudComponent = () => {
  const canvasRef = useRef(null);

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

    WordCloud(canvasRef.current, {
      list: words,
      gridSize: 8,
      weightFactor: 2,
      fontFamily: 'Times, serif',
      color: () => {
        return (['#000', '#666', '#999', '#333'][Math.floor(Math.random() * 4)]);
      },
      rotateRatio: 0.5,
      rotationSteps: 2,
      backgroundColor: '#f0f0f0',
    });
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={300}
      style={{ border: '1px solid #ccc' }}
    />
  );
};

export default WordCloudComponent;
