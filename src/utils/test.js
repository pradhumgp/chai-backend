import React from "react";
import DataTable from "react-data-table-component";

const MyTable = ({ data }) => {
  const columns = [
    { name: "ID", selector: (row) => row.id, sortable: true },
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Age", selector: (row) => row.age, sortable: true },
  ];

  return (
    <DataTable
      columns={columns}
      data={data.length > 0 ? data : []}
      noDataComponent={
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {columns.map((col, index) => (
                <th key={index} style={{ border: "1px solid #ccc", padding: "8px", textAlign: "left" }}>
                  {col.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={columns.length} style={{ padding: "10px", textAlign: "center", color: "#666" }}>
                No data available
              </td>
            </tr>
          </tbody>
        </table>
      }
    />
  );
};

export default MyTable;