import React, { useState, useEffect, useContext} from 'react';
import { Container, Card, Row, Col, Form, Button } from 'react-bootstrap';
import { validateNumberInput } from '../components/RequestFunctions';
import { handleAddReimbursement, handleRemoveReimburse, handleClearReimburse } from '../components/ReimbursementFunctions';
import { handleAddOthers, handleRemoveOthersData, handleClearOthersData } from '../components/OthersFunctions';
import OthersTable from '../components/othersTable';
import { useGetLocation } from '../API/request/getLocation';
import { usePostOrigin } from '../API/submit/postOrigin';
import { useGetTransportation } from '../API/request/getTransportation';
import { usePostDestination } from '../API/submit/postDestination';
import { usePostTranportationPrice } from '../API/submit/postPriceTranportation';
import { formatBudget } from '../repository/helper';
import { UserContext } from '../components/userContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { usePostLocationLists } from '../API/submit/postLocationLists';
import CheckboxTable from '../components/checkBoxTable';
import ReimburseEditBtn from '../components/ReimburseEditBtn';
import DropdownInput from '../components/Dropdown-input';
import Dropdown from '../components/dropdown';
import ReimburseTable from '../components/ReimburseTable';
import DynamicTable from '../components/DynamicTable';
import Data from '../MOCK_DATA2.json';
import Swal from 'sweetalert2';

const Reimbursement = () => {
  const { requestId } = useContext(UserContext);
  const [locationDropdownValue, setLocationDropdownValue] = useState('');
  const [originDropdownValue, setOriginDropdownValue] = useState('');
  const [destinationDropdownValue, setDestinationDropdownValue] = useState('');
  const [modeTransportationDropdownValue, setModeTransportationDropdownValue] = useState('');
  const [typeDropdownValue, setTypeDropdownValue] = useState('');
  const [typePriceDropdownValue, setTypePriceDropdownValue] = useState('');
  const [othersData, setOthersData] = useState([]);
  const [totalPrice, setTotalPrice] = useState('');
  const [reimburse, setReimburse] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  //console.log(requestId)
  useEffect(() => {
    if (requestId == null) {
      const timer = setTimeout(() => {
        Swal.fire({
          title: 'Notice',
          text: 'Please reimburse a request before entering this page.',
          icon: 'warning',
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/Request');
          }
        });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [requestId, navigate]);
  
  useEffect(() => {
    const reloadPage = () => {
      const hasReloaded = localStorage.getItem('reimbursementReloaded');
      if (!hasReloaded && location.state?.reload) {
        localStorage.setItem('reimbursementReloaded', 'true');
        window.location.reload();
      } else {
        localStorage.removeItem('reimbursementReloaded');
      }
    };

    reloadPage();
  }, [location]);

  const { mutate, isLoading: isDestinationLoading, isError: isDestinationError, data: destinationData, error: destinationError } = usePostDestination();

  const tableHeader = ['ID', 'Date', 'Request ID', 'Request By', 'Request Date', 'Details', 'Status'];
  const tableData = Data;
  const locationtest = [{storename:'Calamba'}, {storename:'Quezon'}, {storename:'Manila'}, {storename:'Cavite'}, {storename:'Laguna'}, {storename:'Batangas'}];
  const typeData = ['Hotel', 'Inn', 'Cafe']

  const getLocation = useGetLocation()?.data?.data || [];
  const filterLocationNames = getLocation.map((item) => item.locationname);

  const getOrigin = usePostOrigin();
  const originData = getOrigin?.data?.data || []
  const filterOrigin = originData.map((item) => item.origin);

  const filterDestination = destinationData?.data || [];
  const destination = filterDestination.map((item) => item.destination);

  const getTransportation = useGetTransportation()?.data?.data || [];
  const filterTransportation = getTransportation.map((item) => item.transportationname);

  const postTransportationPrice = usePostTranportationPrice();
  const getTransportationPrice = postTransportationPrice?.data?.data || [];
  const filterTransportationPrice = getTransportationPrice.map((item) => item.currentprice);
  
  const postLocationList = usePostLocationLists();
  const getLocationList = postLocationList?.data?.data || [];

  const [showOthersCard, setShowOthersCard] = useState(false);
  //console.log(getLocationList);

  //console.log(filterOrigin)

  //console.log(postTransportationPrice)
  //console.log(getTransportationPrice)
  //console.log(filterTransportationPrice)

  const handleShowOthersCard = () => {
    setShowOthersCard(true);
  };

  const handleHideOthersCard = () => {
    setShowOthersCard(false);
  };

  useEffect(() => {
    setTotalPrice('');
  }, [originDropdownValue, destinationDropdownValue, modeTransportationDropdownValue]);  
  
  useEffect(() => {
    if (filterTransportationPrice.length > 0) {
      setTotalPrice(filterTransportationPrice[0]);
    }
  }, [filterTransportationPrice]);

  useEffect(() => {
    const handlePostOrigin = async () => {
      const originPayload = {
        location: locationDropdownValue,
      };
      await getOrigin.mutateAsync(originPayload);
    };

    if (locationDropdownValue) {
      handlePostOrigin();
    }
  }, [locationDropdownValue]);

  useEffect(() => {
    const handlePostDestination = async () => {
      const origin = {
        origin: originDropdownValue,
      };
      await mutate(origin);
    };

    if (originDropdownValue) {
      handlePostDestination();
    }
  }, [originDropdownValue, mutate]);

  useEffect(() => {
    const handlePostPriceTransportation = async () => {
      //console.log(originDropdownValue);
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
  
  useEffect(() => {
    const handlePostLocationList = async () => {
    const locationLists = {
        requestid: requestId
    };
    await postLocationList.mutateAsync(locationLists);
    };

    if (requestId) {
    handlePostLocationList();
    }
  }, [requestId]);

  const handleAddOthersClick = () => {
    handleAddOthers(
      othersData,
      typeDropdownValue,
      typePriceDropdownValue,
      setOthersData,
      setTypeDropdownValue,
      setTypePriceDropdownValue
    );
  }

  const handleRemoveOthersDataClick = (index) => {
    console.log('Remove Successful');
    handleRemoveOthersData(index, othersData, setOthersData);
  }

  const handleClearOthersDataClick = () => {
    console.log('Clear Successful');
    handleClearOthersData(setOthersData);
  }

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
    setTotalPrice('');
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
                    onChange={(e) => setTotalPrice(e.target.value)}
                  />
                  </Form.Group>
              </Form>
              <div className="button-container d-flex justify-content-end mt-2">
                <Button variant="outline-danger mr-1" onClick={handleShowOthersCard}>
                  OTHERS
                </Button>
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
              <Col className='mt-2 mb-2' >
                <Card.Title>Request ID: {requestId}</Card.Title>
              </Col>
            </Row>
          </div>
          <Card className='dynamic-card location-lists'>
            <CheckboxTable 
              data={getLocationList} 
              reimburseDestination={reimburse}
            />
          </Card>
        </Col>
      </Row>

      {showOthersCard && (
        <Row>
          <OthersTable
            others={othersData}
            handleClearOthersData={handleClearOthersDataClick}
            handleRemoveOthersData={handleRemoveOthersDataClick}
          />
          <Col md={6} className="mt-2">
            <div className="dynamic-title-card">
              <Row>
                <Col className='mt-1 mb-2' >
                  <Card.Title>Others</Card.Title>
                </Col>
              </Row>
            </div>
            <Card className='dynamic-card'>
              <Card.Body>
                {filterTransportation.length > 0? (
                      <DropdownInput
                      options={typeData}
                      defaultOption="-- Select Type --"
                      value={typeDropdownValue}
                      setValue={setTypeDropdownValue}
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
                      id="typePriceDropdownValue"
                      placeholder="Enter Cost"
                      value={typePriceDropdownValue}
                      onChange={(e) => setTypePriceDropdownValue(e.target.value)}
                    />
                  </Form.Group>
                </Form>
              </Card.Body>
              <div className="button-container d-flex justify-content-end mt-2 mb-2 mr-2">
                <Button variant="outline-danger mr-1" onClick={handleHideOthersCard}>
                  Close
                </Button>
                <Button
                  variant="outline-danger"
                  onClick={handleAddOthersClick}
                >
                  ADD
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
        )}

      <ReimburseTable
        reimburse={reimburse}
        handleRemoveReimburse={handleRemoveReimburseClick}
        handleClearReimburse={handleClearReimburseClick}
        othersData={othersData}
        requestID={requestId}
      />
      <div className='reimbursement-table'>
        <DynamicTable title={"Reimbursement Table"} header={tableHeader} data={tableData} renderButtons={renderButtons} />
      </div>
    </>
  );
};

export default Reimbursement;
