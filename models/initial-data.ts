import { EmissionDetails } from "./emission-details-model";

export const calculatorInitialValues: EmissionDetails = {
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
    active: false,
    co2: {
      hotelEmissionFactor: 0,
      flightEmissionFactor: 0,
    },
    total: 0,
    units: "Tons",
  },
};
