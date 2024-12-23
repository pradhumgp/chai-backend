import * as XLSX from "xlsx";

const generateExcelWithValidation = () => {
  // Example data for the Excel file
  const data = [
    { Name: "John Doe", Age: 28, Status: "Pending" },
    { Name: "Jane Smith", Age: 34, Status: "Approved" },
    { Name: "Mike Johnson", Age: 45, Status: "Rejected" },
  ];

  // Convert JSON data to an Excel worksheet
  const ws = XLSX.utils.json_to_sheet(data);

  // Add data validation for the 'Status' column (C2:C100)
  ws["!dataValidations"] = [
    {
      ref: "C2:C100", // Apply validation to column C (Status), rows 2-100
      type: "list", // List type validation
      formula1: '"Approved,Rejected,Pending"', // Allowed values
      showErrorMessage: true, // Show an error message on invalid entry
      errorTitle: "Invalid Input",
      error: "Please select a value from the dropdown: Approved, Rejected, Pending.",
    },
  ];

  // Create a new workbook and add the worksheet
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  // Generate and trigger download of the Excel file
  XLSX.writeFile(wb, "DataWithValidation.xlsx");
};

export default generateExcelWithValidation;
