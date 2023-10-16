import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Progress,
  Select,
  SimpleGrid,
  Spacer,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import Form1 from "../calculator/Form1";
export interface Form1Input {
  eventName: string;
  eventDescription: string;
  duration: string;
  country: string;
  participants: string;
  employees: string;
  heatedArea: string;
  airConditionedArea: string;
}
export interface Form1Ref {
  validateAndSubmit: (callback: () => void) => void;
}
const Purchase = () => {
  const stepNumber = 1;
  const [progress, setProgress] = useState(100 / stepNumber);
  const form1Ref = useRef<Form1Ref>(null);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedButton, setSelectedButton] = useState<string | null>(null);

  const onSetInfoForm1 = (info: Form1Input) => {
    console.log(info);
  };
  const onNext = () => {
    if (step === 1 && form1Ref.current) {
      form1Ref.current.validateAndSubmit(() => {
        showNextForm();
      });
    }
  };
  const showNextForm = () => {
    setStep(step + 1);
    if (step === stepNumber + 1) {
      setProgress(100);
    } else {
      setProgress(progress + 100 / stepNumber + 1);
    }
  };
  return (
    <Box
      bg={useColorModeValue("brand.newBlack", "rgba(4,56,80, 0.5)")}
      px={4}
      width="90vw"
      maxWidth={{ base: "100%", md: "100%", lg: "96%" }}
      margin="15px auto"
      borderRadius="2xl"
      backgroundImage={
        "linear-gradient(rgba(4,56,80, 0.6), rgba(4,56,80, 0.8)), url(/Images/PanelBG.jpeg)"
      }
      backgroundSize={"cover"}
      backgroundPosition={{ base: "100%", md: "left top" }}
      mb={"20"}
    >
      <Card bg={"transparent"} align="center">
        <CardHeader>
          <Flex alignItems="center" justifyContent="space-between" width="100%">
            <Heading size="lg">Calculate & Offset</Heading>
          </Flex>
        </CardHeader>
        <CardBody w={1200} alignItems="center" justifyContent="center">
          <Box
            padding="20px"
            backgroundColor="black"
            color="white"
            borderRadius="10px"
            borderWidth="2px"
            rounded="lg"
            p={6}
            m="40px auto"
            as="form"
            width={{ base: "80%", md: "50%", lg: "50%" }}
            bg={"rgba(0,0,0, 0.6)"}
          >
            <Flex marginBottom="20px">
              <ButtonGroup variant="outline" spacing="6">
                <Button
                  colorScheme={selectedButton === "Offset" ? "blue" : "teal"}
                  onClick={() => setSelectedButton("Offset")}
                >
                  Offset
                </Button>
                <Button
                  colorScheme={selectedButton === "Send" ? "blue" : "teal"}
                  onClick={() => setSelectedButton("Send")}
                >
                  Send
                </Button>
              </ButtonGroup>
              <Spacer />
              <Button
                colorScheme={selectedButton === "Purchase" ? "blue" : "teal"}
                onClick={() => setSelectedButton("Purchase")}
              >
                Purchase
              </Button>
            </Flex>

            <Box
              padding="20px"
              backgroundColor="gray.700"
              borderRadius="10px"
              marginBottom="20px"
            >
              <Box marginBottom="10px">
                <Text marginBottom="5px">You pay</Text>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Input
                    variant="filled"
                    width="60px"
                    value="5"
                    type="number"
                    backgroundColor="gray.600"
                    color="white"
                  />
                  <Box display="flex" alignItems="center">
                    <Text color="white" marginRight="10px">
                      $7,720.95
                    </Text>
                    <Menu>
                      <MenuButton
                        as={Button}
                        rightIcon={<ChevronDownIcon />}
                        variant="outline"
                        colorScheme="blue"
                      >
                        ETH
                      </MenuButton>
                      <MenuList>
                        {/* Aquí puedes agregar las opciones de tokens */}
                        <MenuItem>ETH</MenuItem>
                        <MenuItem>BTC</MenuItem>
                        {/* ... */}
                      </MenuList>
                    </Menu>
                  </Box>
                </Box>
              </Box>

              <Box marginBottom="10px">
                <Text marginBottom="5px">You receive</Text>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Text color="white">0</Text>
                  <Select
                    placeholder="Select token"
                    variant="outline"
                    size="lg"
                    bgColor="gray.600"
                    color="white"
                  >
                    {/* Aquí puedes agregar las opciones de tokens */}
                  </Select>
                </Box>
              </Box>
            </Box>

            <Button colorScheme="purple" width="100%">
              Connect wallet
            </Button>
          </Box>
          <Box
            borderWidth="2px"
            borderColor="teal.300"
            rounded="lg"
            p={6}
            m="40px auto"
            as="form"
            width={{ base: "100%", md: "100%", lg: "96%" }}
            bg={"rgba(0,0,0, 0.6)"}
          >
            <Progress
              hasStripe
              value={progress}
              mb="5%"
              isAnimated
              borderRadius="lg"
            ></Progress>
            <Form1 ref={form1Ref} onValidationComplete={onSetInfoForm1} />
            <ButtonGroup mt="5%" w="100%" justifyContent="flex-end">
              <Button
                colorScheme="purple"
                variant="outline"
                isDisabled={step === 1}
                onClick={() => {
                  setStep(step - 1);
                  setProgress(progress - 100 / stepNumber);
                }}
                isLoading={loading}
                mr="5%"
                w="7rem"
              >
                Back
              </Button>
              {step !== stepNumber ? (
                <Button
                  w="7rem"
                  isDisabled={step === stepNumber}
                  onClick={onNext}
                  variant="primary"
                  isLoading={loading}
                >
                  Next
                </Button>
              ) : null}
              {step === stepNumber ? (
                <Button
                  colorScheme="teal"
                  variant="outline"
                  onClick={onNext}
                  isLoading={loading}
                >
                  Calculate
                </Button>
              ) : null}
            </ButtonGroup>
          </Box>
        </CardBody>
      </Card>
    </Box>
  );
};

export default Purchase;
