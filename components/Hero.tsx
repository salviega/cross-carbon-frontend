import React from "react";
import {
  Stack,
  Flex,
  Button,
  Text,
  VStack,
  useBreakpointValue,
  Box,
  HStack,
  Image,
  Spacer,
} from "@chakra-ui/react";
import Link from "next/link";

export default function Hero() {
  // const testsc = async () => {
  //   try {
  //     const ethereum = (window as any).ethereum;

  //     const web3Provider: ethers.providers.Web3Provider =
  //       new ethers.providers.Web3Provider(ethereum);
  //     await web3Provider.send("eth_requestAccounts", []);
  //     const web3Signer: ethers.providers.JsonRpcSigner =
  //       web3Provider.getSigner();
	// 			console.log('before contact');

  //     const contract = new Contract(
  //       CarbonContractJson.address,
  //       CarbonContractJson.abi,
  //       web3Signer
  //     ) as Carbon;

	// 		console.log('before call function');

	// 		const test = await contract.retireCarbonCredits(
	// 			'0xaA7880DB88D8e051428b5204817e58D8327340De',
	// 			ethers.utils.parseEther('1'),
	// 			{ gasLimit: 2500000 }
	// 		) 
	// 			console.log('test is', test);
				

  //   } catch (error) {
  //     console.log("error is", error);
  //   }
  // };

  return (
    <Flex
      minH="600px"
      borderRadius="3xl"
      margin="10px auto"
      bg={"brand.newBlack"}
      backgroundImage={"/Images/hero.jpeg"}
      backgroundSize={"cover"}
      backgroundPosition={{ base: "100%", md: "left top" }}
      align="center"
      w="100%"
    >
      <Flex w="100%" flexDirection={{ base: "column", md: "row" }}>
        <VStack
          justify={"start"}
          justifyItems="start"
          align="start"
          px={useBreakpointValue({ base: 4, md: 8 })}
          w={{ base: "100%", md: "70%" }}
        >
          <Stack maxW={"2xl"} align={"flex-start"} spacing={6}>
            <Text
              color="brand.light"
              fontWeight={800}
              lineHeight={1.2}
              fontSize={useBreakpointValue({
                base: "5xl",
                md: "6xl",
                lg: "4.5rem",
              })}
            >
              MULTICHAIN CARBON CREDITS MARKETPLACE
            </Text>
            <Text textColor="white" fontWeight="medium" fontSize="lg">
              Calculate your environmental impact and offset it with carbon
              credits across different networks.
            </Text>
            <Link href="/calculator">
              <Button bg={"#65eb32"} color={"black"} _hover={{ bg: "#cdde99" }}>
                START
              </Button>
            </Link>
          </Stack>
        </VStack>
        <Flex
          align="center"
          justify="center"
          display={{ base: "none", md: "flex" }}
        >
          <Box
            bg="black"
            opacity="90%"
            px="4"
            maxH="md"
            py="6"
            width="300px"
            justifyContent="center"
            borderRadius="lg"
            border="1px"
            borderColor="whiteAlpha.200"
          >
            <Image
              objectFit="cover"
              src="/Images/nft.png"
              alt="Chakra UI"
              borderRadius="lg"
            />
            <VStack align="start">
              <HStack>
                <Text textColor="white" fontWeight="bold" fontSize="xl">
                  My Carbon Offset
                </Text>
                <Spacer />
                <Text textColor="white" fontSize="md" fontWeight="semibold">
                  2,1 T CO2
                </Text>
              </HStack>
              <Text textColor="gray.100" fontSize="sm">
                For a greener tomorrow! This NFT represents a tokenized carbon
                offset and stands as your pledge towards the environment.{" "}
              </Text>
            </VStack>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
}
