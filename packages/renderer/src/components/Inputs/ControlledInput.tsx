import type { FormControlProps, InputProps }                                     from '@chakra-ui/react';
import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Text } from '@chakra-ui/react';
import type { UseFormRegisterReturn }                                            from 'react-hook-form';

const defaultProps = {
  message    : '',
  saveSpace  : false,
  helperText : '',
};

type ControlledInputProperties = {
  message?: string;
  registerReturn: UseFormRegisterReturn;
  saveSpace?: boolean;
  controlProps: FormControlProps;
  inputProps: InputProps;
  label: string;
  helperText?: string;
} & typeof defaultProps;

export const ControlledInput = ({
  message,
  registerReturn,
  saveSpace,
  controlProps,
  inputProps,
  label,
  helperText,
}: ControlledInputProperties): JSX.Element => (
  <FormControl isInvalid={Boolean(message)} errortext={message} {...controlProps}>
    <FormLabel>{label}</FormLabel>
    <Input {...registerReturn} {...inputProps} />
    <FormHelperText>{helperText}</FormHelperText>
    <FormErrorMessage>{message}</FormErrorMessage>
    {!message && !saveSpace ? (
      <Text mt='2' fontSize='sm'>
        {'\u00A0'}
      </Text>
    ) : (
      ''
    )}
  </FormControl>
);

ControlledInput.defaultProps = defaultProps;
