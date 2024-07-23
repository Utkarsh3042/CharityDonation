import React from 'react';
import './Loader.css';
import { loader } from '../../assets/index'; // Make sure this path is correct

const Loader = () => {
  return (
    <div className="loader-overlay">
      <img src={loader} alt="loader" className="loader-image" />
      <p className="loader-text">
        Transaction is in progress <br /> Please wait...
      </p>
    </div>
  );
};

export default Loader;
