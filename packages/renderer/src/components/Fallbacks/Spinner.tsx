import { Container, Text, useColorModeValue, VStack } from '@chakra-ui/react';

import './Spinner.css';

export const Spinner = () => {
  const color = useColorModeValue('grey', 'white');

  return (
    <VStack bg='transparent' justify='center' align='center' mt='10vh'>
      <div className='flex h-screen'>
        <div className='sk-grid sk-center'>
          <div
            className='sk-grid-cube'
            style={{
              backgroundColor : `${color}`,
            }}
          />
          <div
            className='sk-grid-cube'
            style={{
              backgroundColor : `${color}`,
            }}
          />
          <div
            className='sk-grid-cube'
            style={{
              backgroundColor : `${color}`,
            }}
          />
          <div
            className='sk-grid-cube'
            style={{
              backgroundColor : `${color}`,
            }}
          />
          <div
            className='sk-grid-cube'
            style={{
              backgroundColor : `${color}`,
            }}
          />
          <div
            className='sk-grid-cube'
            style={{
              backgroundColor : `${color}`,
            }}
          />
          <div
            className='sk-grid-cube'
            style={{
              backgroundColor : `${color}`,
            }}
          />
          <div
            className='sk-grid-cube'
            style={{
              backgroundColor : `${color}`,
            }}
          />
          <div
            className='sk-grid-cube'
            style={{
              backgroundColor : `${color}`,
            }}
          />
        </div>
      </div>
      <Container centerContent maxW='xs'>
        <Text as='i' textAlign='center' mt='10'>
          Communicating with our servers. This will just take a second...
        </Text>
      </Container>
    </VStack>
  );
};
