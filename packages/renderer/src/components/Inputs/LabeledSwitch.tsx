import type { FormControlProps, SwitchProps } from '@chakra-ui/react';
import { FormControl, FormLabel, Switch }     from '@chakra-ui/react';
import type { UseFormRegisterReturn }         from 'react-hook-form';

type ControlledInputProperties = {
  message?: string;
  registerReturn: UseFormRegisterReturn;
  controlProps: FormControlProps;
  switchProps: SwitchProps;
  label: string;
  helperText?: string;
};

export const LabeledSwitch = ({
  registerReturn,
  controlProps,
  switchProps,
  label,
}: ControlledInputProperties): JSX.Element => (
  <FormControl {...controlProps}>
    <FormLabel flex={1} fontSize='sm' my='0' htmlFor={switchProps.id}>
      {label}
    </FormLabel>
    <Switch {...registerReturn} {...switchProps} />
  </FormControl>
);
