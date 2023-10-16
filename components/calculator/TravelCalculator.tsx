import React, {
  ChangeEvent,
  forwardRef,
  useState,
} from "react";
import {
  Heading,
  Flex,
  Input,
  Select,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
  Box,
  Button,
} from "@chakra-ui/react";
export interface Form1Input {
  distance: string;
	nights: string;
}
const TravelCalculator = () => {
  const [loading, setLoading] = useState(false);
  const [inputValues, setInputValues] = useState<Form1Input>({
    distance: "",
    nights: "",
  });
  const [inputErrors, setInputErrors] = useState<Form1Input>({
    distance: "",
    nights: "",
  });
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setInputValues((prevValues) => ({ ...prevValues, [id]: value }));
  };
  return (
    <Box>
      <Heading w="100%" fontWeight="medium" fontSize="xl" mb="2%">
        Calculate Trip Emissions
      </Heading>
      <Flex mt="2%" flexDirection={{ base: "column", md: "row" }}>
        <FormControl mr="2%" isRequired isInvalid={!!inputErrors.distance}>
          <FormLabel htmlFor="distance" fontWeight="medium" fontSize="md">
            Distance (Kilometers)
          </FormLabel>
          <Input
            id="distance"
            placeholder="Distance ..."
            type="number"
            required
            value={inputValues.distance}
            onChange={handleInputChange}
            borderColor="white"
            focusBorderColor="green.500"
          />
          <FormErrorMessage>{inputErrors.distance}</FormErrorMessage>
        </FormControl>
        <FormControl mr="2%" isRequired isInvalid={!!inputErrors.nights}>
          <FormLabel htmlFor="nights" fontWeight="medium" fontSize="md">
            Number Of Nights
          </FormLabel>
          <Input
            id="nights"
            placeholder="Nights ..."
            type="number"
            required
            value={inputValues.nights}
            onChange={handleInputChange}
            borderColor="white"
            focusBorderColor="green.500"
          />
          <FormErrorMessage>{inputErrors.nights}</FormErrorMessage>
        </FormControl>
      </Flex>
      <Button
        colorScheme="teal"
        variant="outline"
        onClick={() => {}}
        isLoading={loading}
				mt={4}
      >
        Calculate
      </Button>
    </Box>
  );
};

export default forwardRef(TravelCalculator);
