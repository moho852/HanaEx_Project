import React from 'react'
import {
  Text,
  ModalContent,
  ModalFooter,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import ReservedCard from '../components/ReservedCard';
import MainDropDown from '../components/DropDownMenu/MainDropDown';

const SelectModal = ({onClose, onPurchaseClick, transactionHistory, handleReservedCardClick, changeState, setChangeState }) => {
  const handleCloseAndPurchase = () => {
    onClose();
    onPurchaseClick();
  };
  return (
    <ModalContent className="px-6">
      <div className='flex justify-center'>
        <Text className='py-4 font-semibold text-xl mb-2'>예약내역</Text>
      </div>
      {/* <MainDropDown 
        changeState={changeState}
        setChangeState={setChangeState}
      /> */}
      {/* 닫기 버튼 */}
      <ModalCloseButton />
      {/* <ReservedCard/> */}
      <div
        style={{
          maxHeight: '200px',  // 최대 높이 설정
          overflowY: 'auto',    // Y축 스크롤 활성화
          scrollbarWidth: 'none',  // Firefox에서 스크롤바 숨기기
          msOverflowStyle: 'none', // IE/Edge에서 스크롤바 숨기기
        }}
        className="hide-scrollbar"
      >
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
      </div>
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
