import React, { useState } from "react";
import {
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Text,
} from "@chakra-ui/react";

const ModifyModal = ({ selectedTransaction, onClose, handleTransactionUpdate }) => {
  const [withdrawalAmount, setWithdrawalAmount] = useState(
    selectedTransaction.withdrawal_amount
  );
  const [depositAmount, setDepositAmount] = useState(
    selectedTransaction.deposit_amount
  );

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
      ...transaction,
      withdrawal_amount: withdrawalAmount,
      deposit_amount: depositAmount,
      reservation_period: transaction.reservation_period || "",  // null 처리
    };

    onUpdate(updatedTransaction);  // 부모 컴포넌트로 수정된 값 전달
  };

  return (
    <ModalContent>
      <ModalHeader>거래 수정</ModalHeader>
      <ModalBody>
        <div className="flex flex-col gap-4">
          <Text>출금 금액</Text>
          <Input
            type="number"
            value={withdrawalAmount}
            onChange={handleWithdrawalChange}
          />
          <Text>입금 금액</Text>
          <Input
            type="number"
            value={depositAmount}
            onChange={handleDepositChange}
          />
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
