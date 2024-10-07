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
      <div className="bg-slate-50 pt-10 flex">
        <div className='mr-4'>
          <Text className='font-semibold text-2xl'>
            앙진안
          </Text>
          <Text >
            환영합니다.
          </Text>
        </div>
        <div className="p-10 flex-grow bg-slate-200">
          <Tabs position="relative" variant="unstyled">
            <TabList>
              <Tab>내 계좌</Tab>
              <Tab>보유외환</Tab>
              <Tab>나의관심</Tab>
            </TabList>
            <TabIndicator
              mt="-1.5px"
              height="2px"
              bg="blue.500"
              borderRadius="1px"
            />
            <TabPanels>
              <TabPanel>
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
