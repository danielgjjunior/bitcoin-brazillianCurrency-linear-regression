import bitcoinData from './bitcoin.ts';
import * as math from 'mathjs';


export const calculateBitcoinPrediction = (predictionDate: number, degree: number): number => {
  const dates: number[] = bitcoinData.map((data: any[]) => data[0]);
  const values: number[] = bitcoinData.map((data: any[]) => data[1]);

  

  const n: number = dates.length;

  const designMatrix: number[][] = [];
  for (let i = 0; i < n; i++) {
    const row: number[] = [];
    for (let j = 0; j <= degree; j++) {
      row.push(Math.pow(dates[i], j));
    }
    designMatrix.push(row);
  }

  const pseudoInverse: number[][] = math.inv(math.multiply(math.transpose(designMatrix), designMatrix));

  const coefficients: number[] = math.multiply(
    math.multiply(pseudoInverse, math.transpose(designMatrix)),
    values
  );


  let futurePrediction = 0;
  for (let i = 0; i <= degree; i++) {
    futurePrediction += coefficients[i] * Math.pow(predictionDate, i);
  }
  console.log(predictionDate)
  return futurePrediction;
};
