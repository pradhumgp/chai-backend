import React, { useState } from "react";

const AttributeForm = ({ attributes }) => {
  // State to store user inputs
  const [userInputs, setUserInputs] = useState({});

  // Handle input change
  const handleInputChange = (attr, value) => {
    setUserInputs((prev) => ({ ...prev, [attr]: value }));
  };

  // Submit handler to console log the inputs
  const handleSubmit = () => {
    console.log("User Inputs:", userInputs);
  };

  return (
    <div>
      <h1>Attributes Form</h1>
      {attributes.map((attribute, index) => (
        <div key={index} style={{ marginBottom: "1rem" }}>
          <label htmlFor={attribute}>
            {attribute}:
          </label>
          <input
            id={attribute}
            type="text"
            placeholder={`Enter ${attribute}`}
            onChange={(e) => handleInputChange(attribute, e.target.value)}
            style={{
              marginLeft: "1rem",
              padding: "0.5rem",
              width: "200px",
            }}
          />
        </div>
      ))}
      <button onClick={handleSubmit} style={{ marginTop: "1rem" }}>
        Submit
      </button>
    </div>
  );
};

// Example usage with dummy Snowflake data
const App = () => {
  // Assuming the response structure from Snowflake looks like this
  const snowflakeResponse = [
    { attribute: "First Name" },
    { attribute: "Last Name" },
    { attribute: "Email" },
  ];

  // Extracting attribute names
  const attributes = snowflakeResponse.map((item) => item.attribute);

  return <AttributeForm attributes={attributes} />;
};

export default App;