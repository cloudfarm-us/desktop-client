import type { BoxProps }          from '@chakra-ui/react';
import { Box, useColorModeValue } from '@chakra-ui/react';

export const Card = (properties: BoxProps): JSX.Element => (
  <Box
    bg={useColorModeValue('gray.100', 'gray.700')}
    py='8'
    px={{
      base : '4', md : '10',
    }}
    shadow='base'
    rounded={{
      sm : 'lg',
    }}
    {...properties}
  />
);
