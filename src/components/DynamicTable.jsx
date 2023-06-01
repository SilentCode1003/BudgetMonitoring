import React from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Row  from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const DynamicTable = ({ columns, data }) => {
  return (
    <>
      <Row className='mt-4'>
        <Col>
            <Card>
                <Card.Body>
                    <Card.Title>
                        Reimbursement Table
                    </Card.Title>
                    <Table>
                        <thead>
                            <tr>
                            {columns.map((column, index) => (
                                <th key={index}>{formatHeader(column)}</th>
                            ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, rowIndex) => (
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
