import React from "react";
import { Text } from "@chakra-ui/react";
const TransactionAccount = ({currency_code, transaction_date, transaction_type, withdrawal_amount}) => {
  // console.log());
  const formattedAmount = transaction_type === "buy" 
    ? `+${withdrawal_amount}` 
    : `-${withdrawal_amount}`;
  // 금액 색상 설정
  const amountColor = transaction_type === "buy" ? "red.500" : "blue.500";
  return (
    <div>
      {/* 거래 내역 */}
      <div className="bg-white rounded-2xl px-8 py-6 mt-4">
        <Text className="text-xl font-bold">거래내역</Text>
        <Text>2024.09.05</Text>
        <div className="border bg-slate-600 my-2"></div>
        <div className="w-full justify-between my-3 flex">
          <Text>10:05:48</Text>
          <Text>대체</Text>
        </div>
        <Text className="text-2xl">FX마켓 {currency_code} 살래요</Text>
        <Text className="flex text-red-500 justify-end font-semibold text-3xl">
          {withdrawal_amount}
        </Text>
        <Text className={`flex justify-end font-semibold text-3xl`} color={amountColor}>
          {formattedAmount} {/* 금액 표시 */}
        </Text>
        <Text className="flex justify-end">688,454원</Text>
        <div className="border bg-slate-600 my-3"></div>
      </div>
    </div>
  );
};

export default TransactionAccount;
