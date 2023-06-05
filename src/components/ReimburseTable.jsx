import React, { useRef, useEffect } from 'react';
import { Col, Card, Table, Button } from 'react-bootstrap';

export default function ReimburseTable({ reimburse, handleClearReimburse, handleRemoveReimburse }) {
  const tableRef = useRef(null);

  useEffect(() => {
    adjustTableHeight();
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

  return (
    <>
      <Col className="mt-4">
        <Card>
          <Card.Body className="Reimburse-table">
            <Card.Title>Reimburse Details</Card.Title>
            <div className="table-wrapper" ref={tableRef}>
              <Table striped>
                <thead>
                  <tr>
                    <th>Location</th>
                    <th>Origin</th>
                    <th>Destination</th>
                    <th>Mode of Transaction</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {reimburse.map((reimburse, index) => (
                    <tr key={index}>
                      <td>{reimburse.location}</td>
                      <td>{reimburse.origin}</td>
                      <td>{reimburse.destination}</td>
                      <td>{reimburse.modeTransaction}</td>
                      <td>
                        <Button variant="outline-danger" onClick={() => handleRemoveReimburse(index)}>
                          Remove
                        </Button>
                      </td>
                    </tr>
                  ))}
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
