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
      <Text className="py-4 font-semibold text-lg">거래내역</Text>
      <ModalCloseButton />
      {/* <ReservedCard/> */}
      {transactionHistory.map((data, index) => (
        <ReservedCard
          key={index}
          // type={data.type}
          // date={data.date}
          // value={data.value}
          // rangeDate={data.rangeDate}
          // exchangeValue={data.exchangeValue}
          type={data.transaction_type}
          date={data.transaction_date}
          value={data.withdrawal_amount || data.deposit_amount}  // 금액을 표시
          rangeDate={data.reservation_period}
          exchangeValue={data.currency_code}
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
