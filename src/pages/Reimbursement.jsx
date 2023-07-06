import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { Container, Card, Row, Col, Form, Button } from 'react-bootstrap';
import Dropdown from '../components/Dropdown';
import ReimburseTable from '../components/ReimburseTable';
import { validateNumberInput } from '../components/RequestFunctions';
import { handleAddReimbursement, handleRemoveReimburse, handleClearReimburse } from '../components/ReimbursementFunctions';
import DynamicTable from '../components/DynamicTable';
import Data from '../MOCK_DATA2.json';
import { useGetConcern } from '../API/request/getConcern';
import ReimburseEditBtn from '../components/ReimburseEditBtn';

const Reimbursement = () => {
  const tableHeader = ['ID', 'Date', 'Request ID', 'Request By', 'Request Date', 'Details', 'Status'];
  const tableData = Data;
  const concerns = useGetConcern();

  const [locationDropdownValue, setLocationDropdownValue] = useState('');
  const [originDropdownValue, setOriginDropdownValue] = useState('');
  const [destinationDropdownValue, setDestinationDropdownValue] = useState('');
  const [modeTransactionDropdownValue, setModeTransactionDropdownValue] = useState('');
  const [reimburse, setReimburse] = useState([]);

  const locationDropdown = ['Pacita', 'Sta. Rosa', 'San Pedro', 'Calamba', 'Manila'];
  const originDropdown = ['Manila', 'Cavite', 'Batangas', 'Quezon'];
  const destinationDropdown = ['Lucena', 'Buenavista', 'Gumaca', 'Sta. Rosa'];
  const modeTransactionDropdown = ['Bus', 'Jeep', 'Van'];

  const handleAddReimbursementClick = () => {
    handleAddReimbursement(
        locationDropdownValue,
        originDropdownValue,
        destinationDropdownValue,
        modeTransactionDropdownValue,
        reimburse,
        setReimburse,
        setLocationDropdownValue,
        setOriginDropdownValue,
        setDestinationDropdownValue,
        setModeTransactionDropdownValue,
    );
  };

  useEffect(() => {
    console.log(concerns);
    validateNumberInput();
  }, []);

  const handleRemoveReimburseClick = (index) => {
    console.log('Remove Succesful');
    handleRemoveReimburse(index, reimburse, setReimburse);
  };

  const handleClearReimburseClick = () => {
    console.log('Clear Succesful');
    handleClearReimburse(setReimburse);
  };

  const renderButtons = (row) => {
    return(
      <>
        <ReimburseEditBtn></ReimburseEditBtn>
      </>
    );
  }

  return (
    <>
        <Row>
          <Col  md={5} className="mt-4">
            <Card>
              <Card.Body>
                <Card.Title>Reimbursement</Card.Title>
                <Dropdown
                  options={locationDropdown}
                  defaultOption="-- Select Location --"
                  value={locationDropdownValue}
                  setValue={setLocationDropdownValue}
                />
                <Dropdown
                  options={originDropdown}
                  defaultOption="-- Select Origin --"
                  value={originDropdownValue}
                  setValue={setOriginDropdownValue}
                />
                <Dropdown
                  options={destinationDropdown}
                  defaultOption="-- Select Destination --"
                  value={destinationDropdownValue}
                  setValue={setDestinationDropdownValue}
                />
                <Dropdown
                  options={modeTransactionDropdown}
                  defaultOption="-- Select Mode of Transaction --"
                  value={modeTransactionDropdownValue}
                  setValue={setModeTransactionDropdownValue}
                />
                <Form className="justify-content-center mt-2">
                  <Form.Group>
                    <Form.Control className='number-validator' id="#" placeholder="Enter Price" />
                  </Form.Group>
                </Form>
                <div className="button-container d-flex justify-content-end mt-2">
                  <Button
                    variant="outline-danger"
                    onClick={handleAddReimbursementClick}
                  >
                    ADD
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <ReimburseTable
            reimburse={reimburse}
            handleRemoveReimburse={handleRemoveReimburseClick}
            handleClearReimburse={handleClearReimburseClick}
        />

        </Row>
        <div className='reimbursement-table'>
          <DynamicTable title={"Reimbursement Table"} header={tableHeader} data={tableData} renderButtons={renderButtons}/>
        </div>
    </>
  );
};

export default Reimbursement;