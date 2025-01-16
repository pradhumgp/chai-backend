function generateEmail(name) {
  // Remove unwanted characters like commas, parentheses, etc.
  const cleanedName = name
    .toLowerCase()
    .replace(/[^a-z\s]/g, "") // Keep only letters and spaces
    .trim()
    .replace(/\s+/g, "."); // Replace spaces with dots

  return `${cleanedName}@example.com`;
}

// Example usage
const name = "john,doe(something)";
const email = generateEmail(name);
console.log(email);