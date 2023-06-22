import { useEffect, useState } from 'react';
import { calculateBitcoinPrediction } from '../../services/polinomial';
import BitcoinPrice from '../../components/bitcoinPrice';
import cripto from '../../assets/img/cripto.jpg';
import 'react-datepicker/dist/react-datepicker.css';
import './styles.css';
import bitcoinData from './bitcoinData';
import { LineChart, BarChart, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, Bar, Area, ResponsiveContainer, ReferenceLine, Label } from 'recharts';

interface ChartData {
  date: string;
  value: number;
}

const BitcoinPrediction = () => {
  const [prediction, setPrediction] = useState<number | null>(null);
  const [predictionDate, setPredictionDate] = useState<string>('');
  const [predictionCalculated, setPredictionCalculated] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [polynomialDegree, setPolynomialDegree] = useState<number>(2);

  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    const extractChartData = () => {
      setChartData(bitcoinData);
    };

    extractChartData();
  }, []);

  const handlePredictionClick = () => {
    if (predictionDate) {
      if (!isValidDateFormat(predictionDate)) {
        setErrorMessage('Formato de data inválido. Utilize o formato dd/mm/aaaa');
        return;
      }

      const date = parseDate(predictionDate);
      if (!date) {
        setErrorMessage('Data de previsão inválida');
        return;
      }

      const calculatedPrediction = calculateBitcoinPrediction(date.getTime(), polynomialDegree);
      setPrediction(calculatedPrediction);
      setPredictionCalculated(true);
      setErrorMessage('');
    }
  };
  

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPredictionDate(event.target.value);
    setPredictionCalculated(false);
    setErrorMessage('');
  };

  const handleDegreeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDegree = parseInt(event.target.value, 10);
    setPolynomialDegree(selectedDegree);
  };

  const isValidDateFormat = (dateString: string): boolean => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateString);
  };

  const parseDate = (dateString: string): Date | null => {
    const parts = dateString.split('-');
    const day = parseInt(parts[2], 10);
    const month = parseInt(parts[1], 10) - 1; // Mês começa em 0 (janeiro)
    const year = parseInt(parts[0], 10);

    if (isNaN(day) || isNaN(month) || isNaN(year)) {
      return null;
    }

    return new Date(year, month, day);
  };

  const formatDateString = (dateString: string): string => {
    const parts = dateString.split('-');
    const day = parts[2];
    const month = parts[1];
    const year = parts[0];

    return `${day}/${month}/${year}`;
  };

  return (
    <div className='main'>
      <div className='bitcoin-prediction'>
        <div className='left'>
          <h1 className='bitcoin-prediction__title'>Previsão do Valor do Bitcoin</h1>

          <div className='section'>
            <label htmlFor='prediction-date'>Data de Previsão:</label>

            <input
              type='date'
              id='prediction-date'
              value={predictionDate}
              onChange={handleDateChange}
              placeholder='Digite a data no formato dd/mm/aaaa'
            />

            <label htmlFor='polynomial-degree'>Grau Polinomial:</label>
            <select id='polynomial-degree' value={polynomialDegree} onChange={handleDegreeChange}>
              {Array.from({ length: 11 }, (_, i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </div>
          <button onClick={handlePredictionClick} className='button'>
            Prever
          </button>
        </div>
        <div className='bitcoin-price-container'>
          <BitcoinPrice />
          <div className='profile'>
            <img src={cripto} alt='' className='profilePhoto' />
          </div>
        </div>
      </div>

      <div className='graphs'>
        <div className='result'>
          {errorMessage && <p className='bitcoin-prediction__error'>{errorMessage}</p>}
          {predictionCalculated && (
            <p className='bitcoin-prediction__result'>
              A previsão do valor do BitCoin para {formatDateString(predictionDate)} é:{' '}
              <span className='bitcoin-prediction__value'>{prediction.toFixed(2)}</span>
            </p>
          )}
        </div>
        {chartData && (
          <div className='chart-container'>
            <LineChart width={800} height={400} data={chartData}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='date' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type='monotone'
                dataKey='value'
                name='Preço do Bitcoin'
                stroke='rgb(75, 192, 192)'
                dot={false}
              />
            </LineChart>

            <BarChart width={800} height={400} data={chartData}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='date' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey='value' fill='rgb(75, 192, 192)' name='Preço do Bitcoin' />
            </BarChart>

            <AreaChart width={800} height={400} data={chartData}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='date' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type='monotone' dataKey='value' name='Preço do Bitcoin' fill='rgb(75, 192, 192)' />
            </AreaChart>
            

            {chartData && (
      <div className='chart-container'>
        <ResponsiveContainer width='100%' height={400}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='date' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type='monotone' dataKey='value' name='Preço do Bitcoin' stroke='rgb(75, 192, 192)' dot={false} />
            {predictionCalculated && (
              <ReferenceLine x={predictionDate} stroke='red' strokeDasharray='3 3'>
                <Label value='Previsão' position='insideBottomRight' offset={10} fill='red' />
              </ReferenceLine>
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BitcoinPrediction;
