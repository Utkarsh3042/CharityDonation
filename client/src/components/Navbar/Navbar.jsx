import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

import CustomButton from '../../components/CustomButton/CustomButton';
import { logo, menu, search, thirdweb } from '../../assets/index';
import { navlinks } from '../../constants/index';
import { useStateContext } from '../../context/index'


const Navbar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('dashboard');
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const { connect, address } = useStateContext();

  return (
    <div className="navbar-container">
      <div className="search-bar">
        <input type="text" placeholder="Search for charities" className="search-input" />
        <div className="search-button">
          <img src={search} alt="search" className="search-icon"/>
        </div>
      </div>

      <div className="desktop-nav">
        <CustomButton 
          btnType="button"
          title={address ? 'Create a charity' : 'Connect'}
          styles={address ? 'create-btn' : 'connect-btn'}
          handleClick={() => {
            if(address) navigate('create-charity');
            else connect();
          }}
        />

        <Link to="/profile">
          <div className="profile-icon">
            <img src={thirdweb} alt="user" className="profile-image" />
          </div>
        </Link>
      </div>

     
    </div>
  );
};

export default Navbar;
