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
  grams: string;
	fats: string;
	carbs: string;
}
const GroceriesCalculator = () => {
  const [loading, setLoading] = useState(false);
  const [inputValues, setInputValues] = useState<Form1Input>({
    grams: "",
    fats: "",
    carbs: "",
  });
  const [inputErrors, setInputErrors] = useState<Form1Input>({
    grams: "",
    fats: "",
    carbs: "",
  });
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setInputValues((prevValues) => ({ ...prevValues, [id]: value }));
  };
  return (
    <Box>
      <Heading w="100%" fontWeight="medium" fontSize="xl" mb="2%">
        Calculate Groceries Emissions
      </Heading>
      <Flex mt="2%" flexDirection={{ base: "column", md: "row" }}>
        <FormControl mr="2%" isRequired isInvalid={!!inputErrors.grams}>
          <FormLabel htmlFor="grams" fontWeight="medium" fontSize="md">
            Proteins (grams)
          </FormLabel>
          <Input
            id="grams"
            placeholder="Proteins ..."
            type="number"
            required
            value={inputValues.grams}
            onChange={handleInputChange}
            borderColor="white"
            focusBorderColor="green.500"
          />
          <FormErrorMessage>{inputErrors.grams}</FormErrorMessage>
        </FormControl>
        <FormControl mr="2%" isRequired isInvalid={!!inputErrors.fats}>
          <FormLabel htmlFor="fats" fontWeight="medium" fontSize="md">
            Fats (grams)
          </FormLabel>
          <Input
            id="fats"
            placeholder="Fats ..."
            type="number"
            required
            value={inputValues.fats}
            onChange={handleInputChange}
            borderColor="white"
            focusBorderColor="green.500"
          />
          <FormErrorMessage>{inputErrors.fats}</FormErrorMessage>
        </FormControl>
      </Flex>
      <Flex mt="2%" flexDirection={{ base: "column", md: "row" }}>
        <FormControl mr="2%" isRequired isInvalid={!!inputErrors.carbs}>
          <FormLabel htmlFor="carbs" fontWeight="medium" fontSize="md">
            Carbs (grams)
          </FormLabel>
          <Input
            id="carbs"
            placeholder="Carbs ..."
            type="number"
            required
            value={inputValues.carbs}
            onChange={handleInputChange}
            borderColor="white"
            focusBorderColor="green.500"
          />
          <FormErrorMessage>{inputErrors.carbs}</FormErrorMessage>
        </FormControl>
        <FormControl mr="2%" >
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

export default forwardRef(GroceriesCalculator);
