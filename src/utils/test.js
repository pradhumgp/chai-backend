function getColumnByHeader(worksheet, columnName) {
  const headerRow = worksheet.getRow(1); // Assuming the headers are in the first row
  let columnIndex = -1;

  // Find the column index for the given header
  headerRow.eachCell((cell, colNumber) => {
    if (cell.value === columnName) {
      columnIndex = colNumber;
    }
  });

  if (columnIndex === -1) {
    throw new Error(`Column "${columnName}" not found.`);
  }

  // Return all values in the column (excluding the header if needed)
  return worksheet.getColumn(columnIndex).values.slice(1); // Excludes the header row
}