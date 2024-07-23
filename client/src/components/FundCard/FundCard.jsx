import React from 'react';
import { tagType, thirdweb } from '../../assets/index';
import { daysLeft } from '../../utils/index';
import './FundCard.css'
const FundCard = ({ owner, title, description, target, deadline, amountCollected, image, handleClick }) => {
  const remainingDays = daysLeft(deadline);
  
  return (
    <div className="fund-card" onClick={handleClick}>
      <img src={image} alt="fund" className="fund-card-image"/>

      <div className="fund-card-content">

        <div className="fund-card-title-description">
          <h3 className="fund-card-title">{title}</h3>
          <p className="fund-card-description">{description}</p>
        </div>

        <div className="fund-card-stats">
          <div className="fund-card-stat">
            <h4 className="fund-card-stat-amount">Amount Raised:{amountCollected}</h4>
            <p className="fund-card-stat-text">Raised of {target}</p>
          </div>
          <div className="fund-card-stat">
            <h4 className="fund-card-stat-amount">{remainingDays}</h4>
            <p className="fund-card-stat-text">Days Left</p>
          </div>
        </div>

        <div className="fund-card-owner">
          <div className="fund-card-owner-avatar">
            <img src={thirdweb} alt="user" className="fund-card-owner-image"/>
          </div>
          <p className="fund-card-owner-text">by <span className="fund-card-owner-name">{owner}</span></p>
        </div>
      </div>
    </div>
  )
}

export default FundCard;
