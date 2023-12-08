import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, getUserById } from "../../redux/action/actions";
import PopupGeneral from "../popupGeneral/PopupGeneral";
import styles from "./adminModuleUpdateUser.module.css"
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


const AdminModuleUpdateUser = () => {
  const dispatch = useDispatch()
  const { id } = useParams();
  const navigate = useNavigate();
  const userById = useSelector((state) => state.user) || {};
  const [showConfirmation, setShowConfirmation] = useState(false);  
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [user, setUser] = useState({
    id: '',
    name: '',
    lastName: '',
    email: '',
    address: '',
    phone: '',
    identityCard: '',
    postalCode: '',
    city: '',
    active: '',
    typeUser: '',
    country: '',
  });

  useEffect(() => {
    dispatch(getUserById(id));

    return () => {
        setUser({
          id: '',
          name: '',
          lastName: '',
          email: '',
          address: '',
          phone: '',
          identityCard: '',
          postalCode: '',
          city: '',
          active: '',
          typeUser: '',
          country: '',
        });
      };
    }, [dispatch]);

  useEffect(() => {
    setUser({
        id: userById.id || "",
        name: userById.name || "",
        lastName: userById.lastName || "",
        email: userById.email || "",
        address: userById.address || "",
        phone: userById.phone || "",
        identityCard: userById.identityCard || "",
        postalCode: userById.postalCode || "",
        city: userById.city || "",
        active: userById.active?.toString() || "",
        typeUser: userById.typeUser || "",
        country: userById.country || ""
    })
  }, [userById]);

   const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevData) => ({ ...prevData, [name]: value }));
    if (name == "email"){
      validateEmail(value)
    } 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEmailValid) {
    setUser({
      id: user.id || "",
      name: user.name || "",
      lastName: user.lastName || "",
      email: user.email || "",
      address: user.address || "",
      phone: user.phone || "",
      identityCard: user.identityCard || "",
      postalCode: user.postalCode || "",
      city: user.city || "",
      active: Boolean(user.active) || "",
      typeUser: user.typeUser || "",
      country: user.country || ""
  })


    dispatch(updateUser(user))
    setShowConfirmation(true);
  }
  }; 

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    setIsEmailValid(isValid);
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
    navigate(-1);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
        <div style={{ minHeight: "800px" }}>
          <div>
            <h1 className="text-center m-5">Modify User</h1>
            <Form onSubmit={handleSubmit} className={styles.container}>
              <div className={styles.input_container}>
                <div className={styles.input_name}>
                  <FloatingLabel
                    id="floatingInput"
                    label="Name"
                    className="w-100 me-2"
                  >
                    <Form.Control
                      className={styles.form_input}
                      type="text"
                      placeholder="Name"
                      name="name"
                      value={user.name}
                      onChange={handleChange}
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    id="floatingInput"
                    label="Last Name"
                    className="w-100 me-2"
                  >
                    <Form.Control
                      className={styles.form_input}
                      type="text"
                      placeholder="Last Name"
                      name="lastName"
                      value={user.lastName}
                      onChange={handleChange}
                    />
    
                  </FloatingLabel>
                </div>
                <div className={styles.input_name}>
                  <FloatingLabel
                    id="floatingInput"
                    label="Identity Card"
                    className="w-100 me-2"
                  >
                    <Form.Control
                      className={styles.form_input}
                      type="text"
                      placeholder="Identy Card"
                      name="identityCard"
                      value={user.identityCard}
                      onChange={handleChange}
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    id="floatingInput"
                    label="Email"
                    className="w-100 me-2"
                  >
                    <Form.Control
                      className={styles.form_input}
                      type="email"
                      placeholder="Email"
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                    />
                  {!isEmailValid && (
                  <span className={styles.errorMessage}>Enter a valid email address</span>
                )}
                  </FloatingLabel>
                </div>
    
                <div className={styles.input_name}>
                  <FloatingLabel
                    id="floatingInput"
                    label="Phone"
                    className="w-100 me-2"
                  >
                    <Form.Control
                      className={styles.form_input}
                      type="number"
                      placeholder="Phone"
                      name="phone"
                      value={user.phone}
                      onChange={handleChange}
                    />
    
                  </FloatingLabel>
                  <FloatingLabel
                    id="floatingInput"
                    label="Address"
                    className="w-100 me-2"
                  >
                  <Form.Control
                      className={styles.form_input}
                      type="text"
                      placeholder="Address"
                      name="address"
                      value={user.address}
                      onChange={handleChange}
                    />
                  </FloatingLabel>
                </div>
    
                <div className={styles.input_name}>
                  <FloatingLabel
                    id="floatingInput"
                    label="Postal Code"
                    className="w-100 me-2"
                  >
                  <Form.Control
                      className={styles.form_input}
                      type="text"
                      placeholder="Postal Code"
                      name="postalCode"
                      value={user.postalCode}
                      onChange={handleChange}
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    id="floatingInput"
                    label="City"
                    className="w-100 me-2"
                  >
                  <Form.Control
                      className={styles.form_input}
                      type="text"
                      placeholder="City"
                      name="city"
                      value={user.city}
                      onChange={handleChange}
                    />
                  </FloatingLabel>
                </div>

                <div className={styles.input_name}>
                  <FloatingLabel
                    id="floatingInput"
                    label="Country"
                    className="w-100 me-2"
                  >
                  <Form.Control
                      className={styles.form_input}
                      type="text"
                      placeholder="Country"
                      name="country"
                      value={user.country}
                      onChange={handleChange}
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    id="floatingInput"
                    label="Type User"
                    className="w-100 me-2"
                  >
                    <Form.Select
                      name="typeUser"
                      className={styles.form_input}
                      aria-label="Default select example"
                      onChange={handleChange}
                      value={user.typeUser}
                    >
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </Form.Select>
    
                  </FloatingLabel>
                </div>
    
    
                <div className={styles.input_name}>
                <FloatingLabel
                    id="floatingInput"
                    label="State"
                    className="w-100 me-2"
                  >
                    <Form.Select
                      name="active"
                      className={styles.form_input}
                      aria-label="Default select example"
                      onChange={handleChange}
                      value={user.active}
                    >
                      <option value="true">Active</option>
                      <option value="false">Disabled</option>
                    </Form.Select>
    
                  </FloatingLabel>
                </div>
    
                <Button
                  className="w-100 my-4"
                  variant="success"
                  type="submit"
                  disabled={!isEmailValid}
                >
                  Save Changes
                </Button>
                <a
                  onClick={handleCancel}
                  className="btn btn-danger"
                  style={{ marginTop: "-25px", marginBottom: "15px" }}
                >
                  Back
                </a>
              </div>
            </Form>
            {showConfirmation && (
              <PopupGeneral
                textButton="Accept"
                descripcion="User successfully updatedt"
                onClick={handleConfirmationClose}
              />
            )}
          </div>
      </div>
  );
};

export default AdminModuleUpdateUser;
