import React from 'react'
import {
  Text,
  ModalContent,
  ModalFooter,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import ReservedCard from '../components/ReservedCard';

const SelectModal = ({onClose, onPurchaseClick, transactionHistory, handleReservedCardClick}) => {
  const handleCloseAndPurchase = () => {
    onClose();
    onPurchaseClick();
  };
  return (
    <ModalContent className="px-6">
      <div className='flex justify-center'>
        <Text className='py-4 font-semibold text-xl mb-2'>예약내역</Text>
      </div>
      <MainDropDown />
      {/* 닫기 버튼 */}
      <ModalCloseButton />
      {/* <ReservedCard/> */}
      {transactionHistory.map((data, index) => (
        <ReservedCard
          key={index}
          transaction_type={data.transaction_type}
          transaction_date={data.transaction_date}
          withdrawal_amount={data.withdrawal_amount}
          deposit_amount={data.deposit_amount}
          reservation_period={data.reservation_period}
          currency_code={data.currency_code}
          onClick={() => handleReservedCardClick(index)} // 클릭 핸들러 추가
        />
      ))}
      <div>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleCloseAndPurchase}>
            Close
          </Button>
          <Button name="구매하기" variant="ghost" onClick={handleCloseAndPurchase}>구매하기</Button>
        </ModalFooter>
      </div>
    </ModalContent>
  )
}

export default SelectModal
