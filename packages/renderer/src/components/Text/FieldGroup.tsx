import { Box,
  BoxProps,
  Text,
  useColorModeValue as mode } from '@chakra-ui/react';

interface FieldGroupProperties extends BoxProps {
  title?: string;
  description: string;
}

export const FieldGroup = (properties: FieldGroupProperties) => {
  const { title, description, ...boxProperties } = properties;
  return (
    <Box>
      {title && <Text fontWeight='semibold'>{title}</Text>}
      {description && (
        <Text color={mode('gray.600', 'gray.400')} fontSize='sm'>
          {description}
        </Text>
      )}
      <Box pt='5' {...boxProperties} />
    </Box>
  );
};
