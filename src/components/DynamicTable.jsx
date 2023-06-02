import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const DynamicTable = ({ title, columns, data }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter((row) => {
    const values = Object.values(row).join(' ').toLowerCase();
    return values.includes(searchTerm.toLowerCase());
  });

  return (
    <>
      <Row className='mt-4'>
        <Col>
          <Card>
            <Card.Body>
              <Row>
                <Col md={6}>
                <Card.Title>{title}</Card.Title>
                </Col>
                <Col md={6}>
                  <div className='mb-3'>
                  <input
                      type='text'
                      placeholder='Search'
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                  </div>
                </Col>
              </Row>
              <Table>
                <thead>
                  <tr>
                    {columns.map((column, index) => (
                      <th key={index}>{formatHeader(column)}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {columns.map((column, columnIndex) => (
                        <td key={columnIndex}>{row[column]}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

const formatHeader = (header) => {
  return header.replace(/\s+/g, ' ');
};

export default DynamicTable;
