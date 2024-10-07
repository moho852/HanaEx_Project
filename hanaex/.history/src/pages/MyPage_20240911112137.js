import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import TransactionAccount from "../components/TransactionAccount";
import TransactionExchangeAccount from "../components/TransactionExchangeAccount";
import "../css/style.css";

const MyPage = () => {
  const user = useSelector((state) => state.user.user);
  const [accountsData, setAccountsData] = useState(null);
  const [transactionsData, setTransactionsData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredTransactions, setFilteredTransactions] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // 초기 잔액 설정
  const initialBalance = 1000000;

  useEffect(() => {
    // API 호출
    const fetchAccountsData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8082/api/getallaccount"
        );
        setAccountsData(response.data.accounts);
        setTransactionsData(response.data.transactions);

        // 결제 상태가 "completed"인 항목만 필터링
        const completedTransactions = response.data.transactions.filter(
          (transaction) => transaction.conclusion_status === "completed"
        );
        setFilteredTransactions(completedTransactions);
        console.log(completedTransactions);
      } catch (error) {
        console.error("Error fetching account data:", error);
      } finally {
        setIsLoading(true);
      }
    };

    fetchAccountsData();
  }, []);

  // 잔액을 계산하는 함수 (setState 사용하지 않고 계산)
  const calculateNewBalance = (
    transaction_type,
    withdrawal_amount,
    deposit_amount,
    currentBalance
  ) => {
    if (transaction_type === "buy") {
      return currentBalance - withdrawal_amount;
    } else if (transaction_type === "sell") {
      return currentBalance + deposit_amount;
    }
    return currentBalance;
  };

  function formatNumber(number) {
    const truncatedNumber = Math.floor(number);
    return truncatedNumber.toLocaleString("en-US");
  }

  if (!isLoading || !filteredTransactions || !accountsData)
    return <div>로딩중입니다.</div>;

  let currentBalance = initialBalance; // 여기서 거래 내역마다 잔액을 갱신할 변수

  return (
    <div className="w-[1140px] h-[calc(100vh-60px)] flex flex-col py-10 px-10">
      <div className="bg-slate-50 p-10 flex">
        <div className="mr-4 ">
          <Text className="flex w-14 justify-center bg-slate-400">
            Lv{user.user_lv}
          </Text>
          <Text className="font-semibold text-3xl">{user.user_name}님</Text>
          <Text className="text-3xl">환영합니다.</Text>
        </div>
        <div className="p-10 flex-grow bg-slate-200">
          <Tabs position="relative" variant="unstyled">
            <TabList>
              <Tab>
                <Text className="text-2xl">내 계좌</Text>
              </Tab>
              <Tab>
                <Text className="text-2xl">외환거래</Text>
              </Tab>
              <Tab>
                <Text className="text-2xl">외화자산</Text>
              </Tab>
            </TabList>
            <TabIndicator
              mt="-1.5px"
              height="2px"
              bg="blue.500"
              borderRadius="1px"
            />
            <TabPanels>
              <TabPanel>
                <div className="flex flex-col items-start ml-3">
                  <Text className="font-bold text-xl mt-3">
                    {accountsData[0].accounts_name}
                  </Text>
                  <Text className="text-slate-600 text-lg">
                    278-911354-666607
                  </Text>
                  <div className="flex items-end mt-2">
                    <Text className="font-semibold leading-0 text-3xl">
                      {formatNumber(accountsData[0].krw)} {/* 현재 잔액 표시 */}
                    </Text>
                    <Text className="leading-0 text-2xl"> 원</Text>
                  </div>
                  <Text className="text-slate-600 text-lg">
                    출금가능금액 {formatNumber(accountsData[0].krw)}원
                  </Text>
                </div>

                <div
                  className="bg-white rounded-2xl px-8 py-6 mt-4 scroll-container"
                  style={{ maxHeight: "500px", overflowY: "auto" }}
                >
                  <Text className="text-xl font-bold">거래내역</Text>
                  {filteredTransactions.map((transaction, index) => {
                    // 거래가 처리된 후 새로운 잔액 계산
                    const newBalance = calculateNewBalance(
                      transaction.transaction_type,
                      transaction.withdrawal_amount,
                      transaction.deposit_amount,
                      currentBalance
                    );

                    // 거래 이후의 잔액으로 currentBalance 업데이트
                    currentBalance = newBalance;

                    return (
                      <TransactionAccount
                        key={index}
                        currency_code={transaction.currency_code}
                        transaction_date={transaction.transaction_date}
                        transaction_type={transaction.transaction_type}
                        withdrawal_amount={transaction.withdrawal_amount}
                        deposit_amount={transaction.deposit_amount}
                        balance={newBalance} // 각 거래 후의 잔액 전달
                      />
                    );
                  })}
                </div>
              </TabPanel>

              <TabPanel>
                {/* 2번째 */}
                <div className="flex flex-col items-start ml-3">
                  <Text className="font-bold text-xl mt-3">
                    하나밀리언달러통장
                  </Text>
                  <Text className="text-slate-600 text-lg">
                    342-910012-87238
                  </Text>
                  <div className="flex items-end my-2">
                    <Text className="leading-0 text-2xl mr-1">USD</Text>
                    <Text className="font-bold leading-0 text-3xl">12.00</Text>
                  </div>
                  <div
                    className="bg-white w-full rounded-2xl px-8 py-6 mt-4"
                    style={{ maxHeight: "500px", overflowY: "auto" }}
                  >
                    <Text className="text-xl font-bold">외환거래내역</Text>
                    {filteredTransactions.map((transaction, index) => (
                      <TransactionExchangeAccount
                        key={index}
                        currency_code={transaction.currency_code}
                        transaction_type={transaction.transaction_type}
                        deposit_amount={transaction.deposit_amount}
                        withdrawal_amount={transaction.withdrawal_amount}
                        conclusion_status={transaction.conclusion_status}
                        transaction_date={transaction.transaction_date}
                      />
                    ))}
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                {/* 2번째 */}
                <div className="flex flex-col items-start ml-3">
                  <Text className="font-bold text-xl mt-3">
                    하나밀리언달러통장
                  </Text>
                  <div className="flex w-full justify-between">
                    <Text className="text-slate-600 text-lg">
                      342-910012-87238
                    </Text>
                    <Text className="font-semibold" onClick={onOpen}>
                      자세히보기
                    </Text>
                  </div>

                  <div className="bg-white w-full rounded-2xl px-8 py-6 mt-4">
                    <div className="flex justify-between">
                      <Text className="text-2xl font-bold">보유자산</Text>
                      <div className="flex gap-1">
                        <Image
                          className="w-[24px] h-[24px]"
                          src="/image/usd_flag.png"
                        ></Image>
                        <Text className="text-2xl font-bold">USD</Text>
                        <Text className="text-2xl font-bold">12</Text>
                      </div>
                    </div>

                    <div className="border my-3"></div>

                    <div className="flex justify-between">
                      <Text className="text-xl font-medium">
                        외화대가외화금액
                      </Text>
                      <div className="flex gap-1">
                        <Image
                          className="w-[24px] h-[24px]"
                          src="/image/usd_flag.png"
                        ></Image>
                        <Text className="text-xl font-medium">USD</Text>
                        <Text className="text-xl font-medium">12</Text>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <Text className="text-xl font-medium">환산금액</Text>
                      <Text className="text-xl font-medium">16,515원</Text>
                    </div>

                    <div className="flex justify-between">
                      <Text className="text-slate-600">평균적용환율</Text>
                      <Text className="text-slate-600">1376.29</Text>
                    </div>

                    <div className="border my-3"></div>

                    <div className="flex justify-between">
                      <Text className="text-xl font-medium">지금 팔면</Text>
                      <Text className="text-xl font-medium">16,093원</Text>
                    </div>

                    <div className="flex justify-between">
                      <Text className="text-slate-600">예상적용환율</Text>
                      <Text className="text-slate-600">1341.13</Text>
                    </div>

                    <div className="flex justify-between">
                      <Text>예상수익금</Text>
                      <Text>-442원</Text>
                    </div>

                    <div className="flex justify-between">
                      <Text>예상수익률</Text>
                      <Text>-2.55%</Text>
                    </div>
                  </div>
                </div>
              </TabPanel>
            </TabPanels>
          </Tabs>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Modal Title</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <renderActiveShape />
              </ModalBody>

              <ModalFooter>
                <button onClose={onClose}></button>
                <button variant="ghost">Secondary Action</button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
