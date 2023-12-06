import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/action/actions";
import { useNavigate } from 'react-router-dom';

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

  return (
    <div>
    <h1>Lista de usuarios</h1>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Active</th>
          <th>Type User</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {userList.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
            <td>{user.active ? "Active" : "Inactive"}</td>
            <td>{user.typeUser}</td>
            <td>
              <button onClick={() => handleUpdate(user.id)}>Update</button>
              <button onClick={() => handleDelete(user.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default AdminModuleUser;
