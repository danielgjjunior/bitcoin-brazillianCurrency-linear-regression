import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './pages/Home';
import BitcoinPrediction from './pages/Bitcoin/bitcoinAlg';
import Salary from './pages/Salary/salary';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/primeira-tela" element={<BitcoinPrediction />} />
        <Route path="/segunda-tela" element={<Salary />} />
      </Routes>
    </Router>
  );
};

export default App;
