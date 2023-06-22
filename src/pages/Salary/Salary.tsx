import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import img from '../../assets/img/salario.jpg';
import salaryData from './salaryData';
import './styles.css';
import banner from '../../assets/img/banner.jpg';

interface ChartData {
  date: string;
  value: number;
}

function SalaryPrediction() {
  const [selectedYear, setSelectedYear] = useState<Date | null>(null);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [predictionData, setPredictionData] = useState<{ year: number | null; prediction: number | null }>({ year: null, prediction: null });

  const coefficients = [
    { exponent: 1, coeff: 16.68432434 },
    { exponent: 2, coeff: -1.360985731 },
    { exponent: 3, coeff: 0.045947375 },
    { exponent: 4, coeff: 0.019730618 },
    { exponent: 5, coeff: -0.001202785 },
    { exponent: 6, coeff: 1.91503E-05 },
    { exponent: 0, coeff: 63.92628352 }, 
  ];

  const minID = 1; 
  const maxID = 30; 
  const anoMin = 1994; 
  const anoMax = 2023; 

  const handleYearChange = (date: Date | null) => {
    setSelectedYear(date);
  };

  useEffect(() => {
    setChartData(salaryData);
  }, []);

  const predictSalary = () => {
    if (selectedYear) {
      const parsedYear = selectedYear.getFullYear();
      const ID = ((parsedYear - anoMin) * (maxID - minID)) / (anoMax - anoMin) + minID;

      let prediction = 0;

      for (let i = 0; i < coefficients.length; i++) {
        const { exponent, coeff } = coefficients[i];
        prediction += coeff * Math.pow(ID, exponent);
      }

      const predictionYear = parsedYear.toString();
      const predictionValue = parseFloat(prediction.toFixed(2));

      setPredictionData({ year: parsedYear, prediction: predictionValue });

      // Adicione a previsão ao gráfico
      const updatedChartData = [...chartData, { date: predictionYear, value: predictionValue }];
      setChartData(updatedChartData);
    }
  };

  return (
    <div className="main">
      <div className="salary-prediction">
        <div className="left">
          <h1 className="salary-prediction__title">Previsão do Valor do Salário</h1>

          <div className="section">
            <p>Digite o ano desejado:</p>
            <label htmlFor="prediction-date">Ano:</label>
            <DatePicker
              id="year-input"
              selected={selectedYear}
              onChange={handleYearChange}
              dateFormat="yyyy"
              placeholderText="Selecione o ano"
              showYearPicker
            />
          </div>
          <button onClick={predictSalary} className="button">
            Submit
          </button>
        </div>
        <img src={banner} alt="Banner" className="bannerImg" />
      </div>

      <div className="graphs">
        {predictionData.prediction !== null && (
          <div className="result">
            <p className="salary-prediction__result">
              O valor do Salário para o ano de {predictionData.year} é: R$<span className="salary-prediction__value">{predictionData.prediction}</span>
            </p>
          </div>
        )}

            
    {chartData && (
        <div className="chart-container">
          <LineChart width={800} height={400} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" name="Valor" stroke="#8884d8" strokeWidth={2} dot={{ stroke: '#8884d8', strokeWidth: 2, r: 4 }} activeDot={{ stroke: '#8884d8', strokeWidth: 2, r: 6 }} />
          </LineChart>
        </div>
      )}

        <img src={img} alt="" style={{ maxWidth: '100%', maxHeight: '100%' }} />
      </div>
    </div>
  );
}

export default SalaryPrediction;
