const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet('Sheet1');

// Define the range for row 5
const rowIndex = 5;
const colStart = 1;  // Column A
const colEnd = 5;    // Column E (adjust as needed)

for (let col = colStart; col <= colEnd; col++) {
  const cell = worksheet.getCell(rowIndex, col);
  
  // Apply data validation to ensure the cell is not empty
  cell.dataValidation = {
    type: 'custom',
    formula1: `LEN(A${rowIndex})>0`,  // Adjust column reference if needed
    showErrorMessage: true,
    errorTitle: 'Invalid Entry',
    error: 'This field cannot be empty.',
  };
}