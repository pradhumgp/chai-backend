function generateUnionQuery(data) {
  const queries = Object.entries(data).map(([key, value]) => {
    const [name1, name2] = key.split("-");
    return `SELECT * FROM TABLE WHERE CODE = '${name1}' AND ${name2} = '${value}'`;
  });

  // Combine all queries with UNION
  return queries.join(" UNION ");
}

// Example usage
const formData = {
  "NAME-NAME2": "value1",
  "NAME3-NAME4": "value2",
  "NAME5-NAME6": "value3"
};

const resultQuery = generateUnionQuery(formData);
console.log(resultQuery);