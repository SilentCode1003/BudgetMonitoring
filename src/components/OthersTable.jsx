import React, { useRef, useEffect, useState } from 'react';
import { Row, Col, Card, Table, Button } from 'react-bootstrap';
import { formatBudget } from '../repository/helper';

export default function OthersTable({ others, handleClearOthersData, handleRemoveOthersData }) {
  const tableRef = useRef(null);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    adjustTableHeight();
    calculateTotalCost();
    window.addEventListener('resize', adjustTableHeight);
    return () => {
      window.removeEventListener('resize', adjustTableHeight);
    };
  }, [others]);

  const calculateTotalCost = () => {
    let totalCost = 0;
    others.forEach((item) => {
      totalCost += parseFloat(item.typePrice);
    });
    setTotalCost(totalCost);
  };

  const adjustTableHeight = () => {
    if (tableRef.current) {
      const tableBody = tableRef.current.querySelector('tbody');
      if (tableBody) {
        const maxHeight = others.length > 4 ? '400px' : 'auto';
        tableBody.style.maxHeight = maxHeight;
      }
    }
  };

  const handleRemoveAndCalculateCost = (index) => {
    handleRemoveOthersData(index);
    calculateTotalCost();
  };

  return (
    <>
      <Col className="mt-2">
        <div className="dynamic-title-card">
          <Row>
            <Col className="mt-2 mb-2">
              <Card.Title>Others Details</Card.Title>
            </Col>
            <Col className="mt-2 mb-2">
              <h5 className="white-text dynamic">Total Fare: {formatBudget(totalCost)}</h5>
            </Col>
          </Row>
        </div>
        <Card className="dynamic-card reimburse-card-height">
          <Card.Body className="Reimburse-table">
            <div className="table-wrapper-1" ref={tableRef}>
              <Table striped>
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Cost</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {others.length === 0 ? (
                    <tr>
                      <td colSpan="3">There's no current data</td>
                    </tr>
                  ) : (
                    others.map((other, index) => (
                      <tr key={index}>
                        <td>{other.type}</td>
                        <td>{other.typePrice}</td>
                        <td>
                          <Button variant="outline-danger" onClick={() => handleRemoveAndCalculateCost(index)}>
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
              <Button variant="outline-danger mr-2" onClick={handleClearOthersData}>
                Clear Table
              </Button>{' '}
            </div>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
}
