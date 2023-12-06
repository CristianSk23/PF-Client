import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, getUserById } from "../../redux/action/actions";



const AdminModuleUpdateUser = () => {
  const dispatch = useDispatch()
  const { id } = useParams();
  const userById = useSelector((state) => state.user) || {};
  
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
        active: userById.active || "",
        typeUser: userById.typeUser || "",
        country: userById.country || ""
    })
  }, [userById]);

  // Puedes utilizar el estado local para gestionar los datos del formulario
   

  // Puedes manejar cambios en los campos del formulario así
   const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevData) => ({ ...prevData, [name]: value }));
  };

  // Puedes enviar el formulario así
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado:', user);
    dispatch(updateUser(user))
  }; 

  return (
    <div>
      <h2>{id}</h2>
      <h2>Modificar Usuario</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type="text" name="name" value={user.name} onChange={handleChange} />
        </label>
        <br />
        <label>
          Apellido:
          <input type="text" name="lastName" value={user.lastName} onChange={handleChange} />
        </label>
        <br /> 
        {/* Agrega más campos según los datos del usuario que desees modificar */}
        <label>
          Email:
          <input type="email" name="email" value={user.email} onChange={handleChange} />
        </label>
         <br />
         <label>
         Address:
          <input type="text" name="address" value={user.address} onChange={handleChange} />
        </label>
         <br />
         <label>
         Phone:
          <input type="number" name="phone" value={user.phone} onChange={handleChange} />
        </label>
         <br />
         <label>
         Identity Card:
          <input type="text" name="identityCard" value={user.identityCard} onChange={handleChange} />
        </label>
         <br />
         <label>
         Postal Code:
          <input type="text" name="postalCode" value={user.postalCode} onChange={handleChange} />
        </label>
         <br />
         <label>
         City:
          <input type="text" name="city" value={user.city} onChange={handleChange} />
        </label>
         <br />
         <label>
         Active:
          <input type="text" name="active" value={user.active} onChange={handleChange} />
        </label>
         <br />
         <label>
         Type User:
          <input type="text" name="typeUser" value={user.typeUser} onChange={handleChange} />
        </label>
         <br />
         <label>
         Country:
          <input type="text" name="country" value={user.country} onChange={handleChange} />
        </label>
         <br />

        <button type="submit">Guardar Cambios</button>
      </form> 
    </div>
  );
};

export default AdminModuleUpdateUser;
