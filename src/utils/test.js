import * as XLSX from "xlsx";

const generateExcelWithStrictValidation = () => {
  // Main data for the Excel sheet
  const data = [
    { Name: "Alice", Age: 25, Status: "Approved" },
    { Name: "Bob", Age: 30, Status: "Pending" },
    { Name: "Charlie", Age: 35, Status: "Rejected" },
  ];

  // Convert main data into a worksheet
  const mainSheet = XLSX.utils.json_to_sheet(data);

  // Hidden sheet with allowed dropdown values
  const validationData = [["Approved"], ["Pending"], ["Rejected"]];
  const hiddenSheet = XLSX.utils.aoa_to_sheet(validationData);

  // Add hidden sheet to the workbook
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, mainSheet, "Data");
  XLSX.utils.book_append_sheet(wb, hiddenSheet, "Validation");

  // Hide the validation sheet
  hiddenSheet["!hidden"] = true;

  // Apply dropdown validation to the 'Status' column
  mainSheet["!dataValidations"] = [
    {
      type: "list",
      ref: "C2:C100", // Apply to the Status column (C), rows 2-100
      formula1: "'Validation'!$A$1:$A$3", // Reference hidden sheet range
      showErrorMessage: true,
      errorTitle: "Invalid Value",
      error: "Select a value from the dropdown: Approved, Pending, Rejected.",
    },
  ];

  // Generate and trigger download of the Excel file
  XLSX.writeFile(wb, "StrictValidationData.xlsx");
};

export default generateExcelWithStrictValidation;
