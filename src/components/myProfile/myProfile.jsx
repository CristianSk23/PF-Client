import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux"

const MyProfile = () => {
    const user = useSelector((state) => state.user)
    const country = useSelector((state) => state.country)
    const navigate = useNavigate();
    const dispatch = useDispatch()

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
                                <li className="list-group-item"><span style={{ fontWeight: 'bold' }}>Name:</span> {user?.name ? user?.name : <i>Please update your info</i>}</li>
                                <li className="list-group-item"><span style={{ fontWeight: 'bold' }}>Last Name:</span> {user?.lastName ? user?.lastName : <i>Please update your info</i>}</li>
                                <li className="list-group-item"><span style={{ fontWeight: 'bold' }}>Mail:</span> {user?.email}</li>
                                <li className="list-group-item"><span style={{ fontWeight: 'bold' }}>Address:</span> {user?.address ? user?.address : <i>Please update your info</i>}</li>
                                <li className="list-group-item"><span style={{ fontWeight: 'bold' }}>Identy Card:</span> {user?.identityCard ? user?.identityCard : <i>Please update your info</i>}</li>
                                <li className="list-group-item"><span style={{ fontWeight: 'bold' }}>Country:</span> {user?.CountryId ? country : <i>Please update your info</i>}</li>
                                <li className="list-group-item"><span style={{ fontWeight: 'bold' }}>City:</span> {user?.city ? user?.city : <i>Please update your info</i>}</li>
                                <li className="list-group-item"><span style={{ fontWeight: 'bold' }}>Postal Code:</span> {user?.postalCode ? user?.postalCode : <i>Please update your info</i>}</li>
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