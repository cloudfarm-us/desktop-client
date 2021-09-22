import type { IconButtonProps }           from '@chakra-ui/react';
import { Icon, IconButton, useColorMode } from '@chakra-ui/react';
import { FaMoon, FaSun }                  from 'react-icons/fa';

export const ColorModeButton = (
  properties: Partial<IconButtonProps>,
): JSX.Element => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      icon={colorMode === 'dark' ? <Icon as={FaSun} /> : <Icon as={FaMoon} />}
      aria-label="toggle color mode"
      onClick={toggleColorMode}
      {...properties}
      size="xs"
      variant="outline"
      colorScheme="teal"
    />
  );
};
