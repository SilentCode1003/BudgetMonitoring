import React, { useRef, useEffect, useState } from 'react';
import { Row, Col, Card, Table, Button } from 'react-bootstrap';
import { formatBudget } from '../repository/helper';
import CheckboxTable from './checkBoxTable';

export default function ReimburseTable({ reimburse, handleClearReimburse, handleRemoveReimburse }) {
  const tableRef = useRef(null);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    adjustTableHeight();
    calculateTotalPrice();
    window.addEventListener('resize', adjustTableHeight);
    return () => {
      window.removeEventListener('resize', adjustTableHeight);
    };
  }, [reimburse]);

  const adjustTableHeight = () => {
    if (tableRef.current) {
      const tableBody = tableRef.current.querySelector('tbody');
      if (tableBody) {
        const maxHeight = reimburse.length > 4 ? '400px' : 'auto';
        tableBody.style.maxHeight = maxHeight;
      }
    }
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    reimburse.forEach((item) => {
      totalPrice += parseFloat(item.price);
    });
    setTotalPrice(totalPrice);
  };  

  const handleRemoveAndCalculatePrice = (index) => {
    handleRemoveReimburse(index);
    calculateTotalPrice();
  };

  return (
    <>
      <Col className="mt-3">
        <div className="dynamic-title-card">
          <Row>
            <Col className='mt-2 mb-2'>
              <Card.Title>Reimburse Details</Card.Title>
            </Col>
            <Col className='mt-2 mb-2'>
              <h5 className='white-text dynamic'>Total Fare: {formatBudget(totalPrice)}</h5>
            </Col>
          </Row>
        </div>
        <Card className='dynamic-card reimburse-card-height'>
          <Card.Body className="Reimburse-table">
            <div className="table-wrapper-1" ref={tableRef}>
              <Table striped>
                <thead>
                  <tr>
                    <th>Location</th>
                    <th>Origin</th>
                    <th>Destination</th>
                    <th>Mode of Transportation</th>
                    <th>Fare</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {reimburse.length === 0? (
                    <tr>
                      <td colSpan="6">There's no current request</td>
                    </tr>):(
                    reimburse.map((reimburse, index) => (
                      <tr key={index}>
                        <td>{reimburse.location}</td>
                        <td>{reimburse.origin}</td>
                        <td>{reimburse.destination}</td>
                        <td>{reimburse.modeTransaction}</td>
                        <td>{reimburse.price}</td>
                        <td>
                          <Button variant="outline-danger" onClick={() => handleRemoveAndCalculatePrice(index)}>
                            Remove
                          </Button>
                        </td>
                      </tr>
                  ))
                )}
                </tbody>
              </Table>
            </div>
            <div className="button-container d-flex justify-content-end mt-2">
              <Button variant="outline-danger mr-2" onClick={handleClearReimburse}>
                Clear Table
              </Button>{' '}
              <Button variant="outline-danger">
                Submit
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
}
