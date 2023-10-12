import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAccount } from "wagmi";

const Dashboard = () => {
  const { isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (!isConnected) {
      router.push("/");
    }
  }, [isConnected]);
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      height="100vh"
      mt={'17'}
    >
      <Box
        bg={useColorModeValue("brand.newBlack", "rgba(4,56,80, 0.5)")}
        px={4}
        width="90vw"
        maxWidth={{ base: "100%", md: "100%", lg: "96%" }}
        margin="15px auto"
        borderRadius="2xl"
        backgroundImage={'linear-gradient(rgba(4,56,80, 0.8), rgba(4,56,80, 0.6)), url(/Images/PanelBG.jpeg)'}
        backgroundSize={'cover'}
        backgroundPosition={{ base: '100%', md: 'left top' }}
      >
        <Card bg={"transparent"} align="center">
          <CardHeader>
            <Heading size="lg"> Welcome</Heading>
          </CardHeader>
          <CardBody>
            <Text>
              Congrats, you are already connected, what is your next step?.
            </Text>
          </CardBody>
          <CardFooter>
            <Flex justifyContent="center" gap={4}>
              <Button colorScheme="blue">View Your Certificates</Button>
              <Button colorScheme="green">Purchase New Certificate</Button>
            </Flex>
          </CardFooter>
        </Card>
      </Box>
    </Box>
  );
};

export default Dashboard;
