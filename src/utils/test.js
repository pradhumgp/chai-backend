function groupByXYZ(data) {
  // Use a Map to group objects by the XYZ field
  const grouped = data.reduce((acc, obj) => {
    const key = obj.XYZ; // Use the value of the XYZ field as the key
    if (!acc[key]) {
      acc[key] = []; // Initialize an array if the key doesn't exist
    }
    acc[key].push(obj); // Add the current object to the group
    return acc;
  }, {});

  return grouped;
}

// Example usage:
const data = [
  { id: 1, XYZ: "A", value: 10 },
  { id: 2, XYZ: "B", value: 20 },
  { id: 3, XYZ: "A", value: 30 },
  { id: 4, XYZ: "C", value: 40 },
  { id: 5, XYZ: "B", value: 50 },
];

const groupedData = groupByXYZ(data);
console.log(groupedData);
