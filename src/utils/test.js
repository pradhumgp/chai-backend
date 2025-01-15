function groupByXYZAndAddFields(data, additionalFields, fieldMapping) {
  // Rename fields based on fieldMapping
  const renamedData = data.map((item) => {
    const renamedItem = { ...item };
    for (const [oldField, newField] of Object.entries(fieldMapping)) {
      if (oldField in renamedItem) {
        renamedItem[newField] = renamedItem[oldField];
        delete renamedItem[oldField]; // Remove the old field
      }
    }
    return renamedItem;
  });

  // Group objects by the new field (e.g., 'category')
  const groupedMap = renamedData.reduce((acc, obj) => {
    const key = obj.category; // Adjust based on your renamed key
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push({ ...obj, ...additionalFields });
    return acc;
  }, {});

  // Convert grouped map to an array of arrays
  return Object.values(groupedMap);
}