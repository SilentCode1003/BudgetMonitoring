import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { Container, Card, Row, Col, Form, Button } from 'react-bootstrap';
import Dropdown from '../components/Dropdown';
import RequestTable from '../components/Request-table';
import { handleAddRequest, handleRemoveRequest, handleClearRequests, validateNumberInput } from '../components/RequestFunctions';
import DynamicTable from '../components/DynamicTable';
import { useGetConcern } from '../API/request/getConcern';
import { useGetClientName } from '../API/request/getStoreName';
import { useGetIssue } from '../API/request/getIssue';
import ReimburseBtn from '../components/ReimburseBtn';

const Request = () => {
  const concerns = useGetConcern();
  const concernNames = concerns.data?.data.map((item) => item.concernname) || [];
  const client = useGetClientName();
  const clientStoreName = client.data?.data.map((item) => item.fullname) || [];
  const issues = useGetIssue();
  const issueData = issues.data?.data || [];

  const tableHeader = ['ID', 'Request Date', 'Request By', 'Details', 'Status', 'Actions'];
  const tableData = [
    { ID: '1001', 'Request Date': '29/05/2023', 'Request By': 'Ralph Lauren Santos', Details:'Something', Status: 'Active', Actions: 'Something' },
    { ID: '1002', 'Request Date': '29/05/2023', 'Request By': 'Ralph Lauren Santos', Details:'Something', Status: 'Active', Actions: 'Something' },
    { ID: '1003', 'Request Date': '29/05/2023', 'Request By': 'Ralph Lauren Santos', Details:'Something', Status: 'Active', Actions: 'Something' },
    { ID: '1004', 'Request Date': '29/05/2023', 'Request By': 'Ralph Lauren Santos', Details:'Something', Status: 'Active', Actions: 'Something' },
    { ID: '1005', 'Request Date': '29/05/2023', 'Request By': 'Ralph Lauren Santos', Details:'Something', Status: 'Active', Actions: 'Something' },
    { ID: '1006', 'Request Date': '29/05/2023', 'Request By': 'Ralph Lauren Santos', Details:'Something', Status: 'Active', Actions: 'Something' },
    { ID: '1007', 'Request Date': '29/05/2023', 'Request By': 'Ralph Lauren Santos', Details:'Something', Status: 'Active', Actions: 'Something' },
    { ID: '1008', 'Request Date': '29/05/2023', 'Request By': 'Ralph Lauren Santos', Details:'Something', Status: 'Active', Actions: 'Something' },
    { ID: '1009', 'Request Date': '29/05/2023', 'Request By': 'Ralph Lauren Santos', Details:'Something', Status: 'Active', Actions: 'Something' },
    { ID: '1010', 'Request Date': '29/05/2023', 'Request By': 'Ralph Lauren Santos', Details:'Something', Status: 'Active', Actions: 'Something' },
    { ID: '1011', 'Request Date': '29/05/2023', 'Request By': 'Ralph Lauren Santos', Details:'Something', Status: 'Active', Actions: 'Something' },
    { ID: '1012', 'Request Date': '29/05/2023', 'Request By': 'Ralph Lauren Santos', Details:'Something', Status: 'Active', Actions: 'Something' },
    { ID: '1013', 'Request Date': '29/05/2023', 'Request By': 'Ralph Lauren Santos', Details:'Something', Status: 'Active', Actions: 'Something' },
    { ID: '1014', 'Request Date': '29/05/2023', 'Request By': 'Ralph Lauren Santos', Details:'Something', Status: 'Active', Actions: 'Something' },
  ];

  const [storeDropdownValue, setStoreDropdownValue] = useState('');
  const [issueDropdownValue, setIssueDropdownValue] = useState('');
  const [concernDropdownValue, setConcernDropdownValue] = useState('');
  const [filteredIssues, setFilteredIssues] = useState([]);
  const [filteredIssueNames, setFilteredIssueNames] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (concernDropdownValue) {
      const filteredIssues = issueData.filter(
        (issue) => issue.concernname === concernDropdownValue
      );
      const issueNames = filteredIssues.map((issue) => issue.issuename);
      setFilteredIssues(filteredIssues);
      setFilteredIssueNames(issueNames);
      setIssueDropdownValue(''); 
    } else {
      setFilteredIssues([]); 
      setFilteredIssueNames([]); 
      setIssueDropdownValue(''); 
    }
  }, [concernDropdownValue, issueData]);
  

  const handleConcernChange = (value) => {
    setConcernDropdownValue(value);
    setIssueDropdownValue('');
  };

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
                {clientStoreName.length > 0 ?(
                  <Dropdown
                  options={clientStoreName}
                  defaultOption="--- Select Store Name ---"
                  value={storeDropdownValue}
                  setValue={setStoreDropdownValue}
                />
                ):(
                  <button className='btn-primary w-100 dropdown-display' disabled>
                  No Store Name Available
                </button>
                )}
                {concernNames.length > 0 ? (
                  <Dropdown
                    options={concernNames}
                    defaultOption="--- Select Concern ---"
                    value={concernDropdownValue}
                    setValue={handleConcernChange}
                  />
                ) : (
                  <button className='btn-primary w-100 dropdown-display mt-2' disabled>
                    No Concern Available
                  </button>
                )}
                {filteredIssueNames.length > 0 ? (
                <Dropdown
                  options={filteredIssueNames}
                  defaultOption={
                    issueDropdownValue && filteredIssueNames.includes(issueDropdownValue)
                      ? issueDropdownValue
                      : '--- Select Issue ---'
                  }
                  value={issueDropdownValue}
                  setValue={setIssueDropdownValue}
                />
              ) : (
                <button className='btn-primary w-100 dropdown-display mt-2' disabled>
                    No Issue Available
                </button>
              )}
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
        <div className='reimbursement-table'>
          <DynamicTable title={"Reimbursement Table"} header={tableHeader} data={tableData} />
        </div>
    </>
  );
};

export default Request;
