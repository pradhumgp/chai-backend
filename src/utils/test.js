function transformFacilityNames(data) {
  return data.map(item => {
    if (item.FACILITY_NAMES && typeof item.FACILITY_NAMES === 'string') {
      return {
        ...item,
        FACILITY_NAMES: item.FACILITY_NAMES.split(',').map(name => name.trim())
      };
    }
    return item;
  });
}

// Example usage
const data = [
  { id: 1, FACILITY_NAMES: "Facility A, Facility B, Facility C" },
  { id: 2, FACILITY_NAMES: "Facility X, Facility Y" },
  { id: 3, FACILITY_NAMES: "" }, // Empty string
  { id: 4 } // No FACILITY_NAMES field
];

const result = transformFacilityNames(data);
console.log(result);