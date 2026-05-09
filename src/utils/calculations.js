export const yearInvestmentReturn = (data) => {
  const runningCost = data?.serviceCharges + data?.maintainceCost;
  const netRentalIncome = data?.annualRental - runningCost;
  const annualRent5Years = netRentalIncome * 5;

  //Straightforward appreciation-based approach, property value after 5 years
  const realizedExitValue =
    data?.price * Math.pow(1 + data?.propertyValueGrowth / 100, 5);
  const totalGains = annualRent5Years + realizedExitValue;
  const ROI = ((totalGains - data?.price) / data?.price) * 100;
  return ROI / 5;
};

// export const yearInvestmentReturn = (annualRental, price) => {
//   const annualRent5Years = annualRental * 5;
//   const realizedValue = price * 0.25 * 5;
//   const totalGains = annualRent5Years + realizedValue;pr
//   const ROI = ((totalGains - price) / price) * 100;
//   return ROI / 5;
// };

// Calculate net yield percentage
// export const calculateNetYieldInPercent = (
//   annualRental,
//   serviceCharges,
//   maintainceCost,
//   price
// ) => {
//   const annualRentall = Number(annualRental) || 0;
//   const serviceChargess = Number(serviceCharges || 0);
//   const maintainceCostt = Number(maintainceCost || 0);
//   const pricee = Number(price) || 0;
//   console.log("annualRental", annualRentall, price);
//   const netYield =
//     ((annualRentall - (serviceChargess + maintainceCostt)) / pricee) * 100;
//   return netYield.toFixed(6);
// };

export const grossYieldinPercentage = (annualRental, price) => {
  if (price === 0) {
    return 0;
  }
  return (annualRental / price) * 100;
};

export const netYieldinPercentage = (
  annualRental = 0,
  maintainceCost = 0,
  serviceCharges = 0,
  price = 0
) => {
  if (price === 0) {
    return 0;
  }

  const netRent = annualRental - (maintainceCost + serviceCharges);
  return (netRent / price) * 100;
};
