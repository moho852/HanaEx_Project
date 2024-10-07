import React from "react";
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
} from "@chakra-ui/react";
const BuySell = ({ currentInvestPrice, currentSellPrice }) => {
  return (
    <div>
      <Stat className="flex justify-center">
        <StatLabel>내가 살 때</StatLabel>
        <StatNumber>{currentInvestPrice}</StatNumber>

        <StatHelpText>
          <StatArrow type="increase" />
          2.30
        </StatHelpText>
      </Stat>

      <Stat className="flex justify-center">
        <StatLabel>내가 팔 때</StatLabel>
        <StatNumber>{currentSellPrice}</StatNumber>
        <StatHelpText>
          <StatArrow type="increase" />
          2.30
        </StatHelpText>
      </Stat>
    </div>
  );
};

export default BuySell;
