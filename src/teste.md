import React from 'react';
import { Link } from 'react-router-dom';
import './HomeScreen.css';

const HomeScreen = () => {
  return (
    <div className="home-screen">
      <Link to="/primeira-tela" className="image-link">
        <img src="caminho-da-imagem-1" alt="Imagem 1" className="image" />
      </Link>
      <Link to="/segunda-tela" className="image-link">
        <img src="caminho-da-imagem-2" alt="Imagem 2" className="image" />
      </Link>
    </div>
  );
};

export default HomeScreen;
