// DireactModal
import React, { useEffect } from 'react'
import {
  ModalContent,
  Text,
  Image,
  ModalFooter,
  Button,
  ModalCloseButton
} from "@chakra-ui/react";
const DireactModal = ({onClose, onPurchaseClick, exchangeValue, calculatedValue, currentInvestPrice, currentSellPrice, selected, changeState }) => {
  const handleCloseAndPurchase = () => {
    onClose();
    onPurchaseClick();
  };
  return (
    
    <ModalContent className="px-6">
      <ModalCloseButton />
      <div className="flex justify-center">
        <Text className="py-4 font-semibold text-xl mb-2">거래완료</Text>
      </div>

      <div className='flex justify-center pb-4'>
        <Image src='/image/check.png' boxSize={'84px'}></Image>
      </div>
      {/* 1번줄 */}
      <div className='flex justify-center gap-1'>
        <Text className="flex text-slate-600 font-normal justify-center text-2xl">{changeState}</Text>
        <Text className="flex font-semibold justify-center text-2xl">{exchangeValue}</Text>
        <Text className="flex text-slate-600 font-normal justify-center text-2xl">을</Text>
      </div>
      {/* 2번줄 */}
      <div className='flex justify-center gap-1'>
        <Text className="flex font-semibold justify-center text-2xl">{calculatedValue}</Text>
        <Text className="flex text-slate-600 font-normal justify-center text-2xl">원에 샀습니다</Text>
      </div>
      {/* 3번줄 */}
      <div className='flex items-center'>
        <Text className="pt-4 flex font-light justify-center text-sm">적용환율</Text>
        <Text>{currentInvestPrice}</Text>
      </div>
      <div className=''>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleCloseAndPurchase}>
            Close
          </Button>
          <Button name="구매하기" variant="ghost" onClick={onPurchaseClick}>구매하기</Button>
        </ModalFooter>
      </div>
      
    </ModalContent>
  )
}

export default DireactModal
