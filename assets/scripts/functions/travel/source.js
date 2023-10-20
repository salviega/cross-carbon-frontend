function limitTo18Digits(value) {
  const str = value.toString();
  return BigInt(str.substring(0, 18));
}

const DECIMALS = 18;
const scale = BigInt(10 ** DECIMALS);

const distance = args[0];
const nights = args[1];

const url = `https://7x28rruqw7.execute-api.sa-east-1.amazonaws.com/dev/travel`;

const cryptoCompareRequest = Functions.makeHttpRequest({
  url: url,
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    distance: distance,
    nights: nights,
  },
});

const cryptoCompareResponse = await cryptoCompareRequest;

if (cryptoCompareResponse.error) {
  console.error(cryptoCompareResponse.error);
  throw Error("Request failed");
}

const data = cryptoCompareResponse["data"];

if (data.fact === "Error") {
  console.error(data.Message);
  throw Error(`Functional error. Read message: ${data.Message}`);
}

const co2 = data["co2"];
const hotelEmissionFactor = co2["hotelEmissionFactor"];
const flightEmissionFactor = co2["flightEmissionFactor"];
const total = co2["total"];

const hotelEmissionFactorInt = limitTo18Digits(
  BigInt(Math.round(hotelEmissionFactor * Number(scale)))
);
const flightEmissionFactorInt = limitTo18Digits(
  BigInt(Math.round(flightEmissionFactor * Number(scale)))
);
const totalInt = limitTo18Digits(BigInt(Math.round(total * Number(scale))));

const hotelString = hotelEmissionFactorInt.toString().padStart(DECIMALS, "0");
const flightString = flightEmissionFactorInt.toString().padStart(DECIMALS, "0");
const totalString = totalInt.toString().padStart(DECIMALS, "0");

const combinedString = hotelString + flightString + totalString;
const concatenateFootprint = BigInt(combinedString);

return Functions.encodeUint256(concatenateFootprint);
