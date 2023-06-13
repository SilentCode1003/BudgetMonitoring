import Header from "../components/Header";
import { Container, Card, Row, Col, Form, Button } from 'react-bootstrap';
import { CDBDataTable } from "cdbreact";
import DynamicTable from "../components/DynamicTable";

export default function Index(){
    const currentMonthReimburse = ['ID', 'Request Date', 'Request By', 'Details', 'Status', 'Actions'];
    const currentMonthReimburseData = [
        { ID: '1001', 'Request Date': '29/05/2023', 'Request By': 'Ralph Lauren Santos', Details:'Something', Status: 'Active', Actions: 'Something' },
        { ID: '1002', 'Request Date': '02/06/2023', 'Request By': 'Ralph Lauren Santos', Details:'Something Else', Status: 'Inactive', Actions: 'Something' },
    ];

    const currentMonthBudget = ['ID', 'Request Date', 'Request By', 'Details', 'Status', 'Actions'];
    const currentMonthBudgetData = [
        { ID: '1001', 'Request Date': '29/05/2023', 'Request By': 'Ralph Lauren Santos', Details:'Something', Status: 'Active', Actions: 'Something' },
    ];
    return(
        <>
            <Header/>
            <Row className="mt-3">
                <Col md={4} className="dashboard-card-container">
                    <Card>
                        <Card.Body>
                            <Card.Title className="dashboard-text">
                                On-hand/Petty Cash
                            </Card.Title>
                            <h2>
                            ₱ 1,000.00
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
                            <h2>
                            ₱ 11,000.00
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
                            <h2>
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