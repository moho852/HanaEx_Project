import React, { useState } from 'react';
import {
  Text,
  ModalContent,
  ModalFooter,
  ModalCloseButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
  Icon,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import ReservedCard from '../components/ReservedCard';
import { countryMapperFunction } from '../data/countryMapper';

const SelectModal = ({onClose, onPurchaseClick, transactionHistory, handleReservedCardClick, changeState, setChangeState }) => {
  // 드롭다운에서 선택된 통화 상태
  const [selectedCurrency, setSelectedCurrency] = useState("전체통화");

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
  };

  // 선택된 통화에 따른 transactionHistory 필터링
  const filteredTransactionHistory = selectedCurrency === "전체통화"
    ? transactionHistory
    : transactionHistory.filter(data => data.currency_code === selectedCurrency);
  
  const handleCloseAndPurchase = () => {
    onClose();
    onPurchaseClick();
  };


  return (
    <ModalContent className="px-6">
      <div className='flex justify-center'>
        <Text className='py-4 font-semibold text-xl mb-2'>예약내역</Text>
      </div>
      {/* 드롭다운 메뉴 추가 */}
      <Menu bg='white'>
        <MenuButton bg='white' as={Button}>
          <div className="flex items-center">
            <Image
              boxSize="2rem"
              borderRadius="full"
              src={countryMapperFunction(selectedCurrency).image}
              alt="Currency Flag"
              mr="12px"
            />
            <div>{selectedCurrency}</div>
            <Icon as={ChevronDownIcon} w={6} h={6} ml="8px" />
          </div>
        </MenuButton>
        <MenuList>
          <MenuItem minH="48px" onClick={() => handleCurrencyChange("전체통화")}>
            <span>전체통화</span>
          </MenuItem>
          <MenuItem minH="48px" onClick={() => handleCurrencyChange("USD")}>
            <Image
              boxSize="2rem"
              borderRadius="full"
              src="../../image/usd_flag.png"
              alt="USD Flag"
              mr="12px"
            />
            <span>미국 USD</span>
          </MenuItem>
          <MenuItem minH="48px" onClick={() => handleCurrencyChange("JPY")}>
            <Image
              boxSize="2rem"
              borderRadius="full"
              src="../../image/jpy_flag.png"
              alt="JPY Flag"
              mr="12px"
            />
            <span>일본 JPY</span>
          </MenuItem>
        </MenuList>
      </Menu>

      <Text className='text-slate-600'>미채결 예약건수: {transactionHistory.length},신규예약 가능건수 {30 - transactionHistory.length}</Text>
      {/* 닫기 버튼 */}
      <ModalCloseButton />
      {/* <ReservedCard/> */}
      <div
        style={{
          maxHeight: '300px',  // 최대 높이 설정
          overflowY: 'auto',    // Y축 스크롤 활성화
          scrollbarWidth: 'none',  // Firefox에서 스크롤바 숨기기
          msOverflowStyle: 'none', // IE/Edge에서 스크롤바 숨기기
        }}
        className="hide-scrollbar"
      >
      {filteredTransactionHistory.map((data, index) => (
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
