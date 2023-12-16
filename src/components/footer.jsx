import React, { useState } from 'react';
import Header from './header';
import { Container, Card, Row, Col, Form, Button } from 'react-bootstrap';
import Dropdown from './Dropdown';
import RequestTable from './Request-table';
import Swal from 'sweetalert2';

function Request() {
  const [storeDropdownValue, setStoreDropdownValue] = useState('');
  const [issueDropdownValue, setIssueDropdownValue] = useState('');
  const [concernDropdownValue, setConcernDropdownValue] = useState('');
  const [requests, setRequests] = useState([]);

  const storeDropdown = ['Pacita', 'Sta. Rosa', 'San Pedro','Calamba', 'Manila'];
  const issueDropdown = ['POS', 'CLIQ', 'PC', 'Cable'];
  const concernDropdown = ['No Data', 'Faulty HDD', 'No Display', 'Hardware'];

  const handleAddRequest = () => {
    if (
      storeDropdownValue === '' ||
      issueDropdownValue === '' ||
      concernDropdownValue === ''
    ) {
      Swal.fire({
        title: 'Invalid Input',
        text: 'Please select values for all dropdowns.',
        icon: 'error',
      });
      return;
    }

    const isDuplicate = requests.some(
      (request) =>
        request.store === storeDropdownValue &&
        request.issue === issueDropdownValue &&
        request.concern === concernDropdownValue
    );

    if (isDuplicate) {
      Swal.fire({
        title: 'Duplicate Entry',
        text: 'This request already exists in the table.',
        icon: 'error',
      });
      return;
    }

    const newRequest = {
      store: storeDropdownValue,
      issue: issueDropdownValue,
      concern: concernDropdownValue,
    };

    setRequests([...requests, newRequest]);

    setStoreDropdownValue('');
    setIssueDropdownValue('');
    setConcernDropdownValue('');
  };

  const handleRemoveRequest = (index) => {
    const updatedRequests = [...requests];
    updatedRequests.splice(index, 1);
    setRequests(updatedRequests);
  };

  const handleClearRequests = () => {
    setRequests([]);
  };

  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col className="mt-4">
            <Card>
              <Card.Body>
                <Card.Title>Budget</Card.Title>
                <Form className="justify-content-center">
                  <Form.Group>
                    <Form.Control id="#" placeholder="Enter Budget..." />
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
            <Card className="mt-2">
              <Card.Body>
                <Card.Title>Store</Card.Title>
                <Dropdown
                  options={storeDropdown}
                  defaultOption="--- Select Store Name ---"
                  value={storeDropdownValue}
                  setValue={setStoreDropdownValue}
                />
                <Dropdown
                  options={issueDropdown}
                  defaultOption="--- Select Issue ---"
                  value={issueDropdownValue}
                  setValue={setIssueDropdownValue}
                />
                <Dropdown
                  options={concernDropdown}
                  defaultOption="--- Select Concern ---"
                  value={concernDropdownValue}
                  setValue={setConcernDropdownValue}
                />
                <div className="button-container d-flex justify-content-end mt-2">
                  <button
                    className="btn btn-outline-danger"
                    onClick={handleAddRequest}
                  >
                    Add Request
                  </button>
                </div>
              </Card.Body>
            </Card>
            <RequestTable
              requests={requests}
              handleRemoveRequest={handleRemoveRequest}
              handleClearRequests={handleClearRequests}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Request;

