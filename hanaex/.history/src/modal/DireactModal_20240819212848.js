// DireactModal
import React from 'react'
import {
  ModalContent,
  Text,

} from "@chakra-ui/react";
const DireactModal = () => {
  return (
    <ModalContent>
      <Text className="py-4 font-semibold flex justify-center text-lg">거래완료</Text>
      <Text className="flex font-semibold justify-center text-lg">USD 1 을</Text>
      <Text>1,339원에 삽습니다.</Text>
      <Text>적용환율 1,357.14</Text>



      
    </ModalContent>
  )
}

export default DireactModal
