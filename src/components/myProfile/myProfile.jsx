import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getAllCountries, updateUser } from '../../redux/action/actions';
import ModuleHistoryOrderUser from '../moduleHistoryOrderUser/ModuleHistoryOrderUser';
import { useAuth0 } from '@auth0/auth0-react';
import ErrorView from '../error404/Error404';

const MyProfile = () => {
    const isuser = useSelector((state) => state.user)
    const isUser = useSelector((state) => state.isUser)
    const country = useSelector((state) => state.country)
    const navigate = useNavigate();
    const {isAuthenticated, isLoading} = useAuth0()

    const [auxUpdateUser, setAuxUptdateUser] = useState(false)
    const countries = useSelector((state) => state.countries)
    const dispatch = useDispatch()
    const [user, setUser] = useState({
        id: isuser?.id || "",
        name: isuser?.name || "",
        lastName: isuser?.lastName || "",
        address: isuser?.address || "",
        phone: isuser?.phone || "",
        identityCard: isuser?.identityCard || "",
        postalCode: isuser?.postalCode || "",
        city: isuser?.city || "",
        CountryId: isuser?.CountryId || ""
    })


    const handleUpdateUser = () => {
        if(auxUpdateUser === false){
            setAuxUptdateUser(true);
        } else if(auxUpdateUser === true){
            setAuxUptdateUser(false)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if( user.name != isuser?.name || 
            user.lastName != isuser?.lastName || 
            user.address != isuser?.address || 
            user.phone != isuser?.phone || 
            user.identityCard != isuser?.identityCard || 
            user.postalCode != isuser?.postalCode || 
            user.city != isuser?.city)
        {
          dispatch(updateUser({...user, id: isuser?.id}))
          setAuxUptdateUser(false)
        }
    }

    useEffect(() => {
        dispatch(getAllCountries())
    }, [])

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setUser((prevInfo) => ({
            ...prevInfo,
            [name]: value
        }));
      };
    
    useEffect(() => {
        setUser({
            name: isuser?.name,
            lastName: isuser?.lastName,
            address: isuser?.address,
            phone: isuser?.phone,
            identityCard: isuser?.identityCard,
            postalCode: isuser?.postalCode,
            city: isuser?.city,
            CountryId: isuser?.CountryId
        })
    }, [auxUpdateUser === false])
    


    const handleCancel = () => {
        navigate(-1);
      };

      if(!isLoading && !isAuthenticated && isUser === "Invited"){
        return(
          <div>
            <ErrorView />
          </div>
        )
      }

    return !auxUpdateUser ? (!isLoading &&
        <div style={{backgroundColor:"#F8F9F9", width:"100%", minHeight:"700px"}}>
        <Container >
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2"><FontAwesomeIcon icon={faUser} /> My Account</h1>
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
                        <Button variant="dark" size="md" onClick={handleUpdateUser}>Update Information</Button>
                    </div>
                    </Card.Body>
                </Card>
                </Col>
            </Row>
        </Container>
        <br /><hr />
        {isuser?.id && <ModuleHistoryOrderUser idProp={isuser?.id}/>}
        <a className="w-100 btn btn-danger btn-lg" type="button"  style={{marginTop:"8px"}} onClick={ handleCancel }>Back</a>
        </div>
    ) :
    auxUpdateUser && (!isLoading &&
        <div style={{backgroundColor:"#F8F9F9", width:"100%", minHeight:"700px"}}>
            <Container>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2"><FontAwesomeIcon icon={faUser} /> {isuser.name ? `${isUser}: ${isuser.name} ${isuser.lastName}` : `My Account: ${isuser.email} ` }  </h1>
            </div>
            <Form onSubmit={handleSubmit}>
            <fieldset>
                <Row className='mb-3'>
                    <Form.Group className="mb-3">
                        <Form.Label for="staticEmail">Email</Form.Label>
                        <Form.Control className="form-control-plaintext" id="staticEmail" value={isuser?.email} readOnly/>
                    </Form.Group>
                    <Col>
                    <Form.Group className="mb-3" controlId="formFirstName">
                        <Form.Label>First name</Form.Label>
                        <Form.Control placeholder="First Name" value={user.name} onChange={handleChangeInput} name='name'/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control placeholder='Address' value={user.address} onChange={handleChangeInput} name='address'/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formIdentityCard">
                        <Form.Label>IdentityCard</Form.Label>
                        <Form.Control placeholder="Identity Card" value={user.identityCard} onChange={handleChangeInput} 
                        name='identityCard'/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control placeholder="City" value={user.city} onChange={handleChangeInput}
                        name="city"/>
                    </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group className="mb-3" controlId="lastName">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control placeholder="Last name" value={user.lastName} onChange={handleChangeInput}
                        name="lastName"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="Postal Code">
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control placeholder="Postal Code" value={user.postalCode} onChange={handleChangeInput}
                        name="postalCode"/> 
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="Phone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control placeholder="Phone" value={user.phone} onChange={handleChangeInput}
                        name="phone"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="CountryId">
                        <Form.Label>Country</Form.Label>
                        <Form.Select aria-label="Country" name='CountryId' onChange={handleChangeInput}>
                        {country ? (
                            <>
                            <option value={isuser.CountryId}>{country}</option>
                            {countries?.map((Country) => (
                                country !== Country.name && (
                                <option key={Country.id} value={Country.id}>
                                    {Country.name}
                                </option>
                                )
                            ))}
                            </>
                        ) : (
                            countries?.map((countryDB) => (
                            <option key={countryDB.id} value={countryDB.id}>
                                {countryDB.name}
                            </option>
                            ))
                        )}
                        </Form.Select>
                    </Form.Group>
                    </Col>
                </Row>
                <div className="text-center mb-3">
                    <Button variant="dark" size="lg" type="submit">Update Information</Button>
                </div>
                </fieldset>
            </Form>
            </Container>
            <Button variant="danger"
        onClick={handleUpdateUser}
        className="btn btn-primary mb-3"
        style={{ position: "absolute", bottom: "10px", right: "10px" }}
        size='lg'
        >
        Cancel
        </Button>
        <a className="w-100 btn btn-danger btn-lg" type="button"  style={{marginTop:"8px"}} onClick={ handleCancel }>Back</a>
        </div>
    )
    
};

export default MyProfile;