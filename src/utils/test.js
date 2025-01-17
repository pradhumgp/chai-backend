function transformFacilityNames(data) {
  return data.map(item => {
    if (item.FACILITY_NAMES && typeof item.FACILITY_NAMES === 'string') {
      // Convert FACILITY_NAMES to an array
      const facilityNamesArray = item.FACILITY_NAMES.split(',').map(name => name.trim());

      // Add PRIMARY_FACILITY_NAME to the array if it exists and is not already included
      if (item.PRIMARY_FACILITY_NAME && !facilityNamesArray.includes(item.PRIMARY_FACILITY_NAME)) {
        facilityNamesArray.push(item.PRIMARY_FACILITY_NAME);
      }

      return {
        ...item,
        FACILITY_NAMES: facilityNamesArray
      };
    }

    // Handle case where FACILITY_NAMES is missing or not a string
    if (item.PRIMARY_FACILITY_NAME) {
      return {
        ...item,
        FACILITY_NAMES: [item.PRIMARY_FACILITY_NAME]
      };
    }

    return item;
  });
}

// Example usage
const data = [
  { id: 1, FACILITY_NAMES: "Facility A, Facility B, Facility C", PRIMARY_FACILITY_NAME: "Facility D" },
  { id: 2, FACILITY_NAMES: "Facility X, Facility Y", PRIMARY_FACILITY_NAME: "Facility X" },
  { id: 3, FACILITY_NAMES: "", PRIMARY_FACILITY_NAME: "Facility Z" }, // Empty string
  { id: 4, PRIMARY_FACILITY_NAME: "Facility Q" }, // No FACILITY_NAMES field
  { id: 5 } // No FACILITY_NAMES or PRIMARY_FACILITY_NAME
];

const result = transformFacilityNames(data);
console.log(result);