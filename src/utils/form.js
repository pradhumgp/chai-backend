// Simulated API response
const apiResponse = [
  { requestId: "123", assignedTo: "user1@example.com", modelName: "ModelA" },
  { requestId: "123", assignedTo: "user2@example.com", modelName: "ModelB" },
  { requestId: "456", assignedTo: "user3@example.com", modelName: "ModelC" },
  { requestId: "123", assignedTo: "user4@example.com", modelName: "ModelD" },
  { requestId: "789", assignedTo: "user5@example.com", modelName: "ModelE" },
];

// Function to consolidate `modelName` values
const consolidateRequests = (data) => {
  const result = {};

  data.forEach((item) => {
    const { requestId, modelName, ...rest } = item;

    // If requestId already exists, append the modelName
    if (result[requestId]) {
      result[requestId].modelName += `, ${modelName}`;
    } else {
      // Otherwise, create a new entry
      result[requestId] = { ...rest, requestId, modelName };
    }
  });

  // Convert the result object back into an array
  return Object.values(result);
};

// Get consolidated results
const consolidatedResults = consolidateRequests(apiResponse);

console.log(consolidatedResults);
