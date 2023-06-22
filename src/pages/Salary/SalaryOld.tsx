import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import img from '../../assets/img/salario.jpg'

import salaryData from './salaryData'; // Importe o arquivo de dados externo corretamente

interface ChartData {
  date: string;
  value: number;
}

const Salary = () => {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedValue, setSelectedValue] = useState<number | null>(null);

  useEffect(() => {
    setChartData(salaryData);
  }, []);

  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedYear(event.target.value);
    setSelectedValue(null);
  };

  const handlePredictionClick = () => {
    const selectedData = salaryData.find((data) => data.date === selectedYear);
    if (selectedData) {
      setSelectedValue(selectedData.value);
    } else {
      setSelectedValue(null);
    }
  };

  return (
    <div className="main">
      <div className="salary-prediction">
        <div className="left">
          <h1 className="salary-prediction__title">Previsão do Valor do Salário</h1>

          <div className="section">
            <label htmlFor="year-input">Ano:</label>
            <input
              type="number"
              id="year-input"
              value={selectedYear}
              onChange={handleYearChange}
              placeholder="Digite o ano"
            />
          </div>
          <button onClick={handlePredictionClick} className="button">
            Pesquisar
          </button>
        </div>
        <img src={img} alt="" className="img"/>
        
      </div>

      <div className="graphs">
        {selectedValue !== null && (
          <div className="result">
            <p className="salary-prediction__result">
              O valor do Salario para o ano {selectedYear} é: <span className="salary-prediction__value">{selectedValue}</span>
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
              <Line type="monotone" dataKey="value" name="Valor" stroke="rgb(75, 192, 192)" dot={false} />
            </LineChart>
          </div>
        )}
      </div>
    </div>
  );
};

export default Salary;
