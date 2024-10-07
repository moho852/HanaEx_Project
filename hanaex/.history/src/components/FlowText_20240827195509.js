// import React from 'react'
// import styled, {keyframes}from "styled-components";


// const FlowText= () => {
//   return (
//     <div className='rounded-full h-10 bg-green-400 overflow-hidden flex items-center'>
//     <TextFlow className='w-full'>
//       오늘의 증시 코스피 +10% 나스닥 -10% 
//     </TextFlow>
//     </div>
//   )
// }

// export default FlowText

// const TextFlowAni = keyframes`
//   0% {
//     transform: translateX(100%);
//   }
//   100% {
//     transform: translateX(-100%);
//   }
// `
// const TextFlow = styled.div`
//   white-space: nowrap;
//   overflow: hidden;
//   animation: ${TextFlowAni} 10s linear infinite;
// `

import React from 'react';
import styled, { keyframes } from 'styled-components';

const FlowText = () => {
  // Define the stock information as a JSX element
  const stockItems = [
    { name: '코스피', value: '2,689.25', change: '-0.32%' },
    { name: '코스닥', value: '764.95', change: '-0.24%' },
    { name: '코스피200', value: '364.56', change: '-0.48%' },
    { name: '미국 USD', value: '1,332.80', change: '0.37%' },
    { name: '비트코인', value: '83,965,000', change: '-1.75%' },
    { name: '이더리움', value: '3,555,000', change: '-3.11%' },
    { name: '리플', value: '788', change: '-1%' },
  ];

  return (
    <Container>
      <TextFlow>
        {stockItems.map((item, index) => (
          <StockItem key={index}>
            <b>{item.name}</b> {item.value} <Change>{item.change}</Change>
          </StockItem>
        ))}
      </TextFlow>
    </Container>
  );
}

export default FlowText;

// Styled Components for Animation and Layout
const marquee = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
`;

const Container = styled.div`
  width: 100%;
  overflow: hidden;
  background-color: #333;  // Background color similar to the screenshot
  color: white;  // Text color for visibility
  display: flex;
  align-items: center;
  padding: 10px 0;
`;

const TextFlow = styled.div`
  display: inline-flex;
  white-space: nowrap;
  animation: ${marquee} 20s linear infinite;
`;

const StockItem = styled.span`
  display: inline-block;
  margin: 0 20px;  // Space between items
  font-size: 16px;  // Adjust the font size as needed
`;

const Change = styled.span`
  color: ${({ children }) => (children.includes('-') ? 'blue' : 'red')}; // Blue for negative, red for positive
`;

