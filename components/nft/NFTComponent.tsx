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

const NFTComponent = () => {
  return (
    <Flex
      align="center"
      justify="center"
      display={{ base: "none", md: "flex" }}
    >
      <Box
        bg="rgba(0, 0, 0, 0.6)"
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
  );
};

export default NFTComponent;
