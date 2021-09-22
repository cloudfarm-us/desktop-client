import { chakra, Container, HTMLChakraProps } from '@chakra-ui/react';
import { HTMLMotionProps, motion }            from 'framer-motion';
import { FC }                                 from 'react';

import logo                                   from './react.svg';

type Merge<P, T> = Omit<P, keyof T> & T;
type MotionLogoProps = Merge<HTMLChakraProps<'img'>, HTMLMotionProps<'div'>>;
const MotionLogo: FC<MotionLogoProps> = motion(chakra.img);

export const SpinningLogo = () => {
  return (
    <Container d="flex" alignItems="center" justifyContent="center">
      <MotionLogo
        as="img"
        src={logo}
        alt="logo"
        animate={{
          rotate : [0, 360],
        }}
        transition={{
          duration   : 20,
          ease       : 'linear',
          repeat     : Infinity,
          repeatType : 'loop',
        }}
      />
    </Container>
  );
};
