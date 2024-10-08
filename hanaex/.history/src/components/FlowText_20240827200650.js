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
  // 주식 정보 배열에 일본 JPY, 유럽 EU, 중국 CNY 추가
  const stockItems = [
    { name: '코스피', value: '2,689.25', change: '-0.32%' },
    { name: '코스닥', value: '764.95', change: '-0.24%' },
    { name: '코스피200', value: '364.56', change: '-0.48%' },
    { name: '미국 USD', value: '1,332.80', change: '0.37%' },
    { name: '비트코인', value: '83,965,000', change: '-1.75%' },
    { name: '이더리움', value: '3,555,000', change: '-3.11%' },
    { name: '리플', value: '788', change: '-1%' },
    { name: '일본 JPY', value: '9.52', change: '0.18%' }, // 추가
    { name: '유럽 EU', value: '1,238.10', change: '0.25%' }, // 추가
    { name: '중국 CNY', value: '183.45', change: '-0.10%' } // 추가
  ];

  return (
    <Container>
      <TextFlow>
        {stockItems.map((item, index) => (
          <StockItem key={index}>
            <b>{item.name}</b> {item.value} <Change change={item.change}>{item.change}</Change>
          </StockItem>
        ))}
      </TextFlow>
    </Container>
  );
}

export default FlowText;

// 애니메이션과 레이아웃을 위한 스타일 컴포넌트
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
  background-color: #333;  /* 스크린샷과 유사한 배경색 */
  color: white;  /* 텍스트 가시성을 위한 색상 */
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
  margin: 0 20px;  /* 아이템 간 간격 */
  font-size: 16px;  /* 폰트 크기 */
  position: relative;
`;

const Change = styled.span`
  color: ${({ change }) => (change.includes('-') ? 'blue' : 'red')}; // 음수는 파랑, 양수는 빨강
  position: relative;
  padding-left: 12px;  /* 삼각형과 텍스트 사이 간격 */

  // change에 따라 삼각형 모양을 표시하는 :before 가상 요소 추가
  &::before {
    content: '';
    display: inline-block;
    margin-right: 5px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: ${({ change }) => (change.includes('-') ? '0 8px 8px 8px' : '8px 8px 0 8px')};
    border-color: ${({ change }) => (change.includes('-') ? 'transparent transparent blue transparent' : 'red transparent transparent transparent')};
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
`;
