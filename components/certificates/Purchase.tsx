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
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Progress,
  SimpleGrid,
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
        <CardBody w={1200}>
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
                  colorScheme='purple'
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
