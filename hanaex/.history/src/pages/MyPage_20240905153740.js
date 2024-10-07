import React from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
} from "@chakra-ui/react";
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Text,
} from "@chakra-ui/react";

const MyPage = () => {
  return (
    <div className="w-[1140px] h-[calc(100vh-60px)] flex flex-col py-10 px-10 bg-slate-300">
      <div className="bg-slate-50 p-10 flex">
        <div className='mr-4 '>
          <Text className=''>Lv3</Text>
          <Text className='font-semibold text-3xl'>
            앙진안님
          </Text>
          <Text className='text-3xl'>
            환영합니다.
          </Text>
        </div>
        <div className="p-10 flex-grow bg-slate-200">
          <Tabs position="relative" variant="unstyled">
            <TabList>
              <Tab><Text className='text-2xl'>내 계좌</Text></Tab>
              <Tab><Text className='text-2xl'>보유외환</Text></Tab>
              <Tab><Text className='text-2xl'>나의관심</Text></Tab>
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
                <Text className='font-medium text-3xl'>하나저축계좌</Text>
                <Text className='text-2xl'>278-911354-666607</Text>
                <div className='flex items-end'>
                  <Text className='text-3xl'>700,000</Text>
                  <Text> 원</Text>
                </div>
                
                <Stat>
                  <StatLabel>Sent</StatLabel>
                  <StatNumber>345,670</StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    2355원 23.36%
                  </StatHelpText>
                </Stat>
              </TabPanel>
              <TabPanel>
                <p>two!</p>
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
