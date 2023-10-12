import React from "react";
import {
  Box,
  Button,
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
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import NFTComponent from "../nft/NFTComponent";
import { ChevronDownIcon } from "@chakra-ui/icons";
const MyCertificates = () => {
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
            <Heading size="lg"> My Certificates</Heading>
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                colorScheme="teal"
                ml={4}
              >
                All networks
              </MenuButton>
              <MenuList>
                <MenuItem>Polygon</MenuItem>
                <MenuItem>Ethereum</MenuItem>
                <MenuItem>Optimism</MenuItem>
                {/* ... Add as many options as you need */}
              </MenuList>
            </Menu>
          </Flex>
        </CardHeader>
        <CardBody>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={4}>
            <NFTComponent />
            <NFTComponent />
            <NFTComponent />
            <NFTComponent />
            <NFTComponent />
            <NFTComponent />
            <NFTComponent />
            <NFTComponent />
            {/* ... Add as many NFTComponent as you need */}
          </SimpleGrid>
        </CardBody>
        <CardFooter>
          <Flex justifyContent="center" gap={4}>
            <Button colorScheme="teal" variant="outline">
              Purchase New Certificate
            </Button>
          </Flex>
        </CardFooter>
      </Card>
    </Box>
  );
};

export default MyCertificates;
