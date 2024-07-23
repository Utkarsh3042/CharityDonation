import React, { useState, useEffect } from 'react';

import  DisplayCharities  from '../../components/DisplayCharity/DisplayCharities';
import { useStateContext } from '../../context/index';
import './profile.css';

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [charities, setCharities] = useState([]);

  const { address, contract, getUserCharities } = useStateContext();

  const fetchCharities = async () => {
    setIsLoading(true);
    const data = await getUserCharities();
    setCharities(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchCharities();
  }, [address, contract]);

  return (
    <div className="container">
      <div className="charities-container">
        {isLoading && <img src="/path/to/loader.gif" alt="loader" className="loader" />}

        {!isLoading && charities.length === 0 && (
          <p className="no-charities">You have not created any charities yet</p>
        )}

        {!isLoading && charities.length > 0 && (
          <> <p>My Charities</p>
          <DisplayCharities 
            title="My Charities"
            isLoading={isLoading}
            charities={charities}
          /></>
        )}
      </div>
    </div>
  );
};

export default Profile;