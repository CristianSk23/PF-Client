import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, updateUserForAdmin , getOrders } from "../../redux/action/actions";
import { useNavigate } from 'react-router-dom';
import styles from "./adminModuleUser.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { Form } from 'react-bootstrap';
import { useAuth0 } from "@auth0/auth0-react";
import ErrorView from "../error404/Error404";


const AdminModuleUser = () => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.users); 
  const navigate = useNavigate();
  const isUser = useSelector((state) => state.isUser)
  const {isAuthenticated, isLoading} = useAuth0()

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getOrders())
  }, [dispatch]);

  const handleUpdate = (userId) => {
    navigate(`/adminPanel/users/updateUser/${userId}`);
  };

  const handleDelete = (userId) => {
    navigate(`/adminPanel/users/deleteUser/${userId}`);
  };
  
  const handleOrder = (userId) => {
    navigate(`/adminPanel/users/orderHistory/${userId}`);
  }
  const handleStatusChangeActive = (userId, email, typeUser, newStatus) => {
    const user = {
      id: userId, 
      email: email,
      typeUser: typeUser,
      active: newStatus,
    }
    dispatch(updateUserForAdmin(user))
  }
  const handleStatusChangeTypeUser = (userId, email, active, newStatus) => {
    const user = {
      id: userId, 
      email: email,
      typeUser: newStatus,
      active: active,
    }
    dispatch(updateUserForAdmin(user))
  }

  if(!isLoading && isUser === "Admin"){
  return (
    !isLoading && isUser === "Admin" && isAuthenticated && 
    <div>
        <h5>Users list:</h5>
        <table className="table table-hover">
      <thead>
        <tr>
        <th className={styles.th} scope="col">Name</th>
        <th className={styles.th} scope="col">Last Name</th>
        <th className={styles.th} scope="col">Email</th>
        <th className={styles.th} scope="col">Type of user</th>
        <th className={styles.th} scope="col">Status</th>
        <th className={styles.th} scope="col">Shopping history</th>
        <th className={styles.th} scope="col">Update</th>
        <th className={styles.th} scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>
        {userList.map((user) => (
          <tr key={user.id}>
          <td className={styles.td}>{user.name}</td>
          <td className={styles.td}>{user.lastName}</td>
          <td className={styles.td}>{user.email}</td>
          <td className={styles.td}>
            <Form.Select aria-label="Seleccionar ejemplo" className='form-select-sm' defaultValue={user.typeUser} onChange={(e) => handleStatusChangeTypeUser(user.id, user.email, user.active, e.target.value)}>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </Form.Select>
          </td>
          <td className={styles.td}>
            <Form.Select aria-label="Seleccionar ejemplo" className='form-select-sm' defaultValue={user.active} onChange={(e) => handleStatusChangeActive(user.id, user.email, user.typeUser, e.target.value)}>
              <option value="true">Active</option>
              <option value="false">Disabled</option>
            </Form.Select>
          </td>
          <td className={styles.td}>
            <button                    
              className="btn btn-primary"
              style={{
                '--bs-btn-padding-y': '.25rem',
                '--bs-btn-padding-x': '.5rem',
                '--bs-btn-font-size': '.75rem',
              }}  
              onClick={() => handleOrder(user.id)}
            >
            See history
            </button>
          </td>

          <td className={styles.td}>
            <button className={styles.button} onClick={() => handleUpdate(user.id)}>
              <FontAwesomeIcon icon={faPencil} style={{color: "#badb43",}} />
            </button>
          </td>
          <td className={styles.td}>
            <button className={styles.button} onClick={() => handleDelete(user.id)}>
              <FontAwesomeIcon icon={faTrash} style={{ color: "#dd3636", }} />
            </button>
          </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  )} else {
    return(
      <div>
        <ErrorView />
      </div>
    )
  };
};

export default AdminModuleUser;