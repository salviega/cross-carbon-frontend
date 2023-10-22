import React, { useEffect, useState } from "react";
import {
  Flex,
  Text,
  VStack,
  Box,
  HStack,
  Image,
  Spacer,
} from "@chakra-ui/react";
interface NFTProps {
  title: string;
  value: string;
  description: string;
  image: string;
}
const NFTComponent = (nft : any) => {
  const [nftInfo, setNftInfo] = useState<NFTProps | null>(null);
  useEffect(() => {
    readNftInfo()
  }, [])
  const readNftInfo = async () => {
    console.log(nft.nft.uri);
    try {
      const response = await fetch(nft.nft.uri)
      const data = await response.json();
      console.log(data.image);
      
      if(data.attributes.length === 1) { //generic
        setNftInfo({ title: data.name,
          value: data.attributes[0].value,
          description: data.description,
          image: data.image
        })
      } else if (data.attributes.length === 4) { //grocery
        setNftInfo({ title: data.name,
          value: data.attributes[3].value,
          description: data.description,
          image: data.image
        })
      } else if (data.attributes.length === 3) { //travel
        setNftInfo({ title: data.name,
          value: data.attributes[2].value,
          description: data.description,
          image: data.image
        })
      }
    } catch (error) {
      console.log(error);
    }
  }
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
          src={nftInfo?.image}
          alt="Chakra UI"
          borderRadius="lg"
        />
        <VStack align="start">
          <HStack>
            <Text textColor="white" fontWeight="bold" fontSize="xl">
              {nftInfo?.title}
            </Text>
            <Spacer />
            <Text textColor="white" fontSize="md" fontWeight="semibold">
              {`${nftInfo?.value} T CO2`}
            </Text>
          </HStack>
          <Text textColor="gray.100" fontSize="sm">
            {nftInfo?.description}
          </Text>
        </VStack>
      </Box>
    </Flex>
  );
};

export default NFTComponent;
