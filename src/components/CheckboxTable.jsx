import React from 'react';
import Table from 'react-bootstrap/Table';

const CheckboxTable = ({ data, reimburseDestination }) => {
  if (!data || data.length === 0) {
    return <div>No data available.</div>;
  }

  const columns = Object.keys(data[0]);
  const destinations = reimburseDestination.map(item => item.destination);
  console.log(destinations);
  console.log(data);

  return (
    <>
      <div className="Checkbox-container">
        <Table striped>
          <thead>
            <tr>
              <th className='CheckboxTable'>Status</th>
              <th className='CheckboxTable'>Destination</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td>
                  <div className="custom-checkbox">
                    <input
                      className='checkbox'
                      type="checkbox"
                      readOnly
                      checked={destinations.includes(row.storename)}
                    />
                  </div>
                </td>
                {columns.map((column, columnIndex) => (
                  <td key={columnIndex}>{row[column]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default CheckboxTable;
