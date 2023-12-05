import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

const MyProfile = () => {
    const isuser = useSelector((state) => state.user)
    const country = useSelector((state) => state.country)
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
                                <li className="list-group-item"><span style={{ fontWeight: 'bold' }}>Name:</span> {isuser?.name ? isuser?.name : <i>Please update your info</i>}</li>
                                <li className="list-group-item"><span style={{ fontWeight: 'bold' }}>Last Name:</span> {isuser?.lastName ? isuser?.lastName : <i>Please update your info</i>}</li>
                                <li className="list-group-item"><span style={{ fontWeight: 'bold' }}>Mail:</span> {isuser?.email}</li>
                                <li className="list-group-item"><span style={{ fontWeight: 'bold' }}>Address:</span> {isuser?.address ? isuser?.address : <i>Please update your info</i>}</li>
                                <li className="list-group-item"><span style={{ fontWeight: 'bold' }}>Identy Card:</span> {isuser?.identityCard ? isuser?.identityCard : <i>Please update your info</i>}</li>
                                <li className="list-group-item"><span style={{ fontWeight: 'bold' }}>Country:</span> {isuser?.CountryId ? country : <i>Please update your info</i>}</li>
                                <li className="list-group-item"><span style={{ fontWeight: 'bold' }}>City:</span> {isuser?.city ? isuser?.city : <i>Please update your info</i>}</li>
                                <li className="list-group-item"><span style={{ fontWeight: 'bold' }}>Postal Code:</span> {isuser?.postalCode ? isuser?.postalCode : <i>Please update your info</i>}</li>
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