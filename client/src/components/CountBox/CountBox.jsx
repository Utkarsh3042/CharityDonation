import React from 'react';
import './CountBox.css'; 

const CountBox = ({ title, value }) => {
  return (
    <div className="count-box">
      <h4 className="count-title">{value}</h4>
      <p className="count-subtitle">{title}</p>
    </div>
  );
};

export default CountBox;