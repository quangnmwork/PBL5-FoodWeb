import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  UseDisclosureProps
} from '@chakra-ui/react';
import React from 'react';

interface ModalCustomProps extends UseDisclosureProps {
  body?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

const ModalCustom = (props: ModalCustomProps) => {
  return (
    <>
      <Modal onClose={props.onClose!} isOpen={props.isOpen!} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{props.header}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{props.body}</ModalBody>
          <ModalFooter>{props.footer}</ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalCustom;
