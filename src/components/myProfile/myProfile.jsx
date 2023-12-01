import React from 'react';
import { Container, Row, Col, Card, Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
    const navigate = useNavigate();

    const handleCancel = () => {
        navigate(-1);
      };


    return (
        <div style={{backgroundColor:"#F8F9F9", width:"100%", minHeight:"700px"}}>
        <Container >
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2"><FontAwesomeIcon icon={faUser} /> My Profile</h1>
            </div>
            <Row className="justify-content-center" style={{marginTop:"10px"}}>
                <Col md={6}>
                <Card>
                    <Card.Body>
                    <Card.Title className="text-center">Summary</Card.Title>
                    <Card.Text>
                    <div className="bd-example-snippet bd-code-snippet">
                        <div className="bd-example m-0 border-0">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item"><span style={{ fontWeight: 'bold' }}>Name:</span> Diego</li>
                                <li className="list-group-item"><span style={{ fontWeight: 'bold' }}>Last Name:</span> Contreras</li>
                                <li className="list-group-item"><span style={{ fontWeight: 'bold' }}>Mail:</span> contrerasdiegof@gmail.com</li>
                                <li className="list-group-item"><span style={{ fontWeight: 'bold' }}>Address:</span> San Martin 955</li>
                                <li className="list-group-item"><span style={{ fontWeight: 'bold' }}>Identy Card:</span> 40123890</li>
                                <li className="list-group-item"><span style={{ fontWeight: 'bold' }}>Country:</span> Argentina</li>
                                <li className="list-group-item"><span style={{ fontWeight: 'bold' }}>City:</span> Buenos Aires</li>
                                <li className="list-group-item"><span style={{ fontWeight: 'bold' }}>Postal Code:</span> 1004</li>
                            </ul>
                        </div>
                    </div>
                    </Card.Text>
                    <div className="text-center">
                        <Button variant="primary" size="md">Update Information</Button>
                    </div>
                    </Card.Body>
                </Card>
                </Col>
            </Row>
        </Container>
        <a
        onClick={handleCancel}
        className="btn btn-primary"
        style={{ position: "absolute", bottom: "10px", right: "10px" }}
        >
        Back
        </a>
        </div>
    );
};

export default MyProfile;