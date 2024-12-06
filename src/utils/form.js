import React, { useState } from 'react';

const AttributesForm = ({ data, itemClassParam }) => {
  // State to store the form data
  const [formData, setFormData] = useState({});

  // Filter the data to get the object that matches the given ITEM_CLASS
  const matchingItems = data.filter(item => item.ITEM_CLASS === itemClassParam);

  // Handle change in input field
  const handleInputChange = (e, dbColumnName) => {
    const value = e.target.value;
    setFormData(prevState => ({
      ...prevState,
      [dbColumnName]: value, // Store the value of the input with the DB_COLUMN_NAME as the key
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // You can send formData to an API or perform any other action here
  };

  return (
    <div>
      {matchingItems.length > 0 ? (
        matchingItems.map((item, index) => (
          <details key={index} className="attribute-details">
            <summary>{item.ITEM_CLASS}</summary>
            <form onSubmit={handleSubmit}>
              {item.attributes.map((attribute, idx) => (
                <div key={idx} className="attribute-field">
                  <label htmlFor={attribute.DB_COLUMN_NAME}>
                    {attribute.ATT_DISPLAY_NAME}
                  </label>
                  <input
                    type="text"
                    id={attribute.DB_COLUMN_NAME}
                    name={attribute.DB_COLUMN_NAME}
                    value={formData[attribute.DB_COLUMN_NAME] || ''} // Set the value from formData, default to empty string
                    onChange={(e) => handleInputChange(e, attribute.DB_COLUMN_NAME)} // Capture change in the formData state
                  />
                </div>
              ))}
              <button type="submit">Submit</button>
            </form>
          </details>
        ))
      ) : (
        <p>No matching ITEM_CLASS found.</p>
      )}
    </div>
  );
};

export default AttributesForm;