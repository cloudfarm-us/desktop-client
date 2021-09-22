import type { GlobalStyleProps } from '@chakra-ui/theme-tools';

const styles = {
  global : (props: GlobalStyleProps) => ({
    '#app' : {
      width      : '100vw',
      height     : '100vh',
      fontSize   : 'sm',
      color      : props.colorMode === 'dark' ? 'white' : 'gray.600',
      lineHeight : 'tall',
    },
    a : {
      color : props.colorMode === 'dark' ? 'teal.300' : 'teal.500',
    },
  }),
};

export default styles;
