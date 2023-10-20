function limitTo18Digits(value) {
  const str = value.toString();
  return BigInt(str.substring(0, 18));
}

const DECIMALS = 18;
const scale = BigInt(10 ** DECIMALS);

const proteins = args[0];
const fats = args[1];
const carbs = args[2];

const url = `https://7x28rruqw7.execute-api.sa-east-1.amazonaws.com/dev/grocery`;

const cryptoCompareRequest = Functions.makeHttpRequest({
  url: url,
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    proteins: proteins,
    fats: fats,
    carbs: carbs,
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
const proteinsEmissionFactor = co2["proteins"];
const fatsEmissionFactor = co2["fats"];
const carbsEmissionFactor = co2["carbs"];
const total = co2["total"];

// Todo: add the rest of the code here

const proteinsEmissionFactorInt = limitTo18Digits(
  BigInt(Math.round(proteinsEmissionFactor * Number(scale)))
);
const fatsEmissionFactorInt = limitTo18Digits(
  BigInt(Math.round(fatsEmissionFactor * Number(scale)))
);
const carbsEmissionFactorInt = limitTo18Digits(
  BigInt(Math.round(carbsEmissionFactor * Number(scale)))
);
const totalInt = limitTo18Digits(BigInt(Math.round(total * Number(scale))));

const proteinsString = proteinsEmissionFactorInt
  .toString()
  .padStart(DECIMALS, "0");
const fatsString = fatsEmissionFactorInt.toString().padStart(DECIMALS, "0");
const carbsString = carbsEmissionFactorInt.toString().padStart(DECIMALS, "0");
const totalString = totalInt.toString().padStart(DECIMALS, "0");

const combinedString = proteinsString + fatsString + carbsString + totalString;
const concatenateFootprint = BigInt(combinedString);

return Functions.encodeUint256(concatenateFootprint);
