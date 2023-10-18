import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
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

import MyCertificates from "../../components/certificates/MyCertificates";
import Purchase from "../../components/certificates/Purchase";
import Calculate from "../../components/certificates/Calculator";

const Dashboard = () => {
  const { isConnected } = useAccount();
  const router = useRouter();
  const [myCert, setMyCert] = useState(false);
  const [purchaseWindow, setPurchaseWindow] = useState(false);
  const [calculateWindow, setCalculateWindow] = useState(false);
  useEffect(() => {
    if (!isConnected) {
      router.push("/");
    }
  }, [isConnected]);
  const showWindow = (setEvent: (value: boolean) => void, event: boolean) => {
    hideWindows();
    setEvent(!event);
  };
  const hideWindows = () => {
    setMyCert(false);
    setPurchaseWindow(false);
    setCalculateWindow(false);
  };
  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center" mt={"17"}>
        <Box
          bg={useColorModeValue("brand.newBlack", "rgba(4,56,80, 0.5)")}
          px={4}
          width="90vw"
          maxWidth={{ base: "100%", md: "100%", lg: "96%" }}
          margin="15px auto"
          borderRadius="2xl"
          backgroundImage={
            "linear-gradient(rgba(4,56,80, 0.8), rgba(4,56,80, 0.6)), url(/Images/PanelBG.jpeg)"
          }
          backgroundSize={"cover"}
          backgroundPosition={{ base: "100%", md: "left top" }}
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
                <Button
                  colorScheme="blue"
                  variant="outline"
                  onClick={() => showWindow(setMyCert, myCert)}
                >
                  View Your Certificates
                </Button>
                <Button
                  colorScheme="teal"
                  variant="outline"
                  onClick={() => showWindow(setPurchaseWindow, purchaseWindow)}
                >
                  Purchase, Share & Offset
                </Button>
                <Button
                  colorScheme="green"
                  variant="outline"
                  onClick={() =>
                    showWindow(setCalculateWindow, calculateWindow)
                  }
                >
                  Calculate & Offset
                </Button>
              </Flex>
            </CardFooter>
          </Card>
        </Box>
      </Box>
      {myCert && <MyCertificates />}
      {purchaseWindow && <Purchase />}
      {calculateWindow && <Calculate />}
    </>
  );
};

export default Dashboard;
