import React from 'react';
import './CustomButton.css';

const CustomButton = ({ btnType, title, handleClick, styles }) => {
  return (
    <button
      type={btnType}
      className={`custom-button ${styles}`}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default CustomButton;
