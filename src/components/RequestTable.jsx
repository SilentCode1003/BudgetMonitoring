import React, { useRef, useEffect, useState, useContext } from 'react';
import { Row, Col, Card, Table, Button } from 'react-bootstrap';
import { usePostRequest } from '../API/submit/postRequest';
import { UserContext } from './userContext';
import Swal from 'sweetalert2';

export default function RequestTable({ requests, handleRemoveRequest, handleClearRequests, budget, setBudget }) {
  const tableRef = useRef(null);
  const postRequest = usePostRequest();
  const postRequestMsg = postRequest.map
  const { userData } = useContext(UserContext);
  const employeeID = (userData && userData.employeeid);

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

  const handleSubmitRequests = async(requestedBy) => {
    if (requests.length === 0) {
      Swal.fire('Error', 'Cannot submit empty requests!', 'error');
      return;
    }
    
    const formattedRequests = requests.map((request) => ({
      ticketid: `SR-${request.ticketId}`,
      storename: request.store,
      concern: request.concern,
      issue: request.issue,
    }));

    const requestData = {
      budget: Number(budget),
      requestby: requestedBy,
      details: JSON.stringify(formattedRequests),
    };

    try {
      const requestMsg = await postRequest.mutateAsync(requestData);
      if (requestMsg.msg === 'notreimburse') {
        // ...existing code
      } else {
        Swal.fire({
          title: 'Success',
          text: 'Request Successfully Submitted.',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload(); // Reload the page
          }
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Failed to submit the request.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }

  };

  const formatBudget = (budget) => {
    const formattedBudget = Number(budget).toFixed(2);
    const [integerPart, decimalPart] = formattedBudget.split('.');
    const formattedIntegerPart = parseInt(integerPart).toLocaleString('en');
    return `₱ ${formattedIntegerPart}.${decimalPart}`;
  };

  return (
    <>
      <Col className="mt-4">
        <div className="dynamic-title-card">
          <Row>
            <Col className='mt-2 mb-2'>
              <Card.Title>Request Details</Card.Title>         
            </Col>
            <Col className='mt-2 mb-2'>
              <h5 className='white-text'>Budget: {formatBudget(budget)}</h5>
            </Col>
          </Row>
        </div>
        <Card className='dynamic-card request-card-height'>
          <Card.Body className="request-table">
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
                  {requests.length === 0 ? (
                    <tr>
                      <td colSpan="5">There's no current request</td>
                    </tr>
                  ) : (
                    requests.map((request, index) => (
                      <tr key={index}>
                        <td>{`SR-${request.ticketId}`}</td>
                        <td>{request.store}</td>
                        <td>{request.concern}</td>
                        <td>{request.issue}</td>
                        <td>
                          <Button variant="outline-danger" onClick={() => handleRemoveRequest(index)}>
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
              <Button variant="outline-danger mr-2" onClick={handleClearRequests}>
                Clear Requests
              </Button>{' '}
              <Button
                variant="outline-danger"
                onClick={() => handleSubmitRequests(employeeID)}
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
