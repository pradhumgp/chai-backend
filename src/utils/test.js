// Simulated API response
const apiResponse = [
  { requestId: "123", assignedTo: "user1@example.com", data: "A" },
  { requestId: "123", assignedTo: "user2@example.com", data: "B" },
  { requestId: "456", assignedTo: "user3@example.com", data: "C" },
  { requestId: "123", assignedTo: "user4@example.com", data: "D" },
  { requestId: "789", assignedTo: "user5@example.com", data: "E" },
];

// Filter function to keep only one object per `requestId`
const uniqueRequests = (data) => {
  const seen = new Set();
  return data.filter((item) => {
    if (seen.has(item.requestId)) {
      return false; // Skip if requestId is already seen
    }
    seen.add(item.requestId);
    return true; // Include if requestId is not seen yet
  });
};

// Get filtered results
const filteredResults = uniqueRequests(apiResponse);

console.log(filteredResults);