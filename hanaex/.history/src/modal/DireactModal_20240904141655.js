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
      <div className='flex justify-center gap-1'>
        <Text className="flex font-semibold justify-center text-lg">{changeState}</Text>
        <Text className="flex font-semibold justify-center text-lg">{exchangeValue}</Text>
      </div>
      <Text className="flex font-semibold justify-center text-lg">1,339원에 샀습니다.</Text>
      <Text className="pt-4 flex font-light justify-center text-sm">적용환율 1,357.14</Text>

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
