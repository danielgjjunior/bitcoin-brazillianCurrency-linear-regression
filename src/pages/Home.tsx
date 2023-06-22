import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import img1 from '../assets/img/bitcoin.jpg';
import img2 from '../assets/img/salary2.jpg';
import graph from '../assets/animations/graph.gif'


const HomeScreen = () => {
  const [isLeftImageOpaque, setIsLeftImageOpaque] = useState(true);
  const [isRightImageOpaque, setIsRightImageOpaque] = useState(true);

  const handleMouseEnterLeftImage = () => {
    setIsLeftImageOpaque(false);
  };

  const handleMouseLeaveLeftImage = () => {
    setIsLeftImageOpaque(true);
  };

  const handleMouseEnterRightImage = () => {
    setIsRightImageOpaque(false);
  };

  const handleMouseLeaveRightImage = () => {
    setIsRightImageOpaque(true);
  };

  return (
    <div className="home-screen">
      <div className="container">
        <h1 className="page-title">Previsão de valores usando Regressão Linear</h1>
        <img src={graph} alt="" className='lootieImg' />
        <p>Selecione um menu a seguir:</p>
      </div>
      
      <div
        className={`image-container ${isLeftImageOpaque ? '' : 'opaque'}`}
        onMouseEnter={handleMouseEnterLeftImage}
        onMouseLeave={handleMouseLeaveLeftImage}
      >
        <Link to="/primeira-tela" className="image-link">
          <img src={img1} alt="Bitcoin" className="image" />
          <div className="image-overlay">Bitcoin</div>
        </Link>
      </div>
      <div
        className={`image-container ${isRightImageOpaque ? '' : 'opaque'}`}
        onMouseEnter={handleMouseEnterRightImage}
        onMouseLeave={handleMouseLeaveRightImage}
      >
        <Link to="/segunda-tela" className="image-link">
          <img src={img2} alt="Salary" className="image" />
          <div className="image-overlay">Salary</div>
        </Link>
      </div>
    </div>
  );
};

export default HomeScreen;
