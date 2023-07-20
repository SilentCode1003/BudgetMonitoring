import React, { useRef, useEffect, useState, useContext } from 'react';
import { Row, Col, Card, Table, Button } from 'react-bootstrap';
import { formatBudget } from '../repository/helper';
import { usePostReimburse } from '../API/submit/postReimburse'
import { UserContext } from './userContext';
import Swal from 'sweetalert2';

export default function ReimburseTable({ reimburse, handleClearReimburse, handleRemoveReimburse, othersData, requestID }) {
  const tableRef = useRef(null);
  const [overallCost, setOverallCost] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const { userData } = useContext(UserContext);
  const employeeID = (userData && userData.employeeid);
  const postReimburse = usePostReimburse();
  console.log(othersData)
  console.log(reimburse)

  useEffect(() => {
    adjustTableHeight();
    calculateTotalPrice();
    calculateTotalCost();
    calculateOverallTotal();
    window.addEventListener('resize', adjustTableHeight);
    return () => {
      window.removeEventListener('resize', adjustTableHeight);
    };
  }, [reimburse, othersData, overallCost]);

/*reimbursementby
  requestid
  details={
    transportation{}
    others{}
  }
  totalreimburse 
*/
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    reimburse.forEach((item) => {
      totalPrice += parseFloat(item.price);
    });
    setTotalPrice(totalPrice);
  };  

  const calculateTotalCost = () => {
    let totalCost = 0;
    othersData.forEach((item) => {
      totalCost += parseFloat(item.typePrice);
    });
    setTotalCost(totalCost);
  };

  const calculateOverallTotal = () => {
    let overallCost = 0;
    overallCost = totalCost + totalPrice
    setOverallCost(overallCost);
  };

  console.log('total price: ', totalPrice)
  console.log('total cost: ', totalCost)
  console.log('Overall total: ', overallCost)
  const handleSubmitReimburse = async(requestedBy) => {
    if(reimburse.length === 0){
      Swal.fire('Error', 'Cannot submit empty reimbursement!', 'error');
      return;
    }

    const formattedReimburse = reimburse.map((reimbursed) => ({
      location: reimbursed.location,
      origin: reimbursed.origin,
      destination: reimbursed.destination,
      transportation: reimbursed.modeTransaction,
    }));

    const others = {
      transportation:formattedReimburse,
      others: othersData
    }

    const reimburseData = {
      reimburseby: requestedBy,
      requestid: requestID,
      details: JSON.stringify(others),
      totalreimburse: overallCost
    };

    try {
      const requestMsg = await postReimburse.mutateAsync(reimburseData);
      if (requestMsg.msg === 'success') {
        Swal.fire({
          title: 'Success',
          text: 'Reimburse Successfully Submitted.',
          icon: 'success',
          confirmButtonText: 'OK',
        })
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Failed to submit the request.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Failed to submit the request.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
   
  }

  const adjustTableHeight = () => {
    if (tableRef.current) {
      const tableBody = tableRef.current.querySelector('tbody');
      if (tableBody) {
        const maxHeight = reimburse.length > 4 ? '400px' : 'auto';
        tableBody.style.maxHeight = maxHeight;
      }
    }
  };

  const handleRemoveAndCalculatePrice = (index) => {
    handleRemoveReimburse(index);
    calculateTotalPrice();
  };

  return (
    <>
      <Col className="mt-3">
        <div className="dynamic-title-card">
          <Row>
            <Col className='mt-2 mb-2'>
              <Card.Title>Reimburse Details</Card.Title>
            </Col>
            <Col className='mt-2 mb-2'>
              <h5 className='white-text dynamic'>Total Fare: {formatBudget(totalPrice)}</h5>
            </Col>
          </Row>
        </div>
        <Card className='dynamic-card reimburse-card-height'>
          <Card.Body className="Reimburse-table">
            <div className="table-wrapper-1" ref={tableRef}>
              <Table striped>
                <thead>
                  <tr>
                    <th>Location</th>
                    <th>Origin</th>
                    <th>Destination</th>
                    <th>Mode of Transportation</th>
                    <th>Fare</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {reimburse.length === 0? (
                    <tr>
                      <td colSpan="6">There's no current request</td>
                    </tr>):(
                    reimburse.map((reimburse, index) => (
                      <tr key={index}>
                        <td>{reimburse.location}</td>
                        <td>{reimburse.origin}</td>
                        <td>{reimburse.destination}</td>
                        <td>{reimburse.modeTransaction}</td>
                        <td>{reimburse.price}</td>
                        <td>
                          <Button variant="outline-danger" onClick={() => handleRemoveAndCalculatePrice(index)}>
                            Remove
                          </Button>
                        </td>
                      </tr>
                  ))
                )}
                </tbody>
              </Table>
            </div>
            <div className="button-container d-flex justify-content-end mt-2">
              <Button variant="outline-danger mr-2" onClick={handleClearReimburse}>
                Clear Table
              </Button>{' '}
              <Button 
                variant="outline-danger"
                onClick={() => handleSubmitReimburse(employeeID)}>
                Submit Reimburse
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
}
