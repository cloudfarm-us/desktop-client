import { FormControl,
  FormControlProps,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputProps,
  NumberInputStepper } from '@chakra-ui/react';
import type { UseFormRegisterReturn } from 'react-hook-form';

type ControlledInputProperties = {
  message?: string;
  registerReturn: UseFormRegisterReturn;
  controlProps: FormControlProps;
  numberInputProps: NumberInputProps;
  label: string;
  helperText?: string;
};

export const IntegerInput = ({
  registerReturn,
  controlProps,
  numberInputProps,
  label,
}: ControlledInputProperties): JSX.Element => (
  <FormControl {...controlProps}>
    <FormLabel flex={1} fontSize='sm' my='1' htmlFor={numberInputProps.id}>
      {label}
    </FormLabel>

    <NumberInput {...numberInputProps}>
      <NumberInputField {...registerReturn} />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  </FormControl>
);
