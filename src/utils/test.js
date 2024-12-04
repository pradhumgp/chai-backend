const generateEmail = (name) => {
  // Split the name by commas to separate Last and First parts
  const [lastName, rest] = name.split(",").map((part) => part.trim());

  // Extract the First name (ignoring middle initials or extra details)
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
