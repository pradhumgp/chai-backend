const generateEmail = (name) => {
  // Remove any parenthesis and the content inside them
  const cleanedName = name.replace(/.*?/g, "").trim();
  
  // Split the name by commas to separate Last and First parts
  const [lastName, rest] = cleanedName.split(",").map((part) => part.trim());
  
  // Split the rest to get the First name (ignoring the middle initial if any)
  const [firstName] = rest.split(" ");

  // Construct the email
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@xyz.com`;
  
  return email;
};

// Example usage:
const name = "Jones, Donald A (Adam)";
const email = generateEmail(name);
console.log(email);
// Output: donald.jones@xyz.com