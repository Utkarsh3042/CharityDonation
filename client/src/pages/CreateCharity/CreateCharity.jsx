import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import './CreateCharity.css';
import { useStateContext } from '../../context/index';
import { money } from '../../assets/index';
import CustomButton from '../../components/CustomButton/CustomButton';
import Loader from '../../components/Loader/Loader';
import FormField from '../../components/FormField/FormField';
import { checkIfImage } from '../../utils'; // Make sure this import is correct

const CreateCharity = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { createCharity } = useStateContext();
  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    target: '', 
    deadline: '',
    image: ''
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    checkIfImage(form.image, async (exists) => {
      if (exists) {
        setIsLoading(true);
        await createCharity({ ...form, target: ethers.utils.parseUnits(form.target, 18) });
        setIsLoading(false);
        navigate('/');
      } else {
        alert('Provide valid image URL');
        setForm({ ...form, image: '' });
      }
    });
  };

  return (
    <div className="create-charity-container">
      {isLoading && <Loader />}
      <div className="create-charity-header">
        <h1>Start a Charity</h1>
      </div>

      <form onSubmit={handleSubmit} className="create-charity-form">
        <div className="form-field-group">
          <FormField 
            labelName="Your Name *"
            placeholder="John Doe"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange('name', e)}
          />
          <FormField 
            labelName="Charity Title *"
            placeholder="Write a title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange('title', e)}
          />
        </div>

        <FormField 
          labelName="Story *"
          placeholder="Write your story"
          isTextArea
          value={form.description}
          handleChange={(e) => handleFormFieldChange('description', e)}
        />

        <div className="charity-info">
          <img src={money} alt="money" />
          <h4>You will get 100% of the raised amount</h4>
        </div>

        <div className="form-field-group">
          <FormField 
            labelName="Goal *"
            placeholder="ETH 0.50"
            inputType="text"
            value={form.target}
            handleChange={(e) => handleFormFieldChange('target', e)}
          />
          <FormField 
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange('deadline', e)}
          />
        </div>

        <FormField 
          labelName="Charity image *"
          placeholder="Place image URL of your charity"
          inputType="url"
          value={form.image}
          handleChange={(e) => handleFormFieldChange('image', e)}
        />

        <div className="form-submit">
          <CustomButton 
            btnType="submit"
            title="Submit new charity"
            styles="submit-button"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateCharity;
