import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Form, Button } from 'react-bootstrap';
import { validateNumberInput } from '../components/RequestFunctions';
import { handleAddReimbursement, handleRemoveReimburse, handleClearReimburse } from '../components/ReimbursementFunctions';
import { useGetLocation } from '../API/request/getLocation';
import { useGetOrigin } from '../API/request/getOrigin';
import { useGetTransportation } from '../API/request/getTransportation';
import { usePostDestination } from '../API/submit/postDestination';
import { usePostTranportationPrice } from '../API/submit/postPriceTranportation';
import { formatBudget } from '../repository/helper';
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
  const [totalPrice, setTotalPrice] = useState('');
  const [isPriceDisabled, setIsPriceDisabled] = useState(totalPrice !== '' && parseFloat(totalPrice) > 0);
  const [reimburse, setReimburse] = useState([]);
  
  const { mutate, isLoading: isDestinationLoading, isError: isDestinationError, data: destinationData, error: destinationError } = usePostDestination();

  const tableHeader = ['ID', 'Date', 'Request ID', 'Request By', 'Request Date', 'Details', 'Status'];
  const tableData = Data;

  const getLocation = useGetLocation()?.data?.data || [];
  const filterLocationNames = getLocation.map((item) => item.locationname);

  const getOrigin = useGetOrigin()?.data?.data || [];
  const filterOrigin = getOrigin.map((item) => item.origin);

  const filterDestination = destinationData?.data || [];
  const destination = filterDestination.map((item) => item.destination);

  const getTransportation = useGetTransportation()?.data?.data || [];
  const filterTransportation = getTransportation.map((item) => item.transportationname);

  const postTransportationPrice = usePostTranportationPrice();
  const getTransportationPrice = postTransportationPrice?.data?.data || [];
  const filterTransportationPrice = getTransportationPrice.map((item) => item.currentprice);
  //console.log(postTransportationPrice)
  //console.log(getTransportationPrice)
  console.log(filterTransportationPrice)

  useEffect(() => {
    setTotalPrice('');
  }, [destinationDropdownValue]);

  useEffect(() => {
    setTotalPrice('');
  }, [locationDropdownValue, originDropdownValue, destinationDropdownValue, modeTransportationDropdownValue]);  

  useEffect(() => {
    if (filterTransportationPrice.length > 0 && parseFloat(filterTransportationPrice[0]) > 0) {
      setIsPriceDisabled(true);
    } else {
      setIsPriceDisabled(false);
    }
  }, [filterTransportationPrice, modeTransportationDropdownValue]);
  
  useEffect(() => {
    if (filterTransportationPrice.length > 0) {
      setTotalPrice(formatBudget(filterTransportationPrice[0]));
    }
  }, [filterTransportationPrice]);

  useEffect(() => {
    const handlePostDestination = async () => {
      const origin = {
        origin: originDropdownValue,
      };
      await mutate(origin);
      setDestinationDropdownValue(''); 
    };

    if (originDropdownValue) {
      handlePostDestination();
    }
  }, [originDropdownValue, mutate]);

  useEffect(() => {
    const handlePostPriceTransportation = async () => {
      console.log(originDropdownValue);
      const payload = {
        origin: originDropdownValue,
        destination: destinationDropdownValue,
        transportation: modeTransportationDropdownValue,
      };
      await postTransportationPrice.mutateAsync(payload);
    };
  
    if (originDropdownValue && destinationDropdownValue && modeTransportationDropdownValue) {
      handlePostPriceTransportation();
    }
  }, [originDropdownValue, destinationDropdownValue, modeTransportationDropdownValue]);
  
  const handleAddReimbursementClick = () => {
    handleAddReimbursement(
      locationDropdownValue,
      originDropdownValue,
      destinationDropdownValue,
      modeTransportationDropdownValue,
      reimburse,
      totalPrice,
      setReimburse,
      setLocationDropdownValue,
      setOriginDropdownValue,
      setDestinationDropdownValue,
      setModeTransportationDropdownValue,
      setTotalPrice
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
              {filterTransportation.length > 0? (
                  <Dropdown
                  options={filterTransportation}
                  defaultOption="-- Select Mode of Transportation --"
                  value={modeTransportationDropdownValue}
                  setValue={setModeTransportationDropdownValue}
                  />
              ):(
                <button className="btn-primary w-100 dropdown-display mt-2" disabled>
                  No Origin Available
                </button>
              )}
              <Form className="justify-content-center mt-2">
                <Form.Group>
                <Form.Control
  className='number-validator'
  id="totalPrice"
  placeholder="Enter Price"
  value={totalPrice}
  onChange={(e) => {
    if (isPriceDisabled) {
      setTotalPrice('');
    } else {
      setTotalPrice(e.target.value);
    }
  }}
  disabled={isPriceDisabled}
/>

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
