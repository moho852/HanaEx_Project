import React from 'react';
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';

const WonInput = ({ selected, format, parse, wonValue, setWonValue, vendWonValue, setVendWonValue }) => {
  const value = selected ? wonValue : vendWonValue;
  const setValue = selected ? setWonValue : setVendWonValue;

  return (
    <NumberInput
      onChange={(valueString) => setValue(parse(valueString))}
      value={format(value)}
      step={0.01}
    >
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
};

export default WonInput;
