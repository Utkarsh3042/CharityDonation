import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStateContext } from '../../context/index';
import CountBox from '../../components/CountBox/CountBox'
import CustomButton from '../../components/CustomButton/CustomButton'
import Loader from '../../components/Loader/Loader'
import { calculateBarPercentage, daysLeft } from '../../utils/index';
import { thirdweb } from '../../assets/index';
import './CharityDetails.css';
 
const CharityDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { donate, getDonations, contract, address } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [donators, setDonators] = useState([]);

  const remainingDays = daysLeft(state.deadline);

  const fetchDonators = async () => {
    const data = await getDonations(state.pId);
    setDonators(data);
  };

  useEffect(() => {
    if (contract) fetchDonators();
  }, [contract, address]);

  const handleDonate = async () => {
    setIsLoading(true);
    await donate(state.pId, amount);
    navigate('/');
    setIsLoading(false);
  };

  return (
    <div className="container">
      {isLoading && <Loader />}

      <div className="flex-row mt-10 gap-30px">
        <div className="flex-1 flex-col">
          <img src={state.image} alt="Charity" className="w-full h-[410px] object-cover rounded-xl" />
          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${calculateBarPercentage(state.target, state.amountCollected)}%`, maxWidth: '100%' }}
            ></div>
          </div>
        </div>

        <div className="flex-row small-box gap-30px">
          <CountBox title="Days Left" value={remainingDays} />
          <CountBox title="Total Backers" value={donators.length} />
        </div>
      </div>

      <div className="mt-60 flex-row gap-5">
        <div className="flex-col">
          <div>
            <h4 className="text-title">Creator</h4>
            <div className="flex-row mt-20">
              <div className="img-container">
                <img src={thirdweb} alt="user" className="img" />
              </div>
              <div>
                <h4 className="text-title">{state.owner}</h4>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-title">Story</h4>
            <div className="mt-20">
              <p className="text-description">{state.description}</p>
            </div>
          </div>

          <div>
            <h4 className="text-title">Donators</h4>
            <div className="mt-20 flex-col gap-4">
              {donators.length > 0 ? (
                donators.map((item, index) => (
                  <div key={`${item.donator}-${index}`} className="flex-row gap-4">
                    <p className="text-donators">{index + 1}. {item.donator}</p>
                    <p className="text-donators">{item.donation}</p>
                  </div>
                ))
              ) : (
                <p className="text-description">No donators yet. Be the first one!</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1">
          <h4 className="text-title">Fund</h4>
          <div className="bg-dark mt-20 flex-col p-4">
            <p className="text-center text-description">
              Fund the Charity
            </p>
            <div className="mt-30">
              <input
                type="number"
                placeholder="ETH 0.1"
                step="0.01"
                className="input-field"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <div className="bg-dark p-4 mt-20">
                <h4 className="text-title">Back it because you believe in it.</h4>
                <p className="text-description mt-20">Support the project for no reward, just because it speaks to you.</p>
              </div>
              <CustomButton
                btnType="button"
                title="Fund Charity"
                className="btn"
                handleClick={handleDonate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharityDetails;
