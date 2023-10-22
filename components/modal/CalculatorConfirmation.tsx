import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { AvailableNetworks } from "../../models/networks-model";

interface InitialFocusProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  amount: string;
  loading: boolean;
  finished: boolean;
  tx: string;
  action: string;
}
export function CalculatorConfirmation({
  isOpen,
  onClose,
  amount,
  onConfirm,
  loading,
  finished,
  tx,
  action,
}: InitialFocusProps) {
  const close = () => {
    if (loading) return;
    if (finished) window.location.reload();
    else {
      onClose();
    }
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={close}>
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent>
          <ModalHeader>{`${action} $CARBON`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {finished ? (
              <>
                <FormControl>
                  <FormLabel>Your Transaction is in progress</FormLabel>
                  <FormLabel>Please check it with this TX:</FormLabel>
                  <Input
                    placeholder="tx"
                    isReadOnly
                    value={`${tx}`}
                    textAlign={"center"}
                  />
                </FormControl>
              </>
            ) : (
              <>
                <FormControl>
                  <FormLabel>{`Are you sure about ${action}`}</FormLabel>
                  <Input
                    placeholder="First name"
                    isReadOnly
                    value={`${amount} $CARBON`}
                    textAlign={"center"}
                  />
                </FormControl>
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={finished ? close : onConfirm}
              isLoading={loading}
            >
              {finished ? "Done" : "I am sure, Confirm"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
