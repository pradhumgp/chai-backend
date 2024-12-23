import * as XLSX from "xlsx";

const generateExcelWithDropdown = () => {
  // Example data for the main sheet
  const data = [
    { Name: "Alice", Age: 25, Status: "" },
    { Name: "Bob", Age: 30, Status: "" },
    { Name: "Charlie", Age: 35, Status: "" },
  ];

  // Allowed values for the dropdown
  const dropdownValues = [["Approved"], ["Pending"], ["Rejected"]];

  // Convert main data into a worksheet
  const mainSheet = XLSX.utils.json_to_sheet(data);

  // Add the validation sheet to hold dropdown values
  const validationSheet = XLSX.utils.aoa_to_sheet(dropdownValues);

  // Reference the range in the validation sheet
  const validationRange = "'Validation'!$A$1:$A$3";

  // Apply validation to the "Status" column
  mainSheet["!dataValidations"] = [
    {
      ref: "C2:C100", // Status column range (C2 to C100)
      type: "list", // List validation type
      formula1: validationRange, // Reference dropdown values in Validation sheet
      showDropDown: true, // Show dropdown
      allowBlank: false, // Prevent blank cells
      showErrorMessage: true, // Display error message for invalid inputs
      errorTitle: "Invalid Input",
      error: "Please select a valid option: Approved, Pending, Rejected.",
    },
  ];

  // Create a new workbook
  const wb = XLSX.utils.book_new();

  // Add both sheets to the workbook
  XLSX.utils.book_append_sheet(wb, mainSheet, "Data"); // Main sheet
  XLSX.utils.book_append_sheet(wb, validationSheet, "Validation"); // Validation sheet

  // Hide the validation sheet
  validationSheet["!hidden"] = true;

  // Write the workbook to an Excel file and trigger download
  XLSX.writeFile(wb, "DropdownValidation.xlsx");
};

export default generateExcelWithDropdown;
