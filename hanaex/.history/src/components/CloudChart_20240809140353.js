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
