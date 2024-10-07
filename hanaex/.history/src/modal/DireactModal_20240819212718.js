// DireactModal
import React from 'react'
import {
  ModalContent,
  Text,

} from "@chakra-ui/react";
const DireactModal = () => {
  return (
    <ModalContent>
      <Text className="py-4 font-semibold flex text-lg">거래완료</Text>
      <Text>USD 1을</Text>
      <Text>1,339원에 삽습니다.</Text>
      <Text>적용환율 1,357.14</Text>



      
    </ModalContent>
  )
}

export default DireactModal
