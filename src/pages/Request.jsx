import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { Container, Card, Row, Col, Form, Button } from 'react-bootstrap';
import Dropdown from '../components/dropdown';
import RequestTable from '../components/request-table';
import { handleAddRequest, handleRemoveRequest, handleClearRequests, validateNumberInput } from '../components/RequestFunctions';
import DynamicTable from '../components/DynamicTable';

const Request = () => {
  const tableColumns = ['ID', 'Request Date', 'Request By', 'Details', 'Status', 'Actions'];
  const tableData = [
    { ID: '1001', 'Request Date': '29/05/2023', 'Request By': 'Ralph Lauren Santos', Details:'Something', Status: 'Active', Actions: 'Something' },
  ];

  const [storeDropdownValue, setStoreDropdownValue] = useState('');
  const [issueDropdownValue, setIssueDropdownValue] = useState('');
  const [concernDropdownValue, setConcernDropdownValue] = useState('');
  const [requests, setRequests] = useState([]);

  const storeDropdown = ['Pacita', 'Sta. Rosa', 'San Pedro', 'Calamba', 'Manila'];
  const issueDropdown = ['POS', 'CLIQ', 'PC', 'Cable'];
  const concernDropdown = ['No Data', 'Faulty HDD', 'No Display', 'Hardware'];

  const handleAddRequestClick = () => {
    handleAddRequest(
      storeDropdownValue,
      issueDropdownValue,
      concernDropdownValue,
      requests,
      setRequests,
      setStoreDropdownValue,
      setIssueDropdownValue,
      setConcernDropdownValue
    );
  };

  useEffect(() => {
    validateNumberInput();
  }, []);

  const handleRemoveRequestClick = (index) => {
    handleRemoveRequest(index, requests, setRequests);
  };

  const handleClearRequestsClick = () => {
    handleClearRequests(setRequests);
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
                    <Form.Control className='number-validator' id="#" placeholder="Enter Budget..." />
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
                  <Button
                    variant="outline-danger"
                    onClick={handleAddRequestClick}
                  >
                    Add Request
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <RequestTable
            requests={requests}
            handleRemoveRequest={handleRemoveRequestClick}
            handleClearRequests={handleClearRequestsClick}
          />
        </Row>
      </Container>
        <div className='reimbursement-table'>
          <DynamicTable columns={tableColumns} data={tableData} />
        </div>
    </>
  );
};

export default Request;
