import React, { useState, useEffect } from 'react';
import './Home.css';

import  DisplayCharities  from '../../components/DisplayCharity/DisplayCharities';
import { useStateContext } from '../../context/index';
const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [charities, setCharities] = useState([]);

  const { address, contract, getCharities } = useStateContext();

  const fetchCharities = async () => {
    setIsLoading(true);
    const data = await getCharities();
    setCharities(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchCharities();
  }, [address, contract]);

  return (
    <div className="container">
      <h1 className="title">All Charities ({charities.length})</h1>
      <div className="charities-container">
        {isLoading && <img src="/path/to/loader.gif" alt="loader" className="loader" />}

        {!isLoading && charities.length === 0 && (
          <p className="no-charities">You have not created any charities yet</p>
        )}

        {!isLoading && charities.length > 0 && (
          <DisplayCharities 
            title="All Charities"
            isLoading={isLoading}
            charities={charities}
          />
        )}
      </div>
    </div>
  );
};

export default Home;