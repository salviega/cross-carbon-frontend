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
import { calculatorInitialValues } from "../../models/initial-data";
import ResultsChart from "../charts/ResultsChart";
interface TravelInput {
  distance: string;
  nights: string;
}
const TravelCalculator = () => {
  const [loading, setLoading] = useState(false);
  const [calculated, setCalculated] = useState(false);
  const [results, setResults] = useState<EmissionDetails>(
    calculatorInitialValues
  );
  const [inputValues, setInputValues] = useState<TravelInput>({
    distance: "",
    nights: "",
  });
  const [inputErrors, setInputErrors] = useState<TravelInput>({
    distance: "",
    nights: "",
  });
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setInputValues((prevValues) => ({ ...prevValues, [id]: value }));
  };
  const validateAndSubmit = () => {
    let hasErrors = false;
    const newErrors: TravelInput = {
      distance: "",
      nights: "",
    };
    const mandatoryFields = ["distance", "nights"];
    mandatoryFields.forEach((key) => {
      if (!inputValues[key as keyof TravelInput]) {
        newErrors[key as keyof TravelInput] = "Field is required";
        hasErrors = true;
      }
    });
    setInputErrors(newErrors);
    if (!hasErrors) {
      fetchData();
    }
  };
  const fetchData = async () => {
    setLoading(true);
    console.log(inputValues.distance, inputValues.nights);
    
    try {
      const url = "/api/calculator";
      const body = {
        type: "fetchTravel",
        distance: inputValues.distance,
        nights: inputValues.nights,
      };
      console.log('2');
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      console.log("data is ", data);
      console.log("data is ", data.data.co2.flightEmissionFactor);
      const results: EmissionDetails = {
        grocery: {
          active: false,
          co2: {
            proteins: 0,
            fats: 0,
            carbs: 0,
          },
          total: 0,
          units: "Tons",
        },
        travel: {
          active: true,
          co2: {
            hotelEmissionFactor: data.data.co2.hotelEmissionFactor,
            flightEmissionFactor: data.data.co2.flightEmissionFactor,
          },
          total: data.data.co2.total,
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
            disabled={loading}
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
            disabled={loading}
          />
          <FormErrorMessage>{inputErrors.nights}</FormErrorMessage>
        </FormControl>
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

export default forwardRef(TravelCalculator);
