import React, { useRef, useEffect } from 'react';
import { Col, Card, Table, Button } from 'react-bootstrap';

export default function RequestTable({ requests, handleClearRequests, handleRemoveRequest, budget, ticketId }) {
  const tableRef = useRef(null);

  useEffect(() => {
    adjustTableHeight();
    window.addEventListener('resize', adjustTableHeight);
    return () => {
      window.removeEventListener('resize', adjustTableHeight);
    };
  }, [requests]);

  const adjustTableHeight = () => {
    if (tableRef.current) {
      const tableBody = tableRef.current.querySelector('tbody');
      if (tableBody) {
        const maxHeight = requests.length > 4 ? '400px' : 'auto';
        tableBody.style.maxHeight = maxHeight;
      }
    }
  };

  const handleSubmitRequests = (requestedBy) => {
    const formattedRequests = requests.map((request) => ({
      ticketId: request.ticketId,
      storeName: request.store,
      concern: request.concern,
      issue: request.issue,
    }));

    const requestData = {
      budget: Number(budget),
      requestedBy,
      details: formattedRequests,
    };

    console.log(requestData);

    handleClearRequests();
  };

  //const formatBudget = (budget) => {
  //  const formattedBudget = Number(budget).toFixed(2);
  //  return `₱ ${formattedBudget}`;
  //};

  return (
    <>
      <Col className="mt-4">
        <Card>
          <Card.Body className="request-table">
            <Card.Title>Request Details</Card.Title>
            <div className="table-wrapper" ref={tableRef}>
              <Table striped>
                <thead>
                  <tr>
                    <th>Ticket ID</th>
                    <th>Store Name</th>
                    <th>Concern</th>
                    <th>Issue</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((request, index) => (
                    <tr key={index}>
                      <td>{request.ticketId}</td>
                      <td>{request.store}</td>
                      <td>{request.concern}</td>
                      <td>{request.issue}</td>
                      <td>
                        <Button variant="outline-danger" onClick={() => handleRemoveRequest(index)}>
                          Remove
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <div className="button-container d-flex justify-content-end mt-2">
              <Button variant="outline-danger mr-2" onClick={handleClearRequests}>
                Clear Requests
              </Button>{' '}
              <Button
                variant="outline-danger"
                onClick={() => handleSubmitRequests('Ralph')}
              >
                Submit Requests
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
}
