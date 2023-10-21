import React, { ChangeEvent, useEffect, useState } from "react";
import { Contract, ethers } from "ethers";
import { useAccount } from "wagmi";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import {
  polygonMumbai,
  arbitrumGoerli,
  optimismGoerli,
  sepolia,
} from "wagmi/chains";
import { ChevronDownIcon } from "@chakra-ui/icons";

import { Carbon } from "../../@types/typechain-types";
import { AvailableNetworks } from "../../models/networks-model";
import { ConfirmationModal } from "../modal/ConfirmationModal";
import CarbonContractJson from "../../assets/deployments/mumbai/Carbon.json";
import { getSigner } from "../../helpers/getSigner";
import {storeMetadata} from "../../functions/storeData";
export type SendInfo = {
  address: string;
  networkIndex: number;
};
const Purchase = () => {
  const toast = useToast();
  const { address } = useAccount();
  const [verifyModal, setVerifyModal] = useState<boolean>(false);
  const [loadingVerify, setLoadingVerify] = useState<boolean>(false);
  const [verifyFinished, setVerifyFinished] = useState<boolean>(false);
  const [isSend, setIsSend] = useState<boolean>(false);
  const [selectedNetworkConfirm, setSelectedNetworkConfirm] =
    useState<number>(0);
  const [selectedNetworkOffset, setSelectedNetworkOffset] = useState<number>(0);
  const [selectedNetworkPurchase, setSelectedNetworkPurchase] =
    useState<number>(0);
  const [selectedButton, setSelectedButton] = useState<string>("Purchase");
  const [purchaseAmount, setPurchaseAmount] = useState<string>("1");
  const [offsetAmount, setOffsetAmount] = useState<string>("1");
  const [sendAmount, setSendAmount] = useState<string>("1");
  const [verificationAmount, setVerificationAmount] = useState<string>("");
  const [action, setAction] = useState<string>("");
  const [currentCarbonBalance, setCurrentCarbonBalance] =
    useState<string>(". . . . . . . .");
  const [verifyTx, setVerifyTx] = useState<string>("");
  const [sendInfo, setSendInfo] = useState<SendInfo>({
    address: "0x",
    networkIndex: 0,
  });
  useEffect(() => {
    readCarbonBalance();
  }, []);
  const readCarbonBalance = async () => {
    try {
      const web3Signer = await getSigner();
      const contractAddress = getAddress(selectedNetworkPurchase);
      if (!contractAddress || contractAddress === undefined) {
        toast({
          title: "Error reading $CARBON balance contract.",
          status: "warning",
          duration: 5000,
          isClosable: true,
        });
        return;
      }
      const contract = new Contract(
        contractAddress,
        CarbonContractJson.abi,
        web3Signer
      ) as Carbon;
      const purchaseCarbonCreditsTX = await contract.balanceOf(address!, {
        gasLimit: 2500000,
      });
      const weiValue = ethers.BigNumber.from(purchaseCarbonCreditsTX._hex);
      const etherValue = ethers.utils.formatEther(weiValue);
      setCurrentCarbonBalance(etherValue);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error reading $CARBON balance.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  const onPurchaseAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (isNaN(Number(value))) setPurchaseAmount("0");

    if (Number(value) > 4) setPurchaseAmount("4");
    else if (Number(value) < 0) setPurchaseAmount("0");
    else setPurchaseAmount(value);
  };
  const onOffsetAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (isNaN(Number(value))) setOffsetAmount("0");

    if (Number(value) > 4) setOffsetAmount("4");
    else if (Number(value) < 0) setOffsetAmount("0");
    else setOffsetAmount(value);
  };
  const onSendAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (isNaN(Number(value))) setSendAmount("0");

    if (Number(value) > 4) setSendAmount("4");
    else if (Number(value) < 0) setSendAmount("0");
    else setSendAmount(value);
  };
  const onSetSendAddress = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    console.log(id, value);
    setSendInfo({ ...sendInfo, address: value });
  };
  const onSetSendNetwork = (index: number) => {
    setSendInfo({ ...sendInfo, networkIndex: index });
  };
  const getAddress = (newworkIndex: number) => {
    switch (newworkIndex) {
      case 0:
        return process.env.NEXT_PUBLIC_POLYGON_MUMBAI_CARBON_CONTRACT_ADDRESS;
      case 1:
        return process.env.NEXT_PUBLIC_SEPOLIA_CARBON_CONTRACT_ADDRESS;
      case 2:
        return process.env.NEXT_PUBLIC_OPTIMISM_GOERLI_CARBON_CONTRACT_ADDRESS;
      case 3:
        return process.env.NEXT_PUBLIC_ARBITRUM_GOERLI_CARBON_CONTRACT_ADDRESS;
      default:
        return process.env.NEXT_PUBLIC_POLYGON_MUMBAI_CARBON_CONTRACT_ADDRESS;
    }
  };
  const getChainID = (newworkIndex: number) => {
    switch (newworkIndex) {
      case 0:
        return polygonMumbai.id;
      case 1:
        return sepolia.id;
      case 2:
        return optimismGoerli.id;
      case 3:
        return arbitrumGoerli.id;
      default:
        return polygonMumbai.id;
    }
  };
  const onClickPurchase = async () => {
    try {
      await setCorrectChain(selectedNetworkPurchase);
      setVerificationAmount(purchaseAmount);
      setSelectedNetworkConfirm(selectedNetworkPurchase);
      setAction("PURCHASE");
      setIsSend(false);
      setVerifyModal(true);
    } catch (error) {
      toast({
        title: "There was an error purchasing, please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  const onClickOffset = async () => {
    try {
      await setCorrectChain(selectedNetworkOffset);
      setVerificationAmount(offsetAmount);
      setSelectedNetworkConfirm(selectedNetworkOffset);
      setAction("OFFSET");
      setIsSend(false);
      setVerifyModal(true);
    } catch (error) {
      toast({
        title: "There was an error doing offset, please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  const onClickSend = async () => {
    try {
      await setCorrectChain(sendInfo.networkIndex);
      setVerificationAmount(sendAmount);
      setSelectedNetworkConfirm(sendInfo.networkIndex);
      setAction("SEND");
      setIsSend(true);
      setVerifyModal(true);
    } catch (error) {
      toast({
        title: "There was an error sending the token, please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  const setCorrectChain = async (network: number) => {
    const ethereum = (window as any).ethereum;
    const chainId = getChainID(network);
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: `0x${chainId.toString(16)}` }],
    });
  };
  const onConfirm = () => {
    if (action === "PURCHASE") {
      onPurchase();
    } else if (action === "SEND") {
      onSend();
    } else if (action === "OFFSET") {
      onOffset();
    }
  };
  const onPurchase = async () => {
    try {
      setLoadingVerify(true);
      const web3Signer = await getSigner();
      const contractAddress = getAddress(selectedNetworkPurchase);
      if (!contractAddress || contractAddress === undefined) {
        toast({
          title:
            "Something is wrong with this network setting (no contract address).",
          status: "warning",
          duration: 5000,
          isClosable: true,
        });
        return;
      }
      const contract = new Contract(
        contractAddress,
        CarbonContractJson.abi,
        web3Signer
      ) as Carbon;
      let purchaseCarbonCreditsTX;
      if (selectedNetworkPurchase === 0) {
        purchaseCarbonCreditsTX = await contract.buyCarbonCredits(
          address!,
          ethers.utils.parseEther(purchaseAmount),
          { gasLimit: 2500000 }
        );
      } else {
        //TODO - add crosschain purchase
        // purchaseCarbonCreditsTX = await contract.buyCarbonCreditsCrosschain(
        //   address!,
        //   ethers.utils.parseEther(purchaseAmount),
        //   { gasLimit: 2500000 }
        // );
        purchaseCarbonCreditsTX = await contract.buyCarbonCredits(
          address!,
          ethers.utils.parseEther(purchaseAmount),
          { gasLimit: 2500000 }
        );
      }
      setVerifyTx(purchaseCarbonCreditsTX.hash);
      setLoadingVerify(false);
      setVerifyFinished(true);
    } catch (error) {
      console.log(error);
      toast({
        title: "There was an error trying to purchase.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setLoadingVerify(false);
    }
  };
  const onOffset = async () => {
    try {
      setLoadingVerify(true);
      const web3Signer = await getSigner();
      const contractAddress = getAddress(selectedNetworkOffset);
      if (!contractAddress || contractAddress === undefined) {
        toast({
          title:
            "Something is wrong with this network setting (no contract address).",
          status: "warning",
          duration: 5000,
          isClosable: true,
        });
        return;
      }
      const contract = new Contract(
        contractAddress,
        CarbonContractJson.abi,
        web3Signer
      ) as Carbon;
      const uriObject = {
        requestId: 'requestId',
        flag: 'generic',
        args: 'args',
        values: [(offsetAmount).toString()],
        buyer: 'buyer',
        IPFSURL: 'IPFSURL'
      }
      const CID = await storeMetadata(uriObject)
      const tokenURI = `https://w3s.link/ipfs/${CID}`
      let offsetCarbonCreditsTX;
      if (selectedNetworkOffset === 0) {
        offsetCarbonCreditsTX = await contract.retireCarbonCredits(
          address!,
          ethers.utils.parseEther(offsetAmount),
          tokenURI,
          { gasLimit: 2500000 }
        );
      } else {
        //TODO - add crosschain retireCarbonCredits
        // purchaseCarbonCreditsTX = await contract.retireCarbonCreditsCrosschain(
        //   address!,
        // ethers.utils.parseEther(offsetAmount),
        // 'TOKEN URI', //TODO - add token uri
        //   { gasLimit: 2500000 }
        // );
        offsetCarbonCreditsTX = await contract.retireCarbonCredits(
          address!,
          ethers.utils.parseEther(offsetAmount),
          "TOKEN URI", //TODO - add token uri
          { gasLimit: 2500000 }
        );
      }
      setVerifyTx(offsetCarbonCreditsTX.hash);
      setLoadingVerify(false);
      setVerifyFinished(true);
    } catch (error) {
      console.log(error);
      toast({
        title: "There was an error trying to offset.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setLoadingVerify(false);
    }
  };
  const onSend = async () => {
    try {
      setLoadingVerify(true);
      const web3Signer = await getSigner();
      const contractAddress = getAddress(selectedNetworkOffset);
      if (!contractAddress || contractAddress === undefined) {
        toast({
          title:
            "Something is wrong with this network setting (no contract address).",
          status: "warning",
          duration: 5000,
          isClosable: true,
        });
        return;
      }
      const contract = new Contract(
        contractAddress,
        CarbonContractJson.abi,
        web3Signer
      ) as Carbon;
      let sendCarbonCreditsTX;
      if (sendInfo.networkIndex === 0) {
        sendCarbonCreditsTX = await contract.transfer(
          sendInfo.address,
          ethers.utils.parseEther(sendAmount),
          { gasLimit: 2500000 }
        );
      } else {
        //TODO - add crosschain transfer
        // sendCarbonCreditsTX = await contract.transferCrosschain(
        //   sendInfo.address,
        //   ethers.utils.parseEther(sendAmount),
        //   { gasLimit: 2500000 }
        // );
        sendCarbonCreditsTX = await contract.transfer(
          sendInfo.address,
          ethers.utils.parseEther(sendAmount),
          { gasLimit: 2500000 }
        );
      }
      setVerifyTx(sendCarbonCreditsTX.hash);
      setLoadingVerify(false);
      setVerifyFinished(true);
    } catch (error) {
      console.log(error);
      toast({
        title: "There was an error trying to send token.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setLoadingVerify(false);
    }
  };
  const closeModal = () => {
    setLoadingVerify(false);
    setVerifyFinished(false);
    setVerifyTx("");
    setVerifyModal(false);
  };
  return (
    <Box
      bg={useColorModeValue("brand.newBlack", "rgba(4,56,80, 0.5)")}
      px={4}
      width="96%"
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
            <Heading size="lg">Purchase, Share Or Offset Tokens</Heading>
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
            {selectedButton === "Purchase" && (
              <>
                <Box
                  padding="20px"
                  backgroundColor="rgba(27, 27, 27, 0.8)"
                  borderRadius="10px"
                  marginBottom="20px"
                >
                  <Heading size="md" mb={4}>
                    Purchase new $CARBON tokens
                  </Heading>
                  <Box marginBottom="20px">
                    <Flex justifyContent="space-between" alignItems="center">
                      <Text marginBottom="5px">Current $CARBON balance</Text>
                      <Input
                        variant="filled"
                        width="100px"
                        value={currentCarbonBalance}
                        isReadOnly
                        color="white"
                        textAlign={"center"}
                      />
                    </Flex>
                  </Box>
                  <Box marginBottom="10px">
                    <Text marginBottom="5px">Amount</Text>
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="start"
                    >
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
                              {AvailableNetworks[selectedNetworkPurchase]}
                            </MenuButton>
                            <MenuList>
                              {AvailableNetworks.map((network, index) => (
                                <MenuItem
                                  key={network}
                                  onClick={() =>
                                    setSelectedNetworkPurchase(index)
                                  }
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
                      <Button
                        colorScheme="green"
                        width="40%"
                        onClick={onClickPurchase}
                      >
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
                        value={currentCarbonBalance}
                        isReadOnly
                        color="white"
                        textAlign={"center"}
                      />
                    </Flex>
                  </Box>
                  <Box marginBottom="10px">
                    <Text marginBottom="5px">Amount</Text>
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="start"
                    >
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        width="100%"
                      >
                        <Input
                          variant="filled"
                          width="100px"
                          value={offsetAmount}
                          type="number"
                          backgroundColor="blue.900"
                          color="white"
                          onChange={onOffsetAmountChange}
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
                              {AvailableNetworks[selectedNetworkOffset]}
                            </MenuButton>
                            <MenuList>
                              {AvailableNetworks.map((network, index) => (
                                <MenuItem
                                  key={network}
                                  onClick={() =>
                                    setSelectedNetworkOffset(index)
                                  }
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
                      <Button
                        colorScheme="blue"
                        width="40%"
                        onClick={onClickOffset}
                      >
                        Offset
                      </Button>
                    </Flex>
                  </Box>
                </Box>
              </>
            )}
            {selectedButton === "Send" && (
              <Box
                padding="20px"
                backgroundColor="rgba(27, 27, 27, 0.8)"
                borderRadius="10px"
                marginBottom="20px"
              >
                <Heading size="md" mb={4}>
                  Send $CARBON tokens
                </Heading>
                <Box marginBottom="20px">
                  <Flex justifyContent="space-between" alignItems="center">
                    <Text marginBottom="5px">Current $CARBON available</Text>
                    <Input
                      variant="filled"
                      width="100px"
                      value={currentCarbonBalance}
                      isReadOnly
                      color="white"
                      textAlign={"center"}
                    />
                  </Flex>
                </Box>
                <Box marginBottom="10px">
                  <Text marginBottom="5px">Amount</Text>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="start"
                    mb={15}
                  >
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      width="100%"
                    >
                      <Input
                        variant="filled"
                        width="100px"
                        value={sendAmount}
                        type="number"
                        backgroundColor="facebook.400"
                        color="white"
                        onChange={onSendAmountChange}
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
                            {AvailableNetworks[sendInfo.networkIndex]}
                          </MenuButton>
                          <MenuList>
                            {AvailableNetworks.map((network, index) => (
                              <MenuItem
                                key={network}
                                onClick={() => onSetSendNetwork(index)}
                              >
                                {network}
                              </MenuItem>
                            ))}
                          </MenuList>
                        </Menu>
                      </Box>
                    </Box>
                  </Box>
                  <Text marginBottom="5px">To</Text>
                  <Box display="flex" flexDirection="column" alignItems="start">
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      width="100%"
                    >
                      <Input
                        variant="filled"
                        width="100%"
                        value={sendInfo.address}
                        type="string"
                        backgroundColor="facebook.400"
                        color="white"
                        onChange={onSetSendAddress}
                      />
                      <Spacer />
                    </Box>
                  </Box>
                  <Flex justifyContent="center" mt={4}>
                    <Button
                      colorScheme="facebook"
                      width="40%"
                      onClick={onClickSend}
                    >
                      Send
                    </Button>
                  </Flex>
                </Box>
              </Box>
            )}
          </Box>
        </CardBody>
      </Card>
      {verifyModal && (
        <ConfirmationModal
          isOpen={verifyModal}
          onClose={closeModal}
          onConfirm={onConfirm}
          finished={verifyFinished}
          loading={loadingVerify}
          amount={verificationAmount}
          selectedNetwork={selectedNetworkConfirm}
          action={action}
          tx={verifyTx}
          isSend={isSend}
          receiver={sendInfo.address}
        />
      )}
    </Box>
  );
};

export default Purchase;