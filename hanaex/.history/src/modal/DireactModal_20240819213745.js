// DireactModal
import React from 'react'
import {
  ModalContent,
  Text,
  Image
} from "@chakra-ui/react";
const DireactModal = () => {
  return (
    <ModalContent>
      <Text className="py-4 font-semibold flex justify-center text-lg">거래완료</Text>
      <Image src='/image/check.png' boxSize={'84px'}></Image>
      <Text className="flex font-semibold justify-center text-lg">USD 1 을</Text>
      <Text className="flex font-semibold justify-center text-lg">1,339원에 샀습니다.</Text>
      <Text className="pt-4 flex font-light justify-center text-sm">적용환율 1,357.14</Text>



      
    </ModalContent>
  )
}

export default DireactModal
