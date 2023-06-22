import bitcoinDataMensal from './bitcoinMensal.js';
import * as math from 'mathjs';

export const calculateBitcoinPrediction = (predictionDate: number, degree: number): {
  prediction: number;
  rSquared: number;
  adjustedRSquared: number;
} => {
  const dates: number[] = bitcoinDataMensal.map((data: any[]) => data[0]);
  const values: number[] = bitcoinDataMensal.map((data: any[]) => data[1]);

  const n: number = dates.length;

  // Cria uma matriz de design contendo os termos polinomiais
  const designMatrix: number[][] = [];
  for (let i = 0; i < n; i++) {
    const row: number[] = [];
    for (let j = 0; j <= degree; j++) {
      row.push(Math.pow(dates[i], j));
    }
    designMatrix.push(row);
  }

  // Calcula a matriz pseudo-inversa da matriz de design
  const pseudoInverse: number[][] = math.inv(math.multiply(math.transpose(designMatrix), designMatrix));

  // Calcula os coeficientes da regressão
  const coefficients: number[] = math.multiply(
    math.multiply(pseudoInverse, math.transpose(designMatrix)),
    values
  );

  // Calcula a previsão do valor futuro do Bitcoin para a data fornecida
  let futurePrediction: number = 0;
  for (let i = 0; i <= degree; i++) {
    futurePrediction += coefficients[i] * Math.pow(predictionDate, i);
  }

  // Calcula o R-quadrado (r-squared)
  const predictedValues: number[] = designMatrix.map((row) => math.multiply(coefficients, row));
  const mean: number = math.mean(values);
  const totalSumOfSquares: number = values.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0);
  const regressionSumOfSquares: number = predictedValues.reduce(
    (sum, predictedValue) => sum + Math.pow(predictedValue - mean, 2),
    0
  );
  const rSquared: number = regressionSumOfSquares / totalSumOfSquares;

  // Calcula o R-quadrado ajustado (adjusted r-squared)
  const p: number = degree + 1;
  const degreesOfFreedom: number = n - p;
  const adjustedRSquared: number = 1 - ((1 - rSquared) * (n - 1) / degreesOfFreedom);

  return {
    prediction: futurePrediction,
    rSquared,
    adjustedRSquared
  };
};
