import React, {useContext, useEffect} from "react";
import { Container, Card, Row, Col, Form, Button } from 'react-bootstrap';
import { CDBDataTable } from "cdbreact";
import DynamicTable from "../components/DynamicTable";
import { UserContext } from "../components/userContext";
import { usePostBalance } from "../API/submit/postPettyCash";
import { usePostBudget } from "../API/submit/postTotalRequest";
import { usePostTotalReimburse } from "../API/submit/postTotalReimburse";
import { formatBudget } from "../repository/helper";

export default function Index(){
    const { userData } = useContext(UserContext);
    const employee = userData && userData.employeeid;
    const pettyCash = usePostBalance();
    const totalPettyCash = pettyCash?.data?.data || [];

    const totalRequest = usePostBudget();
    const totalRequestData = totalRequest?.data?.data || [];
    const mapRequestBudget = totalRequestData.map((item)=> item.total);
    console.log(mapRequestBudget)

    const totalReimburse = usePostTotalReimburse();
    const totalReimburseData = totalReimburse?.data?.data || [];
    const mapReimburse = totalReimburseData.map((item)=> item.total);
    console.log(mapReimburse)

    
    const formattedBalance = totalPettyCash.map((item) => {
        const formattedItem = parseFloat(item.balance).toFixed(2);
        return formattedItem.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      });

    useEffect(() => {
        const handlePostBalance = async () => {
        const requestBudget = {
            employeeid: employee
        };
        await pettyCash.mutateAsync(requestBudget);
        };
    
        if (employee) {
        handlePostBalance();
        }
    }, [employee]);

    useEffect(() => {
    const handlePostBudget = async () => {
            const requestBudget = {
                requestby: employee
            };
            await totalRequest.mutateAsync(requestBudget);
            };
            
            if (employee) {
                handlePostBudget();
            }
        }, [employee]);

    useEffect(() => {
        const handlePostTotalReimburse = async () => {
            const requestTotalReimburse = {
                requestby: employee
            };
            await totalReimburse.mutateAsync(requestTotalReimburse);
            };
            
            if (employee) {
                handlePostTotalReimburse();
            }
        }, [employee]);

    const currentMonthReimburse = ['ID', 'Request Date', 'Request By', 'Details', 'Status'];
    const currentMonthReimburseData = [
        { ID: '1001', 'Request Date': '29/05/2023', 'Request By': 'Ralph Lauren Santos', Details:'Something', Status: 'Active'},
        { ID: '1002', 'Request Date': '02/06/2023', 'Request By': 'Ralph Lauren Santos', Details:'Something Else', Status: 'Inactive'},
    ];

    const currentMonthBudget = ['ID', 'Request Date', 'Request By', 'Details', 'Status'];
    const currentMonthBudgetData = [
        { ID: '1001', 'Request Date': '29/05/2023', 'Request By': 'Ralph Lauren Santos', Details:'Something', Status: 'Active'},
    ];
    return(
        <> 
            <Row className="mt-3">
                <Col md={4} className="dashboard-card-container">
                    <div className="dynamic-title-card">
                        <Row>
                            <Col className='mt-2 mb-2' >
                            <Card.Title>On-hand/Petty Cash</Card.Title>
                            </Col>
                        </Row>
                    </div>
                    <Card className="dynamic-card">
                        <Card.Body>
                            <h2>
                                ₱ {formattedBalance}
                            </h2>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="dashboard-card-container">
                    <div className="dynamic-title-card">
                        <Row>
                            <Col className='mt-2 mb-2' >
                            <Card.Title>Total Request</Card.Title>
                            </Col>
                        </Row>
                    </div>
                    <Card className="dynamic-card">
                        <Card.Body>
                            <h2>
                                {formatBudget(mapRequestBudget)}
                            </h2>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="dashboard-card-container">
                    <div className="dynamic-title-card">
                        <Row>
                            <Col className='mt-2 mb-2' >
                            <Card.Title>Total Reimbursed</Card.Title>
                            </Col>
                        </Row>
                    </div>
                    <Card className="dynamic-card">
                        <Card.Body>
                            <h2>
                            {formatBudget(mapReimburse)}
                            </h2>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <div className="">
                <DynamicTable title={"Current Month Budget Request"} header={currentMonthBudget} data={currentMonthBudgetData} />
            </div>
            <div className="">
                <DynamicTable title={"Current Month Reimburse"} header={currentMonthReimburse} data={currentMonthReimburseData} />
            </div>
        </>
    )
}