import type { FlexProps }                              from '@chakra-ui/react';
import { Box, Divider, Flex, Text, useColorModeValue } from '@chakra-ui/react';

export const DividerWithText = (properties: FlexProps): JSX.Element => {
  const { children, ...flexProperties } = properties;
  return (
    <Flex align='center' color='gray.300' {...flexProperties}>
      <Box flex='1'>
        <Divider borderColor='currentcolor' />
      </Box>
      <Text as='span' px='3' color={useColorModeValue('gray.600', 'gray.400')} fontWeight='medium'>
        {children}
      </Text>
      <Box flex='1'>
        <Divider borderColor='currentcolor' />
      </Box>
    </Flex>
  );
};
