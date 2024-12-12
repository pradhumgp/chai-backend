const convertToCommaSeparatedStrings = (selectedValues) => {
  if (!Array.isArray(selectedValues) || selectedValues.length === 0) {
    return '';
  }
  return selectedValues
    .map(value => `'${value?.label || value?.value}'`) // Wrap each value in single quotes
    .join(','); // Join them with commas
};

// Example usage:
const selectedValues = [
  { label: 'Option1', value: '1' },
  { label: 'Option2', value: '2' },
  { label: 'Option3', value: '3' }
];

const result = convertToCommaSeparatedStrings(selectedValues);
console.log(result); // Output: "'Option1','Option2','Option3'"