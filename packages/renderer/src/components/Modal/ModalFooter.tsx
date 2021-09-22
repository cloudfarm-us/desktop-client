import { ModalFooter as CModalFooter }                  from '@chakra-ui/react';
import { DividerWithText, SignoutButton, UnlinkButton } from 'components';

export const ModalFooter = () => {
  return (
    <>
      <DividerWithText px={5} my={3}>
        Danger Zone
      </DividerWithText>
      <CModalFooter>
        <SignoutButton />
        <UnlinkButton />
      </CModalFooter>
    </>
  );
};
