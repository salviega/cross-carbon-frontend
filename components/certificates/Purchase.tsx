import React, { ChangeEvent, useRef, useState } from "react";
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
import TravelCalculator from "../calculator/TravelCalculator";
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
const networks: string[] = [
  "ETH (Sepolia)",
  "Polygon (Mumbai)",
  "Optimism (OP-Goerli)",
];
const Purchase = () => {
  const stepNumber = 1;
  const [progress, setProgress] = useState(100 / stepNumber);
  const form1Ref = useRef<Form1Ref>(null);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedButton, setSelectedButton] = useState<string>("Purchase");
  const [purchaseAmount, setPurchaseAmount] = useState<string>("1");
  const [selectedNetworkPurchase, setSelectedNetworkPurchase] =
    useState<number>(0);
  const [selectedNetworkOffset, setSelectedNetworkOffset] = useState<number>(0);
  const [currentCarbonAmount, setCurrentCarbonAmount] = useState<string>("0");
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
            <Heading size="lg">Purchase Tokens</Heading>
          </Flex>
        </CardHeader>
        <CardBody
          w={{ base: "100%", md: 1200 }}
          alignItems="center"
          justifyContent="center"
        >
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
            width={{ base: "100%", md: "55%", lg: "55%" }}
            bg={"rgba(0,0,0, 0.6)"}
          >
            <Flex marginBottom="20px">
              <ButtonGroup variant="outline" spacing="6">
                <Button
                  colorScheme={selectedButton === "Purchase" ? "blue" : "teal"}
                  onClick={() => setSelectedButton("Purchase")}
                >
                  Purchase / Offset
                </Button>
                <Button
                  variant="outline"
                  colorScheme={selectedButton === "Send" ? "blue" : "teal"}
                  onClick={() => setSelectedButton("Send")}
                >
                  Send
                </Button>
              </ButtonGroup>
            </Flex>
            <Box
              padding="20px"
              backgroundColor="rgba(27, 27, 27, 0.8)"
              borderRadius="10px"
              marginBottom="20px"
            >
              <Heading size="md" mb={4}>
                Purchase new $CARBON tokens
              </Heading>
              <Box marginBottom="10px">
                <Text marginBottom="5px">Amount</Text>
                <Box display="flex" flexDirection="column" alignItems="start">
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    width="100%"
                  >
                    <Input
                      variant="filled"
                      width="100px"
                      value={purchaseAmount}
                      type="number"
                      backgroundColor="teal.900"
                      color="white"
                      onChange={onPurchaseAmountChange}
                    />
                    <Spacer />{" "}
                    <Box display="flex" alignItems="center">
                      <Menu>
                        <MenuButton
                          as={Button}
                          rightIcon={<ChevronDownIcon />}
                          variant="outline"
                          colorScheme="blue"
                        >
                          {networks[selectedNetworkPurchase]}
                        </MenuButton>
                        <MenuList>
                          {networks.map((network, index) => (
                            <MenuItem
                              key={network}
                              onClick={() => setSelectedNetworkPurchase(index)}
                            >
                              {network}
                            </MenuItem>
                          ))}
                        </MenuList>
                      </Menu>
                    </Box>
                  </Box>
                  <Text fontSize="xs" color="gray.400" mt={2}>
                    Max value: 4
                  </Text>
                </Box>
                <Flex justifyContent="center" mt={4}>
                  <Button colorScheme="green" width="40%">
                    Purchase
                  </Button>
                </Flex>
              </Box>
            </Box>
            <Box
              padding="20px"
              backgroundColor="rgba(27, 27, 27, 0.8)"
              borderRadius="10px"
              marginBottom="20px"
            >
              <Heading size="md" mb={4}>
                Offset your emissions
              </Heading>
              <Box marginBottom="20px">
                <Flex justifyContent="space-between" alignItems="center">
                  <Text marginBottom="5px">Current $CARBON available</Text>
                  <Input
                    variant="filled"
                    width="100px"
                    value={currentCarbonAmount}
                    isReadOnly
                    color="white"
                  />
                </Flex>
              </Box>

              <Box marginBottom="10px">
                <Text marginBottom="5px">Amount</Text>
                <Box display="flex" flexDirection="column" alignItems="start">
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    width="100%"
                  >
                    <Input
                      variant="filled"
                      width="100px"
                      value={purchaseAmount}
                      type="number"
                      backgroundColor="blue.900"
                      color="white"
                      onChange={onPurchaseAmountChange}
                    />
                    <Spacer />
                    <Box display="flex" alignItems="center">
                      <Menu>
                        <MenuButton
                          as={Button}
                          rightIcon={<ChevronDownIcon />}
                          variant="outline"
                          colorScheme="blue"
                        >
                          {networks[selectedNetworkOffset]}
                        </MenuButton>
                        <MenuList>
                          {networks.map((network, index) => (
                            <MenuItem
                              key={network}
                              onClick={() => setSelectedNetworkPurchase(index)}
                            >
                              {network}
                            </MenuItem>
                          ))}
                        </MenuList>
                      </Menu>
                    </Box>
                  </Box>
                  <Text fontSize="xs" color="gray.400" mt={2}>
                    Max value: 4
                  </Text>
                </Box>
                <Flex justifyContent="center" mt={4}>
                  <Button colorScheme="blue" width="40%">
                    Offset
                  </Button>
                </Flex>
              </Box>
            </Box>
          </Box>
        </CardBody>
      </Card>
    </Box>
  );
};

export default Purchase;
