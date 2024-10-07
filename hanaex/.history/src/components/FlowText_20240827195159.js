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
  // Your HTML content as a string
  const stockHtmlContent = `
    <ul class="stock_list move_el is_move" id="top_stock_list" style="--repeat: 1538">
      <li class="stock_node">
        <div class="stock_item" role="text">
          <b class="stock_name">코스피</b>
          <p class="stock_info_group" aria-label="2,689.25, -0.32%">
            <span class="stock" aria-hidden="true">2,689.25</span>
            <span class="is_minus" aria-hidden="true">-0.32%</span>
          </p>
        </div>
        <span name="stock_date" style="display:none">2024-08-27 18:05:40</span>
      </li>
      <li class="stock_node">
        <div class="stock_item" role="text">
          <b class="stock_name">코스닥</b>
          <p class="stock_info_group" aria-label="764.95, -0.24%">
            <span class="stock" aria-hidden="true">764.95</span>
            <span class="is_minus" aria-hidden="true">-0.24%</span>
          </p>
        </div>
      </li>
      <li class="stock_node">
        <div class="stock_item" role="text">
          <b class="stock_name">코스피200</b>
          <p class="stock_info_group" aria-label="364.56, -0.48%">
            <span class="stock" aria-hidden="true">364.56</span>
            <span class="is_minus" aria-hidden="true">-0.48%</span>
          </p>
        </div>
      </li>
      <li class="stock_node">
        <div class="stock_item" role="text">
          <b class="stock_name">미국 USD</b>
          <p class="stock_info_group" aria-label="1,332.80, 0.37%">
            <span class="stock" aria-hidden="true">1,332.80</span>
            <span class="is_plus" aria-hidden="true">0.37%</span>
          </p>
        </div>
      </li>
      <li class="stock_node">
        <div class="stock_item" role="text">
          <b class="stock_name">비트코인</b>
          <p class="stock_info_group" aria-label="83,965,000, -1.75%">
            <span class="stock" aria-hidden="true">83,965,000</span>
            <span class="is_minus" aria-hidden="true">-1.75%</span>
          </p>
        </div>
      </li>
      <li class="stock_node">
        <div class="stock_item" role="text">
          <b class="stock_name">이더리움</b>
          <p class="stock_info_group" aria-label="3,555,000, -3.11%">
            <span class="stock" aria-hidden="true">3,555,000</span>
            <span class="is_minus" aria-hidden="true">-3.11%</span>
          </p>
        </div>
      </li>
      <li class="stock_node">
        <div class="stock_item" role="text">
          <b class="stock_name">리플</b>
          <p class="stock_info_group" aria-label="788, -1%">
            <span class="stock" aria-hidden="true">788</span>
            <span class="is_minus" aria-hidden="true">-1%</span>
          </p>
        </div>
      </li>
    </ul>
  `;

  return (
    <div className='rounded-full h-10 bg-green-400 overflow-hidden flex items-center'>
      <TextFlow
        className='w-full'
        dangerouslySetInnerHTML={{ __html: stockHtmlContent }}
      />
    </div>
  );
}

export default FlowText;

const TextFlowAni = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
`;

const TextFlow = styled.div`
  white-space: nowrap;
  overflow: hidden;
  animation: ${TextFlowAni} 10s linear infinite; /* Adjust animation speed here */
`;
