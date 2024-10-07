import React, { useEffect, useState } from "react";
import axios from "axios"; // axios 추가
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
  Image,
} from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { useSelector } from 'react-redux';
import TransactionAccount from '../components/TransactionAccount';

const MyPage = () => {
  const user = useSelector((state) => state.user.user);
  const [accountsData, setAccountsData] = useState(null); // 상태 추가
  const [transactionsData, setTransactionsData] = useState(null); // 트랜잭션 데이터 상태 추가
  const [isLoading, setIsLoading] = useState(false);
  const [filteredTransactions, setFilteredTransactions] = useState(null);
  console.log(accountsData)
  console.log(transactionsData)
  useEffect(() => {
    // API 호출
    const fetchAccountsData = async () => {
      try {
        const response = await axios.get("http://localhost:8082/api/getallaccount");
        // accounts와 transactions 데이터를 분리하여 상태에 저장
        setAccountsData(response.data.accounts);
        setTransactionsData(response.data.transactions);

        // 결제 상태가 "completed"인 항목만 필터링
        const completedTransactions = response.data.transactions.filter(
          (transaction) => transaction.conclusion_status === "completed"
        );
        setFilteredTransactions(completedTransactions);
      } catch (error) {
        console.error("Error fetching account data:", error);
      } finally {
        setIsLoading(true);
      }
    };

    fetchAccountsData();
  }, []); // 컴포넌트가 처음 마운트될 때만 실행

  function formatNumber(number) {
    // 소수점 절삭
    const truncatedNumber = Math.floor(number);
    // 쉼표 포함된 형식으로 변환
    return truncatedNumber.toLocaleString('en-US');
  }

  if (!isLoading) return <div>로딩중입니다.</div>

  return (
    <div className="w-[1140px] h-[calc(100vh-60px)] flex flex-col py-10 px-10">
      <div className="bg-slate-50 p-10 flex">
        <div className="mr-4 ">
          <Text className="flex w-14 justify-center bg-slate-400">Lv{user.user_lv}</Text>
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
                <Text className="text-2xl">보유외환</Text>
              </Tab>
              <Tab>
                <Text className="text-2xl">나의관심</Text>
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
                {/* 1번째 */}
                <div className="flex flex-col items-start ml-3">
                  <Text className="font-medium text-xl mt-3">{accountsData[0].accounts_name}</Text>
                  <Text className="text-slate-600 text-lg">
                    278-911354-666607
                  </Text>
                  <div className="flex items-end mt-2">
                    <Text className="font-semibold leading-0 text-3xl">
                      {formatNumber(accountsData[0].krw)}
                    </Text>
                    <Text className="leading-0 text-2xl"> 원</Text>
                  </div>
                  <Text className="text-slate-600 text-lg">
                    출금가능금액 {formatNumber(accountsData[0].krw)}원
                  </Text>
                </div>

                {/* 거래 내역 */}
                <div className="bg-white rounded-2xl px-8 py-6 mt-4">
                  <Text className="text-xl font-bold">거래내역</Text>
                  <Text>2024.09.05(목)</Text>
                  <div className="border bg-slate-600 my-2"></div>
                  <div className="w-full justify-between my-3 flex">
                    <Text>10:05:48</Text>
                    <Text>대체</Text>
                  </div>
                  <Text className="text-2xl">FX마켓 USD 살래요</Text>
                  <Text className="flex text-red-500 justify-end font-semibold text-3xl">
                    -9,343
                  </Text>
                  <Text className="flex justify-end">688,454원</Text>
                  <div className="border bg-slate-600 my-3"></div>
                </div>
              </TabPanel>
              <TabPanel>
                {/* 2번째 */}
                <div className="flex flex-col items-start ml-3">
                  <Text className="font-medium text-xl mt-3">
                    하나밀리언달러통장
                  </Text>
                  <Text className="text-slate-600 text-lg">
                    342-910012-87238
                  </Text>
                  <div className="flex items-end my-2">
                    <Text className="leading-0 text-2xl">USD</Text>
                    <Text className="font-semibold leading-0 text-3xl">12</Text>
                  </div>
                </div>

                {/* 거래 내역 */}
                <div className="bg-white rounded-2xl px-8 py-6 mt-4">
                  <Text className="text-2xl font-bold">거래내역</Text>
                  {/* 거래 컴포넌트 */}
                  <Text className='flex justify-center w-[60px] border border-red-600 rounded-sm mt-3'>살래요</Text>
                  <div className='flex justify-between items-center'>
                    <div className="flex items-center mt-3">
                      <Image
                        src="/image/usd_flag.png"
                        className="h-[28px] w-[28px]"
                      ></Image>
                      <Text className="ml-3 font-medium text-2xl">
                        USD 1
                      </Text>
                    </div>
                    <Text className='font-medium text-2xl'>거래완료</Text>
                  </div>
                  <div className='flex justify-between'>
                    <div className='flex justify-between'>
                      <div className='w-[42px]'></div>
                      <Text className='text-lg text-slate-500'>1,346.92</Text>
                    </div>
                    <Text className='text-slate-500'>2024-08-19 22:37</Text>
                  </div>
                  <div className='border'></div>
                  <TransactionAccount />
                </div>
                
                <TransactionAccount />
              </TabPanel>
              <TabPanel>
                <p>three!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
