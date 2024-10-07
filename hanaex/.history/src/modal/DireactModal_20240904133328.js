// DireactModal
import React, { useEffect } from 'react'
import {
  ModalContent,
  Text,
  Image,
  ModalFooter,
  Button
} from "@chakra-ui/react";
const DireactModal = ({onClose, onPurchaseClick}) => {
  const handleCloseAndPurchase = () => {
    onClose();
    onPurchaseClick();
  };
  return (
    
    <ModalContent className="px-6">
      <div className="flex justify-center">
        <Text className="py-4 font-semibold text-2xl mb-2">거래하기</Text>
      </div>
      
      <Text className="py-4 font-semibold flex justify-center text-lg">거래완료</Text>
      <div className='flex justify-center pb-4'>
        <Image src='/image/check.png' boxSize={'84px'}></Image>
      </div>
      <Text className="flex font-semibold justify-center text-lg">USD 1 을</Text>
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
