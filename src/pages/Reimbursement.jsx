import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { Container, Card, Row, Col, Form, Button } from 'react-bootstrap';
import { validateNumberInput } from '../components/RequestFunctions';
import { handleAddReimbursement, handleRemoveReimburse, handleClearReimburse } from '../components/ReimbursementFunctions';
import { useGetLocation } from '../API/request/getLocation';
import { useGetOrigin } from '../API/request/getOrigin';
import { usePostDestination } from '../API/submit/postDestination';
import ReimburseEditBtn from '../components/ReimburseEditBtn';
import DropdownInput from '../components/Dropdown-input';
import Dropdown from '../components/Dropdown';
import ReimburseTable from '../components/ReimburseTable';
import DynamicTable from '../components/DynamicTable';
import Data from '../MOCK_DATA2.json';

const Reimbursement = () => {
  const [locationDropdownValue, setLocationDropdownValue] = useState('');
  const [originDropdownValue, setOriginDropdownValue] = useState('');
  const [destinationDropdownValue, setDestinationDropdownValue] = useState('');
  const [modeTransportationDropdownValue, setModeTransportationDropdownValue] = useState('');
  const [reimburse, setReimburse] = useState([]);

  const { mutate, isLoading: isDestinationLoading, isError: isDestinationError, data: destinationData, error: destinationError } = usePostDestination();

  const tableHeader = ['ID', 'Date', 'Request ID', 'Request By', 'Request Date', 'Details', 'Status'];
  const tableData = Data;

  const getLocation = useGetLocation()?.data?.data || [];
  const filterLocationNames = getLocation.map((item) => item.locationname);

  const getOrigin = useGetOrigin()?.data?.data || [];
  const filterOrigin = getOrigin.map((item) => item.origin)
  console.log(filterOrigin);
  const tester = [];

  const filterDestination = destinationData?.data || [];
  const destination = filterDestination.map((item) => item.destination);
  console.log(destination);

  useEffect(() => {
    const handPostDestination = async () => {
      const origin = {
        origin: originDropdownValue,
      };
      await mutate(origin);
      setDestinationDropdownValue(''); 
    };

    if (originDropdownValue) {
      handPostDestination();
    }
  }, [originDropdownValue, mutate]);
  
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
    validateNumberInput();
  }, []);

  const handleRemoveReimburseClick = (index) => {
    console.log('Remove Successful');
    handleRemoveReimburse(index, reimburse, setReimburse);
  };

  const handleClearReimburseClick = () => {
    console.log('Clear Successful');
    handleClearReimburse(setReimburse);
  };

  const renderButtons = (row) => {
    return (
      <>
        <ReimburseEditBtn></ReimburseEditBtn>
      </>
    );
  };

  return (
    <>
      <Row>
        <Col md={6} className="mt-4">
          <div className="dynamic-title-card">
            <Row>
              <Col className='mt-2 mb-2' >
                <Card.Title>Reimbursement</Card.Title>
              </Col>
            </Row>
          </div>
          <Card className='dynamic-card'>
            <Card.Body>
              {filterLocationNames.length > 0 ? (
                <Dropdown
                  options={filterLocationNames}
                  defaultOption="-- Select Location --"
                  value={locationDropdownValue}
                  setValue={setLocationDropdownValue}
                />
              ) : (
                <button className="btn-primary w-100 dropdown-display mt-2" disabled>
                  No Location Available
                </button>
              )}
              {filterOrigin.length > 0?(
                <Dropdown
                  options={filterOrigin}
                  defaultOption="-- Select Origin --"
                  value={originDropdownValue}
                  setValue={setOriginDropdownValue}
                />
              ):(
                <button className="btn-primary w-100 dropdown-display mt-2" disabled>
                No Origin Available
              </button>
              )}
              {!isDestinationLoading && !isDestinationError && (
                <div>
                  <DropdownInput
                    options={destination}
                    defaultOption="--- Select/Input Destination ---"
                    value={destinationDropdownValue}
                    setValue={setDestinationDropdownValue}
                  />
                </div>
              )}
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
        <DynamicTable title={"Reimbursement Table"} header={tableHeader} data={tableData} renderButtons={renderButtons} />
      </div>
    </>
  );
};

export default Reimbursement;
