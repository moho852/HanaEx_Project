import React from 'react'
import styled, {keyframes}from "styled-components";


const FlowText= () => {
  return (
    <div className='rounded-full h-10 bg-green-400 overflow-hidden flex items-center'>
    <TextFlow className='w-full'>
      오늘의 증시 코스피 +10% 나스닥 -10% 
    </TextFlow>
    </div>
  )
}

export default FlowText

const TextFlowAni = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
`
const TextFlow = styled.div`
  white-space: nowrap;
  overflow: hidden;
  animation: ${TextFlowAni} 10s linear infinite;
`