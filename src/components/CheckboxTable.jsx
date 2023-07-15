import React from 'react';
import Table from 'react-bootstrap/Table';

const CheckboxTable = ({ data, checkedRows, onCheckboxChange }) => {
  if (!data || data.length === 0) {
    return <div>No data available.</div>;
  }

  const columns = Object.keys(data[0]);

  return (
    <Table striped>
      <thead>
        <tr>
          <th className='CheckboxTable'>Status</th>
          <th className='CheckboxTable'>Location</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            <td>
              <input
                className='checkbox'
                type="checkbox"
                checked={checkedRows.includes(row)}
                onChange={() => onCheckboxChange(row)}
                disabled
              />
            </td>
            {columns.map((column, columnIndex) => (
              <td key={columnIndex}>{row[column]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CheckboxTable;
