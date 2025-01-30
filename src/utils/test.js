const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet('Sheet1');

// Define column name
const columnName = 'Email'; 

// Find the column index dynamically
const headerRow = worksheet.getRow(1);
let columnIndex;

headerRow.eachCell((cell, colNumber) => {
  if (cell.value === columnName) {
    columnIndex = colNumber;
  }
});

// If column is found, apply validation to all rows (from row 2 onward)
if (columnIndex) {
  for (let row = 2; row <= 100; row++) {  // Adjust row range as needed
    const cell = worksheet.getCell(row, columnIndex);

    cell.dataValidation = {
      type: 'custom',
      formula1: `LEN(${cell.address})>0`, // Ensure the cell is not empty
      allowBlank: false, // Disallow blank cells
      showErrorMessage: true,
      errorTitle: 'Missing Value',
      error: `The "${columnName}" field is required.`,
    };
  }
} else {
  console.error(`Column "${columnName}" not found.`);
}