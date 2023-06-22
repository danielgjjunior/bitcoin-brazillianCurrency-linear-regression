import bitcoinData from './bitcoin.js';

export const calculateBitcoinPrediction = (predictionDate:number) => {
  

  const dates = bitcoinData.map((data) => data[0]);
  const values = bitcoinData.map((data) => data[1]);

  const avgDate = dates.reduce((sum, date) => sum + date, 0) / dates.length;
  const avgValue = values.reduce((sum, value) => sum + value, 0) / values.length;

  let sumDiffDateTimes = 0;
  let sumDiffDateValue = 0;

  for (let i = 0; i < dates.length; i++) {
    const diffDate = dates[i] - avgDate;
    const diffValue = values[i] - avgValue;
    sumDiffDateTimes += diffDate * diffDate;
    sumDiffDateValue += diffDate * diffValue;
  }

  const slope = sumDiffDateValue / sumDiffDateTimes;
  const futurePrediction = avgValue + slope * (predictionDate - avgDate);

  return futurePrediction;
};
