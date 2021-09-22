import type { FormControlProps, InputProps } from '@chakra-ui/react';
import { Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
  useColorModeValue,
  useDisclosure,
  useMergeRefs } from '@chakra-ui/react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { HiEye, HiEyeOff }            from 'react-icons/hi';
import { forwardRef, useRef }         from 'react';

const defaultProps = {
  saveSpace : false,
  message   : '',
};

type ControlledInputProperties = {
  message?: string;
  registerReturn: UseFormRegisterReturn;
  saveSpace?: boolean;
  controlProps: FormControlProps;
  inputProps: InputProps;
  label: string;
  forgotPasswordNav: () => void;
} & typeof defaultProps;

export const PasswordField = forwardRef<HTMLInputElement, ControlledInputProperties>(
  (
    { message, registerReturn, saveSpace, controlProps, inputProps, forgotPasswordNav }: ControlledInputProperties,
    reference,
  ) => {
    const { isOpen, onToggle } = useDisclosure();
    const inputReference = useRef<HTMLInputElement>(null);
    const linkColor = useColorModeValue('blue.500', 'blue.200');
    const linkHover = useColorModeValue('blue.600', 'blue.300');

    const temporaryReference = useMergeRefs(inputReference, reference);
    const { ref: rref, ...rest } = registerReturn;
    const mergeReference = useMergeRefs(rref, temporaryReference);

    const onClickReveal = () => {
      onToggle();
      const input = inputReference.current;
      if (input) {
        input.focus({
          preventScroll : true,
        });
        const length = input.value.length * 2;
        requestAnimationFrame(() => {
          input.setSelectionRange(length, length);
        });
      }
    };

    return (
      <FormControl id='password' isInvalid={Boolean(message)} errortext={message} {...controlProps}>
        <Flex justify='space-between'>
          <FormLabel>Password</FormLabel>

          <Link
            as='a'
            color={linkColor}
            fontWeight='semibold'
            fontSize='sm'
            _hover={{
              color : linkHover,
            }}
            onClick={forgotPasswordNav}
          >
            Forgot Password?
          </Link>
        </Flex>
        <InputGroup>
          <Input ref={mergeReference} type={isOpen ? 'text' : 'password'} {...rest} {...inputProps} />
          <InputRightElement>
            <IconButton
              bg='transparent !important'
              variant='ghost'
              aria-label={isOpen ? 'Mask password' : 'Reveal password'}
              icon={isOpen ? <HiEyeOff /> : <HiEye />}
              borderBottomRightRadius='md'
              borderTopRightRadius='md'
              onClick={onClickReveal}
            />
          </InputRightElement>
        </InputGroup>
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
  },
);
PasswordField.defaultProps = defaultProps;
PasswordField.displayName = 'PasswordField';
