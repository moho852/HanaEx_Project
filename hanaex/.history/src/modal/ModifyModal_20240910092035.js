import React, { useState, useEffect } from "react";
import {
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Text,
  Image,
} from "@chakra-ui/react";
import { countryMapperFunction } from "../data/countryMapper";

const ModifyModal = ({
  selectedTransaction,
  onClose,
  handleTransactionUpdate,
}) => {
  const [withdrawalAmount, setWithdrawalAmount] = useState(
    selectedTransaction.withdrawal_amount
  );

  const getTransactionLabel = (type) => {
    if (type === "buy") return "살래요";
    if (type === "sell") return "팔래요";
    return type;
  };

  const [depositAmount, setDepositAmount] = useState(
    selectedTransaction.deposit_amount
  );

  // calculAmount: 출금 금액과 입금 금액을 곱한 결과
  const [calculAmount, setCalculAmount] = useState(0);

  // 출금 금액과 입금 금액이 변경될 때마다 calculAmount를 업데이트
  useEffect(() => {
    setCalculAmount(withdrawalAmount * depositAmount);
  }, [withdrawalAmount, depositAmount]);

  console.log(selectedTransaction);
  // 출금 금액 변경 핸들러
  const handleWithdrawalChange = (e) => {
    setWithdrawalAmount(parseFloat(e.target.value));
  };

  // 입금 금액 변경 핸들러
  const handleDepositChange = (e) => {
    setDepositAmount(parseFloat(e.target.value));
  };

  // 수정 버튼 클릭 시 호출되는 함수
  const handleUpdateClick = () => {
    // 예약 기간이 null이면 빈 문자열로 설정
    const updatedTransaction = {
      ...selectedTransaction,
      withdrawal_amount: withdrawalAmount,
      deposit_amount: depositAmount,
      reservation_period: selectedTransaction.reservation_period || "", // null 처리
    };

    handleTransactionUpdate(updatedTransaction); // 부모 컴포넌트로 수정된 값 전달
  };

  return (
    <ModalContent>
      <ModalHeader>거래변경</ModalHeader>
      <ModalBody>
        <Text>
          {getTransactionLabel(selectedTransaction.transaction_type)}·예약거래
        </Text>
        <div className="border my-1"></div>
        <div className="flex justify-between">
          <Text>통화</Text>
          <div className="flex gap-1 items-center mb-2">
            <Image
              src={
                countryMapperFunction(selectedTransaction.currency_code).image
              }
              className="w-[18px] h-[18px]"
            />
            <Text>USD</Text>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Text className="font-semibold">신청환율</Text>
          <Input
            type="number"
            value={withdrawalAmount}
            onChange={handleWithdrawalChange}
          />
          <Text className="font-semibold">신청금액</Text>
          <Input
            type="number"
            value={depositAmount}
            onChange={handleDepositChange}
          />
        </div>
        {/* 환산금액 */}
        <div className="flex mt-2">
          <Text className="font-normal text-xl text-slate-600">환산금액</Text>
          <Text className="font-semibold text-xl text-slate-600 mx-2">
            {calculAmount}
          </Text>
          <Text className="font-normal text-xl text-slate-600">약 KRW</Text>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button colorScheme="blue" onClick={handleUpdateClick}>
          수정
        </Button>
        <Button variant="ghost" onClick={onClose}>
          닫기
        </Button>
      </ModalFooter>
    </ModalContent>
  );
};

export default ModifyModal;
