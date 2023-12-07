import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, updateUser } from "../../redux/action/actions";
import { useNavigate } from 'react-router-dom';
import styles from "./adminModuleUser.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { Form } from 'react-bootstrap';

const AdminModuleUser = () => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.users); 
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleUpdate = (userId) => {
    console.log(`Update user with ID ${userId}`);
    navigate(`/user/updateUser/${userId}`);
  };

  const handleDelete = (userId) => {
    console.log(`Delete user with ID ${userId}`);
    navigate(`/user/deleteUser/${userId}`);
  };
  
  const handleOrder = (userId) => {
    console.log(`Oder user with ID ${userId}`);
    navigate(`/user/orderUser${userId}`);
  }
  const handleStatusChangeActive = (userId, email, typeUser, newStatus) => {
    console.log(`Update status for user with ID ${userId} email: ${email} and ${typeUser} to ${newStatus}`);
    const user = {
      id: userId, 
      email: email,
      typeUser: typeUser,
      active: newStatus,
    }
    dispatch(updateUser(user))
  }
  const handleStatusChangeTypeUser = (userId, email, active, newStatus) => {
    console.log(`Update status for user with ID ${userId} email: ${email} and ${active} to ${newStatus}`);
    const user = {
      id: userId, 
      email: email,
      typeUser: newStatus,
      active: active,
    }
    dispatch(updateUser(user))
  }


  

  return (
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
            <button className={styles.button} onClick={() => handleOrder(user.id)}>
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
  );
};

export default AdminModuleUser;