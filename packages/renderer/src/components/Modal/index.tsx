import { Modal as CModal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay } from '@chakra-ui/react';

import { ModalFooter } from './ModalFooter';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: JSX.Element | JSX.Element[];
};

export const Modal = (props: ModalProps) => {
  return (
    <CModal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader mb='0' pb='0'>
          {props.title}
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody py='0' my='0'>
          {props.children}
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </CModal>
  );
};
