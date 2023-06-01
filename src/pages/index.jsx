import Header from "../components/Header";
import { Container, Card, Row, Col, Form, Button } from 'react-bootstrap';
import { CDBDataTable } from "cdbreact";
import DynamicTable from "../components/DynamicTable";

export default function Index(){
    const tableColumns = ['ID', 'Request Date', 'Request By', 'Details', 'Status', 'Actions'];
    const tableData = [
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
            <div className=""></div>
        </>
    )
}