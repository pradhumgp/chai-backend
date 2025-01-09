const XLSX = require("xlsx");

// Function to parse Excel and exclude hidden columns
function parseExcel(filePath) {
  // Read the workbook
  const workbook = XLSX.readFile(filePath);

  // Assuming the first sheet is the target
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  // Get column visibility info
  const colInfo = worksheet['!cols'] || []; // `!cols` holds column metadata

  // Convert worksheet to JSON
  const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }); // Convert to array of arrays

  // Filter out hidden columns
  const filteredData = jsonData.map(row =>
    row.filter((_, colIndex) => !(colInfo[colIndex] && colInfo[colIndex].hidden))
  );

  return filteredData;
}

// Usage example
const filePath = "./template.xlsx"; // Replace with your file path
const result = parseExcel(filePath);
console.log(result);
