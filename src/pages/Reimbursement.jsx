import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { Container, Card, Row, Col, Form, Button } from 'react-bootstrap';
import DropdownInput from '../components/Dropdown-input';
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
  const [modeTransportationDropdownValue, setModeTransportationDropdownValue] = useState('');
  const [reimburse, setReimburse] = useState([]);

  const locationDropdown = ['Pacita', 'Sta. Rosa', 'San Pedro', 'Calamba', 'Manila'];
  const originDropdown = ['Manila', 'Cavite', 'Batangas', 'Quezon'];
  const destinationDropdown = ['Lucena', 'Buenavista', 'Gumaca', 'Sta. Rosa', 'Pacita', 'Galleria', 'Caloocan', 'Lopez','Sta. Rosa', 'Pacita', 'Galleria', 'Caloocan', 'Lopez', ];
  const modeTransportationDropdown = ['Bus', 'Jeep', 'Van'];

  const handleAddReimbursementClick = () => {
    handleAddReimbursement(
        locationDropdownValue,
        originDropdownValue,
        destinationDropdownValue,
        modeTransportationDropdownValue,
        reimburse,
        setReimburse,
        setLocationDropdownValue,
        setOriginDropdownValue,
        setDestinationDropdownValue,
        setModeTransportationDropdownValue,
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
          <Col  md={6} className="mt-4">
            <div className="dynamic-title-card">
              <Row>
                <Col className='mt-2 mb-2' >
                  <Card.Title>Reimbursement</Card.Title>
                </Col>
              </Row>
            </div>
            <Card className='dynamic-card'>
              <Card.Body>
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
                <DropdownInput 
                  options={destinationDropdown}
                  defaultOption="-- Select/Input Destination --"
                  value={destinationDropdownValue}
                  setValue={setDestinationDropdownValue}
                />
                <Dropdown
                  options={modeTransportationDropdown}
                  defaultOption="-- Select Mode of Transportation --"
                  value={modeTransportationDropdownValue}
                  setValue={setModeTransportationDropdownValue}
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
          <Col md={6} className='mt-4'>
            <div className="dynamic-title-card">
              <Row>
                <Col className='mt-2 mb-2' >
                  <Card.Title>Location Lists</Card.Title>
                </Col>
              </Row>
            </div>
            <Card className='dynamic-card location-lists'>

            </Card>
          </Col>


        </Row>
        <ReimburseTable
            reimburse={reimburse}
            handleRemoveReimburse={handleRemoveReimburseClick}
            handleClearReimburse={handleClearReimburseClick}
          />
        <div className='reimbursement-table'>
          <DynamicTable title={"Reimbursement Table"} header={tableHeader} data={tableData} renderButtons={renderButtons}/>
        </div>
    </>
  );
};

export default Reimbursement;