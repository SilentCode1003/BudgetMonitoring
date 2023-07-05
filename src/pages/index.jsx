import React, {useContext, useEffect} from "react";
import { Container, Card, Row, Col, Form, Button } from 'react-bootstrap';
import { CDBDataTable } from "cdbreact";
import DynamicTable from "../components/DynamicTable";
import { UserContext } from "../components/userContext";
import { usePostBalance } from "../API/submit/postBalance";
import { usePostBudget } from "../API/submit/postBudget";

export default function Index(){
    const { userData } = useContext(UserContext);
    const employee = userData && userData.employeeid;
    const postBalance = usePostBalance();
    const balanceData = postBalance?.data?.data || [];
    const postBudget = usePostBudget();
    const budgetData = postBudget?.data?.data || [];
    
    const formattedBalance = balanceData.map((item) => {
        const formattedItem = parseFloat(item.balance).toFixed(2);
        return formattedItem.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      });
    
      const formattedBudget = budgetData.map((item) => {
        const formattedItem = parseFloat(item.balance).toFixed(2);
        return formattedItem.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      });

    useEffect(() => {
        const handlePostBalance = async () => {
          const requestBalance = {
            employeeid: employee
          };
          await postBalance.mutateAsync(requestBalance);
        };
      
        if (employee) {
          handlePostBalance();
        }
      }, [employee]);

      useEffect(() => {
        const handlePostBudget = async () => {
          const requestBudget = {
            employeeid: employee
          };
          await postBudget.mutateAsync(requestBudget);
        };
      
        if (employee) {
          handlePostBudget();
        }
      }, [employee]);

      console.log(formattedBalance)
      

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
                    <Card>
                        <Card.Body>
                            <Card.Title className="dashboard-text">
                                On-hand/Petty Cash
                            </Card.Title>
                            <h2 className="white-text">
                            ₱ {formattedBalance}
                            </h2>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="dashboard-card-container">
                    <Card>
                        <Card.Body>
                            <Card.Title className="dashboard-text">
                                Total Request
                            </Card.Title>
                            <h2 className="white-text">
                            ₱ {formattedBudget}
                            </h2>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="dashboard-card-container">
                    <Card>
                        <Card.Body>
                            <Card.Title className="dashboard-text">
                                Total Reimburse
                            </Card.Title>
                            <h2 className="white-text">
                            ₱ 20,000.00
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