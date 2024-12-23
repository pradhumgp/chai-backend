import * as XLSX from "xlsx";

const generateExcelWithStrictValidation = () => {
  // Example data for the Excel file
  const data = [
    { Name: "Alice", Age: 25, Status: "Approved" },
    { Name: "Bob", Age: 30, Status: "Pending" },
    { Name: "Charlie", Age: 35, Status: "Rejected" },
  ];

  // Convert JSON data to a worksheet
  const ws = XLSX.utils.json_to_sheet(data);

  // Add data validation for the 'Status' column (C2:C100)
  ws["!dataValidations"] = [
    {
      ref: "C2:C100", // Range for validation: Column C, Rows 2-100
      type: "list", // List type validation
      formula1: '"Approved,Pending,Rejected"', // List of allowed values
      allowBlank: false, // Do not allow blank values
      showDropDown: true, // Show dropdown with allowed values
      showErrorMessage: true, // Show error message on invalid entry
      errorTitle: "Invalid Value",
      error: "You must select from: Approved, Pending, Rejected.",
    },
  ];

  // Create a workbook and add the worksheet
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Data");

  // Generate and trigger download of the Excel file
  XLSX.writeFile(wb, "StrictValidationData.xlsx");
};

export default generateExcelWithStrictValidation;
