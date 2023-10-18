import React, { ChangeEvent, forwardRef, useState } from "react";
import {
  Heading,
  Flex,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Box,
  Button,
} from "@chakra-ui/react";

import { EmissionDetails } from "../../models/emission-details-model";
import ResultsChart from "../charts/ResultsChart";
import { calculatorInitialValues } from "../../models/initial-data";
interface GroceryInput {
  proteins: string;
  fats: string;
  carbs: string;
}

const GroceriesCalculator = () => {
  const [loading, setLoading] = useState(false);
  const [calculated, setCalculated] = useState(false);
  const [results, setResults] = useState<EmissionDetails>(calculatorInitialValues);
  const [inputValues, setInputValues] = useState<GroceryInput>({
    proteins: "",
    fats: "",
    carbs: "",
  });
  const [inputErrors, setInputErrors] = useState<GroceryInput>({
    proteins: "",
    fats: "",
    carbs: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setInputValues((prevValues) => ({ ...prevValues, [id]: value }));
  };
  const validateAndSubmit = () => {
    let hasErrors = false;
    const newErrors: GroceryInput = {
      proteins: "",
      fats: "",
      carbs: "",
    };
    const mandatoryFields = ["proteins", "fats", "carbs"];
    mandatoryFields.forEach((key) => {
      if (!inputValues[key as keyof GroceryInput]) {
        newErrors[key as keyof GroceryInput] = "Field is required";
        hasErrors = true;
      }
    });
    setInputErrors(newErrors);
    if (!hasErrors) {
      fetchData();
    }
  };
  const fetchData = async () => {
    console.log("entering");
    setLoading(true);
    try {
      const url = "/api/calculator";
      const body = {
        type: "fetchGroceries",
        proteins: inputValues.proteins,
        fats: inputValues.fats,
        carbs: inputValues.carbs,
      };
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      console.log("data is ", data);
      console.log("data is ", data.data.co2.proteins);
      const results: EmissionDetails = {
        grocery: {
          active: true,
          co2: {
            proteins: data.data.co2.proteins,
            fats: data.data.co2.fats,
            carbs: data.data.co2.carbs,
          },
          total: data.data.co2.total,
          units: "Tons",
        },
        travel: {
          active: false,
          co2: {
            hotelEmissionFactor: 0,
            flightEmissionFactor: 0,
          },
          total: 0,
          units: "Tons",
        },
      };
      setResults(results);
      setCalculated(true);
    } catch (error) {
      console.log("error fetching data is ", error);
    }
  };
  return calculated ? (
    <Box w={600} mx="auto"  alignItems="center" justifyContent="center" >
      <ResultsChart emissions={results} />
    </Box>
  ) : (
    <Box>
      <Heading w="100%" fontWeight="medium" fontSize="xl" mb="2%">
        Calculate Groceries Emissions
      </Heading>
      <Flex mt="2%" flexDirection={{ base: "column", md: "row" }}>
        <FormControl mr="2%" isRequired isInvalid={!!inputErrors.proteins}>
          <FormLabel htmlFor="proteins" fontWeight="medium" fontSize="md">
            Proteins (spent in USD)
          </FormLabel>
          <Input
            id="proteins"
            placeholder="Proteins ..."
            type="number"
            required
            value={inputValues.proteins}
            onChange={handleInputChange}
            borderColor="white"
            focusBorderColor="green.500"
            disabled={loading}
          />
          <FormErrorMessage>{inputErrors.proteins}</FormErrorMessage>
        </FormControl>
        <FormControl mr="2%" isRequired isInvalid={!!inputErrors.fats}>
          <FormLabel htmlFor="fats" fontWeight="medium" fontSize="md">
            Fats (spent in USD)
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
            disabled={loading}
          />
          <FormErrorMessage>{inputErrors.fats}</FormErrorMessage>
        </FormControl>
      </Flex>
      <Flex mt="2%" flexDirection={{ base: "column", md: "row" }}>
        <FormControl mr="2%" isRequired isInvalid={!!inputErrors.carbs}>
          <FormLabel htmlFor="carbs" fontWeight="medium" fontSize="md">
            Carbs (spent in USD)
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
            disabled={loading}
          />
          <FormErrorMessage>{inputErrors.carbs}</FormErrorMessage>
        </FormControl>
        <FormControl mr="2%"></FormControl>
      </Flex>
      <Button
        colorScheme="teal"
        variant="outline"
        onClick={validateAndSubmit}
        isLoading={loading}
        mt={4}
      >
        Calculate
      </Button>
    </Box>
  );
};

export default forwardRef(GroceriesCalculator);
