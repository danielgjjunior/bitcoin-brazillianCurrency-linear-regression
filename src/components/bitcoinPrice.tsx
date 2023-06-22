import { useState, useEffect } from 'react';

const BitcoinPrice = () => {
  const [bitcoinPrice, setBitcoinPrice] = useState(null);

  useEffect(() => {
    const fetchBitcoinPrice = async () => {
      try {
        const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice/BTC.json');
        const data = await response.json();
        setBitcoinPrice(data.bpi.USD.rate);
      } catch (error) {
        console.error('Error fetching Bitcoin price:', error);
      }
    };

    fetchBitcoinPrice();

    const interval = setInterval(fetchBitcoinPrice, 60000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Bitcoin Price</h2>
      {bitcoinPrice ? <p>${bitcoinPrice}</p> : <p>Loading...</p>}
    </div>
  );
};

export default BitcoinPrice;