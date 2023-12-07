import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, getUserById } from "../../redux/action/actions";
import PopupGeneral from "../popupGeneral/PopupGeneral";
import { Form } from 'react-bootstrap';
import styles from "./adminModuleUpdateUser.module.css"


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

    // La función de limpieza se ejecuta al desmontar el componente
    return () => {
        // Restablece el estado a su valor inicial al desmontar usando el estado actualizado (userById)
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
        active: userById.active.toString() || "",
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
    console.log('Formulario enviado:', user);
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
    <div className={styles.containerUpdate}>
      <h2>Modify User</h2>
      <form onSubmit={handleSubmit}>
        <label className={styles.labelUpdate}>
          Name:
          <input className={styles.inputUpdate} type="text" name="name" value={user.name} onChange={handleChange} />
        </label>
        <br />
        <label className={styles.labelUpdate}>
          Lasname:
          <input className={styles.inputUpdate} type="text" name="lastName" value={user.lastName} onChange={handleChange} />
        </label>
        <br /> 
        <label className={styles.labelUpdate}>
          Email:
          <input className={styles.inputUpdate} type="email" name="email" value={user.email} onChange={handleChange} />
        </label>
        {!isEmailValid && (
          <div style={{ color: 'red' }}>Enter a valid email address</div>
        )}
         <br />
         <label className={styles.labelUpdate}>
         Address:
          <input className={styles.inputUpdate} type="text" name="address" value={user.address} onChange={handleChange} />
        </label>
         <br />
         <label className={styles.labelUpdate}>
         Phone:
          <input className={styles.inputUpdate} type="number" name="phone" value={user.phone} onChange={handleChange} />
        </label>
         <br />
         <label className={styles.labelUpdate}>
         Identity Card:
          <input className={styles.inputUpdate} type="text" name="identityCard" value={user.identityCard} onChange={handleChange} />
        </label>
         <br />
         <label className={styles.labelUpdate}>
         Postal Code:
          <input className={styles.inputUpdate} type="text" name="postalCode" value={user.postalCode} onChange={handleChange} />
        </label>
         <br />
         <label className={styles.labelUpdate}>
         City:
          <input className={styles.inputUpdate} type="text" name="city" value={user.city} onChange={handleChange} />
        </label>
         <br />         
         <label className={styles.labelUpdate}>
          Active:
          <Form.Select 
            aria-label="Seleccionar estado" 
            className='form-select-sm' 
            name="active" 
            value={user.active} 
            onChange={handleChange}
          >
            <option value="true">Active</option>
            <option value="false">Disabled</option>
          </Form.Select>
        </label>
        <br />
         <label className={styles.labelUpdate}>
         Type User:
          <Form.Select 
            aria-label="Seleccionar estado" 
            className='form-select-sm' 
            name="active" 
            value={user.typeUser}
            onChange={handleChange}
          >
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </Form.Select>
        </label>
        <br />
         <label className={styles.labelUpdate}>
         Country:
          <input className={styles.inputUpdate} type="text" name="country" value={user.country} onChange={handleChange} />
        </label>
         <br />

        <button type="submit" className="btn btn-success" disabled={!isEmailValid}>Save Changes</button>
        <button type="button" className="btn btn-danger" style={{ margin: "5px" }}onClick={handleCancel}>Cancel</button>
      </form> 
      {showConfirmation && (
        <PopupGeneral
          textButton="Accept"
          descripcion="User successfully updated"
          onClick={handleConfirmationClose}
        />
      )}
    </div>
  );
};

export default AdminModuleUpdateUser;
