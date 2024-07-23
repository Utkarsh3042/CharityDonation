import React from 'react';
import './FormField.css'
const FormField = ({ labelName, placeholder, inputType, isTextArea, value, handleChange }) => {
  return (
    <label className="form-field">
      {labelName && (
        <span className="form-field-label">{labelName}</span>
      )}
      {isTextArea ? (
        <textarea 
          required
          value={value}
          onChange={handleChange}
          rows={10}
          placeholder={placeholder}
          className="form-field-textarea"
        />
      ) : (
        <input 
          required
          value={value}
          onChange={handleChange}
          type={inputType}
          step="0.1"
          placeholder={placeholder}
          className="form-field-input"
        />
      )}
    </label>
  )
}

export default FormField;