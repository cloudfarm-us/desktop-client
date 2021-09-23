import { Text, Box } from '@chakra-ui/react';
import { version }   from 'package.json';

const VersionBanner = () => {
  const colorScheme = 'teal';

  return (
    <Box
      zIndex="100"
      position="fixed"
      top="0"
      insetStart="0"
      insetEnd="0"
      h="2px"
      bg={`${colorScheme}.400`}
    >
      <Text
        position="fixed"
        top="0"
        insetEnd="4"
        bg={`${colorScheme}.400`}
        color={`${colorScheme}.900`}
        fontSize="0.6rem"
        fontWeight="bold"
        px="1"
        borderBottomStartRadius="sm"
        borderBottomEndRadius="sm"
        textTransform="uppercase"
      >
        Version: {version}
      </Text>
    </Box>
  );
};

export { VersionBanner };
