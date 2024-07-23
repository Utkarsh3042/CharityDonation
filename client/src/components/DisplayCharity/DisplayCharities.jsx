import React from "react";
import { useNavigate } from "react-router-dom";
import FundCard from "../FundCard/FundCard";
import { loader } from "../../assets/index"; 
import "./DisplayCharities.css";
import { v4 as uuidv4 } from "uuid";

const DisplayCharities = ({ title, isLoading, charities }) => {
  const navigate = useNavigate();

  const handleNavigate = (charity) => {
    navigate(`/charity-details/${charity.title}`, { state: charity });
  };

  // Log charities to check values
  console.log('Charities:', charities);

  return (
    <div className="charity-main">
      <div className="charity-container">
        {isLoading && "Loading"}

        {!isLoading && charities.length === 0 && (
          <p className="no-charities">You have not created any charities yet</p>
        )}

        {!isLoading &&
          charities.length > 0 &&
          charities.map((charity) => (
            <FundCard
              key={uuidv4()}
              {...charity}
              handleClick={() => handleNavigate(charity)}
            />
          ))}
      </div>
    </div>
  );
};

export default DisplayCharities;
