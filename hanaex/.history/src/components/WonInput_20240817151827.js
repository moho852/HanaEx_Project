import React from 'react';
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';

const WonInput = ({ format, parse, wonValue, setWonValue }) => {
  return (
    <NumberInput
      onChange={(valueString) => setWonValue(parse(valueString))}
      value={format(wonValue)}
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
