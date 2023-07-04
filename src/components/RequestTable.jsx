import React, { useRef, useEffect, useState, useContext } from 'react';
import { Row, Col, Card, Table, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { usePostRequest } from '../API/submit/postRequest';
import { UserContext } from './userContext';

export default function RequestTable({ requests, handleClearRequests, handleRemoveRequest, budget,  setBudget }) {
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

    //console.log(requestData);
    try {
      const requestMsg = await postRequest.mutateAsync(requestData);
      if (requestMsg.msg === 'notreimburse'){
        Swal.fire({
          title: 'Notice!',
          text: 'Your request cannot be processed because you still have pending request.',
          icon: 'warning',
          confirmButtonText: 'OK',
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Success',
        text: 'Request Successfuly Submitted.',
        icon: 'success',
        confirmButtonText: 'OK',
      })
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
        <Card>
          <Card.Body className="request-table">
            <Row>
              <Col>
               <Card.Title>Request Details</Card.Title>         
              </Col>
              <Col>
                <h5 className='white-text'>Budget: {formatBudget(budget)}</h5>
              </Col>
            </Row>
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
