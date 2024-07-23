import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { logo, sun } from '../../assets/index';
import { navlinks } from '../../constants/index';
import './Sidebar.css';

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  <div 
    className={`icon ${isActive === name ? 'active' : ''} ${!disabled ? 'cursor-pointer' : ''} ${styles}`} 
    onClick={handleClick}
  >
    <img 
      src={imgUrl} 
      alt="icon" 
      className={isActive !== name ? 'grayscale' : ''}
    />
  </div>
);

const Sidebar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('dashboard');
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  return (
    <div className={`sidebar ${isDrawerOpen ? '' : 'drawer-hidden'}`}>
      <Link to="/">
        <Icon styles="icon-container" imgUrl={logo} />
      </Link>

      <div className="nav-links">
        <div className="nav-icons">
          {navlinks.map((link) => (
            <Icon 
              key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => {
                if (!link.disabled) {
                  setIsActive(link.name);
                  navigate(link.link);
                }
              }}
            />
          ))}
        </div>

        <Icon styles="sun-icon" imgUrl={sun} />
      </div>
    </div>
  );
};

export default Sidebar;
