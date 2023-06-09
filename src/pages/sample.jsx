import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Form, Button } from 'react-bootstrap';
import Dropdown from '../components/Dropdown';
import { useGetConcern } from '../API/request/getConcern';
import { useGetClientName } from '../API/request/getStoreName';
import { useGetIssue } from '../API/request/getIssue';

const Sample = () => {
  const concerns = useGetConcern();
  const concernNames = concerns.data?.data.map((item) => item.concernname) || [];
  const client = useGetClientName();
  const clientStoreName = client.data?.data.map((item) => item.fullname) || [];

  const [storeDropdownValue, setStoreDropdownValue] = useState('');
  const [issueDropdownValue, setIssueDropdownValue] = useState('');
  const [concernDropdownValue, setConcernDropdownValue] = useState('');
  const [filteredIssues, setFilteredIssues] = useState([]);

  const issues = useGetIssue();
  const issueData = issues.data?.data || [];

  useEffect(() => {
    if (concernDropdownValue) {
      const filteredIssues = issueData.filter(
        (issue) => issue.concernname === concernDropdownValue
      );
      const issueNames = filteredIssues.map((issue) => issue.issuename);
      setFilteredIssues(issueNames);
      setIssueDropdownValue('');
    }
  }, [concernDropdownValue, issueData]);

  const handleConcernChange = (value) => {
    setConcernDropdownValue(value);
  };

  return (
    <>
      <Row>
        <Col className="mt-4">
          <Card className="mt-2">
            <Card.Body>
              <Card.Title>Store</Card.Title>
              {clientStoreName.length > 0 ? (
                <Dropdown
                  options={clientStoreName}
                  defaultOption="--- Select Store Name ---"
                  value={storeDropdownValue}
                  setValue={setStoreDropdownValue}
                />
              ) : (
                <div className="no-data"></div>
              )}
              {concernNames.length > 0 ? (
                <Dropdown
                  options={concernNames}
                  defaultOption="--- Select Concern ---"
                  value={concernDropdownValue}
                  setValue={handleConcernChange}
                />
              ) : (
                <div>No concerns available</div>
              )}
              {filteredIssues.length > 0 ? (
                <Dropdown
                  options={filteredIssues}
                  defaultOption="--- Select Issue ---"
                  value={issueDropdownValue}
                  setValue={setIssueDropdownValue}
                />
              ) : (
                <div>No issues available</div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Sample;
