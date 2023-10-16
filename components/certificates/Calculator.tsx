import React, { ChangeEvent, useRef, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Icon,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import { FaPlane, FaUtensils } from "react-icons/fa";
import { ChevronDownIcon } from "@chakra-ui/icons";
import TravelCalculator from "../calculator/TravelCalculator";
import GroceriesCalculator from "../calculator/GroceriesCalculator";
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
const Calculate = () => {
  const stepNumber = 1;
  const [progress, setProgress] = useState(100 / stepNumber);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedButton, setSelectedButton] = useState<string>("Purchase");
  const [purchaseAmount, setPurchaseAmount] = useState<string>("1");
  const [selectedCalculator, setSelectedCalculator] = useState<string | null>(
    null
  );

  const showNextForm = () => {
    setStep(step + 1);
    if (step === stepNumber + 1) {
      setProgress(100);
    } else {
      setProgress(progress + 100 / stepNumber + 1);
    }
  };
  const onPurchaseAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    console.log(id, value);

    if (isNaN(Number(value))) setPurchaseAmount("0");

    if (Number(value) > 4) setPurchaseAmount("4");
    else if (Number(value) < 0) setPurchaseAmount("0");
    else setPurchaseAmount(value);
  };
  return (
    <Box
      bg={useColorModeValue("brand.newBlack", "rgba(4,56,80, 0.5)")}
      px={4}
      width="100%"
      maxWidth="100%"
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
        <CardBody
          w={{ base: "100%", md: 1200 }}
          alignItems="center"
          justifyContent="center"
        >
          <Flex
            direction="row"
            justifyContent="center"
            alignItems="center"
            gap={4}
          >
            <Flex direction="column" alignItems="center">
              <Button
                borderRadius="full"
                width="80px"
                height="80px"
                onClick={() => {
                  setSelectedCalculator("travel");
                }}
                mb={2}
                bg={selectedCalculator === "travel" ? "blue.500" : "gray.300"}
              >
                <Icon as={FaPlane} fontSize="2xl" />
              </Button>
              <Text>Travel</Text>
            </Flex>

            <Flex direction="column" alignItems="center">
              <Button
                borderRadius="full"
                width="80px"
                height="80px"
                onClick={() => {
                  setSelectedCalculator("groceries");
                }}
                mb={2}
                bg={
                  selectedCalculator === "groceries" ? "green.500" : "gray.300"
                }
              >
                <Icon as={FaUtensils} fontSize="2xl" />
              </Button>
              <Text>Groceries</Text>
            </Flex>
          </Flex>
          {selectedCalculator === "travel" && (
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
              <TravelCalculator />
            </Box>
          )}
          {selectedCalculator === "groceries" && (
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
              <GroceriesCalculator />
            </Box>
          )}
        </CardBody>
      </Card>
    </Box>
  );
};

export default Calculate;
