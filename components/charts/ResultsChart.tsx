import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useColorMode, Box } from "@chakra-ui/react";
import { EmissionDetails } from "../../models/emission-details-model";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
interface ResultsChartProps {
  emissions: EmissionDetails;
}
const ResultsChart: React.FC<ResultsChartProps> = ({ emissions }) => {
  console.log("this is sections ", emissions);
  let sectionValues: number[] | undefined;
  let sectionKeys: string[] | undefined;

  if (emissions.grocery.active) {
    sectionValues = Object.values(emissions.grocery.co2);
    sectionKeys = Object.keys(emissions.grocery.co2);
  } else if (emissions.travel.active) {
    sectionValues = Object.values(emissions.travel.co2);
    sectionKeys = Object.keys(emissions.travel.co2);
  }
  const [series, setSeries] = useState<number[] | undefined>(sectionValues);
  const [keys, setKeys] = useState<string[] | undefined>(sectionKeys);
  const { colorMode } = useColorMode();
  const labelColor = colorMode === "dark" ? "white" : "black";
  useEffect(() => {
    if (emissions.grocery.active) {
      const { proteins, fats, carbs} = emissions.grocery.co2;
      setSeries([proteins, fats, carbs]);
      setKeys(["proteins", "fats", "carbs"]);
    } else if (emissions.travel.active) {
      const { hotelEmissionFactor, flightEmissionFactor } = emissions.travel.co2;
      setSeries([hotelEmissionFactor, flightEmissionFactor]);
      setKeys(["HotelEmissionFactor", "FlightEmissionFactor"]);
    }
  }, []);
  const [options, setOptions] = useState<any>({
    chart: {
      type: "donut",
    },
    labels: keys,
    colors: [
      "#3AB39A",
      "#F89211",
      "#39BBF3",
      "#757EF1",
      "#b8dd3f",
      "#363b6a",
      "#e95577",
    ],
    tooltip: {
      y: {
        formatter: function (val: number) {
          return `${val.toFixed(5)} Tons`;
        },
      },
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "22px",
              fontFamily: "Rubik",
              color: "#dfsda",
              offsetY: -10,
            },
            value: {
              show: true,
              fontSize: "16px",
              fontFamily: "Helvetica, Arial, sans-serif",
              color: undefined,
              offsetY: 16,
              formatter: function (val: number) {
                if (typeof val === "number") {
                  return val.toFixed(5);
                }
                return val; // O cualquier valor de respaldo que desees mostrar
              },
            },
            total: {
              show: true,
              label: "Total",
              color: "#373d3f",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: "bold",
              formatter: function (w: any) {
                const totalValue = w.globals.seriesTotals.reduce(
                  (a: number, b: number) => {
                    return a + b;
                  },
                  0
                );
                return totalValue.toFixed(5);
              },
            },
          },
        },
      },
    },
    legend: {
      offsetY: 0,
      position: "bottom",
      horizontalAlign: "left",
      labels: {
        colors: [
          labelColor,
          labelColor,
          labelColor,
          labelColor,
          labelColor,
          labelColor,
          labelColor,
        ],
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  });
  useEffect(() => {
		if (emissions.grocery.active) {
      const { proteins, fats, carbs } = emissions.grocery.co2;
			const sectionValues = [
				proteins,
				fats,
				carbs
			]
      setSeries(sectionValues)
      setKeys(["proteins", "fats", "carbs"]);
    } else if (emissions.travel.active) {
      const { hotelEmissionFactor, flightEmissionFactor } = emissions.travel.co2;
      const sectionValues = [
        hotelEmissionFactor,
        flightEmissionFactor
      ]
      setSeries(sectionValues)
      setKeys(["hotelEmissionFactor", "flightEmissionFactor"]);
    }
  }, [emissions])

  return (
    <Box>
      <Chart options={options} series={series} type="donut" />
    </Box>
  );
};

export default ResultsChart;
