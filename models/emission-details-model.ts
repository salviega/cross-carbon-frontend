export interface EmissionDetails {
  grocery: {
    active:boolean
    co2: {
      proteins: number
      fats: number
      carbs: number
    }
    total: number
    units: string
  },
  travel: {
    active: boolean
    co2: {
      hotelEmissionFactor: number
      flightEmissionFactor: number
    }
    total: number
    units: string
  };
} 
