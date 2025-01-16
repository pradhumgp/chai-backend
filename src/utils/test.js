const searchItems = async (req, res) => {
  try {
    // Assuming you have a `collection` instance for your MongoDB database
    const { query } = req.body;

    // Search the collection
    const items = await collection.find(query).toArray();

    // Process the items to group by `requestId`
    const groupedItems = items.reduce((acc, item) => {
      const { requestId, modelName } = item;

      // If this `requestId` already exists, append the `modelName`
      if (acc[requestId]) {
        acc[requestId].modelNames.push(modelName);
      } else {
        // Otherwise, initialize a new entry
        acc[requestId] = {
          ...item, // Keep other fields from the first occurrence
          modelNames: [modelName],
        };
      }

      return acc;
    }, {});

    // Transform the grouped items into an array of unique results
    const uniqueItems = Object.values(groupedItems).map((item) => ({
      ...item,
      modelName: item.modelNames.join(', '), // Combine modelNames into a comma-separated string
    }));

    res.status(200).json(uniqueItems);
  } catch (error) {
    console.error('Error searching items:', error);
    res.status(500).json({ message: 'An error occurred', error });
  }
};