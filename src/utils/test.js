const generateSQLQuery = (tableName, attributes) => {
  // Extract the keys and values from the object
  const queries = Object.entries(attributes).map(
    ([key, value]) =>
      `SELECT * FROM ${tableName} WHERE xyz='${key}' AND xyz2='${value}'`
  );

  // Join the queries with UNION
  return queries.join(" UNION ");
};

// Example usage
const attributes = {
  key1: "value1",
  key2: "value2",
  key3: "value3",
};

const tableName = "tablename";

// Generate the SQL query
const sqlQuery = generateSQLQuery(tableName, attributes);

console.log(sqlQuery);