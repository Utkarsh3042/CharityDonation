import React, { useContext, createContext, useState, useEffect } from 'react';
import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract, error: contractError } = useContract('0x72b9c255d37772B668bF0131C8763B831c6f4FAb');
  const { mutateAsync: createCharity } = useContractWrite(contract, 'createCharity');

  const address = useAddress();
  const connect = useMetamask();

  const publishCharity = async (form) => {
    if (!contract) {
      console.error('Contract is not available.');
      return;
    }

    try {
      const targetInEther = ethers.utils.parseEther(form.target.toString());
      const deadlineInMs = new Date(form.deadline).getTime();

      const data = await createCharity({
        args: [
          address, // owner
          form.title, // title
          form.description, // description
          targetInEther, // target in wei
          deadlineInMs, // deadline in milliseconds
          form.image, // image
        ],
      });

      console.log("Contract call success", data);
    } catch (error) {
      console.log("Contract call failure", error);
    }
  };

  const getCharities = async () => {
    if (!contract) {
      console.error('Contract is not available.');
      return [];
    }

    try {
      const charities = await contract.call('getCharities');

      const parsedCharities = charities.map((charity, i) => ({
        owner: charity.owner,
        title: charity.title,
        description: charity.description,
        target: ethers.utils.formatEther(charity.target.toString()), 
        deadline: charity.deadline.toNumber(),
        amountCollected: ethers.utils.formatEther(charity.amountCollected.toString()), 
        image: charity.image,
        pId: i,
      }));

      return parsedCharities;
    } catch (error) {
      console.error("Error fetching charities", error);
      return [];
    }
  };

  const getUserCharities = async () => {
    const allCharities = await getCharities();
    const filteredCharities = allCharities.filter((charity) => charity.owner === address);
    return filteredCharities;
  };

  const donate = async (pId, amount) => {
    if (!contract) {
      console.error('Contract is not available.');
      return;
    }

    try {
      // Validate amount to ensure it's a valid number before proceeding
      if (isNaN(amount) || amount <= 0) {
        console.error('Invalid donation amount:', amount);
        return;
      }

      const amountInEther = ethers.utils.parseEther(amount.toString());
      const data = await contract.call('donateToCharity', [pId], { value: amountInEther });
      return data;
    } catch (error) {
      console.error("Error donating to charity", error);
    }
  };

  const getDonations = async (pId) => {
    if (!contract) {
      console.error('Contract is not available.');
      return [];
    }

    try {
      const donations = await contract.call('getDonators', [pId]);
      const numberOfDonations = donations[0].length;

      const parsedDonations = [];

      for (let i = 0; i < numberOfDonations; i++) {
        parsedDonations.push({
          donator: donations[0][i],
          donation: ethers.utils.formatEther(donations[1][i].toString()),
        });
      }

      return parsedDonations;
    } catch (error) {
      console.error("Error fetching donations", error);
      return [];
    }
  };

  useEffect(() => {
    if (contractError) {
      console.error("Contract error:", contractError);
    }
  }, [contractError]);

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createCharity: publishCharity,
        getCharities,
        getUserCharities,
        donate,
        getDonations,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
